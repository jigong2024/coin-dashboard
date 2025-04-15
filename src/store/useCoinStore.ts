import { getCoinList } from "@/lib/api/coin";
import { Coin } from "@/types/coin.type";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

type CoinState = {
  coinList: Coin[];
  fetchCoinList: () => Promise<void>;
};

export const useCoinStore = create<CoinState>()(
  subscribeWithSelector((set, get) => ({
    coinList: [],
    fetchCoinList: async () => {
      try {
        const coins = await getCoinList();
        set({ coinList: coins });
      } catch (error) {
        console.error("코인 리스트 불러오기 실패:", error);
        throw error;
      }
    },
  }))
);
