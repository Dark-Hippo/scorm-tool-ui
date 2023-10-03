import { useState, MouseEvent, useEffect } from 'react';
import { Avatar, Button, Divider, Menu, MenuItem } from '@mui/material';
import { LogoutButton } from './LogoutButton';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [picture, setPicture] = useState<string | undefined>('');
  const { getIdTokenClaims } = useAuth0();

  const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const getUserData = async () => {
      const idToken = await getIdTokenClaims();
      const picture = idToken?.picture;
      setPicture(picture);
    };

    getUserData();
  }, [getIdTokenClaims]);

  return (
    <>
      <Button onClick={handleMenuOpen}>
        <Avatar alt="User Profile" src={picture} />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <NavLink
          onClick={handleMenuClose}
          to={'/profile'}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <MenuItem>Profile</MenuItem>
        </NavLink>
        <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
        <Divider />
        <NavLink
          onClick={handleMenuClose}
          to={'/users'}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <MenuItem>Users</MenuItem>
        </NavLink>
        <NavLink
          onClick={handleMenuClose}
          to={'/health'}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <MenuItem>Health</MenuItem>
        </NavLink>
        <Divider />
        <LogoutButton />
      </Menu>
    </>
  );
}

export default ProfileMenu;
