import { TTracker } from "./TTracker";

export type TTrackerExtend = TTracker & {
  start_date: string;
  due_date: string;
  goal_amount: number;
};
