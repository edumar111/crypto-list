import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesStore {
  favorites: string[];
  addFavorite: (item: string) => void;
  removeFavorite: (item: string) => void;
  isFavorite: (item: string) => boolean;
  countFavorites: () => number;
}

export const useFavoritesStore = create<FavoritesStore>()(persist(
    (set, get) => ({
        favorites: [],
        addFavorite: (item) => set((state) => ({ favorites: [...state.favorites, item] })),
        removeFavorite: (item) => set((state) => ({ favorites: state.favorites.filter(fav => fav !== item) })),
        isFavorite: (item) => get().favorites.includes(item),
        countFavorites: () => get().favorites.length,
    }),
    {
        name: 'favorites', // nombre de la clave en localStorage
    }   
));