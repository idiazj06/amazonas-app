import React, { useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import { useDispatch } from 'react-redux'
import { startLogout } from '../Actions/actionLogin'
import { useLocation } from '../Hooks/useLocation';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { listar } from '../Actions/actionProducts';


const Search = styled('div')(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: 'whitesmoke',
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  color: 'black',
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 2,
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 2,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function BarraNavegacion({ login }) {
  let history = useHistory();
  const logged = useSelector(store => store.login)
  const productos = useSelector(store => store.addDetail)
  const { products } = productos
  const { name } = logged
  const dispatch = useDispatch()
  const [country, region, watch, setWatch, ubicacion] = useLocation()
  const [searchValue, setSearchValue] = useState('')
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleLogin = () => {
    history.push("/auth/login");
  }

  const handleLogout = () => {
    dispatch(startLogout())
  }

  const handleLocation = () => {
    setWatch(!watch)

  }

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchValue(e.target.value)

    let searchFilter = products.filter(busq => busq.nombre.toLowerCase().includes(searchValue.toLowerCase()))
    dispatch(listar(searchFilter))
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Box sx={{ backgroundColor: "#131921", color:'white', padding:2}}>
        {login ?
          <Typography
            variant="div"
            noWrap
            component="div"
            className="pointer" sx={{ marginTop:1, marginBottom:2, cursor: 'pointer' }}
          >
            <Typography
              variant="div"
              noWrap
              component="h3"
            >
              Hola,{name}
            </Typography>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="div"
                noWrap
                component="h5"
                sx={{ color: '#F3D184' }}
                onClick={handleLogout}>
                Cerrar sesion
              </Typography>
            </Box>
          </Typography>
          :
          <Typography
            variant="div"
            noWrap
            component="div"
            className="pointer" sx={{ padding: 1, cursor: 'pointer' }}
            onClick={handleLogin}
          >
            <Typography
              variant="div"
              noWrap
              component="h5"
            >
              Hola,Identificate
            </Typography>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="div"
                noWrap
                component="h3"
                sx={{ color: '#F3D184' }}>
                Iniciar Sesion
              </Typography>
            </Box>
          </Typography>
        }
        {
          ubicacion ?
            <Box
              onClick={handleLocation}
            >
              <Typography
                variant="h5"
                noWrap
                component="h5"
              >
                {region},
              </Typography>
              <Typography
                variant="h3"
                noWrap
                component="h3"
                sx={{ color: '#F3D184' }}>
                {country}
              </Typography>
            </Box>
            :
            <Box
              onClick={handleLocation}
            >
              <Typography variant="div"
                noWrap
                component="h3"
                sx={{ color: '#F3D184' }}>
                Elige tu dirección
              </Typography>
            </Box>
        }
        <Search sx={{marginTop:2, marginBottom:2}}>
          <SearchIconWrapper>
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            onChange={handleSearch}
          />
          <SearchIcon />
        </Search>
      </Box>


    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ backgroundColor: "#131921" }}>
          <Box sx={{ flex: { xs: 1, sm: 0 } }}>
            <img src="https://res.cloudinary.com/duaokxfsp/image/upload/v1632197422/Amazonas/logo-amazon_wzvnaw.png" alt="" />
          </Box>

          <Typography
            variant="p"
            noWrap
            component="div"
            sx={{ display: { xs: "none", md: "block" }, ml: 5 }}
          >
            <LocationOnOutlinedIcon />
          </Typography>

          {
            ubicacion ?

              <Box
                sx={{ display: { xs: "none", md: "block"  }, flex: { sm: 1, md: 0 }, cursor: 'pointer' }}
                onClick={handleLocation}
              >
                <Typography
                  variant="div"
                  noWrap
                  component="h5"
                >
                  {region},
                </Typography>
                <Typography
                  variant="div"
                  noWrap
                  component="h3"
                  sx={{ color: '#F3D184' }}>
                  {country}
                </Typography>
              </Box>

              :

              <Box
                sx={{ display: { xs: "none", md: "flex" }, flex: { sm: 1, md: 0 }, cursor: 'pointer' }}
                onClick={handleLocation}
              >
                <Typography
                  variant="div"
                  noWrap
                  component="h5"
                >
                  Hola
                  <Typography variant="div"
                    noWrap
                    component="h3"
                    sx={{ color: '#F3D184' }}>
                    Elige tu dirección
                  </Typography>
                </Typography>
              </Box>
          }


          <Box
            sx={{ display: { xs: "none", sm: "flex" }, flex: 1 }}
          >
            <Search>
              <SearchIconWrapper>
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleSearch}
              />
              <SearchIcon />
            </Search>
          </Box>

          <Box spacing={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 2 }}>

            <Box
              sx={{ display: { xs: "none", md: "block" } }}
            >
              {login ?
                <Typography
                  variant="div"
                  noWrap
                  component="div"
                  className="pointer" sx={{ padding: 1, cursor: 'pointer' }}
                  onClick={handleLogout}
                >
                  <Typography
                    variant="div"
                    noWrap
                    component="h3"
                  >
                    Hola,{name}
                  </Typography>
                  <Box sx={{ display: 'flex' }}>
                    <Typography variant="div"
                      noWrap
                      component="h5"
                      sx={{ color: '#F3D184' }}>
                      Cerrar sesion
                    </Typography>
                  </Box>
                </Typography>
                :
                <Typography
                  variant="div"
                  noWrap
                  component="div"
                  className="pointer" sx={{ padding: 1, cursor: 'pointer' }}
                  onClick={handleLogin}
                >
                  <Typography
                    variant="div"
                    noWrap
                    component="h5"
                  >
                    Hola,Identificate
                  </Typography>
                  <Box sx={{ display: 'flex' }}>
                    <Typography variant="div"
                      noWrap
                      component="h3"
                      sx={{ color: '#F3D184' }}>
                      Iniciar Sesion
                    </Typography>
                  </Box>
                </Typography>
              }
            </Box>

            <Box sx={{ display: { xs: 'flex', md: 'none'} }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />

              </IconButton>
            </Box>
          </Box>


        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}