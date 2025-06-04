import { prisma } from './prisma';

// Create new account
export async function createAccount(data: {
    name: string;
    type: string;
    balance: number;
})  {
    return await prisma.account.create({
        data,
    });
}

// Get all accounts
export async function getAllAccounts() {
    return await prisma.account.findMany();
}

// Get account by ID
export async function getAccountById(id: number) {
    return await prisma.account.findUnique({
        where: { id },
    });
}

// Update Account
export async function updateAccount(id: number, data: Partial<{
    name: string;
    type: string;
    balance: number;
}>) {
    return await prisma.account.update({
        where: { id },
        data,
    });
}

// Delete account
export async function deleteAccount(id: number) {
    return await prisma.account.delete({
        where: { id },
    });
}