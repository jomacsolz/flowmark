"use client";

import { useState } from "react";
import { Category } from "../types";

interface Props {
  category?: Category | null;
  onSubmit: (category: Category | Omit<Category, "id">) => void;
  onCancel: () => void;
}

const colorOptions = [
  "#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4",
  "#3b82f6", "#8b5cf6", "#ec4899", "#6b7280", "#1f2937"
];

export default function CategoryForm({ category, onSubmit, onCancel }: Props) {
  const [formData, setFormData] = useState({
    name: category?.name || "",
    type: category?.type || "expense" as const,
    color: category?.color || colorOptions[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (category) {
      onSubmit({ ...formData, id: category.id });
    } else {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {category ? "Edit Category" : "Add New Category"}
      </h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Category Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          placeholder="e.g., Food & Dining"
          required
        />
      </div>

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
              onChange={(e) => setFormData({ ...formData, type: e.target.value as "income" | "expense" })}
              className="mr-2"
            />
            <span className="text-green-600">Income</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="expense"
              checked={formData.type === "expense"}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as "income" | "expense" })}
              className="mr-2"
            />
            <span className="text-red-600">Expense</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Color
        </label>
        <div className="grid grid-cols-5 gap-2">
          {colorOptions.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setFormData({ ...formData, color })}
              className={`w-8 h-8 rounded-full border-2 ${
                formData.color === color ? "border-gray-400" : "border-gray-200"
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      <div className="flex space-x-3 pt-4">
        <button
          type="submit"
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
        >
          {category ? "Update" : "Add"} Category
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