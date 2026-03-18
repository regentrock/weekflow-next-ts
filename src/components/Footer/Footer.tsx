"use client";

import styles from "./Footer.module.css"
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div>
            <h3 className={styles.logo}>WeekFlow</h3>
            <p className={styles.copyright}>
              © {currentYear} WeekFlow. {t('rights')}
            </p>
          </div>

          <div className={styles.links}>
            <a href="#">{t('about')}</a>
            <a href="#">{t('help')}</a>
            <a href="#">{t('terms')}</a>
            <a href="#">{t('contact')}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}