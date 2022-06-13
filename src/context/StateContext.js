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

  const onAdd = (product, quantity) => {
    console.log(product);

    const checkProductInCart = cartItems.find((item) => item.id === product.id);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct.id === product.id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });
      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);
    }

    
  };

  useEffect(() => {
    const calculatePrice = cartItems.map((cartItem) => {
        return (
            cartItem.quantity * cartItem.price.full
        )
    })
    console.log(totalPrice, "totalPrice")
    console.log(cartItems, "cart");
    setTotalPrice(calculatePrice)
    setTotalQuantities(cartItems.length);
}, [cartItems])


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
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
