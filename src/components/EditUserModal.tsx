import { useState } from 'react';
import { Typography, Container, Box, Modal } from '@mui/material';
import { UserData } from '../types/UserData';
import EditUserForm from '../components/EditUserForm';
import { Edit } from '@mui/icons-material';

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

interface EditUserModalProps {
  user: UserData;
  onClose: () => void;
  onSave: (userData: UserData) => Promise<void>;
  onDelete: () => Promise<void>;
}

export default function EditUserModal({
  user,
  onClose,
  onSave,
  onDelete,
}: EditUserModalProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    onClose();
  };

  const handleSave = async (userData: UserData) => {
    await onSave(userData);
    handleCloseModal();
  };

  const handleDelete = async () => {
    await onDelete();
    handleCloseModal();
  };

  return (
    <>
      <Edit className="button" onClick={handleOpenModal} />
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Container maxWidth="sm" sx={style}>
          <Box textAlign="center">
            <Typography variant="h4" component="h1" gutterBottom>
              Edit User
            </Typography>
          </Box>
          <EditUserForm
            user={user}
            onSubmit={handleSave}
            onDelete={handleDelete}
          />
        </Container>
      </Modal>
    </>
  );
}
