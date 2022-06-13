
import React from 'react'
import Navbar from './components/Navbar';
import Product from './components/Product';
import products from './data/products.json';

const App = () => {
  return (
    <>
    <Navbar />
      {products.map((product) => {
        <Product />
      })}
    </>
  )
}

export default App