import React from 'react';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { StockPoint } from '../types/stockTypes';
import { formatTimestamp } from '../utils/stockGenerator';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

type Props = {
  s1: StockPoint[];
  s2: StockPoint[];
};

export const StockGraph: React.FC<Props> = ({ s1, s2 }) => {
  const mergedTimes = Array.from(new Set([...s1.map((p) => p.timestampMs), ...s2.map((p) => p.timestampMs)])).sort(
    (a, b) => a - b
  );

  const labels = mergedTimes.map((t) => formatTimestamp(t));

  const byTime = <T extends StockPoint>(arr: T[]) => new Map(arr.map((p) => [p.timestampMs, p.value] as const));
  const s1Map = byTime(s1);
  const s2Map = byTime(s2);

  const data = {
    labels,
    datasets: [
      {
        label: 'Gold',
        data: mergedTimes.map((t) => s1Map.get(t) ?? null),
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        spanGaps: true,
      },
      {
        label: 'Silver',
        data: mergedTimes.map((t) => s2Map.get(t) ?? null),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        spanGaps: true,
      },
    ],
  };

  return (
    <div className="a4-card">
      <div className="a4-graphTitle">Stock trends</div>
      <Line
        data={data}
        options={{
          responsive: true,
          animation: false,
          plugins: { legend: { position: 'top' } },
          scales: {
            y: { beginAtZero: false },
          },
        }}
      />
    </div>
  );
};
