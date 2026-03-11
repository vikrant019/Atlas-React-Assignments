import React from 'react';
import type { StockPoint } from '../types/stockTypes';
import { formatTimestamp } from '../utils/stockGenerator';

type Props = {
  title: string;
  points: StockPoint[];
};

export const StockTable: React.FC<Props> = ({ title, points }) => {
  let min: number | null = null;
  let max: number | null = null;
  for (const p of points) {
    if (min === null || p.value < min) min = p.value;
    if (max === null || p.value > max) max = p.value;
  }

  return (
    <div>
      <h2 className="a4-h2">{title}</h2>
      <div className="a4-row">
        <div>
          <div className="a4-muted">Minimum value</div>
          <div className="a4-widgetTitle">{min ?? '—'}</div>
        </div>
        <div>
          <div className="a4-muted">Maximum value</div>
          <div className="a4-widgetTitle">{max ?? '—'}</div>
        </div>
      </div>

      <div className="a4-tableWrap">
        <table className="a4-table">
          <thead>
            <tr>
              <th className="a4-th">Stock Sequence</th>
              <th className="a4-th">Stock Name</th>
              <th className="a4-th">Timestamp</th>
              <th className="a4-th">Stock Value</th>
            </tr>
          </thead>
          <tbody>
            {points
              .slice()
              .reverse()
              .map((p) => (
                <tr key={`${p.stockId}-${p.seq}`}>
                  <td className="a4-td">{p.seq}</td>
                  <td className="a4-td">{p.stockName}</td>
                  <td className="a4-td">{formatTimestamp(p.timestampMs)}</td>
                  <td className="a4-td">{p.value}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
