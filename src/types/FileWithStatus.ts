import { FileError, FileWithPath } from 'react-dropzone';

export enum FileUploadStatus {
  Complete = 'complete',
  Error = 'error',
  InProgress = 'inProgress',
  Invalid = 'invalid',
}

interface FileWithStatus {
  status: FileUploadStatus;
  file: FileWithPath;
  message?: FileError[];
}

export type { FileWithStatus };
