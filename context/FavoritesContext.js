// FavoritesContext.js
import React, { createContext, useState, useContext } from "react";

// Create a Context
const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

// Provider to wrap the app
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (item) => {
    setFavorites((prevFavorites) => [...prevFavorites, item]);
  };

  const removeFavorite = (itemId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.id !== itemId)
    );
  };

  const isFavorite = (itemId) => {
    return favorites.some((fav) => fav.id === itemId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
