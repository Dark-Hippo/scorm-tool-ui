import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { UserData } from '../types/UserData';

const Form = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const Input = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

interface AddUserFormProps {
  onSubmit: (userData: UserData) => Promise<void>;
}

export default function AddUserForm({ onSubmit }: AddUserFormProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userData: UserData = {
      email: email,
      name: name,
      active: true,
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
      />
      <Input
        label="Name"
        variant="outlined"
        size="small"
        value={name}
        onChange={handleNameChange}
        required
      />
      <SubmitButton type="submit" variant="contained" color="primary">
        Add User
      </SubmitButton>
    </Form>
  );
}
