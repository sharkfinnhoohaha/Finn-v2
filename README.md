# Finn Bennett — Portfolio

Personal portfolio. Three altitudes, one site.

**Ground** (Overlook Strategy) → **Studio** (Overlook Audio) → **Flight** (Aviation)

Built with Next.js 14 App Router, Sanity v3, Framer Motion, Lenis smooth scroll. Deployed on Vercel.

---

## Local dev (5 minutes, no Sanity required)

The site ships with realistic fallback content and SVG placeholder images. It runs immediately with zero external config.

```bash
# 1. Install
npm install         # or pnpm / yarn

# 2. Copy env (leave values empty for now)
cp .env.example .env.local

# 3. Run
npm run dev
# → http://localhost:3000
# → http://localhost:3000/studio  (Sanity Studio, needs project ID first)
```

---

## Deploy to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "init"
gh repo create finn-portfolio --private --source=. --push
```

### 2. Import in Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your repo
3. Framework: **Next.js** (auto-detected)
4. Click **Deploy** — the site goes live with fallback content immediately

### 3. Wire up Sanity (optional but recommended)

**Create a Sanity project:**

```bash
npx sanity@latest init --env
# Choose: "Create new project"
# Dataset: production
# This writes NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET to .env.local
```

Then confirm `.env.local` contains:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-03-01
SANITY_REVALIDATE_SECRET=your_random_secret
```

The repo includes `sanity.cli.ts`, so Sanity CLI commands work directly from this project root.

**Add env vars to Vercel:**

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `SANITY_REVALIDATE_SECRET` | Any long random string |

In Vercel: **Project → Settings → Environment Variables**. Redeploy after adding.

**Configure the revalidation webhook in Sanity:**

1. Go to [sanity.io/manage](https://sanity.io/manage) → your project → **API → Webhooks**
2. Add webhook:
   - **URL:** `https://your-domain.vercel.app/api/revalidate`
   - **Secret:** same value as `SANITY_REVALIDATE_SECRET`
   - **Trigger on:** Create, Update, Delete
3. Save — content changes now revalidate the Next.js cache within 60 seconds

**Authorize your domain in Sanity CORS:**

1. Sanity manage → **API → CORS Origins**
2. Add `https://your-domain.vercel.app` (and `http://localhost:3000` for local Studio)

---

## Replace placeholder images

Every section has a technical-drawing SVG placeholder. Swap them out by:

1. Drop your real photos into `public/images/`
2. Update the `url` values in `lib/fallback.ts` to point to your files
3. Or (preferred) — upload images directly in the Sanity Studio and they'll flow in automatically

**Placeholder → real photo mapping:**

| File | Used for |
|---|---|
| `placeholder-flight.svg` | Aviation altitude hero |
| `placeholder-studio.svg` | Overlook Audio altitude hero |
| `placeholder-ground.svg` | Overlook Strategy altitude hero |
| `placeholder-moment-1.svg` → `7.svg` | Horizontal scroll gallery |
| `placeholder-project-1.svg` → `3.svg` | Rustler, Sømliøya, Three Altitudes |
| `placeholder-release-1.svg` → `3.svg` | Lower Frequencies EP, Coastal, Alchemy |
| `placeholder-log-1.svg` → `3.svg` | Logbook entries |

---

## Sanity content model

| Schema | Purpose |
|---|---|
| `altitude` | The three altitude tiers (hero image/video, stats, intro) |
| `moment` | Captioned photos in the horizontal scroll gallery |
| `project` | Overlook Strategy client work |
| `release` | Overlook Audio releases (includes signal chain field) |
| `logbook` | Aviation logbook entries |
| `settings` | Tagline, manifesto, location, socials, "Now" ticker items |

Studio lives at `/studio` — password protected by Sanity's built-in auth. No separate admin route needed.

---

## Project structure

```
app/
  (site)/           # Site shell with nav + footer
    page.tsx        # Homepage
    about/          # About / colophon
    altitudes/[slug] # Ground / Studio / Flight detail pages
  studio/           # Embedded Sanity Studio (no nav/footer)
  api/revalidate/   # Sanity webhook handler
  components/       # All UI components
  globals.css       # Tailwind base + custom utilities
lib/
  fallback.ts       # Content shown when Sanity is not configured
  types.ts          # TypeScript types
sanity/
  client.ts         # Sanity client + sanityFetch helper
  queries.ts        # All GROQ queries
  schemas/          # 6 content schemas
public/
  images/           # SVG placeholders → replace with real photos
```

---

## Design system notes

**Palette:** bone (`#F1EDE4`) / ink (`#0C0C0B`) / signal (`#FF6B1A`).
Signal orange is the only non-neutral color — used sparingly on interactive elements and key italic type.

**Typography:** Instrument Serif (display, italic emphasis) + Inter (body) + JetBrains Mono (spec labels).

**Spec labels** (`.spec` class): mono, 0.6875rem, tracked wide, uppercase. Used for all metadata callouts — mimics aviation sectional chart annotations.

**Grain overlay:** CSS SVG filter in `globals.css`. The entire site shell has `class="grain"`. Zero performance cost.

---

## Customization

- **Color accent:** change `--signal` in `globals.css` and `signal` in `tailwind.config.ts`
- **Tagline / manifesto:** edit `lib/fallback.ts` or update Settings in the Studio
- **Add a project:** Studio → Projects → New, mark `featured: true` to surface on homepage
- **Add a logbook entry:** Studio → Logbook Entry → New. Recent entries surface on homepage and Flight detail page
- **Now ticker:** Studio → Site Settings → Now. Each string becomes a marquee item

---

## Commands

```bash
npm run dev          # Local dev server
npm run build        # Production build
npm run typegen      # Regenerate Sanity TypeScript types (after schema changes)
npm run lint         # ESLint
```
