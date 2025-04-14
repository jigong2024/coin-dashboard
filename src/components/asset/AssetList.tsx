import { mockAssets } from "@/mocks/mockAssets";
import { useAssetStore } from "@/store";

const AssetList = () => {
  const favorites = useAssetStore((state) => state.favorites);
  const toggleFavorite = useAssetStore((state) => state.toggleFavorite);

  const favSet = new Set(favorites);

  return (
    <div className="border border-black rounded">
      {mockAssets.map((asset, index) => {
        const isFav = favSet.has(asset.symbol);

        return (
          <div key={asset.symbol + index} className="flex gap-2">
            <p>{asset.symbol}</p>
            <p>{asset.name}</p>
            <button onClick={() => toggleFavorite(asset.symbol)}>
              {isFav ? "★" : "☆"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default AssetList;
