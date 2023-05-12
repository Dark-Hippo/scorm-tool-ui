import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
import './TopBar.css';

export default function TopBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
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
        </Toolbar>
      </AppBar>
    </Box>
  );
}
