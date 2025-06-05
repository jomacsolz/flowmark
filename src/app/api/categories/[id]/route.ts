import { NextRequest, NextResponse } from 'next/server'
import { updateCategory, deleteCategory } from '@/utils/categoryService'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const data = await req.json()
  const updated = await updateCategory(Number(params.id), data)
  return NextResponse.json(updated)
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const deleted = await deleteCategory(Number(params.id))
  return NextResponse.json(deleted)
}
