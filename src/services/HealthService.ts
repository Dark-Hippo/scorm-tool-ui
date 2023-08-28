import { APIResponse } from '../types/Responses';
import { LogError } from './ErrorService';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Function to call the health endpoint of the backend "/health"
 * @returns {Promise<Response>} Returns a promise with the response
 */
export const GetHealth = async (accessToken: string): Promise<APIResponse> => {
  const response = await fetch(`${API_URL}/health`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // check response for errors and log them using LogError
  if (!response.ok) {
    LogError({
      status: response.status,
      message: `Error calling ${API_URL}/health: ${response.statusText}`,
    });

    const errorResponse: Promise<APIResponse> = Promise.resolve({
      isValid: false,
      message: `Error calling ${API_URL}/health: ${response.statusText}`,
    });

    return errorResponse;
  }

  const result: APIResponse = await response.json();

  return result;
};

/**
 * Function to call the db health endpoint of the backend "/health/db"
 * @returns {Promise<Response>} Returns a promise with the response
 */
export const GetDbHealth = async (
  accessToken: string
): Promise<APIResponse> => {
  const response = await fetch(`${API_URL}/health/db`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // check response for errors and log them using LogError
  if (!response.ok) {
    LogError({
      status: response.status,
      message: `Error calling ${API_URL}/health/db: ${response.statusText}`,
    });

    const errorResponse: Promise<APIResponse> = Promise.resolve({
      isValid: false,
      message: `Error calling ${API_URL}/health: ${response.statusText}`,
    });

    return errorResponse;
  }

  const result: APIResponse = await response.json();

  return result;
};
