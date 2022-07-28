import React, { useState, useEffect } from 'react';
import './App.css';
// import Products from './components/Products/Products';
// import Navbar from './components/Navbar/Navbar';
import {Products, Navbar, Cart, Checkout} from './components';
import {commerce} from './lib/commerce';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


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

  const handleAddToCart = async (productId, quantity) => {
    const {cart} = await commerce.cart.add(productId, quantity);

    setCart(cart);
  }

  const  handleUpdateCartQty = async (productId, quantity) => {
    const {cart} = await commerce.cart.update(productId, {quantity});

    setCart(cart);
  }

  const handleRemoveFromCart = async (productId) => {
    const {cart} = await commerce.cart.remove(productId);

    setCart(cart);
  }

  const handleEmptyCart = async () => {
    const {cart} = await commerce.cart.empty();

    setCart(cart);
  }

  useEffect(() => {
      fetchProducts();
      fetchCart();
  }, []);

  return (
    <Router>
      <div className='App.css'>
        <Navbar totalItems={cart.total_items} />
        <Routes>
           <Route path="/" element={ <Products products={products} onAddToCart={handleAddToCart}/> } />
           <Route 
                  path="/cart" element={<Cart cart = {cart}
                  handleUpdateCartQty = {handleUpdateCartQty}
                  handleRemoveFromCart = {handleRemoveFromCart}
                  handleEmptyCart  = {handleEmptyCart} />}
           />
           <Route path="/checkout" element={ <Checkout cart= {cart}/> } />
        </Routes>
     </div>
    </Router>
  );
}

export default App;
