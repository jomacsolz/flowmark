"use client";

import { useState } from "react";
import { Transaction, Account, Category } from "../types";

interface Props {
  transaction?: Transaction | null;
  accounts: Account[];
  categories: Category[];
  onSubmit: (transaction: Transaction | Omit<Transaction, "id">) => void;
  onCancel: () => void;
}

export default function TransactionForm({ transaction, accounts, categories, onSubmit, onCancel }: Props) {
  const [formData, setFormData] = useState({
    accountId: transaction?.accountId || (accounts[0]?.id || 0),
    categoryId: transaction?.categoryId || (categories[0]?.id || 0),
    amount: transaction ? Math.abs(transaction.amount) : 0,
    type: transaction?.type || "expense" as const,
    description: transaction?.description || "",
    date: transaction?.date || new Date().toISOString().split('T')[0],
    notes: transaction?.notes || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = formData.type === "expense" ? -Math.abs(formData.amount) : Math.abs(formData.amount);
    
    const transactionData = {
      ...formData,
      amount,
    };

    if (transaction) {
      onSubmit({ ...transactionData, id: transaction.id });
    } else {
      onSubmit(transactionData);
    }
  };

  const availableCategories = categories.filter(c => c.type === formData.type);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {transaction ? "Edit Transaction" : "Add New Transaction"}
      </h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Type
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="income"
              checked={formData.type === "income"}
              onChange={(e) => setFormData({ 
                ...formData, 
                type: e.target.value as "income" | "expense",
                categoryId: categories.find(c => c.type === e.target.value)?.id || 0
              })}
              className="mr-2"
            />
            <span className="text-green-600">Income</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="expense"
              checked={formData.type === "expense"}
              onChange={(e) => setFormData({ 
                ...formData, 
                type: e.target.value as "income" | "expense",
                categoryId: categories.find(c => c.type === e.target.value)?.id || 0
              })}
              className="mr-2"
            />
            <span className="text-red-600">Expense</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Amount
        </label>
        <input
          type="number"
          step="0.01"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          placeholder="0.00"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Description
        </label>
        <input
          type="text"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          placeholder="e.g., Grocery shopping"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Account
        </label>
        <select
          value={formData.accountId}
          onChange={(e) => setFormData({ ...formData, accountId: parseInt(e.target.value) })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          required
        >
          {accounts.map(account => (
            <option key={account.id} value={account.id}>
              {account.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Category
        </label>
        <select
          value={formData.categoryId}
          onChange={(e) => setFormData({ ...formData, categoryId: parseInt(e.target.value) })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          required
        >
          {availableCategories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Date
        </label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Notes (Optional)
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          placeholder="Additional notes..."
          rows={3}
        />
      </div>

      <div className="flex space-x-3 pt-4">
        <button
          type="submit"
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
        >
          {transaction ? "Update" : "Add"} Transaction
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}