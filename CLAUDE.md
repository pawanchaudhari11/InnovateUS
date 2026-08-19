# InnovateUS Registration Prototype — Project Instructions

Take-home assignment for Anirudh Dinesh (Burnes Center, Northeastern) — due Fri Aug 21, 4PM ET.

See @PLAN.md for the phased roadmap and current status.

## How I want to work (read this first)
- **Ask before assuming.** If a requirement, field name, or design choice isn't confirmed, ask — don't guess and proceed.
- **Don't build everything at once.** Work through PLAN.md phase by phase; check in between phases rather than delivering the whole project in one shot.
- **Keep docs concise.** No exhaustive documentation — short and to the point.

## Confirmed decisions
- **Design:** hypothetical registration form using InnovateUS's real brand kit (below) — the live `/register` page is a Zoom Events widget with no fixed form to copy, so this is a from-scratch design in their brand system, not a pixel-trace.
- **Token handling:** a Vercel serverless function (`/api/submit`) holds `DIRECTUS_TOKEN` server-side. The client never calls Directus directly.
- **Schema:** NOT yet confirmed — this is Phase 0. Don't assume `newsletter_opt_in` is the right field name/type until a real GET on the fields endpoint confirms it. You now have real network access, so you can run the curl checks directly instead of asking me to.
- **Non-functional elements:** nav links, footer subscribe box, and other decorative elements from the real site are visual-only — they don't need to work, per explicit sign-off.

## Directus
- Items endpoint: `https://burnes-center.directus.app/items/cw_intake`
- Fields (schema) endpoint: `https://burnes-center.directus.app/fields/cw_intake`
- Auth: `Authorization: Bearer $DIRECTUS_TOKEN` — token is in the assignment email; ask the user for it rather than assuming a value.
- Testing protocol: submit a few plus-addressed test emails (`you+1@example.org`), verify via GET, then one real entry with real name/email.

## Brand kit (from innovate-us.org/brandkit)
- Colors: Deep Space Blue `#142941`, Steel Azure `#124D8F`, Smart Blue `#0064d1`, Harvest Gold `#D09006`, Golden Pollen `#FDCE3E`, Blue Spruce `#097261`, Icy Blue `#bcd8f6`, Alice Blue `#e4effc`, Ghost White `#f9fbff`
- Fonts: DM Serif Display (titles), Libre Franklin (body/labels) — both on Google Fonts
- Logo: hotlinked from `https://innovate-us.org/images/logos/innovateus.svg` (real InnovateUS asset — needs internet to render)

## Current state
- `index.html`, `style.css` — Phase 1 static design, done
- `script.js` — placeholder only (prevents default submit, shows a "Phase 2" message); real POST logic not written yet
- No `api/`, `package.json`, `.gitignore`, `.env.example`, or Vercel config yet — those are Phase 2+
- Deploy target: Vercel (not yet set up)

## Deliverables (email all three to Anirudh)
1. Working prototype link (Vercel)
2. GitHub repo link (or zip)
3. ≤300-word paragraph: AI tools used, how prompted, how tested, technical decisions — write this only after real testing happens, not before
