import * as Interfaces from "../../interfaces";
import * as Errors from "../../globals/errors";
import * as Success from "../../globals/success";

import { prisma } from "../../utils";

//NOT FINISHED
const updateUserDetails: Interfaces.Controllers.Async = async (
  req,
  res,
  next
) => {
  let { firstName, lastName, middleName, username, imageUrl, techStack } =
    req.body as Interfaces.User.updateUserBody;

  const user = req.user;

  if (!user) {
    return next(Errors.User.userNotFound);
  }

  firstName = firstName || user.firstName;
  middleName = middleName === "" ? "" : middleName || user.middleName;
  lastName = lastName === "" ? "" : lastName || user.lastName;
  imageUrl = imageUrl || user.imageUrl;
  username = username || user.username;
  techStack = techStack || user.techStack;

  try {
    const updatedUser = await prisma.$transaction(async (prismaClient) => {
      if (
        await prismaClient.user.findFirst({
          where: {
            username: username,
            firebaseId: { not: user.firebaseId },
          },
        })
      ) {
        throw Errors.User.userAlreadyExists;
      }

      return await prismaClient.user.update({
        where: {
          firebaseId: user.firebaseId,
        },
        data: {
          firstName,
          lastName,
          middleName,
          imageUrl,
          username,
          techStack,
          updatedAt: new Date(),
        },
      });
    });
    res.json(Success.User.updateUserResponse(updatedUser));
  } catch (error) {
    return next(error);
  }
};
