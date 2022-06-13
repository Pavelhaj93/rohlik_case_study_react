import React from "react";

import Navbar from "./components/Navbar";
import Products from "./components/Products";
import { StateContext } from "./context/StateContext";

const App = () => {
  return (
    <>
      <Navbar />
      <Products />
    </>
  );
};

export default App;
