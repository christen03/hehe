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

import LittleBig1 from "./IMG_4863.jpeg"
import LittleBig2 from "./IMG_7570.jpeg"
import LittleBig3 from "./IMG_8427.jpeg"
import LittleBig4 from "./DSC01539.jpeg"

export default function Home() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const [christenImagePositions, setChristenImagePositions] = useState([]);
  const [ryanImagePositions, setRyanImagePositions] = useState([]);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    // Generate random positions and rotations for each image
    const christenImages = [BigLittle1, BigLittle2, BigLittle3, BigLittle4].map(() => ({
      left: Math.random() * 10 + 5, 
      rotate: Math.random() * 30 - 15, 
    }));
    setChristenImagePositions(christenImages);
  }, []);

  useEffect(() => {
    const ryanImages = [LittleBig1, LittleBig2, LittleBig3, LittleBig4].map(() => ({
      right: Math.random() * 10 + 5, 
      rotate: Math.random() * 30 - 15, 
    }));
    setRyanImagePositions(ryanImages);
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
  style={{ minHeight: '77.5vh', minWidth: '30vh' }} // Set this to the size of your image
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

      <div className={styles.imageSection} ref={imageSectionRef}>
      <>
      {[BigLittle1, BigLittle2, BigLittle3, BigLittle4].map((img, index) => (
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
                position: 'absolute',
                left: `${christenImagePositions[index]?.left || 0}%`,
                transform: `rotate(${christenImagePositions[index]?.rotate || 0}deg)`,
                marginLeft: '2%',
                marginTop: `${index * 350}px`
              }}
            />
          </motion.div>
        ))}
      {[LittleBig1, LittleBig2, LittleBig3, LittleBig4].map((img, index) => (
          <motion.div
            key={index}
            variants={imageVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <Image
              src={img}
              alt={`Image ${index + 1}`}
              width={index === 0 ? 400 : index === 3 ? 275 : 300}
              height={index === 0 ? 300 : index === 3 ? 500 : 400}
              className={styles.scatteredImage}
              style={{
                position: 'absolute',
                right: `${ryanImagePositions[index]?.right || 0}%`,
                transform: `rotate(${ryanImagePositions[index]?.rotate || 0}deg)`,
                marginRight: '2%',
                marginTop: `${index * 350 + (index == 1 ? -50 : 0)}px`
              }}
            />
          </motion.div>
        ))}
      </>
      </div>
    </div>
  );
}
