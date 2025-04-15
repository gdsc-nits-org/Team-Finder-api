import * as Interfaces from "../../interfaces";
import * as Errors from "../../globals/errors";
import * as Success from "../../globals/success";

import { prisma } from "../../utils";
import { Thread } from "@prisma/client";
// Create a new thread
const createThread: Interfaces.Controllers.Async = async (req, res, next) => {
  try {
    const { title, description, creatorId, skills, maxMembers } = req.body;
    req.body;

    if (!title || !description || !creatorId) {
      return next(
        Errors.Thread.badRequest(
          "Title, description, and creatorId are required."
        )
      );
    }

    const thread = await prisma.thread.create({
      data: {
        title,
        description,
        creatorId,
        skills,
        maxMembers,
      },
    });

    await prisma.enrolledThread.create({
      data: {
        userId: creatorId,
        threadId: thread.id,
        role: "ADMIN",
        enrollmentStatus: "ACCEPTED",
      },
    });

    return res
      .status(201)
      .json({ ...Success.Thread.threadCreated, data: thread });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating thread" });
  }
};

// Get all threads
const getAllThreads: Interfaces.Controllers.Async = async (req, res, next) => {
  try {
    const threads = await prisma.thread.findMany({
      include: { creator: true },
    });

    res.json(Success.Thread.getAllThreadResponse(threads as Thread[]));
  } catch (error) {
    console.error(error);
    return next(Errors.System.serverError);
  }
};

// Get a thread by ID
const getThreadById: Interfaces.Controllers.Async = async (req, res, next) => {
  try {
    const id = String(req?.params?.id);

    if (!id) {
      return next(Errors.Thread.badRequest("Thread ID is required"));
    }

    const thread = await prisma.thread.findUnique({
      where: { id },
      include: { creator: true },
    });

    if (!thread) {
      return next(Errors.Thread.badRequest("Thread not found."));
    }

    return res.json(Success.Thread.getThreadResponse(thread as Thread));
  } catch (error) {
    console.error(error);
    return next(Errors.System.serverError);
  }
};
export { createThread, getAllThreads, getThreadById };
