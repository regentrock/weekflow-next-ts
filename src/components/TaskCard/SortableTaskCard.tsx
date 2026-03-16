"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "@/types/task";
import TaskCard from "./TaskCard";

type Props = {
  id: string;
  task: Task;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  isDragging?: boolean;
};

export default function SortableTaskCard({
  id,
  task,
  toggleTask,
  deleteTask,
  isDragging
}: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: dndIsDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: dndIsDragging ? 0.5 : 1,
    scale: dndIsDragging ? 1.02 : 1,
    boxShadow: dndIsDragging ? "var(--shadow-lg)" : "var(--shadow-sm)",
    zIndex: dndIsDragging ? 999 : "auto",
    cursor: dndIsDragging ? "grabbing" : "grab"
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard task={task} toggleTask={toggleTask} deleteTask={deleteTask} />
    </div>
  );
}