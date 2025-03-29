import * as Utils from "../../utils";
import * as Interfaces from "../../interfaces";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const get: Interfaces.Controllers.Async = async (req, res, next) => {
  try {
    const { teamId } = req.params;

    const messages = await prisma.message.findMany({
      where: { teamId },
      orderBy: { time: "asc" },
    });

    return res.json(Utils.Response.success(messages));
  } catch (error) {
    next(error);
    return;
  }
};

export { get };
