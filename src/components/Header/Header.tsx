import Image from "next/image";
import styles from "./Header.module.css";

type Props = {
  onAddTaskClick: () => void
}

export default function Header({ onAddTaskClick }: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Image 
          src="/transparent-logo-icon.png" 
          alt="WeekFlow Logo" 
          width={32} 
          height={32} 
          className={styles.logoImage}
        />
        <h1 className={styles.logoText}><span>Week</span>Flow</h1>
      </div>
      <button className={styles.addTaskBtn} onClick={onAddTaskClick}>
        + Add task
      </button>
    </header>
  )
}