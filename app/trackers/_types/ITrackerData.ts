import { IconName } from "lucide-react/dynamic";
import { TTrackerColors } from "./TTrackerColors";

export interface ITrackerData {
  name: string;
  amount: number | string;
  icon: IconName;
  color: TTrackerColors;
  start_date?: string;
  due_date?: string;
  goal_amount?: number | string;
}
