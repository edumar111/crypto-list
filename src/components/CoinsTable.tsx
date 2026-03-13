
import type { CoinInterface } from "../interfaces/Coin";
import Coin from "./Coin";

interface CoinsTableProps {
  coins: CoinInterface[];
  onFavoriteChange?: (coinId: string, isFavorite: boolean) => void;
}

const CoinsTable = ({ coins, onFavoriteChange }: CoinsTableProps) => {
    
  return (
    <table className="w-full bg-white rounded-lg overflow-hidden shadow-md border border-gray-200">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">#</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">24h Change</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Favorite</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
         
          {coins.map((coin) => (
            <Coin key={coin.id} {...coin} onFavoriteChange={onFavoriteChange} />
          ))}
        </tbody>
        </table>
  );
};

export default CoinsTable;