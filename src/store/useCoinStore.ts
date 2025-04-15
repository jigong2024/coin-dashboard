import { Coin } from "@/types/coin.type";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

type CoinState = {
  coinList: Coin[];
  setCoinList: (coins: Coin[]) => void;
  appendCoinList: (coins: Coin[]) => void;
};

export const useCoinStore = create<CoinState>()(
  subscribeWithSelector((set, get) => ({
    coinList: [],
    setCoinList: (coins) => set({ coinList: coins }),
    appendCoinList: (coins) =>
      set((state) => ({
        coinList: [...state.coinList, ...coins],
      })),
  }))
);
