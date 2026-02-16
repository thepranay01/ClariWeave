import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ProductCard from "../components/common/ProductCard";
import useProductStore from "../store/productStore";
import BenefitsSection from "../components/home/BenefitsSection";

const Home = () => {
  const { products, fetchProducts, loading } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-black grid-bg">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero_car_cloth.jpg"
            alt="Red Microfiber Cloth on Black Car"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        <div className="container relative z-20 px-6 pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Text Content */}
            <div className="lg:col-span-8 flex flex-col items-start space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative"
              >
                <h1 className="text-7xl md:text-[10rem] leading-[0.8] font-display font-bold tracking-tighter text-white mix-blend-overlay opacity-50 select-none absolute -top-20 -left-10 hidden md:block">
                  CLARIWEAVE
                </h1>
                <h2 className="text-5xl md:text-8xl font-display font-bold text-white leading-[0.9] tracking-tight relative z-10">
                  PRECISION <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
                    IN EVERY FIBER
                  </span>
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="max-w-xl space-y-6"
              >
                <div className="flex flex-wrap gap-4">
                  <span className="px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-xs uppercase tracking-widest text-white/80 backdrop-blur-sm">
                    Premium Collection
                  </span>
                  <span className="px-4 py-1.5 rounded-full border border-red-500/50 bg-red-500/10 text-xs uppercase tracking-widest text-red-400 backdrop-blur-sm">
                    Best Seller
                  </span>
                </div>

                <p className="text-lg md:text-xl text-zinc-300 font-light leading-relaxed">
                  Engineered for the perfectionist. Experience the ultimate in
                  automotive care with our ultra-plush, edgeless microfiber
                  towels designed for a scratch-free finish.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 pt-4">
                  <Link
                    to="/shop"
                    className="px-8 py-4 bg-white text-black font-medium tracking-widest text-sm uppercase hover:bg-zinc-200 transition-colors text-center"
                  >
                    Shop Collection
                  </Link>
                  <Link
                    to="/about"
                    className="px-8 py-4 bg-transparent border border-white/30 text-white font-medium tracking-widest text-sm uppercase hover:bg-white/10 transition-colors text-center"
                  >
                    Learn More
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Empty column for layout balance on large screens, or potential secondary image */}
            <div className="lg:col-span-4" />
          </div>
        </div>
      </section>

      {/* Benefits Section - Scroll Flip */}
      <BenefitsSection />

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
    </div>
  );
};

export default Home;
