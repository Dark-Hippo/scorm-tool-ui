import { useParams } from 'react-router-dom';

export const Site = () => {
  const { id, guid } = useParams();

  if (!id) {
    return null;
  }

  if (!guid) {
    return null;
  }

  return (
    <div style={{ height: '85vh' }}>
      <iframe
        src={`/api/content/${guid}/course/scormcontent/`}
        width="100%"
        height="100%"
        style={{ border: 'none' }}
      />
    </div>
  );
};
