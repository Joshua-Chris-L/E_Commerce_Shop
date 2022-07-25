import React, { useState, useEffect } from 'react';
import './App.css';
// import Products from './components/Products/Products';
// import Navbar from './components/Navbar/Navbar';
import {Products, Navbar, Cart} from './components';
import {commerce} from './lib/commerce';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const {data} = await commerce.products.list();
    setProducts(data);
  }

  // const fetchCart = commerce.cart.retrieve().then((cart) => setCart(cart));
  const fetchCart = async () => {
        const cart = await commerce.cart.retrieve();
        setCart(cart);
   }

  // const handleAddToCart = async (productId, quantity) => {
  //   const item = await commerce.cart.add(productId, quantity);

  //   setCart(item.cart);
  // }

  useEffect(() => {
      fetchProducts();
      fetchCart();
  }, []);


  console.log(cart);
  return (
    <div className='App.css'>
        <Navbar totalItems={cart.total_items} />
        {/* <Products products={products} onAddToCart={handleAddToCart}/> */}
        <Cart cart = {cart}/>
    </div>
  );
}

export default App;
