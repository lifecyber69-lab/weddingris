import { motion } from "framer-motion";
import { IMAGES } from "../data/wedding";
import { Reveal, EASE } from "./Reveal";

const shots = [
  { src: IMAGES.couple1, cls: "lg:col-span-7 lg:row-span-2 h-[320px] lg:h-[560px]", cap: "The Union" },
  { src: IMAGES.marigold, cls: "lg:col-span-5 h-[260px]", cap: "Blessings" },
  { src: IMAGES.couple2, cls: "lg:col-span-5 h-[280px]", cap: "Forever" },
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="relative bg-parchment py-28 md:py-40 px-6 md:px-10 overflow-hidden"
      data-testid="gallery-section"
    >
      <div className="absolute inset-0 paper-grain pointer-events-none" />
      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <Reveal>
            <span className="chapter-num block text-[5rem] md:text-[8rem]">04</span>
            <h2 className="font-display italic text-4xl md:text-6xl text-ink">Moments</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm font-body text-sm text-ink/60 leading-relaxed">
              A glimpse of the love, tradition and togetherness that brings two families as one.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 auto-rows-auto">
          {shots.map((s, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.1 }}
              className={`group relative overflow-hidden border border-gold/30 ${s.cls}`}
              data-testid={`gallery-item-${i}`}
            >
              <img
                src={s.src}
                alt={s.cap}
                className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <figcaption className="absolute bottom-4 left-4 font-display italic text-2xl text-ivory opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                {s.cap}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
