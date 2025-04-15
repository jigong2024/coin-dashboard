import { Coin } from "@/types/coin.type";
import axios from "axios";

const BaseUrl = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
});

export const getCoinList = async (): Promise<Coin[]> => {
  try {
    const response = await BaseUrl.get<Coin[]>("/coins/list");
    console.log("데이터 =>", response.data);
    return response.data;
  } catch (error) {
    console.error("get 요청 오류:", error);
    throw error;
  }
};
