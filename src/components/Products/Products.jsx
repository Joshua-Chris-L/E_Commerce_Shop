import React from "react";
import Grid from '@mui/material/Grid';
import Product from './Product/Product';

// const products = [
//     {id:1, name:'Shoes', description:'Runing Shoes', price:'$5', image:'https://post.healthline.com/wp-content/uploads/2022/05/2191775-waiting-for-assets-and-vetting-The-Best-Shoes-for-Plantar-Fasciitis-for-2022-1200x628-Facebook-1200x628.jpg'},
//     {id:2, name:'Macbook', description:'Apple Macbook', price:'$10', image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bWFjYm9va3xlbnwwfHwwfHw%3D&w=1000&q=80'}
// ];

const Products = ({products, onAddToCart}) => {
    return (
        <main className="content">
        <div  className="toolbar"/>
        <Grid container justifyContent='center' spacing={4}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3} >
                        <Product product={product} onAddToCart = {onAddToCart}/>
                    </Grid>
                ))}
        </Grid>
    </main>
    )
};

export default Products;