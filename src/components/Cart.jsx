import React, { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import { Button } from "@material-ui/core";

import { useStateContext } from "../context/StateContext";

const Cart = () => {
  const {
    showCart,
    setShowCart,
    cartItems,
    handleEmpty,
    totalPrice,
    products,
    onRemove
  } = useStateContext();

  useEffect(() => {
    console.log("cartItems", cartItems);
  }, [cartItems]);

  return (
    <>
      <CartContainer>
        <CartButton type="button" onClick={() => setShowCart(!showCart)}>
          <CloseIcon />
        </CartButton>

        {cartItems.length < 1 && (
          <EmptyCart>
            <h3>Your shopping cart is empty</h3>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowCart(false)}
            >
              Continue Shopping
            </Button>
          </EmptyCart>
        )}

        {cartItems.length >= 1 && (
          <>
            <FullCart>
              {cartItems.map((item) => (
                <CartProductCard key={item.id}>
                  <img
                    src={item.image}
                    alt="cartItem-img"
                    width={100}
                    height={100}
                  />
                  <CartProductDesc>
                    <span>{item.name}</span>
                    <span>
                      Price: {item.price.full} {item.price.currency}
                    </span>
                    <span>Quantity: {item.quantity}</span>
                    <div>
                      <Button variant="contained" color="secondary" size="small" onClick={() => onRemove(item)}>
                        Remove
                      </Button>
                    </div>
                  </CartProductDesc>
                </CartProductCard>
              ))}

              <PriceContainer>
                <h4>Total price:</h4>
                <h4>
                  {parseFloat(totalPrice).toFixed(2)}
                  {products[1].price.currency}
                </h4>
              </PriceContainer>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleEmpty()}
              >
                Empty Cart
              </Button>
            </FullCart>
          </>
        )}
      </CartContainer>
    </>
  );
};

export default Cart;

const CartContainer = styled.div`
   {
    width: 400px;
    background-color: white;
    border: 1px solid grey;
    position: fixed;
    right: 0;
    top: 0;
    height: 100vh;
    overflow-y: scroll;
    z-index: 3;
    box-shadow: blue;
    transition: 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
`;
const CartButton = styled.button`
   {
    background-color: transparent;
    height: 3em;
    cursor: pointer;
    border: 1px solid grey;
    border-radius: 50%;
    position: fixed;
    right: 2.5em;
    top: 1.3em;
  }
`;

const EmptyCart = styled.div`
   {
    display: flex;
    height: 100%;
    padding: 2em;
    text-align: center;
    flex-direction: column;
    justify-content: space-around;
  }
`;

const FullCart = styled.div`
   {
    display: flex;
    height: 100%;
    flex-direction: column;
    padding: 2em;
  }
`;

const CartProductCard = styled.div`
   {
    display: flex;
    margin: 2em 0;
    height: 5em;
  }
`;

const CartProductDesc = styled.div`
   {
    display: flex;
    flex-direction: column;
    margin-left: 2em;
    justify-content: space-between;
    font-weight: bold;
  }
`;
const PriceContainer = styled.div`
   {
    display: flex;
    justify-content: space-between;
  }
`;
