import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  const users = [
    {
      email: "abc@gmail.com",
      password: "123abc",
    },
  ];

  res.json(users);
});

export default router;