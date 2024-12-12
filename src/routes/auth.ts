import { Router } from "express";
import { signUp, signIn } from "../services/auth";

const authRouter = Router();

authRouter.post("/signUp", async (req, res) => {
  res.json(await signUp(req.body.email, req.body.password));
});

authRouter.post("/signIn", async (req, res) => {
  res.json(await signIn(req.body.email, req.body.password));
});

export { authRouter };
