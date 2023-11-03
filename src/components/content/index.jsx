import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import "./index.scss";

function Content() {
    const [period, setPeriod] = useState("daily");
    const [newIncome, setNewIncome] = useState({
        date: "",
        category: "Income",
        amount: 0,
    });

    const storedData = JSON.parse(localStorage.getItem("Budget")) || {
        daily: [],
        weekly: [],
        monthly: [],
    };

    const [backendData, setBackendData] = useState(storedData);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("Budget")) || {
            daily: [],
            weekly: [],
            monthly: [],
        };
        setBackendData(storedData);
    }, []);

    const handleChangePeriod = (newPeriod) => {
        setPeriod(newPeriod);
    };

    const handleAddIncome = () => {
        backendData[period].push(newIncome);

        if (period !== "daily") {
            backendData["daily"].push(newIncome);
        }
        if (period !== "weekly") {
            backendData["weekly"].push(newIncome);
        }
        if (period !== "monthly") {
            backendData["monthly"].push(newIncome);
        }

        setNewIncome({
            date: "",
            category: "Income",
            amount: 0,
        });

        localStorage.setItem("Budget", JSON.stringify(backendData));
    };

    const renderIncomeForm = () => {
        const isFormValid = newIncome.date && newIncome.category && newIncome.amount > 0;

        return (
            <div>
                <h2>Add Income</h2>
                <div>
                    <input
                        type="date"
                        value={newIncome.date}
                        onChange={(e) =>
                            setNewIncome({
                                ...newIncome,
                                date: e.target.value,
                            })
                        }
                    />
                </div>
                <div>
                    <select
                        value={newIncome.category}
                        onChange={(e) =>
                            setNewIncome({
                                ...newIncome,
                                category: e.target.value,
                            })
                        }
                    >
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                    </select>
                </div>
                <div>
                    <input
                        type="number"
                        value={newIncome.amount}
                        onChange={(e) =>
                            setNewIncome({
                                ...newIncome,
                                amount: parseFloat(e.target.value),
                            })
                        }
                    />
                </div>
                <div>
                    <button onClick={handleAddIncome} disabled={!isFormValid}>
                        Add Income
                    </button>
                </div>
            </div>
        );
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
                {renderIncomeForm()}
            </div>
        </div>
    );
}

export default Content;
