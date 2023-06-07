import { Box } from '@mui/material';
import { FileUploader } from '../FileUploader';
import { UploadCourseList } from '../components/UploadCourseList';
import { useCallback, useState } from 'react';
import { FileWithPath, FileRejection } from 'react-dropzone';

export const Upload = () => {
  const [fileRejections, setFileRejections] = useState<FileRejection[]>([]);
  const [acceptedFiles, setAcceptedFiles] = useState<FileWithPath[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[], fileRejections: FileRejection[]) => {
      setAcceptedFiles(acceptedFiles);
      setFileRejections(fileRejections);
    },
    []
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <FileUploader onDrop={onDrop} />
      <UploadCourseList
        acceptedFiles={acceptedFiles}
        fileRejections={fileRejections}
      />
    </Box>
  );
};
