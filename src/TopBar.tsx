import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
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
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
