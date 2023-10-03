import type { UserData } from '../types/UserData';
import { LogError } from './ErrorService';

export const createUser = async (
  profileData: UserData,
  accessToken: string
): Promise<UserData> => {
  const response = await fetch(`/api/users`, {
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

  return profileData;
};

export const getUser = async (
  userId: number,
  accessToken: string
): Promise<UserData | null> => {
  const response = await fetch(`/api/users/${userId}`, {
    headers: {
      'Content-Type': 'application/json',

      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    LogError({
      status: response.status,
      message: response.statusText,
    });
    throw new Error('Failed to get profile');
  }

  return response.json();
};

export const getUsers = async (
  accessToken: string
): Promise<UserData[] | null> => {
  const response = await fetch(`/api/users`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    LogError({
      status: response.status,
      message: response.statusText,
    });
    throw new Error('Failed to get profiles');
  }

  return response.json();
};

export const updateUser = async (
  userId: number,
  profileData: UserData,
  accessToken: string
): Promise<UserData> => {
  const response = await fetch(`/api/users/${userId}`, {
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

  return profileData;
};

export const deleteUser = async (
  userId: number,
  accessToken: string
): Promise<void> => {
  const response = await fetch(`/api/users/${userId}`, {
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
