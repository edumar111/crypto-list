export const URL_API = import.meta.env.VITE_API_URL;
export const API_KEY = import.meta.env.VITE_API_KEY;
export const URL_COINS = `coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&x_cg_demo_api_key=${API_KEY}`;