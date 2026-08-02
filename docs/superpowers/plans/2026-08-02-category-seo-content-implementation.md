# Six Category SEO Content Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace inaccurate or reference-like copy on all six product category pages with original, fact-bound, server-rendered SEO content while preserving every product, part, image and route.

**Architecture:** Extend the existing `productCategories` records instead of adding a database or CMS. The shared category page reads the new fields, passes the dedicated search metadata to `SeoHead`, and renders one reusable procurement-guide section with subcategory internal links.

**Tech Stack:** Next.js Pages Router, React, TypeScript, Tailwind CSS, Node test runner, React server rendering.

## Global Constraints

- Keep all 60 products, 60 parts, category IDs, subcategory IDs, images and public routes unchanged.
- Do not publish unsupported leadership, sales, savings, range, warranty or delivery claims.
- Use the reference site only for catalogue scope and information architecture; do not copy its sentences.
- Emit SEO copy in static server-rendered HTML.
- Do not add a CMS, paid service, dependency or new infrastructure.

---

### Task 1: Lock the category content contract with tests

**Files:**
- Create: `tests/category-seo-content.test.ts`
- Read: `data/siteConfig.ts`
- Read: `pages/products/[category].tsx`

**Interfaces:**
- Consumes: `productCategories` from `data/siteConfig.ts` and the default category page component.
- Produces: a tested record shape containing `seoTitle`, `seoDescription`, `categoryDescription`, `tagline`, `fullDescription`, and exactly three `contentSections` entries.

- [ ] **Step 1: Write the failing data test**

```ts
test('six category records expose original fact-bound SEO content', () => {
  assert.equal(productCategories.length, 6)
  for (const category of productCategories) {
    assert.ok(category.seoTitle.length >= 35 && category.seoTitle.length <= 65)
    assert.ok(category.seoDescription.length >= 120 && category.seoDescription.length <= 165)
    assert.equal(category.contentSections.length, 3)
  }
  assert.doesNotMatch(JSON.stringify(productCategories), /leading brand|pioneer|concrete transportation|high-capacity trailers|liquids and gases/i)
})
```

- [ ] **Step 2: Write the failing SSR test**

Render each category page with its real products and assert that its SEO title, description, overview, three section headings and every subcategory URL are present in server HTML.

- [ ] **Step 3: Run the focused test**

Run: `npx tsx --test tests/category-seo-content.test.ts`  
Expected: FAIL because the new fields and visible guide do not yet exist.

### Task 2: Write the six original category content records

**Files:**
- Modify: `data/siteConfig.ts`
- Test: `tests/category-seo-content.test.ts`

**Interfaces:**
- Produces each `contentSections` item as `{ title: string; body: string }`.
- Preserves every existing `id`, `name`, image and `subcategories` array.

- [ ] **Step 1: Add dedicated metadata and three content sections to each category**

Content must use only the real inventory boundaries:

```ts
seoTitle: 'HOWO Heavy Trucks: Dump, Tractor & Cargo Models | SINOTRUK TEAM',
seoDescription: 'Compare HOWO heavy dump, tractor and cargo trucks by drive configuration, engine, chassis and operating requirements for an export quotation.',
contentSections: [
  { title: 'Published vehicle range', body: 'The current catalogue groups heavy trucks into dump, tractor and cargo models...' },
  { title: 'Typical operating roles', body: 'Dump trucks support bulk material movement...' },
  { title: 'How to select a configuration', body: 'Compare drive form, engine output, transmission...' },
]
```

Repeat with category-specific facts for Light Truck, Special Vehicle, Light Vehicle, Semi Trailer and New Energy Vehicle. Mention pure electric only for the current new-energy catalogue.

- [ ] **Step 2: Run the data contract test**

Run: `npx tsx --test tests/category-seo-content.test.ts`  
Expected: SSR portion still fails; data shape and forbidden-copy checks pass.

### Task 3: Render the SEO guide and adaptive category cards

**Files:**
- Modify: `pages/products/[category].tsx`
- Test: `tests/category-seo-content.test.ts`

**Interfaces:**
- Category props add `seoTitle`, `seoDescription`, `tagline`, `fullDescription`, and `contentSections`.
- `SeoHead` receives `override.title` and the dedicated `seoDescription`.

- [ ] **Step 1: Extend the category prop type and static props mapping**

```ts
contentSections: { title: string; body: string }[]
```

Map the six new fields without passing product data through a second source.

- [ ] **Step 2: Connect dedicated search metadata**

```tsx
<SeoHead input={{
  path,
  pageType: 'collection',
  name: category.name,
  description: category.seoDescription,
  override: { title: category.seoTitle },
  // existing image, items and breadcrumbs stay unchanged
}} />
```

- [ ] **Step 3: Make vehicle-type cards fill the available row**

Use `gridTemplateColumns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr))` on the existing grid so one or two subcategories do not leave empty grey cells.

- [ ] **Step 4: Add the visible procurement-guide section**

Render the existing `tagline` and `fullDescription` as the overview, then render the three `contentSections`. Add internal links to every real subcategory and keep the same square industrial borders, accent color and typography.

- [ ] **Step 5: Run the focused test**

Run: `npx tsx --test tests/category-seo-content.test.ts`  
Expected: PASS.

### Task 4: Verify visual, SEO and catalogue integrity

**Files:**
- Modify if required: `tests/category-seo-content.test.ts`
- Update: `docs/research/2026-08-02-six-category-final-visual-audit.md`

**Interfaces:**
- Consumes all six generated static category routes.
- Produces repeatable verification evidence without changing the catalogue.

- [ ] **Step 1: Run the full automated suite**

Run: `npm test`  
Expected: all tests pass.

- [ ] **Step 2: Run lint and production build**

Run: `npm run lint` and `npm run build`  
Expected: zero lint errors and all static routes generated.

- [ ] **Step 3: Verify catalogue integrity**

Run: `npm run db:verify-catalog`  
Expected: `60 products, 60 parts`.

- [ ] **Step 4: Inspect all six routes at desktop and 375px widths**

For every route verify one H1, no horizontal overflow, no broken images, no missing `alt`, visible guide content, correct canonical, unique meta title/description and working subcategory links.

- [ ] **Step 5: Compare against the reference-page structure**

Confirm the same six catalogue families remain discoverable while none of the rejected reference phrases or unsupported claims appear locally.

- [ ] **Step 6: Record final evidence**

Update the Chinese audit report with screenshots, test counts, remaining warnings and an explicit statement that ranking is not guaranteed.
