import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';

export const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
      variant="contained"
      disableElevation
      color="secondary"
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Log Out
    </Button>
  );
};
