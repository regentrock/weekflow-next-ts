"use client";

import { Task, Day } from "@/types/task";
import styles from "./WeekOverview.module.css";

const daysOrder: Day[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

type Props = {
  tasks: Task[];
};

export default function WeekOverview({ tasks }: Props) {
  const tasksByDay = daysOrder.reduce((acc, day) => {
    acc[day] = tasks.filter(task => task.day === day);
    return acc;
  }, {} as Record<Day, Task[]>);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Week Overview</h2>
      <div className={styles.dayList}>
        {daysOrder.map(day => {
          const dayTasks = tasksByDay[day];
          return (
            <div key={day} className={styles.dayItem}>
              <div className={styles.dayHeader}>
                <span className={styles.dayName}>{day}</span>
                <span className={styles.dayCount}>{dayTasks.length}</span>
              </div>
              {dayTasks.length > 0 ? (
                <ul className={styles.taskList}>
                  {dayTasks.map(task => (
                    <li key={task.id} className={styles.taskItem}>
                      <span
                        className={`${styles.priorityDot} ${styles[task.priority]}`}
                      />
                      <span className={task.completed ? styles.completed : ""}>
                        {task.title}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className={styles.empty}>—</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}