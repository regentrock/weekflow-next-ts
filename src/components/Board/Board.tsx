// Board.tsx
"use client"

import { useState } from "react"
import { Day, Task } from "@/types/task"
import { useTasks } from "@/hooks/useTasks"

import DayColumn from "../DayColumn/DayColumn"
import TaskForm from "../TaskForm/TaskForm"
import TodayTasks from "../TodayTasks/TodayTasks"

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

  const dayTasks = tasks
    .filter(t => t.day === activeDay)
    .sort((a, b) => (a.order || 0) - (b.order || 0))

  function handleAddTask(task: Task) {
    addTask(task)
    closeForm()
  }

  return (
    <>
      <TodayTasks tasks={tasks} />

      <div className={styles.container}>
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
    </>
  )
}