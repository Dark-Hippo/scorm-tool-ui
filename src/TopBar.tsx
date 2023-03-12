import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import './TopBar.css';

export default function TopBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ marginRight: 2 }}>
            Scorm Tool v1.0
          </Typography>
          <Box sx={{ display: { md: 'flex' } }}>
            <Button sx={{}}>
              <Link to="/">Home</Link>
            </Button>
            <Button sx={{}}>
              <Link to="/upload">Upload</Link>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
