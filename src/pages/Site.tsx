import { Edit } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { useParams } from 'react-router-dom';

export const Site = () => {
  const { id, guid } = useParams();

  if (!id) {
    return null;
  }

  if (!guid) {
    return null;
  }

  const addHoverHighlight = (element: HTMLElement, highlightColor: string) => {
    element.addEventListener('mouseenter', () => {
      element.style.outlineColor = highlightColor;
      element.style.outlineStyle = 'solid';
      element.style.outlineWidth = '1px';
    });

    element.addEventListener('mouseleave', () => {
      element.style.outline = 'none';
    });
  };

  return (
    <div style={{ height: '85vh' }}>
      <Box sx={{ textAlign: 'right', height: '5vh' }}>
        <Button variant="contained">
          <Edit />
        </Button>
      </Box>
      <iframe
        onMouseEnter={(e) => addHoverHighlight(e.currentTarget, '#ff0000')}
        onMouseLeave={(e) => addHoverHighlight(e.currentTarget, '')}
        src={`/api/content/${guid}/course/scormcontent/`}
        width="100%"
        height="100%"
        style={{ border: 'none' }}
      />
    </div>
  );
};
