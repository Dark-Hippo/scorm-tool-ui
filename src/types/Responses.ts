import type { Course } from './Course';

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
}

export type { APIResponse, ScormValidateResponse, ScormUploadResponse };
