import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { WEDDING, IMAGES } from "../data/wedding";
import { Reveal, Divider, EASE } from "./Reveal";

export default function Monogram() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);

  return (
    <section
      id="monogram"
      ref={ref}
      className="relative bg-parchment overflow-hidden py-28 md:py-44 px-6"
      data-testid="monogram-section"
    >
      {/* Illustration as soft parallax background */}
      <motion.div
        aria-hidden
        style={{ y: yBg, scale: scaleBg }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <img
          src={IMAGES.monogram}
          alt=""
          className="w-[130%] max-w-none md:w-[70%] opacity-[0.22] mix-blend-multiply object-contain"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-parchment via-parchment/40 to-parchment pointer-events-none" />

      {/* Foreground framed monogram */}
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="font-accent tracking-[0.4em] uppercase text-[11px] text-maroon/70 mb-8">
            Our Story, Woven Together
          </p>
        </Reveal>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.1, ease: EASE }}
          className="mx-auto w-fit"
        >
          <div className="relative p-2 border border-gold/50 bg-ivory shadow-[0_20px_60px_rgba(45,27,27,0.12)]">
            <span className="absolute -top-px -left-px h-5 w-5 border-t-2 border-l-2 border-gold" />
            <span className="absolute -top-px -right-px h-5 w-5 border-t-2 border-r-2 border-gold" />
            <span className="absolute -bottom-px -left-px h-5 w-5 border-b-2 border-l-2 border-gold" />
            <span className="absolute -bottom-px -right-px h-5 w-5 border-b-2 border-r-2 border-gold" />
            <img
              src={IMAGES.monogram}
              alt="Sindhuja & Pradeep illustrated monogram"
              className="w-[280px] md:w-[420px] aspect-square object-cover"
              data-testid="monogram-image"
            />
          </div>
        </motion.div>

        <Reveal delay={0.15}>
          <h2 className="mt-12 font-display italic text-5xl md:text-7xl text-maroon">
            {WEDDING.bride.first} <span className="text-gold not-italic">&amp;</span>{" "}
            {WEDDING.groom.first}
          </h2>
          <p className="mt-5 font-body text-sm md:text-base tracking-[0.2em] uppercase text-ink/60">
            Two hearts · One journey · A lifetime
          </p>
          <div className="mt-10">
            <Divider label="Forever begins" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
