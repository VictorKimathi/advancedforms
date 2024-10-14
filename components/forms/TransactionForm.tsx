import React, { useState } from "react";
import "./styles.css";

function App() {
    const [transactionType, setTransactionType] = useState("income"); // Default to 'income'
    const [paymentMethod, setPaymentMethod] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState(""); // Ensure this is not empty
    const [transactionDetails, setTransactionDetails] = useState(null);
    const [transactionId, setTransactionId] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate amount
        if (!amount || isNaN(amount) || amount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        const data = {
            amount: parseFloat(amount),
            transaction_type: transactionType, // This should have a valid value
            payment_method: paymentMethod,
            category: category || "other", // Default to 'other' if empty
        };

        console.log("Submitting transaction with the following data:", JSON.stringify(data));

        try {
            const response = await fetch("http://localhost:8000/api/transactions/", {
                method: "POST",
                headers: {
                    "Authorization": "Token 2b813dfedde303e59b23667584b792f2d2767248",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            // Log the response status and body
            console.log("Response Status:", response.status);
            const responseBody = await response.text();
            console.log("Response Body:", responseBody);

            if (!response.ok) {
                try {
                    const errorResponse = JSON.parse(responseBody);
                    console.error("Error Response Data:", errorResponse);
                } catch (jsonError) {
                    console.error("Failed to parse error response:", jsonError);
                }
                throw new Error("Something went wrong with the request");
            }

            const result = await response.json();
            console.log("Transaction created successfully:", result);
            handleReset();
        } catch (error) {
            console.error("Error submitting transaction:", error);
        }
    };

    const handleReset = () => {
        setTransactionType("income"); // Reset to default value
        setPaymentMethod("");
        setAmount("");
        setCategory(""); // Reset to empty
    };

    const handleFetchTransaction = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/transactions/${transactionId}/`, {
                method: "GET",
                headers: {
                    "Authorization": "Token 2b813dfedde303e59b23667584b792f2d2767248",
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch transaction details");
            }

            const data = await response.json();
            console.log("Fetched transaction details:", data);
            setTransactionDetails(data); // Update state with fetched details
        } catch (error) {
            console.error("Error fetching transaction details:", error);
        }
    };

    return (
        <div className="App">
            <div className="form-container">
                <h1>Transaction Form</h1>
                <fieldset>
                    <form onSubmit={handleSubmit}>

                        <label htmlFor="category">Category</label>
                        <input
                            type="text"
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder="Enter Category"
                        />

                        <label htmlFor="paymentMethod">Payment Method*</label>
                        <input
                            type="text"
                            id="paymentMethod"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            placeholder="Enter Payment Method"
                            required
                        />

                        <label htmlFor="transaction_type">Transaction Type*</label>
                        <select
                            id="transaction_type"
                            value={transactionType}
                            onChange={(e) => setTransactionType(e.target.value)}
                            required
                        >
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>

                        <label htmlFor="amount">Amount*</label>
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter Amount"
                            required
                        />

                        <button type="button" onClick={handleReset}>
                            Reset
                        </button>
                        <button type="submit">
                            Submit
                        </button>
                    </form>
                </fieldset>

                <fieldset>
                    <h2>Fetch Transaction Details</h2>
                    <input
                        type="number"
                        placeholder="Enter Transaction ID"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                    />
                    <button onClick={handleFetchTransaction}>
                        Fetch
                    </button>

                    {transactionDetails && (
                        <div>
                            <h3>Transaction Details:</h3>
                            <pre>{JSON.stringify(transactionDetails, null, 2)}</pre>
                            <div className="transaction-table text-gray-950">
                                <h3>Transaction Details</h3>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>User</th>
                                        <th>Amount</th>
                                        <th>Transaction Type</th>
                                        <th>Payment Method</th>
                                        <th>Category</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>{transactionDetails.id}</td>
                                        <td>{transactionDetails.user}</td>
                                        <td>{transactionDetails.amount}</td>
                                        <td>{transactionDetails.transaction_type}</td>
                                        <td>{transactionDetails.payment_method}</td>
                                        <td>{transactionDetails.category}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </fieldset>
            </div>
        </div>
    );
}

export default App;
