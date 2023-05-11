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
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Course name</TableCell>
              <TableCell align="left">Language</TableCell>
              <TableCell align="left">Filename</TableCell>
              <TableCell align="left">Uploaded date</TableCell>
              <TableCell align="left">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((course: Course) => (
              <TableRow
                key={course.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">Tick</TableCell>
                <TableCell align="left">{course.name}</TableCell>
                <TableCell align="left">{course.language}</TableCell>
                <TableCell align="left">filename</TableCell>
                <TableCell align="left">
                  {new Date(course.createdDate).toLocaleDateString('en-GB')}
                </TableCell>
                <TableCell align="left">
                  <Edit />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};
