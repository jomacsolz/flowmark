"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import AccountsSection from "../components/AccountsSection";
import TransactionsSection from "../components/TransactionsSection";
import CategoriesSection from "../components/CategoriesSection";
import { Account, Transaction, Category } from "../types";

export default function BudgetTracker() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Sample data for the dashboard sections
  // const [accounts, setAccounts] = useState<Account[]>([
  //   { id: 1, name: "Checking Account", type: "bank", balance: 2500.00 },
  //   { id: 2, name: "Cash Wallet", type: "cash", balance: 150.00 },
  //   { id: 3, name: "Credit Card", type: "credit", balance: -340.00 },
  // ]);

  // const [transactions, setTransactions] = useState<Transaction[]>([
  //   {
  //     id: 1,
  //     accountId: 1,
  //     categoryId: 1,
  //     amount: -45.67,
  //     description: "Grocery shopping",
  //     date: "2024-01-15",
  //     type: "expense",
  //     notes: "Weekly groceries at SuperMart"
  //   },
  //   {
  //     id: 2,
  //     accountId: 1,
  //     categoryId: 4,
  //     amount: 3000.00,
  //     description: "Salary",
  //     date: "2024-01-01",
  //     type: "income"
  //   }
  // ]);

  // const [categories, setCategories] = useState<Category[]>([
  //   { id: 1, name: "Food & Dining", color: "#ef4444", type: "expense" },
  //   { id: 2, name: "Transportation", color: "#3b82f6", type: "expense" },
  //   { id: 3, name: "Utilities", color: "#eab308", type: "expense" },
  //   { id: 4, name: "Salary", color: "#22c55e", type: "income" },
  //   { id: 5, name: "Investment", color: "#8b5cf6", type: "income" },
  // ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [accountsRes, transactionsRes, categoriesRes] = await Promise.all([
          fetch('/api/accounts'),
          fetch('/api/transactions'),
          fetch('/api/categories')
        ]);

        if (accountsRes.ok) {
          const accountsData = await accountsRes.json();
          setAccounts(accountsData);
        }

        if (transactionsRes.ok) {
          const transactionsData = await transactionsRes.json();
          setTransactions(transactionsData);
        }

        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json();
          setCategories(categoriesData);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
        // Fallback to sample data if API fails
        setAccounts([
          { id: 1, name: "Checking Account", type: "bank", balance: 2500.00 },
          { id: 2, name: "Cash Wallet", type: "cash", balance: 150.00 },
          { id: 3, name: "Credit Card", type: "credit", balance: -340.00 },
        ]);
        setCategories([
          { id: 1, name: "Food & Dining", color: "#ef4444", type: "expense" },
          { id: 2, name: "Transportation", color: "#3b82f6", type: "expense" },
          { id: 3, name: "Utilities", color: "#eab308", type: "expense" },
          { id: 4, name: "Salary", color: "#22c55e", type: "income" },
          { id: 5, name: "Investment", color: "#8b5cf6", type: "income" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const features = [
    {
      title: "Accounts",
      description: "Manage your cash, bank, and credit card accounts",
      button: "Manage Accounts",
      icon: "/icons/accounts.png",
      id: "accounts"
    },
    {
      title: "Transactions", 
      description: "Add and track your income and expenses",
      button: "View Transactions",
      icon: "/icons/transactions.png",
      id: "transactions"
    },
    {
      title: "Categories",
      description: "Organize your spending with custom categories",
      button: "Manage Categories", 
      icon: "/icons/categories.png",
      id: "categories"
    },
  ];

  // Render the selected section
  const renderActiveSection = () => {
    switch (activeSection) {
      case "accounts":
        return <AccountsSection accounts={accounts} setAccounts={setAccounts} />;
      case "transactions":
        return (
          <TransactionsSection
            transactions={transactions}
            setTransactions={setTransactions}
            accounts={accounts}
            setAccounts={setAccounts}
            categories={categories}
          />
        );
      case "categories":
        return <CategoriesSection categories={categories} setCategories={setCategories} />;
      default:
        return (
          <div className="bg-[#1c1c2e] p-6 rounded-2xl shadow-lg">
            <h1 className="text-2xl font-bold mb-4 capitalize">{activeSection}</h1>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#001a44] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (activeSection) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto p-6">
          <header className="mb-8">
            <button 
              onClick={() => setActiveSection(null)}
              className="mb-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-4 py-2 rounded-md transition-colors duration-200"
            >
              ← Back to Home
            </button>
            
            {/* Navigation buttons */}
            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setActiveSection("accounts")}
                className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                  activeSection === "accounts"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                Accounts
              </button>
              <button
                onClick={() => setActiveSection("transactions")}
                className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                  activeSection === "transactions"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                Transactions
              </button>
              <button
                onClick={() => setActiveSection("categories")}
                className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                  activeSection === "categories"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                Categories
              </button>
            </div>
          </header>

          {/* Content Section */}
          <div className="space-y-6">
            {renderActiveSection()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#001a44] min-h-screen text-white px-4 py-8">
      <div className="flex justify-center mb-10">
        <Image src="/FlowmarkIcon.png" alt="Flowmark Logo" width={150} height={150} />
      </div>
      <h1 className="text-4xl font-black text-center mb-2 tracking-wide"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        FLOWMARK</h1>
      <p
        className="text-center text-sm italic text-gray-300 mb-8"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        Where your money flows, leave a mark.
      </p>

      <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-[#1c1c2e] p-6 rounded-2xl shadow-lg flex flex-col justify-between transition-transform hover:scale-[1.02]"
          >
            <div>
              <Image
                src={feature.icon}
                alt={`${feature.title} Icon`}
                width={40}
                height={40}
                className="mb-4"
              />
              <h2 className="text-xl font-semibold">{feature.title}</h2>
              <p className="text-sm mt-1 text-gray-300">{feature.description}</p>
            </div>
            <button 
              onClick={() => setActiveSection(feature.id)}
              className="mt-6 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-4 py-2 rounded-md transition-colors duration-200"
            >
              {feature.button}
            </button>
          </div>
        ))}
      </div>

      <footer className="text-center mt-16 text-sm text-gray-400">
        © 2025 Flowmark. All rights reserved.
      </footer>
    </div>
  );
}