import { TTrackerColors } from "@/app/trackers/_types/TTrackerColors";
import { IconName } from "lucide-react/dynamic";
import { TTrackerExtension } from "./TTrackerExtend";
import { TTrackerTransaction } from "./TTrackerTransaction";

export type TTracker = {
  id: number;
  name: string;
  icon: IconName;
  amount: number;
  color: TTrackerColors;
  created_at: string;
  tracker_extensions: TTrackerExtension | null;
  tracker_transactions: TTrackerTransaction[];
  latest_transaction: TTrackerTransaction | null;
};
