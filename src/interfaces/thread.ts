interface ThreadResponseBody {
  id: string;
  title: string;
  description: string;
  creatorId: string;
  creator: {
    id: string;
    username: string;
    imageUrl: string;
  };
  enrolledUsers: {
    userId: string;
    user: {
      id: string;
      username: string;
      imageUrl: string;
    };
    role: string;
    enrollmentStatus: string;
  }[];
  maxMembers: number;
  messages: {
    id: string;
    content: string;
    createdAt: Date;
    senderId: string;
    sender: {
      id: string;
      username: string;
      imageUrl: string;
    };
  }[];
}

interface enrolledThreadResponseBody {
  id: string;
  role: string;
  enrollmentStatus: string;
  thread: ThreadResponseBody;
}

export { ThreadResponseBody, enrolledThreadResponseBody };
