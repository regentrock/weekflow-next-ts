"use client"

import { useState, useEffect } from "react"
import { Day, Priority, Task } from "@/types/task"
import styles from "./TaskForm.module.css"
import { useLanguage } from "@/contexts/LanguageContext"

type Props = {
  addTask: (task: Task) => void
  onCancel: () => void
  editingTask?: Task | null
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
  const { t } = useLanguage();
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [day, setDay] = useState<Day>("Monday")
  const [priority, setPriority] = useState<Priority>("medium")
  const [completed, setCompleted] = useState(false)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(30)
  const [error, setError] = useState("")

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
      setError(t('titleRequired'))
      return
    }
    setError("")

    if (minutes < 0 || minutes > 59) {
      setError(t('minutesError'))
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

  // Traduzir os dias para exibir no select? Os valores do select são os dias em inglês (Monday, etc.), mas o texto visível pode ser traduzido.
  // Podemos mapear cada dia para sua tradução.
  const translatedDays = days.map(d => ({ value: d, label: t(d.toLowerCase()) }));

  return (
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h3>{editingTask ? t('editTaskTitle') : t('addTaskTitle')}</h3>

          <div className={styles.field}>
            <label htmlFor="title">{t('title')} *</label>
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
            <label htmlFor="description">{t('description')}</label>
            <textarea
              id="description"
              placeholder={t('descriptionPlaceholder')}
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="day">{t('day')}</label>
            <select
              id="day"
              value={day}
              onChange={e => setDay(e.target.value as Day)}
            >
              {translatedDays.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="priority">{t('priority')}</label>
            <select
              id="priority"
              value={priority}
              onChange={e => setPriority(e.target.value as Priority)}
            >
              <option value="low">{t('low')}</option>
              <option value="medium">{t('medium')}</option>
              <option value="high">{t('high')}</option>
            </select>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="hours">{t('hours')}</label>
              <input
                id="hours"
                type="number"
                min="0"
                value={hours}
                onChange={e => setHours(Math.max(0, parseInt(e.target.value) || 0))}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="minutes">{t('minutes')}</label>
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
            <button type="submit">{editingTask ? t('save') : t('add')}</button>
            <button type="button" onClick={onCancel}>{t('cancel')}</button>
          </div>
        </form>
      </div>
    </div>
  )
}