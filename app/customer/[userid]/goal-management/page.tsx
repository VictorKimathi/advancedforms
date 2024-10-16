"use client";
import React, { useState } from 'react';
import axios from 'axios';
import RootLayout from "@/app/customer/[userid]/dashboard/page"; // Adjust the import based on your actual file structure

const FinancialGoalForm = () => {
    const [description, setDescription] = useState('');
    const [amountNeeded, setAmountNeeded] = useState('');
    const [durationWeeks, setDurationWeeks] = useState('');
    const [goalType, setGoalType] = useState('basic');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        const goalData = {
            description,
            amount_needed: parseFloat(amountNeeded),
            duration_weeks: parseInt(durationWeeks),
            goal_type: goalType,
        };

        try {
            const response = await axios.post('http://localhost:8000/api/financial-goals/', goalData, {
                headers: {
                    "Authorization": "Token dee6d4ab110568b3feae114768f6e12c97a4ade0",
                    "Content-Type": "application/json",
                },
            });
            setSuccess('Financial goal created successfully!');

            // Reset form fields
            setDescription('');
            setAmountNeeded('');
            setDurationWeeks('');
            setGoalType('basic');
        } catch (error) {
            setError('Failed to create financial goal. Please try again.');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <RootLayout>
            <div className="bg-blue-50 p-8 rounded-lg shadow-md max-w-lg mx-auto">
                <h1 className="text-2xl font-semibold text-blue-800 mb-6 text-center">Create Financial Goal</h1>
                {success && <p className="text-green-600 mb-4 text-center">{success}</p>}
                {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-blue-700 font-medium mb-2" htmlFor="description">
                            Description
                        </label>
                        <input
                            type="text"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-blue-700 font-medium mb-2" htmlFor="amountNeeded">
                            Amount Needed
                        </label>
                        <input
                            type="number"
                            id="amountNeeded"
                            value={amountNeeded}
                            onChange={(e) => setAmountNeeded(e.target.value)}
                            className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-blue-700 font-medium mb-2" htmlFor="durationWeeks">
                            Duration (Weeks)
                        </label>
                        <input
                            type="number"
                            id="durationWeeks"
                            value={durationWeeks}
                            onChange={(e) => setDurationWeeks(e.target.value)}
                            className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-blue-700 font-medium mb-2" htmlFor="goalType">
                            Goal Type
                        </label>
                        <select
                            id="goalType"
                            value={goalType}
                            onChange={(e) => setGoalType(e.target.value)}
                            className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        >
                            <option value="basic">Basic (e.g., House)</option>
                            <option value="luxury">Luxury (e.g., Car)</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Create Goal'}
                    </button>
                </form>
            </div>
        </RootLayout>
    );
};

export default FinancialGoalForm;
