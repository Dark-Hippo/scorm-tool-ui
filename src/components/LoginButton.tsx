import { Button } from '@mui/material';
import { Login } from '@mui/icons-material';
import { useAuth0 } from '@auth0/auth0-react';

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      variant="contained"
      disableElevation
      color="secondary"
      onClick={() => loginWithRedirect()}
    >
      Log In <Login style={{ marginLeft: '5px' }} />
    </Button>
  );
};
