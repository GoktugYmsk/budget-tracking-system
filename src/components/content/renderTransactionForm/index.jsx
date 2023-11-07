import React from 'react';
import './index.scss'

const RenderTransactionForm = ({
  setNewTransaction,
  newTransaction,
  backendData,
  period,
  isTransactionFormValid
}) => {
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
      type: "Income",
    });

    localStorage.setItem("Budget", JSON.stringify(backendData));
  };

  return (
    <div className="transaction-form-container">
      <h2>Add {newTransaction.type === "Income" ? "Income" : "Expense"}</h2>
      <div className="form-input">
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
      <div className="form-input">
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
      <div className="form-input">
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
      <div className="form-input">
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
      <div className="form-input">
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

export default RenderTransactionForm;
