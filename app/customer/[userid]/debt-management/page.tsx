"use client";
import RootLayout from "@/app/customer/[userid]/dashboard/page";
import React, { useState } from 'react';
import axios from 'axios';

const DebtForm = () => {
    const [debtorName, setDebtorName] = useState('');
    const [amount, setAmount] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [debt_type, setDebtType] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        const debtData = {
            amount: parseFloat(amount),
            debt_type: debt_type,
        };

        try {
            const response = await axios.post('http://localhost:8000/api/debts/', debtData, {
                headers: {
                    "Authorization": "Token dee6d4ab110568b3feae114768f6e12c97a4ade0",
                    "Content-Type": "application/json",
                },
            });
            setSuccess('Debt data submitted successfully!');

            setAmount('');
            setDebtType('');
            setLoading(false);
        } catch (error) {
            setError('Failed to submit debt data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <RootLayout>
            <div className="bg-blue-50 p-8 rounded-lg shadow-md max-w-lg mx-auto">
                <h1 className="text-2xl font-semibold text-blue-800 mb-6 text-center">Add New Debt</h1>
                {success && <p className="text-green-600 mb-4 text-center">{success}</p>}
                {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-blue-700 font-medium mb-2" htmlFor="amount">
                            Amount
                        </label>
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-blue-700 font-medium mb-2" htmlFor="debt_type">
                            Debt Type
                        </label>
                        <select
                            id="debt_type"
                            value={debt_type}
                            onChange={(e) => setDebtType(e.target.value)}
                            className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        >
                            <option value="" disabled>Select debt type</option>
                            <option value="credit_card">Credit Card</option>
                            <option value="personal_loan">Personal Loan</option>
                            <option value="mortgage">Mortgage</option>
                            <option value="student_loan">Student Loan</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit Debt'}
                    </button>
                </form>
            </div>
        </RootLayout>
    );
};

export default DebtForm;
