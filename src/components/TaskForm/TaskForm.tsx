"use client"

import { useState } from "react"
import { Day, Priority, Task } from "@/types/task"
import styles from "./TaskForm.module.css"

type Props = {
  addTask: (task: Task) => void
  onCancel: () => void
}

const days: Day[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
]

export default function TaskForm({ addTask, onCancel }: Props) {
  const [title, setTitle] = useState("")
  const [day, setDay] = useState<Day>("Monday")
  const [priority, setPriority] = useState<Priority>("medium")
  const [completed, setCompleted] = useState(false)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(30)
  const [error, setError] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) {
      setError("The title is required")
      return
    }
    setError("")

    if (minutes < 0 || minutes > 59) {
      setError("Minutes must be between 0 and 59")
      return
    }

    const totalMinutes = hours * 60 + minutes

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      day,
      priority,
      completed,
      estimatedTime: totalMinutes
    }

    addTask(newTask)
  }

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      onCancel()
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      onCancel()
    }
  }

  return (
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h3>Add Task</h3>

          <div className={styles.field}>
            <label htmlFor="title">Título</label>
            <input
              id="title"
              type="text"
              placeholder="Ex.: Business meeting"
              value={title}
              onChange={e => setTitle(e.target.value)}
              autoFocus
              className={error ? styles.error : ""}
            />
            {error && <span className={styles.errorMessage}>{error}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="day">Day</label>
            <select
              id="day"
              value={day}
              onChange={e => setDay(e.target.value as Day)}
            >
              {days.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              value={priority}
              onChange={e => setPriority(e.target.value as Priority)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="hours">Hours (Duration)</label>
              <input
                id="hours"
                type="number"
                min="0"
                value={hours}
                onChange={e => setHours(Math.max(0, parseInt(e.target.value) || 0))}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="minutes">Minutes</label>
              <input
                id="minutes"
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={e => setMinutes(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
              />
            </div>
          </div>

          <div className={styles.actions}>
            <button type="submit">Add</button>
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}