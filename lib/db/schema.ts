import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core'

export const instructions = pgTable('instructions', {
  id: serial('id').primaryKey(),
  key: varchar('key', { length: 255 }).notNull(),
  value: text('value').notNull()
})

export const context = pgTable('context', {
  id: serial('id').primaryKey(),
  bio: text('bio').notNull(),
  skills: text('skills').notNull()
})
