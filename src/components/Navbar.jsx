import React from "react";
import styled from "styled-components";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import logo from "../assets/rohlik-cz-logo-vector.png";
import Cart from "./Cart";
import { useStateContext } from "../context/StateContext";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities, setSearchTerm } =
    useStateContext();

  return (
    <>
      <NavContainer>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "3em",
          }}
        >
          <img src={logo} alt="logo" width={100} height={50} />
          <CartButton type="button" onClick={() => setShowCart(!showCart)}>
            <ShoppingCartIcon />
            <QtySpan>{totalQuantities}</QtySpan>
          </CartButton>
        </div>
        <FilterContainer>
          <input
            type="text"
            placeholder="Search products..."
            autoComplete="off"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            style={{ width: "300px", height: "3em" }}
          />
        </FilterContainer>
        {showCart && <Cart />}
      </NavContainer>
    </>
  );
};

export default Navbar;

const NavContainer = styled.div`
   {
    height: 16vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1em 2em;
    position: fixed;
    background-color: white;
    width: 100vw;
    z-index: 3;
    border-bottom: 1px solid grey;
  }
`;

const CartButton = styled.button`
   {
    background-color: transparent;
    height: 3em;
    cursor: pointer;
    border: 1px solid black;
    border-radius: 50%;
  }
`;

const QtySpan = styled.span`
   {
    position: absolute;
    top: 50px;
    right: 38px;
    font-size: 16px;
    color: #eee;
    background-color: #f02d34;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    text-align: center;
    font-weight: 600;
    text-align: center;
  }
`;

const FilterContainer = styled.div`
   {
    height: 3em;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 4;
  }
`;
