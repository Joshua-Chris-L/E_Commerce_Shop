import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import logo from '../../assets/commerce.png';
import {Link, useLocation} from 'react-router-dom'; 


const Navbar = ({totalItems}) => {
    const location = useLocation()
    return (
        <>
         <AppBar position="fixed" classes="appBar" color="inherit">
            <Toolbar>
                <Typography component={Link} to="/" variant='h6' className='title' color="inherit">
                    <img  src={logo} alt="commerce.js" height="25px" className='image'/>
                    Ferbamg.js
                </Typography>
                <div  className='grow'/>
                { location.pathname === '/' && (<div className='button'>
                    <IconButton component={Link} to="/cart" aria-label='Show cart items' color="inherit">
                        <Badge badgeContent={totalItems} color="secondary">
                                <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </div>)}
                
            </Toolbar>
         </AppBar>   
        </>
    );
};

export default Navbar;