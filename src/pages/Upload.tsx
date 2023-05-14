import { Box } from '@mui/material';
import { FileUploader } from '../FileUploader';
import { CourseWithSiteList } from '../components/CourseWithSiteList';
import { useCallback, useState } from 'react';
import { FileUploadStatus, FileWithStatus } from '../types/FileWithStatus';
import { InvalidFileList } from '../components/InvalidFileList';
import { FileWithPath, FileRejection } from 'react-dropzone';

import type { CourseWithSite } from '../types/CourseWithSite';
import { UploadScormFile } from '../services/ScormService';

export const Upload = () => {
  const [courseList, setCourseList] = useState<CourseWithSite[]>([]);
  const [invalidFileList, setInvalidFileList] = useState<FileWithStatus[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[], fileRejections: FileRejection[]) => {
      acceptedFiles.forEach(async (file) => {
        const fileWithStatus: FileWithStatus = {
          file: file,
          status: FileUploadStatus.InProgress,
        };

        const uploadResponse = await UploadScormFile(file);

        if (!uploadResponse.isValid) {
          const invalidFile: FileWithStatus = {
            file: file,
            status: FileUploadStatus.Invalid,
            message: [
              {
                message: `${file.name} is not a valid Scorm file`,
                code: 'invalid-scorm',
              },
            ],
          };
          setInvalidFileList([...invalidFileList, invalidFile]);
          return;
        }

        const newCourseWithSite: CourseWithSite = uploadResponse.course;
        setCourseList([...courseList, newCourseWithSite]);
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
      <CourseWithSiteList data={courseList} />
      <hr />
      <InvalidFileList data={invalidFileList} />
    </Box>
  );
};
