import React, { useState } from 'react'
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Button, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function BarraSec() {

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

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            asd
        </Box>
    );


    return (
        <>
            <div>

                <Toolbar sx={{ backgroundColor: "#242F3E", color:'white' }}>
                    <React.Fragment key={'left'}>
                        <Button onClick={toggleDrawer('left', true)} sx={{ color:'white' }}><MenuIcon/>Todo</Button>
                        <SwipeableDrawer
                            anchor={'left'}
                            open={state['left']}
                            onClose={toggleDrawer('left', false)}
                            onOpen={toggleDrawer('left', true)}
                        >
                            {list('left')}
                        </SwipeableDrawer>
                    </React.Fragment>
                </Toolbar>

            </div>
        </>
    )
}
