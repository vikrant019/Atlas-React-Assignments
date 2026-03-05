import React from "react";
import type { MouseEventHandler } from "react";

interface IProps {
  emp: IEmp;
  handleEdit: MouseEventHandler;
  handleRemove: MouseEventHandler;
  isEdit?: boolean;
}

export const Row: React.FC<IProps> = ({ emp, handleEdit, handleRemove }) => {
  return (
    <tr style={{ border: "1px solid black" }}>
      <td style={{ border: "1px solid black" }}>{emp.fname}</td>
      <td style={{ border: "1px solid black" }}>{emp.lname}</td>
      <td style={{ border: "1px solid black" }}>
        <button onClick={handleRemove}>X </button>
      </td>
      <td style={{ border: "1px solid black" }}>
        <button onClick={handleEdit}>Edit </button>
      </td>
    </tr>
  );
};
