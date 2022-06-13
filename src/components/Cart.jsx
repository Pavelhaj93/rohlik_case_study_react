import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";

import { useStateContext } from "../context/StateContext";

const Cart = () => {
  const { showCart, setShowCart } = useStateContext();

  return (
    <>
      <CartContainer>
        <CartButton type="button" onClick={() => setShowCart(!showCart)}>
          <CloseIcon />
        </CartButton>
      </CartContainer>
    </>
  );
};

export default Cart;

const CartContainer = styled.div`
   {
    width: 400px;
    background-color: white;
    border: 2px solid red;
    position: fixed;
    right: 0;
    top: 0;
    height: 100vh;
    z-index: 3;
    box-shadow: blue;
    transition: 0.3s cubic-bezier(0.645,0.045,0.355,1);
  }
`;
const CartButton = styled.button`{
    background-color: transparent;
    height: 3em;
    cursor: pointer;
    border: 1px solid black;
    border-radius: 50%;
    position: fixed;
    right: 3em;
    top: 1.9em;
  }`
