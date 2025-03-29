import * as Interfaces from "../../interfaces";
import * as Utils from "../../utils";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const create: Interfaces.Controllers.Async = async (req, res, next) => {
  try {
    const { content, senderId, teamId } = req.body;

    // Check if user is accepted in the team
    const teamMember = await prisma.teamMember.findFirst({
      where: { userId: senderId, teamId, status: "accepted" },
    });

    if (!teamMember) {
      return res.json(
        Utils.Response.error("You are not allowed to send messages.")
      );
    }

    const message = await prisma.message.create({
      data: { content, senderId, teamId },
    });

    return res.json(Utils.Response.success(message));
  } catch (error) {
    next(error);
    return;
  }
};

export { create };
