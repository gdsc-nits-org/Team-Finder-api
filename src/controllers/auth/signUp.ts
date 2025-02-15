import * as Interfaces from "../../interfaces";
import * as Errors from "../../globals/errors";
import * as Success from "../../globals/success";

import { prisma } from "../../utils";

const signUp: Interfaces.Controllers.Async = async (req, res, next) => {
  try {
    const auth: string | undefined = req?.headers?.authorization;
    if (!auth) {
      return next(Errors.User.badRequest("Auth token is missing"));
    }

    const user: Interfaces.User.CreateUserBody = req.body;
    let {
      firstName,
      middleName,
      lastName,
      username,
      email,
      imageUrl,
      techStack,
    } = user;

    if (!firstName || !username || !email) {
      return next(
        Errors.User.badRequest("First Name, username, and email are required")
      );
    }
    firstName = firstName.trim();
    middleName = middleName?.trim() || "";
    lastName = lastName?.trim() || "";
    username = username.trim();
    email = email.trim();
    imageUrl = imageUrl?.trim() || "";
    techStack = techStack ?? [];

    const idToken: string = (auth as string).split(" ")[1];

    let decodedToken;
    try {
      if (process.env.NODE_ENV === "development") {
        decodedToken = {
          uid: idToken,
          firebaseEmail: email,
          picture: imageUrl,
        };
      } else {
        // idk
      }
    } catch (err) {
      return next(err);
    }

    if (!decodedToken) {
      return next(Errors.User.userNotAuthenticated);
    }

    const { uid, firebaseEmail, picture } = decodedToken;

    const userExists = await prisma.user.count({
      where: {
        OR: [{ email }, { username }],
      },
    });
    if (userExists) {
      return next(Errors.User.userAlreadyExists);
    }

    const newUser = await prisma.user.create({
      data: {
        firstName,
        middleName,
        lastName,
        firebaseId: uid,
        username,
        email: process.env.NODE_ENV === "development" ? email : firebaseEmail!,
        imageUrl: imageUrl || picture,
        techStack,
      },
    });

    return res.status(201).json({
      ...Success.User.userCreated,
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    return next(Errors.System.serverError);
  }
};

export { signUp };
