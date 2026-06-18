# Sanity setup & content guide

The site is fully wired for Sanity but **not yet connected to a project**. Until
the steps below are done, the site renders from bundled fallback copy
(`src/lib/fallback-content.ts`) and the Studio at `/studio` has no real data
behind it. Everything is editable in **English and Polish** from one Studio.

The Sanity project should be **owned by the client** — create it while logged in
to the client's Sanity account (the one tied to the client's email).

---

## 1. Create the project (client account)

From the project folder, log in as the client and create the project + dataset:

```bash
npx sanity login          # opens a browser — sign in with the CLIENT's account
npx sanity init --env     # create a NEW project, dataset name: production
```

`sanity init --env` writes the project ID and dataset into a local env file.
Alternatively, create the project at https://www.sanity.io/manage and copy the
**Project ID** manually.

## 2. Set environment variables

Copy `.env.example` to `.env.local` and fill in the Sanity values:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=<your-project-id>
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-02-19
```

Add the same three variables to the hosting provider (e.g. Vercel) for
production. They are public (`NEXT_PUBLIC_`) by design — no secret token is
needed for the website to read content.

## 3. Allow the Studio origin (CORS)

In https://www.sanity.io/manage → your project → **API → CORS origins**, add the
site origins with **credentials allowed**:

- `http://localhost:3000`
- your production URL (e.g. `https://rosemedical.pl`)

## 4. Seed the current content

This recreates today's exact copy (site settings, home page, interface labels,
and the brands, including uploading the brand images) so the Studio starts full
instead of empty:

```bash
npm run seed
```

(That runs `sanity exec scripts/seed.ts --with-user-token`.) It is safe to
re-run — documents have fixed IDs and are overwritten, never duplicated.

## 5. Edit content

Run `npm run dev` and open **http://localhost:3000/studio**. In production the
Studio lives at `https://<your-domain>/studio`.

---

## What the client can edit (EN + PL everywhere)

The Studio sidebar is organised into:

- **Site settings** — site title, SEO description, logos, contact details
  (email, phone, address, socials), navigation menu, footer text.
- **Home page** — hero, stats, about, feature cards, products intro, catalog
  call-to-action, and the contact block.
- **Interface labels** — the small UI text: hero captions ("Scroll to Explore",
  "Next"), brand-page buttons ("Download catalog", "Back to brands"…),
  contact-form labels, and the "Menu" button. Grouped into collapsible sections.
- **Brands** — one document per brand: name, slug, visibility, "featured",
  "coming soon", display order, tagline, description, image, EN/PL catalog URLs,
  product categories, and notes.
- **Asset files** — catalogs / certificates / marketing PDFs.

Every text field with two inputs is **English + Polish**. The Polish site lives
at `/pl`; if a Polish value is left blank, the site falls back to English.

Site settings, the home page, and interface labels are **singletons** — they
can't be duplicated or deleted, only edited.

## How content reaches the site

`src/lib/content.ts` fetches from Sanity with a 120-second cache and falls back
to the bundled copy if Sanity is unreachable or a field is empty — so the site
never breaks while the client is editing. Changes appear within ~2 minutes (or
immediately on the next deploy / cache revalidation).
