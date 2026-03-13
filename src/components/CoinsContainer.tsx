import { useRef, useState } from "react";

import type { CoinInterface } from "../interfaces/Coin";

import { useEffect } from "react";
import CoinsTable from "./CoinsTable";
import Spinner from "./Spinner";
import { URL_API,URL_COINS } from "../constants/api";
const CoinsContainer = () => {
  
  const [coinList, setCoinList] = useState<CoinInterface[]>([]);
  const [coinListOriginal, setCoinListOriginal] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const searchInput = useRef<HTMLInputElement>(null);
  const handleSearch = () => {
    const query = searchInput.current?.value.toLowerCase() || "";
    const filteredCoins = coinListOriginal.filter(coin =>
      coin.name.toLowerCase().includes(query) ||
      coin.symbol.toLowerCase().includes(query) 
    );
    setCoinList(filteredCoins);
  };  

  useEffect(() => {
        fetch(`${URL_API}${URL_COINS}`)
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
    }, []);

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
     <CoinsTable coins={coinList} />
     {coinList.length === 0 && (
       <div className="text-center text-gray-500 mt-8">
         <p> No se encontraron resultados </p>
       </div>
     )}
    </div>
  );
}
export default CoinsContainer;