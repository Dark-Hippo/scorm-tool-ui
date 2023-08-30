import { useState } from 'react';
import { Button, Typography, Container, Box, Modal } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAuth0 } from '@auth0/auth0-react';
import { UserData } from '../types/UserProfile';
import { updateUser, deleteUser } from '../services/UserService';
import EditUserForm from '../components/EditUserForm';
import { Edit } from '@mui/icons-material';

const Form = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const SubmitButton = styled(Button)(({ theme }) => ({}));

const DeleteButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(2),
}));

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
}

export default function EditUserModal({ user, onClose }: EditUserModalProps) {
  const { getAccessTokenSilently } = useAuth0();
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    onClose();
  };

  const handleSave = async (userData: UserData) => {
    if (!user.id) {
      return;
    }

    const token = await getAccessTokenSilently();
    await updateUser(user.id, userData, token);
    handleCloseModal();
  };

  const handleDelete = async () => {
    if (!user.id) {
      return;
    }

    const token = await getAccessTokenSilently();
    await deleteUser(user.id, token);
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
          <Form>
            <EditUserForm user={user} onSubmit={handleSave} />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <SubmitButton
                disabled={!user.id}
                type="submit"
                variant="contained"
                color="primary"
              >
                Save
              </SubmitButton>
              <DeleteButton
                disabled={!user.id}
                variant="contained"
                color="secondary"
                onClick={handleDelete}
              >
                Delete
              </DeleteButton>
            </Box>
          </Form>
        </Container>
      </Modal>
    </>
  );
}
