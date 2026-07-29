# PRD — Sindhuja & Pradeep Digital Wedding Invitation

## Original Problem Statement
"Interactive and charming wedding invitation with all the required elements for digital invitation."
Reference: traditional South-Indian (Telugu) wedding invitation image. Awwwards-level craft requested.

## User Choices
- RSVP: Yes (DB-only, no email)
- Live countdown to muhurtham
- Venue with Google Map
- Traditional temple style (per reference image)
- No 3rd-party integrations

## Architecture
- Backend: FastAPI + MongoDB (motor). Routes under /api.
- Frontend: React 19 (CRA/craco), Tailwind, framer-motion, lenis (smooth scroll), react-fast-marquee, shadcn/ui (Select dropdown, sonner toast).
- Design system: cream/ivory bg (#FDFBF7), maroon (#800000) + gold (#D4AF37) accents; fonts Cormorant Garamond (display), Italiana (accent), Outfit (body).

## Backend Endpoints
- GET /api/ — health
- POST /api/rsvp, GET /api/rsvp, GET /api/rsvp/stats
- POST /api/wishes, GET /api/wishes

## What's Implemented (2026-07-29)
- Kinetic hero with masked line-by-line name reveal + parallax botanicals
- Editorial marquee ribbon
- Chapter 01 Invitation (bride/groom + parents)
- Chapter 02 live Countdown to 26 Aug 2026 11:24 IST (Thula Lagnam)
- Chapter 03 Events & Venues — Wedding (N.K.N.R. Gardens) + Reception (Naina Convention) with embedded Google Maps + directions
- Chapter 04 Gallery bento grid
- Chapter 05 RSVP form (name, attend toggle, guest dropdown, event toggles, message) + live Wishes Wall + stats
- Footer (Invited by / compliments)
- Lenis smooth scroll, framer-motion scroll reveals, responsive nav
- Verified: all endpoints via curl; full RSVP submit + toast + wishes wall via browser.

## Backlog / Next
- P1: Add photo upload for gallery (needs object storage integration)
- P1: Email confirmation on RSVP (Resend integration)
- P2: Add-to-calendar (.ics) button, background music toggle, multi-language (Telugu) copy
- P2: Admin view to export RSVP list
