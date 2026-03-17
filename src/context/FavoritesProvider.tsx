import React, { use, useEffect } from 'react';
import { FavoritesContext } from './FavoritesContext';

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
    
    const [favorites, setFavorites] = React.useState<string[]>(() =>{
        return   JSON.parse(localStorage.getItem("favorites") || "[]");
    });
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (id: string) => {
        setFavorites(prev => [...prev, id]);

    };

    const removeFavorite = (id: string) => {
        setFavorites(prev => prev.filter(fav => fav !== id));
    };

    const isFavorite = (id: string) => {
        return favorites.includes(id);
    };
  return (
    <FavoritesContext.Provider value={{
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite,
    }}>
        {children}
    </FavoritesContext.Provider>
  );
};
