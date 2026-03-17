// task.ts
export type Day = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
export type Priority = "low" | "medium" | "high";

export type Task = {
  id: string;
  title: string;
  description?: string; // <-- novo campo opcional
  day: Day;
  priority: Priority;
  completed: boolean;
  estimatedTime: number;
  order?: number;
};