# Rose Medical

Production Next.js migration for `rosemedical.pl`.

## Stack

- Next.js App Router and TypeScript
- Tailwind CSS
- Sanity CMS embedded at `/studio`
- Resend contact email API at `/api/contact`
- English default route at `/`, Polish route at `/pl`

## Setup

Copy `.env.example` to `.env.local` and fill in:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `CONTACT_TO_EMAIL`

The site includes fallback content and local Framer-migrated assets, so it builds before Sanity is configured.

## Development

```bash
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm run lint
npm run typecheck
npm run build
```
