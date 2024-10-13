import React, { createContext, useState } from "react";

// Create the CartContext
export const CartContext = createContext();

// CartContext Provider
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
