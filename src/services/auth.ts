import { serviceResponse } from "./shared";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../drizzle/db";
import { UserTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

//const { userId } = jwt.verify(authToken, process.env.JWT_KEY);

export function signUp(email: string, password: string) {
  return serviceResponse(async () => {
    if (email === "") {
      return ["Email is required"];
    }

    if (password === "") {
      return ["Password is required"];
    }

    const emailExists =
      (await db.select().from(UserTable).where(eq(UserTable.email, email)))
        .length > 0;

    if (emailExists) {
      return ["Email already exists"];
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await db.insert(UserTable).values({ email, passwordHash });

    return [null, null];
  });
}

export function signIn(email: string, password: string) {
  return serviceResponse(async () => {
    if (email === "") {
      return ["Email is required"];
    }

    if (password === "") {
      return ["Password is required"];
    }

    const user = (
      await db.select().from(UserTable).where(eq(UserTable.email, email))
    ).at(0);

    if (!user) {
      return ["Invalid credentials"];
    }

    const success = await bcrypt.compare(password, user.passwordHash);

    if (!success) {
      return ["Invalid credentials"];
    }

    const authToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_KEY as string,
      {
        expiresIn: 3600,
      }
    );

    return [null, authToken];
  });
}
