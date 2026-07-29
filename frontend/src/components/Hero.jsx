import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { WEDDING, IMAGES } from "../data/wedding";
import { LotusMark, FloralCorner, EASE } from "./Reveal";

const line = {
  hidden: { y: "115%" },
  show: (i) => ({
    y: "0%",
    transition: { duration: 1.05, ease: EASE, delay: 0.6 + i * 0.14 },
  }),
};

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: (d) => ({ opacity: 1, y: 0, transition: { duration: 1, ease: EASE, delay: d } }),
};

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const yFloral = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-ivory"
      data-testid="hero-section"
    >
      {/* Attached deity image as soft full-bleed background */}
      <motion.div
        aria-hidden
        style={{ y: yBg }}
        className="absolute inset-0 pointer-events-none"
      >
        <img
          src={IMAGES.deityAltar}
          alt=""
          className="h-full w-full object-cover opacity-[0.28]"
        />
      </motion.div>
      <div className="absolute inset-0 paper-grain pointer-events-none" />
      {/* keep center text crisp */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(253,251,247,0.82)_0%,rgba(253,251,247,0.55)_42%,rgba(253,251,247,0.25)_72%)] pointer-events-none" />

      {/* Traditional floral corner elements (like the invitation) */}
      <motion.div style={{ y: yFloral }} className="pointer-events-none">
        <FloralCorner className="absolute top-16 left-4 md:top-20 md:left-8 w-24 md:w-40 text-gold/70" />
        <FloralCorner className="absolute top-16 right-4 md:top-20 md:right-8 w-24 md:w-40 text-gold/70 scale-x-[-1]" />
      </motion.div>
      <FloralCorner className="absolute bottom-4 left-4 md:bottom-8 md:left-8 w-24 md:w-40 text-gold/60 -scale-y-100 pointer-events-none" />
      <FloralCorner className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-24 md:w-40 text-gold/60 scale-x-[-1] -scale-y-100 pointer-events-none" />

      <motion.div style={{ y: yText, opacity }} className="relative z-10 text-center px-6">
        {/* Divine blessing — Sri Venkateswara with Sridevi & Bhudevi */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
          className="mx-auto mb-8 w-fit"
        >
          <div className="relative p-2 border border-gold/50 bg-ivory/60 backdrop-blur-sm shadow-[0_10px_30px_rgba(45,27,27,0.12)]">
            <span className="absolute -top-px -left-px h-4 w-4 border-t-2 border-l-2 border-gold" />
            <span className="absolute -top-px -right-px h-4 w-4 border-t-2 border-r-2 border-gold" />
            <span className="absolute -bottom-px -left-px h-4 w-4 border-b-2 border-l-2 border-gold" />
            <span className="absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-gold" />
            <img
              src={IMAGES.deity}
              alt="Sri Venkateswara Swamy with Sridevi and Bhudevi"
              className="h-28 w-40 md:h-40 md:w-60 object-cover"
              data-testid="hero-deity-image"
            />
          </div>
          <p className="mt-3 font-accent tracking-[0.4em] uppercase text-[10px] text-maroon/70">
            Shubhamastu
          </p>
        </motion.div>

        <motion.p
          variants={fade}
          custom={0.25}
          initial="hidden"
          animate="show"
          className="font-accent tracking-[0.45em] text-[11px] md:text-sm uppercase text-maroon/80 mb-8"
        >
          Together with their families
        </motion.p>

        <h1 className="font-display text-ink leading-[0.92]">
          <span className="mask-line">
            <motion.span variants={line} custom={0} initial="hidden" animate="show" className="block text-6xl sm:text-8xl lg:text-[10rem] italic font-medium">
              {WEDDING.bride.first}
            </motion.span>
          </span>
          <span className="mask-line my-2 md:my-4">
            <motion.span
              variants={line}
              custom={1}
              initial="hidden"
              animate="show"
              className="flex items-center justify-center gap-5 text-3xl sm:text-5xl text-gold"
            >
              <span className="h-px w-10 md:w-20 bg-gold/50" />
              <LotusMark className="h-7 w-7" />
              <span className="font-accent not-italic text-2xl md:text-4xl">and</span>
              <LotusMark className="h-7 w-7" />
              <span className="h-px w-10 md:w-20 bg-gold/50" />
            </motion.span>
          </span>
          <span className="mask-line">
            <motion.span variants={line} custom={2} initial="hidden" animate="show" className="block text-6xl sm:text-8xl lg:text-[10rem] italic font-medium">
              {WEDDING.groom.first}
            </motion.span>
          </span>
        </h1>

        <motion.div
          variants={fade}
          custom={1.5}
          initial="hidden"
          animate="show"
          className="mt-10 font-body text-sm md:text-base tracking-[0.25em] uppercase text-ink/70"
        >
          {WEDDING.dateLabel} · Hyderabad
        </motion.div>
      </motion.div>

      <motion.div
        variants={fade}
        custom={2}
        initial="hidden"
        animate="show"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-accent text-[10px] tracking-[0.3em] uppercase text-maroon/60">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="h-8 w-px bg-gold/60"
        />
      </motion.div>
    </section>
  );
}
