"use client";

import { useState } from "react";
import { Category } from "../types";
import CategoryForm from "./CategoryForm";

interface Props {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
}

export default function CategoriesSection({ categories, setCategories }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleAddCategory = (category: Omit<Category, "id">) => {
    const newCategory = {
      ...category,
      id: Math.max(...categories.map(c => c.id), 0) + 1
    };
    setCategories([...categories, newCategory]);
    setShowForm(false);
  };

  const handleUpdateCategory = (updatedCategory: Category) => {
    setCategories(categories.map(c => c.id === updatedCategory.id ? updatedCategory : c));
    setEditingCategory(null);
  };

  const handleDeleteCategory = (id: number) => {
    if (confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  const incomeCategories = categories.filter(c => c.type === "income");
  const expenseCategories = categories.filter(c => c.type === "expense");

  return (
    <div className="space-y-6">
      {/* Income Categories */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Income Categories
          </h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Add Category
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {incomeCategories.map((category) => (
            <div key={category.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {category.name}
                  </h3>
                </div>
                <div className="flex space-x-1">
                  <button
                    onClick={() => setEditingCategory(category)}
                    className="text-blue-500 hover:text-blue-700 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                Income
              </span>
            </div>
          ))}
          
          {incomeCategories.length === 0 && (
            <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-8">
              No income categories yet
            </div>
          )}
        </div>
      </div>

      {/* Expense Categories */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Expense Categories
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {expenseCategories.map((category) => (
            <div key={category.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {category.name}
                  </h3>
                </div>
                <div className="flex space-x-1">
                  <button
                    onClick={() => setEditingCategory(category)}
                    className="text-blue-500 hover:text-blue-700 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                Expense
              </span>
            </div>
          ))}
          
          {expenseCategories.length === 0 && (
            <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-8">
              No expense categories yet
            </div>
          )}
        </div>
      </div>

      {/* Category Form Modal */}
      {(showForm || editingCategory) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <CategoryForm
              category={editingCategory}
              onSubmit={(category) => {
                if ('id' in category) {
                  handleUpdateCategory(category as Category);
                } else {
                  handleAddCategory(category as Omit<Category, "id">);
                }
              }}
              onCancel={() => {
                setShowForm(false);
                setEditingCategory(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}