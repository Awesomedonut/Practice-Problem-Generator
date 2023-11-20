import React from 'react';
import styles from './page.module.css';
import Head from 'next/head';
import { Kaushan_Script } from 'next/font/google';


const kaushan = Kaushan_Script({
 weight: ['400', '400'],
 style: ['normal'],
 subsets: ['latin'],
 display: 'swap',
});


const MyPage = () => {
 return (
   <div className={styles.pageContainer}>
     <Head>
       <style>{`
         @import url('${kaushan}');
       `}</style>
     </Head>


     <div className={styles.header}>
         About Probloom 
         <img src="FlowerLogo.png" height="70" />
     </div>
     <div className={styles.imageContainer1}>
       <img src="/about-flowers.png" alt="" />
     </div>
     <div className={styles.imageContainer2}>
       <img src="/about-flowers.png" alt="" />
     </div>
     <div className={styles.imageContainer3}>
         <img src="AboutFlower.png" height="500" alt="Picture of Pink tulips"/>
     </div>
     <div className={styles.mainContent}>
       <div className={styles.centeredBox}>
         <p>Welcome to Probloom! Probloom is an AI-powered web application designed to generate relevant practice problems tailored to the users inputs. This platform offers the flexibility of accepting inputs in both plain text and
    PDF formats. Correspondingly, the application provides outputs as either plain text or a downloadable PDF version.
           Moreover, Probloom can also generate solutions, enabling users to verify their answers effectively.
         </p>
       </div>
     </div>
   </div>
 );
};


export default MyPage;