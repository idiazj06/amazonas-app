import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import {IconButton, Button, Toolbar,List,ListItem,ListItemText   } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { listar } from '../Actions/actionProducts';
import { useHistory } from 'react-router';
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import { Link } from 'react-router-dom';






export default function BarraSec() {
    let history = useHistory();
    const dispatch = useDispatch()

    const productos = useSelector(store => store.addDetail)
    const { products } = productos

    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const setCategoria = (data) =>{
        let result = products.filter((products)=>products.categoria?.toLowerCase() === data?.toLowerCase())
        dispatch(listar(result))
        console.log(result)
    }

    const handleNav = () => {
        history.push("/addprod");
      }

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {['Computadores','Portatiles','Pantallas','Accesorios'].map((data,index)=>(
                    <ListItem key={data} button onClick={()=>{setCategoria(data)}}>
                        <ListItemText primary={data}/>
                    </ListItem>
                ))}
            </List>
        </Box>
    );


    return (
        <>
            <div>

                <Toolbar sx={{ backgroundColor: "#242F3E", color:'white' }}>
                    <React.Fragment key={'left'}>
                        <Button onClick={toggleDrawer('left', true)} sx={{ color:'white' }}><MenuIcon/></Button>
                        <Link to='/products' style={{ textDecoration:'none' }}><Button sx={{ color:'white', textDecoration:'none' }}>todos los productos</Button></Link>
                        <SwipeableDrawer
                            anchor={'left'}
                            open={state['left']}
                            onClose={toggleDrawer('left', false)}
                            onOpen={toggleDrawer('left', true)}
                        >
                            {list('left')}
                        </SwipeableDrawer>
                        <Button sx={{color:'white'}} onClick={handleNav}><AddTaskRoundedIcon/>  &nbsp;Add Nuevo producto</Button>
                    </React.Fragment>
                </Toolbar>

            </div>
        </>
    )
}
