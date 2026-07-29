import { WEDDING, IMAGES } from "../data/wedding";
import { Reveal, Divider } from "./Reveal";

export default function Invitation() {
  return (
    <section
      id="invitation"
      className="relative bg-ivory py-28 md:py-40 px-6 md:px-10 overflow-hidden"
      data-testid="invitation-section"
    >
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
        {/* Chapter number */}
        <div className="lg:col-span-4">
          <Reveal>
            <span className="chapter-num block text-[7rem] md:text-[11rem]">01</span>
            <p className="font-accent tracking-[0.35em] uppercase text-xs text-maroon/70 -mt-4 md:-mt-8">
              The Invitation
            </p>
          </Reveal>
        </div>

        {/* Message */}
        <div className="lg:col-span-8">
          <Reveal delay={0.1}>
            <p className="font-display text-3xl md:text-5xl leading-snug italic text-ink text-balance">
              We solicit your gracious presence with family &amp; friends on the auspicious
              occasion of the marriage of
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-6">
            <Reveal delay={0.15}>
              <p className="font-accent tracking-[0.3em] uppercase text-[11px] text-gold mb-3">
                The Bride
              </p>
              <h3 className="font-display text-4xl md:text-5xl text-maroon">{WEDDING.bride.full}</h3>
              <p className="mt-3 font-body text-sm text-ink/60 leading-relaxed">
                {WEDDING.bride.parents}
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="font-accent tracking-[0.3em] uppercase text-[11px] text-gold mb-3">
                The Groom
              </p>
              <h3 className="font-display text-4xl md:text-5xl text-maroon">{WEDDING.groom.full}</h3>
              <p className="mt-3 font-body text-sm text-ink/60 leading-relaxed">
                {WEDDING.groom.parents}
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl mt-24">
        <Divider label="Blessed Union" />
      </div>

      {/* Decorative lotus */}
      <img
        src={IMAGES.lotus}
        alt=""
        aria-hidden
        className="absolute -bottom-20 right-0 w-52 md:w-72 opacity-20 mix-blend-multiply pointer-events-none"
      />
    </section>
  );
}
