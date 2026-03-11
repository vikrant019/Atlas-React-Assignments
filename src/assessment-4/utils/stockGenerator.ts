import type { StockId, StockPoint } from '../types/stockTypes';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const randomInt = (min: number, max: number) => {
  const low = Math.ceil(min);
  const high = Math.floor(max);
  return Math.floor(Math.random() * (high - low + 1)) + low;
};

export const formatTimestamp = (timestampMs: number) => {
  const d = new Date(timestampMs);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = String(d.getFullYear());

  const time = new Intl.DateTimeFormat('en-GB', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  })
    .format(d)
    .replace(' ', '');

  return `${dd}/${mm}/${yyyy}: ${time}`;
};

export const createInitialPoint = (stockId: StockId, stockName: string, timestampMs: number): StockPoint => {
  return {
    seq: 1,
    stockId,
    stockName,
    timestampMs,
    value: randomInt(120, 240),
  };
};

export const createNextPoint = (prev: StockPoint, timestampMs: number): StockPoint => {
  const delta = randomInt(-12, 12);
  const nextValue = clamp(prev.value + delta, 50, 300);

  return {
    ...prev,
    seq: prev.seq + 1,
    timestampMs,
    value: nextValue,
  };
};
