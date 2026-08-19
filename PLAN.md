# Project Plan — InnovateUS Registration (with Newsletter Opt-in)

## Decisions made
- **Design:** hypothetical registration form, built with InnovateUS's real brand kit — not a pixel-copy of the live page, since `/register` is a Zoom Events widget with no current events (nothing static to trace)
- **Token handling:** Vercel serverless function (`/api/submit`) holds `DIRECTUS_TOKEN` server-side; the client never talks to Directus directly
- **Schema check:** you're running the curl commands below and sharing the output — I can't make authenticated requests myself

## Brand kit (confirmed from innovate-us.org/brandkit)
- **Colors:** Deep Space Blue `#142941`, Steel Azure `#124D8F`, Smart Blue `#0064d1`, Harvest Gold `#D09006`, Golden Pollen `#FDCE3E`, Blue Spruce `#097261`, Icy Blue `#bcd8f6`, Alice Blue `#e4effc`, Ghost White `#f9fbff`
- **Fonts:** DM Serif Display (titles), Libre Franklin (body/labels) — both on Google Fonts
- **Logo:** "innovate" in dark blue + "(us)" in gold, lowercase

## Phase 0 — Schema check (blocked on you)
Run this and send me the output:
```bash
export DIRECTUS_TOKEN=<token from the assignment email>
curl https://burnes-center.directus.app/fields/cw_intake \
  -H "Authorization: Bearer $DIRECTUS_TOKEN"
```
This tells us whether a newsletter-type field already exists, its name, and its type.

If it's missing, we'll also need to try adding it:
```bash
curl -X POST https://burnes-center.directus.app/fields/cw_intake \
  -H "Authorization: Bearer $DIRECTUS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"field": "newsletter_opt_in", "type": "boolean", "meta": {"interface": "boolean"}, "schema": {"default_value": false}}'
```
If that 403s, send me the error — we'll fall back to a checkbox that's UI-only (selectable/deselectable, not necessarily persisted) rather than assume a field that isn't there.

## Phase 1 — Static design (unblocked, starting now)
`index.html` / `style.css`: nav + footer styled to the brand kit, hypothetical registration card (name, email, newsletter checkbox, submit button). Other real-site elements (nav links, any SSO-style buttons) are visual only, per your note — not wired up.

## Phase 2 — Submit logic
`script.js` posts to `/api/submit`. `api/submit.js` (Vercel function) forwards the request to Directus using the real field name confirmed in Phase 0.

## Phase 3 — Local testing
`vercel dev`, submit a few `you+1@example.org`-style entries, verify with a GET, then one real entry.

## Phase 4 — Deploy
Push to GitHub → import to Vercel → set `DIRECTUS_TOKEN` in Vercel's env vars → deploy → get the `*.vercel.app` link.

## Phase 5 — Write-up
≤300-word paragraph (AI tools used / how prompted / how tested / decisions made) — drafted once Phases 3–4 are actually done, not before.
