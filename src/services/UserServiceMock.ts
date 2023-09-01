import type { UserData } from '../types/UserProfile';
import { LogError } from './ErrorService';

let users: UserData[] = [
  {
    id: 1,
    email: 'john.doe@example.com',
    name: 'John Doe',
    lastLoggedIn: new Date('2021-08-01T12:34:56Z'),
  },
  {
    id: 2,
    email: 'bob.bobbington@example.com',
    name: 'Bob Bobbington',
    lastLoggedIn: new Date('2021-08-01T12:34:56Z'),
  },
];

export const createUser = async (
  profileData: UserData,
  accessToken: string
): Promise<UserData> => {
  const newId =
    users
      .map((user) => user.id)
      .sort()
      .pop()! + 1;
  profileData.id = newId;
  users.push(profileData);

  return profileData;
};

export const getUser = async (
  email: string,
  accessToken: string
): Promise<UserData | null> => {
  return users.find((user) => user.email === email) ?? null;
};

export const getUsers = async (
  accessToken: string
): Promise<UserData[] | null> => {
  // Return mock data
  return users;
};

export const updateUser = async (
  userId: number,
  profileData: UserData,
  accessToken: string
): Promise<UserData> => {
  const user = users.find((user) => user.id === userId)!;
  user.name = profileData.name;
  user.email = profileData.email;

  return user;
};

export const deleteUser = async (
  userId: number,
  accessToken: string
): Promise<void> => {
  users = users.filter((user) => user.id !== userId);
};
