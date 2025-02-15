import * as Interfaces from "../../interfaces";
import * as Errors from "../../globals/errors";
import * as Success from "../../globals/success";

import { prisma } from "../../utils";
import { User } from "@prisma/client";

const getOneUserById: Interfaces.Controllers.Async = async (req, res, next) => {
  const id = String(req?.params?.id);
  if (!id) {
    return next(Errors.User.badRequest("User ID is required"));
  }

  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!user) {
    return next(Errors.User.userNotFound);
  }
  return res.json(Success.User.getUserResponse(user as User));
};

const getAllUser: Interfaces.Controllers.Async = async (req, res, next) => {
  const users = await prisma.user.findMany();
  return res.json(Success.User.getAllUsersResponse(users));
};

const searchUsers: Interfaces.Controllers.Async = async (req, res, next) => {
  const { name, techStack } = req.query;
  if (
    (name && typeof name !== "string") ||
    (techStack && typeof techStack !== "string")
  ) {
    return next(Errors.User.badRequest("Query is not a string"));
  }

  const techStackArray = techStack
    ? techStack.split(",").map((skill) => skill.trim())
    : [];
  const users = await prisma.user.findMany({
    where: {
      OR: [
        {
          firstName: {
            contains: name,
            mode: "insensitive",
          },
        },
        {
          lastName: {
            contains: name,
            mode: "insensitive",
          },
        },
        {
          username: {
            contains: name,
            mode: "insensitive",
          },
        },
        {
          techStack: {
            hasSome: techStackArray,
          },
        },
      ],
    },
    // select: {
    //   firstName: true,
    //   lastName: true,
    //   username: true,
    //   email: true,
    //   imageUrl: true,
    // },
  });

  return res.json(Success.User.getAllUsersResponse(users));
};

export { getOneUserById, getAllUser, searchUsers };
