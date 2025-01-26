import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

type AddExpenseContentProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
};

const AddExpenseContent = ({
  isOpen,
  setIsOpen,
  title,
}: AddExpenseContentProps) => {
  return (
    <DrawerContent
      className="min-h-[95vh] h-[97vh] max-h-[97vh] bg-accent"
      barClassName="bg-muted-foreground/10"
    >
      <DrawerHeader>
        <DrawerTitle>{title}</DrawerTitle>
      </DrawerHeader>
      <DrawerFooter>
        <Button>Submit</Button>
        <DrawerClose asChild>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
};

export default AddExpenseContent;
