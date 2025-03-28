import express from "express";
import Health from "./health";
import threadRoutes from "./thread"; // Import thread routes

const router = express.Router();

router.use("/health", Health);
router.use("/threads", threadRoutes); // Add thread routes

export default router;
import Auth from "./auth";
import User from "./user";

export { Health, Auth, User };
export function Thread(arg0: string, Thread: any) {
  throw new Error("Function not implemented.");
}
