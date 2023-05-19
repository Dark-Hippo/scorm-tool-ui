import { Edit } from '@mui/icons-material';
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
import { SERVER } from '../config';

export const CourseWithSiteList = ({ data }: { data: CourseWithSite[] }) => {
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
              <TableCell align="left">Site address</TableCell>
              <TableCell align="left">Filename</TableCell>
              <TableCell align="left">Last accessed</TableCell>
              <TableCell align="left">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((courseWithSite: CourseWithSite) => (
              <TableRow
                key={courseWithSite.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">Tick</TableCell>
                <TableCell align="left">{courseWithSite.name}</TableCell>
                <TableCell align="left">{courseWithSite.language}</TableCell>
                <TableCell align="left">
                  <Link
                    to={`${SERVER}/site/${courseWithSite.site?.guid}/course/`}
                  >
                    View site
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
