import { TableCell, TableRow } from '@mui/material';
import { FileRejection } from 'react-dropzone';
import { StatusIndicator } from './StatusIndicator';
import { FileUploadStatus } from '../types/FileWithStatus';

export const InvalidFileRow = ({
  fileRejection,
}: {
  fileRejection: FileRejection;
}) => {
  return (
    <TableRow className="invalid">
      <TableCell align="left">
        <StatusIndicator status={FileUploadStatus.Invalid} />
      </TableCell>
      <TableCell align="left">{fileRejection.file.name}</TableCell>
      <TableCell align="left" colSpan={3}>
        {fileRejection.errors?.map(
          (error) => `${error.message} (${error.code}); `
        )}
      </TableCell>
    </TableRow>
  );
};
