import * as Utils from "../../utils";

const userNotAuthenticated = Utils.Response.error(
  "User Not authenticated",
  401
);

const userNotFound = Utils.Response.error("User not found", 404);

const badRequest = (msg = "Bad request") => {
  return Utils.Response.error(msg, 400);
};

const userAlreadyExists = Utils.Response.error(
  "User exist with same username",
  409
);

const notAcceptable = (msg = "Some fields are not acceptable") => {
  return Utils.Response.error(msg, 403);
};

export {
  userNotAuthenticated,
  userNotFound,
  badRequest,
  userAlreadyExists,
  notAcceptable,
};
