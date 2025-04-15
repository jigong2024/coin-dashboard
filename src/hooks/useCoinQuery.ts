import { getCoinList } from "@/lib/api/coin";
import { useCoinStore } from "@/store/useCoinStore";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useCoinQuery = () => {
  const { coinList, setCoinList, appendCoinList } = useCoinStore();

  const query = useInfiniteQuery({
    queryKey: ["coinList"],
    queryFn: getCoinList,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    onSuccess: (data) => {
      // 모든 페이지의 코인을 하나의 배열로 합치기
      const allCoins = data.pages.flatMap((page) => page.coins);
      // Zustand 스토어 업데이트
      useCoinStore.setState({ coinList: allCoins });
    },
  });

  return {
    ...query,
    coinList: query.data || coinList,
  };
};
