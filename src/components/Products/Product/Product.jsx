import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';



const Product = ({product, onAddToCart}) => {
    
    return (
             <Card className='rooot'> 
                     <CardMedia
                            className="setImage"
                            component="img"
                            height= "470"
                            image={product.image.url}
                            alt="Paella dish"
                         />
                    <CardContent>
                        <div className='cardContent'>
                            <Typography variant="h5" gutterBottom>
                                {product.name}
                            </Typography>
                            <Typography variant="h5">
                                {product.price.formatted_with_symbol}
                            </Typography>
                        </div>
                        <Typography variant='body2' color="textSecondary" > 
                            {product.description.replace(/<[^>]+>/g, '')}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing className='cardActions'>
                            <IconButton aria-label="Add to Cart" onClick={ () => onAddToCart(product.id, 1)}>
                                <AddShoppingCartIcon />
                            </IconButton>
                    </CardActions>
            </Card>
            
    );
};

export default Product;