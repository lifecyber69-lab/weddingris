import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IMAGES } from "../data/wedding";

const LINKS = [
  { id: "invitation", label: "Invitation" },
  { id: "countdown", label: "Muhurtham" },
  { id: "events", label: "Venues" },
  { id: "rsvp", label: "RSVP" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -40 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-ivory/85 backdrop-blur-md border-b border-gold/25" : "bg-transparent"
      }`}
      data-testid="main-nav"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10 h-16 flex items-center justify-between">
        <button
          onClick={() => go("hero")}
          className="flex items-center gap-2.5 group"
          data-testid="nav-logo"
        >
          <img
            src={IMAGES.monogram}
            alt="Sindhuja & Pradeep monogram"
            className="h-10 w-10 md:h-11 md:w-11 rounded-full object-cover ring-1 ring-gold/50 transition-transform duration-500 group-hover:scale-105"
          />
          <span className="font-accent tracking-[0.3em] text-sm text-maroon hidden sm:inline">S &amp; P</span>
        </button>

        <nav className="hidden md:flex items-center gap-9">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="font-body text-[13px] tracking-[0.18em] uppercase text-ink/70 hover:text-maroon transition-colors duration-300"
              data-testid={`nav-${l.id}`}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => go("rsvp")}
          className="hidden md:inline-flex items-center px-5 py-2 bg-maroon text-ivory font-body text-[12px] tracking-[0.2em] uppercase hover:bg-[#600000] transition-colors duration-300"
          data-testid="nav-rsvp-cta"
        >
          Reply
        </button>

        <button
          className="md:hidden font-body text-xs tracking-[0.2em] uppercase text-maroon"
          onClick={() => setOpen((o) => !o)}
          data-testid="nav-mobile-toggle"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-ivory/95 backdrop-blur border-t border-gold/20"
          >
            <div className="flex flex-col px-6 py-4">
              {[...LINKS, { id: "rsvp", label: "Reply" }].map((l) => (
                <button
                  key={l.id + l.label}
                  onClick={() => go(l.id)}
                  className="py-3 text-left font-body text-sm tracking-[0.18em] uppercase text-ink/80 border-b border-gold/10 last:border-0"
                  data-testid={`nav-mobile-${l.id}`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
