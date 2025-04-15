"use client";

import { useEffect } from "react";
import { useCoinStore } from "@/store/useCoinStore";

const CoinPage = () => {
  const { coinList, fetchCoinList } = useCoinStore();

  useEffect(() => {
    fetchCoinList();
  }, []);

  console.log("데이터 확인중 =>", coinList);

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
