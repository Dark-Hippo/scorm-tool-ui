import type { CourseWithSite } from './CourseWithSite';

interface APIResponse {
  isValid: boolean;
  message?: string;
}

interface ScormValidateResponse extends APIResponse {
  title: string;
  language: string;
}

interface ScormUploadResponse extends APIResponse {
  course: CourseWithSite;
}

export type { APIResponse, ScormValidateResponse, ScormUploadResponse };
