import { Edit } from '@mui/icons-material';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import type { Course } from '../types/Course';

import './CourseList.css';

export const CourseList = ({ data }: { data: Course[] }) => {
  if (data.length === 0) {
    return null;
  }
  return (
    <section className="uploaded-files">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Language</TableCell>
              <TableCell align="left">Created by</TableCell>
              <TableCell align="left">Created date</TableCell>
              <TableCell align="left">Last updated</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((course: Course) => (
              <TableRow
                key={course.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">{course.name}</TableCell>
                <TableCell align="left">{course.language}</TableCell>
                <TableCell align="left">{course.createdByUserId}</TableCell>
                <TableCell align="left">
                  {new Date(course.createdDate).toLocaleString('en-GB')}
                </TableCell>
                <TableCell align="left">
                  {new Date(course.updatedDate).toLocaleString('en-GB')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};
