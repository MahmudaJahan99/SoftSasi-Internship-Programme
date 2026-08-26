import { Router } from "express";
import argon2 from "argon2";
import { prisma } from "@monorepo-learning/db";
import { loginSchema } from "../validation/login.schema.js";
import { signAuthToken } from "../lib/jwt.js";

const router = Router();

const AUTH_COOKIE_NAME = "auth_token";
const COOKIE_MAX_AGE_MS = 60 * 60 * 1000; // 1 hour — matches the JWT's own expiry

// Precomputed once, reused for every "user not found" case so that path
// takes roughly as long as a real password check (see "Why this works").
let dummyHashPromise: Promise<string> | null = null;
function getDummyHash(): Promise<string> {
  if (!dummyHashPromise) {
    dummyHashPromise = argon2.hash("timing-attack-mitigation-placeholder");
  }
  return dummyHashPromise;
}

router.post("/login", async (req, res) => {
  const parseResult = loginSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({
      error: "Validation failed",
      details: parseResult.error.flatten().fieldErrors,
    });
  }

  const { email, password } = parseResult.data;

  const invalidCredentials = () =>
    res.status(401).json({ error: "Invalid email or password." });

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    await argon2.verify(await getDummyHash(), password);
    return invalidCredentials();
  }

  const passwordMatches = await argon2.verify(user.passwordHash, password);
  if (!passwordMatches) {
    return invalidCredentials();
  }

  const token = await signAuthToken({ id: user.id, email: user.email });

  res.cookie(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE_MS,
    path: "/",
  });

  return res.status(200).json({
    user: { id: user.id, name: user.name, username: user.username, email: user.email },
  });
});

export default router;