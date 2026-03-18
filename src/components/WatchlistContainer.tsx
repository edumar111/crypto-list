import {  useRef, useState } from "react";

import type { CoinInterface } from "../interfaces/Coin";

import { useEffect } from "react";
import CoinsTable from "./CoinsTable";
import Spinner from "./Spinner";
import { URL_API,URL_COINS } from "../constants/api";

import { useFavoritesStore } from "../store/FavoritesStore";
const WatchlistContainer = () => {
  
  const [coinList, setCoinList] = useState<CoinInterface[]>([]);
  const [coinListOriginal, setCoinListOriginal] = useState<CoinInterface[]>([]);
  const { favorites: favoriteIds } = useFavoritesStore();

  const hasFavorites = favoriteIds.length > 0;

  const [loading, setLoading] = useState<boolean>(hasFavorites);
  const [error, setError] = useState<string | null>(null);

  const searchInput = useRef<HTMLInputElement>(null);

  const handleFavoriteChange = (coinId: string, isFavorite: boolean) => {
    if (isFavorite) {
      return;
    }

    setCoinList((prevCoins) => prevCoins.filter((coin) => coin.id !== coinId));
    setCoinListOriginal((prevCoins) => prevCoins.filter((coin) => coin.id !== coinId));
  };

  const handleSearch = () => {
    const query = searchInput.current?.value.toLowerCase() || "";
    const filteredCoins = coinListOriginal.filter(coin =>
      coin.name.toLowerCase().includes(query) ||
      coin.symbol.toLowerCase().includes(query) 
    );
    setCoinList(filteredCoins);
  };  

  useEffect(() => {
        if (!hasFavorites) {
          return;
        }

        fetch(`${URL_API}${URL_COINS}&ids=${favoriteIds.join(",")}`)
        .then(res => res.json())
        .then(data => {
          setCoinList(data);
          setCoinListOriginal(data);
        })
        .catch(error => {
          console.error("Error fetching coins data:", error);
          setError("Error fetching coins data. Please try again later.");
          
        }).finally(() => {
          setLoading(false);
        });
    }, [favoriteIds, hasFavorites]);

    if (!hasFavorites || coinListOriginal.length === 0) {
      return (
        <div className="flex min-h-[320px] items-center justify-center rounded-lg border border-gray-200 bg-white shadow-sm">
          <p className="text-lg font-semibold text-gray-600">No tienes criptomonedas favoritas todavia.</p>
        </div>
      );
    }

    if (loading) {
       return <Spinner />;
    }

    if (error) {
        return (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <p className="text-red-600 text-lg font-semibold">{error}</p>
          </div>
        );
    } 

  return (
    <div className="coins-list">
    <input 
      type="text" 
      placeholder="Buscar criptomoneda..." 
      ref={searchInput}  
      onChange={handleSearch}
      className="w-full px-4 py-3 mb-6 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-white"
    />
    <CoinsTable coins={coinList} onFavoriteChange={handleFavoriteChange} />
     {coinList.length === 0 && (
       <div className="text-center text-gray-500 mt-8">
         <p> No se encontraron resultados </p>
       </div>
     )}
    </div>
  );
}
export default WatchlistContainer;