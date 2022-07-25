import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import logo from '../../assets/commerce.png';

const Navbar = ({totalItems}) => {
    return (
        <>
         <AppBar position="fixed" classes="appBar" color="inherit">
            <Toolbar>
                <Typography variant='h6' className='title' color="inherit">
                    <img  src={logo} alt="commerce.js" height="25px" className='image'/>
                    Ferbamg.js
                </Typography>
                <div  className='grow'/>
                <div className='button'>
                    <IconButton aria-label='Show cart items' color="inherit">
                        <Badge badgeContent={totalItems} color="secondary">
                                <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </div>
            </Toolbar>
         </AppBar>   
        </>
    );
};

export default Navbar;