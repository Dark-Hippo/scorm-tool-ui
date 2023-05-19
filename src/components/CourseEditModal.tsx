import { Edit } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  Stack,
} from '@mui/material';
import { useState } from 'react';

import './CourseEditModal.css';
import { Course } from '../types/Course';
import { CourseWithSite } from '../types/CourseWithSite';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const CourseEditModal = ({
  courseWithSite,
  courseDeleteHandler,
}: {
  courseWithSite: CourseWithSite;
  courseDeleteHandler: (course: CourseWithSite) => void;
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleDeleteClick = () => {
    setConfirmOpen(true);
  };

  const handleConfirmDeleteClick = () => {
    setConfirmOpen(false);
    setModalOpen(false);
    courseDeleteHandler(courseWithSite);
  };

  const handleConfirmCancelClick = () => {
    setConfirmOpen(false);
  };

  return (
    <div className="course-edit-modal">
      <Edit className="button" onClick={handleOpenModal} />
      <Modal className="modal" open={modalOpen} onClose={handleCloseModal}>
        <Box sx={style}>
          <h2>Editing course "{courseWithSite.name}"</h2>
          <Stack direction="row" justifyContent="space-evenly">
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteClick}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Dialog open={confirmOpen}>
        <DialogTitle>{'Delete course'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Delete course "{courseWithSite.name}"
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmDeleteClick}
          >
            Delete
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleConfirmCancelClick}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
