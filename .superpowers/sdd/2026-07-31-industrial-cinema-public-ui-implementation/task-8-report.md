# Task 8 Report — Frontend SEO Layout and Schema

## Status

Implemented the shared frontend SEO layout and schema without changing catalogue/news data, backend APIs, submission providers, or dependencies.

## Implementation

- Added supplied-data-only Organization, WebSite, WebPage, CollectionPage, Product, Article and breadcrumb output. Product schema has no Offer, price, availability, rating or review fields; Article retains supplied publication/source fields.
- Wired `SeoHead` into the homepage, product/news/parts collections and catalogue category pages. Collection schemas contain the actual server-rendered product/article/part routes.
- Kept canonical resolution unchanged, keyed page canonicals so they replace the app fallback, and added the existing Heavy Truck image as an OG/Twitter-only fallback (never as unsupplied JSON-LD data).
- Removed repeated trailing SINOTRUK title suffixes, fixed React/Next empty dynamic titles in About/Service layouts, and distinguished duplicate catalogue records with their real record position. Generated public metadata has no duplicate title or description.
- Added a minimal internal-link resolver and used it for product-to-category, parts and news links. It accepts only supplied root-relative routes, removes current/duplicate routes and rejects protocol-relative external links.
- No Baidu provider, submission, schema or metadata exists under `lib`, `components` or `pages`; Google and IndexNow behavior was unchanged.

## TDD and Verification

- RED observed for homepage/collection schema, Article source, internal-link module/filtering, keyed canonical, social image fallback, dynamic titles, duplicate catalogue metadata and shared-source descriptions.
- Focused SEO/submission tests: 14/14 passed.
- Directed ESLint: passed with 0 errors.
- Full `npm test`: 114/114 passed.
- `npm run build`: passed; 204 static pages generated.
- Generated HTML audit (excluding Next's framework 500 page): 194/194 had non-empty unique title/description, one canonical and real server-rendered internal links. Homepage, catalogue, category, product and news samples had the expected JSON-LD; sampled Product had no Offer.
- `git diff --check`: passed.

## Scope Notes

- The brief referenced `tests/seo.test.ts` and `tests/seo-submission.test.ts`, but this baseline names their existing equivalents `tests/seo-automation.test.ts` and `tests/seo-submission-handler.test.ts`; no duplicate alias tests were added.
- Protected untracked prototype/database/log files were not touched.

## Test Evidence Follow-up

- Strengthened the submission-handler regression with an attempted `baidu` and unsupported `bing` provider. The executable assertion proves only `indexnow` and `google` run, persist and appear in the response; adding another production branch now fails the test.
- Rendered the real published Products page through Next's head manager, parsed its CollectionPage JSON-LD and proved its item URLs exactly equal the actual product-detail `getStaticPaths` output.
- Rendered the actual `_app` together with page `SeoHead` through Next's head manager and proved the final integrated head contains exactly one query-free canonical. Removing either shared canonical key now fails the test.
