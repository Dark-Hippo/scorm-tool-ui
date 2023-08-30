interface NewUserData {
  email: string;
  name: string;
}

interface UserData {
  email: string;
  name: string;
  lastLoggedIn: Date;
}

export type { UserData, NewUserData };
