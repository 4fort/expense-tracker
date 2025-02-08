"use client";

import { useTrackerTransactionsStore } from "@/store/useTrackerTransactionsStore";
import { useEffect, useState } from "react";

export default function useTrackerTransactionsPersist() {
  const {
    transactions,
    loading,
    error,
    retrieveTransactions,
    revalidateTransactions,
  } = useTrackerTransactionsStore();

  useEffect(() => {
    if (transactions.length === 0) {
      revalidateTransactions();
      console.log("Revalidated tracker transactions data");
    }
  }, []);

  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);
  const [query, setQuery] = useState("");

  const filterTransactions = () => {
    setFilteredTransactions(
      transactions.filter(
        (transaction) =>
          transaction.description.toLowerCase().includes(query.toLowerCase()) ||
          transaction.tracker.name
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          transaction.created_at.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  useEffect(() => {
    filterTransactions();
  }, [transactions, query]);

  return {
    transactions,
    isTransactionsEmpty: transactions.length === 0,
    loading,
    error,
    retrieveTransactions,
    query,
    setQuery,
    filteredTransactions,
    revalidateTransactions,
  };
}
