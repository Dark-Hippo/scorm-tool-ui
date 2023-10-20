import { Edit } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LogError } from '../services/ErrorService';
import CommentBox from '../components/CommentBox';

export const Site = () => {
  const { id, guid } = useParams();
  const [editing, setEditing] = useState(false);
  const [commentBoxOpen, setCommentBoxOpen] = useState(false);

  if (!id) {
    return null;
  }

  if (!guid) {
    return null;
  }

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const ignoredTags = ['HTML', 'HEAD', 'BODY', 'SCRIPT', 'STYLE', 'LINK'];

  const clickHandler = (ev: MouseEvent) => {
    const element = ev.currentTarget as HTMLElement;
    const position = element.getBoundingClientRect();
    const x = ev.clientX - position.left;
    const y = ev.clientY - position.top;

    console.log(position);

    setCommentBoxOpen(true);

    ev.preventDefault();
    ev.stopPropagation();
  };

  const mouseEnterHandler = (ev: MouseEvent) => {
    const element = ev.currentTarget as HTMLElement;
    if (!element || !element.style) {
      return;
    }

    if (ignoredTags.includes(element.tagName)) {
      return;
    }

    if (element.style.outline) {
      return;
    }

    element.addEventListener('click', clickHandler);

    element.style.outlineColor = '#ff0000';
    element.style.outlineStyle = 'solid';
    element.style.outlineWidth = '1px';
    element.style.cursor = 'crosshair';
  };

  const mouseLeaveHandler = (ev: MouseEvent) => {
    const element = ev.currentTarget as HTMLElement;
    if (!element || !element.style) {
      return;
    }

    element.removeEventListener('click', clickHandler);

    element.style.removeProperty('outline');
    element.style.removeProperty('cursor');
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
        el.addEventListener('mouseenter', mouseEnterHandler);
        el.addEventListener('mouseleave', mouseLeaveHandler);
      });
    } else {
      childElements.forEach((element) => {
        const el = element as HTMLElement;
        el.removeEventListener('mouseenter', mouseEnterHandler);
        el.removeEventListener('mouseleave', mouseLeaveHandler);
      });
    }

    return () => {
      childElements.forEach((element) => {
        const el = element as HTMLElement;
        el.removeEventListener('mouseenter', mouseEnterHandler);
        el.removeEventListener('mouseleave', mouseLeaveHandler);
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
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
      />
      <CommentBox
        open={commentBoxOpen}
        onClose={() => {
          setCommentBoxOpen(false);
        }}
        onSubmit={() => {
          console.log('saved');
        }}
      />
    </div>
  );
};
