import React from 'react';
import {Container, Typography, Button, Grid} from '@mui/material';
import CartItem from './CartItem/CartItem';
import {Link} from 'react-router-dom';

const Cart = ({cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart }) => {

    const EmptyCart = () => (
         <Typography variant="subtitled"> 
                 You have no items in your shopping cart. Start adding items 
                 <Link to="/" className='link'>Start Adding some</Link> 
         </Typography>
        );

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map( (item) => (
                        <Grid item xs={12} sm={4} key={item.id}> 
                            <CartItem item={item} onUpdateCartQty={handleUpdateCartQty} onRemoveCartQty={handleRemoveFromCart}/>
                        </Grid>
                ))}
            </Grid>
            <div className='cardDetails'>
                    <Typography variant="h4">
                            Subtotal: {cart.subtotal.formatted_with_symbol}
                    </Typography>
                    <div>
                        <Button className="emptyButton" size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>
                            Empty Cart
                        </Button>
                        <Button component={Link} to="/checkout" className="checkoutButton" size="large" type="button" variant="contained" color="primary">
                            Checkout
                        </Button>
                    </div>
            </div>
            
        </>

    );

    if(!cart.line_items) return 'Loading ...';
    
    return (
        <Container>
             <div  className='toolbar'></div>
             <Typography className='card_title' variant="h3" gutterBottom>
                 Your Shopping Cart
             </Typography>
             {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
        </Container>
        
     );
 };
 
 export default Cart;
     