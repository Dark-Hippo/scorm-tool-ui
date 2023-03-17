import { CachedSharp, CancelOutlined, DoneSharp } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { FileError, FileWithPath } from 'react-dropzone';
import { ValidateScormFile } from './services/ScormService';

export enum FileUploadStatus {
  Complete = 'complete',
  Error = 'error',
  InProgress = 'inProgress',
  Invalid = 'invalid',
}

export interface FileWithStatus {
  status: FileUploadStatus;
  file: FileWithPath;
  message?: FileError[];
}

const setStatusElement = (status: FileUploadStatus) => {
  console.log(`setting element to ${status}`);
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

export const FileUploadStatusIndicator = ({
  file,
}: {
  file: FileWithStatus;
}) => {
  if (file.status === FileUploadStatus.Invalid) {
    return (
      <p>
        <CancelOutlined className="error" /> {file.file.name}
      </p>
    );
  }

  const [status, setStatus] = useState(file.status);
  const [element, setElement] = useState<JSX.Element>(() =>
    setStatusElement(status)
  );

  useEffect(() => {
    console.log('validating...');
    ValidateScormFile(file.file).then((isValid) => {
      if (isValid) {
        setStatus(FileUploadStatus.Complete);
        setElement(<DoneSharp className="complete" />);
      } else {
        setStatus(FileUploadStatus.Error);
        setElement(<CancelOutlined className="error" />);
      }
    });
  }, []);

  return (
    <p>
      {element} {file.file.name} {status}
    </p>
  );
};
