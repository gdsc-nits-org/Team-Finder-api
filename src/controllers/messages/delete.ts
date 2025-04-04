import * as Utils from "../../utils";
import * as Interfaces from "../../interfaces";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteMessage: Interfaces.Controllers.Async = async (req, res, next) => {
  try {
    const { messageId, senderId } = req.body;

    const message = await prisma.message.findFirst({
      where: { id: messageId },
    });

    if (!message) {
      return res.json(Utils.Response.error("Message not found."));
    }

    if (message.senderId !== senderId) {
      return res.json(
        Utils.Response.error("You can only delete your own messages.")
      );
    }

    await prisma.message.delete({ where: { id: messageId } });

    return res.json(Utils.Response.success("Message deleted."));
  } catch (error) {
    next(error);
    return;
  }
};

export { deleteMessage };
