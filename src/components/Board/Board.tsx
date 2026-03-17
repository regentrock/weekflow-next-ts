// Board.tsx
"use client"

import { useState, useEffect } from "react"
import { Day, Task } from "@/types/task"
import { useTasks } from "@/hooks/useTasks"

import DayColumn from "../DayColumn/DayColumn"
import TaskForm from "../TaskForm/TaskForm"
import TodayTasks from "../TodayTasks/TodayTasks"
import WeekOverview from "@/components/WeekOverview/WeekOverview"

import styles from "./Board.module.css"

type Props = {
  isFormOpen: boolean
  closeForm: () => void
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

export default function Board({ isFormOpen, closeForm }: Props) {
  const { tasks, addTask, toggleTask, deleteTask, reorderTasks } = useTasks()
  const [activeDay, setActiveDay] = useState<Day>("Monday")
  const [showOverview, setShowOverview] = useState(false)

  const dayTasks = tasks
    .filter(t => t.day === activeDay)
    .sort((a, b) => (a.order || 0) - (b.order || 0))

  function handleAddTask(task: Task) {
    addTask(task)
    closeForm()
  }

  // Fechar overview ao redimensionar para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setShowOverview(false) // não precisa mais do toggle, o CSS mostra
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <TodayTasks tasks={tasks} />

      <div className={styles.container}>
        <div className={styles.containerLeft}>
          <div className={styles.daysNav}>
            {days.map(day => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={activeDay === day ? styles.activeDay : ""}
              >
                {day.slice(0, 3)}
              </button>
            ))}
          </div>

          <DayColumn
            day={activeDay}
            tasks={dayTasks}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            reorderTasks={reorderTasks}
          />

          {isFormOpen && (
            <TaskForm addTask={handleAddTask} onCancel={closeForm} />
          )}
        </div>

        <div className={styles.containerRight}>
          <button
            className={styles.toggleOverviewBtn}
            onClick={() => setShowOverview(!showOverview)}
          >
            {showOverview ? "Ocultar" : "Mostrar"} visão geral
          </button>

          <div className={`${styles.overviewWrapper} ${showOverview ? styles.visible : ''}`}>
            <WeekOverview tasks={tasks} />
          </div>
        </div>
      </div>
    </>
  )
}