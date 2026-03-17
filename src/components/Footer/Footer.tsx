import styles from "./Footer.module.css"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div>
            <h3 className={styles.logo}>WeekFlow</h3>
            <p className={styles.copyright}>
              © {currentYear} WeekFlow. All rights reserved.
            </p>
          </div>

          <div className={styles.links}>
            <a href="#">About</a>
            <a href="#">Help</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}