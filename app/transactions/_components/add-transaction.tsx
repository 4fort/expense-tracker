import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import AddTransactionContent from "./add-transaction-content";
import { useTrackerSelectionStore } from "../_store/useTrackerSelectionStore";
import { useAddTransactionStore } from "../_store/useAddTransactionStore";

type QuickAddTransactionProps = {
  trigger: React.ReactNode;
  title: string;
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddTransaction = ({
  trigger,
  title,
  open,
  onOpenChange,
}: QuickAddTransactionProps) => {
  const { resetTransactionData, resetErrorMessages } = useAddTransactionStore();
  const { setSelectedTracker } = useTrackerSelectionStore();

  return (
    <Drawer
      open={open}
      onOpenChange={(e) => {
        onOpenChange(e);
        resetTransactionData();
        resetErrorMessages();
        setSelectedTracker(null);
      }}
      repositionInputs={false}
    >
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <AddTransactionContent title={title} onOpenChange={onOpenChange} />
    </Drawer>
  );
};
export default AddTransaction;
