import type { Course } from './Course';
import { Site } from './Site';

interface APIResponse {
  isValid: boolean;
  message?: string;
}

interface ScormValidateResponse extends APIResponse {
  title: string;
  language: string;
}

interface ScormUploadResponse extends APIResponse {
  course: Course;
  site: Site;
}

export type { APIResponse, ScormValidateResponse, ScormUploadResponse };
