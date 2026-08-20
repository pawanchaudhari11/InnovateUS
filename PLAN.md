# Project Plan — InnovateUS Registration (with Newsletter Opt-in)

## Decisions made
- **Design:** hypothetical registration form, built with InnovateUS's real brand kit — not a pixel-copy of the live page, since `/register` is a Zoom Events widget with no current events (nothing static to trace)
- **Token handling:** Vercel serverless function (`/api/submit`) holds `DIRECTUS_TOKEN` server-side; the client never talks to Directus directly
- **Schema check:** you're running the curl commands below and sharing the output — I can't make authenticated requests myself

## Brand kit (confirmed from innovate-us.org/brandkit)
- **Colors:** Deep Space Blue `#142941`, Steel Azure `#124D8F`, Smart Blue `#0064d1`, Harvest Gold `#D09006`, Golden Pollen `#FDCE3E`, Blue Spruce `#097261`, Icy Blue `#bcd8f6`, Alice Blue `#e4effc`, Ghost White `#f9fbff`
- **Fonts:** DM Serif Display (titles), Libre Franklin (body/labels) — both on Google Fonts
- **Logo:** "innovate" in dark blue + "(us)" in gold, lowercase

## Phase 0 — Schema check (done)
Confirmed via `GET /fields/cw_intake`. The real collection is much richer than originally assumed — full field list:

| Field | Type | Required | Notes |
|---|---|---|---|
| `first_name` | string | yes | |
| `last_name` | string | yes | |
| `email` | string | yes | |
| `country` | string | yes | |
| `state` | string | no | only when country = United States |
| `gov_org` | string | yes | "the government-organization question, verbatim answer" |
| `gov_level` | string | no | only when gov_org is a yes |
| `workshop_series` | text | yes | "selected series, comma-joined — the form registers for SERIES" |
| `workshops` | text | no | only when a single workshop came via `?workshop=<id>` |
| `newsletter` | boolean | yes | confirmed field name (not `newsletter_opt_in`) |
| `consent_at` | timestamp | no | set client-side at submission time |

`workshop_series` is a **multi-select checklist** ("Selected Event Series") of the 14 real Fall 2026 Live Series names from innovate-us.org — matches what the live `/register` page's Zoom Events widget actually renders client-side (a plain HTML fetch only sees the pre-render "Loading events…" state, which is why this was missed initially). Selected series are comma-joined into `workshop_series`, per the field's own schema note. At least one must be selected to submit.

## Phase 1 — Static design (done, revised after Phase 0)
`index.html` / `style.css`: nav + footer styled to the brand kit, registration card expanded to match the confirmed schema — first/last name, email, country (+ conditional state), gov-org yes/no (+ conditional gov level), a "Selected Event Series" multi-select checklist (see Phase 0), newsletter checkbox, submit button. Other real-site elements (nav links, any SSO-style buttons) are visual only, per your note — not wired up.

## Phase 2 — Submit logic (done)
`script.js` posts JSON to `/api/submit`. `api/submit.js` (Vercel function) validates required fields, forwards to Directus with `DIRECTUS_TOKEN` (server-side only, via `process.env`), and proxies back a sanitized success/error response. `.env.example` documents the required env var.

## Phase 3 — Local testing (done)
No `vercel` CLI available locally, so `api/submit.js` was exercised with a minimal local Node harness (not committed) that calls the handler directly. All verified via `GET /items/cw_intake`, field values matched:
- `you+1@example.org` (US, gov_org=Yes, gov_level=Local) — id 12
- `you+2@example.org` (Canada, gov_org=No) — id 13
- `chaudhari.paw+1@northeastern.edu`, `chaudhari.paw+2@northeastern.edu` (plus-addressed, per Anirudh's format) — ids 14, 15
- Final real entry: Pawan Chaudhari, `chaudhari.paw@northeastern.edu` — id 16
- A missing-required-fields request correctly returned a 400

Note: the collection already contains other candidates' real test entries (shared assignment Directus instance) — visible to anyone with the token via GET.

## Phase 4 — Deploy
Note: earlier pushed commits were authored under a different local git identity (`pawan1162k`) than the `pawanchaudhari11` GitHub account that owns this repo/Vercel project, which blocked Vercel's GitHub deploy check ("not a member of the team"). Fixed the repo-local `git config user.name`/`user.email` to match `pawanchaudhari11` going forward; existing commit history was left as-is per your call.

Push to GitHub → import to Vercel → set `DIRECTUS_TOKEN` in Vercel's env vars → deploy → get the `*.vercel.app` link.

## Phase 5 — Write-up
≤300-word paragraph (AI tools used / how prompted / how tested / decisions made) — drafted once Phases 3–4 are actually done, not before.
