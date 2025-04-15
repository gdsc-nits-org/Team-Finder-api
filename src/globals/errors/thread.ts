import * as Utils from "../../utils";

const badRequest = (msg = "Bad request") => {
  return Utils.Response.error(msg, 400);
};

export { badRequest };
