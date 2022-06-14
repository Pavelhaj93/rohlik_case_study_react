import React from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";

import { useStateContext } from "../context/StateContext";

const Product = () => {
  const { products, quantity, onAdd, onRemove } = useStateContext();

  return (
    <MainContainer>
      
      <ProductsContainer>
        {products.map((product) => {
          return (
            <ProductCard key={product.id}>
              <img
                src={product.image}
                height={150}
                width={150}
                alt="product-img"
              />
              <ProductTitle>{product.name}</ProductTitle>
              <ButtonsContainer>
                <Button
                  style={{ margin: "0 1em" }}
                  variant="contained"
                  color="primary"
                  onClick={() => onAdd(product, quantity)}
                >
                  Add to Cart
                </Button>
                <Button
                  style={{ margin: "0 1em" }}
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={() => onRemove(product)}
                >
                  Remove from Cart
                </Button>
              </ButtonsContainer>
              <ProductPrice>
                {product.price.full} {product.price.currency}
              </ProductPrice>
            </ProductCard>
          );
        })}
      </ProductsContainer>
    </MainContainer>
  );
};

export default Product;

const MainContainer = styled.div`{
  width: 100vw;
  padding-top: 5em;
}`

const ProductCard = styled.div`
   {
    display: flex;
    flex-direction: column;
    width: 18%;
    height: 28em;
    border: 1px solid grey;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
   
    @media (min-width: 1265px) and (max-width: 1350px) {
      width: 20%
    }

    @media (min-width: 950px) and (max-width: 1264px) {
      width: 30%
    }

    @media (min-width: 600px) and (max-width: 950px) {
      width: 45%
    }

    @media (max-width: 600px) {
      width: 100%
    }
  }
`;

const ProductsContainer = styled.div`
   {
    height: 90vh;
    gap: 30px;
    max-width: 100vw;
    padding: 2em;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
`;

const ProductTitle = styled.h2`
   {
    text-align: center;
  }
`;

const ProductPrice = styled.h3`
   {
  }
`;

const ButtonsContainer = styled.div`
   {
    display: flex;
    justify-content: space-between;
  }
`;

// const QuantityContainer = styled.div`
//    {
//     display: flex;
//     width: 50%;
//     align-items: center;
//     justify-content: space-between;
//   }
// `;

// const QtyButton = styled.button`
//    {
//     background-color: transparent;
//     height: 3em;
//     cursor: pointer;
//     border: 1px solid black;
//     border-radius: 50%;
//   }
// `;
