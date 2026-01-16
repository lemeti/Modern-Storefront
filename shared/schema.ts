import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Import auth models
export * from "./models/auth";

export const puppies = pgTable("puppies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  age: integer("age").notNull(), // in months
  breed: text("breed").notNull(),
  imageUrl: text("image_url").notNull(),
  // New column: store additional photo URLs as a JSON string.
  // We store JSON string in a text column to keep schema/backwards compatibility.
  photos: text("photos").default("[]"),
  isFeatured: boolean("is_featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPuppySchema = createInsertSchema(puppies).omit({ 
  id: true, 
  createdAt: true 
});

export type Puppy = typeof puppies.$inferSelect;
export type InsertPuppy = z.infer<typeof insertPuppySchema>;
