import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { DynamicIcon, IconName } from "lucide-react/dynamic";

type QuickAddExpenseProps = {
  icon: IconName;
};

const QuickAddExpense = ({ icon }: QuickAddExpenseProps) => {
  return (
    <Drawer>
      <DrawerTrigger>
        <DynamicIcon
          name={icon}
          className="mx-1 w-12 h-10 p-2 rounded-md bg-primary text-primary-foreground outline-none"
        />
      </DrawerTrigger>
      <DrawerContent
        className="min-h-[95vh] h-[97vh] max-h-[97vh] bg-accent"
        barClassName="bg-muted-foreground/10"
      >
        <DrawerHeader>
          <DrawerTitle>Quick Add Expense</DrawerTitle>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
export default QuickAddExpense;
