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

  // Persist logic saving
  useEffect(() => {
    if (cartItems?.length) {
      window.localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Persist logic loading the cartItems and calculating the price from all the element in the storage
  useEffect(() => {
    if (cartItems.length === 0) {
      const persist = JSON.parse(window.localStorage.getItem("cartItems"));
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

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => item.id === product.id);

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

  const onRemove = (product) => {
    const newCartItems = cartItems.filter((item) => item.id !== product.id);

    setCartItems(newCartItems);
  };

  useEffect(() => {
    const calculatePrice = cartItems.map((cartItem) => {
      return cartItem.quantity * cartItem.price.full;
    });
    console.log(totalPrice, "totalPrice");

    console.log(cartItems, "cart");

    // setTotalPrice(calculatePrice);
    setTotalQuantities(cartItems.length);
  }, [cartItems]);

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
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
