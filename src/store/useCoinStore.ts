import { Coin } from "@/types/coin.type";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

type CoinState = {
  coinList: Coin[];
};

export const useCoinStore = create<CoinState>()(
  subscribeWithSelector((set, get) => ({
    coinList: [],
  }))
);
