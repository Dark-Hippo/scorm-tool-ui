interface UserData {
  id?: number;
  email: string;
  name: string;
  active: boolean;
  lastLoggedIn?: Date;
}

export type { UserData };
