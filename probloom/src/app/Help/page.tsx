import styles from './page.module.css';


export default function Help() {
    return (
         <div className={styles.page}>
            <img src="FlowerLogo.png" height="80"/>
            <h1 className={styles.pageTitle}>How can we help you?</h1>
            <div className={styles.pageContainer}>
                <div className={styles.boxContainer}>
                    <div className={`${styles.box} ${styles.box1}`}>
                            <div className={styles.boxContent}>
                                <h3 className={styles.heading}>How to select problem type?</h3>
                                <p className={styles.paragraph}>Navigate to Homepage and select on the dropdown box beside the input bar.</p>
                            </div>
                    </div>
                    <div className={`${styles.box} ${styles.box2}`}>
                        <div className={styles.boxContent}>
                            <h2 className={styles.heading}>Text 2</h2>
                            <p className={styles.paragraph}>will add somthing here later.</p>
                        </div>
                    </div>
                    <div className={`${styles.box} ${styles.box3}`}>
                        <div className={styles.boxContent}>
                            <h2 className={styles.heading}>Text 3</h2>
                            <p className={styles.paragraph}>will add somthing here later.</p>
                        </div>
                    </div>
                    <div className={`${styles.box} ${styles.box4}`}>
                        <div className={styles.boxContent}>
                            <h2 className={styles.heading}>Text 4</h2>
                            <p className={styles.paragraph}>will add somthing here later.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );   
}