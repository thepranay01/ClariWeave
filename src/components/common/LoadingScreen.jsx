import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <div className="relative">
        <motion.div
          animate={{
            opacity: [0, 1],
          }}
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
          className="w-64 h-24"
        >
          {/* Simulated weave animation using text for now, could be SVG */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-4xl md:text-6xl font-display font-bold text-white tracking-widest text-center"
          >
            ClariWeave
          </motion.h1>
          <motion.div 
             initial={{ width: 0 }}
             animate={{ width: "100%" }}
             transition={{ delay: 1, duration: 1, ease: "circOut" }}
             className="h-1 bg-white/20 mt-4 mx-auto"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
