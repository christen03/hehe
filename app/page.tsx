"use client";
import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import styles from "./page.module.css";
import Image from "next/image";
import deadpic from "./dead.jpg";
import Confetti from "react-confetti";

import BigLittle1 from "./img1.jpg";
import BigLittle2 from "./img2.jpg";
import BigLittle3 from "./img3.jpg";
import BigLittle4 from "./img4.png";

export default function Home() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const [imagePositions, setImagePositions] = useState([]);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    // Generate random positions and rotations for each image
    const positions = [BigLittle1, BigLittle2, BigLittle3, BigLittle4].map(() => ({
      left: Math.random() * 10 + 5, 
      top: -1*(Math.random()*10 + 50),
      rotate: Math.random() * 30 - 15, 
    }));
    setImagePositions(positions);
  }, []);

  const { scrollY } = useScroll();
  const imageSectionRef = useRef(null);
  const isInView = useInView(imageSectionRef, { once: true });


  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowArrow(true), 1000); // Show arrow 1 second after confetti
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const imageVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.3,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  const wordVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className={styles.container}>
      <motion.h1 className={styles.title}>
        {["Happy", "21st", "Birthday"].map((word, index) => (
          <motion.span
            key={index}
            variants={wordVariants}
            initial="hidden"
            animate="visible"
            transition={{
              duration: 0.5,
              delay: index * 0.3,
              type: "spring",
              stiffness: 200,
            }}
          >
            {word}{" "}
          </motion.span>
        ))}
      </motion.h1>
      <motion.h1
        className={styles.title}
        variants={wordVariants}
        initial="hidden"
        animate="visible"
        transition={{
          duration: 0.5,
          delay: 0.9,
          type: "spring",
          stiffness: 200,
        }}
        onAnimationComplete={() => {
          setShowConfetti(true);
          setShowImage(true);
        }}
      >
        Julia!!
      </motion.h1>
      {showConfetti && <Confetti />}

      <AnimatePresence>
       
<motion.div
  style={{ minHeight: '75vh', minWidth: '30vh' }} // Set this to the size of your image
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: showImage ? 1 : 0, scale: showImage ? 1 : 0.8 }}
  transition={{ duration: 0.5 }}
>
  {showImage && (
    <Image src={deadpic} alt="LOL" className={styles.image} />
  )}
</motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {showArrow && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className={styles.arrow}
            // style={{ opacity: arrowOpacity }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5V19M12 19L5 12M12 19L19 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.imageSection} ref={imageSectionRef} style={{backgroundColor: 'red'}}>
      {[BigLittle1, BigLittle2, BigLittle3, BigLittle4].map((img, index) => (
          <>
          <motion.div
            key={index}
            variants={imageVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <Image
              src={img}
              alt={`Image ${index + 1}`}
              width={300}
              height={400}
              className={styles.scatteredImage}
              style={{
                // position: 'relative',
                left: `${imagePositions[index]?.left || 0}%`,
                top: `${imagePositions[index]?.top || 0}%`,
                transform: `rotate(${imagePositions[index]?.rotate || 0}deg)`,
                marginLeft: '2%'
              }}
            />
          </motion.div>
          <div>
            <h1>{imagePositions[index]?.top}</h1>
            </div>
              </>
        ))}
      </div>
    </div>
  );
}
