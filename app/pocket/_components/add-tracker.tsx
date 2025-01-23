"use client";

import LabelInput from "@/components/label-input";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerNested,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Plus, TriangleAlert } from "lucide-react";
import React, { memo, useState } from "react";
import { DynamicIcon, IconName } from "lucide-react/dynamic";
import { cn, formatter, getCurrentDay } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "next-themes";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { AnimatePresence, cubicBezier, motion } from "motion/react";
import { Label } from "@/components/ui/label";

interface ITrackerData {
  name: string;
  amount: number | string;
  icon: IconName;
  color: TTrackerColors;
  start_date?: string;
  due_date?: string;
  goal_amount?: number | string;
}

type TTrackerColors =
  | "green"
  | "sky"
  | "rose"
  | "orange"
  | "yellow"
  | "violet"
  | "slate";

const iconList: { name: IconName; category: string }[] = [
  { name: "piggy-bank", category: "finance" },
  { name: "hand-coins", category: "finance" },
  { name: "wallet", category: "finance" },
  { name: "wallet-minimal", category: "finance" },
  { name: "goal", category: "goal" },
  { name: "target", category: "goal" },
  { name: "circle-plus", category: "goal" },
  { name: "crosshair", category: "goal" },
  { name: "laptop", category: "electronics" },
  { name: "laptop-minimal", category: "electronics" },
  { name: "smartphone", category: "electronics" },
  { name: "headphones", category: "electronics" },
  { name: "headset", category: "electronics" },
  { name: "notebook", category: "stationery" },
  { name: "notebook-tabs", category: "stationery" },
  { name: "notebook-pen", category: "stationery" },
  { name: "party-popper", category: "celebration" },
  { name: "cake", category: "celebration" },
  { name: "cake-slice", category: "celebration" },
  { name: "sparkle", category: "celebration" },
  { name: "gift", category: "celebration" },
  { name: "flower", category: "nature" },
  { name: "flower-2", category: "nature" },
  { name: "leaf", category: "nature" },
  { name: "shirt", category: "clothing" },
  { name: "washing-machine", category: "appliance" },
  { name: "microwave", category: "appliance" },
  { name: "shopping-bag", category: "shopping" },
  { name: "shopping-cart", category: "shopping" },
  { name: "credit-card", category: "finance" },
  { name: "dollar-sign", category: "finance" },
  { name: "coins", category: "finance" },
  { name: "receipt", category: "finance" },
  { name: "chart-line", category: "finance" },
  { name: "chart-pie", category: "finance" },
  { name: "chart-bar", category: "finance" },
  { name: "calculator", category: "finance" },
  { name: "briefcase", category: "work" },
  { name: "home", category: "real-estate" },
  { name: "car", category: "transportation" },
  { name: "plane", category: "transportation" },
  { name: "train", category: "transportation" },
  { name: "bus", category: "transportation" },
  { name: "book", category: "education" },
  { name: "graduation-cap", category: "education" },
  { name: "medal", category: "achievement" },
  { name: "trophy", category: "achievement" },
  { name: "camera", category: "photography" },
  { name: "music", category: "entertainment" },
  { name: "film", category: "entertainment" },
  { name: "gamepad", category: "entertainment" },
  { name: "palette", category: "art" },
  { name: "brush", category: "art" },
  { name: "hammer", category: "tools" },
  { name: "wrench", category: "tools" },
  { name: "lightbulb", category: "ideas" },
  { name: "plug", category: "electronics" },
  { name: "battery", category: "electronics" },
  { name: "phone", category: "electronics" },
  { name: "tablet", category: "electronics" },
  { name: "printer", category: "electronics" },
  { name: "tv", category: "electronics" },
  { name: "watch", category: "accessories" },
  { name: "glasses", category: "accessories" },
  { name: "umbrella", category: "accessories" },
  { name: "key", category: "security" },
  { name: "lock", category: "security" },
  { name: "map", category: "navigation" },
  { name: "compass", category: "navigation" },
  { name: "globe", category: "navigation" },
  { name: "shopping-basket", category: "shopping" },
  { name: "box", category: "logistics" },
  { name: "package", category: "logistics" },
  { name: "truck", category: "logistics" },
  { name: "ship", category: "logistics" },
  { name: "rocket", category: "transportation" },
];

const iconCategories = Array.from(
  new Set(iconList.map((icon) => icon.category))
);

const colorList: TTrackerColors[] = [
  "green",
  "sky",
  "rose",
  "orange",
  "yellow",
  "violet",
  "slate",
];

type Props = {
  isTrackerEmpty: boolean;
  isFreeUser: boolean;
};

const AddTracker = ({ isTrackerEmpty: isPocketEmpty, isFreeUser }: Props) => {
  return (
    <Drawer repositionInputs={false}>
      <DrawerTrigger asChild>
        {isPocketEmpty ? (
          <button className="h-48 p-4 flex flex-col items-center justify-center rounded-md border-2 border-border border-dashed">
            <p className="text-muted-foreground">
              This is where you can view and keep track on your Budget, Savings,
              and even Goals!
            </p>

            <Plus className="my-4" />
            <p>Click here to add one!</p>
            {isFreeUser && (
              <p className="text-muted-foreground flex items-center gap-2">
                <TriangleAlert className="h-4 w-4" /> You can only add one
                tracker as a free user.
              </p>
            )}
          </button>
        ) : (
          <Button
            className="absolute bottom-24 right-0 left-0 mx-auto w-28 rounded-full"
            size="lg"
          >
            <Plus />
          </Button>
        )}
      </DrawerTrigger>
      <DrawerContent
        className="min-h-[95vh] h-[97vh] max-h-[97vh] bg-accent"
        barClassName="bg-muted-foreground/10"
        // ref={formContainerRef}
      >
        <DrawerHeader>
          <DrawerTitle>Add Tracker</DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <form className="flex-grow flex flex-col p-4 overflow-auto">
          <TrackerFormBody />
          <DrawerFooter className="p-0">
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default AddTracker;

type FormInputProps = {
  trackerData: ITrackerData;
  setTrackerData: React.Dispatch<React.SetStateAction<ITrackerData>>;
};

const TrackerFormBody = () => {
  const [trackerData, setTrackerData] = useState<ITrackerData>({
    name: "",
    amount: "",
    icon: "piggy-bank",
    color: "green",
    start_date: "",
    due_date: "",
    goal_amount: "",
  });

  return (
    <div className="flex flex-col gap-4">
      <TrackerPreview trackerData={trackerData} />
      <ScrollArea className="max-h-[40vh] overflow-y-auto">
        <div className="grow flex flex-col gap-2">
          <NameColorIconInputForm
            trackerData={trackerData}
            setTrackerData={setTrackerData}
          />
          <AmountInputForm
            trackerData={trackerData}
            setTrackerData={setTrackerData}
          />
        </div>
      </ScrollArea>
    </div>
  );
};

const NameColorIconInputForm = memo(
  ({ trackerData, setTrackerData }: FormInputProps) => {
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const maxChars = 14;
      if (e.target.value.length <= maxChars) {
        setTrackerData({ ...trackerData, name: e.target.value });
      }
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
          />
        </CardContent>
      </Card>
    );
  }
);
NameColorIconInputForm.displayName = "NameColorIconInputForm";

const AmountInputForm = memo(
  ({ trackerData, setTrackerData }: FormInputProps) => {
    const [isSetTarget, setIsSetTarget] = useState(false);

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
        const field = e.target.name;
        setTrackerData({ ...trackerData, [field]: value });
      }
    };
    return (
      <Card>
        <CardContent
          className={cn(
            "pt-4 flex flex-col gap-2 h-auto",
            isSetTarget ? "pb-4" : "pb-3"
          )}
        >
          <LabelInput
            label="Initial Amount"
            name="amount"
            type="tel"
            placeholder="Enter starting amount of your savings"
            inputMode="decimal"
            value={trackerData.amount}
            step="0.01"
            onChange={handleAmountChange}
          />
          <div className="flex items-center justify-between ps-2">
            <Label htmlFor="target-switch">Set a target</Label>
            <Switch
              id="target-switch"
              size="md"
              checked={isSetTarget}
              onCheckedChange={(e) => {
                setTrackerData({ ...trackerData, goal_amount: "" });
                setIsSetTarget(e);
              }}
              aria-label="Toggle target amount input"
            />
          </div>
          <div className="h-auto grow">
            <AnimatePresence>
              {isSetTarget && (
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
                  className="h-0"
                >
                  <LabelInput
                    label="Target Amount"
                    name="goal_amount"
                    type="tel"
                    placeholder="Enter target amount"
                    inputMode="decimal"
                    value={trackerData.goal_amount}
                    step="0.01"
                    onChange={handleAmountChange}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    );
  }
);
AmountInputForm.displayName = "AmountInputForm";

const TrackerPreview = ({ trackerData }: { trackerData: ITrackerData }) => {
  const { resolvedTheme } = useTheme();

  return (
    <div
      className={cn(
        "w-full max-w-96 p-3 rounded-lg flex flex-col gap-2 font-semibold text-black",
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
          <div className="text-lg font-bold">{trackerData.name}</div>
        ) : (
          <div className="text-muted-foreground font-bold">Tracker Name</div>
        )}
      </div>
      <div className="grow">
        <div className="flex justify-between">
          <span
            className={cn(
              "text-muted-foreground",
              resolvedTheme === "dark" && "text-black/70"
            )}
          >
            Total expense:
          </span>
          <span className="font-semibold">0.00</span>
        </div>
        <div className="h-auto grow">
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
                    "text-muted-foreground",
                    resolvedTheme === "dark" && "text-black/70"
                  )}
                >
                  Target:
                </span>
                <span className="font-semibold">
                  {formatter.format(Number(trackerData.goal_amount))} /
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="grow flex justify-end items-end">
        <span className="text-5xl font-extrabold">
          {formatter.format(Number(trackerData.amount))}
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
          {formatter.format(Number(trackerData.amount))}
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
        <DrawerTrigger className="max-w-min border border-muted-foreground/80 rounded-sm-nested-outer p-0.5">
          <ColorIconPickerPreview
            className="w-10 h-10 rounded-sm"
            color={color}
            icon={icon}
          />
        </DrawerTrigger>
        <DrawerContent
          id={id}
          className="min-h-[90vh] h-[95vh] max-h-[95vh] bg-accent"
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
