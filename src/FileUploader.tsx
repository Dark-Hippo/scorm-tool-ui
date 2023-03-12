import { Button, Link } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useState } from 'react';

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
    <div className="upload-container">
      <div>
        <Button
          startIcon={<UploadFileIcon />}
          variant="contained"
          component="label"
        >
          Upload
          <input hidden accept=".zip" type="file" onChange={handleFileUpload} />
        </Button>
      </div>
      <div>
        <Link href={address} target="_blank" hidden={!address}>
          View site
        </Link>
      </div>
    </div>
  );
};
