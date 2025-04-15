"use client";

import { useCoinQuery } from "@/hooks/useCoinQuery";
import { Coin } from "@/types/coin.type";
import { useEffect, useRef } from "react";

type CoinListProps = {
  initialData: {
    coins: Coin[];
    nextPage: number | undefined;
  };
};

const CoinList = ({ initialData }: CoinListProps) => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCoinQuery(initialData);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastCoinRef = useRef<HTMLDivElement | null>(null);

  const allCoins = data ? data.pages.flatMap((page) => page.coins) : [];

  useEffect(() => {
    console.log("모든코인 =>", allCoins);
  }, [allCoins]);

  useEffect(() => {
    if (lastCoinRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        },
        { threshold: 0.5 }
      );

      observerRef.current.observe(lastCoinRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, data?.pages.length]);
  if (isLoading) return <div>로딩 중 ...</div>;
  if (isError) return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;

  return (
    <div>
      {allCoins.map((coin, index) => (
        <div
          key={index}
          ref={index === allCoins.length - 1 ? lastCoinRef : null}
        >
          {coin.name} ({coin.symbol})
        </div>
      ))}

      {isFetchingNextPage && <div>추가 코인 로딩 중...</div>}
    </div>
  );
};

export default CoinList;
