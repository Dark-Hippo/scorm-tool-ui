import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import { Logout } from '@mui/icons-material';

export const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
      disableElevation
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Log Out
      <Logout style={{ marginLeft: '5px' }} />
    </Button>
  );
};
