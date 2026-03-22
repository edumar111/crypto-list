import { URL_API, URL_COINS } from "../constants/api";
import type { CoinInterface } from "../interfaces/Coin";
export const getCryptos = async () :Promise<CoinInterface[]> => {
  const response = await fetch(`${URL_API}${URL_COINS}`);
  if (!response.ok) {
    throw new Error("Failed to fetch coins");
  }
  return response.json();
};

export const getCoin = async (id: string): Promise<CoinInterface> => {
  const response = await fetch(`${URL_API}${URL_COINS}&ids=${encodeURIComponent(id)}`);
  if (!response.ok) {
    throw new Error("No se pudo cargar la moneda");
  }

  const data: CoinInterface[] = await response.json();
  const coin = data[0];

  if (!coin) {
    throw new Error("No se encontro informacion para esta moneda");
  }

  return coin;
};

