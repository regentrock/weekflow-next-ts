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
              © {currentYear} WeekFlow. Todos os direitos reservados.
            </p>
          </div>

          <div className={styles.links}>
            <a href="#">Sobre</a>
            <a href="#">Ajuda</a>
            <a href="#">Termos</a>
            <a href="#">Contato</a>
          </div>
        </div>
      </div>
    </footer>
  )
}