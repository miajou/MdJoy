import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// Define the 'users' table.
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  role: text('role').default('user').notNull(), // 'admin', 'moderator', 'user'
  createdAt: timestamp('created_at').defaultNow(),
});

// Define the 'dynamic_laws' table for laws created by Admin
export const dynamicLaws = pgTable('dynamic_laws', {
  id: serial('id').primaryKey(),
  lawId: text('law_id').notNull().unique(), // e.g. "custom_law_1"
  title: text('title').notNull(),
  titleBn: text('title_bn').notNull(),
  code: text('code').notNull(), // e.g. "CLA 2026"
  icon: text('icon').notNull().default('Scale'), // Lucide icon name
  category: text('category').notNull().default('Criminal'),
  description: text('description').notNull().default(''),
  descriptionBn: text('description_bn').notNull().default(''),
  createdAt: timestamp('created_at').defaultNow(),
});

// Define the 'dynamic_sections' table for sections under dynamic laws
export const dynamicSections = pgTable('dynamic_sections', {
  id: serial('id').primaryKey(),
  sectionId: text('section_id').notNull().unique(), // e.g. "custom_sec_1"
  lawId: text('law_id').notNull(), // references dynamicLaws.lawId (or static law)
  num: integer('num').notNull(),
  title: text('title').notNull(),
  titleBn: text('title_bn').notNull(),
  text: text('text').notNull(),
  textBn: text('text_bn').notNull(),
  explanation: text('explanation').notNull().default(''),
  explanationBn: text('explanation_bn').notNull().default(''),
  example: text('example').notNull().default(''),
  exampleBn: text('example_bn').notNull().default(''),
  createdAt: timestamp('created_at').defaultNow(),
});

// Define the 'bookmarks' table
export const bookmarks = pgTable('bookmarks', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  sectionId: text('section_id').notNull(),
  lawId: text('law_id').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Define the 'custom_sections' table
export const customSections = pgTable('custom_sections', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  sectionId: text('section_id').notNull(),
  num: integer('num').notNull(),
  lawId: text('law_id').notNull(),
  lawCode: text('law_code').notNull(),
  title: text('title').notNull(),
  titleBn: text('title_bn').notNull(),
  text: text('text').notNull(),
  textBn: text('text_bn').notNull(),
  explanation: text('explanation').notNull(),
  explanationBn: text('explanation_bn').notNull(),
  example: text('example').notNull(),
  exampleBn: text('example_bn').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Relationships
export const usersRelations = relations(users, ({ many }) => ({
  bookmarks: many(bookmarks),
  customSections: many(customSections),
}));

export const bookmarksRelations = relations(bookmarks, ({ one }) => ({
  user: one(users, {
    fields: [bookmarks.userId],
    references: [users.id],
  }),
}));

export const customSectionsRelations = relations(customSections, ({ one }) => ({
  user: one(users, {
    fields: [customSections.userId],
    references: [users.id],
  }),
}));
