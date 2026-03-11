export type StockId = 'Gold' | 'Silver';

export interface StockPoint {
  seq: number;
  stockId: StockId;
  stockName: string;
  timestampMs: number;
  value: number;
}

export interface StocksState {
  S1: StockPoint[];
  S2: StockPoint[];
}

export interface StocksContextValue {
  stocks: StocksState;
  latest: {
    S1: StockPoint | null;
    S2: StockPoint | null;
  };
}
