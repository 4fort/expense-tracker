import { DynamicIcon } from "lucide-react/dynamic";
import AddTransaction from "./add-transaction";
import { useState } from "react";

const QuickAddTransaction = () => {
  const [open, onOpenChange] = useState(false);

  return (
    <AddTransaction
      title="Quick Add Transaction"
      trigger={
        <DynamicIcon
          name="plus"
          className="mx-1 w-12 h-10 p-2 rounded-md bg-primary text-primary-foreground outline-none self-center justify-self-center"
        />
      }
      open={open}
      onOpenChange={onOpenChange}
    />
  );
};
export default QuickAddTransaction;
