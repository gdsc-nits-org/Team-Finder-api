import * as Interfaces from "../../interfaces";
import * as Utils from "../../utils";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const update: Interfaces.Controllers.Async = async (req, res, next) => {
  try {
    const { messageId, senderId, newContent } = req.body;

    // Find the message
    const message = await prisma.message.findFirst({
      where: { id: messageId },
    });

    if (!message) {
      return res.json(Utils.Response.error("Message not found."));
    }

    // Only allow the sender to update the message
    if (message.senderId !== senderId) {
      return res.json(
        Utils.Response.error("You can only edit your own messages.")
      );
    }

    // Update the message content
    const updatedMessage = await prisma.message.update({
      where: { id: messageId },
      data: { content: newContent },
    });

    return res.json(Utils.Response.success(updatedMessage));
  } catch (error) {
    next(error);
    return;
  }
};

export { update };
