export type Day = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday"
export type Priority = "low" | "medium" | "high"

// types/task.ts
export type Task = {
  id: string
  title: string
  day: Day
  priority: Priority
  completed: boolean
  estimatedTime: number
  order?: number
}