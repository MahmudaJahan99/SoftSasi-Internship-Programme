import express from "express";
import cors from "cors";
import usersRouter from "./routes/users.routes.js";
import authRouter from "./routes/auth.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    message: "API is running 🚀",
  });
});

app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

export default app;
