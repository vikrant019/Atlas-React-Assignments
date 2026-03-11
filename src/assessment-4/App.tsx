import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { assessment4Routes } from './routes';
import { StockProvider } from './context/stockContext';
import './assessment4.css';

const Assessment4App: React.FC = () => {
  return (
    <StockProvider>
      <Routes>
        {assessment4Routes.map((r, idx) => {
          if (r.index) {
            return <Route key={`a4-index-${idx}`} index element={r.element} />;
          }
          return <Route key={`a4-${String(r.path)}-${idx}`} path={r.path} element={r.element} />;
        })}
        <Route path="*" element={<Navigate to="." replace />} />
      </Routes>
    </StockProvider>
  );
};

export default Assessment4App;
