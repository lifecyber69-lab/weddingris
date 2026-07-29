import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { WEDDING, IMAGES } from "../data/wedding";
import { Reveal, LotusMark, EASE } from "./Reveal";

function useCountdown(targetISO) {
  const calc = () => {
    const diff = new Date(targetISO).getTime() - Date.now();
    const clamp = Math.max(0, diff);
    return {
      days: Math.floor(clamp / 86400000),
      hours: Math.floor((clamp % 86400000) / 3600000),
      minutes: Math.floor((clamp % 3600000) / 60000),
      seconds: Math.floor((clamp % 60000) / 1000),
      done: diff <= 0,
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, [targetISO]);
  return t;
}

const Unit = ({ value, label }) => (
  <div className="flex flex-col items-center" data-testid={`countdown-${label.toLowerCase()}`}>
    <div className="relative">
      <span className="font-display text-6xl sm:text-7xl md:text-8xl text-maroon tabular-nums leading-none">
        {String(value).padStart(2, "0")}
      </span>
    </div>
    <span className="mt-3 font-accent tracking-[0.3em] uppercase text-[10px] md:text-xs text-ink/60">
      {label}
    </span>
  </div>
);

export default function Countdown() {
  const t = useCountdown(WEDDING.muhurthamISO);

  return (
    <section
      id="countdown"
      className="relative bg-parchment py-28 md:py-40 px-6 overflow-hidden"
      data-testid="countdown-section"
    >
      <img
        src={IMAGES.temple}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-[0.7] pointer-events-none"
      />
      <div className="absolute inset-0 bg-parchment/15 pointer-events-none" />
      <div className="absolute inset-0 paper-grain pointer-events-none" />

      <div className="relative mx-auto max-w-5xl text-center">
        <Reveal>
          <span className="chapter-num block text-[5rem] md:text-[8rem]">02</span>
          <p className="font-accent tracking-[0.35em] uppercase text-xs text-maroon/70">
            Counting the moments
          </p>
          <h2 className="mt-6 font-display italic text-4xl md:text-6xl text-ink">
            The Sumuhurtham
          </h2>
          <p className="mt-4 font-body text-sm md:text-base tracking-[0.2em] uppercase text-ink/60">
            {WEDDING.dateLabel} · {WEDDING.timeLabel} · “{WEDDING.lagnam}”
          </p>
        </Reveal>

        {/* Special Save-the-Date centerpiece */}
        <Reveal delay={0.1}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, ease: EASE }}
            className="relative mx-auto mt-14 w-fit"
            data-testid="save-the-date"
          >
            {/* soft radiant glow */}
            <motion.div
              aria-hidden
              animate={{ opacity: [0.35, 0.6, 0.35], scale: [1, 1.06, 1] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 -m-6 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.28),transparent_70%)] blur-xl pointer-events-none"
            />

            <div className="relative bg-ivory/85 backdrop-blur-sm border border-gold/50 px-10 py-9 md:px-16 md:py-11 shadow-[0_25px_70px_rgba(45,27,27,0.14)]">
              <span className="absolute -top-px -left-px h-6 w-6 border-t-2 border-l-2 border-gold" />
              <span className="absolute -top-px -right-px h-6 w-6 border-t-2 border-r-2 border-gold" />
              <span className="absolute -bottom-px -left-px h-6 w-6 border-b-2 border-l-2 border-gold" />
              <span className="absolute -bottom-px -right-px h-6 w-6 border-b-2 border-r-2 border-gold" />

              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="h-px w-8 bg-gold/60" />
                <LotusMark className="h-4 w-4 text-gold" />
                <span className="font-accent tracking-[0.4em] uppercase text-[10px] md:text-xs text-maroon/80">
                  Save the Date
                </span>
                <LotusMark className="h-4 w-4 text-gold" />
                <span className="h-px w-8 bg-gold/60" />
              </div>

              <div className="flex items-center justify-center gap-6 md:gap-9">
                <div className="text-right">
                  <p className="font-accent tracking-[0.25em] uppercase text-sm md:text-lg text-ink/70">Wed</p>
                  <p className="font-accent tracking-[0.25em] uppercase text-[10px] md:text-xs text-ink/45 mt-1">Muhurtham</p>
                </div>

                <div className="relative">
                  <span
                    className="block font-display font-semibold leading-[0.8] text-[6.5rem] md:text-[10rem] text-transparent bg-clip-text bg-gradient-to-b from-[#E7C766] via-gold to-[#9A7B1E]"
                    style={{ WebkitTextStroke: "0.5px rgba(128,0,0,0.12)" }}
                  >
                    26
                  </span>
                  <motion.span
                    aria-hidden
                    animate={{ x: ["-120%", "220%"] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.2 }}
                    className="absolute inset-y-3 w-1/3 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/55 to-transparent pointer-events-none"
                  />
                </div>

                <div className="text-left">
                  <p className="font-accent tracking-[0.25em] uppercase text-sm md:text-lg text-ink/70">August</p>
                  <p className="font-accent tracking-[0.25em] uppercase text-[10px] md:text-xs text-ink/45 mt-1">2026</p>
                </div>
              </div>

              <p className="mt-5 font-body tracking-[0.28em] uppercase text-[11px] md:text-sm text-maroon">
                {WEDDING.timeLabel} · {WEDDING.lagnam}
              </p>
            </div>
          </motion.div>
        </Reveal>

        <Reveal delay={0.15}>
          <div
            className="mt-16 grid grid-cols-4 gap-4 md:gap-10 max-w-3xl mx-auto"
            data-testid="countdown-timer"
          >
            <Unit value={t.days} label="Days" />
            <Unit value={t.hours} label="Hours" />
            <Unit value={t.minutes} label="Minutes" />
            <Unit value={t.seconds} label="Seconds" />
          </div>
        </Reveal>

        {t.done && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-10 font-display italic text-3xl text-gold"
          >
            The celebration has begun!
          </motion.p>
        )}
      </div>
    </section>
  );
}
