"use client";

import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { Task, Day } from "@/types/task";
import SortableTaskCard from "../TaskCard/SortableTaskCard";
import styles from "./DayColumn.module.css";
import { useState } from "react";

type Props = {
  day: Day
  tasks: Task[]
  toggleTask: (id: string) => void
  deleteTask: (id: string) => void
  reorderTasks: (activeId: string, overId: string, day: Day) => void
  onEditTask: (task: Task) => void
  onAddTaskClick: () => void
};

export default function DayColumn({
  day,
  tasks,
  toggleTask,
  deleteTask,
  reorderTasks,
  onEditTask,
  onAddTaskClick
}: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const sortedTasks = [...tasks].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id.toString());
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;
    if (active.id !== over.id) {
      reorderTasks(active.id.toString(), over.id.toString(), day);
    }
  }

  return (
    <div className={styles.column}>
      <h2 className={styles.title}>
        {day}
        <span className={styles.count}>{tasks.length}</span>
      </h2>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sortedTasks.map(t => t.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className={styles.tasks}>
            {sortedTasks.length === 0 ? (
              <>
                <p className={styles.empty}>No tasks</p>
                <button className={styles.addTaskBtn} onClick={onAddTaskClick}>
                  + Add task
                </button>
              </>
            ) : (
              sortedTasks.map(task => (
                <SortableTaskCard
                  key={task.id}
                  id={task.id}
                  task={task}
                  toggleTask={toggleTask}
                  deleteTask={deleteTask}
                  onEdit={onEditTask}
                  isDragging={activeId === task.id}
                />
              ))
            )}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}