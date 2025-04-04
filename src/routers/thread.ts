import express from "express";
import * as Controllers from "../controllers/thread/threadController";

const router = express.Router();

router.post("/", Controllers.createThread);
router.get("/", Controllers.getAllThreads);
router.get("/:id", Controllers.getThreadById);

export default router;
