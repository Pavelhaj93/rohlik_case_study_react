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
    onAdd,
    quantity,
    onRemove,
    onDecrease,
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
                  <ImgContainer>
                    <img
                      src={item.image}
                      alt="cartItem-img"
                      height={100}
                      style={{ width: "100%", objectFit: "contain" }}
                    />
                  </ImgContainer>
                  <CartProductDesc>
                    <span>{item.name}</span>
                    <span>
                      Total price: {Math.round((item.price.full * item.quantity) * 100) / 100} {item.price.currency}
                    </span>
                    <span>Quantity: {item.quantity}</span>
                    <ButtonsContainer>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{ margin: "0 1em" }}
                        onClick={() => onAdd(item, quantity)}
                      >
                        +
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        style={{ margin: "0 1em" }}
                        onClick={() => onDecrease(item, quantity)}
                      >
                        -
                      </Button>
                    </ButtonsContainer>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      style={{ margin: "0 1em" }}
                      onClick={() => onRemove(item)}
                    >
                      Remove
                    </Button>
                  </CartProductDesc>
                </CartProductCard>
              ))}

              <PriceContainer>
                <h4>Total price:</h4>
                <h4>
                  {Math.round(totalPrice * 100) / 100}
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
    overflow-y: auto;
    z-index: 4;
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
    min-height: 100vh;
    flex-direction: column;
    padding: 3em 1em 2em 1em;
    // padding-bottom: 2em;
  }
`;

const CartProductCard = styled.div`
   {
    display: flex;
    margin: 2em 0;
    height: 8em;
  }
`;

const CartProductDesc = styled.div`
   {
    display: flex;
    flex-direction: column;
    margin-left: 2em;
    justify-content: space-between;
    font-weight: bold;
    width: 50%;
  }
`;
const PriceContainer = styled.div`
   {
    display: flex;
    justify-content: space-between;
  }
`;

const ImgContainer = styled.div`
   {
    display: flex;
    width: 40%;
    justify-content: center;
  }
`;

const ButtonsContainer = styled.div`
   {
    display: flex;
    margin: 5px 0;
  }
`;
