import React, { useState } from "react";
import styled from "styled-components";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


import logo from "../assets/rohlik-cz-logo-vector.png";
import Cart from "./Cart";
import { useStateContext } from '../context/StateContext';

const Navbar = () => {
  const { showCart, setShowCart } = useStateContext();


  return (
    <>
      <NavContainer>
        <img src={logo} alt="logo" width={100} height={50} />
        {showCart === false ?  <CartButton type="button" onClick={() => setShowCart(!showCart)}>
            <ShoppingCartIcon />
        </CartButton> : ''}
        {showCart && <Cart />}
      </NavContainer>
    </>
  );
};

export default Navbar;

const NavContainer = styled.div`
   {
     height: 8vh;
     display: flex;
     justify-content: space-between;
     padding: 1em 2em;
  }
`;

const CartButton = styled.button`{
  background-color: transparent;
  height: 3em;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 50%;

}`
