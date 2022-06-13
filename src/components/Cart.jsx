import React from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import styled from 'styled-components';

const Cart = () => {
  return (
    <>
        <CartButton>
            <ShoppingCartIcon />
        </CartButton>
    </>
  )
}

export default Cart

const CartButton = styled.button`{
    background-color: transparent;
    height: 3em;
    cursor: pointer;
    border: 1px solid black;
    border-radius: 50%;

}`