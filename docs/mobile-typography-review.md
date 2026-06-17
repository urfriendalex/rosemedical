# Mobile Typography & Sizing Review

_Rose Medical site — review of type and sizing on mobile (< 640px / `sm`)._
_Lens: frontend-design (system & hierarchy) + emil-design-eng (craft details). No code changed yet — this is the alignment doc._

## TL;DR

The mobile layout works, but type is doing too many slightly-different things. There is **no shared type scale** — body copy alone appears at 14px, 14.5px, 16px, 18px, and 20px with five different line-heights. Two issues are real bugs (P0/P1), the rest are consistency and hierarchy refinements.

The single highest-leverage fix: **the display font is dead.** `Inter_Tight` is loaded in `layout.tsx` but the `font-display` class never resolves (see P1-A), so every headline on the site renders in Inter. Fixing that alone changes the whole feel.

---

## P0 — Bugs to fix

### P0-A · Contact inputs trigger iOS zoom-on-focus
`contact-form.tsx` — the `<label>` is `text-sm` (14px) and the `<input>`/`<textarea>` inherit it. Mobile Safari auto-zooms the viewport whenever a focused field's font-size is **< 16px**, then doesn't zoom back out. This is the most jarring mobile bug on the page.

| Before | After | Why |
| --- | --- | --- |
| `<input class="h-[52px] … px-5 …">` (inherits 14px) | add `text-base` (16px) to the input/textarea | ≥16px is the threshold below which iOS Safari force-zooms on focus |

Keep the **label** at 14px; only the field itself needs ≥16px.

---

## P1 — Hierarchy & system (high impact)

### P1-A · The display typeface (Inter Tight) never renders
`layout.tsx` loads `Inter_Tight` as `--font-display`, and `globals.css` maps `--font-serif` to Inter Tight. But:
- `font-display` is used **only** on the hero `<h1>` (`hero-carousel.tsx:102`), and `--font-display` is **not registered in `@theme inline`** → Tailwind v4 generates no `font-display` utility → the class is a no-op.
- `font-serif` (the registered Inter Tight alias) is **never used** anywhere.
- `AnimatedHeading` (every other big headline — Company, Products, Contact, Brand pages) applies **no font class at all** → falls back to body `font-sans` (Inter).

Net result: **100% of headings render in Inter.** The intended display/body contrast doesn't exist.

| Before | After | Why |
| --- | --- | --- |
| `font-display` on hero only, not in `@theme` | register `--font-display: var(--font-display-loaded)` (or rename the loader var) in `@theme inline` | Tailwind v4 only emits `font-*` utilities for theme-registered families |
| `AnimatedHeading` has no font family | give `AnimatedHeading` the display font by default | so all H1/H2/H3 share one display voice, not Inter |

Decision needed: confirm Inter Tight is the intended display face (it's a tight-tracking grotesk, good for the current `-0.045em` headings), or pick something with more character per the brand.

### P1-B · Heading hierarchy inverts on mid-size phones
The hero H1 scales at **8.6vw**; every section H2 scales at **10vw**. The H1 floor is `2.1rem` (33.6px); section H2 floor is `2.45rem` (39.2px).

On a 430px phone: hero H1 ≈ **37px**, but the Company/Products/Contact H2s ≈ **43px**. The most important headline on the page is *smaller* than the section headings below it.

| Viewport | Hero H1 (`clamp(2.1rem,8.6vw,3.3rem)`) | Section H2 (`clamp(2.45rem,10vw,6.1rem)`) |
| --- | --- | --- |
| 360px | 33.6px | 39.2px |
| 390px | 33.6px | 39.2px |
| 430px | **37.0px** | **43.0px** ← H2 > H1 |

| Before | After | Why |
| --- | --- | --- |
| Hero `clamp(2.1rem,8.6vw,3.3rem)`, sections `…,10vw,…` | raise the hero floor/rate so H1 ≥ section H2 at every width | H1 should never be visually outranked by a section heading |

### P1-C · No shared type scale — five competing "body" sizes
Body/paragraph copy on mobile, as it stands:

| Where | Size | Line-height |
| --- | --- | --- |
| Hero body | `14.5px` | 1.5 |
| Feature card body, brand card tagline, info-panel items, footer | `text-sm` 14px | `leading-6` (1.71) / `leading-relaxed` (1.625) |
| Company intro, brand-rail intro | `16px` | 1.5 / 1.55 |
| Products intro | `text-base` 16px | `leading-relaxed` |
| Contact body | `text-lg` 18px | `leading-8` (1.78) |
| Brand detail description | `20px` | 1.48 |

That's 5 sizes × ~5 line-heights with no ladder. Two specific oddities:
- **`14.5px` (hero body)** — a fractional one-off; should be a scale step (14 or 16).
- **`leading-8` on 18px (contact)** = 1.78, much looser than the 1.5 used for the same role elsewhere.

| Before | After | Why |
| --- | --- | --- |
| 14 / 14.5 / 16 / 18 / 20px ad hoc | define ~3 body steps (e.g. `--text-sm 14`, `--text-base 16`, `--text-lg 18`) + 2 line-heights (tight 1.45 display, body 1.55) and map every block to one | a scale is what makes type feel "intentional" vs assembled; also kills the 14.5px and leading-8 outliers |
| 14px body for primary reading copy | bump primary reading copy (feature/brand descriptions) toward 15–16px on mobile | 14px is light for sustained reading on a phone |

---

## P2 — Craft & polish

### P2-A · Micro-labels at 10–11px
Eyebrows/meta run at `text-[10px]` (hero eyebrow) and `text-[11px]` (Company/Products/Contact/footer/pagination) with `0.18em–0.28em` tracking, uppercase. At 10px, uppercase + wide tracking is near the legibility floor on a phone and reads as decoration more than label.

| Before | After | Why |
| --- | --- | --- |
| Hero eyebrow `text-[10px]` | `text-[11px]` minimum, ideally 12px on mobile | 10px uppercase tracked is below comfortable mobile legibility |
| Eyebrow sizes 10/11px scattered | standardize one eyebrow token (size + tracking + weight) | currently `section-eyebrow` class, inline `text-[11px]`, and `text-[10px]` all coexist for the same role |

### P2-B · Tight leading on the largest mobile headings
At the clamp floor, Company/Products/Contact H2s are ~39px at `leading-[1.03]`, and Brand H1 / Next-brand H2 use `leading-[1]`. With `text-balance` these wrap to 3–4 lines on a 360px screen; `leading-[1]` can clip descenders and feels cramped on a narrow column. (The tighter `sm:leading-[0.92]` only applies ≥640px, so mobile is fine there — this is about the base value.)

| Before | After | Why |
| --- | --- | --- |
| Mobile headings `leading-[1]` / `leading-[1.03]` | ~`1.05–1.08` at the mobile floor; keep the tight `sm:` values for ≥640 | sub-1.05 leading on multi-line headings in a narrow column reads cramped and risks descender clipping |

### P2-C · Wide gaps between paired micro-labels
`gap-16` (64px, Company) and `gap-14` (56px, brand rail) between two tiny eyebrow spans push the second label far across a 360px row for very little text.

| Before | After | Why |
| --- | --- | --- |
| `gap-16` / `gap-14` between eyebrow spans on mobile | reduce to ~`gap-6`–`gap-8` on mobile, restore wide gap at `sm:` | desktop-scale gaps look stranded under tiny labels on a phone |

### P2-D · Tap targets — mostly good, one note
Buttons/links largely respect ≥44px (`min-h-11`, `min-h-[52px]`, hero/pill buttons) — good. The brand-card inline catalog link and a few text links rely on `min-h-11`; verify the **horizontal** hit area on text-only links (e.g. brand "Back to brands", footer links) reaches ~44px tall touch area. Low priority.

---

## Suggested fix order
1. **P0-A** input zoom — one-line, real bug.
2. **P1-A** wire up the display font — unlocks the intended look.
3. **P1-C** define the type scale — everything else snaps to it.
4. **P1-B** fix the H1/H2 inversion (falls out of the scale work).
5. **P2** polish pass once the system is in place.

## Open questions for alignment
- Is **Inter Tight** the intended display face, or do we want a more characterful headline font? (frontend-design would push for something less generic than Inter.)
- Target **primary body size on mobile** — hold 14px, or move reading copy to 15–16px?
- Keep the aggressive `vw`-driven heading scaling, or cap headings to a flatter mobile size?
