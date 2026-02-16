import React, { useEffect } from "react";
import { motion } from "framer-motion";

const LoadingScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3500); // 3.5s total duration
    return () => clearTimeout(timer);
  }, [onComplete]);

  const letterContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      },
    },
  };

  const letterAnimation = {
    hidden: { y: 100, opacity: 0, rotateX: -90 },
    show: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <div className="relative overflow-hidden">
        <motion.div
          variants={letterContainer}
          initial="hidden"
          animate="show"
          className="flex items-center justify-center overflow-hidden"
        >
          {Array.from("ClariWeave").map((letter, index) => (
            <motion.span
              key={index}
              variants={letterAnimation}
              className="text-6xl md:text-9xl font-display font-black text-white tracking-tight"
              style={{ display: "inline-block" }} // Required for transform animations
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
