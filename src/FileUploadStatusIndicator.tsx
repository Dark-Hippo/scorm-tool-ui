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
  let element: JSX.Element;
  // setStatus(FileUploadStatus.InProgress);

  // useEffect(() => {
  //   console.log('validating...');
  //   ValidateScormFile(file.file).then((isValid) => {
  //     if (isValid) {
  //       console.log('valid');
  //       // setStatus(FileUploadStatus.Complete);
  //     } else {
  //       console.log('invalid');
  //       // setStatus(FileUploadStatus.Error);
  //     }
  //   });
  // }, [file.status]);

  // switch (status) {
  //   case FileUploadStatus.Complete:
  //     element = (
  //       <p>
  //         <DoneSharp className="complete" /> {file.file.name}
  //       </p>
  //     );
  //   case FileUploadStatus.Error:
  //     element = (
  //       <p>
  //         <CancelOutlined className="error" /> {file.file.name}
  //       </p>
  //     );
  //   case FileUploadStatus.InProgress:
  //     element = (
  //       <p>
  //         <CachedSharp className="in-progress" /> {file.file.name}
  //       </p>
  //     );
  // }

  return (
    <p>
      <DoneSharp className={status} /> {file.file.name}
    </p>
  );
};
