import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Feather,
  Zap,
  Sparkles,
  RefreshCw,
  Monitor,
  Globe,
} from "lucide-react";
import ProductCard from "../components/common/ProductCard";
import useProductStore from "../store/productStore";
import clothImg from "../assets/cloth.png";

const benefits = [
  {
    icon: Feather,
    title: "Ultra-Soft Weave",
    desc: "Prevents micro-scratches on delicate surfaces.",
  },
  {
    icon: Zap,
    title: "Anti-Static",
    desc: "Repels dust for a longer-lasting clean.",
  },
  {
    icon: Sparkles,
    title: "Streak-Free",
    desc: "Leaves glass and screens crystal clear.",
  },
  {
    icon: RefreshCw,
    title: "500-Wash Durability",
    desc: "Engineered to last for years.",
  },
  {
    icon: Monitor,
    title: "OLED Safe",
    desc: "Perfect for sensitive retina displays.",
  },
  {
    icon: Globe,
    title: "Eco-Friendly",
    desc: "Sustainable production process.",
  },
];

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
          {/* Animated Gradient Background */}
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-black to-black opacity-80" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        </div>

        <div className="container relative z-10 px-6 text-center">
          <div className="relative inline-block max-w-4xl mx-auto">
            {/* Clean Layer (Base) */}
            <div className="relative z-0">
              <h1 className="text-5xl md:text-8xl font-display font-bold mb-6 tracking-tight text-white drop-shadow-2xl">
                Precision-Crafted Clarity
              </h1>
              <p
                className={`text-lg md:text-2xl text-white/70 max-w-2xl mx-auto mb-10 transition-all duration-1000 ${isCleaned ? "shiny-text text-white" : ""}`}
              >
                Engineered microfibre for screens, glass, lenses, and everything
                you care about.
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
              <h1 className="text-5xl md:text-8xl font-display font-bold mb-6 tracking-tight text-[#5d4037] opacity-90 blur-[3px] brightness-75">
                Precision-Crafted Clarity
              </h1>
              <p className="text-lg md:text-2xl text-[#5d4037] max-w-2xl mx-auto mb-10 opacity-80 blur-[2px] brightness-75">
                Engineered microfibre for screens, glass, lenses, and everything
                you care about.
              </p>
            </motion.div>

            {/* Cloth Animation */}
            <motion.img
              src={clothImg}
              alt=""
              className="absolute z-20 w-32 h-32 object-contain pointer-events-none drop-shadow-xl"
              initial={{ left: "-10%", top: "20%", opacity: 0, scale: 0.8 }}
              animate={{
                left: ["-10%", "110%"],
                top: ["20%", "40%"],
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
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <Link
              to="/shop"
              className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-all transform hover:scale-105 shadow-lg shadow-white/10"
            >
              Shop Now
            </Link>
            <a
              href="#benefits"
              className="px-8 py-3 bg-transparent border border-white/20 hover:bg-white/10 text-white font-semibold rounded-full transition-all backdrop-blur-sm"
            >
              See the Difference
            </a>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        id="benefits"
        className="py-24 bg-zinc-950 relative overflow-hidden"
      >
        {/* Ticker */}
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

        <div className="container px-6 pt-16">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold mb-16 text-center text-white"
          >
            Why ClariWeave?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group"
              >
                <benefit.icon
                  className="w-10 h-10 text-white mb-6 group-hover:scale-110 transition-transform duration-300"
                  strokeWidth={1.5}
                />
                <h3 className="text-xl font-bold text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-white/60 leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid Section */}
      <section
        id="shop"
        className="py-24 bg-background border-t border-white/5"
      >
        <div className="container px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                Latest Drops
              </h2>
              <p className="text-muted-foreground">
                Premium cleaning tools for every surface.
              </p>
            </div>
            <a
              href="/shop"
              className="hidden md:block text-white border-b border-white pb-1 hover:text-white/80 transition-colors"
            >
              View all products
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading
              ? Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square bg-white/5 animate-pulse rounded-2xl"
                    />
                  ))
              : products
                  .slice(0, 3)
                  .map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
            {!loading && products.length === 0 && (
              <div className="col-span-full text-center py-20 text-muted-foreground">
                New collection coming soon. Stay tuned!
              </div>
            )}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link to="/shop" className="text-white border-b border-white pb-1">
              View all products
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
