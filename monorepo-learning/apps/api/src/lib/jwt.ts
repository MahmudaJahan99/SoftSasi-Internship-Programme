import { SignJWT, jwtVerify, type JWTPayload } from "jose";

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error("JWT_SECRET environment variable is not set");
}

const secretKey = new TextEncoder().encode(jwtSecret);
const TOKEN_EXPIRY = "1h";

export interface AppJwtPayload extends JWTPayload {
  sub: string; // user id
  email: string;
}

export async function signAuthToken(user: { id: string; email: string }): Promise<string> {
  return new SignJWT({ email: user.email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(secretKey);
}

export async function verifyAuthToken(token: string): Promise<AppJwtPayload> {
  const { payload } = await jwtVerify<AppJwtPayload>(token, secretKey);
  return payload;
}