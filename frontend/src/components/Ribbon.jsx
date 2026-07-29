import Marquee from "react-fast-marquee";
import { LotusMark } from "./Reveal";

const items = [
  "26 August 2026",
  "Thula Lagnam",
  "N.K.N.R. Gardens",
  "Kukatpally · Hyderabad",
  "11:24 A.M.",
];

export default function Ribbon() {
  return (
    <div
      className="border-y border-gold/30 bg-parchment py-5 md:py-7 overflow-hidden"
      data-testid="marquee-ribbon"
    >
      <Marquee speed={38} gradient={false} autoFill>
        {items.map((t, i) => (
          <span key={i} className="flex items-center">
            <span className="font-display italic text-2xl md:text-4xl text-maroon/85 px-8 md:px-12">
              {t}
            </span>
            <LotusMark className="h-5 w-5 md:h-6 md:w-6 text-gold" />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
