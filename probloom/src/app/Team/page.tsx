"use client";

import React from "react";
import styles from "./page.module.css";
import Head from "next/head";
import { Kaushan_Script } from "next/font/google";
import Slider from "./Slider";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";

const kaushan = Kaushan_Script({
  weight: ["400", "400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export default function Team() {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  
  return (
    <div className={styles.pageContainer}>
      <Head>
        <style>{`
         @import url('${kaushan}');
       `}</style>
      </Head>

      <div className={styles.mainContent}>

        <div className={styles.teamTitle}>
            <h1>About the Team</h1>
            <img src="FlowerLogo.png" height="70" />
        </div>

        <div className={styles.slides}>
          <Slider></Slider>
        </div>

        <div className={styles.img1}>
          <img src="AboutFlower.png" alt="" />
        </div>

        <div className={styles.img2}>
          <img src="AboutFlower.png" alt="" />
        </div>
      </div>
    </div>
  );
}
