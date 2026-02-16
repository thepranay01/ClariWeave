import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen bg-black pt-32 pb-24 px-6 text-white">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-8">
            Clarity in Every Wipe.
          </h1>
          
          <div className="space-y-8 text-lg md:text-xl text-white/80 leading-relaxed font-light">
            <p>
              At <span className="text-white font-medium">ClariWeave</span>, we believe that the tools you use to care for your equipment should be as advanced as the equipment itself. Whether it's a §5,000 camera lens, a 4K monitor, or your daily eyewear, standard cleaning cloths simply don't cut it.
            </p>

            <img 
              src="https://images.unsplash.com/photo-1644483518975-1a74bff3ab94?fm=jpg&q=60&w=3000&auto=format&fit=crop" 
              alt="Close up of fabric texture" 
              className="w-full h-64 md:h-96 object-cover rounded-2xl my-12 opacity-80 border border-white/10"
            />

            <h2 className="text-3xl font-display font-bold text-white mt-12 mb-4">Our Engineering</h2>
            <p>
              We don't just sell fabric; we engineer surfaces. Our proprietary <span className="text-white font-medium">UltraWeave™</span> technology creates a microscopic landscape of fibers designed to trap oil, dust, and moisture instantly, rather than spreading it around.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 my-12">
                <div className="p-6 bg-zinc-900/50 rounded-xl border border-white/5">
                    <h3 className="text-xl font-bold text-white mb-2">Zero Abrasives</h3>
                    <p className="text-base text-white/60">Guaranteed to never micro-scratch even the finest optical coatings.</p>
                </div>
                <div className="p-6 bg-zinc-900/50 rounded-xl border border-white/5">
                    <h3 className="text-xl font-bold text-white mb-2">High Absorption</h3>
                    <p className="text-base text-white/60">Holds 7x its weight in liquid/oils for a single-pass clean.</p>
                </div>
                <div className="p-6 bg-zinc-900/50 rounded-xl border border-white/5">
                    <h3 className="text-xl font-bold text-white mb-2">Long Life</h3>
                    <p className="text-base text-white/60">Washable and reusable over 500 times without losing efficacy.</p>
                </div>
            </div>

            <p>
              Founded by photographers and optical engineers, ClariWeave is the result of an obsession with perfection. We know that a single smudge can ruin a shot, and a scratched coating is a permanent regret. That's why we exist.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
