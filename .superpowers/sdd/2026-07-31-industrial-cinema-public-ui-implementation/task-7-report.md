# Task 7 Report — Editorial Public Pages

## Status

Implemented the Industrial Cinema redesign for About, Service, News, Video, Privacy and Terms without changing catalogue/news records, adding dependencies, or introducing Task 8 schema work.

## Implementation

- About keeps the existing routes and `AboutPageLayout` props while adding an image-led landing sequence, semantic journey timeline, facilities mosaic and locally hosted galleries.
- Service keeps the existing routes and `ServicePageLayout` props while presenting numbered procurement/service tasks, real support images, honest confirmation boundaries and RFQ/parts links.
- News list now has one lead story and an asymmetric editorial grid. Article pages use a compact image hero, readable body column, unchanged source disclosure fields, related products and related articles.
- Video uses existing product covers only. Because no real video URLs exist, it explicitly says that no hosted video is published and renders no player or play control.
- Privacy and Terms keep their routes and `PageHero`, with one H1 and narrow dark document articles.
- Added rendered semantic tests for single H1, real imagery, layout distinctions, source disclosure, related content, honest video state and legal document structure.

## Verification

- RED observed before each About, Service, News and Video/Legal implementation slice.
- `npx tsx --test tests/about-service-structure.test.ts tests/news-source-disclosure.test.ts tests/public-page-header.test.ts` — 8/8 passed.
- Directed ESLint for changed pages, layouts and tests — 0 errors.
- `npm test` — 102/102 passed.
- `npm run build` — passed; 204 static pages generated.
- `git diff --check` — passed.

## Browser QA

- Chrome at `http://127.0.0.1:4317`, desktop 1440×900 and mobile 390×844.
- Checked About, Facilities, Service, After-sales Service, News list, one article, Video, Privacy and Terms.
- Every checked route had one H1, meaningful indexed text, no horizontal overflow, no failed loaded image, no iframe on Video, no framework overlay and no console warning/error.
- Exercised the News `Procurement Guides` filter and verified its honest empty state.
- Representative screenshots confirmed the desktop News lead grid and mobile Facilities/Video hierarchy; screenshots were not written into the repository.

## Concerns

- One existing article `seoTitle` already ends with `SINOTRUK`, while the shared `SeoHead` also adds the brand, producing a duplicated browser-title suffix. This was left for Task 8 SEO metadata work rather than changing shared SEO behavior here.
- The current published set has no `Procurement Guides` items, so that filter correctly renders the tested empty state.
