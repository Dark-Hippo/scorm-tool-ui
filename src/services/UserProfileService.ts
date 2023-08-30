import type { ProfileData } from '../types/UserProfile';
import { LogError } from './ErrorService';

export const createUserProfile = async (
  profileData: ProfileData,
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

export const getProfile = async (
  email: string,
  accessToken: string
): Promise<ProfileData | null> => {
  // Return mock data
  return {
    email: email,
    name: 'John Doe',
    lastLoggedIn: new Date('2021-08-01T12:34:56Z'),
  };
};

export const updateProfile = async (
  email: string,
  profileData: ProfileData,
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

export const deleteProfile = async (
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
