import { User } from "@prisma/client";
import * as Utils from "../../utils";
import { Thread } from "../../interfaces";

const userCreated = Utils.Response.success("User Created");

const getUserResponse = (user: User) => {
  return Utils.Response.success<User>(user);
};
const getAllUsersResponse = (users: User[]) => {
  return Utils.Response.success<User[]>(users);
};

const updateUserResponse = (user: User) => {
  return Utils.Response.success<User>(user);
};

const getAllMyCreatedThreads = (threads: Thread.ThreadResponseBody[]) => {
  return Utils.Response.success<Thread.ThreadResponseBody[]>(threads);
};

const getMyAllThreads = (threads: Thread.enrolledThreadResponseBody[]) => {
  return Utils.Response.success<Thread.enrolledThreadResponseBody[]>(threads);
};

export {
  userCreated,
  getUserResponse,
  updateUserResponse,
  getAllUsersResponse,
  getAllMyCreatedThreads,
  getMyAllThreads,
};
