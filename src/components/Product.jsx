import React from "react";
import styled from "styled-components";

const Product = () => {
  return (
    <>
      <ProductsContainer></ProductsContainer>
    </>
  );
};

export default Product;

const ProductsContainer = styled.div`
   {
    display: flex;
    justify-content: space-between;
    flex-grow: grow;
  }
`;
