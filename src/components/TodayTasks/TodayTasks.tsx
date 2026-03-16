"use client"

import { Task, Day } from "@/types/task"
import styles from "./TodayTasks.module.css"

type Props = {
  tasks: Task[]
}

export default function TodayTasks({ tasks }: Props) {
  const days: Day[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]

  const today: Day = days[new Date().getDay()]
  const todayTasks = tasks.filter(task => task.day === today)
  const completed = todayTasks.filter(task => task.completed).length
  const total = todayTasks.length
  const progressPercentage = total > 0 ? (completed / total) * 100 : 0

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h3 className={styles.title}>Today's tasks</h3>
        <span className={styles.day}>{today}</span>
      </div>

      {total > 0 ? (
        <div className={styles.progress}>
          <span className={styles.stats}>
            <strong>{completed}</strong>/{total}
          </span>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progressPercentage}%` }}
              role="progressbar"
              aria-valuenow={progressPercentage}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      ) : (
        <span className={styles.empty}>No tasks</span>
      )}
    </div>
  )
}