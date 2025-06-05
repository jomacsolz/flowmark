import { NextRequest, NextResponse } from 'next/server';
import {
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} from '@/utils/transactionService';

// GET /api/transactions/[id]
export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const transaction = await getTransactionById(id);
    if (!transaction) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }
    return NextResponse.json(transaction);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch transaction' }, { status: 500 });
  }
}

// PUT /api/transactions/[id]
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const data = await req.json();
    const updated = await updateTransaction(id, data);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update transaction' }, { status: 500 });
  }
}

// DELETE /api/transactions/[id]
export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    await deleteTransaction(id);
    return NextResponse.json({ message: 'Transaction deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete transaction' }, { status: 500 });
  }
}
