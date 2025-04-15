export interface Coin {
  id: string;
  symbol: string;
  name: string;
  platforms: {
    [key: string]: string;
  };
}
