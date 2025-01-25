import { TTracker } from "./TTracker";

export type TTrackerExtend = Omit<TTracker, "created_at"> & {
  start_date?: string | null;
  due_date: string;
  goal_amount?: number | null;
  created_at: string;
};

export type TTrackerExtension = {
  start_date: string | null;
  due_date: string;
  goal_amount: number | null;
  created_at: string;
};
