import styles from "./Header.module.css"

type Props = {
  onAddTaskClick: () => void
}

export default function Header({ onAddTaskClick }: Props) {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>WeekFlow</h1>
      <button className={styles.addTaskBtn} onClick={onAddTaskClick}>
        + Add task
      </button>
    </header>
  )
}