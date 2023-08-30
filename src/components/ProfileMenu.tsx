import { useState, MouseEvent } from 'react';
import { Avatar, Button, Divider, Menu, MenuItem } from '@mui/material';
import { LogoutButton } from './LogoutButton';
import { NavLink } from 'react-router-dom';

function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button onClick={handleMenuOpen}>
        <Avatar alt="User Profile" src="/path/to/profile-image.jpg" />
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
          to={'/admin'}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <MenuItem>Admin</MenuItem>
        </NavLink>
        <Divider />
        <LogoutButton />
      </Menu>
    </>
  );
}

export default ProfileMenu;
