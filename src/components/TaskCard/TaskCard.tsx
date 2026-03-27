"use client"

import { useState } from "react"
import { Task } from "@/types/task"
import styles from "./TaskCard.module.css"
import { useLanguage } from "@/contexts/LanguageContext"

type Props = {
  task: Task
  toggleTask: (id: string) => void
  deleteTask: (id: string) => void
  onEdit: (task: Task) => void
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>
}

export default function TaskCard({
  task,
  toggleTask,
  deleteTask,
  onEdit,
  dragHandleProps
}: Props) {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false)

  const formatTime = (minutes: number): string => {
    if (minutes < 60) return `${minutes}min`
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    if (remainingMinutes === 0) return `${hours}h`
    return `${hours}h${remainingMinutes}`
  }

  const handleEdit = () => {
    onEdit(task)
    setMenuOpen(false)
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.top}>
          
          <div className={styles.dragHandle} {...dragHandleProps}>
            ≡
          </div>

          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
            className={styles.checkbox}
            id={`task-${task.id}`}
            onClick={(e) => e.stopPropagation()}
          />

          <label
            htmlFor={`task-${task.id}`}
            className={`${styles.title} ${task.completed ? styles.done : ""}`}
          >
            {task.title}
          </label>
        </div>

        <button
          className={styles.menuBtn}
          onClick={(e) => {
            e.stopPropagation()
            setMenuOpen(!menuOpen)
          }}
        >
          ⋮
        </button>
      </div>

      {task.description && (
        <div className={styles.description}>
          {task.description}
        </div>
      )}

      {menuOpen && (
        <div className={styles.menu}>
          <button className={styles.editBtn} onClick={handleEdit}>
            {t('edit')}
          </button>
          <button
            className={styles.deleteBtn}
            onClick={(e) => {
              e.stopPropagation()
              deleteTask(task.id)
            }}
          >
            {t('delete')}
          </button>
        </div>
      )}

      <div className={styles.details}>
        <div className={styles.priority}>
          <span className={`${styles.priorityDot} ${styles[task.priority]}`} />
          <span>{t(task.priority)}</span>
        </div>
        <span className={styles.time}>{formatTime(task.estimatedTime)}</span>
      </div>
    </div>
  )
}