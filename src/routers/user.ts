import express from "express";
import * as Controllers from "../controllers";
import * as Middlewares from "../middlewares";

const router = express.Router();

//protected
router.get(
  "/getAllMyThreads",
  Middlewares.Auth.validateUser,
  Controllers.User.getMyAllThreads
);
router.get(
  "/getMyCreatedThreads",
  Middlewares.Auth.validateUser,
  Controllers.User.getMyCreatedThreads
);
router.get(
  "getMyEnrolledThreads",
  Middlewares.Auth.validateUser,
  Controllers.User.getMyEnrolledThreads
);
router.get(
  "getMyRejectedThreads",
  Middlewares.Auth.validateUser,
  Controllers.User.getMyRejectedThreads
);

router.get("/search/", Controllers.User.searchUsers);
router.get("/", Controllers.User.getAllUser);
router.get("/:id", Controllers.User.getOneUserById);

export default router;
