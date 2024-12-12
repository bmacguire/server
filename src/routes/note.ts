import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import {
  createNote,
  updateNote,
  deleteNote,
  getNote,
  getNotes,
} from "../services/note";

const noteRouter = Router();

noteRouter.use(authMiddleware);

noteRouter.post("/createNote", async (req, res) => {
  res.json(
    await createNote(req.body.title, req.body.text, req.body.authUserId)
  );
});

noteRouter.put("/updateNote", async (req, res) => {
  res.json(await updateNote(req.body.id, req.body.title, req.body.text));
});

noteRouter.delete("/deleteNote", async (req, res) => {
  res.json(await deleteNote(req.body.id));
});

noteRouter.get("/getNote", async (req, res) => {
  res.json(await getNote(Number(req.query.id)));
});

noteRouter.get("/getNotes", async (req, res) => {
  res.json(await getNotes(req.body.authUserId));
});

export { noteRouter };
