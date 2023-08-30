import type { NewUserData, UserData } from '../types/UserProfile';
import { LogError } from './ErrorService';

export const createUser = async (
  profileData: NewUserData,
  accessToken: string
): Promise<void> => {
  const response = await fetch(`/api/profiles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(profileData),
  });

  if (!response.ok) {
    LogError({
      status: response.status,
      message: response.statusText,
    });
    throw new Error('Failed to create profile');
  }
};

export const getUser = async (
  email: string,
  accessToken: string
): Promise<UserData | null> => {
  // Return mock data
  return {
    email: email,
    name: 'John Doe',
    lastLoggedIn: new Date('2021-08-01T12:34:56Z'),
  };
};

export const getUsers = async (
  accessToken: string
): Promise<UserData[] | null> => {
  // Return mock data
  return [
    {
      email: 'john.doe@example.com',
      name: 'John Doe',
      lastLoggedIn: new Date('2021-08-01T12:34:56Z'),
    },
    {
      email: 'bob.bobbington@example.com',
      name: 'Bob Bobbington',
      lastLoggedIn: new Date('2021-08-01T12:34:56Z'),
    },
  ];
};

export const updateUser = async (
  email: string,
  profileData: UserData,
  accessToken: string
): Promise<void> => {
  const response = await fetch(`/api/profiles/${email}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(profileData),
  });

  if (!response.ok) {
    LogError({
      status: response.status,
      message: response.statusText,
    });
    throw new Error('Failed to update profile');
  }
};

export const deleteUser = async (
  email: string,
  accessToken: string
): Promise<void> => {
  const response = await fetch(`/api/profiles/${email}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    LogError({
      status: response.status,
      message: response.statusText,
    });
    throw new Error('Failed to delete profile');
  }
};
