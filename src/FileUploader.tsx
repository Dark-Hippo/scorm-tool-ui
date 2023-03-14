import { Button, Link } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './FileUploader.css';

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
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
  }, []);
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

  const acceptedFileItems = acceptedFiles.map((file: any) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(
    ({ file, errors }: { file: any; errors: any }) => (
      <li key={file.path}>
        {file.path} - {file.size} bytes ({file.type})
        <ul>
          {errors.map((e: any) => (
            <li key={e.code}>{e.message}</li>
          ))}
        </ul>
      </li>
    )
  );

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
    <section className="upload-container">
      <div className="file-upload" {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <div>
            <p>
              <UploadFileIcon />
            </p>
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        )}
      </div>
      <aside>
        <h4>Accepted files</h4>
        <ul>{acceptedFileItems}</ul>
        <h4>Rejected files</h4>
        <ul>{fileRejectionItems}</ul>
      </aside>
      <div>
        <Link href={address} target="_blank" hidden={!address}>
          View site
        </Link>
      </div>
    </section>
  );
};
