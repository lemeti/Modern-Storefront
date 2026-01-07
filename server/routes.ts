import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { setupAuth, registerAuthRoutes, isAuthenticated } from "./replit_integrations/auth";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Setup Replit Auth
  await setupAuth(app);
  registerAuthRoutes(app);

  app.get(api.puppies.list.path, async (req, res) => {
    const puppies = await storage.getPuppies();
    res.json(puppies);
  });

  app.get(api.puppies.get.path, async (req, res) => {
    const puppy = await storage.getPuppy(Number(req.params.id));
    if (!puppy) {
      return res.status(404).json({ message: 'Puppy not found' });
    }
    res.json(puppy);
  });

  // Protected routes
  app.post(api.puppies.create.path, isAuthenticated, async (req, res) => {
    try {
      const input = api.puppies.create.input.parse(req.body);
      const puppy = await storage.createPuppy(input);
      res.status(201).json(puppy);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.put(api.puppies.update.path, isAuthenticated, async (req, res) => {
    try {
      const input = api.puppies.update.input.parse(req.body);
      const puppy = await storage.updatePuppy(Number(req.params.id), input);
      if (!puppy) {
        return res.status(404).json({ message: 'Puppy not found' });
      }
      res.json(puppy);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.delete(api.puppies.delete.path, isAuthenticated, async (req, res) => {
    await storage.deletePuppy(Number(req.params.id));
    res.status(204).send();
  });

  // Seed Data
  seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existing = await storage.getPuppies();
  if (existing.length === 0) {
    await storage.createPuppy({
      name: "Buddy",
      description: "A playful Golden Retriever who loves fetch and cuddles. Perfect for families!",
      age: 3, // months
      breed: "Golden Retriever",
      imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&auto=format&fit=crop",
      isFeatured: true
    });
    await storage.createPuppy({
      name: "Luna",
      description: "Sweet and calm French Bulldog. She snores a little but is full of love.",
      age: 4, // months
      breed: "French Bulldog",
      imageUrl: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&auto=format&fit=crop",
      isFeatured: true
    });
    await storage.createPuppy({
      name: "Max",
      description: "Energetic German Shepherd mix. Very smart and eager to learn tricks.",
      age: 5, // months
      breed: "German Shepherd Mix",
      imageUrl: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=800&auto=format&fit=crop",
      isFeatured: false
    });
    await storage.createPuppy({
      name: "Coco",
      description: "Fluffy Poodle with a heart of gold. Hypoallergenic and great with kids.",
      age: 2, // months
      breed: "Poodle",
      imageUrl: "https://images.unsplash.com/photo-1594149929911-78975a43d4f5?w=800&auto=format&fit=crop",
      isFeatured: false
    });
  }
}
