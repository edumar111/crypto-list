import { URL_API, URL_COINS } from "../constants/api";
import type { CoinInterface } from "../interfaces/Coin";
export const getCryptos = async () :Promise<CoinInterface[]> => {
  const response = await fetch(`${URL_API}${URL_COINS}`);
  if (!response.ok) {
    throw new Error("Failed to fetch coins");
  }
  return response.json();
};

