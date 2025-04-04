import { Router } from "express";
import healthRouter from "./health";
import threadRouter from "./thread";

export const health = healthRouter;
export const thread = threadRouter;
