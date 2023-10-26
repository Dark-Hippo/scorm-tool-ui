import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { LogError } from '../services/ErrorService';

interface Props {
  open: boolean;
  element: HTMLElement | null;
  onClose: () => void;
  onSubmit: (element: HTMLElement, comment: string) => void;
}

export default function CommentBox({
  open,
  element,
  onClose,
  onSubmit,
}: Props) {
  const [comment, setComment] = useState('');

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleClose = () => {
    setComment('');
    onClose();
  };

  const handleSubmit = () => {
    if (comment.trim() === '') {
      LogError({ status: 0, message: 'Comment cannot be empty.' });
      return;
    }

    if (!element) {
      LogError({ status: 0, message: 'Element not selected.' });
      return;
    }

    onSubmit(element, comment);
    setComment('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ m: 0, p: 2, paddingBottom: 0 }}>
        Add Comment
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
        }}
      >
        <Close />
      </IconButton>
      <DialogContent>
        <TextField
          label="Comment"
          value={comment}
          onChange={handleCommentChange}
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogContent>
    </Dialog>
  );
}
