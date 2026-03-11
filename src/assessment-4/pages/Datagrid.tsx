import React from 'react';
import { Link } from 'react-router-dom';
import { AllCommunityModule, ModuleRegistry, type ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { useStocks } from '../context/stockContext';
import { formatTimestamp } from '../utils/stockGenerator';

ModuleRegistry.registerModules([AllCommunityModule]);

type Row = {
  id: string;
  stock: string;
  timestampMs: number;
  value: number;
};

const columnDefs: Array<ColDef<Row>> = [
  { headerName: 'Stock', field: 'stock', sortable: true, filter: true, width: 110 },
  {
    headerName: 'Timestamp',
    field: 'timestampMs',
    sortable: true,
    filter: true,
    flex: 1,
    valueFormatter: (p) => (typeof p.value === 'number' ? formatTimestamp(p.value) : ''),
  },
  { headerName: 'Value', field: 'value', sortable: true, filter: true, width: 120 },
];

const defaultColDef: ColDef<Row> = {
  sortable: true,
  filter: true,
  resizable: true,
};

export const Datagrid: React.FC = () => {
  const { stocks } = useStocks();

  const rows: Row[] = [...stocks.S1, ...stocks.S2]
    .map((p) => ({
      id: `${p.stockId}-${p.seq}`,
      stock: p.stockId,
      timestampMs: p.timestampMs,
      value: p.value,
    }))
    .sort((a, b) => b.timestampMs - a.timestampMs);

  return (
    <div className="a4-page">
      <div className="a4-header">
        <h1 className="a4-title">Datagrid</h1>
        <Link to="..">Home</Link>
      </div>

      <div className="ag-theme-quartz a4-gridHost">
        <AgGridReact<Row>
          rowData={rows}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          getRowId={(p) => p.data.id}
          animateRows={false}
        />
      </div>
    </div>
  );
};
