import {
  mysqlTable,
  bigint,
  varchar,
  text,
  uniqueIndex,
} from "drizzle-orm/mysql-core";

export const UserTable = mysqlTable(
  "user",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    email: varchar("email", { length: 256 }).notNull(),
    passwordHash: text("passwordHash").notNull(),
  },
  (table) => {
    return {
      emailIndex: uniqueIndex("emailIndex").on(table.email),
    };
  }
);

export const NoteTable = mysqlTable("note", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  title: varchar("title", { length: 256 }).notNull(),
  text: text("text").notNull(),
  userId: bigint("userId", { mode: "number" })
    .notNull()
    .references(() => UserTable.id),
  createdAt: bigint("createdAt", { mode: "number" })
    .notNull()
    .$default(Date.now),
  updatedAt: bigint("updatedAt", { mode: "number" }),
});
