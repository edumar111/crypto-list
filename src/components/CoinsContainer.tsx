import { useRef, useState } from "react";
import CoinsTable from "./CoinsTable";
import Spinner from "./Spinner";
import type { CoinInterface } from "../interfaces/Coin";
import CoinsNotFound from "./CoinsNotFound";
import { useCoins } from "../hooks/useCoins";

const CoinsContainer = () => {
  
  const [search, setSearch] = useState("");

  const {data: coinList, isLoading,isFetching, error} = useCoins();
  const filteredCoins = coinList?.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  ) || [];
  const searchInput = useRef<HTMLInputElement>(null);
  
    if (isLoading) {
       return <Spinner />;
    }
    if (error) {
        return (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <p className="text-red-600 text-lg font-semibold">{error.message}</p>
          </div>
        );
    } 
  return (
    <div className="coins-list">
    <input 
      type="text" 
      placeholder="Buscar criptomoneda..." 
      ref={searchInput}  
      onChange={e => setSearch(e.target.value)}
      className="w-full px-4 py-3 mb-6 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm bg-white"
    />
     {isFetching && <div>Actualizando datos...</div>}
     {filteredCoins && filteredCoins.length> 0  ? <CoinsTable coins={filteredCoins as CoinInterface[]} />:<CoinsNotFound />}
    </div>
  );
}
export default CoinsContainer;