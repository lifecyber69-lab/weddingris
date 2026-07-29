import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

// Fade + drift up on scroll into view.
export const Reveal = ({ children, delay = 0, y = 32, className = "", ...rest }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.9, ease: EASE, delay }}
    {...rest}
  >
    {children}
  </motion.div>
);

// Gold lotus / diamond divider used between chapters.
export const Divider = ({ label }) => (
  <div className="flex items-center justify-center gap-4 py-2" aria-hidden="true">
    <span className="h-px w-16 md:w-28 bg-gradient-to-r from-transparent to-gold/60" />
    <LotusMark className="h-5 w-5 text-gold" />
    {label ? (
      <span className="font-accent tracking-[0.35em] text-xs uppercase text-maroon/70">
        {label}
      </span>
    ) : null}
    <LotusMark className="h-5 w-5 text-gold" />
    <span className="h-px w-16 md:w-28 bg-gradient-to-l from-transparent to-gold/60" />
  </div>
);

export const LotusMark = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path
      d="M12 3c1.6 2 1.6 4.5 0 6.5C10.4 7.5 10.4 5 12 3Z"
      fill="currentColor"
      opacity="0.9"
    />
    <path
      d="M12 20c-3.3 0-6-2.2-6-5 1.9.3 3.3 1.1 4.2 2.2C10.9 15 11.4 13.7 12 12c.6 1.7 1.1 3 1.8 5.2C14.7 16.1 16.1 15.3 18 15c0 2.8-2.7 5-6 5Z"
      fill="currentColor"
    />
    <path d="M6.5 8.5C8 9 9.2 10 10 11.4 8.2 11.6 6.4 11 5 9.7c.4-.5.9-.9 1.5-1.2Z" fill="currentColor" opacity="0.7" />
    <path d="M17.5 8.5c-1.5.5-2.7 1.5-3.5 2.9 1.8.2 3.6-.4 5-1.7-.4-.5-.9-.9-1.5-1.2Z" fill="currentColor" opacity="0.7" />
  </svg>
);

export { EASE };

// Traditional gold floral corner flourish (SVG) — evokes invitation ornamentation.
export const FloralCorner = ({ className = "" }) => (
  <svg viewBox="0 0 160 160" fill="none" className={className} aria-hidden>
    <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M6 6c34 2 60 12 82 34s32 48 34 82" opacity="0.8" />
      <path d="M6 6c26 6 46 20 60 42" opacity="0.5" />
      <path d="M14 40c18-6 34-2 46 12" opacity="0.7" />
      <path d="M40 14c-6 18-2 34 12 46" opacity="0.7" />
    </g>
    <g fill="currentColor">
      {/* lotus buds along the vine */}
      <path d="M60 56c3 5 3 9 0 13-3-4-3-8 0-13Z" opacity="0.9" />
      <path d="M60 69c-4-1-7-3-8-7 4 0 7 2 8 7Z" opacity="0.75" />
      <path d="M60 69c4-1 7-3 8-7-4 0-7 2-8 7Z" opacity="0.75" />
      <circle cx="24" cy="24" r="3.4" opacity="0.9" />
      <path d="M96 44c2 3 2 6 0 9-2-3-2-6 0-9Z" opacity="0.7" />
      <path d="M44 96c3 2 6 2 9 0-3-2-6-2-9 0Z" opacity="0.7" />
    </g>
    {/* small five-petal marigold */}
    <g fill="currentColor" opacity="0.85" transform="translate(30 78)">
      <circle cx="0" cy="0" r="2.2" />
      <ellipse cx="0" cy="-7" rx="2.4" ry="4" />
      <ellipse cx="7" cy="-2" rx="4" ry="2.4" />
      <ellipse cx="4" cy="6" rx="2.4" ry="4" transform="rotate(20 4 6)" />
      <ellipse cx="-4" cy="6" rx="2.4" ry="4" transform="rotate(-20 -4 6)" />
      <ellipse cx="-7" cy="-2" rx="4" ry="2.4" />
    </g>
  </svg>
);
