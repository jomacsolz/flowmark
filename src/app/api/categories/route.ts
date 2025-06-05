import { NextRequest, NextResponse } from 'next/server'
import { createCategory, getAllCategories } from '@/utils/categoryService'

export async function GET() {
  const categories = await getAllCategories()
  return NextResponse.json(categories)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const newCat = await createCategory(body)
  return NextResponse.json(newCat)
}
