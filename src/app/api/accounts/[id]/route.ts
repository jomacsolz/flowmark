import { NextResponse } from 'next/server';
import {
  getAccountById,
  updateAccount,
  deleteAccount,
} from '@/utils/accountService';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const account = await getAccountById(Number(params.id));
  return NextResponse.json(account);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  const updated = await updateAccount(Number(params.id), data);
  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await deleteAccount(Number(params.id));
  return NextResponse.json({ success: true });
}
