interface CreateUserBody {
  firstName: string;
  middleName: string | "" | null | undefined;
  lastName: string | "" | null | undefined;
  email: string;
  username: string;
  imageUrl: string | "" | null | undefined;
  techStack: string[];
}

interface updateUserBody {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  username?: string;
  imageUrl?: string;
  techStack?: string[];
}

export { CreateUserBody, updateUserBody };
