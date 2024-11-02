import * as React from 'react';
import { useRouter } from 'next/router';
import { AppBar, Box, Toolbar, IconButton, Typography, Container, Button, Menu, MenuItem } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';

const pages = ['Home', 'Addproduct', 'Product', 'Addemployee', 'Employee'];

function Navbar() {
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ background: 'linear-gradient(90deg, rgba(33, 82, 255, 1) 0%, rgba(0, 212, 255, 1) 100%)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo and Icon */}
            <FitnessCenterIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize: '40px', color: '#ffffff' }} />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: '#ffffff',
                textDecoration: 'none',
                '&:hover': {
                  color: '#ffcc00',
                  transition: 'color 0.3s ease-in-out',
                },
              }}
            >
              CRUD SYSTEM
            </Typography>

            {/* Mobile Menu Icon */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Link href={page === 'Home' ? '/' : `/${page.toLowerCase()}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Typography
                        textAlign="center"
                        sx={{
                          backgroundColor: router.pathname === `/${page.toLowerCase()}` || (page === 'Home' && router.pathname === '/') ? '#ffcc00' : 'transparent',
                          color: router.pathname === `/${page.toLowerCase()}` || (page === 'Home' && router.pathname === '/') ? '#333' : '#333',
                          fontWeight: 500,
                          borderRadius: '4px',
                          paddingX: '8px',
                          paddingY: '4px',
                        }}
                      >
                        {page}
                      </Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Logo for Mobile */}
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'Roboto, sans-serif',
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: '#ffffff',
                textDecoration: 'none',
              }}
            >
              CRUD
            </Typography>

            {/* Desktop Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  component={Link}
                  href={page === 'Home' ? '/' : `/${page.toLowerCase()}`}
                  sx={{
                    my: 2,
                    color: router.pathname === `/${page.toLowerCase()}` || (page === 'Home' && router.pathname === '/') ? '#333' : 'white',
                    backgroundColor: router.pathname === `/${page.toLowerCase()}` || (page === 'Home' && router.pathname === '/') ? '#ffcc00' : 'transparent',
                    display: 'block',
                    fontWeight: 500,
                    fontSize: '1rem',
                    marginX: 1,
                    paddingX: 2,
                    borderRadius: '4px',
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default Navbar;
