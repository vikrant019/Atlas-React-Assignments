import React, { createContext, useContext, useEffect, useState } from 'react';
import type { StocksContextValue, StocksState } from '../types/stockTypes';
import { createInitialPoint, createNextPoint } from '../utils/stockGenerator';

const STOCKS_POLL_MS = 2000; // Time interval for generating new stock price
const MAX_POINTS_PER_STOCK = 20; // Maximum number of prices to keep per stock
const StocksContext = createContext<StocksContextValue | null>(null);

export const StockProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [stocks, setStocks] = useState<StocksState>(() => {
    const now = Date.now();
    return {
      S1: [createInitialPoint('Gold', 'Stock1', now)],
      S2: [createInitialPoint('Silver', 'Stock2', now)],
    };
  });

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      const tickTime = Date.now();

      setStocks((prev) => {
        const prevS1 = prev.S1[prev.S1.length - 1];
        const prevS2 = prev.S2[prev.S2.length - 1];
        const nextS1 = prevS1 ? createNextPoint(prevS1, tickTime) : createInitialPoint('Gold', 'Stock1', tickTime);
        const nextS2 = prevS2 ? createNextPoint(prevS2, tickTime) : createInitialPoint('Silver', 'Stock2', tickTime);

        const S1 = [...prev.S1, nextS1].slice(-MAX_POINTS_PER_STOCK);
        const S2 = [...prev.S2, nextS2].slice(-MAX_POINTS_PER_STOCK);

        return { S1, S2 };
      });
    }, STOCKS_POLL_MS);

    return () => window.clearInterval(intervalId);
  }, []);

  const value: StocksContextValue = {
    stocks,
    latest: {
      S1: stocks.S1[stocks.S1.length - 1] ?? null,
      S2: stocks.S2[stocks.S2.length - 1] ?? null,
    },
  };

  return React.createElement(StocksContext.Provider, { value }, children);
};

export const useStocks = (): StocksContextValue => {
  const ctx = useContext(StocksContext);
  if (!ctx) {
    throw new Error('useStocks must be used within StockProvider');
  }
  return ctx;
};
