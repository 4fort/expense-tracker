import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../../../components/ui/button";
import { DynamicIcon, IconName } from "lucide-react/dynamic";
import { useState } from "react";
import AddExpenseContent from "./add-expense-content";

type QuickAddExpenseProps = {
  icon: IconName;
};

const QuickAddExpense = ({ icon }: QuickAddExpenseProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer dismissible={false} open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger>
        <DynamicIcon
          name={icon}
          className="mx-1 w-12 h-10 p-2 rounded-md bg-primary text-primary-foreground outline-none"
        />
      </DrawerTrigger>
      <AddExpenseContent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Quick Add Expense"
      />
    </Drawer>
  );
};
export default QuickAddExpense;
