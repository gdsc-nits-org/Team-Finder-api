import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// Create a new thread
export const createThread = async (req: Request, res: Response) => {
  try {
    const { title, description, creatorId, enrolledUsers, writeAccess } =
      req.body;

    const thread = await prisma.thread.create({
      data: {
        title,
        description,
        creatorId,
        enrolledUsers: enrolledUsers || [],
        writeAccess: writeAccess || [],
      },
    });

    res.status(201).json(thread);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating thread" });
  }
};

// Get all threads
export const getAllThreads = async (_req: Request, res: Response) => {
  try {
    const threads = await prisma.thread.findMany({
      include: { creator: true },
    });

    res.status(200).json(threads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching threads" });
  }
};

// Get a thread by ID
export const getThreadById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const thread = await prisma.thread.findUnique({
      where: { id },
      include: { creator: true },
    });

    if (!thread) {
      return res.status(404).json({ error: "Thread not found" });
    }

    res.status(200).json(thread);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching thread" });
  }
};
