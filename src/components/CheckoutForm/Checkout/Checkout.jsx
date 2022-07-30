import React, {useState, useEffect} from 'react';
import {Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import  {commerce} from '../../../lib/commerce';




const steps = ["Shipping address", "Payment details"];

const Checkout = ({cart, order, onCaptureCheckout, error}) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setcheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const [isFinished, setIsFinished] = useState(false);
    const navigate = useNavigate();

    useEffect( () => {
         const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});

                
                setcheckoutToken(token)
            } catch(error){
               navigate('/');
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
    
    const timeout = () => {
       setTimeout(() => {
            setIsFinished(true)
       }, 3000);
    }

    let Confirmation = () => order.customer ? (
       <>
         <div>
            <Typography variant="h5"> Thank you for your purchase, {order.customer.firstname} {order.customer.lastname} </Typography>
            <Divider className='divider' />
            <Typography variant="subtitle2"> Order ref: {order.customer_reference} </Typography>
            <br />
            <Button component={Link} to="/" variant="outline" type="button"> Back to Home </Button>  
         </div>
       </>
    ) : isFinished ? (
        <>
        <div>
           <Typography variant="h5"> Thank you for your purchase </Typography>
           <Divider className='divider' />
           <br />
           <Button component={Link} to="/" variant="outline" type="button"> Back to Home </Button>  
        </div>
      </>

    ) : (
        <div className='spinner'>
            <CircularProgress />
        </div>
    ); 

    if (error){
        <>
           <Typography variant="h5">Error: {error} </Typography>
           <br />
           <Button component={Link} to="/" variant="outline" type="button"> Back to Home </Button>   
        </>
    }

    const Form = () => activeStep === 0 ? <AddressForm  checkoutToken={checkoutToken} next={next}/> 
    : <PaymentForm 
        shippingData = {shippingData} checkoutToken = {checkoutToken} 
        nextStep = {nextStep} backStep={backStep} onCaptureCheckout={onCaptureCheckout}
        timeout= {timeout}/>

    return (
        <>
        {/* <CssBaseline /> */}
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