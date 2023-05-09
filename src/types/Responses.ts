interface APIResponse {
  isValid: boolean;
  message?: string;
}

interface ScormValidateResponse extends APIResponse {
  title: string;
  language: string;
}
