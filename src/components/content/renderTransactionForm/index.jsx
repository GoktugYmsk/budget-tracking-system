import React from 'react'

function RenderTransactionForm({ setNewTransaction, newTransaction,
    backendData, period, isTransactionFormValid
}) {

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

export default RenderTransactionForm;