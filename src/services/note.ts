import { serviceResponse } from "./shared";
import { db } from "../drizzle/db";
import { NoteTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export async function createNote(
  title: string,
  text: string,
  authUserId: number
) {
  return serviceResponse(async () => {
    if (text === "") {
      return ["Text is required"];
    }

    await db
      .insert(NoteTable)
      .values({ title: title ?? "", text, userId: authUserId });

    return [null, null];
  });
}

export async function updateNote(id: number, title: string, text: string) {
  return serviceResponse(async () => {
    if (text === "") {
      return ["Text is required"];
    }

    await db
      .update(NoteTable)
      .set({ title: title ?? "", text, updatedAt: Date.now() })
      .where(eq(NoteTable.id, id));

    return [null, null];
  });
}

export async function deleteNote(id: number) {
  return serviceResponse(async () => {
    await db.delete(NoteTable).where(eq(NoteTable.id, id));

    return [null, null];
  });
}

export async function getNote(id: number) {
  return serviceResponse(async () => {
    const note = (
      await db.select().from(NoteTable).where(eq(NoteTable.id, id))
    ).at(0);

    return [null, note];
  });
}

export async function getNotes(authUserId: number) {
  return serviceResponse(async () => {
    const notes = await db
      .select()
      .from(NoteTable)
      .where(eq(NoteTable.userId, authUserId));

    return [null, notes];
  });
}
