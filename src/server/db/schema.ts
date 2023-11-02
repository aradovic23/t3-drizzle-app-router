// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations } from "drizzle-orm";
import {
  int,
  mysqlTableCreator,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator(
  (name) => `subs-t3-app-router_${name}`,
);

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 120 }),
  tagline: varchar("tagline", { length: 250 }),
  displayName: varchar("display_name", { length: 250 }),
  img_url: varchar("img_url", { length: 500 }),
  role: text("role", { enum: ["ADMIN", "USER", "DEV"] }),
});

export const tenants = mysqlTable("tenants", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 250 }).unique(),
  displayName: varchar("display_name", { length: 250 }),
  userId: int("user_id"),
  description: varchar("description", { length: 200 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  tenants: many(tenants),
}));

export const tenantsRelations = relations(tenants, ({ one }) => ({
  user: one(users, {
    fields: [tenants.userId],
    references: [users.id],
  }),
}));
