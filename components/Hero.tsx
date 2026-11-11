"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./Hero.module.css";

const reveal = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.2, 0.8, 0.2, 1] as const },
});

export default function Hero({ tagline, image }: { tagline?: string; image?: string | null }) {
  const root = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: root, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={root} className={styles.hero}>
      <motion.div className={styles.bg} style={{ y: bgY }} aria-hidden>
        {image ? (
          <div className={styles.photo}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt="" />
          </div>
        ) : (
          <div className={styles.atmos}>
            <i className={`${styles.streak} ${styles.s1}`} />
            <i className={`${styles.streak} ${styles.s2}`} />
            <i className={`${styles.streak} ${styles.s3}`} />
          </div>
        )}
      </motion.div>
      <div className={styles.shade} aria-hidden />

      <motion.div className={styles.content} style={{ y: textY, opacity: fade }}>
        <motion.p className={styles.kicker} {...reveal(0.1)}>
          Japanese domestic market · Imports &amp; builds
        </motion.p>
        <motion.h1 className={styles.title} {...reveal(0.2)}>
          Feel it before
          <br />
          you <span className={styles.accent}>see it.</span>
        </motion.h1>
        <motion.p className={styles.sub} {...reveal(0.35)}>
          {tagline}
        </motion.p>
        <motion.div className={styles.actions} {...reveal(0.5)}>
          <Link href="/#garage" className={styles.primary} data-cursor="Garage">
            View inventory
          </Link>
          <Link href="/#process" className={styles.secondary} data-cursor="Import">
            How importing works
          </Link>
        </motion.div>
      </motion.div>

      <nav className={styles.strip} aria-label="Quick links">
        <Link href="/#garage" data-cursor="Go">
          Inventory <span className={styles.arrow}>→</span>
        </Link>
        <Link href="/#process" data-cursor="Go">
          Import a car <span className={styles.arrow}>→</span>
        </Link>
        <Link href="/#contact" data-cursor="Go">
          Start an inquiry <span className={styles.arrow}>→</span>
        </Link>
      </nav>
    </section>
  );
}