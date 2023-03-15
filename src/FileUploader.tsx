import { Box, Button, Link } from '@mui/material';
import { UploadFile, DoneSharp, CancelOutlined } from '@mui/icons-material';
import { useState, useCallback } from 'react';
import { FileRejection, FileWithPath, useDropzone } from 'react-dropzone';
import './FileUploader.css';
import { file } from 'jszip';

const server = 'http://localhost:3000';

const SendToServer = async (file: File) => {
  const formData = new FormData();
  formData.append('scorm', file);
  const response = await fetch(`${server}/scorm`, {
    method: 'POST',
    body: formData,
    mode: 'cors',
  });
  const result = await response.json();

  return result;
};

export const FileUploader = () => {
  const [address, setAddress] = useState('');
  const [files, setFiles] = useState<JSX.Element[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[], fileRejections: FileRejection[]) => {
      const acceptedItems = acceptedFiles.map((file: FileWithPath) => (
        <li key={file.path}>
          <p>
            <DoneSharp className="success" /> {file.name}
          </p>
        </li>
      ));

      const rejectedItems = fileRejections.map((rejection: FileRejection) => {
        const file: FileWithPath = rejection.file;
        return (
          <li key={file.path}>
            <p>
              <CancelOutlined className="fail" /> {file.name}
            </p>
          </li>
        );
      });

      const fileItems = [...acceptedItems, ...rejectedItems];
      setFiles(fileItems);
    },
    []
  );

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    accept: { 'application/zip': [], 'application/x-zip-compressed': [] },
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const JSZip = require('jszip');
    if (!e.target.files) {
      return;
    }
    const file: File = e.target.files[0];

    // unzip file
    const zip = await JSZip.loadAsync(file);

    // check for index.html file
    if (
      !Object.keys(zip.files).find((f) => f.endsWith('scormcontent/index.html'))
    ) {
      return;
    }

    const result = await SendToServer(file);
    if (result.location) {
      setAddress(`${server}${result.location}`);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
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
        <aside>
          <h4>Uploaded:</h4>
          <ul className="uploaded-files">{files}</ul>
        </aside>
        <div>
          <Link href={address} target="_blank" hidden={!address}>
            View site
          </Link>
        </div>
      </section>
    </Box>
  );
};
