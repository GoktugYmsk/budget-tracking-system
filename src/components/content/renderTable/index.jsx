import React from 'react'

function RenderTable({ backendData, period }) {
    const chartData = backendData[period];
    return (
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Type</th>
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
    );
};

export default RenderTable;