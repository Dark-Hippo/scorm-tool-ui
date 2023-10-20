import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LogError } from '../services/ErrorService';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (comment: string) => void;
}

export default function CommentBox({ open, onClose, onSubmit }: Props) {
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

    onSubmit(comment);
    setComment('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ m: 0, p: 2 }}>Add Comment</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon />
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
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogContent>
    </Dialog>
  );
}
