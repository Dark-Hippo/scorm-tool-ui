import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
import './TopBar.css';
import { LoginButton } from './LoginButton';
import { useAuth0 } from '@auth0/auth0-react';
import ProfileMenu from './ProfileMenu';

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
            {isAuthenticated && (
              <>
                <Button sx={{}}>
                  <NavLink to="/upload">Upload</NavLink>
                </Button>
                <Button>
                  <NavLink to="/courses">Courses</NavLink>
                </Button>
                <Button>
                  <NavLink to="/health">Health</NavLink>
                </Button>
              </>
            )}
          </Box>

          <Box sx={{ display: { md: 'flex' } }}>
            {isAuthenticated ? <ProfileMenu /> : <LoginButton />}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
