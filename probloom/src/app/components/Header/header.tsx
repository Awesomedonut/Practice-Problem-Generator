import Link from 'next/link';
import styles from './styles.module.css'

export default function Header() {
    return (
        <div className={styles.headerContainer}>
          <div className={styles.homeLinkContainer}>
            <Link className={styles.links} href="/">home</Link>
          </div>
          <div className={styles.otherLinksContainer}>
            <Link className={styles.links} href="/About">About</Link>
            <Link className={styles.links} href="/Team">Team</Link>
          </div>
      </div>
    )
}