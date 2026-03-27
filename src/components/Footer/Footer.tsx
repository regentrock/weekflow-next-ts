"use client";

import Image from "next/image"
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
            <div className={styles.logo}>
              <Image src="/transparent-logo-icon.png" alt="WeekFlow" width={50} height={50}/>
              <h3 className={styles.logoText}>WeekFlow</h3>
            </div>
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