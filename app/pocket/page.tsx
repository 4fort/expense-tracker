"use client";

import Main from "@/components/main";
import TitleHeader from "@/components/title-header";
import React from "react";
import AddTracker from "./_components/add-tracker";
import useTrackerPersist from "@/hooks/useTrackerPersist";
import useAuthPersist from "@/hooks/useAuthPersist";
import { TTracker } from "@/types/TTracker";
import { cn, currency, datefmt } from "@/lib/utils";
import { useTheme } from "next-themes";
import { DynamicIcon } from "lucide-react/dynamic";
import { AnimatePresence, cubicBezier, motion } from "motion/react";

export default function PocketPage() {
  const { user } = useAuthPersist();
  const { trackers, isTrackerEmpty, loading } = useTrackerPersist();

  return (
    <div
      className="p-[inherit] min-h-screen h-[inherit] bg-accent overflow-y-auto"
      vaul-drawer-wrapper=""
    >
      <TitleHeader title="Pocket" className="bg-accent/30 backdrop-blur-md" />
      <Main className="flex flex-col">
        {!isTrackerEmpty && <Trackers trackers={trackers} />}
        <AddTracker
          isTrackerEmpty={isTrackerEmpty}
          isFreeUser={user?.plan === "free"}
          loading={loading}
        />
      </Main>
    </div>
  );
}

const Trackers = ({ trackers }: { trackers: TTracker[] }) => {
  return (
    <div className="grid grid-cols-1 gap-4 overflow-y-auto pb-14">
      {trackers
        .map((tracker, index) => (
          <Tracker key={tracker.id} tracker={tracker} index={index} />
        ))
        .reverse()}
    </div>
  );
};

const Tracker = ({ tracker, index }: { tracker: TTracker; index: number }) => {
  const { resolvedTheme } = useTheme();

  return (
    <AnimatePresence>
      <motion.div
        key={tracker.id}
        initial={{
          opacity: 0,
          filter: "blur(10px)",
          y: 30,
        }}
        animate={{
          opacity: 1,
          filter: "blur(0)",
          y: 0,
        }}
        exit={{
          opacity: 0,
          filter: "blur(10px)",
          y: 30,
        }}
        transition={{
          duration: 0.5,
          delay: index * 0.1,
          ease: cubicBezier(0.25, 0.1, 0.25, 1),
        }}
        className={cn(
          "w-full max-w-96 self-center p-3 rounded-lg flex flex-col gap-2 font-semibold text-black",
          resolvedTheme === "dark"
            ? `bg-${tracker.color}-300`
            : `bg-${tracker.color}-200`
        )}
      >
        <div className="grow flex items-center gap-4">
          <div
            className={cn(
              "w-12 h-12 p-2 bg-muted-foreground/15 rounded-full",
              `text-${tracker.color}-600`
            )}
          >
            <DynamicIcon className="w-full h-full" name={tracker.icon} />
          </div>
          {tracker.name ? (
            <div className="text-lg font-bold max-w-64 whitespace-nowrap overflow-hidden text-ellipsis">
              {tracker.name}
            </div>
          ) : (
            <div className="text-muted-foreground font-bold">Tracker Name</div>
          )}
        </div>
        <div className="grow">
          {(tracker.tracker_extensions?.due_date ||
            tracker.tracker_extensions?.start_date) && (
            <div
              className={cn(
                "flex",
                tracker.tracker_extensions.start_date
                  ? "gap-2 text-muted-foreground justify-end"
                  : "justify-between"
              )}
            >
              <span
                className={cn(
                  tracker.tracker_extensions.start_date
                    ? "font-bold"
                    : resolvedTheme === "dark"
                    ? "text-black/70"
                    : "text-muted-foreground"
                )}
              >
                {tracker.tracker_extensions.goal_amount
                  ? "Target Date"
                  : tracker.tracker_extensions.start_date &&
                    datefmt(new Date(tracker.tracker_extensions.start_date))
                      .short}
              </span>
              {tracker.tracker_extensions.start_date && " - "}
              <span className="font-bold">
                {tracker.tracker_extensions.due_date &&
                  datefmt(new Date(tracker.tracker_extensions.due_date)).short}
              </span>
            </div>
          )}
          {tracker.tracker_extensions?.goal_amount && (
            <div className="flex justify-between">
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
                {currency.format(
                  Number(tracker.tracker_extensions.goal_amount)
                )}{" "}
                /
              </span>
            </div>
          )}
        </div>
        <div className="grow flex justify-end items-end">
          <span className="text-5xl font-extrabold">
            {currency.format(Number(tracker.amount))}
          </span>
        </div>
        <div
          className={cn(
            "flex items-center justify-between rounded-md p-2 ps-4",
            `bg-${tracker.color}-100`,
            resolvedTheme === "dark" && `bg-${tracker.color}-200`
          )}
        >
          <span
            className={cn(
              "text-muted-foreground text-sm",
              resolvedTheme === "dark" && "text-black/70"
            )}
          >
            {tracker.latest_transaction &&
              datefmt(
                new Date(tracker.latest_transaction.created_at!)
              ).mediumTime()}
          </span>
          <div
            className={cn(
              "bg-slate-50 rounded-full p-1 px-2 leading-none",
              tracker.latest_transaction?.type === "expense" &&
                "text-destructive",
              (tracker.latest_transaction?.type === "income" ||
                tracker.latest_transaction?.type === "initial") &&
                "text-green-500"
            )}
          >
            <span>+</span>
            {tracker.latest_transaction &&
              currency.format(Number(tracker.latest_transaction.amount))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
