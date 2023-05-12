import { UploadFile } from '@mui/icons-material';
import { FileRejection, FileWithPath, useDropzone } from 'react-dropzone';
import './FileUploader.css';

export const FileUploader = ({
  onDrop,
}: {
  onDrop: (
    acceptedFiles: FileWithPath[],
    fileRejections: FileRejection[]
  ) => void;
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/zip': [], 'application/x-zip-compressed': [] },
  });

  return (
    <section className="upload-container">
      <div className="file-upload" {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <div>
            <p>
              <UploadFile />
            </p>
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        )}
      </div>
    </section>
  );
};
