import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { WEDDING, IMAGES } from "../data/wedding";
import { Reveal } from "./Reveal";

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
        className="absolute inset-0 h-full w-full object-cover opacity-[0.06] pointer-events-none"
      />
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
