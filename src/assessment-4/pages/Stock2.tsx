import React from 'react';
import { Link } from 'react-router-dom';
import { StockTable } from '../components/StockTable';
import { useStocks } from '../context/stockContext';

export const Stock2: React.FC = () => {
  const { stocks } = useStocks();

  return (
    <div className="a4-page">
      <div className="a4-header">
        <h1 className="a4-title">Silver</h1>
        <Link to="..">Home</Link>
      </div>

      <StockTable title="Silver - Real-time data" points={stocks.S2} />
    </div>
  );
};
