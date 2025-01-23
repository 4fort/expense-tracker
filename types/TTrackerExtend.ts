import { TTracker } from "./TTracker";

export type TTrackerExtend = Omit<TTracker, "created_at"> & {
  start_date: string;
  due_date: string;
  goal_amount: number;
  created_at: string;
};
