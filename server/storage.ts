import { db } from "./db";
import { puppies, type InsertPuppy, type Puppy } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getPuppies(): Promise<Puppy[]>;
  getPuppy(id: number): Promise<Puppy | undefined>;
  createPuppy(puppy: InsertPuppy): Promise<Puppy>;
  updatePuppy(id: number, updates: Partial<InsertPuppy>): Promise<Puppy>;
  deletePuppy(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getPuppies(): Promise<Puppy[]> {
    return await db.select().from(puppies);
  }

  async getPuppy(id: number): Promise<Puppy | undefined> {
    const [puppy] = await db.select().from(puppies).where(eq(puppies.id, id));
    return puppy;
  }

  async createPuppy(insertPuppy: InsertPuppy): Promise<Puppy> {
    const [puppy] = await db.insert(puppies).values(insertPuppy).returning();
    return puppy;
  }

  async updatePuppy(id: number, updates: Partial<InsertPuppy>): Promise<Puppy> {
    const [updated] = await db
      .update(puppies)
      .set(updates)
      .where(eq(puppies.id, id))
      .returning();
    return updated;
  }

  async deletePuppy(id: number): Promise<void> {
    await db.delete(puppies).where(eq(puppies.id, id));
  }
}

export const storage = new DatabaseStorage();
