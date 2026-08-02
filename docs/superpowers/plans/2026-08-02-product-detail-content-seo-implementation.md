# Product Detail Content and SEO Automation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为现有 60 个产品增加事实驱动、可编辑、服务端可见的完整详情内容和 SEO，并把配件摄影区域改为冷白底。

**Architecture:** 在 Product 上增加一个 JSON 字符串字段 `detailContent`，通过纯函数生成器从现有事实创建安全默认值，数据库人工内容优先。前台用小型模块组件渲染，后台沿用现有产品编辑 API 保存，SEO resolver 输出 Product、Breadcrumb 和 FAQ 结构化数据。

**Tech Stack:** Next.js Pages Router、React 19、TypeScript、Prisma/libSQL、Node test runner、Tailwind CSS。

## Global Constraints

- 保留现有 60 个产品、全部分类、参数、图片、Performance 和 Gallery 数据。
- 不复制对标站正文，不写入未经验证的价格、库存、评分、质保、交期、24/7 或性能百分比。
- 每款产品 4–6 个独立 FAQ，默认 5 个；至少 3 个引用产品事实。
- Customer Service 不显示邮箱或 `mailto:`。
- 不增加付费服务、运行时 AI 或新的重型框架。
- 前台延续 Industrial Cinema 视觉；配件摄影区域使用 `#F3F5F2`。

---

### Task 1: 详情内容类型、生成器与持久化契约

**Files:**
- Create: `lib/product-detail/types.ts`
- Create: `lib/product-detail/generate.ts`
- Create: `tests/product-detail-content.test.ts`
- Modify: `data/products.ts`
- Modify: `prisma/schema.prisma`
- Create: `prisma/migrations/20260802090000_product_detail_content/migration.sql`
- Modify: `prisma/seed.ts`
- Modify: `lib/content/serializers.ts`

**Interfaces:**
- Produces: `ProductDetailContent`, `generateProductDetailContent(product)`, `normalizeProductDetailContent(value, product)`。
- Consumes: 当前 `Product` 的分类、参数、标签、Performance 和 Gallery。

- [ ] **Step 1: 写失败测试**：使用 HOWO 6X4 Cargo Truck 和另一类产品的手工 fixture，断言生成 5 个 FAQ、问题集合不同、Gallery 有 alt/说明、无禁止承诺、所有应用和方案数量合规。
- [ ] **Step 2: 运行 `npx tsx --test tests/product-detail-content.test.ts`**，确认因生成器不存在而失败。
- [ ] **Step 3: 实现最小类型、分类内容矩阵、事实提取、生成和规范化函数。**
- [ ] **Step 4: 再运行目标测试并确认通过。**
- [ ] **Step 5: 增加 Prisma 字段、迁移、seed 和 serializer fallback；扩展测试验证空 JSON 自动补全、人工 JSON 优先。**
- [ ] **Step 6: 运行目标测试和 `npx prisma generate`。**

### Task 2: 产品详情图文模块与配件白底

**Files:**
- Create: `components/product/PerformanceSection.tsx`
- Create: `components/product/ApplicationAreasSection.tsx`
- Create: `components/product/SolutionsSection.tsx`
- Create: `components/product/CustomerServiceSection.tsx`
- Create: `components/product/ProductFaqSection.tsx`
- Modify: `components/product/ProductDetail.tsx`
- Modify: `components/industrial/catalogue/ProductMediaPanel.tsx`
- Modify: `components/industrial/catalogue/RelatedContent.tsx`
- Modify: `pages/parts/index.tsx`
- Modify: `pages/parts/[part].tsx`
- Create: `tests/product-detail-sections.test.ts`

**Interfaces:**
- Consumes: Task 1 的 `ProductDetailContent`。
- Produces: 服务端可见的 H2/H3、图文卡、figure/figcaption、FAQ accordion 和无邮箱服务区。

- [ ] **Step 1: 写失败的服务端渲染测试**，断言六个新增 H2、5 个 FAQ、可见 gallery caption、无邮箱/`mailto:`、白底配件摄影台。
- [ ] **Step 2: 运行 `npx tsx --test tests/product-detail-sections.test.ts` 并确认因模块缺失而失败。**
- [ ] **Step 3: 实现五个聚焦组件并按规格顺序接入 ProductDetail；Gallery 接受结构化图片并渲染说明。**
- [ ] **Step 4: 修改配件列表和详情图片台为 `#F3F5F2`，保持 `object-contain`。**
- [ ] **Step 5: 运行目标测试和现有 `tests/product-detail.test.ts`、`tests/part-detail-content.test.ts`。**

### Task 3: Product 与 FAQ 结构化 SEO

**Files:**
- Modify: `lib/seo/types.ts`
- Modify: `lib/seo/schema.ts`
- Modify: `lib/seo/resolve.ts`
- Modify: `pages/products/[category]/[subcategory]/[product].tsx`
- Create: `tests/product-detail-seo.test.ts`

**Interfaces:**
- Consumes: 产品参数、图片、分类和可见 FAQ。
- Produces: `Product`、`BreadcrumbList`、`FAQPage` JSON-LD；不产生 Offer/Rating/Review。

- [ ] **Step 1: 写失败测试**，用字面量断言图片数组、产品 ID、category、additionalProperty、FAQ mainEntity，并断言不存在 offers、aggregateRating、review。
- [ ] **Step 2: 运行 `npx tsx --test tests/product-detail-seo.test.ts` 并确认预期失败。**
- [ ] **Step 3: 扩展 SEO 输入和 schema builder，把页面上可见的 FAQ 与参数传给 SeoHead。**
- [ ] **Step 4: 修正产品 title/description 生成，避免重复记录乱码，同时保留规范 canonical。**
- [ ] **Step 5: 运行目标测试以及现有 `tests/schema-contract.test.ts`、`tests/seo-health.test.ts`、`tests/seo-page-coverage.test.ts`。**

### Task 4: 后台编辑与自动补全

**Files:**
- Modify: `pages/api/admin/products/[id].ts`
- Modify: `pages/admin/products/[id].tsx`
- Create: `components/admin/ProductDetailContentEditor.tsx`
- Create: `tests/product-detail-admin.test.ts`

**Interfaces:**
- Consumes: Task 1 的 normalize/generate 函数。
- Produces: GET/PUT `detailContent`、自动补全按钮、Performance/Gallery/Application/Solutions/FAQ 编辑控件。

- [ ] **Step 1: 写失败 API 测试**，断言 GET 返回规范化内容，PUT 拒绝少于 4 或多于 6 个 FAQ，合法内容按 JSON 保存。
- [ ] **Step 2: 运行 `npx tsx --test tests/product-detail-admin.test.ts` 并确认预期失败。**
- [ ] **Step 3: 实现服务端规范化和 API 持久化，不接受浏览器传入的危险字段。**
- [ ] **Step 4: 实现中文后台编辑器和显式自动补全按钮；自动补全先进入表单，只有保存才写库。**
- [ ] **Step 5: 运行目标测试和现有 `tests/content-admin-handlers.test.ts`、`tests/admin-reactivation-contract.test.ts`。**

### Task 5: 目录回归、数据库同步与浏览器验收

**Files:**
- Modify only if verification reveals a covered regression.

**Interfaces:**
- Consumes: Tasks 1–4 的完整实现。
- Produces: 可运行本地预览和可审计验证记录。

- [ ] **Step 1: 运行 `npm run db:generate` 和 `npm run db:push` 同步本地数据库。**
- [ ] **Step 2: 运行 `npm test`，确认 0 failures。**
- [ ] **Step 3: 运行 `npm run lint`，确认 0 errors。**
- [ ] **Step 4: 运行 `npm run build`，确认全部静态产品页生成。**
- [ ] **Step 5: 运行 `npm run db:verify-catalog` 和 `git diff --check`，确认仍为 60 products / 60 parts 且补丁无空白错误。**
- [ ] **Step 6: 在本地浏览器检查 HOWO 6X4 Cargo Truck、另一类产品、配件列表和配件详情的桌面与移动布局。**

## Self-Review

- 规格覆盖：Task 1 覆盖自动生成和持久化；Task 2 覆盖全部视觉模块及配件白底；Task 3 覆盖 SEO；Task 4 覆盖后台；Task 5 覆盖完整验证。
- 占位符扫描：所有步骤均给出了明确文件、接口、命令和验收结果。
- 类型一致性：前台、SEO、后台均消费同一个 `ProductDetailContent`；旧 `performanceItems` 和 `galleryImages` 仅作为生成输入保留。
