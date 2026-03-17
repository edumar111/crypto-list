import { useContext } from "react";
import type { CoinInterface } from "../interfaces/Coin";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { FavoritesContext } from "../context/FavoritesContext";

interface CoinProps extends CoinInterface {
    onFavoriteChange?: (coinId: string, isFavorite: boolean) => void;
}

const Coin =({ id,name, symbol, current_price, price_change_24h, image, onFavoriteChange }: CoinProps) => {
   
    const {isFavorite,addFavorite, removeFavorite} = useContext(FavoritesContext);

    const handleFavorites = () => {
        if(isFavorite(id)){
            removeFavorite(id);
            onFavoriteChange?.(id, false);
        }else{
            addFavorite(id);
            onFavoriteChange?.(id, true);
        }
    }
    return(
        <tr className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-5 text-sm font-medium text-gray-500">{id}</td>
            <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                    <Link to={`/coin/${id}`} className="flex items-center gap-3">
                        <img src={image} alt={symbol} className="w-8 h-8 rounded-full" />
                        <div className="flex flex-col">
                            <div className="font-semibold text-gray-900 text-base">{name}</div>
                            <div className="text-gray-500 text-sm font-medium">{symbol}</div>
                        </div>
                    </Link>
                </div>
            </td>
            
            <td className="px-6 py-5 text-base font-semibold text-gray-900">${current_price}</td>
            <td className="px-6 py-5 text-sm font-semibold">
                <span className={price_change_24h >= 0 ? "text-green-600" : "text-red-600"}>
                    {price_change_24h >= 0 ? "+" : ""}{price_change_24h?.toFixed(2)}%
                </span>
            </td>
            <td className="px-6 py-5">
                <button 
                    onClick={handleFavorites}
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-md border transition-all ${
                        isFavorite(id) 
                            ? "border-yellow-200 bg-yellow-50 hover:bg-yellow-100" 
                            : "border-gray-200 bg-gray-100 hover:bg-gray-200"
                    }`}
                    aria-label={isFavorite(id) ? "Quitar de favoritos" : "Agregar a favoritos"}
                    title={isFavorite(id) ? "Quitar de favoritos" : "Agregar a favoritos"}
                >
                    <Star
                        className={`h-5 w-5 ${
                            isFavorite(id)
                                ? "fill-yellow-400 text-yellow-500"
                                : "fill-white text-gray-400"
                        }`}
                    />
                </button>
            </td>
        </tr>
)
}
export default Coin;