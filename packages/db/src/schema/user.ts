import { randomUUID } from 'node:crypto'
import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

/**
 * Minimal user table — intentionally shaped to match BetterAuth's `user` model
 * so it stays forward-compatible when BetterAuth's generated schema lands.
 *
 * This is a placeholder to establish the Neon + Drizzle + migrations pipeline.
 * The full conversation/message schema is designed separately, not here.
 */
export const user = pgTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  name: text('name'),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export type User = typeof user.$inferSelect
export type NewUser = typeof user.$inferInsert
