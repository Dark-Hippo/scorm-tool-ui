import { TableCell, TableRow } from '@mui/material';
import { FileWithPath } from 'react-dropzone';
import { StatusIndicator } from './StatusIndicator';
import { useEffect, useState } from 'react';
import { UploadScormFile } from '../services/ScormService';
import { SiteLink } from './SiteLink';

import { FileUploadStatus } from '../types/FileWithStatus';
import type { Course } from '../types/Course';

export const ValidFileRow = ({
  acceptedFile,
}: {
  acceptedFile: FileWithPath;
}) => {
  const [status, setStatus] = useState<FileUploadStatus>(
    FileUploadStatus.InProgress
  );

  const [course, setCourse] = useState<Course>();
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
      {status === FileUploadStatus.Complete && course && (
        <>
          <TableCell align="left">{course.title}</TableCell>
          <TableCell align="left">{course.language}</TableCell>
          <TableCell align="left">
            <SiteLink id={course.id} guid={course.guid} />
          </TableCell>
        </>
      )}
    </TableRow>
  );
};
