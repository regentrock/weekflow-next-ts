"use client"

import { Task, Day } from "@/types/task"
import styles from "./TodayTasks.module.css"
import { TfiTimer } from "react-icons/tfi";
import { useLanguage } from "@/contexts/LanguageContext";

type Props = {
  tasks: Task[]
}

export default function TodayTasks({ tasks }: Props) {
  const { t } = useLanguage();
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

  const totalEstimatedTime = todayTasks.reduce((sum, task) => sum + task.estimatedTime, 0)
  const completedEstimatedTime = todayTasks
    .filter(task => task.completed)
    .reduce((sum, task) => sum + task.estimatedTime, 0)

  const formatTime = (minutes: number): string => {
    if (minutes < 60) return `${minutes}min`
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    if (remainingMinutes === 0) return `${hours}h`
    return `${hours}h${remainingMinutes}`
  }

  const dayKey = today.toLowerCase();
  const translatedDay = t(dayKey);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h3 className={styles.title}>{t('todayTasks')}</h3>
        <span className={styles.day}>{translatedDay}</span>
      </div>

      {total > 0 ? (
        <div className={styles.progress}>
          <div className={styles.stats}>
            <span className={styles.count}>
              <strong>{completed}</strong>/{total}
            </span>
            <span className={styles.percentage}>({Math.round(progressPercentage)}%)</span>
          </div>
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
          {totalEstimatedTime > 0 && (
            <div className={styles.timeInfo}>
              <span><TfiTimer /> {formatTime(completedEstimatedTime)} / {formatTime(totalEstimatedTime)}</span>
            </div>
          )}
        </div>
      ) : (
        <span className={styles.empty}>{t('noTasksToday')}</span>
      )}
    </div>
  )
}