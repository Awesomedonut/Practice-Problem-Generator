import Link from 'next/link';
import styles from './styles.module.css'

export default function Header() {
    return (
        <div className={styles.headerContainer}>
          <div className={styles.homeLinkContainer}>
            <Link className={styles.links} href="/">Home</Link>
          </div>
          <div className={styles.otherLinksContainer}>
            <Link className={styles.links} href="/About">About</Link>
            <Link className={styles.links} href="/Team">Team</Link>
            <div className={styles.dropdown}>
              <span>Setting</span>
              <div className={styles.dropdownContent}>
                <label> <h4>Question Type:</h4>Multiple Choice 
                <input id="MC" type="radio" value="MC" name="MC-TF" /> 
                </label><br />
                <label> True or False
                <input id="TF" type="radio" value="TF" name="MC-TF" /> 
                </label><br />
                <label> Short Answer
                <input id="TF" type="radio" value="TF" name="MC-TF" /> 
                </label>
              </div>
            </div>
            <Link className={styles.links} href="/Help">Help</Link>
          </div>
      </div>
    )
}