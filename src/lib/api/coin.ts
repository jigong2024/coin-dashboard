import { Coin } from "@/types/coin.type";
import axios from "axios";

const BaseUrl = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
});

export const getCoinList = async ({ pageParam = 1 }) => {
  const perPage = 50; // 한페이지당 코인 개수(CoinGecko 최대 250)

  try {
    const response = await BaseUrl.get<Coin[]>("/coins/markets", {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: perPage,
        page: pageParam,
        sparkline: false,
      },
    });
    console.log("데이터 =>", response.data.length);
    return {
      coins: response.data,
      nextPage: response.data.length === perPage ? pageParam + 1 : undefined,
    };
  } catch (error) {
    console.error("코인 데이터 요청 오류:", error);
    throw error;
  }
};
