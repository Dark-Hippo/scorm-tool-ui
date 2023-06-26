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
import { Link } from 'react-router-dom';
import { API_URL } from '../config';
import { CourseEditModal } from './CourseEditModal';
import { DeleteCourseWithSite } from '../services/CourseService';
import { useState } from 'react';
import { SiteLink } from './SiteLink';

export const CourseList = ({ data }: { data: CourseWithSite[] }) => {
  if (data.length === 0) {
    return null;
  }

  const [courses, setCourses] = useState<CourseWithSite[]>(data);

  const handleCourseDelete = async (courseWithSite: CourseWithSite) => {
    const deleted = await DeleteCourseWithSite(courseWithSite);
    if (deleted) {
      const updatedCourses = courses.filter(
        (course) => course.id !== courseWithSite.id
      );
      setCourses(updatedCourses);
    }
  };

  return (
    <section className="uploaded-files">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">Course name</TableCell>
              <TableCell align="left">Language</TableCell>
              <TableCell align="left" colSpan={2}>
                Site address
              </TableCell>
              <TableCell align="left">Filename</TableCell>
              <TableCell align="left">Last accessed</TableCell>
              <TableCell align="left">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((courseWithSite: CourseWithSite) => (
              <TableRow
                key={courseWithSite.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
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
                <TableCell>
                  <Link
                    to={`${API_URL}/site/${courseWithSite.site?.id}/${courseWithSite.site?.guid}/original/`}
                  >
                    Download original
                  </Link>
                </TableCell>
                <TableCell align="left">{courseWithSite.site?.title}</TableCell>
                <TableCell align="left">
                  {courseWithSite.site?.lastAccessed
                    ? new Date(
                        courseWithSite.site?.lastAccessed
                      ).toLocaleDateString('en-GB')
                    : null}
                </TableCell>
                <TableCell align="left">
                  <CourseEditModal
                    courseWithSite={courseWithSite}
                    courseDeleteHandler={handleCourseDelete}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};
