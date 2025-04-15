import express from "express";
import * as Controllers from "../controllers";

const router = express.Router();

router.post("/create", Controllers.Thread.createThread);
router.get("/all", Controllers.Thread.getAllThreads);
router.get("/:id", Controllers.Thread.getThreadById);

export default router;
