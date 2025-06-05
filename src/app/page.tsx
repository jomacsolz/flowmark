"use client";

import Image from "next/image";
import Link from "next/link";
// import { Inter, Poppins } from "next/font/google";

// const poppins = Poppins({
//   weight: "700",
//   subsets: ["latin"],
//   variable: "--font-poppins",
// });

// const inter = Inter({
//   weight: "400",
//   style: "italic",
//   subsets: ["latin"],
//   variable: "--font-inter",
// });

export default function BudgetTracker() {
  const features = [
    {
      title: "Accounts",
      description: "Manage your cash, bank, and credit card accounts",
      href: "/accounts",
      button: "Manage Accounts",
      icon: "/icons/accounts.png",
    },
    {
      title: "Transactions",
      description: "Add and track your income and expenses",
      href: "/transactions",
      button: "View Transactions",
      icon: "/icons/transactions.png",
    },
    {
      title: "Categories",
      description: "Organize your spending with custom categories",
      href: "/categories",
      button: "Manage Categories",
      icon: "/icons/categories.png",
    },
  ];

  return (
    <div className="bg-[#001a44] min-h-screen text-white px-4 py-8">
      <div className="flex justify-center mb-10">
        <Image src="/FlowmarkIcon.png" alt="Flowmark Logo" width={150} height={150} />
      </div>
      <h1 className="text-4xl font-black text-center mb-2 tracking-wide"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        FLOWMARK</h1>
      <p
        className="text-center text-sm italic text-gray-300 mb-8"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        Where your money flows, leave a mark.
      </p>

      <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-[#1c1c2e] p-6 rounded-2xl shadow-lg flex flex-col justify-between transition-transform hover:scale-[1.02]"
          >
            <div>
              <Image
                src={feature.icon}
                alt={`${feature.title} Icon`}
                width={40}
                height={40}
                className="mb-4"
              />
              <h2 className="text-xl font-semibold">{feature.title}</h2>
              <p className="text-sm mt-1 text-gray-300">{feature.description}</p>
            </div>
            <Link href={feature.href} passHref>
              <button className="mt-6 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-4 py-2 rounded-md transition-colors duration-200">
                {feature.button}
              </button>
            </Link>
          </div>
        ))}
      </div>

      <footer className="text-center mt-16 text-sm text-gray-400">
        © 2025 Flowmark. All rights reserved.
      </footer>
    </div>
  );
}
