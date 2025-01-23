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
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Plus, TriangleAlert } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Label } from "@/components/ui/label";
import { DynamicIcon, IconName } from "lucide-react/dynamic";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  isTrackerEmpty: boolean;
  isFreeUser: boolean;
};

const AddTracker = ({ isTrackerEmpty: isPocketEmpty, isFreeUser }: Props) => {
  const formContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (formContainerRef.current) {
        formContainerRef.current.style.setProperty(
          "bottom",
          `env(safe-area-inset-bottom)`
        );
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleResize);
      handleResize(); // Initial call in case the keyboard is already open
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", handleResize);
      }
    };
  }, []);
  return (
    <Drawer>
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
      <DrawerContent className="min-h-[90vh]" ref={formContainerRef}>
        <DrawerHeader>
          <DrawerTitle>Add Tracker</DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <form className="flex-grow flex flex-col">
          <TrackerFormBody />
          <DrawerFooter>
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

const TrackerFormBody = () => {
  // const [trackerType, setTrackerType] = useState<string>("");
  const [color, setColor] = useState<string>("green");
  const [icon, setIcon] = useState<IconName>("piggy-bank");
  return (
    <div className="p-4 flex flex-col gap-2" vaul-drawer-wrapper="">
      <LabelInput label="Name" name="name" placeholder="Enter tracker name" />
      <LabelInput
        label="Amount"
        name="amount"
        type="number"
        placeholder="Enter amount to track"
      />
      <ColorIconPicker
        setColor={setColor}
        color={color}
        setIcon={setIcon}
        icon={icon}
      />
      {/* <div className="flex justify-between items-center">
        <span className="pl-4">
          <Label htmlFor="type">Type</Label>
        </span>
        <Select onValueChange={setTrackerType} defaultValue={trackerType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tracker type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="savings">Savings</SelectItem>
            <SelectItem value="budget">Budget</SelectItem>
            <SelectItem value="goal">Goal</SelectItem>
          </SelectContent>
        </Select>
      </div> */}
    </div>
  );
};

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
const colorList = [
  "green",
  "sky",
  "rose",
  "orange",
  "yellow",
  "violet",
  "slate",
];

const ColorIconPicker = ({
  color,
  icon,
  setColor,
  setIcon,
}: {
  color: string;
  icon: IconName;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  setIcon: React.Dispatch<React.SetStateAction<IconName>>;
}) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size="lg">
          <Plus />
        </Button>
      </DrawerTrigger>
      <DrawerContent
        className="min-h-[85vh] bg-accent"
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
          <div className="m-auto">
            <div
              className={cn(
                "w-20 h-20 p-2 rounded-lg",
                `bg-${color}-200 text-${color}-600`
              )}
            >
              <DynamicIcon className="w-full h-full" name={icon as IconName} />
            </div>
          </div>
          <div className="grow h-full max-h-[10vh] flex items-center justify-evenly bg-card rounded-md">
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
          <ScrollArea className="grow h-full max-h-[50vh] overflow-y-auto p-4 bg-card rounded-md">
            <div className="grid grid-cols-4 gap-2">
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
              {/* {iconList.map((_icon) => (
                <div
                  key={_icon.name}
                  className={cn(
                    "w-16 h-16 p-4 flex items-center justify-center m-auto rounded-md text-muted-foreground",
                    icon === _icon.name && "bg-muted-foreground/20"
                  )}
                  onClick={() => setIcon(_icon.name)}
                >
                  <DynamicIcon className="w-full h-full" name={_icon.name} />
                </div>
              ))} */}
            </div>
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
