import * as Interfaces from "../../interfaces";
import * as Errors from "../../globals/errors";
import * as Success from "../../globals/success";
import { Thread } from "../../interfaces";

import { prisma } from "../../utils";

const getMyCreatedThreads: Interfaces.Controllers.Async = async (
  req,
  res,
  next
) => {
  const { id } = req.user!;

  const threads = await prisma.thread.findMany({
    where: {
      creatorId: id,
    },
    select: {
      id: true,
      title: true,
      description: true,
      creatorId: true,
      creator: {
        select: {
          id: true,
          username: true,
          imageUrl: true,
        },
      },
      enrolledUsers: {
        select: {
          userId: true,
          user: {
            select: {
              id: true,
              username: true,
              imageUrl: true,
            },
          },
          role: true,
          enrollmentStatus: true,
        },
      },
      maxMembers: true,
      messages: {
        select: {
          id: true,
          content: true,
          createdAt: true,
          senderId: true,
          sender: {
            select: {
              id: true,
              username: true,
              imageUrl: true,
            },
          },
        },
      },
    },
  });
  res.json(Success.User.getAllMyCreatedThreads(threads));
};

const getMyAllThreads: Interfaces.Controllers.Async = async (
  req,
  res,
  next
) => {
  const { id } = req.user!;

  const threads = await prisma.enrolledThread.findMany({
    where: {
      userId: id,
    },
    select: {
      id: true,
      role: true,
      enrollmentStatus: true,

      thread: {
        select: {
          id: true,
          title: true,
          description: true,
          creatorId: true,
          creator: {
            select: {
              id: true,
              username: true,
              imageUrl: true,
            },
          },
          enrolledUsers: {
            select: {
              userId: true,
              user: {
                select: {
                  id: true,
                  username: true,
                  imageUrl: true,
                },
              },
              role: true,
              enrollmentStatus: true,
            },
          },
          maxMembers: true,
          messages: {
            select: {
              id: true,
              content: true,
              createdAt: true,
              senderId: true,
              sender: {
                select: {
                  id: true,
                  username: true,
                  imageUrl: true,
                },
              },
            },
          },
        },
      },
    },
  });
  res.json(Success.User.getMyAllThreads(threads));
};

const getMyEnrolledThreads: Interfaces.Controllers.Async = async (
  req,
  res,
  next
) => {
  const { id } = req.user!;

  const threads = await prisma.enrolledThread.findMany({
    where: {
      userId: id,
      enrollmentStatus: "ACCEPTED",
    },
    select: {
      id: true,
      role: true,
      enrollmentStatus: true,

      thread: {
        select: {
          id: true,
          title: true,
          description: true,
          creatorId: true,
          creator: {
            select: {
              id: true,
              username: true,
              imageUrl: true,
            },
          },
          enrolledUsers: {
            select: {
              userId: true,
              user: {
                select: {
                  id: true,
                  username: true,
                  imageUrl: true,
                },
              },
              role: true,
              enrollmentStatus: true,
            },
          },
          maxMembers: true,
          messages: {
            select: {
              id: true,
              content: true,
              createdAt: true,
              senderId: true,
              sender: {
                select: {
                  id: true,
                  username: true,
                  imageUrl: true,
                },
              },
            },
          },
        },
      },
    },
  });
  res.json(Success.User.getMyAllThreads(threads));
};

const getMyRejectedThreads: Interfaces.Controllers.Async = async (
  req,
  res,
  next
) => {
  const { id } = req.user!;

  const threads = await prisma.enrolledThread.findMany({
    where: {
      userId: id,
      enrollmentStatus: "REJECTED",
    },
    select: {
      id: true,
      role: true,
      enrollmentStatus: true,

      thread: {
        select: {
          id: true,
          title: true,
          description: true,
          creatorId: true,
          creator: {
            select: {
              id: true,
              username: true,
              imageUrl: true,
            },
          },
          enrolledUsers: {
            select: {
              userId: true,
              user: {
                select: {
                  id: true,
                  username: true,
                  imageUrl: true,
                },
              },
              role: true,
              enrollmentStatus: true,
            },
          },
          maxMembers: true,
          messages: {
            select: {
              id: true,
              content: true,
              createdAt: true,
              senderId: true,
              sender: {
                select: {
                  id: true,
                  username: true,
                  imageUrl: true,
                },
              },
            },
          },
        },
      },
    },
  });
  res.json(Success.User.getMyAllThreads(threads));
};

export {
  getMyAllThreads,
  getMyCreatedThreads,
  getMyEnrolledThreads,
  getMyRejectedThreads,
};
