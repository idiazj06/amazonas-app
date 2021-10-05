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


  const {products} = productos




  const { name } = logged

  
  const handleLogin = () => {
    history.push("/auth/login");
  }


  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

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
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(startLogout())
  }

  const [country, region, watch, setWatch, ubicacion] = useLocation()


  const handleLocation = () => {
    setWatch(true)

  }
  const [searchValue, setSearchValue] = useState('')

  const handleSearch = (e) =>{
    e.preventDefault()
    setSearchValue(e.target.value)
    
    let searchFilter = products.filter(busq =>busq.nombre.toLowerCase().includes(searchValue.toLowerCase()))
    dispatch(listar(searchFilter))
  }



  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ backgroundColor: "#131921" }}>
          <img src="https://res.cloudinary.com/duaokxfsp/image/upload/v1632197422/Amazonas/logo-amazon_wzvnaw.png" alt="" />
          <Typography
            variant="p"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" }, ml: 5 }}
          >
            <LocationOnOutlinedIcon />
          </Typography>

          {
            ubicacion ?
              <Typography
                variant="p"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                {country} ,<br />
                {region}
              </Typography>
              :
              <Typography
                variant="p"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block", cursor:'pointer'} }}
                onClick={handleLocation}
              >
                Hola
                <p>Elige tu dirección</p>
              </Typography>
          }



          <Search >
            <SearchIconWrapper>

            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleSearch}

            />
            <SearchIcon />
          </Search>

          <Box spacing={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginLeft: 2 }}>

            {login ?
              <Typography
                variant="div"
                noWrap
                component="div"
                className="pointer" sx={{ padding: 1, cursor: 'pointer'}}
                onClick={handleLogout}

              >
                Hola,{name}
                <Box sx={{ display: 'flex' }}>
                  <p>Cerrar sesion</p>
                </Box>
              </Typography>
              :
              <Typography
                variant="div"
                noWrap
                component="div"
                className="pointer" sx={{ padding: 1, cursor: 'pointer'}}
                onClick={handleLogin}
              >
                Hola,Identificate
                <Box sx={{ display: 'flex' }}>
                  <p>Iniciar sesion</p>
                </Box>
              </Typography>
            }

            

          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
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
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}