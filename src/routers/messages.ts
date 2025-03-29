import express from "express";
import * as Controllers from "../controllers";

const router = express.Router();

router.post("/", Controllers.Messages.create);
router.get("/:teamId", Controllers.Messages.get);
router.put("/", Controllers.Messages.update); // Added update route
router.delete("/", Controllers.Messages.deleteMessage);

export default router;
