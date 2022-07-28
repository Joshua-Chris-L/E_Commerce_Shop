import React, {useState, useEffect} from 'react';
import {Paper, Stepper, Step, StepLabel, Typography, CircularProgess, Divider, Button} from '@mui/material';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import  {commerce} from '../../../lib/commerce';

const steps = ["Shipping address", "Payment details"];

const Checkout = ({cart}) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setcheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});

    useEffect( () => {
         const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});

                console.log(token);
                setcheckoutToken(token)
            } catch(error){

            }
         }
         generateToken();
    }, [cart])

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const next = (data) => {
            setShippingData(data);

            nextStep();
    }

    const Confirmation = () => (
        <div>
            Confirmation
        </div>
    )
    const Form = () => activeStep === 0 ? <AddressForm  checkoutToken={checkoutToken} next={next}/> 
    : <PaymentForm shippingData = {shippingData} checkoutToken = {checkoutToken}  backStep={backStep}/>

    return (
        <>
            <div  className='toolbar'/>
            <main className='layout'>
               <Paper  className='paper'>
                   <Typography  variant='h4' align="center"> Checkout</Typography>
                    <Stepper activeStep={activeStep} className="stepper">
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel> {step} </StepLabel>
                            </Step>
                           
                        )) }
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form/>}
               </Paper>
            </main>
        </>
    );
};

export default Checkout;