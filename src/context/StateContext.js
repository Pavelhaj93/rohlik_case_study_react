import React, { createContext, useContext, useState, useEffect } from "react";

import data from "../data/products.json";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Persist logic saving to the localStorage
  useEffect(() => {
    if (cartItems?.length) {
      window.localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Persist logic loading the cartItems and calculating the price from all the element in the localStorage
  useEffect(() => {
    if (cartItems.length === 0) {
      const persist = JSON.parse(window.localStorage.getItem("cartItems"));
      // if there is something in localStorage then we setCartItems the localStorage items and also count TotalPrice from all the elements in the storage and multiply by quantity
      if (persist && persist.length > 0) {
        setCartItems(persist);
        let total = 0.0;
        persist.forEach((element) => {
          total += element.price.full * element.quantity;
        });
        setTotalPrice(total);
      }
    }
  }, [cartItems]);

  // Add function logic we pass in the product and quantity from global state
  const onAdd = (product, quantity) => {
    // First we check if the same product is already in the cart or not
    const checkProductInCart = cartItems.find((item) => item.id === product.id);

    // we adding the product a new propert quantity
    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct.id === product.id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        else return cartProduct;
      });
      setCartItems(updatedCartItems);
      setTotalPrice((totalPrice) => totalPrice + product.price.full);
    } else {
      product.quantity = quantity;
      setTotalPrice((totalPrice) => totalPrice + product.price.full);
      setCartItems((cartItems) => [...cartItems, product]);
    }
  };

  const onDecrease = (product, quantity) => {

    // if quantity is 1 we no longer want to decrease qty to 0 so we stop the function 
    if (product.quantity === 1) {
      return
    }

    // same logic as onAdd but we decrement quantity and totalPrice
    const updatedCartItems = cartItems.map((cartProduct) => {
      if (cartProduct.id === product.id)
        return {
          ...cartProduct,
          quantity: cartProduct.quantity - quantity,
        };
      else return cartProduct;
    });
    setCartItems(updatedCartItems);
    setTotalPrice((totalPrice) => totalPrice - product.price.full);
  };

  // Remove logic
  const onRemove = (product) => {
    const newCartItems = cartItems.filter((item) => item.id !== product.id);

    setCartItems(newCartItems);
    setTotalPrice((totalPrice) => totalPrice - product.quantity * product.price.full )

    // When removing the last product, it stayed in the cart because it was always loaded from localStorage so the handleEmpty function is needed to call to clear whole cart
    if (cartItems.length === 1) {
      handleEmpty();
    }
  };

  // Empty cart logic
  const handleEmpty = () => {
    window.localStorage.removeItem("cartItems");
    setCartItems([]);
    setTotalPrice(0)
  };

  // Setting the total quantities for the red circle at cart icon
  useEffect(() => {
    setTotalQuantities(cartItems.length);
  }, [cartItems]);

  // Filter logic, if the filter is empty we show all the products, if not we filter if the searchTerm in lowerCase is included in product name
  useEffect(() => {
    if (searchTerm === "") {
      setProducts(data);
    } else {
      const filteredData = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm)
      );
      setProducts(filteredData);
    }
  }, [searchTerm]);

  return (
    <Context.Provider
      value={{
        products,
        setProducts,
        searchTerm,
        setSearchTerm,
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        totalPrice,
        setTotalPrice,
        quantity,
        setQuantity,
        onAdd,
        totalQuantities,
        setTotalQuantities,
        onRemove,
        handleEmpty,
        onDecrease,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
