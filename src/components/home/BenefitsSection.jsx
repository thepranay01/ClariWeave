import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const benefits = [
  {
    id: 1,
    title: "Showroom Shine",
    description:
      "Experience a flawless finish on your vehicle with our ultra-plush fibers that trap dirt without scratching.",
    image: "/images/context_car.jpg",
    note: "Safe on all paint types!",
    align: "left",
  },
  {
    id: 2,
    title: "Smudge-Free Screens",
    description:
      "Keep your smartphone crystal clear. Removes fingerprints and oils instantly without harsh chemicals.",
    image: "/images/context_mobile.jpg",
    note: "Oleophobic safe.",
    align: "right",
  },
  {
    id: 3,
    title: "Dust-Free Workspace",
    description:
      "The static charge pulls dust from your laptop screen and keyboard, ensuring a pristine work environment.",
    image: "/images/context_laptop.jpg",
    note: "Anti-static power.",
    align: "left",
  },
  {
    id: 4,
    title: "Road Ready",
    description:
      "Perfect for motorcycle detailing. Clean sensitive instruments and tanks with confidence.",
    image: "/images/context_bike.jpg",
    note: "Precision cleaning.",
    align: "right",
  },
];

const Card = ({ card, i, progress, range, targetScale }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  // Grayscale transition: Full grayscale when entering (0), Color (0 grayscale) when focused/centered (approx 0.5-0.8)
  const grayscale = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className="flex flex-col relative w-[90vw] md:w-[70vw] h-[75vh] md:h-[60vh] rounded-3xl overflow-hidden bg-zinc-900 border border-white/10 origin-top shadow-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          {/* Text Section relative to alignment */}
          <div
            className={`p-6 md:p-12 flex flex-col justify-center gap-4 md:gap-6 ${
              card.align === "right" ? "md:order-2" : "md:order-1"
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-display font-black text-white uppercase leading-none">
              {card.title}
            </h2>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
              {card.description}
            </p>

            {/* Handwritten Note Style - Straight & White */}
            <div className="relative mt-4 md:mt-8">
              <span className="font-handwriting text-xl md:text-2xl text-white font-bold tracking-wide animate-[pulse_1s_ease-in-out_infinite]">
                {card.note}
              </span>
            </div>
          </div>

          {/* Image Section */}
          <div
            className={`relative h-full overflow-hidden min-h-[40%] ${
              card.align === "right" ? "md:order-1" : "md:order-2"
            }`}
          >
            <motion.div
              style={{
                scale: imageScale,
                filter: useTransform(grayscale, (v) => `grayscale(${v})`),
              }}
              className="w-full h-full"
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover transition-all duration-700 ease-in-out"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const BenefitsSection = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={container} className="relative bg-black text-white px-4">
      {/* Header */}
      <div className="h-[50vh] flex items-center justify-center sticky top-0 bg-black z-0 mb-20 pointer-events-none">
        <h2 className="text-6xl md:text-9xl font-display font-black text-center opacity-20 uppercase">
          Why We
          <br />
          Exist
        </h2>
      </div>

      {benefits.map((card, i) => {
        const targetScale = 1 - (benefits.length - i) * 0.05;
        return (
          <Card
            key={i}
            i={i}
            card={card}
            progress={scrollYProgress}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
          />
        );
      })}

      {/* Spacer for bottom */}
      <div className="h-[20vh]" />
    </section>
  );
};

export default BenefitsSection;
