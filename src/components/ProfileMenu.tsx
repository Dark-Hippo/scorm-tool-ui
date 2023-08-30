import { useState, MouseEvent } from 'react';
import { Avatar, Button, Divider, Menu, MenuItem } from '@mui/material';
import { LogoutButton } from './LogoutButton';

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
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
        <Divider />
        <LogoutButton />
      </Menu>
    </>
  );
}

export default ProfileMenu;
