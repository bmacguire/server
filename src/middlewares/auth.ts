import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authToken = req.get("X-Auth-Token") ?? "";

    const payload = jwt.verify(authToken, process.env.JWT_KEY as string) as {
      userId: number;
    };

    if (!payload) {
      res.json({ error: "Not authenticated" });
      return;
    }

    req.body.authUserId = payload.userId;

    next();
  } catch {
    res.json({ error: "Not authenticated" });
  }
}
