import React from 'react';
import './RenderTable.css'; 
function RenderTable({ backendData, period }) {
  const chartData = backendData[period];

 
  const tableHeaders = ["Date", "Category", "Amount", "Type"];

  return (
    <div className="table-container">
      <h2>{period.charAt(0).toUpperCase() + period.slice(1)} Transactions</h2>
      <table>
        <thead>
          <tr>
            {tableHeaders.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {chartData.map((data, index) => (
            <tr key={index}>
              <td>{data.date}</td>
              <td>{data.category}</td>
              <td>{data.amount}</td>
              <td>{data.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RenderTable;
