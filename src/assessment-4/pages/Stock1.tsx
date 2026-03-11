import React from 'react';
import { Link } from 'react-router-dom';
import { StockTable } from '../components/StockTable';
import { useStocks } from '../context/stockContext';

export const Stock1: React.FC = () => {
  const { stocks } = useStocks();

  return (
    <div className="a4-page">
      <div className="a4-header">
        <h1 className="a4-title">Gold</h1>
        <Link to="..">Home</Link>
      </div>

      <StockTable title="Gold - Real-time data" points={stocks.S1} />
    </div>
  );
};
