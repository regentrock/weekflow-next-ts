"use client"

import { useState } from "react"
import { Task } from "@/types/task"
import styles from "./TaskCard.module.css"
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

type Props = {
  task: Task
  toggleTask: (id: string) => void
  deleteTask: (id: string) => void
}

export default function TaskCard({ task, toggleTask, deleteTask }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? 'grabbing' : 'grab'
  }

  const formatTime = (minutes: number): string => {
    if (minutes < 60) return `${minutes}min`
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    if (remainingMinutes === 0) return `${hours}h`
    return `${hours}h${remainingMinutes}`
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={styles.card}
    >
      <div className={styles.header}>
        <div className={styles.top}>
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
          aria-label="Opções da tarefa"
        >
          ⋮
        </button>
      </div>

      {menuOpen && (
        <div className={styles.menu}>
          <button
            className={styles.deleteBtn}
            onClick={(e) => {
              e.stopPropagation()
              deleteTask(task.id)
            }}
          >
            Excluir
          </button>
        </div>
      )}

      <div className={styles.details}>
        <div className={styles.priority}>
          <span className={`${styles.priorityDot} ${styles[task.priority]}`} />
          <span>{task.priority}</span>
        </div>
        <span className={styles.time}>{formatTime(task.estimatedTime)}</span>
      </div>
    </div>
  )
}