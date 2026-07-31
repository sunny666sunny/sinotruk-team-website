# SINOTRUK TEAM Industrial Cinema Public UI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将已确认的工业电影感原型正式应用到全部公开页面，并一次补齐响应式、可访问性和前端 SEO 布局。

**Architecture:** 保留现有 Next.js Pages Router、Prisma 数据源、产品与配件 URL。通过全局工业主题 Token、可复用公开站 Shell 和按页面职责拆分的内容组件完成重构；SEO 继续复用 `SeoHead` 与现有 SSG/SSR 数据流，只扩展结构化数据、语义层级和真实内链。

**Tech Stack:** Next.js 16 Pages Router、React 19、TypeScript、Tailwind CSS 3、CSS Variables、Prisma、`next/image`、Node Test Runner。

## Global Constraints

- 保留六个一级产品分类、全部二级分类、产品、配件、新闻、图片、ID、Slug 和公开 URL。
- 全站主题锁定为工业电影感深色主题，强调色仅使用 `#20AAA4`。
- PC 分类矩阵一次完整显示六个一级分类，不产生隐含第三行。
- 首页包含 9-11 个有效区块，不在首页输出全部产品或配件。
- 页面正文不得包含无来源统计、虚构客户评价、虚构性能或交付承诺。
- 每页仅一个 H1，主要区块使用 H2，条目使用 H3。
- 公开核心内容必须由 SSG 或 SSR 输出，不能依赖客户端状态才能被抓取。
- 只动画 `transform` 和 `opacity`，所有自动动效支持 `prefers-reduced-motion`。
- 不删除 `.codex-local-dev-4318.log`、`admin.db` 或用户未提交文件。
- 不改变后台页面，本计划仅处理公开前端与公开 SEO 输出。

---

## File Structure

### Shared public shell

- `components/industrial/IndustrialHeader.tsx`：桌面导航、产品分类菜单和移动抽屉。
- `components/industrial/IndustrialFooter.tsx`：公开站页脚和真实栏目链接。
- `components/industrial/IndustrialPageHero.tsx`：内页共用图片 Hero。
- `components/industrial/SectionHeading.tsx`：受控标题层级，不自动重复 Eyebrow。
- `components/industrial/ResponsiveImage.tsx`：统一 `next/image` 尺寸、Alt 与错误回退。
- `styles/industrial-theme.css`：颜色、字体、间距、层级、焦点和 reduced-motion。

### Homepage

- `components/industrial/home/CinematicHero.tsx`
- `components/industrial/home/CatalogueMatrix.tsx`
- `components/industrial/home/FeaturedVehicleRail.tsx`
- `components/industrial/home/BrandIdentitySection.tsx`
- `components/industrial/home/EngineeringSection.tsx`
- `components/industrial/home/ApplicationMatrix.tsx`
- `components/industrial/home/ProcurementSupportSection.tsx`
- `components/industrial/home/PartsEntrySection.tsx`
- `components/industrial/home/EditorialSection.tsx`
- `components/industrial/home/FinalRfqSection.tsx`

### Catalogue and details

- `components/industrial/catalogue/CatalogueToolbar.tsx`
- `components/industrial/catalogue/IndustrialProductCard.tsx`
- `components/industrial/catalogue/ProductMediaPanel.tsx`
- `components/industrial/catalogue/KeySpecCluster.tsx`
- `components/industrial/catalogue/GroupedSpecifications.tsx`
- `components/industrial/catalogue/RelatedContent.tsx`
- `components/industrial/catalogue/StickyRfqActions.tsx`

### SEO

- `lib/seo/schema.ts`：Organization、WebSite、CollectionPage、Product 和 Article JSON-LD。
- `lib/seo/internal-links.ts`：基于真实路径生成相关分类、产品、配件和文章链接。
- `tests/industrial-public-ui.test.ts`：公开结构、分类覆盖、语义标题与原型清理。
- `tests/industrial-seo-layout.test.ts`：结构化数据、Canonical、Alt 与可抓取内链。

---

### Task 1: Lock Data Baseline and Install the Industrial Theme

**Files:**
- Modify: `package.json`
- Modify: `pages/_app.tsx`
- Modify: `styles/tokens.css`
- Create: `styles/industrial-theme.css`
- Create: `tests/industrial-public-ui.test.ts`

**Interfaces:**
- Produces CSS variables `--industrial-bg`, `--industrial-surface`, `--industrial-panel`, `--industrial-text`, `--industrial-muted`, `--industrial-accent`, `--industrial-line`.
- Produces body class `industrial-site` for all non-admin routes.

- [ ] **Step 1: Write the failing theme and preservation test**

```ts
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

test('industrial public theme is loaded without changing catalogue records', () => {
  const app = readFileSync('pages/_app.tsx', 'utf8')
  const theme = readFileSync('styles/industrial-theme.css', 'utf8')
  const integrityTests = readFileSync('tests/catalog-integrity.test.ts', 'utf8')
  assert.match(app, /industrial-theme\.css/)
  assert.match(theme, /--industrial-accent:\s*#20aaa4/i)
  assert.match(integrityTests, /compareCatalogSnapshots/)
  assert.match(integrityTests, /createCatalogSnapshot/)
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx tsx --test tests/industrial-public-ui.test.ts`  
Expected: FAIL because `styles/industrial-theme.css` is not loaded.

- [ ] **Step 3: Add local open-source fonts and theme tokens**

Run: `npm install @fontsource/barlow-condensed @fontsource/manrope`

Add to `pages/_app.tsx`:

```ts
import '@fontsource/barlow-condensed/600.css'
import '@fontsource/barlow-condensed/700.css'
import '@fontsource/manrope/400.css'
import '@fontsource/manrope/600.css'
import '@/styles/industrial-theme.css'
```

Define in `styles/industrial-theme.css`:

```css
:root {
  --industrial-bg: #081113;
  --industrial-surface: #0d1a1d;
  --industrial-panel: #132327;
  --industrial-text: #edf3f1;
  --industrial-muted: #a5b4b2;
  --industrial-accent: #20aaa4;
  --industrial-line: rgb(213 231 228 / 0.17);
  --industrial-display: "Barlow Condensed", "Arial Narrow", sans-serif;
  --industrial-body: "Manrope", "Helvetica Neue", sans-serif;
}
```

Apply `industrial-site` only when `!router.pathname.startsWith('/admin')`.

- [ ] **Step 4: Run theme and catalogue integrity checks**

Run: `npx tsx --test tests/industrial-public-ui.test.ts tests/catalog-integrity.test.ts`  
Expected: PASS.

- [ ] **Step 5: Commit**

```powershell
git add package.json package-lock.json pages/_app.tsx styles/tokens.css styles/industrial-theme.css tests/industrial-public-ui.test.ts
git commit -m "feat: establish industrial public theme"
```

### Task 2: Replace the Public Header and Footer

**Files:**
- Create: `components/industrial/IndustrialHeader.tsx`
- Create: `components/industrial/IndustrialFooter.tsx`
- Modify: `components/layout/Header.tsx`
- Modify: `components/layout/Footer.tsx`
- Modify: `tests/public-header-navigation.test.ts`
- Modify: `tests/footer-navigation.test.ts`

**Interfaces:**
- Consumes `productCategories` from `data/siteConfig.ts`.
- Produces `<IndustrialHeader transparent?: boolean />`.
- Produces `<IndustrialFooter />`.

- [ ] **Step 1: Extend navigation tests**

```ts
test('industrial product navigation exposes all six catalogue families', () => {
  const source = readFileSync('components/industrial/IndustrialHeader.tsx', 'utf8')
  for (const id of ['heavy-truck', 'light-truck', 'special-vehicle', 'light-vehicle', 'semi-trailer', 'new-energy-vehicle']) {
    assert.match(source, new RegExp(`/products/\\$\\{category\\.id\\}|${id}`))
  }
  assert.match(source, /aria-expanded/)
  assert.match(source, /Escape/)
})
```

- [ ] **Step 2: Verify failure**

Run: `npx tsx --test tests/public-header-navigation.test.ts tests/footer-navigation.test.ts`  
Expected: FAIL because industrial shell components do not exist.

- [ ] **Step 3: Implement the shell**

Use one-line 72px desktop navigation, a product mega menu rendered from `productCategories`, a `Request Quote` action, and a full-screen mobile drawer. Keep existing `Header` and `Footer` exports as thin wrappers:

```tsx
export default function Header(props: { transparent?: boolean }) {
  return <IndustrialHeader {...props} />
}
```

The footer must map existing About, Products, Parts and Service link arrays without invented claims.

- [ ] **Step 4: Run tests and targeted lint**

Run: `npx tsx --test tests/public-header-navigation.test.ts tests/footer-navigation.test.ts`  
Run: `npx eslint components/industrial/IndustrialHeader.tsx components/industrial/IndustrialFooter.tsx`  
Expected: PASS and 0 errors.

- [ ] **Step 5: Commit**

```powershell
git add components/industrial components/layout/Header.tsx components/layout/Footer.tsx tests/public-header-navigation.test.ts tests/footer-navigation.test.ts
git commit -m "feat: redesign public navigation shell"
```

### Task 3: Build the Complete Homepage

**Files:**
- Modify: `pages/index.tsx`
- Create: `components/industrial/home/*.tsx`
- Modify: `tests/home-structure.test.ts`
- Modify: `tests/industrial-public-ui.test.ts`

**Interfaces:**
- `CatalogueMatrixProps = { categories: typeof productCategories }`
- `FeaturedVehicleRailProps = { products: ProcurementProduct[] }`
- `EditorialSectionProps = { articles: NewsItem[] }`
- Homepage receives existing `products` and `news` from `getStaticProps`.

- [ ] **Step 1: Write failing homepage coverage tests**

```ts
test('homepage renders ten semantic sections and all six categories', () => {
  const source = readFileSync('pages/index.tsx', 'utf8')
  for (const component of [
    'CinematicHero', 'CatalogueMatrix', 'FeaturedVehicleRail',
    'BrandIdentitySection', 'EngineeringSection', 'ApplicationMatrix',
    'ProcurementSupportSection', 'PartsEntrySection',
    'EditorialSection', 'FinalRfqSection',
  ]) assert.match(source, new RegExp(`<${component}`))
  assert.doesNotMatch(source, /<AllProducts/)
})
```

Add a component test that asserts `CatalogueMatrix` renders six category links and uses the five-column desktop class.

- [ ] **Step 2: Verify failure**

Run: `npx tsx --test tests/home-structure.test.ts tests/industrial-public-ui.test.ts`  
Expected: FAIL because the new homepage components are absent.

- [ ] **Step 3: Implement the homepage with real data**

Promote the approved prototype composition into production components. Use:

```tsx
<main id="main" className="industrial-page">
  <CinematicHero products={featuredProducts.slice(0, 3)} />
  <CatalogueMatrix categories={productCategories} />
  <FeaturedVehicleRail products={featuredProducts.slice(0, 6)} />
  <BrandIdentitySection />
  <EngineeringSection />
  <ApplicationMatrix />
  <ProcurementSupportSection />
  <PartsEntrySection />
  <EditorialSection articles={news.slice(0, 4)} />
  <FinalRfqSection />
</main>
```

`CatalogueMatrix` desktop layout must use `grid-template-columns: repeat(5,minmax(0,1fr))`; Heavy Truck spans two columns and two rows, one secondary category spans two columns, and the remaining four categories occupy one cell each.

- [ ] **Step 4: Validate rendering**

Run: `npx tsx --test tests/home-structure.test.ts tests/industrial-public-ui.test.ts`  
Run: `npx eslint pages/index.tsx components/industrial/home`  
Expected: PASS and 0 errors.

- [ ] **Step 5: Commit**

```powershell
git add pages/index.tsx components/industrial/home tests/home-structure.test.ts tests/industrial-public-ui.test.ts
git commit -m "feat: build complete industrial homepage"
```

### Task 4: Redesign Product Catalogue and Category Pages

**Files:**
- Modify: `pages/products/index.tsx`
- Modify: `pages/products/[category].tsx`
- Modify: `pages/products/[category]/[subcategory]/index.tsx`
- Create: `components/industrial/catalogue/CatalogueToolbar.tsx`
- Create: `components/industrial/catalogue/IndustrialProductCard.tsx`
- Modify: `components/procurement/ProductFilters.tsx`
- Modify: `tests/product-procurement-flow.test.ts`

**Interfaces:**
- `CatalogueToolbarProps = { count: number; onOpenFilters(): void; sort: string; onSort(value: string): void }`
- `IndustrialProductCardProps = { product: ProcurementProduct; compareSelected?: boolean; onCompareChange?(id: string): void }`

- [ ] **Step 1: Write failing catalogue behavior tests**

Add assertions that category pages retain every product link, expose result count, filters, clear action, shortlist, compare and RFQ actions, and render an H1 once.

- [ ] **Step 2: Verify failure**

Run: `npx tsx --test tests/product-procurement-flow.test.ts`  
Expected: FAIL on industrial toolbar/card requirements.

- [ ] **Step 3: Implement catalogue pages**

Use `IndustrialPageHero`, a desktop filter rail, accessible mobile `FilterDrawer`, result count, sort control and the new product card. Keep all existing route builders:

```ts
const href = `/products/${product.category}/${product.subcategory}/${product.id}`
```

Do not alter filtering normalization or shortlist storage.

- [ ] **Step 4: Run tests, lint and representative route build**

Run: `npx tsx --test tests/product-procurement-flow.test.ts tests/product-subcategory-routes.test.ts`  
Run: `npx eslint pages/products components/industrial/catalogue components/procurement/ProductFilters.tsx`  
Expected: PASS and 0 errors.

- [ ] **Step 5: Commit**

```powershell
git add pages/products components/industrial/catalogue components/procurement/ProductFilters.tsx tests/product-procurement-flow.test.ts
git commit -m "feat: redesign product catalogue experience"
```

### Task 5: Redesign Product Detail and Comparison Surfaces

**Files:**
- Modify: `components/product/ProductDetail.tsx`
- Modify: `components/product/SpecificationTable.tsx`
- Modify: `components/procurement/CompareTray.tsx`
- Modify: `components/procurement/ComparisonTable.tsx`
- Create: `components/industrial/catalogue/ProductMediaPanel.tsx`
- Create: `components/industrial/catalogue/KeySpecCluster.tsx`
- Create: `components/industrial/catalogue/GroupedSpecifications.tsx`
- Create: `components/industrial/catalogue/RelatedContent.tsx`
- Create: `components/industrial/catalogue/StickyRfqActions.tsx`
- Modify: `tests/product-procurement-copy.test.ts`

**Interfaces:**
- `KeySpecClusterProps = { groups: ReturnType<typeof groupSpecifications>; maxItems?: number }`
- `GroupedSpecificationsProps = { groups: ReturnType<typeof groupSpecifications> }`
- `StickyRfqActionsProps = { productId: string; contactHref: string }`

- [ ] **Step 1: Write failing detail-page tests**

Assert one specification source is rendered, grouped headings remain Powertrain/Chassis/Dimensions/Capacity, the gallery uses all existing image paths, and shortlist/compare/RFQ remain present.

- [ ] **Step 2: Verify failure**

Run: `npx tsx --test tests/product-procurement-copy.test.ts tests/specifications.test.ts`  
Expected: FAIL on the new grouped detail composition.

- [ ] **Step 3: Implement the detail composition**

Render key specs from the same grouped result used by the full specification area:

```tsx
const groups = groupSpecifications(product.specifications)
<KeySpecCluster groups={groups} maxItems={5} />
<GroupedSpecifications groups={groups} />
```

Do not merge contradictory values in the component. Mark conflicting or absent fields for later data review and preserve raw values.

- [ ] **Step 4: Validate**

Run: `npx tsx --test tests/product-procurement-copy.test.ts tests/specifications.test.ts tests/product-images.test.ts`  
Run: `npx eslint components/product components/procurement components/industrial/catalogue`  
Expected: PASS and 0 errors.

- [ ] **Step 5: Commit**

```powershell
git add components/product components/procurement components/industrial/catalogue tests/product-procurement-copy.test.ts
git commit -m "feat: redesign product detail experience"
```

### Task 6: Redesign Parts and RFQ Entry Pages

**Files:**
- Modify: `pages/parts/index.tsx`
- Modify: `pages/parts/[part].tsx`
- Modify: `pages/contact.tsx`
- Modify: `pages/shortlist.tsx`
- Modify: `tests/parts-filtering.test.ts`
- Modify: `tests/part-detail-copy.test.ts`
- Modify: `tests/shortlist-resolution.test.ts`

**Interfaces:**
- Parts keep consuming `partCategories` and existing `Part` records.
- Contact keeps the current RFQ payload keys unchanged.

- [ ] **Step 1: Add failing tests**

Assert parts retain category and part-number search, detail pages expose part number and compatibility language, and contact preserves `quantity`, `useCase`, `destinationPort`, `selections` and `consent`.

- [ ] **Step 2: Verify failure**

Run: `npx tsx --test tests/parts-filtering.test.ts tests/part-detail-copy.test.ts tests/shortlist-resolution.test.ts`  
Expected: FAIL on new industrial layout markers.

- [ ] **Step 3: Implement the industrial parts and RFQ layouts**

Use contain-fit images for parts, a dark neutral product stage, clear part-number typography and a mobile-safe RFQ form. Do not change `handleSubmit`, shortlist normalization or API payload keys in this task.

- [ ] **Step 4: Validate**

Run: `npx tsx --test tests/parts-filtering.test.ts tests/part-detail-copy.test.ts tests/shortlist-resolution.test.ts tests/rfq.test.ts`  
Run: `npx eslint pages/parts pages/contact.tsx pages/shortlist.tsx`  
Expected: PASS and 0 errors.

- [ ] **Step 5: Commit**

```powershell
git add pages/parts pages/contact.tsx pages/shortlist.tsx tests
git commit -m "feat: redesign parts and RFQ surfaces"
```

### Task 7: Redesign About, Service, News and Video Pages

**Files:**
- Modify: `components/about/AboutPageLayout.tsx`
- Modify: `components/service/ServicePageLayout.tsx`
- Modify: `pages/about.tsx`
- Modify: `pages/about/*.tsx`
- Modify: `pages/service.tsx`
- Modify: `pages/service/*.tsx`
- Modify: `pages/news/index.tsx`
- Modify: `pages/news/[slug].tsx`
- Modify: `pages/video.tsx`
- Modify: `pages/privacy.tsx`
- Modify: `pages/terms.tsx`
- Modify: `tests/about-service-structure.test.ts`
- Modify: `tests/news-source-disclosure.test.ts`

**Interfaces:**
- `AboutPageLayout` and `ServicePageLayout` retain existing exported names and route props.
- News pages keep `News` record fields and source disclosure fields unchanged.

- [ ] **Step 1: Write failing semantic-layout tests**

Assert each route has exactly one H1, uses real images, preserves source disclosure, and does not render duplicate page headers or excluded global sections.

- [ ] **Step 2: Verify failure**

Run: `npx tsx --test tests/about-service-structure.test.ts tests/news-source-disclosure.test.ts tests/public-page-header.test.ts`  
Expected: FAIL on industrial layout requirements.

- [ ] **Step 3: Implement distinct page compositions**

Use:

- About: image-led editorial timeline and facilities mosaic.
- Service: procurement-task sections with real service images.
- News list: asymmetric editorial grid.
- Article: compact image Hero, readable article column, related products and articles.
- Video: real covers only, no fake player when no video URL exists.
- Legal: narrow readable dark document layout.

- [ ] **Step 4: Validate**

Run: `npx tsx --test tests/about-service-structure.test.ts tests/news-source-disclosure.test.ts tests/public-page-header.test.ts`  
Run: `npx eslint pages/about pages/service pages/news pages/video.tsx components/about components/service`  
Expected: PASS and 0 errors.

- [ ] **Step 5: Commit**

```powershell
git add components/about components/service pages/about* pages/service* pages/news pages/video.tsx pages/privacy.tsx pages/terms.tsx tests
git commit -m "feat: redesign public editorial pages"
```

### Task 8: Complete Frontend SEO Layout and Schema

**Files:**
- Create: `lib/seo/schema.ts`
- Create: `lib/seo/internal-links.ts`
- Modify: `lib/seo/resolve.ts`
- Modify: `components/seo/SeoHead.tsx`
- Modify: public page files from Tasks 3-7
- Create: `tests/industrial-seo-layout.test.ts`
- Modify: `tests/seo.test.ts`
- Modify: `tests/seo-health.test.ts`

**Interfaces:**
- `buildOrganizationSchema(siteUrl: string): Record<string, unknown>`
- `buildWebSiteSchema(siteUrl: string): Record<string, unknown>`
- `buildCollectionSchema(input: { name: string; description: string; url: string; items: Array<{ name: string; url: string }> }): Record<string, unknown>`
- `resolveRelatedLinks(input: RelatedLinkInput): RelatedLink[]`

- [ ] **Step 1: Write failing schema and internal-link tests**

```ts
test('homepage emits Organization, WebSite and WebPage schema', () => {
  const seo = resolveSeo({ path: '/', pageType: 'website', name: 'SINOTRUK TEAM' }, 'https://sinotrukteam.com')
  assert.deepEqual(seo.jsonLd.map((item) => item['@type']), ['Organization', 'WebSite', 'WebPage'])
})
```

Add tests proving CollectionPage contains real product URLs, Product has no invented Offer, Article retains source and date, and Baidu is absent.

- [ ] **Step 2: Verify failure**

Run: `npx tsx --test tests/industrial-seo-layout.test.ts tests/seo.test.ts tests/seo-health.test.ts`  
Expected: FAIL because homepage schema and collection schema are incomplete.

- [ ] **Step 3: Implement schema and related-link builders**

Build schemas only from supplied data. Extend `resolveSeo` by page type, keep canonical generation unchanged, and insert related links into server-rendered page output.

- [ ] **Step 4: Validate SEO output**

Run: `npx tsx --test tests/industrial-seo-layout.test.ts tests/seo.test.ts tests/seo-health.test.ts tests/seo-submission.test.ts`  
Expected: PASS with no Baidu provider.

- [ ] **Step 5: Commit**

```powershell
git add lib/seo components/seo pages tests/industrial-seo-layout.test.ts tests/seo.test.ts tests/seo-health.test.ts
git commit -m "feat: complete industrial frontend SEO layout"
```

### Task 9: Responsive, Accessibility and Performance Pass

**Files:**
- Modify: all industrial components created in Tasks 2-8
- Modify: `next.config.mjs`
- Modify: `tests/industrial-public-ui.test.ts`
- Modify: `tests/industrial-seo-layout.test.ts`

**Interfaces:**
- No new public interfaces.

- [ ] **Step 1: Add failing preflight assertions**

Test for skip link, `main#main`, reduced-motion CSS, no `h-screen`, no missing image Alt, no duplicate CTA labels with the same intent, and no desktop category overflow class.

- [ ] **Step 2: Verify failure**

Run: `npx tsx --test tests/industrial-public-ui.test.ts tests/industrial-seo-layout.test.ts`  
Expected: FAIL on at least one preflight requirement.

- [ ] **Step 3: Fix responsive and performance issues**

- Replace public `<img>` with `next/image` where dimensions are known.
- Mark only the active Hero image as priority.
- Use `sizes` on every responsive image.
- Add skip link and visible focus states.
- Collapse every multi-column section below 768px.
- Ensure 44px minimum controls.
- Disable nonessential animation under reduced motion.
- Keep the Next image configuration compatible with current local assets.

- [ ] **Step 4: Run automated checks and browser verification**

Run: `npm test`  
Run: `npm run lint`  
Run: `npm run build`  
Expected: all tests pass, lint has 0 errors, build succeeds.

Browser routes:

- `/`
- `/products`
- `/products/heavy-truck`
- `/products/heavy-truck/dump-truck/howo-6x4-dump-truck`
- `/parts`
- one part detail
- `/news`
- one article
- `/contact`

Verify at 1440x900, 1024x768, 390x844 and 375x812 with no horizontal overflow.

- [ ] **Step 5: Commit**

```powershell
git add components pages styles next.config.mjs tests
git commit -m "fix: complete public responsive and accessibility pass"
```

### Task 10: Remove the Prototype and Perform Final Integrity Verification

**Files:**
- Delete: `pages/prototype/industrial-home.tsx`
- Delete: `styles/industrial-home-prototype.module.css`
- Modify: `README.md`
- Modify: `docs/上线与SEO配置说明.md`

**Interfaces:**
- No new interfaces.

- [ ] **Step 1: Add prototype-removal assertion**

```ts
test('approved prototype is removed after production promotion', () => {
  assert.equal(existsSync('pages/prototype/industrial-home.tsx'), false)
  assert.equal(existsSync('styles/industrial-home-prototype.module.css'), false)
})
```

- [ ] **Step 2: Remove prototype and update Chinese documentation**

Document the public theme, homepage content order, image requirements, SEO schema coverage and verification commands. Do not include secrets or credentials.

- [ ] **Step 3: Run final data and code checks**

Run: `npm run db:verify-catalog`  
Run: `npm test`  
Run: `npm run lint`  
Run: `npm run build`  
Run: `git diff --check`  
Expected: catalogue baseline unchanged; all checks pass.

- [ ] **Step 4: Inspect repository status**

Run: `git status --short`  
Expected: only `.codex-local-dev-4318.log` and `admin.db` remain untracked; neither is staged or deleted.

- [ ] **Step 5: Commit**

```powershell
git add README.md docs pages/prototype styles/industrial-home-prototype.module.css tests/industrial-public-ui.test.ts
git commit -m "docs: finalize industrial public UI delivery"
```

## Final Acceptance

- Six product categories appear in one complete PC matrix.
- Homepage contains ten meaningful sections and retains the original content breadth.
- All public route families share the approved industrial-cinema language.
- Product, part, category, media and URL baselines are unchanged.
- Semantic headings, internal links, Alt text, Canonical, OG and JSON-LD are present.
- Desktop and mobile browser checks show no clipping, overlap or horizontal overflow.
- Prototype route is removed after the production homepage is accepted.
- Tests, lint, build and catalogue integrity checks all pass.
