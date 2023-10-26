import { Edit } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { useRef, useEffect, useState, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { LogError } from '../services/ErrorService';
import CommentBox from '../components/CommentBox';
import { v4 as uuidv4 } from 'uuid';

interface ReviewComment {
  comment: string;
  userId: string;
  commentId: string;
  date: Date;
  resolved: boolean;
  element: HTMLElement; // this won't work if stored in database, need to store as string and then use querySelector to get element
  resolvedByUserId?: string;
  resolvedDate?: Date;
}

// Create a new ReviewComment
const createReviewComment = (
  comment: string,
  userId: string,
  element: HTMLElement
): ReviewComment => {
  return {
    comment,
    userId,
    commentId: uuidv4(),
    date: new Date(),
    resolved: false,
    element,
  };
};

// TODO: function to convert HTML element to valid queryselector string
// ref https://stackoverflow.com/questions/29787964/build-the-queryselector-string-value-of-any-given-node-in-the-dom
// ref https://stackoverflow.com/questions/59231802/how-to-store-a-reference-dom-element-for-later-use
// combine with screen scraping the content of the iframe to ensure the element is still valid?

export const Site = () => {
  const { id, guid } = useParams();
  const [editing, setEditing] = useState(false);
  const [commentBoxOpen, setCommentBoxOpen] = useState(false);
  const [element, setElement] = useState<HTMLElement | null>(null);

  // Reducer to manage array of ReviewComments
  const reducer = (state: ReviewComment[], action: any) => {
    switch (action.type) {
      case 'ADD':
        return [...state, action.payload];
      case 'REMOVE':
        return state.filter((item) => item.commentId !== action.payload);
      case 'UPDATE':
        return state.map((item) => {
          if (item.commentId === action.payload.commentId) {
            return action.payload;
          }
          return item;
        });
      default:
        return state;
    }
  };

  const [reviewComments, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    console.log(reviewComments);
  }, [reviewComments]);

  // TODO: Grab userId from context (might have to create a context to hold userId)
  // TODO: Look at storing relevant environment variables in context
  // TODO: Move all this shizzle to a new branch!
  // TODO: Move all comment functions into a react hook
  // TODO: Potentially screen scrape the iframe to get the content and store using useCallback or useMemo

  if (!id) {
    return null;
  }

  if (!guid) {
    return null;
  }

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const ignoredTags = ['HTML', 'HEAD', 'BODY', 'SCRIPT', 'STYLE', 'LINK'];

  const addCommentedStyle = (element: HTMLElement) => {
    element.style.outlineColor = '#00ff00';
    element.style.outlineStyle = 'dashed';
    element.style.outlineWidth = '1px';
  };

  // Update to add to array of ReviewComments
  const submitHandler = (element: HTMLElement, comment: string) => {
    // add to array of ReviewComments
    const reviewComment = createReviewComment(comment, '123', element);
    dispatch({ type: 'ADD', payload: reviewComment });
    // add data attribute to element to store commentId
    element.dataset.commentId = reviewComment.commentId;
  };

  const clickHandler = (ev: MouseEvent) => {
    const element = ev.currentTarget as HTMLElement;
    const position = element.getBoundingClientRect();
    const x = ev.clientX - position.left;
    const y = ev.clientY - position.top;

    console.log(position);

    setElement(element);
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

    const outlineStyle = element.dataset.commentId ? 'dashed' : 'solid';

    element.style.outlineColor = '#ff0000';
    element.style.outlineStyle = outlineStyle;
    element.style.outlineWidth = '1px';
    element.style.cursor = 'crosshair';

    // TODO: Figure out if it's possible to prevent event bubbling
    // up through parent elements to keep highlighting to a single element
  };

  const mouseLeaveHandler = (ev: MouseEvent) => {
    const element = ev.currentTarget as HTMLElement;
    if (!element || !element.style) {
      return;
    }

    element.removeEventListener('click', clickHandler);

    // TODO: check to see if element has been commented and if so, add commented style

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
    childElements.forEach((element) => {
      const el = element as HTMLElement;

      // check to see if element has already been commented
      if (el.dataset.commentId) {
        // if it has, add the commented style
        addCommentedStyle(el);
      }
    });
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
        element={element}
        onClose={() => {
          setCommentBoxOpen(false);
        }}
        onSubmit={submitHandler}
      />
    </div>
  );
};
