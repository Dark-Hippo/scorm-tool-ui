import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import type { FileWithStatus } from '../types/FileWithStatus';

import './InvalidFileList.css';

export const InvalidFileList = ({ data }: { data: FileWithStatus[] }) => {
  if (data.length === 0) {
    return null;
  }

  return (
    <section className="invalid-files">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Filename</TableCell>
              <TableCell align="left">Error</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((fileWithStatus: FileWithStatus) => (
              <TableRow
                key={fileWithStatus.file.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">{fileWithStatus.status}</TableCell>
                <TableCell align="left">{fileWithStatus.file.name}</TableCell>
                <TableCell align="left">
                  {fileWithStatus.message?.map(
                    (message) => `${message.code} - ${message.message}, `
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};
