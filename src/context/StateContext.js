import React, { createContext, useContext, useState, useEffect } from "react";
import data from "../data/products.json";
const Context = createContext();

export const StateContext = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0)

  const onAdd = (product, quantity) => {

  }

  useEffect(() => {

      console.log(showCart)
  }, [showCart])

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
        setTotalPrice
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
