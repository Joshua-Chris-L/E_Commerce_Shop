import React from 'react';
import { Typography, Button, Divider } from '@mui/material';
import {Elements, CardElement, ElementConsumer} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Review from './Review';


const stripePromise = loadStripe('...');

const PaymentForm = ( {checkoutToken, backStep}) => {
    return (
        <>
         <Review checkoutToken={checkoutToken}/>
         <Divider />
         <Typography variant="h6" gutterBottom style={{margin:'20px 0'}}> Payment Method</Typography>
         <Elements stripe={stripePromise}>
             <ElementConsumer>
                {({elements, stripe}) => (
                      <form>
                          <CardElement />
                          <br /> <br />
                          <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Button variant="outlined" onClick={backStep}> Back </Button>
                            <Button type="submit" variant="contained" disaled={!stripe} color="primary"> 
                                pay {checkoutToken.live.subtotal.formatted_with_symbol}
                            </Button>

                          </div>
                      </form>
                )}
             </ElementConsumer>
         </Elements>
        </>
    );
};

export default PaymentForm;