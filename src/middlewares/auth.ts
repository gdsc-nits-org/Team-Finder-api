import * as Interface from "../interfaces/index.js";
import * as Errors from "../globals/errors";

import { prisma } from "../utils";

const validateUser: Interface.Middlewares.Async = async (req, res, next) => {
  const auth: string | undefined = req?.headers?.authorization;
  if (!auth) {
    return next(Errors.User.badRequest("Auth token is missing"));
  }

  const idToken: string = (auth as string).split(" ")[1];
  let decodedToken;
  try {
    if (process.env.NODE_ENV === "development") {
      decodedToken = {
        uid: idToken,
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

  const { uid } = decodedToken;

  const user = await prisma.user.findUnique({
    where:
      process.env.NODE_ENV === "development"
        ? { id: uid }
        : { firebaseId: uid },
  });
  if (!user) {
    return next(Errors.User.userNotAuthenticated);
  }

  req.user = user;
  return next();
};

export { validateUser };
