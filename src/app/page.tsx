"use client";

import { useState } from "react";
import AccountsSection from "../components/AccountsSection";
import TransactionsSection from "../components/TransactionsSection";
import CategoriesSection from "../components/CategoriesSection";
import { Account, Transaction, Category } from "../types";

export default function BudgetTracker() {
  const [accounts, setAccounts] = useState<Account[]>([
    { id: 1, name: "Checking Account", type: "bank", balance: 2500.00 },
    { id: 2, name: "Cash Wallet", type: "cash", balance: 150.00 },
    { id: 3, name: "Credit Card", type: "credit", balance: -340.00 },
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      accountId: 1,
      categoryId: 1,
      amount: -45.67,
      description: "Grocery shopping",
      date: "2024-01-15",
      type: "expense",
      notes: "Weekly groceries at SuperMart"
    },
    {
      id: 2,
      accountId: 1,
      categoryId: 4,
      amount: 3000.00,
      description: "Salary",
      date: "2024-01-01",
      type: "income"
    }
  ]);

  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "Food & Dining", color: "#ef4444", type: "expense" },
    { id: 2, name: "Transportation", color: "#3b82f6", type: "expense" },
    { id: 3, name: "Utilities", color: "#eab308", type: "expense" },
    { id: 4, name: "Salary", color: "#22c55e", type: "income" },
    { id: 5, name: "Investment", color: "#8b5cf6", type: "income" },
  ]);

  const [activeTab, setActiveTab] = useState<"accounts" | "transactions" | "categories">("accounts");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto p-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            FlowMark Budget Tracker
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your finances with ease
          </p>
        </header>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-1 bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm">
            {[
              { key: "accounts", label: "Accounts" },
              { key: "transactions", label: "Transactions" },
              { key: "categories", label: "Categories" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  activeTab === tab.key
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {activeTab === "accounts" && (
            <AccountsSection accounts={accounts} setAccounts={setAccounts} />
          )}
          {activeTab === "transactions" && (
            <TransactionsSection
              transactions={transactions}
              setTransactions={setTransactions}
              accounts={accounts}
              categories={categories}
            />
          )}
          {activeTab === "categories" && (
            <CategoriesSection categories={categories} setCategories={setCategories} />
          )}
        </div>
      </div>
    </div>
  );
}