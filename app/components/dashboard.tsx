import React from 'react';
import { useNavigate } from 'react-router';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton, // Added this import
  ListItemIcon,
  ListItemText,
  CssBaseline,
  // Changed Grid to Grid2 to match your size={{ xs: 12 }} syntax
  Grid, 
  Card,
  CardContent,
  CardActions,
  Button,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';

const theme = createTheme({
  palette: {
    primary: { main: '#f13a0cff' },
    secondary: { main: '#f91212ff' },
    background: { default: '#f4f4f4' },
  },
});

function Dashboard() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => setOpen(!open);
    const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/'); 
  };

  const drawerItems = ['Home', 'About', 'Contact', 'Products', 'More Info'];

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed"> {/* Changed 'absolute' to 'fixed' for better layout */}
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">Biznas</Typography>
          </Toolbar>
        </AppBar>

        <Drawer open={open} onClose={toggleDrawer}>
          <div style={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
            <List>
              {drawerItems.map((text) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      if (text === 'Home' || text === 'About') {
                        handleHomeClick();
                      }
                    }}
                  >
                    <ListItemIcon>
                      {text === 'Home' ? <HomeIcon /> : <InfoIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>

        <main style={{ flexGrow: 1, padding: '80px 20px' }}>
          <Grid container spacing={4}>
            {/* These will now work correctly with Grid2 size prop */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Card>
                <CardContent>
                  <Typography variant="h5">Innovation</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Card>
                <CardContent>
                  <Typography variant="h5">Pioneers</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">More Details</Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Card>
                <CardContent>
                  <Typography variant="h5">Technology</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default Dashboard;