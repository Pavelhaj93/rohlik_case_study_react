import React, { createContext, useContext, useState, useEffect } from "react";
import data from "../data/products.json";
const Context = createContext();

export const StateContext = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
