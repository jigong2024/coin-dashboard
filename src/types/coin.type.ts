export interface Coin {
  id: string; // 코인 고유 ID (예: "bitcoin")
  symbol: string; // 코인 심볼 (예: "btc")
  name: string; // 코인 이름 (예: "Bitcoin")
  image: string; // 코인 이미지 URL
  current_price: number; // 현재 가격
  market_cap: number; // 시가총액
  market_cap_rank: number; // 시가총액 순위
  fully_diluted_valuation: number | null; // 완전 희석 가치
  total_volume: number; // 24시간 거래량
  high_24h: number; // 24시간 최고가
  low_24h: number; // 24시간 최저가
  price_change_24h: number; // 24시간 가격 변동
  price_change_percentage_24h: number; // 24시간 가격 변동률 (%)
  market_cap_change_24h: number; // 24시간 시가총액 변동
  market_cap_change_percentage_24h: number; // 24시간 시가총액 변동률
  circulating_supply: number; // 유통 공급량
  total_supply: number | null; // 총 공급량
  max_supply: number | null; // 최대 공급량
  ath: number; // 역대 최고가
  ath_change_percentage: number; // 역대 최고가 대비 변동률
  ath_date: string; // 역대 최고가 날짜
  atl: number; // 역대 최저가
  atl_change_percentage: number; // 역대 최저가 대비 변동률
  atl_date: string; // 역대 최저가 날짜
  roi: null | object; // ROI 정보
  last_updated: string; // 마지막 업데이트 시간
}
