import { getCoinList } from "@/lib/api/coin";
import CoinList from "./_components/CoinList";

const CoinPage = async () => {
  const initialData = await getCoinList({ pageParam: 1 });
  return (
    <div>
      <h1>코인 목록</h1>
      <CoinList initialData={initialData} />
    </div>
  );
};

export default CoinPage;
