import React from 'react';
import type { StockPoint } from '../types/stockTypes';

type Props = {
  title: string;
  point: StockPoint | null;
};

export const StockWidget: React.FC<Props> = ({ title, point }) => {
  return (
    <div className="a4-card">
      <div className="a4-widgetTitle">{title}</div>
      <div className="a4-widgetValue">{point ? point.value : '—'} Rs</div>
    </div>
  );
};
