import React from 'react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <div className="a4-page">
      <h1 className="a4-title a4-titleCenter">Stocks</h1>
      <p>Choose a page:</p>

      <div className="a4-grid">
        <Link to="dashboard" className="a4-tile">
          <div className="a4-tileTitle">Dashboard</div>
          <div className="a4-muted">Stocks and graph</div>
        </Link>
        <Link to="stock1" className="a4-tile">
          <div className="a4-tileTitle">Gold</div>
          <div className="a4-muted">Stock values</div>
        </Link>
        <Link to="stock2" className="a4-tile">
          <div className="a4-tileTitle">Silver</div>
          <div className="a4-muted">Stock values</div>
        </Link>
        <Link to="datagrid" className="a4-tile">
          <div className="a4-tileTitle">Datagrid</div>
          <div className="a4-muted">Stock datagrid</div>
        </Link>
      </div>
    </div>
  );
};
