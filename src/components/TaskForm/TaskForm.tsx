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
      setError("O título é obrigatório")
      return
    }
    setError("")

    // Valida minutos entre 0 e 59
    if (minutes < 0 || minutes > 59) {
      setError("Minutos devem estar entre 0 e 59")
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
          <h3>Adicionar Tarefa</h3>

          <div className={styles.field}>
            <label htmlFor="title">Título</label>
            <input
              id="title"
              type="text"
              placeholder="Ex.: Reunião com equipe"
              value={title}
              onChange={e => setTitle(e.target.value)}
              autoFocus
              className={error ? styles.error : ""}
            />
            {error && <span className={styles.errorMessage}>{error}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="day">Dia</label>
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
            <label htmlFor="priority">Prioridade</label>
            <select
              id="priority"
              value={priority}
              onChange={e => setPriority(e.target.value as Priority)}
            >
              <option value="low">Baixa</option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
            </select>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="hours">Horas</label>
              <input
                id="hours"
                type="number"
                min="0"
                value={hours}
                onChange={e => setHours(Math.max(0, parseInt(e.target.value) || 0))}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="minutes">Minutos</label>
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

          <div className={styles.checkboxContainer}>
            <label>
              <input
                type="checkbox"
                checked={completed}
                onChange={e => setCompleted(e.target.checked)}
              />
              Concluída
            </label>
          </div>

          <div className={styles.actions}>
            <button type="submit">Adicionar</button>
            <button type="button" onClick={onCancel}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}