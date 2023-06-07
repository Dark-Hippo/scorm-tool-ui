import { TableCell, TableRow } from '@mui/material';
import { FileWithPath } from 'react-dropzone';
import { StatusIndicator } from './StatusIndicator';
import { FileUploadStatus } from '../types/FileWithStatus';

export const ValidFileRow = ({
  acceptedFile,
}: {
  acceptedFile: FileWithPath;
}) => {
  return (
    <TableRow>
      <TableCell align="left">
        <StatusIndicator status={FileUploadStatus.InProgress} />
      </TableCell>
      <TableCell align="left">{acceptedFile.name}</TableCell>
      <TableCell align="left">Course name</TableCell>
      <TableCell align="left">Language</TableCell>
      <TableCell align="left">Site</TableCell>
    </TableRow>
  );
};
