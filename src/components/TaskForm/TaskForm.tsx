"use client"

import { useState, useEffect } from "react"
import { Day, Priority, Task } from "@/types/task"
import styles from "./TaskForm.module.css"

type Props = {
  addTask: (task: Task) => void
  onCancel: () => void
  editingTask?: Task | null // tarefa para edição
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

export default function TaskForm({ addTask, onCancel, editingTask }: Props) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [day, setDay] = useState<Day>("Monday")
  const [priority, setPriority] = useState<Priority>("medium")
  const [completed, setCompleted] = useState(false)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(30)
  const [error, setError] = useState("")

  // Preencher formulário se estiver editando
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title)
      setDescription(editingTask.description || "")
      setDay(editingTask.day)
      setPriority(editingTask.priority)
      setCompleted(editingTask.completed)
      const total = editingTask.estimatedTime
      setHours(Math.floor(total / 60))
      setMinutes(total % 60)
    } else {
      // Reset para valores padrão
      setTitle("")
      setDescription("")
      setDay("Monday")
      setPriority("medium")
      setCompleted(false)
      setHours(0)
      setMinutes(30)
    }
  }, [editingTask])

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

    const task: Task = {
      id: editingTask?.id || crypto.randomUUID(),
      title: title.trim(),
      description: description.trim() || undefined,
      day,
      priority,
      completed,
      estimatedTime: totalMinutes
    }

    addTask(task)
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
          <h3>{editingTask ? "Edit Task" : "Add Task"}</h3>

          <div className={styles.field}>
            <label htmlFor="title">Title *</label>
            <input
              id="title"
              type="text"
              placeholder="e.g., Business meeting"
              value={title}
              onChange={e => setTitle(e.target.value)}
              autoFocus
              className={error ? styles.error : ""}
            />
            {error && <span className={styles.errorMessage}>{error}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="description">Description (optional)</label>
            <textarea
              id="description"
              placeholder="Add details about this task..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={3}
            />
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
              <label htmlFor="hours">Hours</label>
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
            <button type="submit">{editingTask ? "Save" : "Add"}</button>
            <button type="button" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}