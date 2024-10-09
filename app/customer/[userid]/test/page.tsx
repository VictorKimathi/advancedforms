"use client"
import React, { useState } from 'react';

const TransactionForm = () => {
    const [transactionType, setTransactionType] = useState('income'); // Default to income
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [description, setDescription] = useState('');

    const incomeCategories = ['Salary', 'Investment', 'Bonus'];
    const expenseCategories = ['Rent', 'Groceries', 'Utilities'];

    const handleTransactionTypeChange = (event) => {
        setTransactionType(event.target.value);
        setCategory(''); // Reset category on type change
        setSubcategory(''); // Reset subcategory or description
        setDescription('');
    };

    return (
        <form>
            <div>
                <label>
                    <input
                        type="radio"
                        value="income"
                        checked={transactionType === 'income'}
                        onChange={handleTransactionTypeChange}
                    />
                    Income
                </label>
                <label>
                    <input
                        type="radio"
                        value="expense"
                        checked={transactionType === 'expense'}
                        onChange={handleTransactionTypeChange}
                    />
                    Expense
                </label>
            </div>

            <div>
                <label>Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Select a category</option>
                    {transactionType === 'income'
                        ? incomeCategories.map((cat) => <option key={cat}>{cat}</option>)
                        : expenseCategories.map((cat) => <option key={cat}>{cat}</option>)}
                </select>
            </div>

            {transactionType === 'expense' ? (
                <div>
                    <label>Subcategory</label>
                    <input
                        type="text"
                        value={subcategory}
                        onChange={(e) => setSubcategory(e.target.value)}
                    />
                </div>
            ) : (
                <div>
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
            )}

            <button type="submit">Submit</button>
        </form>
    );
};

export default TransactionForm;