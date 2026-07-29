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
