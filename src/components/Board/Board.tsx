"use client"

import { useState } from "react"
import { Day, Task } from "@/types/task"
import { useTasks } from "@/hooks/useTasks"

import DayColumn from "../DayColumn/DayColumn"
import TaskForm from "../TaskForm/TaskForm"
import TodayTasks from "../TodayTasks/TodayTasks"
import WeekOverview from "@/components/WeekOverview/WeekOverview"

import styles from "./Board.module.css"
import { useLanguage } from "@/contexts/LanguageContext"

type Props = {
  isFormOpen: boolean
  closeForm: () => void
  onOpenForm: () => void
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

export default function Board({ isFormOpen, closeForm, onOpenForm }: Props) {
  const { t } = useLanguage();
  const { tasks, addTask, updateTask, toggleTask, deleteTask, reorderTasks } = useTasks()
  const [activeDay, setActiveDay] = useState<Day>("Monday")
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [showOverview, setShowOverview] = useState(false)

  const dayTasks = tasks
    .filter(t => t.day === activeDay)
    .sort((a, b) => (a.order || 0) - (b.order || 0))

  function handleEditTask(task: Task) {
    setEditingTask(task)
    onOpenForm()
  }

  function handleSaveTask(task: Task) {
    if (editingTask) {
      updateTask(task)
    } else {
      addTask(task)
    }
    closeForm()
    setEditingTask(null)
  }

  function handleCloseForm() {
    closeForm()
    setEditingTask(null)
  }

  // Para os dias na navegação, usamos as abreviações traduzidas
  const dayAbbr = (day: Day) => {
    const key = day.slice(0,3).toLowerCase(); // "mon", "tue", etc.
    return t(key);
  };

  return (
    <>
      <TodayTasks tasks={tasks} />

      <div className={styles.container}>
        <div className={styles.containerLeft}>
          <div className={styles.daysNav}>
            {days.map(day => {
              const count = tasks.filter(t => t.day === day).length
              return (
                <button
                  key={day}
                  onClick={() => setActiveDay(day)}
                  className={activeDay === day ? styles.activeDay : ""}
                >
                  <span className={styles.dayName}>{dayAbbr(day)}</span>
                  <span className={styles.dayCount}>{count}</span>
                </button>
              )
            })}
          </div>

          <DayColumn
            day={activeDay}
            tasks={dayTasks}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            reorderTasks={reorderTasks}
            onEditTask={handleEditTask}
            onAddTaskClick={onOpenForm}
          />

          {isFormOpen && (
            <TaskForm
              addTask={handleSaveTask}
              onCancel={handleCloseForm}
              editingTask={editingTask}
            />
          )}
        </div>

        <div className={styles.containerRight}>
          <button
            className={styles.toggleOverviewBtn}
            onClick={() => setShowOverview(!showOverview)}
          >
            {showOverview ? t('hideOverview') : t('showOverview')}
          </button>
          <div className={`${styles.overviewWrapper} ${showOverview ? styles.visible : ""}`}>
            <WeekOverview tasks={tasks} />
          </div>
        </div>
      </div>
    </>
  )
}