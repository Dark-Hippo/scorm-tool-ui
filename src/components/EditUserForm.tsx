import { useEffect, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { UserData } from '../types/UserProfile';

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
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);
  const [emailError, setEmailError] = useState('');
  const [debouncedEmail, setDebouncedEmail] = useState(email);

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userData: UserData = {
      id: user.id,
      email: email,
      name: name,
    };
    await onSubmit(userData);
    setEmail('');
    setName('');
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
      <ButtonContainer>
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
          onClick={onDelete}
        >
          Delete
        </DeleteButton>
      </ButtonContainer>
    </Form>
  );
}
