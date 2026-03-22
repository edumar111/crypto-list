import { useQuery, useQueryClient } from "@tanstack/react-query"
import { RESFESH_INTERVAL } from "../constants/api"
import type { CoinInterface } from "../interfaces/Coin"
import { getCoin } from "../services/coin.service"

export { useCoins } from "./useCoins"

export const useCoin = (id?: string) => {
    const queryClient = useQueryClient()
    const cachedCoin = id
        ? queryClient.getQueryData<CoinInterface[]>(["cryptos"])?.find(coin => coin.id === id)
        : undefined
    const cachedCoinUpdatedAt = cachedCoin
        ? queryClient.getQueryState(["cryptos"])?.dataUpdatedAt
        : undefined

    return useQuery<CoinInterface, Error>({
        queryKey: ["coin", id],
        queryFn: () => getCoin(id ?? ""),
        enabled: Boolean(id),
        refetchOnWindowFocus: false,
        refetchInterval: RESFESH_INTERVAL,
        staleTime: RESFESH_INTERVAL,
        initialData: cachedCoin,
        initialDataUpdatedAt: cachedCoinUpdatedAt,
    })
}