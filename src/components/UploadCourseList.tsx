import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import type { CourseWithSite } from '../types/CourseWithSite';

import './CourseList.css';
import { useCallback, useEffect, useState } from 'react';
import { SiteLink } from './SiteLink';
import { FileRejection, FileWithPath } from 'react-dropzone';
import { UploadScormFile } from '../services/ScormService';
import { InvalidFileRow } from './InvalidFileRow';
import { ValidFileRow } from './ValidFileRow';

export const UploadCourseList = ({
  acceptedFiles,
  fileRejections,
}: {
  acceptedFiles: FileWithPath[];
  fileRejections: FileRejection[];
}) => (
  <section className="uploaded-files">
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Filename</TableCell>
            <TableCell align="left">Course name</TableCell>
            <TableCell align="left">Language</TableCell>
            <TableCell align="left">Site</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {acceptedFiles.map((acceptedFile) => (
            <ValidFileRow acceptedFile={acceptedFile} key={acceptedFile.name} />
          ))}
          {fileRejections.map((fileRejection) => (
            <InvalidFileRow fileRejection={fileRejection} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </section>
);
