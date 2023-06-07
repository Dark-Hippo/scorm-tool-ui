import { TableCell, TableRow } from '@mui/material';
import { FileWithPath } from 'react-dropzone';
import { StatusIndicator } from './StatusIndicator';
import { FileUploadStatus } from '../types/FileWithStatus';
import { useEffect, useState } from 'react';
import { UploadScormFile } from '../services/ScormService';

import type { CourseWithSite } from '../types/CourseWithSite';
import { SiteLink } from './SiteLink';

export const ValidFileRow = ({
  acceptedFile,
}: {
  acceptedFile: FileWithPath;
}) => {
  const [status, setStatus] = useState<FileUploadStatus>(
    FileUploadStatus.InProgress
  );

  const [course, setCourse] = useState<CourseWithSite>();
  const [error, setError] = useState('');

  useEffect(() => {
    const uploadFile = async () => {
      const response = await UploadScormFile(acceptedFile);
      if (!response.isValid) {
        setStatus(FileUploadStatus.Invalid);
        setError(response?.message || 'Unknown error');
      } else {
        setStatus(FileUploadStatus.Complete);
        setCourse(response.course);
      }
    };

    uploadFile();
  }, []);
  return (
    <TableRow
      className={status === FileUploadStatus.Complete ? 'valid' : 'invalid'}
    >
      <TableCell align="left">
        <StatusIndicator status={status} />
      </TableCell>
      <TableCell align="left">{acceptedFile.name}</TableCell>
      {status === FileUploadStatus.Invalid && (
        <TableCell align="left" colSpan={3}>
          {error}
        </TableCell>
      )}
      {status === FileUploadStatus.Complete && (
        <>
          <TableCell align="left">{course?.name}</TableCell>
          <TableCell align="left">{course?.language}</TableCell>
          <TableCell align="left">
            {course?.site && (
              <SiteLink id={course.site.id} guid={course.site.guid} />
            )}
          </TableCell>
        </>
      )}
    </TableRow>
  );
};
