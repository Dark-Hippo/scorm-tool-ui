import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { UserData } from '../types/UserProfile';
import { LogError } from '../services/ErrorService';

const Form = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const Input = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const SubmitButton = styled(Button)(({ theme }) => ({}));

const DeleteButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(2),
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
}));

const ErrorMessage = styled('div')(({ theme }) => ({
  color: theme.palette.error.main,
  marginBottom: theme.spacing(2),
}));

interface EditUserFormProps {
  user: UserData;
  onSubmit: (userData: UserData) => Promise<void>;
  onDelete: () => Promise<void>;
}

export default function EditUserForm({
  user,
  onSubmit,
  onDelete,
}: EditUserFormProps) {
  const [email, setEmail] = useState<string>(user.email);
  const [name, setName] = useState<string>(user.name);
  const [emailError, setEmailError] = useState<string>('');
  const [debouncedEmail, setDebouncedEmail] = useState<string>(email);
  const [active, setActive] = useState<boolean>(user.active);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedEmail(email);
    }, 700);

    return () => {
      clearTimeout(timerId);
    };
  }, [email]);

  const emailValidation = (email: string) => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setEmailError(isValidEmail ? '' : 'Invalid email address');
  };

  useEffect(() => {
    emailValidation(email);
  }, [debouncedEmail]);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleActiveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setActive(event.target.checked);
  };

  const handleDeleteClick = () => {
    setConfirmDelete(true);
  };

  const handleDeleteConfirm = async () => {
    setConfirmDelete(false);
    setLoading(true);
    setError('');
    try {
      await onDelete();
      // setEmail('');
      // setName('');
      // setActive(false);
    } catch (error) {
      LogError({
        message: error as string,
        status: 0,
      });
      setError('Failed to delete user');
    }
    setLoading(false);
  };

  const handleDeleteCancel = () => {
    setConfirmDelete(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    const userData: UserData = {
      id: user.id,
      email: email,
      name: name,
      active: active,
    };
    try {
      await onSubmit(userData);
      setEmail('');
      setName('');
      setActive(true);
      // TODO: Improve this error handling with network error, save error, etc.
    } catch (error) {
      LogError({
        message: error as string,
        status: 0,
      });
      setError('Failed to save user');
    }
    setLoading(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        label="Email"
        variant="outlined"
        size="small"
        value={email}
        onChange={handleEmailChange}
        required
        error={Boolean(emailError)}
        helperText={emailError}
      />
      <Input
        label="Name"
        variant="outlined"
        size="small"
        value={name}
        onChange={handleNameChange}
        required
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={active}
            onChange={handleActiveChange}
            name="active"
            color="primary"
          />
        }
        label="Active"
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <ButtonContainer>
        <SubmitButton
          disabled={!user.id || Boolean(emailError) || loading}
          type="submit"
          variant="contained"
          color="primary"
        >
          {loading ? <CircularProgress size={24} /> : 'Save'}
        </SubmitButton>
        <DeleteButton
          disabled={!user.id || loading}
          variant="contained"
          color="secondary"
          onClick={handleDeleteClick}
        >
          Delete
        </DeleteButton>
      </ButtonContainer>
      <Dialog open={confirmDelete} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Form>
  );
}
