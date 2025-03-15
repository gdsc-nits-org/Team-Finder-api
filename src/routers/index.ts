import express from "express";
import Health from "./health";
import threadRoutes from "./thread"; // Import thread routes

const router = express.Router();

router.use("/health", Health);
router.use("/threads", threadRoutes); // Add thread routes

export default router;
