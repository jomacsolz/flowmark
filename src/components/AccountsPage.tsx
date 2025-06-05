import { useState, useEffect } from "react";
import { Account } from "../types";
import AccountsSection from "../components/AccountsSection";
import Link from "next/link";

const AccountsPage: React.FC = () => {
    const [accounts, setAccounts] = useState<Account[]>([]);

    useEffect(() => {
        fetch('/api/accounts')
            .then(res => res.json())
            .then(data => setAccounts(data))
            .catch(err => console.error('Failed to load accounts:', err));
    }, []);

    const updateAccounts = async (newAccounts: Account[]) => {
        setAccounts(newAccounts);
    };

    return (
        <div className="">
            Accounts
        </div>
    );
};

export default AccountsPage;