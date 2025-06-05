    import { prisma } from './prisma'

export async function getAllCategories() {
  return await prisma.category.findMany()
}

export async function getCategoryById(id: number) {
  return await prisma.category.findUnique({ where: { id } })
}

export async function createCategory(data: {
  name: string
  color: string
  type: 'INCOME' | 'EXPENSE'
}) {
  return await prisma.category.create({ data })
}

export async function updateCategory(id: number, data: Partial<{
  name: string
  color: string
  type: 'INCOME' | 'EXPENSE'
}>) {
  return await prisma.category.update({ where: { id }, data })
}

export async function deleteCategory(id: number) {
  return await prisma.category.delete({ where: { id } })
}
