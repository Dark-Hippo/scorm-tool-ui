import { CachedSharp, CancelOutlined, DoneSharp } from '@mui/icons-material';
import { FileError, FileWithPath } from 'react-dropzone';

export enum FileUploadStatus {
  Complete = 'complete',
  Error = 'error',
  InProgress = 'inProgress',
}

export interface FileWithStatus {
  status: FileUploadStatus;
  file: FileWithPath;
  message?: FileError[];
}

export const FileUploadStatusIndicator = ({
  fileStatus,
}: {
  fileStatus: FileUploadStatus;
}) => {
  switch (fileStatus) {
    case FileUploadStatus.Complete:
      return <DoneSharp className="complete" />;
    case FileUploadStatus.Error:
      return <CancelOutlined className="error" />;
    case FileUploadStatus.InProgress:
      return <CachedSharp className="in-progress" />;
  }
};
