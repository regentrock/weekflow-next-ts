"use client";

import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/contexts/LanguageContext';
import styles from './UserOptions.module.css';
import { useEffect, useRef } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function UserOptions({ isOpen, onClose }: Props) {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const menuRef = useRef<HTMLDivElement>(null);

  // Fechar ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div ref={menuRef} className={styles.menu}>
        <h3 className={styles.title}>{t('options') || 'Options'}</h3>

        <div className={styles.section}>
          <span className={styles.label}>{t('theme')}</span>
          <div className={styles.options}>
            <button
              className={`${styles.optionBtn} ${theme === 'light' ? styles.active : ''}`}
              onClick={() => theme !== 'light' && toggleTheme()}
            >
              {t('light')}
            </button>
            <button
              className={`${styles.optionBtn} ${theme === 'dark' ? styles.active : ''}`}
              onClick={() => theme !== 'dark' && toggleTheme()}
            >
              {t('dark')}
            </button>
          </div>
        </div>

        <div className={styles.section}>
          <span className={styles.label}>{t('language')}</span>
          <div className={styles.options}>
            <button
              className={`${styles.optionBtn} ${language === 'en' ? styles.active : ''}`}
              onClick={() => setLanguage('en')}
            >
              {t('english')}
            </button>
            <button
              className={`${styles.optionBtn} ${language === 'pt' ? styles.active : ''}`}
              onClick={() => setLanguage('pt')}
            >
              {t('portuguese')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}