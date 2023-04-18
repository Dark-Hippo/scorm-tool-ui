import { SERVER } from '../config';

export const ValidateScormFile = async (file: File) => {
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

export const Mock = () => {
  return new Promise((resolve) => {
    console.log('about to resolve');
    setTimeout(() => {
      console.log('resolving');
      resolve(true);
    }, 2000);
  });
};
