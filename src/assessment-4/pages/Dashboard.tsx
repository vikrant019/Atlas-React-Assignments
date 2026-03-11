import React from 'react';
import { Link } from 'react-router-dom';
import { StockGraph } from '../components/StockGraph';
import { StockWidget } from '../components/StockWidget';
import { useStocks } from '../context/stockContext';

export const Dashboard: React.FC = () => {
  const { stocks, latest } = useStocks();

  return (
    <div className="a4-page">
      <div className="a4-header">
        <h1 className="a4-title">Dashboard</h1>
        <Link to="..">Home</Link>
      </div>

      <div className="a4-grid">
        <StockWidget title="Gold Current Rate" point={latest.S1} />
        <StockWidget title="Silver Current Rate" point={latest.S2} />
      </div>

      <div className="a4-spacer16">
        <StockGraph s1={stocks.S1} s2={stocks.S2} />
      </div>
    </div>
  );
};
