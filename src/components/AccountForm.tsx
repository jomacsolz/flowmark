"use client";

import { useState } from "react";
import { Account } from "../types";

interface Props {
  account?: Account | null;
  onSubmit: (account: Account | Omit<Account, "id">) => void;
  onCancel: () => void;
}

export default function AccountForm({ account, onSubmit, onCancel }: Props) {
  const [formData, setFormData] = useState({
    name: account?.name || "",
    type: account?.type || "bank" as const,
    balance: account?.balance || 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (account) {
      onSubmit({ ...formData, id: account.id });
    } else {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {account ? "Edit Account" : "Add New Account"}
      </h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Account Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          placeholder="e.g., Checking Account"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Account Type
        </label>
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value as Account["type"] })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        >
          <option value="bank">Bank Account</option>
          <option value="cash">Cash</option>
          <option value="credit">Credit Card</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Balance
        </label>
        <input
          type="number"
          step="0.01"
          value={formData.balance}
          onChange={(e) => setFormData({ ...formData, balance: parseFloat(e.target.value) || 0 })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          placeholder="0.00"
        />
      </div>

      <div className="flex space-x-3 pt-4">
        <button
          type="submit"
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
        >
          {account ? "Update" : "Add"} Account
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