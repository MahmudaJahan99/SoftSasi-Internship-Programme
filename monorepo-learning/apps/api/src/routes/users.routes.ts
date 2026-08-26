// /apps/api/src/routes/users.routes.ts
import { Router } from "express";
import argon2 from "argon2";
import { Prisma, prisma } from "@monorepo-learning/db";
import { signUpSchema } from "../validation/signup.schema.js";

const router = Router();

router.post("/", async (req, res) => {
  const parseResult = signUpSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({
      error: "Validation failed",
      details: parseResult.error.flatten().fieldErrors,
    });
  }

  const { name, username, email, password } = parseResult.data;

  try {
    const passwordHash = await argon2.hash(password);

    const user = await prisma.user.create({
      data: { name, username, email, passwordHash },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        createdAt: true,
      },
    });

    return res.status(201).json({ user });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const target = error.meta?.target as string[] | undefined;
      const field = target?.[0] === "email" ? "email" : "username";
      return res.status(409).json({ error: `This ${field} is already taken.` });
    }

    console.error("Signup error:", error);
    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again." });
  }
});

router.get("/", async (_req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        createdAt: true,
      },
    });

    return res.json({ users });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const target = error.meta?.target as string[] | undefined;
      const field = target?.[0] === "email" ? "email" : "username";
      return res.status(409).json({
        error: `This ${field} is already taken.`,
        field,
      });
    }

    console.error("Signup error:", error);
    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again." });
  }
});

export default router;
