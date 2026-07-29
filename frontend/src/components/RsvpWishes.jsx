import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Heart, Send, Users } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Reveal, EASE, LotusMark } from "./Reveal";
import { createRsvp, createWish, getWishes, getRsvpStats } from "../lib/api";

const EVENT_OPTS = [
  { key: "wedding", label: "Wedding · 26 Aug" },
  { key: "reception", label: "Reception · 27 Aug" },
];

export default function RsvpWishes() {
  const [form, setForm] = useState({
    name: "",
    attending: true,
    guests: "1",
    events: ["wedding", "reception"],
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [wishes, setWishes] = useState([]);
  const [stats, setStats] = useState(null);

  const load = async () => {
    try {
      const [w, s] = await Promise.all([getWishes(), getRsvpStats()]);
      setWishes(w);
      setStats(s);
    } catch (e) {
      /* silent */
    }
  };

  useEffect(() => {
    load();
  }, []);

  const toggleEvent = (key) => {
    setForm((f) => ({
      ...f,
      events: f.events.includes(key)
        ? f.events.filter((e) => e !== key)
        : [...f.events, key],
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Please share your name.");
      return;
    }
    setSubmitting(true);
    try {
      await createRsvp({
        name: form.name.trim(),
        attending: form.attending,
        guests: form.attending ? parseInt(form.guests, 10) : 0,
        events: form.attending ? form.events : [],
        message: form.message.trim(),
      });
      if (form.message.trim()) {
        await createWish({ name: form.name.trim(), message: form.message.trim() });
      }
      toast.success(
        form.attending
          ? "Thank you! Your blessings are received. 🌸"
          : "Thank you for letting us know. You'll be missed!"
      );
      setForm({ name: "", attending: true, guests: "1", events: ["wedding", "reception"], message: "" });
      load();
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="rsvp"
      className="relative bg-ivory py-28 md:py-40 px-6 md:px-10"
      data-testid="rsvp-section"
    >
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Form */}
        <div>
          <Reveal>
            <span className="chapter-num block text-[5rem] md:text-[8rem]">05</span>
            <p className="font-accent tracking-[0.35em] uppercase text-xs text-maroon/70">
              Kindly respond
            </p>
            <h2 className="mt-3 font-display italic text-5xl md:text-6xl text-ink">R.S.V.P.</h2>
            <p className="mt-4 font-body text-sm text-ink/60 max-w-md leading-relaxed">
              Your presence would make our celebration complete. Please let us know if you can
              join, and leave a blessing for the couple.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={submit} className="mt-10 space-y-8" data-testid="rsvp-form">
              <div>
                <Label className="font-accent tracking-[0.2em] uppercase text-[11px] text-ink/60">
                  Your Name
                </Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Full name"
                  className="mt-2 rounded-none border-0 border-b border-gold/50 bg-transparent px-0 text-lg font-display focus-visible:ring-0 focus-visible:border-maroon placeholder:text-ink/30"
                  data-testid="rsvp-name-input"
                />
              </div>

              <div>
                <Label className="font-accent tracking-[0.2em] uppercase text-[11px] text-ink/60">
                  Will you attend?
                </Label>
                <div className="mt-3 flex gap-3">
                  {[
                    { v: true, l: "Joyfully accepts" },
                    { v: false, l: "Regretfully declines" },
                  ].map((opt) => (
                    <button
                      key={String(opt.v)}
                      type="button"
                      onClick={() => setForm({ ...form, attending: opt.v })}
                      className={`px-5 py-2.5 font-body text-[12px] tracking-[0.15em] uppercase border transition-colors duration-300 ${
                        form.attending === opt.v
                          ? "bg-maroon text-ivory border-maroon"
                          : "bg-transparent text-ink/70 border-gold/40 hover:border-maroon"
                      }`}
                      data-testid={`rsvp-attend-${opt.v ? "yes" : "no"}`}
                    >
                      {opt.l}
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence initial={false}>
                {form.attending && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="space-y-8 overflow-hidden"
                  >
                    <div>
                      <Label className="font-accent tracking-[0.2em] uppercase text-[11px] text-ink/60">
                        Number of guests
                      </Label>
                      <Select
                        value={form.guests}
                        onValueChange={(v) => setForm({ ...form, guests: v })}
                      >
                        <SelectTrigger
                          className="mt-2 rounded-none border-0 border-b border-gold/50 bg-transparent px-0 font-display text-lg focus:ring-0"
                          data-testid="rsvp-guests-trigger"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-ivory border-gold/40">
                          {[1, 2, 3, 4, 5, 6].map((n) => (
                            <SelectItem key={n} value={String(n)} data-testid={`rsvp-guests-${n}`}>
                              {n} {n === 1 ? "guest" : "guests"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="font-accent tracking-[0.2em] uppercase text-[11px] text-ink/60">
                        Events you will join
                      </Label>
                      <div className="mt-3 flex flex-wrap gap-3">
                        {EVENT_OPTS.map((ev) => (
                          <button
                            key={ev.key}
                            type="button"
                            onClick={() => toggleEvent(ev.key)}
                            className={`px-4 py-2 font-body text-[12px] tracking-[0.1em] uppercase border transition-colors duration-300 ${
                              form.events.includes(ev.key)
                                ? "bg-gold/20 text-maroon border-gold"
                                : "text-ink/60 border-gold/30 hover:border-gold"
                            }`}
                            data-testid={`rsvp-event-${ev.key}`}
                          >
                            {ev.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <Label className="font-accent tracking-[0.2em] uppercase text-[11px] text-ink/60">
                  A blessing for the couple
                </Label>
                <Textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Write your heartfelt wishes…"
                  rows={3}
                  className="mt-2 rounded-none border-0 border-b border-gold/50 bg-transparent px-0 font-body resize-none focus-visible:ring-0 focus-visible:border-maroon placeholder:text-ink/30"
                  data-testid="rsvp-message-input"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-maroon text-ivory font-body text-[12px] tracking-[0.25em] uppercase hover:bg-[#600000] transition-colors duration-300 disabled:opacity-60"
                data-testid="rsvp-submit-button"
              >
                <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                {submitting ? "Sending…" : "Send Response"}
              </button>
            </form>
          </Reveal>
        </div>

        {/* Wishes wall */}
        <div>
          <Reveal>
            <div className="flex items-center gap-3 mb-8">
              <LotusMark className="h-6 w-6 text-gold" />
              <h3 className="font-display italic text-4xl text-ink">Wishes Wall</h3>
            </div>
            {stats && (
              <div
                className="flex items-center gap-2 mb-8 font-body text-sm text-ink/60"
                data-testid="rsvp-stats"
              >
                <Users className="h-4 w-4 text-gold" />
                <span>
                  {stats.total_guests} loved ones joining · {stats.total_responses} responses
                </span>
              </div>
            )}
          </Reveal>

          <div className="space-y-4 max-h-[560px] overflow-y-auto pr-2" data-lenis-prevent data-testid="wishes-list">
            <AnimatePresence>
              {wishes.length === 0 && (
                <p className="font-display italic text-2xl text-ink/40">
                  Be the first to leave a blessing…
                </p>
              )}
              {wishes.map((w) => (
                <motion.div
                  key={w.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="relative border border-gold/25 bg-parchment/60 p-5"
                  data-testid={`wish-${w.id}`}
                >
                  <Heart className="absolute top-4 right-4 h-4 w-4 text-maroon/30" />
                  <p className="font-body text-ink/80 leading-relaxed pr-6">“{w.message}”</p>
                  <p className="mt-3 font-accent tracking-[0.2em] uppercase text-[11px] text-gold">
                    — {w.name}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
