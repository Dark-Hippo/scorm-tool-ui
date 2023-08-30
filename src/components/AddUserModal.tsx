import { useState } from 'react';
import { Button, Box, Modal } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAuth0 } from '@auth0/auth0-react';
import AddUser from './AddUser';
import { UserData } from '../types/UserProfile';
import { createUser } from '../services/UserService';

const Form = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const SubmitButton = styled(Button)(({ theme }) => ({}));

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

export default function AddUserModal({
  onSubmit,
}: {
  onSubmit: (userData: UserData) => void;
}) {
  const { getAccessTokenSilently } = useAuth0();
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = async (userData: UserData) => {
    onSubmit(userData);
    handleCloseModal();
  };

  return (
    <Form>
      <SubmitButton
        type="button"
        variant="contained"
        color="primary"
        onClick={handleOpenModal}
      >
        Add User
      </SubmitButton>
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box sx={style}>
          <h2>Add New User</h2>
          <AddUser onSubmit={handleSubmit} />
        </Box>
      </Modal>
    </Form>
  );
}
