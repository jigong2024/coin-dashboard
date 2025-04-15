import { getCoinList } from "@/lib/api/coin";
import { useCoinStore } from "@/store/useCoinStore";
import { Coin } from "@/types/coin.type";
import { useQuery } from "@tanstack/react-query";

export const useCoinQuery = () => {
  const { coinList } = useCoinStore();

  const query = useQuery<Coin[]>({
    queryKey: ["coinList"],
    queryFn: getCoinList,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    onSuccess: (data) => {
      // 성공시 Zustand 스토어 업데이트
      useCoinStore.setState({ coinList: data });
    },
  });

  return {
    ...query,
    coinList: query.data || coinList,
  };
};
