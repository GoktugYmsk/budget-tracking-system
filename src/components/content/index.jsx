import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { setExpenses } from "../../configure";

function Content() {
  const [period, setPeriod] = useState("daily");

  //for filter
  const [categoryFilterValue , setCategoryFilterValue] = useState('')
  const [selectedDate , setSelectedDate] = useState('')

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

  const expenses = useSelector((state) => state.inputValue.expenses);
  const dispatch = useDispatch();

  const handleChangePeriod = (newPeriod) => {
    setPeriod(newPeriod);
  };

  //-----------
  useEffect(() => {
    const localExpenses = JSON.parse(localStorage.getItem("Budget"));
    const dailyExpenses = localExpenses.daily;
    dispatch(setExpenses(dailyExpenses));
  }, []);

  const handleAddTransaction = () => {
    backendData[period].push(newTransaction);

    dispatch(setExpenses([...expenses, newTransaction]));

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
      type: "Income",
    });

    localStorage.setItem("Budget", JSON.stringify(backendData));
  };

  const isTransactionFormValid =
    newTransaction.date &&
    newTransaction.category &&
    newTransaction.amount > 0 &&
    newTransaction.type;

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
          {/* <input
                  type="text"
                  placeholder="Category"
                  value={newTransaction.category}
                  onChange={(e) =>
                      setNewTransaction({
                          ...newTransaction,
                          category: e.target.value,
                      })
                  }
              /> */}
          <label>Category</label>
          <select
            onChange={(e) =>
              setNewTransaction({
                ...newTransaction,
                category: e.target.value,
              })
            }
          >
            <option value={"Shopping"}>Shopping</option>
            <option value={"Digital memberships"}>Digital memberships</option>
            <option value={"Paying bills"}>Paying bills</option>
          </select>
        </div>
        <div>
          <input
            placeholder="Amount"
            value={newTransaction.amount}
            onChange={(e) =>
              setNewTransaction({
                ...newTransaction,
                amount: e.target.value ? parseFloat(e.target.value) : 0,
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
          <button
            onClick={handleAddTransaction}
            disabled={!isTransactionFormValid}
          >
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


    //filter
    const filteredData = chartData && chartData.filter((data) => {
      if (categoryFilterValue === "") {
        return data;
      } else {
        return data.category.toLowerCase().includes(categoryFilterValue);
      }
    });

    const dateFiltered = filteredData && filteredData.filter((data) => {
      if (selectedDate === "") {
        return data;
      } else {
        return data.date === selectedDate
      }
    });
    return (
      <>

      <div>
        <label>Date filter</label>
        <input type="date" value={selectedDate} onChange={(e)=> setSelectedDate(e.target.value)} />
        <button onClick={()=>setSelectedDate("")}>Remove date filter</button>
      </div>

        <div>
          <label>Category filter   </label>
          <select onChange={(e)=> setCategoryFilterValue(e.target.value)}  >
            <option value={""}>All Categories</option>
            <option value={"shopping"}>Shopping</option>
            <option value={"digital memberships"}>Digital memberships</option>
            <option value={"paying bills"}>Paying bills</option>
          </select>
        </div>

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
            {dateFiltered.map((data, index) => (
              <tr key={index}>
                <td>{data.date}</td>
                <td>{data.category}</td>
                <td>{data.amount}</td>
                <td>{data.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
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
            <CSVLink data={exportToCSV()} filename={`chart_data_${period}.csv`}>
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
