// context/AppContext.js
import React, { createContext, useState } from "react";

// Create the context
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, setState] = useState(false);

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};
