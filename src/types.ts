export interface Account {
  id: number;
  name: string;
  type: "cash" | "bank" | "credit";
  balance: number;
}

export interface Transaction {
  id: number;
  accountId: number;
  categoryId: number;
  amount: number;
  description: string;
  date: string;
  type: "income" | "expense";
  notes?: string;
  receipt?: string; // URL to receipt image
}

export interface Category {
  id: number;
  name: string;
  color: string;
  type: "income" | "expense";
}