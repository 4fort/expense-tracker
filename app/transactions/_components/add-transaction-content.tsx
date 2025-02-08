import Trackers, { Tracker } from "@/app/trackers/_components/trackers";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerNested,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import useTrackerPersist from "@/hooks/useTrackerPersist";
import { useTrackerSelectionStore } from "../_store/useTrackerSelectionStore";
import { useActionState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import LabelInput, { LabelTextArea } from "@/components/label-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TTrackerTransactionType } from "@/types/TTrackerTransaction";
import { useAddTransactionStore } from "../_store/useAddTransactionStore";
import { addTransaction } from "../actions";
import useTrackerTransactionsPersist from "@/hooks/useTrackerTransactionsPersist";
import { Loader2 } from "lucide-react";

type AddTransactionContentProps = {
  title: string;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddTransactionContent = ({
  title,
  onOpenChange,
}: AddTransactionContentProps) => {
  const [state, formAction, isPending] = useActionState(addTransaction, {
    error: [],
    data: null,
  });

  const { transactionData, setErrorMessages } = useAddTransactionStore();
  const { selectedTracker } = useTrackerSelectionStore();
  const { revalidateTransactions } = useTrackerTransactionsPersist();

  const handleSubmit = async () => {
    const errors = new Map<string, string>();

    if (!transactionData.amount) {
      errors.set("amount", "Amount cannot be empty");
    }

    if (!selectedTracker) {
      errors.set("amount", "You must select a tracker first!");
    }

    if (!transactionData.description) {
      errors.set("description", "Description cannot be empty");
    }

    if (!transactionData.type) {
      errors.set("type", "Type cannot be empty");
    }

    if (
      errors.has("amount") ||
      errors.has("description") ||
      errors.has("type")
    ) {
      setErrorMessages({
        amount: errors.get("amount") || "",
        description: errors.get("description") || "",
        type: errors.get("type") || "",
      });
      return;
    }

    if (
      transactionData.amount &&
      transactionData.description &&
      transactionData.type &&
      selectedTracker
    ) {
      const formData = new FormData();

      formData.append("tracker_id", String(selectedTracker));
      formData.append("amount", String(transactionData.amount));
      formData.append("description", transactionData.description);
      formData.append("type", transactionData.type);

      formAction(formData);
    }
  };

  useEffect(() => {
    if (state.data && isPending) {
      revalidateTransactions();
      onOpenChange(false);
    }
  }, [state.data, isPending, revalidateTransactions]);

  return (
    <DrawerContent
      className="min-h-[95vh] h-[calc(100%-3vh)] max-h-[97vh] bg-accent"
      barClassName="bg-muted-foreground/10"
    >
      <DrawerHeader className="pb-0">
        <DrawerTitle>{title}</DrawerTitle>
      </DrawerHeader>
      <form
        action={handleSubmit}
        className="grow min-h-0 h-[inherit] max-h-full flex flex-col px-4 pt-3 pb-8 overflow-auto"
      >
        <TransactionFormBody />
        <DrawerFooter className="p-0">
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="animate-spin" />}
            Confirm
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </form>
    </DrawerContent>
  );
};

export default AddTransactionContent;

const TransactionFormBody = () => {
  const {
    transactionData,
    setAmount,
    setDescription,
    setType,
    errorMessages,
    setAmountError,
    setDescriptionError,
    setTypeError,
  } = useAddTransactionStore();
  const { getOneTracker } = useTrackerPersist();
  const { selectedTracker } = useTrackerSelectionStore();
  const trackerData = getOneTracker(selectedTracker);

  const validateAmount = (value: string, maxAmount: number = 99999999.99) => {
    const validPattern = /^\d*\.?\d{0,2}$/;
    return validPattern.test(value) && parseFloat(value) <= maxAmount;
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value.includes("-")) {
      value = value.replace("-", "");
    }

    if (value === "" || validateAmount(value)) {
      setAmount(value);
    }

    if (transactionData.type === "expense" && trackerData) {
      if (parseFloat(String(value)) > trackerData.amount) {
        console.log("value: ", value);
        setAmountError("Amount exceeds tracker balance");
      } else {
        console.log("here: ", transactionData.amount);
        setAmountError("");
      }
    }
  };

  return (
    <div className="min-h-0 h-[inherit] max-h-full">
      <ScrollArea className="min-h-0 h-[inherit] max-h-full">
        <div className="flex flex-col gap-4">
          <TrackerSelection />
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between ps-2">
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={transactionData.type}
                    onValueChange={(value: TTrackerTransactionType) => {
                      setType(value);
                      setTypeError("");

                      if (value === "expense" && trackerData) {
                        if (
                          parseFloat(String(transactionData.amount)) >
                          trackerData.amount
                        ) {
                          setAmountError("Amount exceeds tracker balance");
                        }
                      } else {
                        if (
                          errorMessages.amount ===
                          "Amount exceeds tracker balance"
                        ) {
                          setAmountError("");
                        }
                      }
                    }}
                  >
                    <SelectTrigger
                      id="type"
                      className="w-1/2"
                      error={!!errorMessages.type}
                      errorMessage={errorMessages.type}
                    >
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="expense">Expense</SelectItem>
                      <SelectItem value="income">Income</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <LabelInput
                  label="Amount"
                  name="amount"
                  type="tel"
                  placeholder="Enter amount of your transaction"
                  inputMode="decimal"
                  step="0.01"
                  value={transactionData.amount}
                  onChange={(e) => {
                    handleAmountChange(e);
                  }}
                  error={!!errorMessages.amount}
                  errorMessage={errorMessages.amount}
                  disabled={!selectedTracker}
                />
                <LabelTextArea
                  label="Description"
                  className="h-32"
                  name="description"
                  placeholder="Eg. 'Bought a new phone'"
                  value={transactionData.description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setDescriptionError("");
                  }}
                  error={!!errorMessages.description}
                  errorMessage={errorMessages.description}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};

const TrackerSelection = () => {
  const { trackers, getOneTracker } = useTrackerPersist();
  const { selectedTracker, drawerState, setDrawerState } =
    useTrackerSelectionStore();
  const { setAmountError } = useAddTransactionStore();
  const currentTracker = getOneTracker(selectedTracker);

  useEffect(() => {
    console.log(selectedTracker);
    if (selectedTracker) {
      setAmountError("");
    }
  }, [selectedTracker, setAmountError]);

  return (
    <DrawerNested open={drawerState} onOpenChange={setDrawerState}>
      <DrawerTrigger className="w-full">
        {currentTracker ? (
          <Tracker tracker={currentTracker} noTranslateAnimate />
        ) : (
          <div className="bg-background/50 text-muted-foreground flex items-center justify-center border-2 border-border border-dashed rounded-md p-4 h-44">
            Select a tracker
          </div>
        )}
      </DrawerTrigger>
      <DrawerContent className="h-[calc(100%-5vh)] bg-accent px-4">
        <DrawerHeader>
          <DrawerTitle>Select Tracker</DrawerTitle>
        </DrawerHeader>
        <ScrollArea className="grow min-h-0 h-[inherit] max-h-full">
          <Trackers
            trackers={trackers}
            className="grow min-h-0 h-full"
            isSelection
          />
        </ScrollArea>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button>Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </DrawerNested>
  );
};
