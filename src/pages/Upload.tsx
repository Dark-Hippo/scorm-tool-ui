import { Box } from '@mui/material';
import { FileUploader } from '../FileUploader';
import { CourseWithSiteList } from '../components/CourseWithSiteList';
import { useCallback, useState } from 'react';
import { FileUploadStatus, FileWithStatus } from '../types/FileWithStatus';
import { InvalidFileList } from '../components/InvalidFileList';
import { FileWithPath, FileRejection } from 'react-dropzone';

import type { CourseWithSite } from '../types/CourseWithSite';
import { UploadScormFile } from '../services/ScormService';

const courses: CourseWithSite[] = [
  {
    courseId: 3,
    siteId: 3,
    guid: '',
    name: 'Test course',
    language: 'gb',
    title: '',
  },
  {
    courseId: 4,
    siteId: 4,
    guid: '',
    name: 'Test course 2',
    language: 'gb',
    title: 'something.zip',
  },
  {
    courseId: 5,
    siteId: 5,
    guid: '',
    name: 'Test course 3',
    language: 'fr',
    title: 'something-else.zip',
  },
];

export const Upload = () => {
  const [courseList, setCourseList] = useState<CourseWithSite[]>(courses);
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

        const newCourseWithSite: CourseWithSite = {
          courseId: uploadResponse.course.id,
          siteId: uploadResponse.site.id,
          guid: uploadResponse.site.guid,
          name: uploadResponse.course.name,
          language: uploadResponse.course.language,
          title: uploadResponse.site.title,
        };
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
