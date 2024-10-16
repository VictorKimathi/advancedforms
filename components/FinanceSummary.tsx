"use client"
import React, { useEffect, useState } from 'react';

const Transactions = ({ transactionId }) => {
    const [transaction, setTransaction] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/transactions/${transactionId}/`, {
                    method: "GET",
                    headers: {
                        "Authorization": "Token dee6d4ab110568b3feae114768f6e12c97a4ade0",
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch transaction details");
                }

                const data = await response.json();
                setTransaction(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchTransaction();
    }, [transactionId]);

    if (loading) {
        return <p className="text-center text-blue-500">Loading transaction...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="bg-blue-50 p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
            <h1 className="text-2xl font-semibold text-blue-800 text-center mb-6">Transaction Details</h1>
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-blue-700 mb-4">{transaction.title}</h2>
                <p className="text-lg text-blue-600 mb-2">
                    <span className="font-medium">Amount:</span> ${transaction.amount}
                </p>
                <p className="text-lg text-blue-600 mb-2">
                    <span className="font-medium">Date:</span> {new Date(transaction.date).toLocaleDateString()}
                </p>
                <p className="text-lg text-blue-600 mb-2">
                    <span className="font-medium">Status:</span> {transaction.status}
                </p>
                <p className="text-lg text-blue-600">
                    <span className="font-medium">Description:</span> {transaction.description}
                </p>
            </div>
        </div>
    );
};

export default Transactions;
