import { MapPin, Clock, Calendar, Navigation } from "lucide-react";
import { WEDDING } from "../data/wedding";
import { Reveal, Divider } from "./Reveal";

const mapEmbed = (q) =>
  `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;
const mapLink = (q) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

function EventBlock({ ev, index }) {
  const flip = index % 2 === 1;
  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
      data-testid={`event-${ev.key}`}
    >
      {/* Map framed */}
      <Reveal className={flip ? "lg:order-2" : ""}>
        <div className="relative p-3 border border-gold/40 bg-ivory">
          <div className="absolute -top-px -left-px h-5 w-5 border-t-2 border-l-2 border-gold" />
          <div className="absolute -top-px -right-px h-5 w-5 border-t-2 border-r-2 border-gold" />
          <div className="absolute -bottom-px -left-px h-5 w-5 border-b-2 border-l-2 border-gold" />
          <div className="absolute -bottom-px -right-px h-5 w-5 border-b-2 border-r-2 border-gold" />
          <iframe
            title={`${ev.venue} map`}
            src={mapEmbed(ev.mapQuery)}
            className="w-full h-[300px] md:h-[380px] grayscale-[0.15]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            data-testid={`map-${ev.key}`}
          />
        </div>
      </Reveal>

      {/* Details */}
      <Reveal delay={0.1} className={flip ? "lg:order-1" : ""}>
        <p className="font-accent tracking-[0.35em] uppercase text-xs text-gold">{ev.subtitle}</p>
        <h3 className="mt-3 font-display italic text-5xl md:text-6xl text-maroon">{ev.title}</h3>

        <div className="mt-8 space-y-4 font-body text-ink/80">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-gold shrink-0 mt-0.5" />
            <span className="text-base md:text-lg">{ev.date}</span>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-gold shrink-0 mt-0.5" />
            <span className="text-base md:text-lg">
              {ev.time}
              <span className="block text-sm text-ink/50">{ev.note}</span>
            </span>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-gold shrink-0 mt-0.5" />
            <span className="text-base md:text-lg">
              <span className="font-display text-2xl text-ink">{ev.venue}</span>
              <span className="block text-sm text-ink/60 leading-relaxed">{ev.address}</span>
            </span>
          </div>
        </div>

        <a
          href={mapLink(ev.mapQuery)}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-maroon text-ivory font-body text-[12px] tracking-[0.2em] uppercase hover:bg-[#600000] transition-colors duration-300 group"
          data-testid={`directions-${ev.key}`}
        >
          <Navigation className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          Get Directions
        </a>
      </Reveal>
    </div>
  );
}

export default function Events() {
  return (
    <section
      id="events"
      className="relative bg-ivory py-28 md:py-40 px-6 md:px-10"
      data-testid="events-section"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <Reveal>
            <span className="chapter-num block text-[5rem] md:text-[8rem]">03</span>
            <p className="font-accent tracking-[0.35em] uppercase text-xs text-maroon/70">
              Where the joy unfolds
            </p>
            <h2 className="mt-4 font-display italic text-4xl md:text-6xl text-ink">
              Events &amp; Venues
            </h2>
          </Reveal>
        </div>

        <div className="space-y-28 md:space-y-40">
          {WEDDING.events.map((ev, i) => (
            <EventBlock key={ev.key} ev={ev} index={i} />
          ))}
        </div>

        <div className="mt-28">
          <Divider label="With love" />
        </div>
      </div>
    </section>
  );
}
