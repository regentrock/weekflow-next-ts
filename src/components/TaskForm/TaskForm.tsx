"use client";

import { useState } from "react";
import { Day, Priority, Task } from "@/types/task";
import styles from "./TaskForm.module.css";
import { useLanguage } from "@/contexts/LanguageContext";

type Props = {
  addTask: (task: Task) => void;
  onCancel: () => void;
  editingTask?: Task | null;
};

const days: Day[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

export default function TaskForm({ addTask, onCancel, editingTask }: Props) {
  const { t } = useLanguage();

  const isEditing = !!editingTask;

  const [title, setTitle] = useState(editingTask?.title || "");
  const [description, setDescription] = useState(
    editingTask?.description || ""
  );
  const [day, setDay] = useState<Day>(editingTask?.day || "Monday");
  const [priority, setPriority] = useState<Priority>(
    editingTask?.priority || "medium"
  );

  // 🔥 sem state desnecessário
  const completed = editingTask?.completed || false;

  const [hours, setHours] = useState(() =>
    editingTask ? Math.floor(editingTask.estimatedTime / 60) : 0
  );

  const [minutes, setMinutes] = useState(() =>
    editingTask ? editingTask.estimatedTime % 60 : 30
  );

  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) {
      setError(t("titleRequired"));
      return;
    }

    if (minutes < 0 || minutes > 59) {
      setError(t("minutesError"));
      return;
    }

    const task: Task = {
      id: editingTask?.id || crypto.randomUUID(),
      title: title.trim(),
      description: description.trim() || undefined,
      day,
      priority,
      completed,
      estimatedTime: hours * 60 + minutes
    };

    setError("");
    addTask(task);
  }

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onCancel();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") onCancel();
  }

  const translatedDays = days.map((d) => ({
    value: d,
    label: t(d.toLowerCase())
  }));

  return (
    <div
      key={editingTask?.id || "new"} // 🔥 reseta o form automaticamente
      className={styles.overlay}
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h3>
            {isEditing ? t("editTaskTitle") : t("addTaskTitle")}
          </h3>

          <div className={styles.field}>
            <label>{t("title")} *</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={error ? styles.error : ""}
              autoFocus
            />
            {error && (
              <span className={styles.errorMessage}>{error}</span>
            )}
          </div>

          <div className={styles.field}>
            <label>{t("description")}</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label>{t("day")}</label>
            <select
              value={day}
              onChange={(e) => setDay(e.target.value as Day)}
            >
              {translatedDays.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label>{t("priority")}</label>
            <select
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value as Priority)
              }
            >
              <option value="low">{t("low")}</option>
              <option value="medium">{t("medium")}</option>
              <option value="high">{t("high")}</option>
            </select>
          </div>

          <div className={styles.row}>
            <input
              type="number"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              min={0}
            />
            <input
              type="number"
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
              min={0}
              max={59}
            />
          </div>

          <div className={styles.actions}>
            <button type="submit">
              {isEditing ? t("save") : t("add")}
            </button>
            <button type="button" onClick={onCancel}>
              {t("cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}