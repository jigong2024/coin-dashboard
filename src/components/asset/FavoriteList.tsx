"use client";

import { mockAssets } from "@/mocks/mockAssets";
import { useAssetStore } from "@/store";

const FavoriteList = () => {
  const favorites = useAssetStore((state) => state.favorites);

  const favSet = new Set(favorites);
  const filteredAssets = mockAssets.filter((asset) => favSet.has(asset.symbol));

  return (
    <div>
      <h2>즐겨찾기 종목</h2>
      <div>
        {filteredAssets.length === 0 ? (
          <p>즐겨찾기한 종목이 없습니다.</p>
        ) : (
          filteredAssets.map((asset, index) => (
            <div key={asset.symbol + index} className="flex gap-2">
              <p>{asset.symbol}</p>
              <p>{asset.name}</p>
              <p>★</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FavoriteList;
