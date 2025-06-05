# Flowmark 💰

*Where your money flows, leave a mark.*

Flowmark is a modern, intuitive budget tracking application built with Next.js that helps you manage your personal finances with style and simplicity.

## ✨ Features

- **Account Management**: Track multiple accounts including checking, savings, cash, and credit cards
- **Transaction Tracking**: Record and categorize your income and expenses
- **Category Organization**: Create custom categories with color coding for better organization
- **Responsive Design**: Beautiful dark theme with responsive layout
- **Real-time Updates**: Dynamic state management for instant updates

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jomacsolz/flowmark.git
cd flowmark
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🏗️ Project Structure

```
flowmark/
├── src/
│   ├── app/
│   │   └── page.tsx           # Main application page
│   ├── components/
│   │   ├── AccountsSection.tsx
│   │   ├── TransactionsSection.tsx
│   │   └── CategoriesSection.tsx
│   ├── types.ts               # TypeScript type definitions
│   └── utils/                 # Utility functions
├── prisma/
│   └── schema.prisma          # Database schema
├── public/
│   ├── FlowmarkIcon.png       # App logo
│   └── icons/                 # Feature icons
└── README.md
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Database**: Prisma ORM
- **Styling**: Tailwind CSS
- **UI Components**: Custom React components
- **State Management**: React hooks (useState)

## 💡 Usage

### Managing Accounts
- Add different types of accounts (bank, cash, credit)
- Track account balances
- View account summaries

### Recording Transactions
- Add income and expense transactions
- Link transactions to specific accounts and categories
- Add descriptions and notes

### Organizing Categories
- Create custom categories for different types of expenses and income
- Assign colors to categories for visual organization
- Manage category types (income vs expense)