import express from "express";
import * as Controllers from "../controllers";

const router = express.Router();

router.get("/search/", Controllers.User.searchUsers);
router.get("/", Controllers.User.getAllUser);
router.get("/:id", Controllers.User.getOneUserById);

export default router;
