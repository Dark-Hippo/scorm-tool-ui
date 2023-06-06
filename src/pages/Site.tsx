import { useParams } from 'react-router-dom';

export const Site = () => {
  const { id, guid } = useParams();

  if (!guid) {
    return null;
  }

  return (
    <div style={{ height: '85vh' }}>
      <iframe
        src={`/api/site/${id}/${guid}/webcontent/`}
        width="100%"
        height="100%"
      />
    </div>
  );
};
