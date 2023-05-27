import { useParams } from 'react-router-dom';
import { ScormAPI } from '../services/API';

export const Site = () => {
  const { guid } = useParams();

  if (!guid) {
    return null;
  }

  return (
    <div style={{ height: '85vh' }}>
      <iframe src={`/api/site/${guid}/course/`} width="100%" height="100%" />
    </div>
  );
};
