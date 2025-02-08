import { useTrackerSelectionStore } from "@/app/transactions/_store/useTrackerSelectionStore";
import { cn, currency, datefmt } from "@/lib/utils";
import { TTracker } from "@/types/TTracker";
import { DynamicIcon } from "lucide-react/dynamic";
import { AnimatePresence, cubicBezier, motion } from "motion/react";
import { useTheme } from "next-themes";

const Trackers = ({
  trackers,
  className,
  isSelection = false,
}: {
  trackers: TTracker[];
  className?: string;
  isSelection?: boolean;
}) => {
  return (
    <div className={cn("grid grid-cols-1 gap-4 overflow-y-auto", className)}>
      {trackers
        .map((tracker, index) => (
          <Tracker
            key={tracker.id}
            tracker={tracker}
            index={index}
            isSelection={isSelection}
          />
        ))
        .reverse()}
    </div>
  );
};

export default Trackers;

export const Tracker = ({
  tracker,
  index = 0,
  isSelection = false,
  noTranslateAnimate = false,
}: {
  tracker: TTracker;
  index?: number;
  isSelection?: boolean;
  noTranslateAnimate?: boolean;
}) => {
  const { resolvedTheme } = useTheme();
  const { selectedTracker, setSelectedTracker } = useTrackerSelectionStore();

  return (
    <AnimatePresence>
      <motion.div
        key={tracker.id}
        initial={{
          opacity: 0,
          filter: "blur(10px)",
          y: noTranslateAnimate ? 0 : 30,
        }}
        animate={{
          opacity: 1,
          filter: "blur(0)",
          y: 0,
        }}
        exit={{
          opacity: 0,
          filter: "blur(10px)",
          y: noTranslateAnimate ? 0 : 30,
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
            : `bg-${tracker.color}-200`,
          isSelection &&
            selectedTracker === tracker.id &&
            `relative before:absolute before:inset-0 before:rounded-lg before:content-[''] before:bg-accent before:opacity-40 before:animate-pulse
               after:absolute after:inset-0 after:w-10 after:h-10 after:m-auto after:bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNpcmNsZS1jaGVjayI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48cGF0aCBkPSJtOSAxMiAyIDIgNC00Ii8+PC9zdmc+")] after:bg-no-repeat after:bg-center after:bg-contain`
        )}
        onClick={() => {
          if (isSelection) {
            setSelectedTracker(tracker.id);
          }
        }}
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
            {tracker.latest_transaction?.type === "expense" ? (
              <span>-</span>
            ) : (
              <span>+</span>
            )}
            {tracker.latest_transaction &&
              currency.format(Number(tracker.latest_transaction.amount))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
