import React, { useState } from "react";
import { CSVLink } from "react-csv";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import "./index.scss";

function Content() {
    const [period, setPeriod] = useState("daily");

    const backendData = {
        daily: [10, 20, 15, 30, 25],
        weekly: [70, 60, 80, 75, 90],
        monthly: [300, 350, 400, 380, 420],
    };

    const handleChangePeriod = (newPeriod) => {
        setPeriod(newPeriod);
    };

    const renderChart = () => {
        const chartData = backendData[period];

        const minX = 0;
        const maxX = chartData.length - 1;
        const minY = Math.min(...chartData);
        const maxY = Math.max(...chartData);

        const chartWidth = 500;
        const chartHeight = 300;
        const xScale = chartWidth / maxX;
        const yScale = chartHeight / (maxY - minY);

        const path = chartData.map((value, index) => {
            const x = index * xScale;
            const y = (maxY - value) * yScale;
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
        const csvData = backendData[period].map((value, index) => ({
            Day: `Day ${index + 1}`,
            Value: value,
        }));
        return csvData;
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [["Day", "Value"]],
            body: backendData[period].map((value, index) => [`Day ${index + 1}`, value]),
        });
        doc.save(`chart_data_${period}.pdf`);
    };


    const renderTable = () => {
        const chartData = backendData[period];
        const tableData = chartData.map((value, index) => ({
            Day: `Day ${index + 1}`,
            Value: value,
        }));

        return (
            <table>
                <thead>
                    <tr>
                        <th>Day</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((data, index) => (
                        <tr key={index}>
                            <td>{data.Day}</td>
                            <td>{data.Value}</td>
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
