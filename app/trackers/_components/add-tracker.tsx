"use client";

import { MotionButton } from "@/components/ui/button";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { Plus, TriangleAlert } from "lucide-react";
import React, { useState } from "react";
import { ITrackerData } from "../_types/ITrackerData";
import AddTrackerContent from "./add-tracker-content";

type Props = {
  isTrackerEmpty: boolean;
  isFreeUser: boolean;
  loading: boolean;
};

const AddTracker = ({ isTrackerEmpty, isFreeUser, loading }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [trackerData, setTrackerData] = useState<ITrackerData>({
    name: "",
    amount: "",
    icon: "piggy-bank",
    color: "green",
    start_date: "",
    due_date: "",
    goal_amount: "",
  });
  const [isNameValid, setIsNameValid] = useState("");
  const [isAmountValid, setIsAmountValid] = useState("");

  return (
    <Drawer
      repositionInputs={false}
      open={isOpen}
      onOpenChange={setIsOpen}
      onAnimationEnd={() => {
        setTrackerData({
          name: "",
          amount: "",
          icon: "piggy-bank",
          color: "green",
          start_date: "",
          due_date: "",
          goal_amount: "",
        });
        setIsNameValid("");
        setIsAmountValid("");
      }}
    >
      <DrawerTrigger asChild>
        {loading ? (
          <button disabled className="grid grid-cols-1 gap-4">
            {[0, 1, 2]
              .map((_, index) => (
                <div
                  key={index}
                  className="w-full max-w-96 h-52 bg-muted-foreground/20 rounded-md animate-pulse"
                  style={{ opacity: index / 3 }}
                />
              ))
              .reverse()}
          </button>
        ) : isTrackerEmpty ? (
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
          <MotionButton
            className="absolute bottom-24 right-0 left-0 mx-auto w-28 rounded-full"
            size="lg"
            variant="floating"
            initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
            animate={{
              scale: 1,
              opacity: 1,
              filter: "blur(0)",
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 0.6,
              filter: { duration: 0.4 },
            }}
          >
            <Plus />
          </MotionButton>
        )}
      </DrawerTrigger>
      <AddTrackerContent
        trackerData={trackerData}
        setTrackerData={setTrackerData}
        isNameValid={isNameValid}
        isAmountValid={isAmountValid}
        setIsNameValid={setIsNameValid}
        setIsAmountValid={setIsAmountValid}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </Drawer>
  );
};

export default AddTracker;
