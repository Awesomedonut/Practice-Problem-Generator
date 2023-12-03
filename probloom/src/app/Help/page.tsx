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
                                <h3 className={styles.heading}>What is Probloom?</h3>
                                <p className={styles.paragraph}>Probloom aims to help users generate relevant practice problems. Navigate to About page to learn more.</p>
                            </div>
                    </div>
                    <div className={`${styles.box} ${styles.box2}`}>
                        <div className={styles.boxContent}>
                            <h3 className={styles.heading}>How to use Probloom?</h3>
                            <p className={styles.paragraph}>1. Enter topic/relevant text in the input bar on Homepage. </p>
                            <p className={styles.paragraph}>2. Select problem type. </p>
                            <p className={styles.paragraph}>3. Click on generate questions. </p>
                        </div>
                    </div>
                    <div className={`${styles.box} ${styles.box3}`}>
                        <div className={styles.boxContent}>
                            <h3 className={styles.heading}>How to select different problem type? </h3>
                            <p className={styles.paragraph}>Navigate to Homepage and select on the dropdown box beside the input bar.</p>
                        </div>
                    </div>
                    <div className={`${styles.box} ${styles.box4}`}>
                        <div className={styles.boxContent}>
                            <h3 className={styles.heading}>How to download PDF?</h3>
                            <p className={styles.paragraph}>1. Enter topic and select <i>text</i> as problem type. </p>
                            <p className={styles.paragraph}>2. Click on generate questions. </p>
                            <p className={styles.paragraph}>3. Below questions generated, click on save as PDF. </p>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className={styles.contactus}>
                <p>We are here to help!</p>
                <p>Contact Us: <a href="mailto:questions@probloom.com? &subject=Question about Probloom &body=Add your questions and/or feedback here">questions@probloom.com</a></p>  
            </div>
        </div>
    );   
}