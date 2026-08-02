# 新闻原创改写、SEO 整合与全站内容质量审计实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 36 篇重复、短小且包含无依据营销表述的旧新闻整合为 14 篇可核验、搜索意图独立的英文采购指南，并删除 22 篇旧记录、保留永久重定向、完善文章 SEO 与内容质量门禁。

**Architecture:** 继续以 `data/news.ts` 和 Prisma `News` 为唯一新闻数据契约；新闻详情页增加极小的结构化文本解析器，复用现有 `SeoHead` 与 JSON-LD。数据库同步脚本先做一致性备份，再在事务中 upsert 14 篇文章并删除 22 篇旧记录，不引入 CMS、Markdown 或“AI 检测器”。

**Tech Stack:** Next.js 16、React 19、TypeScript、Prisma 7、SQLite/libSQL、Node test runner、现有 SEO 与内容自动化模块。

## Global Constraints

- 只保留 14 篇正文；22 篇旧正文和数据库记录删除，旧 slug 仅保留永久 301 映射。
- 14 篇文章各自服务一个独立搜索意图，每篇不少于 300 个英文单词，包含 3–6 个 H2、至少一个清单、1–4 个站内链接和独立关键词组。
- 不发布无法核验的价格、销量、排名、融资、授权经销商、保修、油耗收益、库存或交付承诺。
- 不复制参考站句式、不做同义词替换，不使用机械化五段模板或关键词堆砌。
- 自动生成内容仍只进入待审核状态，不新增自动直发路径。
- 不新增运行时依赖，不删除或重建现有产品与配件数据。
- 数据库同步前必须备份；同步后新闻为 14，产品和配件仍各为 60。

---

### Task 1: 锁定 14 篇支柱文章与 22 个旧地址映射

**Files:**
- Modify: `data/news.ts`
- Create: `tests/news-editorial-consolidation.test.ts`

**Interfaces:**
- Produces: `NewsItem.keywords: string[]`、`NewsItem.internalLinks: string[]`、`NewsItem.updatedAt?: string`。
- Produces: `newsRedirects: Record<string, string>`，键为被删除的旧 slug，值为 14 篇保留文章之一。

- [ ] **Step 1: 编写失败测试**

  断言 `newsItems.length === 14`、`Object.keys(newsRedirects).length === 22`、两组 slug 不重叠、所有跳转目标存在、36 个历史 slug 都能解析到一篇保留文章；断言 title、seoTitle、seoDescription 和首关键词均唯一。

- [ ] **Step 2: 运行定向测试并确认失败**

  Run: `npx tsx --test tests/news-editorial-consolidation.test.ts`
  Expected: FAIL，因为当前仍有 36 篇且没有 `newsRedirects`。

- [ ] **Step 3: 重写新闻数据契约与 14 篇文章**

  在 `NewsItem` 增加关键词、内链和修改日期；用已批准的 14 个保留 slug 替换原数组内容。每篇写成 350–700 词的英文采购指南，使用 `## Heading` 与 `- item` 轻量语法；保留原始图片，移除所有无法核验的价格、年份承诺、授权、保修、融资、领先、最佳、现货和交付表述。新增完整的 22 项 `newsRedirects`。

- [ ] **Step 4: 运行定向测试并确认通过**

  Run: `npx tsx --test tests/news-editorial-consolidation.test.ts`
  Expected: PASS，且每篇满足字数、H2、清单、内链、关键词与禁用表述规则。

### Task 2: 让新闻详情页输出语义化正文与永久跳转

**Files:**
- Create: `lib/content/editorial-content.ts`
- Modify: `pages/news/[slug].tsx`
- Modify: `lib/content/repository.ts`
- Test: `tests/news-editorial-page.test.ts`

**Interfaces:**
- Produces: `parseEditorialContent(content: string): EditorialBlock[]`，块类型仅为 `paragraph`、`heading`、`list`。
- Consumes: `newsRedirects`、`NewsItem.keywords`、`NewsItem.internalLinks`、`NewsItem.updatedAt`。

- [ ] **Step 1: 编写解析器和跳转失败测试**

  测试 `##` 产生 H2、连续 `-` 产生列表、普通块产生段落；测试旧 slug 的 `getStaticProps` 返回 `{ permanent: true, destination: '/news/<target>' }`。

- [ ] **Step 2: 运行定向测试并确认失败**

  Run: `npx tsx --test tests/news-editorial-page.test.ts`
  Expected: FAIL，因为解析器与跳转尚不存在。

- [ ] **Step 3: 实现最小解析器和页面集成**

  让 `getStaticPaths` 同时生成公开文章和 22 个旧 slug；`getStaticProps` 优先返回永久跳转。正文按块输出 `<h2>`、`<ul><li>`、`<p>`；页面显示 “Reviewed by SINOTRUK TEAM Editorial” 和实质更新日期，渲染 `internalLinks` 指向真实站内路径。`SeoHead` 接收 `dateModified` 与关键词覆盖。

- [ ] **Step 4: 保留数据库字段**

  在 `lib/content/repository.ts` 将 Prisma 的 `keywords`、`internalLinks`、`updatedAt` 映射回 `NewsItem`，JSON 字段解析失败时返回空数组。

- [ ] **Step 5: 运行定向测试并确认通过**

  Run: `npx tsx --test tests/news-editorial-page.test.ts`
  Expected: PASS。

### Task 3: 完善 Article JSON-LD 与文章元数据

**Files:**
- Modify: `lib/seo/schema.ts`
- Modify: `lib/seo/types.ts`
- Test: `tests/seo-automation.test.ts`

**Interfaces:**
- Consumes: `SeoInput.datePublished`、`SeoInput.dateModified`、`SeoInput.source`。
- Produces: Article JSON-LD 的 `author` Organization，名称为 `SINOTRUK TEAM Editorial`。

- [ ] **Step 1: 增加失败断言**

  在现有 SEO 测试中断言文章 schema 同时包含 `author`、`publisher`、`datePublished`、`dateModified`，有真实来源时保留 `citation`。

- [ ] **Step 2: 运行 SEO 测试并确认失败**

  Run: `npx tsx --test tests/seo-automation.test.ts`
  Expected: FAIL，因为 schema 暂无 author。

- [ ] **Step 3: 最小修改 schema**

  在 `buildArticleSchema` 增加 `{ '@type': 'Organization', name: 'SINOTRUK TEAM Editorial' }`，不改变产品、FAQ、站点 schema。

- [ ] **Step 4: 运行 SEO 测试并确认通过**

  Run: `npx tsx --test tests/seo-automation.test.ts`
  Expected: PASS。

### Task 4: 建立可回滚的新闻数据库同步

**Files:**
- Create: `lib/content/reviewed-news-sync.ts`
- Create: `scripts/sync-reviewed-news.ts`
- Modify: `prisma/seed.ts`
- Modify: `package.json`
- Test: `tests/reviewed-news-sync.test.ts`

**Interfaces:**
- Produces: `synchronizeReviewedNews({ createBackup, commit })`，先备份再提交 14 篇 upsert 与 22 个删除 slug。
- Produces: npm script `db:sync-reviewed-news`。

- [ ] **Step 1: 编写同步顺序与载荷失败测试**

  用内存 fake adapter 断言：备份在 commit 之前；commit 收到 14 篇完整数据和 22 个删除 slug；关键词、内链、发布日期、修改日期与 SEO 字段均被序列化。

- [ ] **Step 2: 运行定向测试并确认失败**

  Run: `npx tsx --test tests/reviewed-news-sync.test.ts`
  Expected: FAIL，因为同步模块尚不存在。

- [ ] **Step 3: 实现同步模块和 CLI**

  复用 `createCatalogBackup()`；在单一 Prisma 事务中逐篇 `news.upsert`，随后 `deleteMany({ slug: { in: removedSlugs } })`，写入 `news_editorial_reviewed_at`、`news_editorial_count` 与备份文件名设置。事务结束后断言公开新闻 14、产品 60、配件 60。

- [ ] **Step 4: 修正种子行为**

  `importNews()` 改为 upsert 当前 14 篇并写入关键词/内链/更新日期，随后删除 22 个旧 slug；不触碰其他新闻以外的产品、配件、分类和设置导入逻辑。

- [ ] **Step 5: 注册并运行测试**

  Run: `npx tsx --test tests/reviewed-news-sync.test.ts`
  Expected: PASS。

### Task 5: 加固未来内容自动化门禁

**Files:**
- Modify: `lib/content-automation/quality.ts`
- Modify: `lib/content-automation/generate.ts`
- Test: `tests/content-automation-quality.test.ts`

**Interfaces:**
- Produces: 质量门禁拒绝无依据营销承诺、过时年份型 SEO 标题、模板化标题和关键词堆砌。
- Preserves: 自动生成结果仍为待审核稿，不直接发布。

- [ ] **Step 1: 编写高风险文案失败用例**

  覆盖 `authorized dealer`、`factory-direct price`、`best price`、`financing available`、`manufacturer warranty`、`immediate delivery`、`leading manufacturer`、`guaranteed`、标题 `Complete Guide 2025`，并保留现有 300–1800 词、来源、内链、关键词、长句重合测试。

- [ ] **Step 2: 运行定向测试并确认新增用例失败**

  Run: `npx tsx --test tests/content-automation-quality.test.ts`
  Expected: FAIL，现有门禁未覆盖全部高风险表述。

- [ ] **Step 3: 实现最小规则并改进提示词**

  在质量模块集中维护不区分大小写的高风险短语与过时年份/模板标题规则；提示词明确要求单一搜索意图、可核验事实、不同文章结构和人工复核，不添加关键词密度指标或额外服务。

- [ ] **Step 4: 运行定向测试并确认通过**

  Run: `npx tsx --test tests/content-automation-quality.test.ts`
  Expected: PASS。

### Task 6: 执行全站内容质量审计并修复可确认问题

**Files:**
- Create: `scripts/audit-editorial-quality.ts`
- Create: `docs/research/2026-08-02-full-site-content-quality-audit.md`
- Modify: audit 命中的现有公开文案文件（仅限可直接确认的高风险表述）
- Test: `tests/full-site-content-quality.test.ts`

**Interfaces:**
- Produces: 可重复执行的只读审计，扫描新闻、产品、配件和主要静态页面中的禁用承诺、重复 SEO title/description、过时年份和模板短语。

- [ ] **Step 1: 编写审计失败测试**

  断言审计结果按 `high`、`medium`、`review` 分级，能定位文件/记录/字段；14 篇新闻不存在高风险命中、重复 SEO 字段或过时年份。

- [ ] **Step 2: 运行定向测试并确认失败**

  Run: `npx tsx --test tests/full-site-content-quality.test.ts`
  Expected: FAIL，因为审计脚本尚不存在。

- [ ] **Step 3: 实现只读审计并生成中文报告**

  扫描数据源与公开页面文案，不修改数据库；报告说明 Google 不惩罚 AI 辅助本身，实际风险是低价值规模化内容、无法核验事实、重复 URL 与关键词堆砌。列出本轮已修、需要业务资料核验和不应自动改写三类结论。

- [ ] **Step 4: 修复可直接确认的高风险项**

  仅删除或改写没有证据的价格、授权、保修、融资、排名、库存和交付承诺；固定专业参数不凭空改动，不能核验的事实进入报告待核验清单。

- [ ] **Step 5: 运行审计测试并确认通过**

  Run: `npx tsx --test tests/full-site-content-quality.test.ts`
  Expected: PASS，新闻高风险为 0；其他遗留项均有明确位置与级别。

### Task 7: 数据库执行与上线前验证

**Files:**
- Modify: `admin.db`（通过受控同步脚本）
- Create: `backups/catalog/*`（通过现有一致性备份）

**Interfaces:**
- Consumes: `db:sync-reviewed-news`。
- Produces: 14 篇公开新闻、60 个产品、60 个配件的已验证本地数据库。

- [ ] **Step 1: 运行完整自动测试**

  Run: `npm test`
  Expected: 全部 PASS。

- [ ] **Step 2: 运行静态检查与生产构建**

  Run: `npm run lint`
  Expected: exit 0。

  Run: `npm run build`
  Expected: exit 0，14 篇新闻与 22 个重定向均能生成或解析。

- [ ] **Step 3: 执行备份和数据库同步**

  Run: `npm run db:sync-reviewed-news`
  Expected: 输出备份名称，新闻 14、产品 60、配件 60。

- [ ] **Step 4: 运行目录完整性验证**

  Run: `npm run db:verify-catalog`
  Expected: 产品/配件数量和关键关系通过。

- [ ] **Step 5: 浏览器抽检**

  检查 `/news`、至少 4 篇不同主题文章、一个旧 slug 的永久跳转、页面 H1/H2/列表/内链/更新信息、Article JSON-LD、canonical 和 sitemap；确认移动端与 PC 端无布局回归。

- [ ] **Step 6: 输出中文交付说明**

  汇报删除数量、保留主题、数据库备份、测试/构建结果、可合理期待的 SEO 改善和无法保证排名的边界，并链接中文审计报告。
