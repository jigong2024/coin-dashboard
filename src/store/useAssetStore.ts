import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";

type Asset = {
  symbol: string;
  name: string;
  price: number;
};

type AssetStore = {
  selected: Asset | null;
  favorites: string[];
  setSelected: (asset: Asset) => void;
  toggleFavorite: (symbol: string) => void;
};

export const useAssetStore = create<AssetStore>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        selected: null,
        favorites: [],
        setSelected: (asset) => set({ selected: asset }),
        toggleFavorite: (symbol) => {
          const current = get().favorites;
          const updated = current.includes(symbol)
            ? current.filter((s) => s !== symbol)
            : [...current, symbol];
          set({ favorites: updated });
        },
      }),
      { name: "asset-storage" }
    )
  )
);
