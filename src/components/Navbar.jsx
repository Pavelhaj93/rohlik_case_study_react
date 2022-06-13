import React from "react";
import styled from "styled-components";

import logo from "../assets/rohlik-cz-logo-vector.png";
import Cart from "./Cart";

const Navbar = () => {
  return (
    <>
      <NavContainer>
        <img src={logo} alt="logo" width={100} height={50} />
        <Cart />
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
