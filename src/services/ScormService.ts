import { SERVER } from '../config';

export const ValidateScormFile = async (file: File) => {
  return Mock;
  const formData = new FormData();
  formData.append('scorm', file);
  const response = await fetch(`${SERVER}/scorm/validate`, {
    method: 'POST',
    body: formData,
    mode: 'cors',
  });
  const result = await response.json();

  console.log(`File is ${result.isValid ? 'valid' : 'not valid'}`);

  return result.isValid;
};

const Mock = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
};
