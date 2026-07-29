import { WEDDING } from "../data/wedding";
import { Reveal, Divider, LotusMark } from "./Reveal";

export default function Footer() {
  return (
    <footer
      className="relative bg-maroon text-ivory py-24 md:py-32 px-6 overflow-hidden"
      data-testid="footer-section"
    >
      <div className="absolute inset-0 paper-grain opacity-30 pointer-events-none" />
      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal>
          <LotusMark className="h-8 w-8 text-gold mx-auto" />
          <p className="mt-8 font-accent tracking-[0.35em] uppercase text-[11px] text-gold">
            Invited by
          </p>
          {WEDDING.invitedBy.map((n) => (
            <p key={n} className="mt-2 font-display text-2xl md:text-3xl italic">
              {n}
            </p>
          ))}

          <div className="my-12 opacity-80">
            <Divider />
          </div>

          <p className="font-display italic text-4xl md:text-6xl">
            {WEDDING.bride.first} <span className="text-gold">&amp;</span> {WEDDING.groom.first}
          </p>
          <p className="mt-6 font-body text-sm tracking-[0.2em] uppercase text-ivory/70">
            {WEDDING.dateLabel} · Hyderabad
          </p>
          <p className="mt-10 font-body text-xs tracking-[0.15em] text-ivory/50">
            {WEDDING.compliments}
          </p>
        </Reveal>
      </div>
    </footer>
  );
}
