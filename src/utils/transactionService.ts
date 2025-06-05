import { prisma } from './prisma';

// Create Transaction
export async function createTransaction(data: {
  accountId: number;
  categoryId: number;
  amount: number;
  description: string;
  date: Date;
  type: 'INCOME' | 'EXPENSE'; // Adjust based on your enum
  notes?: string;
  receipt?: string;
}) {
  return await prisma.transaction.create({
    data,
  });
}

// Get All Transactions
export async function getTransactions() {
  return await prisma.transaction.findMany({
    include: {
      account: true,
      category: true,
    },
    orderBy: {
      date: 'desc',
    },
  });
}

// Get One Transaction
export async function getTransactionById(id: number) {
  return await prisma.transaction.findUnique({
    where: { id },
    include: {
      account: true,
      category: true,
    },
  });
}

// Update Transaction
export async function updateTransaction(id: number, data: Partial<{
  accountId: number;
  categoryId: number;
  amount: number;
  description: string;
  date: Date;
  type: 'INCOME' | 'EXPENSE';
  notes?: string;
  receipt?: string;
}>) {
  return await prisma.transaction.update({
    where: { id },
    data,
  });
}

// Delete Transaction
export async function deleteTransaction(id: number) {
  return await prisma.transaction.delete({
    where: { id },
  });
}
