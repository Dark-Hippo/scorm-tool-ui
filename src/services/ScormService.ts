import { API_URL, USER_ID } from '../config';

import type {
  ScormValidateResponse,
  ScormUploadResponse,
} from '../types/Responses';

export const ValidateScormFile = async (
  file: File
): Promise<ScormValidateResponse> => {
  const formData = new FormData();
  formData.append('scorm', file);
  const response = await fetch(`${API_URL}/scorm/validate`, {
    method: 'POST',
    body: formData,
    mode: 'cors',
  });
  const result: ScormValidateResponse = await response.json();

  return result;
};

export const UploadScormFile = async (
  file: File
): Promise<ScormUploadResponse> => {
  const formData = new FormData();
  formData.append('scorm', file);
  formData.append('userId', USER_ID.toString());
  const response = await fetch(`${API_URL}/scorm/upload`, {
    method: 'POST',
    body: formData,
    mode: 'cors',
  });
  const result: ScormUploadResponse = await response.json();

  return result;
};
