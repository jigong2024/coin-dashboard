"use client";

import { useCoinQuery } from "@/hooks/useCoinQuery";

const CoinPage = () => {
  const { coinList, isLoading, isError } = useCoinQuery();

  console.log("데이터 확인중 =>", coinList);

  if (isLoading) return null;
  if (isError) return null;

  return (
    <div className="p-4 w-full">
      <h2 className="text-xl font-bold mb-2">코인 리스트</h2>
      <ul>
        {coinList.map((coin) => (
          <li key={coin.id}>
            {coin.name} ({coin.symbol})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoinPage;
