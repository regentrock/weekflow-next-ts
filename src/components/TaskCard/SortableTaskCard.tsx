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
  onEdit: (task: Task) => void;
};

export default function SortableTaskCard({
  id,
  task,
  toggleTask,
  deleteTask,
  onEdit
}: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    scale: isDragging ? 1.02 : 1,
    boxShadow: isDragging ? "var(--shadow-lg)" : "var(--shadow-sm)",
    zIndex: isDragging ? 999 : "auto"
  };

  return (
    <div ref={setNodeRef} style={style}>
      <TaskCard
        task={task}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
        onEdit={onEdit}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
}