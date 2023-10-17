import { Edit } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LogError } from '../services/ErrorService';

export const Site = () => {
  const { id, guid } = useParams();
  const [editing, setEditing] = useState(false);

  if (!id) {
    return null;
  }

  if (!guid) {
    return null;
  }

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const addOutline = (ev: MouseEvent) => {
    const element = ev.currentTarget as HTMLElement;
    if (!element || !element.style) {
      return;
    }
    element.style.outlineColor = '#ff0000';
    element.style.outlineStyle = 'solid';
    element.style.outlineWidth = '1px';
    // element.style.outline = '1px solid #ff0000';
  };

  const removeOutline = (ev: MouseEvent) => {
    const element = ev.currentTarget as HTMLElement;
    if (!element || !element.style || !element.style.outline) {
      return;
    }
    element.style.outline = 'unset';
  };

  const addHoverHighlight = (element: HTMLElement) => {
    element.addEventListener('mouseenter', addOutline);
    element.addEventListener('mouseleave', removeOutline);
  };

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) {
      LogError({ status: 0, message: 'iframe not found' });
      return;
    }

    const iframeWindow = iframe.contentWindow;
    if (!iframeWindow) {
      LogError({ status: 0, message: 'iframe contentWindow not found' });
      return;
    }

    const childElements = iframeWindow.document.querySelectorAll('*');
    if (editing) {
      childElements.forEach((element) => {
        const el = element as HTMLElement;
        addHoverHighlight(el);
      });
    } else {
      childElements.forEach((element) => {
        const el = element as HTMLElement;
        el.removeEventListener('mouseenter', addOutline);
        el.removeEventListener('mouseleave', removeOutline);
        el.style.outline = 'unset';
      });
    }

    return () => {
      childElements.forEach((element) => {
        const el = element as HTMLElement;
        el.removeEventListener('mouseenter', addOutline);
        el.removeEventListener('mouseleave', removeOutline);
      });
    };
  }, [editing]);

  return (
    <div style={{ height: '85vh' }}>
      <Box sx={{ textAlign: 'right', height: '5vh' }}>
        <Button
          color={editing ? 'error' : 'primary'}
          variant="contained"
          onClick={() => setEditing(!editing)}
        >
          <Edit />
        </Button>
      </Box>
      <iframe
        ref={iframeRef}
        src={`/api/content/${guid}/course/scormcontent/`}
        width="100%"
        height="100%"
        style={{ border: 'none' }}
      />
    </div>
  );
};
