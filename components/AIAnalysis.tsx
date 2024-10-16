"use client";
import React, { useEffect, useState } from 'react';

const Transactions = () => {
    const [totalDebt, setTotalDebt] = useState(null);
    const [allTransactions, setAllTransactions] = useState([]); // State for all transactions
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch total debt and all transactions
    useEffect(() => {
        const fetchTotalDebt = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/total-debt/`, {
                    method: "GET",
                    headers: {
                        "Authorization": "Token dee6d4ab110568b3feae114768f6e12c97a4ade0",
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch total debt");
                }

                const data = await response.json();
                console.log("Total debt:", data);
                setTotalDebt(data);
            } catch (err) {
                setError(err.message);
            }
        };

        const fetchAllTransactions = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/transactions/`, {
                    method: "GET",
                    headers: {
                        "Authorization": "Token dee6d4ab110568b3feae114768f6e12c97a4ade0",
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch transactions");
                }

                const data = await response.json();
                console.log("Total transactions :", data);
                setAllTransactions(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchTotalDebt();
        fetchAllTransactions();
    }, []);

    // Loading and error handling
    if (loading) {
        return <p className="text-center text-blue-500">Loading transactions...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            {/* Total Debt Card */}
            <div className="bg-blue-50 p-6 rounded-lg shadow-lg mb-6">
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">Total Debt</h2>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <p className="text-lg font-medium text-gray-700">
                        <span className="font-semibold">Total Amount:</span> ${totalDebt?.total_debt}
                    </p>
                </div>
            </div>

            {/* All Transactions List */}
            <h1 className="text-2xl font-semibold text-blue-800 mb-4">All Transactions</h1>
            <div>
                {allTransactions.map((tran) => (
                    <div key={tran.id} className="bg-white rounded-lg shadow p-6 mb-4">
                        <h2 className="text-xl font-semibold text-blue-700 mb-2">{tran.title}</h2>
                        <p className="text-lg text-blue-600 mb-2">
                            <span className="font-medium">Amount:</span> ${tran.amount}
                        </p>
                        <p className="text-lg text-blue-600 mb-2">
                            <span className="font-medium">Transaction Type:</span> {tran.transaction_type}
                        </p>
                        <p className="text-lg text-blue-600 mb-2">
                            <span className="font-medium">Payment Method:</span> {tran.payment_method}
                        </p>
                        <p className="text-lg text-blue-600 mb-2">
                            <span className="font-medium">Category:</span> {tran.category}
                        </p>
                        <p className="text-lg text-blue-600 mb-2">
                            <span className="font-medium">Date:</span> {new Date(tran.date).toLocaleDateString()}
                        </p>
                        <p className="text-lg text-blue-600">
                            <span className="font-medium">Description:</span> {tran.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Transactions;
