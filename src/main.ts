import "dotenv/config";
import express from "express";
import cors from "cors";
import { authRouter } from "./routes/auth";
import { noteRouter } from "./routes/note";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/note", noteRouter);

app.listen(Number(process.env.PORT));
