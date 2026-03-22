import { useQuery } from "@tanstack/react-query"
import { getCryptos } from "../services/coin.service"
import { RESFESH_INTERVAL } from "../constants/api"

export const useCoins= () => {
    return useQuery({
        queryKey: ["cryptos"],
        queryFn: getCryptos,
        refetchOnWindowFocus: false,
        refetchInterval: RESFESH_INTERVAL, // Refrescar cada 60 segundos
        staleTime: RESFESH_INTERVAL, // Considerar los datos frescos durante 60 segundos
    
      })
}