"use client"
import React, { useEffect, useState } from 'react';

const Transactions = () => {
    const [debt, setDebt] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/total-debt/`, {
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
                console.log(data)
                setDebt(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchTransaction();
    }, []);

    if (loading) {
        return <p className="text-center text-blue-500">Loading transaction...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="bg-blue-50 p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4">Debt Details</h2>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <p className="text-lg font-medium text-gray-700">
                    <span className="font-semibold"> Total Amount:</span> ${debt.total_debt}

                </p>

            </div>
        </div>
    );
};

export default Transactions;
