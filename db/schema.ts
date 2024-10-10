import { sqliteTable, AnySQLiteColumn, text, blob, numeric } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"


export const users = sqliteTable("users", {
	id: text("id").primaryKey(),
	email: text("email"),
	createdAt: numeric("createdAt").default(sql`(CURRENT_TIMESTAMP)`),
	role: text("role").default("Demo admin"),
});