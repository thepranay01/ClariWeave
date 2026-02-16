import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ProductCard from "../components/common/ProductCard";
import useProductStore from "../store/productStore";
import clothImg from "../assets/cloth.png";

const Home = () => {
  const { products, fetchProducts, loading } = useProductStore();
  const [isCleaned, setIsCleaned] = useState(false);

  useEffect(() => {
    fetchProducts();
    // Test write
    /*
    const testWrite = async () => {
        try {
            const { db } = await import('../firebase/config');
            const { collection, addDoc } = await import('firebase/firestore');
            await addDoc(collection(db, 'test'), { date: new Date() });
            console.log("Write success!");
        } catch (e) {
            console.error("Write fail:", e);
        }
    };
    testWrite();
    */
  }, [fetchProducts]);
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-black to-black opacity-80" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        </div>

        <div className="container relative z-10 px-6 text-center">
          <div className="relative inline-block mx-auto">
            {/* Clean Layer (Base) */}
            <div className="relative z-0">
              <h1 className="text-6xl md:text-9xl font-display font-black mb-6 tracking-tighter text-white drop-shadow-2xl leading-[0.9] text-center">
                <div>WIPE.</div>
                <div>SHINE.</div>
                <div>PROTECT.</div>
              </h1>
              <p
                className={`text-lg md:text-xl font-medium tracking-wide uppercase text-white/70 max-w-2xl mx-auto mb-10 transition-all duration-1000 ${isCleaned ? "shiny-text text-white" : ""}`}
              >
                The Ultimate Microfiber Collection
              </p>
            </div>

            {/* Muddy Layer (Overlay) - Wiped away */}
            <motion.div
              className={`absolute inset-0 z-10 flex flex-col items-center select-none pointer-events-none ${isCleaned ? "hidden" : ""}`}
              initial={{ clipPath: "inset(0 0 0 0)" }}
              animate={{ clipPath: "inset(0 0 0 100%)" }}
              transition={{ duration: 2.5, ease: "easeInOut", delay: 1 }}
              onAnimationComplete={() => setIsCleaned(true)}
            >
              <h1 className="text-6xl md:text-9xl font-display font-black mb-6 tracking-tighter text-[#5d4037] opacity-90 blur-[3px] brightness-75 leading-[0.9] text-center">
                <div>WIPE.</div>
                <div>SHINE.</div>
                <div>PROTECT.</div>
              </h1>
              <p className="text-lg md:text-xl font-medium tracking-wide uppercase text-[#5d4037] max-w-2xl mx-auto mb-10 opacity-80 blur-[2px] brightness-75">
                The Ultimate Microfiber Collection
              </p>
            </motion.div>

            {/* Cloth Animation */}
            <motion.img
              src={clothImg}
              alt=""
              className="absolute z-20 w-48 h-48 object-contain pointer-events-none drop-shadow-2xl"
              initial={{ left: "-20%", top: "10%", opacity: 0, scale: 0.8 }}
              animate={{
                left: ["-20%", "120%"],
                top: ["10%", "50%"],
                opacity: [0, 1, 1, 0],
                rotate: [0, 15, -10, 5],
              }}
              transition={{
                duration: 3,
                times: [0, 0.2, 0.8, 1],
                delay: 0.8,
                ease: "easeInOut",
              }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3.5, ease: "easeOut" }}
            className="flex flex-col md:flex-row gap-4 justify-center mt-12"
          >
            <Link
              to="/shop"
              className="px-10 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-zinc-200 transition-all"
            >
              Shop Collection
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section - Ticker */}
      <section className="py-24 bg-black relative overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-0 w-full py-4 bg-zinc-900/50 border-y border-white/5 overflow-hidden whitespace-nowrap">
          <motion.div
            className="inline-block text-white/50 font-display text-sm uppercase tracking-widest"
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          >
            {Array(10)
              .fill("Precision Weave ✦ Anti-Static ✦ Streak-Free ✦ ")
              .map((text, i) => (
                <span key={i} className="mx-4">
                  {text}
                </span>
              ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
                Our Mission
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed">
                We exist to disrupt the detailing industry. No more scratches,
                no more streaks. Just pure, unadulterated clarity. Our
                microfiber cloths are engineered for perfectionists who demand
                the best for their vehicles.
              </p>
              <Link
                to="/about"
                className="inline-block px-8 py-3 bg-zinc-900 text-white font-bold uppercase text-xs tracking-widest hover:bg-zinc-800 border border-white/10 transition-all"
              >
                Learn More
              </Link>
            </div>
            <div className="relative aspect-[4/5] bg-zinc-900 overflow-hidden">
              <img
                src="/src/assets/mission_abstract.png"
                alt="Mission"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/5] bg-zinc-900 overflow-hidden order-2 md:order-1">
              {/* Placeholder for vision if image missing, or reuse/tint logic */}
              <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-700">
                <span className="font-display font-bold text-4xl opacity-20">
                  VISION
                </span>
              </div>
            </div>
            <div className="space-y-8 order-1 md:order-2">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
                Our Vision
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed">
                To create a world where every surface shines with zero effort.
                We are constantly innovating our weave technology to bring you
                the most advanced detailing tools on the planet.
              </p>
              <Link
                to="/about"
                className="inline-block px-8 py-3 bg-zinc-900 text-white font-bold uppercase text-xs tracking-widest hover:bg-zinc-800 border border-white/10 transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid Section */}
      <section id="shop" className="py-24 bg-black border-t border-white/5">
        <div className="container px-6">
          <div className="flex flex-col items-center text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tighter">
              The Collection
            </h2>
            <p className="text-zinc-400 uppercase tracking-widest text-sm">
              Limited Releases. Exclusive Drops.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading
              ? Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square bg-white/5 animate-pulse"
                    />
                  ))
              : products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/shop"
              className="text-white border-b border-white pb-1 uppercase text-sm tracking-widest hover:text-white/80 transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Placeholder */}
      <footer className="py-12 border-t border-white/5 bg-zinc-950 text-center text-white/40 text-sm">
        <p>© {new Date().getFullYear()} ClariWeave. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
