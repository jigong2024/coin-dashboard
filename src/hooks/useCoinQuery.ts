import { getCoinList } from "@/lib/api/coin";
import { useCoinStore } from "@/store/useCoinStore";
import { Coin } from "@/types/coin.type";
import { useInfiniteQuery } from "@tanstack/react-query";

type CoinData = {
  coins: Coin[];
  nextPage: number | undefined;
};

export const useCoinQuery = (initialData?: CoinData) => {
  const { coinList, setCoinList, appendCoinList } = useCoinStore();

  const query = useInfiniteQuery({
    queryKey: ["coinList"],
    queryFn: ({ pageParam = 1 }) => getCoinList({ pageParam }),
    getNextPageParam: (lastPage) => {
      if (lastPage.nextPage && lastPage.nextPage <= 6) {
        return lastPage.nextPage;
      }
      return undefined;
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    ...(initialData
      ? {
          initialData: {
            pages: [initialData],
            pageParams: [1],
          },
        }
      : {}),
    onSuccess: (data) => {
      // 모든 페이지의 코인을 하나의 배열로 합치기
      const allCoins = data.pages.flatMap((page) => page.coins);
      // Zustand 스토어 업데이트
      useCoinStore.setState({ coinList: allCoins });
    },
  });

  return {
    ...query,
    coinList:
      coinList.length > 0
        ? coinList
        : query.data?.pages.flatMap((page) => page.coins) || [],
  };
};
