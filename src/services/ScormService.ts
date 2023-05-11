import { SERVER } from '../config';

import type { ScormValidateResponse } from '../types/Responses';

export const ValidateScormFile = async (file: File) => {
  const formData = new FormData();
  formData.append('scorm', file);
  const response = await fetch(`${SERVER}/scorm/validate`, {
    method: 'POST',
    body: formData,
    mode: 'cors',
  });
  const result: ScormValidateResponse = await response.json();

  return result;
};
