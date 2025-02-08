"use client";

import LabelInput from "@/components/label-input";
import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerNested,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CalendarIcon, Loader2 } from "lucide-react";
import React, { memo, useActionState, useEffect, useState } from "react";
import { DynamicIcon, IconName } from "lucide-react/dynamic";
import { cn, currency, datefmt, getCurrentDay } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "next-themes";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { AnimatePresence, cubicBezier, motion } from "motion/react";
import { Label } from "@/components/ui/label";
import { Calendar, CalendarProps } from "@/components/ui/calendar";
import { AnimatedDiv } from "@/components/motion-div";
import { ITrackerData } from "../_types/ITrackerData";
import useTrackerPersist from "@/hooks/useTrackerPersist";
import { addTracker } from "../actions";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { colorList, iconCategories, iconList } from "./data";
import { TTracker } from "@/types/TTracker";

type AddTrackerContentProps = {
  trackerData: ITrackerData;
  setTrackerData: React.Dispatch<React.SetStateAction<ITrackerData>>;
  isNameValid: string;
  setIsNameValid: React.Dispatch<React.SetStateAction<string>>;
  isAmountValid: string;
  setIsAmountValid: React.Dispatch<React.SetStateAction<string>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddTrackerContent = ({
  trackerData,
  setTrackerData,
  isNameValid,
  setIsNameValid,
  isAmountValid,
  setIsAmountValid,
  // isOpen,
  setIsOpen,
}: AddTrackerContentProps) => {
  const handleSubmit = async () => {
    console.log(trackerData);
    if (!trackerData.name) {
      setIsNameValid("Name is required");
    } else {
      setIsNameValid("");
    }

    if (!trackerData.amount) {
      setIsAmountValid("Amount is required");
      return;
    } else {
      setIsAmountValid("");
    }

    if (trackerData.amount && trackerData.name) {
      const formData = new FormData();
      formData.append("name", trackerData.name);
      formData.append("amount", trackerData.amount.toString());
      formData.append("icon", trackerData.icon);
      formData.append("color", trackerData.color);
      formData.append("start_date", trackerData.start_date ?? "");
      formData.append("due_date", trackerData.due_date ?? "");
      formData.append(
        "goal_amount",
        trackerData.goal_amount ? trackerData.goal_amount.toString() : ""
      );

      formAction(formData);

      setTrackerData({
        name: "",
        amount: "",
        icon: "piggy-bank",
        color: "green",
        start_date: "",
        due_date: "",
        goal_amount: "",
      });
    }
  };

  const [state, formAction, isPending] = useActionState(addTracker, {
    error: [],
    data: null,
  });
  const { cacheOneTracker } = useTrackerPersist();

  useEffect(() => {
    if (state.data && !isPending) {
      console.log("Tracker added successfully");
      console.log(state);

      if (state.error.length <= 0) {
        cacheOneTracker(state.data as TTracker);
        setIsOpen(false);
      }
    }
  }, [state.data, isPending]);

  return (
    <DrawerContent
      className="min-h-[95vh] h-[calc(100%-3vh)] max-h-[97vh] bg-accent"
      barClassName="bg-muted-foreground/10"
    >
      <DrawerHeader className="relative none p-1 before:content-[''] before:w-full before:h-4 before:bg-gradient-to-b before:from-accent before:via-70% before:to-transparent before:absolute before:-bottom-4 before:left-0 before:z-10">
        <DrawerTitle className="sr-only">Add Tracker</DrawerTitle>
      </DrawerHeader>
      <form
        action={handleSubmit}
        className="h-full flex-grow flex flex-col gap-4 px-4 pt-3 pb-8 overflow-auto"
      >
        <TrackerFormBody
          trackerData={trackerData}
          setTrackerData={setTrackerData}
          isNameValid={isNameValid}
          setIsNameValid={setIsNameValid}
          isAmountValid={isAmountValid}
          setIsAmountValid={setIsAmountValid}
        />
        <DrawerFooter className="p-0">
          <Button type="submit" size="lg" disabled={isPending}>
            {isPending && <Loader2 className="animate-spin" />}
            {isPending ? "Adding tracker" : "Add Tracker"}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline" size="lg">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </form>
    </DrawerContent>
  );
};

export default AddTrackerContent;

type FormInputProps = {
  trackerData: ITrackerData;
  setTrackerData: React.Dispatch<React.SetStateAction<ITrackerData>>;
  isSetTarget?: boolean;
  setIsSetTarget?: React.Dispatch<React.SetStateAction<boolean>>;
  isDateEnabled?: boolean;
  setIsDateEnabled?: React.Dispatch<React.SetStateAction<boolean>>;
};

type FormNameInputProps = FormInputProps & {
  isNameValid: string;
  setIsNameValid: React.Dispatch<React.SetStateAction<string>>;
};

type FormAmountInputProps = FormInputProps & {
  isAmountValid: string;
  setIsAmountValid: React.Dispatch<React.SetStateAction<string>>;
};

const TrackerFormBody = ({
  trackerData,
  setTrackerData,
  isNameValid,
  setIsNameValid,
  isAmountValid,
  setIsAmountValid,
}: FormInputProps & FormNameInputProps & FormAmountInputProps) => {
  const [isSetTarget, setIsSetTarget] = useState(false);
  const [isDateEnabled, setIsDateEnabled] = useState(false);

  return (
    <div className="h-full flex flex-col gap-4">
      <TrackerPreview trackerData={trackerData} isSetTarget={isSetTarget} />
      <ScrollArea
        className="max-h-min before:content-[''] before:w-full before:h-6 before:bg-gradient-to-b before:from-accent before:via-70% before:to-transparent before:absolute before:-top-0.5 before:left-0 before:z-10 after:content-[''] after:w-full after:h-6 after:bg-gradient-to-t after:from-accent after:via-70% after:to-transparent after:absolute after:-bottom-0.5 after:left-0 after:z-10"
        type="auto"
      >
        <div className="grow flex flex-col gap-2 py-4">
          <NameColorIconInputForm
            trackerData={trackerData}
            setTrackerData={setTrackerData}
            isNameValid={isNameValid}
            setIsNameValid={setIsNameValid}
          />
          <AmountInputForm
            trackerData={trackerData}
            setTrackerData={setTrackerData}
            isDateEnabled={isDateEnabled}
            isSetTarget={isSetTarget}
            setIsSetTarget={setIsSetTarget}
            isAmountValid={isAmountValid}
            setIsAmountValid={setIsAmountValid}
          />
          <AnimatePresence initial={false}>
            {!isSetTarget && (
              <AnimatedDiv>
                <DateInputForm
                  trackerData={trackerData}
                  setTrackerData={setTrackerData}
                  isSetTarget={isSetTarget}
                  isDateEnabled={isDateEnabled}
                  setIsDateEnabled={setIsDateEnabled}
                />
              </AnimatedDiv>
            )}
          </AnimatePresence>
        </div>
      </ScrollArea>
    </div>
  );
};

const NameColorIconInputForm = memo(
  ({
    trackerData,
    setTrackerData,
    isNameValid,
    setIsNameValid,
  }: FormNameInputProps) => {
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // const maxChars = 20;
      // if (e.target.value.length <= maxChars) {
      setIsNameValid("");
      setTrackerData({ ...trackerData, name: e.target.value });
      // }
    };
    return (
      <Card>
        <CardContent className="pt-4 flex flex-col gap-2">
          <ColorIconPicker
            trackerData={trackerData}
            setTrackerData={setTrackerData}
          />
          <LabelInput
            label="Name"
            name="name"
            placeholder="Enter tracker name"
            value={trackerData.name}
            onChange={handleNameChange}
            error={!!isNameValid}
            errorMessage={isNameValid}
          />
        </CardContent>
      </Card>
    );
  }
);
NameColorIconInputForm.displayName = "NameColorIconInputForm";

const AmountInputForm = memo(
  ({
    trackerData,
    setTrackerData,
    isSetTarget,
    setIsSetTarget,
    isDateEnabled,
    isAmountValid,
    setIsAmountValid,
  }: FormInputProps & FormAmountInputProps) => {
    const [isTargetAmountValid, setIsTargetAmountValid] = useState("");

    const validateAmount = (value: string, maxAmount: number = 99999999.99) => {
      const validPattern = /^\d*\.?\d{0,2}$/;
      return validPattern.test(value) && parseFloat(value) <= maxAmount;
    };

    const validateTargetAmount = (
      value: string,
      minAmount: number = Number(trackerData.amount)
    ) => {
      return parseFloat(value) > minAmount;
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;
      if (value.includes("-")) {
        value = value.replace("-", "");
      }

      if (value === "" || validateAmount(value)) {
        const field = e.target.name;
        setTrackerData({ ...trackerData, [field]: value });
        setIsAmountValid("");

        if (field === "goal_amount") {
          if (!validateTargetAmount(value)) {
            setIsTargetAmountValid(
              "Target amount must be greater than the initial amount"
            );
          } else {
            setIsTargetAmountValid("");
          }
        }
      }
    };

    const handleTargetDateChange = (date: Date | undefined) => {
      setTrackerData({
        ...trackerData,
        due_date: date ? date.toISOString() : "",
      });
    };
    return (
      <Card>
        <CardContent className={cn("pt-4 flex flex-col gap-4 h-auto")}>
          <LabelInput
            label="Initial Amount"
            name="amount"
            type="tel"
            placeholder="Enter starting amount of your savings"
            inputMode="decimal"
            value={trackerData.amount}
            step="0.01"
            onChange={handleAmountChange}
            error={!!isAmountValid}
            errorMessage={isAmountValid}
          />
          <AnimatePresence initial={false}>
            {!isDateEnabled && (
              <AnimatedDiv className="flex items-center justify-between ps-2">
                <Label htmlFor="target-switch">Set a target</Label>
                <Switch
                  id="target-switch"
                  size="md"
                  checked={isSetTarget}
                  onCheckedChange={(e) => {
                    if (!e)
                      setTrackerData({
                        ...trackerData,
                        goal_amount: "",
                        due_date: "",
                      });
                    setIsSetTarget!(e);
                  }}
                  aria-label="Toggle target amount input"
                  disabled={!trackerData.amount}
                />
              </AnimatedDiv>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {isSetTarget && (
              <AnimatedDiv className="h-0 flex flex-col gap-4">
                <LabelInput
                  label="Target Amount"
                  name="goal_amount"
                  type="tel"
                  placeholder="Enter target amount"
                  inputMode="decimal"
                  value={trackerData.goal_amount}
                  step="0.01"
                  onChange={handleAmountChange}
                  error={!!isTargetAmountValid}
                  errorMessage={isTargetAmountValid}
                />
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.2,
                    duration: 0.4,
                    ease: cubicBezier(0.25, 0.1, 0.25, 1),
                  }}
                  className="flex items-center justify-between ps-2"
                >
                  <Label htmlFor="target-date-picker">Target Date</Label>
                  <DatePicker
                    id="target-date-picker"
                    title="Select a target date"
                    startMonth={new Date()}
                    onValueChange={handleTargetDateChange}
                    disabled={!trackerData.goal_amount ? true : false}
                    defaultMonth={
                      trackerData.due_date
                        ? new Date(trackerData.due_date)
                        : undefined
                    }
                  />
                </motion.div>
              </AnimatedDiv>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    );
  }
);
AmountInputForm.displayName = "AmountInputForm";

const DateInputForm = memo(
  ({
    trackerData,
    setTrackerData,
    isDateEnabled,
    setIsDateEnabled,
  }: FormInputProps) => {
    const handleStartDateChange = (date: Date | undefined) => {
      setTrackerData({
        ...trackerData,
        start_date: date ? date.toISOString() : "",
      });
    };

    const handleEndDateChange = (date: Date | undefined) => {
      setTrackerData({
        ...trackerData,
        due_date: date ? date.toISOString() : "",
      });
    };

    useEffect(() => {
      if (!trackerData.start_date) {
        setTrackerData({
          ...trackerData,
          due_date: "",
        });
      }
    }, [trackerData.start_date]);

    return (
      <Card>
        <CardContent className="pt-4 flex flex-col gap-4">
          <div className="flex items-center justify-between ps-2">
            <Label htmlFor="date-toggle-switch">Add dates</Label>
            <Switch
              id="date-toggle-switch"
              size="md"
              checked={isDateEnabled}
              onCheckedChange={(e) => {
                setTrackerData({
                  ...trackerData,
                  start_date: "",
                  due_date: "",
                });
                setIsDateEnabled!(e);
              }}
              aria-label="Toggle target amount input"
            />
          </div>
          <AnimatePresence>
            {isDateEnabled && (
              <motion.div
                layout
                initial={{
                  opacity: 0,
                  filter: "blur(10px)",
                  y: -20,
                  height: 0,
                  marginTop: "-1rem",
                }}
                animate={{
                  opacity: 1,
                  filter: "blur(0)",
                  y: 0,
                  height: "auto",
                  marginTop: 0,
                }}
                exit={{
                  opacity: 0,
                  filter: "blur(10px)",
                  y: -20,
                  height: 0,
                  marginTop: "-1rem",
                }}
                transition={{
                  duration: 0.5,
                  ease: cubicBezier(0.25, 0.1, 0.25, 1),
                }}
                className="h-0 flex flex-col gap-4"
              >
                <div className="flex items-center justify-between ps-2">
                  <Label htmlFor="start-date-picker">Start Date</Label>
                  <DatePicker
                    id="start-date-picker"
                    title="Select a starting date"
                    onValueChange={handleStartDateChange}
                    defaultMonth={
                      trackerData.start_date
                        ? new Date(trackerData.start_date)
                        : undefined
                    }
                  />
                </div>
                <div className="flex items-center justify-between ps-2">
                  <Label htmlFor="end-date-picker">End Date</Label>
                  <DatePicker
                    id="end-date-picker"
                    title="Select an ending date"
                    onValueChange={handleEndDateChange}
                    disabled={!trackerData.start_date ? true : false}
                    hidden={[
                      {
                        before: trackerData.start_date
                          ? datefmt(trackerData.start_date).addOneDay()
                          : new Date(),
                      },
                    ]}
                    defaultMonth={
                      trackerData.due_date
                        ? new Date(trackerData.due_date)
                        : trackerData.start_date
                        ? new Date(trackerData.start_date)
                        : undefined
                    }
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    );
  }
);
DateInputForm.displayName = "DateInputForm";

const DatePicker = ({
  id,
  title,
  onValueChange,
  disabled = false,
  ...props
}: {
  id: string;
  title?: string;
  onValueChange: (date: Date | undefined) => void;
  disabled?: boolean;
} & CalendarProps) => {
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    onValueChange(date);
  }, [date]);

  return (
    <Dialog>
      <DialogTrigger asChild id={id} disabled={disabled}>
        <Button
          type="button"
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? datefmt(date).standardLong : <span>Pick a date</span>}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-auto rounded-lg bg-accent">
        <DialogHeader>
          <DialogTitle>{title ?? "Select a date"}</DialogTitle>
        </DialogHeader>
        {/* Original version is 8.10.1 */}
        <Calendar
          fixedWeeks
          {...props}
          startMonth={new Date()}
          mode="single"
          selected={date}
          onSelect={setDate}
          className="bg-background rounded-md shadow-sm"
        />
        <DialogFooter className="flex-row gap-2">
          <DialogClose asChild>
            <Button
              className="grow"
              type="button"
              variant="destructive"
              onClick={() => setDate(undefined)}
              disabled={!date}
            >
              Remove
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button className="grow" type="button" variant="outline">
              Confirm
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const TrackerPreview = ({
  trackerData,
  isSetTarget,
}: {
  trackerData: ITrackerData;
  isSetTarget: boolean;
}) => {
  const { resolvedTheme } = useTheme();

  return (
    <div
      className={cn(
        "w-full max-w-96 self-center p-3 rounded-lg flex flex-col gap-2 font-semibold text-black",
        resolvedTheme === "dark"
          ? `bg-${trackerData.color}-300`
          : `bg-${trackerData.color}-200`
      )}
    >
      <div className="grow flex items-center gap-4">
        <div
          className={cn(
            "w-12 h-12 p-2 bg-muted-foreground/15 rounded-full",
            `text-${trackerData.color}-600`
          )}
        >
          <DynamicIcon className="w-full h-full" name={trackerData.icon} />
        </div>
        {trackerData.name ? (
          <div className="text-lg font-bold max-w-64 whitespace-nowrap overflow-hidden text-ellipsis">
            {trackerData.name}
          </div>
        ) : (
          <div className="text-muted-foreground font-bold">Tracker Name</div>
        )}
      </div>
      <div className="grow">
        <AnimatePresence>
          {(trackerData.due_date || trackerData.start_date) && (
            <motion.div
              layout
              initial={{
                opacity: 0,
                filter: "blur(10px)",
                y: -20,
                height: 0,
              }}
              animate={{
                opacity: 1,
                filter: "blur(0)",
                y: 0,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                filter: "blur(10px)",
                y: -20,
                height: 0,
              }}
              transition={{
                duration: 0.5,
                ease: cubicBezier(0.25, 0.1, 0.25, 1),
              }}
              className={cn(
                "flex",
                trackerData.start_date
                  ? "gap-2 text-muted-foreground justify-end"
                  : "h-0 justify-between"
              )}
            >
              <span
                className={cn(
                  trackerData.start_date
                    ? "font-bold"
                    : resolvedTheme === "dark"
                    ? "text-black/70"
                    : "text-muted-foreground"
                )}
              >
                {isSetTarget
                  ? "Target Date"
                  : trackerData.start_date &&
                    datefmt(new Date(trackerData.start_date)).short}
              </span>
              {trackerData.start_date && " - "}
              <span className="font-bold">
                {trackerData.due_date &&
                  datefmt(new Date(trackerData.due_date)).short}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {trackerData.goal_amount && (
            <motion.div
              layout
              initial={{
                opacity: 0,
                filter: "blur(10px)",
                y: -20,
                height: 0,
              }}
              animate={{
                opacity: 1,
                filter: "blur(0)",
                y: 0,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                filter: "blur(10px)",
                y: -20,
                height: 0,
              }}
              transition={{
                duration: 0.5,
                ease: cubicBezier(0.25, 0.1, 0.25, 1),
              }}
              className="h-0 flex justify-between"
            >
              <span
                className={cn(
                  resolvedTheme === "dark"
                    ? "text-black/70"
                    : "text-muted-foreground"
                )}
              >
                Target Amount
              </span>
              <span className="font-semibold">
                {currency.format(Number(trackerData.goal_amount))} /
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="grow flex justify-end items-end">
        <span className="text-5xl font-extrabold">
          {currency.format(Number(trackerData.amount))}
        </span>
      </div>
      <div
        className={cn(
          "flex items-center justify-between rounded-md p-2 ps-4",
          `bg-${trackerData.color}-100`,
          resolvedTheme === "dark" && `bg-${trackerData.color}-200`
        )}
      >
        <span
          className={cn(
            "text-muted-foreground text-sm",
            resolvedTheme === "dark" && "text-black/70"
          )}
        >
          {getCurrentDay()}
        </span>
        <div className="bg-slate-50 text-green-500 rounded-full p-1 px-2 leading-none">
          <span>+</span>
          {currency.format(Number(trackerData.amount))}
        </div>
      </div>
    </div>
  );
};

const ColorIconPicker = ({ trackerData, setTrackerData }: FormInputProps) => {
  return (
    <div className="flex items-center justify-between ps-2">
      <Label htmlFor="icon-color-picker">Icon & Color</Label>
      <ColorIconPickerDrawer
        id="icon-color-picker"
        color={trackerData.color}
        icon={trackerData.icon}
        setColor={(color: ITrackerData["color"]) =>
          setTrackerData({ ...trackerData, color })
        }
        setIcon={(icon: ITrackerData["icon"]) =>
          setTrackerData({ ...trackerData, icon })
        }
      />
    </div>
  );
};

const ColorIconPickerDrawer = memo(
  ({
    id,
    color,
    icon,
    setColor,
    setIcon,
  }: {
    id: string;
    color: ITrackerData["color"];
    icon: ITrackerData["icon"];
    setColor: (color: ITrackerData["color"]) => void;
    setIcon: (icon: ITrackerData["icon"]) => void;
  }) => {
    return (
      <DrawerNested>
        <DrawerTrigger className="max-w-min border-2 border-muted-foreground/40 rounded-sm-nested-outer p-0.5">
          <ColorIconPickerPreview
            className="w-10 h-10 rounded-sm"
            color={color}
            icon={icon}
          />
        </DrawerTrigger>
        <DrawerContent
          id={id}
          className="min-h-[90vh] h-[calc(100%-5vh)] max-h-[95vh] bg-accent"
          barClassName="bg-muted-foreground/10"
        >
          <DrawerHeader className="relative">
            <DrawerTitle>Icon & Color</DrawerTitle>
            <DrawerClose asChild>
              <Button
                variant="ghost"
                className="absolute top-0 bottom-0 right-0 my-auto"
              >
                Done
              </Button>
            </DrawerClose>
          </DrawerHeader>
          <div className="grow flex flex-col p-4 pb-8 gap-4">
            <ColorIconPickerPreview color={color} icon={icon} />
            <div className="grow h-full min-h-[10vh] max-h-[10vh] flex items-center justify-evenly bg-card rounded-md">
              {colorList.map((colorName) => (
                <div
                  key={colorName}
                  className={cn(
                    "w-10 h-10 rounded-full p-0.5",
                    color === colorName && "border-2 border-muted-foreground/80"
                  )}
                >
                  <div
                    className={cn(
                      "w-full h-full rounded-full",
                      `bg-${colorName}-400`
                    )}
                    onClick={() => setColor(colorName)}
                  />
                </div>
              ))}
            </div>
            <ScrollArea className="grow h-full max-h-[52vh] overflow-y-auto px-4 bg-card rounded-md">
              <div className="grid grid-cols-4 gap-2 my-4">
                {iconCategories.map((category) => (
                  <div key={category} className="col-span-4">
                    <h2 className="font-extrabold capitalize">{category}</h2>
                    <div className="grid grid-cols-4 gap-2">
                      {iconList
                        .filter((icon) => icon.category === category)
                        .map((_icon) => (
                          <div
                            key={_icon.name}
                            className={cn(
                              "w-16 h-16 p-4 flex items-center justify-center m-auto rounded-md text-muted-foreground",
                              icon === _icon.name && "bg-muted-foreground/20"
                            )}
                            onClick={() => setIcon(_icon.name)}
                          >
                            <DynamicIcon
                              className="w-full h-full"
                              name={_icon.name}
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </DrawerContent>
      </DrawerNested>
    );
  }
);
ColorIconPickerDrawer.displayName = "ColorIconPickerDrawer";

const ColorIconPickerPreview = ({
  className,
  color,
  icon,
}: {
  className?: string;
  color: string;
  icon: IconName;
}) => {
  return (
    <div className="m-auto">
      <div
        className={cn(
          "w-20 h-20 p-2 rounded-lg",
          `bg-${color}-200 text-${color}-600`,
          className
        )}
      >
        <DynamicIcon className="w-full h-full" name={icon} />
      </div>
    </div>
  );
};
