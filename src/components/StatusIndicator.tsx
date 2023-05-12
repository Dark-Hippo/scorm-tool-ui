import { CachedSharp, CancelOutlined, DoneSharp } from '@mui/icons-material';
import { FileUploadStatus } from '../types/FileWithStatus';

import './StatusIndicator.css';

export const StatusIndicator = ({ status }: { status: FileUploadStatus }) => {
  switch (status) {
    case FileUploadStatus.Complete:
      return <DoneSharp className="complete" />;
    case FileUploadStatus.Error:
    case FileUploadStatus.Invalid:
      return <CancelOutlined className="error" />;
    case FileUploadStatus.InProgress:
      return <CachedSharp className="in-progress" />;
  }
};
