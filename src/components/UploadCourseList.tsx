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
import { useState } from 'react';
import { SiteLink } from './SiteLink';

export const UploadCourseList = ({ data }: { data: CourseWithSite[] }) => {
  if (data.length === 0) {
    return null;
  }

  const [courses, setCourses] = useState<CourseWithSite[]>(data);

  return (
    <section className="uploaded-files">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Course name</TableCell>
              <TableCell align="left">Language</TableCell>
              <TableCell align="left">Site address</TableCell>
              <TableCell align="left">Filename</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((courseWithSite: CourseWithSite) => (
              <TableRow
                key={courseWithSite.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">Tick</TableCell>
                <TableCell align="left">{courseWithSite.name}</TableCell>
                <TableCell align="left">{courseWithSite.language}</TableCell>
                <TableCell align="left">
                  {courseWithSite.site && (
                    <SiteLink
                      id={courseWithSite.site?.id}
                      guid={courseWithSite.site?.guid}
                    />
                  )}
                </TableCell>
                <TableCell align="left">{courseWithSite.site?.title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};
