import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
import './TopBar.css';
import { LoginButton } from './LoginButton';
import { useAuth0 } from '@auth0/auth0-react';
import { LogoutButton } from './LogoutButton';

export default function TopBar() {
  const { isAuthenticated } = useAuth0();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: { md: 'flex' } }}>
            <Button sx={{}}>
              <NavLink to="/">Home</NavLink>
            </Button>
            <Button sx={{}}>
              <NavLink to="/upload">Upload</NavLink>
            </Button>
            <Button>
              <NavLink to="/courses">Courses</NavLink>
            </Button>
          </Box>
          <Box sx={{ display: { md: 'flex' } }}>
            {isAuthenticated ? <LogoutButton /> : <LoginButton />}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
