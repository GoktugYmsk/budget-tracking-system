import React, { useState } from "react";
import { CSVLink } from "react-csv";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import "./index.scss";

function Content() {
    const [period, setPeriod] = useState("daily");

    const backendData = {
        daily: [
            { date: "2023-11-01", category: "Income", amount: 10 },
            { date: "2023-11-02", category: "Expense", amount: 20 },
            { date: "2023-11-03", category: "Income", amount: 15 },
            { date: "2023-11-04", category: "Expense", amount: 30 },
            { date: "2023-11-05", category: "Income", amount: 25 },
        ],
        weekly: [
            { date: "2023-11-01", category: "Income", amount: 10 },
            { date: "2023-11-02", category: "Expense", amount: 40 },
            { date: "2023-11-03", category: "Income", amount: 33 },
            { date: "2023-11-04", category: "Expense", amount: 80 },
            { date: "2023-11-05", category: "Income", amount: 12 },
        ],
        monthly: [
            { date: "2023-11-01", category: "Income", amount: 20 },
            { date: "2023-11-02", category: "Expense", amount: 123 },
            { date: "2023-11-03", category: "Income", amount: 200 },
            { date: "2023-11-04", category: "Expense", amount: 41 },
            { date: "2023-11-05", category: "Income", amount: 112 },
        ],
    };

    const handleChangePeriod = (newPeriod) => {
        setPeriod(newPeriod);
    };

    const renderChart = () => {
        const chartData = backendData[period];
        const maxX = chartData.length - 1;
        const minY = 0;
        const maxY = Math.max(...chartData.map((data) => data.amount));

        const chartWidth = 500;
        const chartHeight = 300;
        const xScale = chartWidth / maxX;
        const yScale = chartHeight / maxY;

        const path = chartData.map((data, index) => {
            const x = index * xScale;
            const y = chartHeight - data.amount * yScale;
            return `${x},${y}`;
        });

        return (
            <svg width={chartWidth} height={chartHeight}>
                <polyline
                    fill="none"
                    stroke="blue"
                    strokeWidth="2"
                    points={path.join(" ")}
                />
            </svg>
        );
    };

    const exportToCSV = () => {
        const csvData = backendData[period].map((data, index) => ({
            Date: data.date,
            Category: data.category,
            Amount: data.amount,
        }));
        return csvData;
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [["Date", "Category", "Amount"]],
            body: backendData[period].map((data, index) => [
                data.date,
                data.category,
                data.amount,
            ]),
        });
        doc.save(`chart_data_${period}.pdf`);
    };

    const renderTable = () => {
        const chartData = backendData[period];
        return (
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {chartData.map((data, index) => (
                        <tr key={index}>
                            <td>{data.date}</td>
                            <td>{data.category}</td>
                            <td>{data.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <div className="container-content">
            <div className="container-content__category">Category</div>
            <div className="container-content__category__time">
                <h1>Income and Expense Chart</h1>
                <div>
                    <button onClick={() => handleChangePeriod("daily")}>Daily</button>
                    <button onClick={() => handleChangePeriod("weekly")}>Weekly</button>
                    <button onClick={() => handleChangePeriod("monthly")}>Monthly</button>
                </div>
                <div className="chart-container">
                    {renderChart()}
                    <div>
                        <CSVLink
                            data={exportToCSV()}
                            filename={`chart_data_${period}.csv`}
                        >
                            Export to CSV
                        </CSVLink>
                        <button onClick={exportToPDF}>Export to PDF</button>
                    </div>
                </div>
                {renderTable()}
            </div>
        </div>
    );
}

export default Content;
