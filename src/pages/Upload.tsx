import { Box } from '@mui/material';
import { FileUploader } from '../FileUploader';
import { CourseList } from '../components/CourseList';
import { useCallback, useState } from 'react';

import type { Course } from '../types/Course';
import { FileUploadStatus, FileWithStatus } from '../types/FileWithStatus';
import { InvalidFileList } from '../components/InvalidFileList';
import { FileWithPath, FileRejection } from 'react-dropzone';

const courses: Course[] = [
  {
    id: 3,
    name: 'Test course',
    language: 'gb',
    createdByUserId: 1,
    createdDate: '2023-05-01T15:24:38.659Z',
    updatedDate: '2023-05-01T15:24:38.659Z',
  },
  {
    id: 4,
    name: 'Something funny',
    language: 'gb',
    createdByUserId: 1,
    createdDate: '2023-05-01T15:29:56.520Z',
    updatedDate: '2023-05-01T15:29:56.520Z',
  },
  {
    id: 5,
    name: 'Avoiding a scandal',
    language: 'en',
    createdByUserId: 1,
    createdDate: '2023-05-01T15:49:35.774Z',
    updatedDate: '2023-05-01T15:49:35.774Z',
  },
];

export const Upload = () => {
  const [courseList, setCourseList] = useState<Course[]>(courses);
  const [invalidFileList, setInvalidFileList] = useState<FileWithStatus[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[], fileRejections: FileRejection[]) => {
      acceptedFiles.forEach((file) => {
        const fileWithStatus: FileWithStatus = {
          file: file,
          status: FileUploadStatus.InProgress,
        };

        // validate file
        // upload file, if valid, add to courseList, else add to invalidFileList
      });

      fileRejections.forEach((rejection) => {
        const fileWithStatus: FileWithStatus = {
          file: rejection.file,
          status: FileUploadStatus.Invalid,
          message: rejection.errors,
        };

        setInvalidFileList([...invalidFileList, fileWithStatus]);
      });
    },
    []
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <FileUploader onDrop={onDrop} />
      <CourseList data={courseList} />
      <hr />
      <InvalidFileList data={invalidFileList} />
    </Box>
  );
};
