import { getCoinList } from "@/lib/api/coin";
import { useCoinStore } from "@/store/useCoinStore";
import { Coin } from "@/types/coin.type";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useThrottledRequest } from "./useThrottledRequest";
type CoinData = {
  coins: Coin[];
  nextPage: number | undefined;
};

export const useCoinQuery = (initialData?: CoinData) => {
  const { coinList } = useCoinStore();
  const { throttledRequest } = useThrottledRequest();

  const query = useInfiniteQuery({
    queryKey: ["coinList"],
    queryFn: ({ pageParam = 1 }) => throttledRequest(getCoinList, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      // 1. 현재 페이지 수 확인 (더 명확한 방법)
      if (allPages.length >= 6) {
        return undefined; // 6페이지 이상이면 더 이상 로드하지 않음
      }

      // 2. 다음 페이지가 있고 6페이지 이하인 경우에만 다음 페이지 번호 반환
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
