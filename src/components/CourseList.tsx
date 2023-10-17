import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import './CourseList.css';
import { Link } from 'react-router-dom';
import { API_URL } from '../config';
import { CourseEditModal } from './CourseEditModal';
import { DeleteCourse } from '../services/CourseService';
import { useState } from 'react';
import { SiteLink } from './SiteLink';
import { useAuth0 } from '@auth0/auth0-react';

import type { Course } from '../types/Course';

export const CourseList = ({ data }: { data: Course[] }) => {
  if (data.length === 0) {
    return null;
  }

  const { getAccessTokenSilently } = useAuth0();

  const [courses, setCourses] = useState<Course[]>(data);

  const handleCourseDelete = async (course: Course) => {
    const accessToken = await getAccessTokenSilently();
    const deleted = await DeleteCourse(course, accessToken);
    if (deleted) {
      const updatedCourses = courses.filter(
        (course) => course.id !== course.id
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
            {courses.map((course: Course) => (
              <TableRow
                key={course.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">{course.title}</TableCell>
                <TableCell align="left">{course.language}</TableCell>
                <TableCell align="left">
                  <SiteLink id={course.id} guid={course.guid} />
                </TableCell>
                <TableCell>
                  <Link
                    to={`${API_URL}/site/${course.id}/${course.guid}/original/`}
                  >
                    Download original
                  </Link>
                </TableCell>
                <TableCell align="left">{course.filename}</TableCell>
                <TableCell align="left">
                  {course.lastAccessed
                    ? new Date(course.lastAccessed).toLocaleDateString('en-GB')
                    : null}
                </TableCell>
                <TableCell align="left">
                  <CourseEditModal
                    course={course}
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
