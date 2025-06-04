import { NextResponse } from 'next/server';
import { getAllAccounts, createAccount } from '@/utils/accountService';

export async function GET() {
  const accounts = await getAllAccounts();
  return NextResponse.json(accounts);
}

export async function POST(req: Request) {
  const body = await req.json();
  const newAccount = await createAccount(body);
  return NextResponse.json(newAccount, { status: 201 });
}