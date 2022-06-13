import React, { useEffect } from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { useStateContext } from "../context/StateContext";

const Product = () => {
  const { products, setProducts, searchTerm, setSearchTerm } =
    useStateContext();

  return (
    <>
      <FilterContainer>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        />
      </FilterContainer>
      <ProductsContainer>
        {products.map((product) => {
          return (
            <ProductCard key={product.id}>
              <img
                src={product.image}
                height={100}
                width={150}
                alt="product-img"
              />
              <ProductTitle>{product.name}</ProductTitle>
              <ButtonsContainer>
                <Button
                  style={{ margin: "0 1em" }}
                  variant="contained"
                  color="primary"
                >
                  Add to Cart
                </Button>
                <Button
                  style={{ margin: "0 1em" }}
                  variant="contained"
                  color="secondary"
                  size="small"
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
    </>
  );
};

export default Product;

const FilterContainer = styled.div`{
  height: 2em;
  display: flex;
  justify-content: center;
}`

const ProductCard = styled.div`
   {
    display: flex;
    flex-direction: column;
    width: 18%;
    height: 20em;
    border: 1px solid red;
    justify-content: space-between;
    align-items: center;
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
