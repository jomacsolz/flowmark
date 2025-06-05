"use client";

import { useState } from "react";
import { Account } from "../types";
import AccountForm from "./AccountForm";

interface Props {
  accounts: Account[];
  setAccounts: (accounts: Account[]) => void;
}

export default function AccountsSection({ accounts, setAccounts }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);

  const handleAddAccount = (account: Omit<Account, "id">) => {
    const newAccount = {
      ...account,
      id: Math.max(...accounts.map(a => a.id), 0) + 1
    };
    setAccounts([...accounts, newAccount]);
    setShowForm(false);
  };

  const handleUpdateAccount = (updatedAccount: Account) => {
    setAccounts(accounts.map(a => a.id === updatedAccount.id ? updatedAccount : a));
    setEditingAccount(null);
  };

  const handleDeleteAccount = (id: number) => {
    if (confirm("Are you sure you want to delete this account?")) {
      setAccounts(accounts.filter(a => a.id !== id));
    }
  };

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
        <h2 className="text-xl font-semibold mb-2">Total Balance</h2>
        <p className="text-3xl font-bold">
          ${totalBalance.toFixed(2)}
        </p>
        <p className="text-blue-100 mt-2">
          Across {accounts.length} account{accounts.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Accounts List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Accounts
          </h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Add Account
          </button>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {accounts.map((account) => (
            <div key={account.id} className="p-6 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  account.type === "cash" ? "bg-green-100 text-green-600" :
                  account.type === "bank" ? "bg-blue-100 text-blue-600" :
                  "bg-red-100 text-red-600"
                }`}>
                  {account.type === "cash" ? "💵" :
                   account.type === "bank" ? "🏦" : "💳"}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {account.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                    {account.type} Account
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className={`text-lg font-semibold ${
                  account.balance >= 0 ? "text-green-600" : "text-red-600"
                }`}>
                  ${account.balance.toFixed(2)}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingAccount(account)}
                    className="text-blue-500 hover:text-blue-700 font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteAccount(account.id)}
                    className="text-red-500 hover:text-red-700 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {accounts.length === 0 && (
            <div className="p-12 text-center text-gray-500 dark:text-gray-400">
              <p className="text-lg mb-2">No accounts yet</p>
              <p>Add your first account to get started</p>
            </div>
          )}
        </div>
      </div>

      {/* Account Form Modal */}
      {(showForm || editingAccount) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <AccountForm
              account={editingAccount}
              onSubmit={(account) => {
                if (editingAccount) {
                  handleUpdateAccount(account as Account);
                } else {
                  handleAddAccount(account as Omit<Account, "id">);
                }
              }}
              onCancel={() => {
                setShowForm(false);
                setEditingAccount(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}