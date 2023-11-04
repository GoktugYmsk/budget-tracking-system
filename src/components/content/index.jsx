import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { jsPDF } from "jspdf";
import "jspdf-autotable";



import RenderTransactionForm from "./renderTransactionForm";
import RenderChart from "./renderChart";

import RenderTable from "./renderTable";

import "./index.scss";

function Content() {
    const [period, setPeriod] = useState("daily");


    const [newTransaction, setNewTransaction] = useState({
        date: "",
        category: "",
        amount: 0,
        type: "Income",
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


    const isTransactionFormValid = newTransaction.date && newTransaction.category && newTransaction.amount > 0 && newTransaction.type;

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
                    <RenderChart backendData={backendData} period={period} />
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
                <RenderTable backendData={backendData} period={period} />
                <RenderTransactionForm setNewTransaction={setNewTransaction} newTransaction={newTransaction} backendData={backendData} period={period} isTransactionFormValid={isTransactionFormValid} />
            </div>
        </div>
    );
}

export default Content;
