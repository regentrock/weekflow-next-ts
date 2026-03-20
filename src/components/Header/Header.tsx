"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./Header.module.css";
import { FaGear } from "react-icons/fa6";
import UserOptions from "../UserOptions/UserOptions";
import { useLanguage } from "@/contexts/LanguageContext";

type Props = {
  onAddTaskClick: () => void;
};

export default function Header({ onAddTaskClick }: Props) {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Image
          src="/transparent-logo-icon.png"
          className={styles.logoImage}
          alt="WeekFlow"
        />
        <h1 className={styles.logoText}>
          <span>Week</span>Flow
        </h1>
      </div>

      <div className={styles.buttonsContainer}>
        <button className={styles.addTaskBtn} onClick={onAddTaskClick}>
          + {t("addTask")}
        </button>
        <button
          className={styles.optionsBtn}
          onClick={() => setIsOptionsOpen(!isOptionsOpen)}
          aria-label="Options"
        >
          <FaGear />
        </button>
      </div>

      <UserOptions isOpen={isOptionsOpen} onClose={() => setIsOptionsOpen(false)} />
    </header>
  );
}