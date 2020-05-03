import React, { useState } from 'react';

import ChatRoom from './ChatRoom';
import Rooms from './Rooms';
import {
    AppBar,
    Toolbar,
    Grid,
    Box,
    Typography,
    Drawer,
    IconButton
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';

function ChatAppBar({ handleDrawerOpen }) {
    return (
        <AppBar
            position='fixed'
            className=''
        >
            <Toolbar>
                <IconButton
                    id='inner-menu-toggle-button'
                    color='inherit'
                    aria-label='open drawer'
                    onClick={handleDrawerOpen}
                    edge='start'
                    display={{ xs: 'none', sm: 'block' }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant='h6' component='h1' noWrap>
                    Chat
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

function MenuDrawer({ handleDrawerClose, open }) {
    return (
        <Drawer
            variant='persistent'
            open={open}
        >
            <div>
                <IconButton 
                    id='arrow-button'
                    onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Rooms handleDrawerClose={handleDrawerClose} />
        </Drawer>
    )
}

export default function ChatDrawer() {
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    
    return (
        <ScopedCssBaseline>
            <ChatAppBar handleDrawerOpen={handleDrawerOpen} />
            <MenuDrawer handleDrawerClose={handleDrawerClose} open={open} />
            <Toolbar />
            <Grid container>
                <Box
                    component={Grid}
                    item
                    sm={3}
                    display={{ xs: 'none', sm: 'block' }}>
                    <Rooms handleDrawerClose={handleDrawerClose} />
                </Box>
                <Grid item xs={12} sm={9}>
                    <ChatRoom />
                </Grid>
            </Grid>
        </ScopedCssBaseline>
    )
}