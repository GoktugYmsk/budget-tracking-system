import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import "./index.scss";

function Content() {
    const [period, setPeriod] = useState("daily");
    const [newTransaction, setNewTransaction] = useState({
        date: "",
        category: "",
        amount: 0,
        type: "Income", // Default to "Income"
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

    const handleAddTransaction = () => {
        backendData[period].push(newTransaction);

        if (period !== "daily") {
            backendData["daily"].push(newTransaction);
        }
        if (period !== "weekly") {
            backendData["weekly"].push(newTransaction);
        }
        if (period !== "monthly") {
            backendData["monthly"].push(newTransaction);
        }

        setNewTransaction({
            date: "",
            category: "",
            amount: 0,
            type: "Income", // Default to "Income"
        });

        localStorage.setItem("Budget", JSON.stringify(backendData));
    };

    const isTransactionFormValid = newTransaction.date && newTransaction.category && newTransaction.amount > 0 && newTransaction.type;

    const renderTransactionForm = () => {
        return (
            <div>
                <h2>Add {newTransaction.type === "Income" ? "Income" : "Expense"}</h2>
                <div>
                    <input
                        type="date"
                        value={newTransaction.date}
                        onChange={(e) =>
                            setNewTransaction({
                                ...newTransaction,
                                date: e.target.value,
                            })
                        }
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Category"
                        value={newTransaction.category}
                        onChange={(e) =>
                            setNewTransaction({
                                ...newTransaction,
                                category: e.target.value,
                            })
                        }
                    />
                </div>
                <div>
                    <input
                        placeholder="Amount"
                        value={newTransaction.amount}
                        onChange={(e) =>
                            setNewTransaction({
                                ...newTransaction,
                                amount: parseFloat(e.target.value),
                            })
                        }
                    />
                </div>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="transactionType"
                            value="Income"
                            checked={newTransaction.type === "Income"}
                            onChange={(e) =>
                                setNewTransaction({
                                    ...newTransaction,
                                    type: e.target.value,
                                })
                            }
                        />
                        Income
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="transactionType"
                            value="Expense"
                            checked={newTransaction.type === "Expense"}
                            onChange={(e) =>
                                setNewTransaction({
                                    ...newTransaction,
                                    type: e.target.value,
                                })
                            }
                        />
                        Expense
                    </label>
                </div>
                <div>
                    <button onClick={handleAddTransaction} disabled={!isTransactionFormValid}>
                        Add {newTransaction.type === "Income" ? "Income" : "Expense"}
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
            Type: data.type,
        }));
        return csvData;
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [["Date", "Category", "Amount", "Type"]],
            body: backendData[period].map((data, index) => [
                data.date,
                data.category,
                data.amount,
                data.type,
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
                {renderTransactionForm()}
            </div>
        </div>
    );
}

export default Content;
