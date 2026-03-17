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
        {daysOrder.map(day => (
          <div key={day} className={styles.dayItem}>
            <h3 className={styles.dayHeader}>{day}</h3>
            {tasksByDay[day].length === 0 ? (
              <p className={styles.empty}>No tasks</p>
            ) : (
              <ul className={styles.taskList}>
                {tasksByDay[day].map(task => (
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
            )}
          </div>
        ))}
      </div>
    </div>
  );
}