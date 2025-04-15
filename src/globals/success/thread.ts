import * as Utils from "../../utils";
import { Thread } from "@prisma/client";
const threadCreated = Utils.Response.success("Thread Created");

const getThreadResponse = (thread: Thread) => {
  return Utils.Response.success<Thread>(thread);
};
const getAllThreadResponse = (threads: Thread[]) => {
  return Utils.Response.success<Thread[]>(threads);
};

export { threadCreated, getThreadResponse, getAllThreadResponse };
