"use client";

import { useState } from "react";
import { Transaction, Account, Category } from "../types";
import TransactionForm from "./TransactionForm";

interface Props {
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
  accounts: Account[];
  setAccounts: (accounts: Account[]) => void;
  categories: Category[];
}

export default function TransactionsSection({ transactions, setTransactions, accounts, setAccounts, categories }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [filterCategory, setFilterCategory] = useState<number | null>(null);

  const updateAccountBalance = async (accountId: number, amount: number, isAdding: boolean = true) => {
    const account = accounts.find(a => a.id === accountId);
    if (!account) return;

    const newBalance = isAdding ? account.balance + amount : account.balance - amount;

    // Update local state immediately for UI responsiveness
    setAccounts(accounts.map(acc => {
      if (acc.id === accountId) {
        return { ...acc, balance: newBalance };
      }
      return acc;
    }));

    // Update database
    try {
      const response = await fetch(`/api/accounts/${accountId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...account,
          balance: newBalance
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update account balance');
      }
    } catch (error) {
      console.error('Error updating account balance:', error);
      // Revert local state on error
      setAccounts(accounts.map(acc => {
        if (acc.id === accountId) {
          return { ...acc, balance: account.balance };
        }
        return acc;
      }));
    }
  };

  const handleAddTransaction = async (transaction: Omit<Transaction, "id">) => {
    try {
      // Create transaction in database
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
      });

      if (!response.ok) {
        throw new Error('Failed to create transaction');
      }

      const newTransaction = await response.json();
      
      // Update account balance
      await updateAccountBalance(newTransaction.accountId, newTransaction.amount, true);
      
      // Update local state
      setTransactions([...transactions, newTransaction]);
      setShowForm(false);
    } catch (error) {
      console.error('Error adding transaction:', error);
      alert('Failed to add transaction. Please try again.');
    }
  };

  const handleUpdateTransaction = async (updatedTransaction: Transaction | Omit<Transaction, "id">) => {
    if ("id" in updatedTransaction) {
      const oldTransaction = transactions.find(t => t.id === updatedTransaction.id);
      
      if (oldTransaction) {
        try {
          // Update transaction in database
          const response = await fetch('/api/transactions', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTransaction),
          });

          if (!response.ok) {
            throw new Error('Failed to update transaction');
          }

          const updated = await response.json();

          // Reverse the old transaction's effect on balance
          await updateAccountBalance(oldTransaction.accountId, oldTransaction.amount, false);
          
          // Apply the new transaction's effect on balance
          await updateAccountBalance(updated.accountId, updated.amount, true);
          
          // Update local state
          setTransactions(transactions.map(t => t.id === updated.id ? updated : t));
          setEditingTransaction(null);
        } catch (error) {
          console.error('Error updating transaction:', error);
          alert('Failed to update transaction. Please try again.');
        }
      }
    }
  };

  const handleDeleteTransaction = async (id: number) => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      const transaction = transactions.find(t => t.id === id);
      
      if (transaction) {
        try {
          // Delete transaction from database
          const response = await fetch(`/api/transactions/${id}`, {
            method: 'DELETE',
          });

          if (!response.ok) {
            throw new Error('Failed to delete transaction');
          }

          // Reverse the transaction's effect on account balance
          await updateAccountBalance(transaction.accountId, transaction.amount, false);
          
          // Update local state
          setTransactions(transactions.filter(t => t.id !== id));
        } catch (error) {
          console.error('Error deleting transaction:', error);
          alert('Failed to delete transaction. Please try again.');
        }
      }
    }
  };

  // ...existing code...
  const filteredTransactions = filterCategory 
    ? transactions.filter(t => t.categoryId === filterCategory)
    : transactions;

  const sortedTransactions = [...filteredTransactions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const getAccountName = (accountId: number) => 
    accounts.find(a => a.id === accountId)?.name || "Unknown Account";

  const getCategoryName = (categoryId: number) =>
    categories.find(c => c.id === categoryId)?.name || "Unknown Category";

  const getCategoryColor = (categoryId: number) =>
    categories.find(c => c.id === categoryId)?.color || "#6b7280";

  // Calculate totals for summary
  const totalIncome = transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const netBalance = totalIncome - totalExpenses;

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg p-6 text-white">
        <h2 className="text-xl font-semibold mb-4">Transaction Summary</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-green-100">Total Income</p>
            <p className="text-2xl font-bold">₱{totalIncome.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-red-100">Total Expenses</p>
            <p className="text-2xl font-bold">₱{totalExpenses.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-blue-100">Net Balance</p>
            <p className={`text-2xl font-bold ${netBalance >= 0 ? 'text-green-200' : 'text-red-200'}`}>
              ₱{netBalance.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Header with Add Button and Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Transactions
            </h2>
            <select
              value={filterCategory || ""}
              onChange={(e) => setFilterCategory(e.target.value ? parseInt(e.target.value) : null)}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-700 dark:text-white"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Add Transaction
          </button>
        </div>

        {/* Transactions List */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {sortedTransactions.map((transaction) => (
            <div key={transaction.id} className="p-6 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getCategoryColor(transaction.categoryId) }}
                />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {transaction.description}
                  </h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>{getCategoryName(transaction.categoryId)}</span>
                    <span>•</span>
                    <span>{getAccountName(transaction.accountId)}</span>
                    <span>•</span>
                    <span>{new Date(transaction.date).toLocaleDateString()}</span>
                  </div>
                  {transaction.notes && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {transaction.notes}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className={`text-lg font-semibold ${
                  transaction.amount >= 0 ? "text-green-600" : "text-red-600"
                }`}>
                  {transaction.amount >= 0 ? "+" : ""}₱{Math.abs(transaction.amount).toFixed(2)}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingTransaction(transaction)}
                    className="text-blue-500 hover:text-blue-700 font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTransaction(transaction.id)}
                    className="text-red-500 hover:text-red-700 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {sortedTransactions.length === 0 && (
            <div className="p-12 text-center text-gray-500 dark:text-gray-400">
              <p className="text-lg mb-2">No transactions found</p>
              <p>Add your first transaction to get started</p>
            </div>
          )}
        </div>
      </div>

      {/* Transaction Form Modal */}
      {(showForm || editingTransaction) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <TransactionForm
              transaction={editingTransaction}
              accounts={accounts}
              categories={categories}
              onSubmit={editingTransaction ? handleUpdateTransaction : handleAddTransaction}
              onCancel={() => {
                setShowForm(false);
                setEditingTransaction(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}