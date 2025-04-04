import express from "express";
import {
  createThread,
  getAllThreads,
  getThreadById,
} from "../controllers/thread/threadController";

const router = express.Router();

router.post("/create", createThread);
router.get("/all", getAllThreads);
router.get("/:id", getThreadById);

export default router;
