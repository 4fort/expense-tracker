"use client";

import Main from "@/components/main";
import TitleHeader from "@/components/title-header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useTrackerTransactionsPersist from "@/hooks/useTrackerTransactionsPersist";
import { cn, currency, datefmt } from "@/lib/utils";
import { TTrackerTransactionDisplay } from "@/types/TTrackerTransaction";
import { DynamicIcon, IconName } from "lucide-react/dynamic";
import React, { useState } from "react";
import AddTransaction from "./_components/add-transaction";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const transctionTypeIcons = [
  {
    type: "initial",
    icon: "file-plus-2",
  },
  {
    type: "expense",
    icon: "minus",
  },
  {
    type: "income",
    icon: "plus",
  },
];

export default function TransactionsPageComponent() {
  const { loading, query, setQuery, filteredTransactions } =
    useTrackerTransactionsPersist();

  const [open, onOpenChange] = useState(false);

  console.log(filteredTransactions);

  return (
    <div
      className="p-[inherit] min-h-screen h-[inherit] bg-accent overflow-y-auto"
      vaul-drawer-wrapper=""
    >
      <TitleHeader
        title="Transactions"
        className="bg-accent/30 backdrop-blur-md"
      />
      <Main className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Input
            type="search"
            placeholder="Search transactions"
            className="w-full py-6"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <AddTransaction
            title="Add Transaction"
            trigger={
              <Button className="w-full">
                Add
                <Plus />
              </Button>
            }
            open={open}
            onOpenChange={onOpenChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          {loading ? (
            <TransactionsSkeleton />
          ) : (
            <Transactions transactions={filteredTransactions} />
          )}
        </div>
      </Main>
    </div>
  );
}

const Transactions = ({
  transactions,
}: {
  transactions: TTrackerTransactionDisplay[];
}) => {
  return transactions.map((transaction) => {
    return <Transaction key={transaction.id} transaction={transaction} />;
  });
};

const Transaction = ({
  transaction,
}: {
  transaction: TTrackerTransactionDisplay;
}) => {
  return (
    <Card className="flex items-center justify-between p-4">
      <div className="flex gap-2">
        <DynamicIcon
          name={
            transctionTypeIcons.find((icon) => icon.type === transaction.type)!
              .icon as IconName
          }
          className="w-12 h-12 p-3 rounded-sm bg-muted text-muted-foreground"
        />
        <div>
          <h3 className="text-lg font-semibold">{transaction.description}</h3>
          <p className="text-sm text-accent-foreground">
            {transaction.type === "initial" && (
              <InlineTracker tracker={transaction.tracker} />
            )}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <h3
          className={cn(
            "text-lg font-semibold",
            transaction.type === "expense" ? "text-red-500" : "text-green-500"
          )}
        >
          {transaction.type === "expense"
            ? `-${currency.format(transaction.amount)}`
            : `+${currency.format(transaction.amount)}`}
        </h3>
        <p className="text-xs text-muted-foreground">
          {datefmt(transaction.created_at).mediumTime()}
        </p>
      </div>
    </Card>
  );
};

const InlineTracker = ({
  tracker,
}: {
  tracker: TTrackerTransactionDisplay["tracker"];
}) => {
  return (
    <span
      className={`inline-flex items-center gap-0.5 bg-${tracker.color}-200 text-${tracker.color}-800 px-[0.25rem] py-[0.03rem] rounded-[0.25rem]`}
    >
      <DynamicIcon name={tracker.icon} className="inline-block w-4 h-4" />
      {tracker.name}
    </span>
  );
};

const TransactionsSkeleton = () => {
  return [1, 2, 3, 4, 5, 6, 7, 8]
    .map((_, index) => {
      return <ExpenseSkeleton key={index} opacity={index} />;
    })
    .reverse();
};

const ExpenseSkeleton = ({ opacity }: { opacity: number }) => {
  return (
    <Card
      className="w-full h-20 flex items-center justify-between p-4"
      style={{ opacity: opacity / 8 }}
    >
      <div className="flex gap-2">
        <div className="w-12 h-12 p-3 rounded-sm bg-muted-foreground/40 animate-pulse"></div>
        <div className="flex flex-col">
          <div className="w-32 h-4 bg-muted-foreground/40 animate-pulse"></div>
          <div className="w-20 h-3 bg-muted-foreground/40 animate-pulse"></div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="w-20 h-4 bg-muted-foreground/40 animate-pulse"></div>
        <div className="w-10 h-3 bg-muted-foreground/40 animate-pulse"></div>
      </div>
    </Card>
  );
};
