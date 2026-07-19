# SINOTRUK TEAM 独立站重构与自动化实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在不删除任何现有产品、配件及分类数据、不要求用户重新上传素材的前提下，把网站改造成可直接上线的英文商用车出口采购站，并完成新闻原创改写、SEO 自动布局、非百度搜索引擎提交和后台运营能力。

**Architecture:** 保留现有 Next.js Pages Router、React、Prisma/SQLite、后台权限、内容仓储、AI 客户端和 SEO 提交通道；前台增加采购目录、对比、清单和 RFQ 交互层，后台增加来源、任务和 SEO 健康管理；内容自动化由同仓库 Node worker 执行，以数据库任务状态保证可重试、去重和审计，不引入第二套 CMS 或付费服务。

**Tech Stack:** Next.js 16、React 19、TypeScript、Prisma 7、SQLite、Node.js worker、现有 OpenAI 兼容 AI 客户端、Cheerio、fast-xml-parser、sanitize-html、IndexNow、Google Search Console Sitemap API、Node Test/tsx、Playwright 或浏览器人工验收。

## Global Constraints

- 前台只使用英文；后台操作说明和交付文档使用中文。
- 品牌身份固定为 `SINOTRUK TEAM` 授权销售与出口服务团队；制造商事实使用第三人称，团队服务使用第一人称。
- 不写无法验证的“官方唯一”“厂家直营”等表述，不伪造资质、荣誉、案例、客户评价或技术参数。
- 不删除现有产品分类、产品、配件分类和配件；保留现有 ID、slug/URL、图片和规格。删除操作改为停用或归档。
- 新闻只抽取事实并重新生成原创英文文章；必须保留来源链接和来源日期，不直接复制正文。
- 自动发布必须经过来源白名单、去重、事实约束、内容质量、SEO 和安全净化门禁；失败进入后台队列，不带病发布。
- SEO 覆盖标题、描述、H1-H3、canonical、Open Graph、JSON-LD、内链、图片 alt、sitemap、robots、IndexNow、Google sitemap 提交和健康检查；明确不接百度。
- 保留现有询盘通知集成，不改变其鉴权或密钥；只扩展持久化的采购清单字段和通知摘要。
- 所有数据库改动只允许增量迁移；变更前备份、变更后核对记录数和关键字段哈希。
- 视觉实现遵循已确认的 `finesse-ui` 参数：`register=product`、`SOUL=5`、`SPECTACLE=2`、`DENSITY=8`、`hero-engine=none`。

---

## 文件结构与职责

```text
components/
  layout/                       # Header、Navigation、Footer
  procurement/                  # 筛选、对比、清单、RFQ 组件
  product/                      # 产品卡片、规格表、关联配件
  seo/                          # 页面 SEO 输出
  ui/                           # 按钮、抽屉、空状态、骨架屏等基础组件
lib/
  content/                      # 现有内容仓储与序列化，继续复用
  content-automation/           # 来源校验、抓取、抽取、生成、质检、发布
  procurement/                  # 筛选、比较、清单和 RFQ 领域逻辑
  seo/                          # 元数据、结构化数据、内链、提交和健康检查
pages/
  api/admin/content-*/          # 来源、任务、重试、发布后台 API
  api/admin/seo/                # SEO 健康与提交 API
  admin/content-*/              # 中文后台运营页
  admin/seo/                    # SEO 管理页
prisma/
  schema.prisma                 # 只做增量字段和模型
scripts/
  backup-database.mjs           # 数据备份
  verify-catalog-integrity.mjs  # 数据完整性核对
  normalize-catalog.ts          # 基于现有内容补全筛选与 SEO 字段
  content-worker.ts             # 常驻/单次内容任务执行器
styles/
  tokens.css                    # 设计令牌
tests/
  fixtures/                     # RSS、HTML、AI 输出固定样本
  *.test.ts                     # 纯逻辑和接口测试
docs/
  上线部署说明.md
  内容自动化运营说明.md
  SEO自动化说明.md
```

---

### Task 1：建立数据库基线、备份与防删除门禁

**Files:**
- Create: `scripts/backup-database.mjs`
- Create: `scripts/verify-catalog-integrity.mjs`
- Create: `tests/catalog-integrity.test.ts`
- Modify: `package.json`
- Modify: `prisma/seed.ts`
- Modify: `pages/api/admin/products/[id].ts`
- Modify: `pages/api/admin/parts/[id].ts`

- [ ] **Step 1: 写出会失败的数据完整性测试**

```ts
import test from 'node:test';
import assert from 'node:assert/strict';
import { compareCatalogSnapshots } from '../scripts/verify-catalog-integrity.mjs';

test('不允许产品、配件和分类记录减少', () => {
  const before = { categories: 6, products: 60, parts: 60 };
  const after = { categories: 6, products: 59, parts: 60 };
  assert.throws(() => compareCatalogSnapshots(before, after), /products.*减少/);
});
```

- [ ] **Step 2: 运行测试并确认失败**

Run: `npx tsx --test tests/catalog-integrity.test.ts`

Expected: FAIL，提示模块或 `compareCatalogSnapshots` 尚不存在。

- [ ] **Step 3: 实现备份和快照核对**

```js
export function compareCatalogSnapshots(before, after) {
  for (const key of ['categories', 'subcategories', 'products', 'parts']) {
    if ((after[key] ?? 0) < (before[key] ?? 0)) {
      throw new Error(`${key} 记录减少：${before[key]} -> ${after[key]}`);
    }
  }
}
```

备份脚本输出带时间戳的数据库副本和 JSON 清单；清单至少包含各表记录数、产品/配件 ID 列表、图片路径和规格字段 SHA-256。输出目录固定为 `backups/catalog/`，并加入 `.gitignore`。

- [ ] **Step 4: 移除 seed 中可能清理旧分类的逻辑**

将 `prisma/seed.ts` 改成纯 `upsert`；禁止依据“空分类”自动删除记录，新增内容只能创建或更新。

- [ ] **Step 5: 将产品和配件删除改为归档**

`DELETE` 处理不再调用 `prisma.product.delete` 或 `prisma.part.delete`，而是更新 `isActive: false`；响应保持成功语义并返回 `{ archived: true, id }`。编辑页提供重新启用能力，确保误操作可恢复。

- [ ] **Step 6: 增加脚本命令并验证**

```json
{
  "db:backup": "node scripts/backup-database.mjs",
  "db:verify-catalog": "node scripts/verify-catalog-integrity.mjs"
}
```

Run: `npm run db:backup`

Expected: 生成数据库副本和 `catalog-snapshot.json`，终端不打印任何密钥。

Run: `npx tsx --test tests/catalog-integrity.test.ts`

Expected: PASS。

- [ ] **Step 7: 提交**

```powershell
git add package.json prisma/seed.ts scripts/backup-database.mjs scripts/verify-catalog-integrity.mjs tests/catalog-integrity.test.ts pages/api/admin/products/[id].ts pages/api/admin/parts/[id].ts .gitignore
git commit -m "chore: protect existing catalog data"
```

---

### Task 2：扩展数据模型，保留现有记录与 URL

**Files:**
- Modify: `prisma/schema.prisma`
- Create: `tests/schema-contract.test.ts`
- Modify: `lib/content/serializers.ts`
- Modify: `lib/content/repository.ts`

- [ ] **Step 1: 写 schema 契约测试**

```ts
test('采购和内容自动化字段存在', async () => {
  const schema = await readFile('prisma/schema.prisma', 'utf8');
  for (const token of ['normalizedSpecs', 'selectionPayload', 'model NewsSource', 'model ContentJob', 'model NewsRevision']) {
    assert.match(schema, new RegExp(token));
  }
});
```

- [ ] **Step 2: 运行测试并确认失败**

Run: `npx tsx --test tests/schema-contract.test.ts`

Expected: FAIL，缺少新增字段/模型。

- [ ] **Step 3: 对现有模型做增量扩展**

```prisma
model Product {
  // 保留全部现有字段
  normalizedSpecs String @default("{}")
  applicationTags String @default("[]")
  marketTags      String @default("[]")
}

model Part {
  // 保留全部现有字段
  compatibleModels String @default("[]")
}

model Inquiry {
  // 保留全部现有字段
  company          String?
  destinationPort  String?
  quantity         Int?
  useCase          String?
  configuration    String?
  selectionPayload String  @default("[]")
  consent          Boolean @default(false)
}

model News {
  // 保留全部现有字段
  sourceUrl         String? @unique
  sourceTitle       String?
  sourceDate        String?
  sourceFingerprint String? @unique
  generatedBy       String?
  revisions         NewsRevision[]
  jobs              ContentJob[]
}

model NewsSource {
  id                  String   @id @default(cuid())
  name                String
  baseUrl             String
  feedUrl              String
  sourceType           String   @default("rss")
  enabled              Boolean  @default(false)
  pollIntervalMinutes  Int      @default(360)
  dailyLimit           Int      @default(3)
  allowImages          Boolean  @default(false)
  defaultCategory      String?
  defaultTags          String   @default("[]")
  lastCursor           String?
  lastPolledAt         DateTime?
  failureCount         Int      @default(0)
  createdAt            DateTime @default(now())
  updatedAt            DateTime @updatedAt
  jobs                 ContentJob[]
}

model ContentJob {
  id               String      @id @default(cuid())
  sourceId         String?
  sourceUrl        String      @unique
  fingerprint      String      @unique
  status           String      @default("queued")
  sourceTitle      String?
  sourceDate       String?
  extractedFacts   String      @default("[]")
  generatedPayload String?
  errorStage       String?
  errorMessage     String?
  attempts         Int         @default(0)
  newsId           String?
  createdAt        DateTime    @default(now())
  updatedAt        DateTime    @updatedAt
  publishedAt      DateTime?
  source           NewsSource? @relation(fields: [sourceId], references: [id], onDelete: SetNull)
  news             News?       @relation(fields: [newsId], references: [id], onDelete: SetNull)
}

model NewsRevision {
  id        String   @id @default(cuid())
  newsId    String
  payload   String
  reason    String
  createdAt DateTime @default(now())
  news      News     @relation(fields: [newsId], references: [id], onDelete: Cascade)
}
```

任务状态使用字符串枚举值 `queued|fetching|generating|reviewing|published|failed`，便于 SQLite 和后台筛选；新增模型不对现有 Category、Subcategory、Product、Part 建立级联删除关系。

- [ ] **Step 4: 生成客户端并安全同步**

Run: `npm run db:backup`

Run: `npx prisma format`

Run: `npx prisma db push`

Run: `npx prisma generate`

Expected: schema 同步成功，既有记录未减少。

- [ ] **Step 5: 扩展序列化类型并保持旧数据兼容**

```ts
export const parseJson = <T>(value: string | null | undefined, fallback: T): T => {
  try { return value ? JSON.parse(value) as T : fallback; }
  catch { return fallback; }
};
```

旧记录缺少新字段时返回空对象/数组，不影响现有页面和 URL。

- [ ] **Step 6: 验证数据和测试**

Run: `npm run db:verify-catalog`

Expected: 分类、产品、配件数量不低于基线，关键 ID 全部存在。

Run: `npm test`

Expected: 全部 PASS。

- [ ] **Step 7: 提交**

```powershell
git add prisma/schema.prisma lib/content/serializers.ts lib/content/repository.ts tests/schema-contract.test.ts
git commit -m "feat: add procurement and content automation data model"
```

---

### Task 3：建立高密度采购型设计系统

**Files:**
- Create: `styles/tokens.css`
- Create: `components/ui/Button.tsx`
- Create: `components/ui/FilterDrawer.tsx`
- Create: `components/ui/EmptyState.tsx`
- Create: `components/ui/Skeleton.tsx`
- Modify: `pages/_app.tsx`
- Modify: `styles/globals.css`
- Modify: `components/SiteImage.tsx`
- Create: `tests/ui-contract.test.ts`

- [ ] **Step 1: 写设计令牌契约测试**

```ts
test('设计系统包含采购站核心令牌', async () => {
  const css = await readFile('styles/tokens.css', 'utf8');
  for (const token of ['--color-ink', '--color-signal', '--space-3', '--radius-panel', '--shadow-focus']) {
    assert.ok(css.includes(token));
  }
});
```

- [ ] **Step 2: 运行并确认失败**

Run: `npx tsx --test tests/ui-contract.test.ts`

Expected: FAIL。

- [ ] **Step 3: 实现设计令牌**

```css
:root {
  --color-ink: #111820;
  --color-steel: #53606d;
  --color-canvas: #f4f6f7;
  --color-panel: #ffffff;
  --color-line: #d8dee3;
  --color-signal: #d71920;
  --color-signal-dark: #a90f15;
  --space-1: .25rem;
  --space-2: .5rem;
  --space-3: .75rem;
  --space-4: 1rem;
  --radius-panel: .375rem;
  --shadow-focus: 0 0 0 3px rgb(215 25 32 / 18%);
}
```

字体使用系统字体栈，标题强调字重而非装饰字体；动效只使用 120–200ms 的状态反馈，不增加 WebGL/大幅滚动动画。

- [ ] **Step 4: 实现可访问基础组件**

`Button` 支持 `primary|secondary|quiet`；`FilterDrawer` 支持键盘关闭、焦点返回和 `aria-modal`；所有图片组件要求业务层传入描述性 `alt`，装饰图明确 `alt=""`。

- [ ] **Step 5: 接入全局样式并验证**

Run: `npm test`

Run: `npm run lint`

Expected: PASS，无 TypeScript/ESLint 错误。

- [ ] **Step 6: 提交**

```powershell
git add styles components/ui components/SiteImage.tsx pages/_app.tsx tests/ui-contract.test.ts
git commit -m "feat: establish procurement design system"
```

---

### Task 4：重构全站导航、页脚和移动端入口

**Files:**
- Modify: `components/layout/Header.tsx`
- Modify: `components/layout/Navigation.tsx`
- Modify: `components/layout/Footer.tsx`
- Create: `components/procurement/ShortlistButton.tsx`
- Create: `lib/procurement/shortlist.ts`
- Create: `tests/shortlist.test.ts`

- [ ] **Step 1: 写 shortlist 状态测试**

```ts
test('清单去重并保持加入顺序', () => {
  assert.deepEqual(addToShortlist(['truck-1'], 'truck-1'), ['truck-1']);
  assert.deepEqual(addToShortlist(['truck-1'], 'truck-2'), ['truck-1', 'truck-2']);
});
```

- [ ] **Step 2: 运行并确认失败**

Run: `npx tsx --test tests/shortlist.test.ts`

Expected: FAIL。

- [ ] **Step 3: 实现本地清单存储**

```ts
export const SHORTLIST_KEY = 'sinotruk-team-shortlist-v1';
export const addToShortlist = (ids: string[], id: string) => ids.includes(id) ? ids : [...ids, id];
export const removeFromShortlist = (ids: string[], id: string) => ids.filter(item => item !== id);
```

清单仅保存产品 ID，不保存用户个人信息；浏览器不可用时安全退化为空列表。

- [ ] **Step 4: 重做导航与页脚**

桌面导航包含 `Products / Parts / Solutions / News / About / Contact`，右侧固定 `Shortlist (n)` 与 `Request a Quote`；移动端提供目录入口、清单数量和 RFQ 主按钮。页脚包含业务范围、快速链接、联系信息、隐私/条款、sitemap 链接，不新增未经确认的认证标识。

- [ ] **Step 5: 验证键盘和响应式行为**

Run: `npm test`

Run: `npm run lint`

Expected: PASS；Tab 顺序连续，移动菜单可用 Escape 关闭。

- [ ] **Step 6: 提交**

```powershell
git add components/layout components/procurement/ShortlistButton.tsx lib/procurement/shortlist.ts tests/shortlist.test.ts
git commit -m "feat: redesign global procurement navigation"
```

---

### Task 5：首页改为“产品目录优先”的采购入口

**Files:**
- Modify: `pages/index.tsx`
- Modify: `components/home/HeroBanner.tsx`
- Modify: `components/home/CategorySection.tsx`
- Modify: `components/home/AboutSection.tsx`
- Modify: `components/home/TechAdvantages.tsx`
- Modify: `components/home/GlobalBusiness.tsx`
- Modify: `components/home/IndustryApplications.tsx`
- Modify: `components/home/NewsSection.tsx`
- Modify: `components/home/CTASection.tsx`
- Create: `components/home/ProcurementPaths.tsx`
- Create: `tests/home-content.test.ts`

- [ ] **Step 1: 写首页内容契约测试**

```ts
test('首页首屏突出目录和询盘且没有虚假官方措辞', async () => {
  const source = await readFile('components/home/HeroBanner.tsx', 'utf8');
  assert.match(source, /Explore Product Range/);
  assert.match(source, /Request a Quote/);
  assert.doesNotMatch(source, /official exclusive|factory direct/i);
});
```

- [ ] **Step 2: 运行并确认失败**

Run: `npx tsx --test tests/home-content.test.ts`

Expected: FAIL。

- [ ] **Step 3: 实现首页信息架构**

顺序固定为：紧凑首屏目录入口 → 现有分类快捷入口 → 经销商/终端车队双路径 → 重点产品 → 采购服务流程 → 应用场景 → 最新原创新闻 → RFQ。首屏不使用大面积口号轮播，不公开价格。

- [ ] **Step 4: 从数据库读取现有分类和产品**

继续使用 `lib/content/repository.ts`，不在组件中复制产品数组；空图使用现有 fallback，不要求重新上传。

- [ ] **Step 5: 验证**

Run: `npm test`

Run: `npm run build`

Expected: 首页静态生成成功，现有数据库产品可见。

- [ ] **Step 6: 提交**

```powershell
git add pages/index.tsx components/home tests/home-content.test.ts
git commit -m "feat: rebuild homepage around product discovery"
```

---

### Task 6：实现目录筛选、对比和采购清单

**Files:**
- Create: `lib/procurement/types.ts`
- Create: `lib/procurement/filter-products.ts`
- Create: `lib/procurement/compare-products.ts`
- Create: `components/procurement/ProductFilters.tsx`
- Create: `components/procurement/CompareTray.tsx`
- Create: `components/procurement/ComparisonTable.tsx`
- Modify: `components/product/ProductCard.tsx`
- Modify: `pages/products/index.tsx`
- Modify: `pages/products/[category].tsx`
- Create: `tests/product-filter.test.ts`

- [ ] **Step 1: 写筛选和对比测试**

```ts
test('按驱动形式、用途和功率区间组合筛选', () => {
  const result = filterProducts(fixtures, { drive: ['6x4'], applications: ['mining'], powerMin: 350 });
  assert.deepEqual(result.map(item => item.id), ['p2']);
});

test('最多比较四个产品', () => {
  assert.throws(() => createComparison(['1', '2', '3', '4', '5']), /最多 4 个/);
});
```

- [ ] **Step 2: 运行并确认失败**

Run: `npx tsx --test tests/product-filter.test.ts`

Expected: FAIL。

- [ ] **Step 3: 实现纯函数筛选和 URL 状态**

```ts
export interface ProductFilterState {
  category?: string;
  drive: string[];
  applications: string[];
  powerMin?: number;
  powerMax?: number;
}
```

筛选条件序列化到 query string，链接可分享、可被浏览器前进后退恢复；移动端使用抽屉，桌面使用左侧紧凑筛选栏。

- [ ] **Step 4: 实现产品卡、对比托盘和比较表**

卡片展示名称、类别、3–5 个关键规格、用途标签以及 `Compare / Add to Shortlist / View Specs`；比较表只对齐真实存在的字段，未知值显示 `Contact us` 或 `Not specified`，不猜测。

- [ ] **Step 5: 验证目录行为**

Run: `npm test`

Run: `npm run build`

Expected: 所有现有产品 URL 均可生成，筛选无结果时显示重置入口。

- [ ] **Step 6: 提交**

```powershell
git add lib/procurement components/procurement components/product/ProductCard.tsx pages/products tests/product-filter.test.ts
git commit -m "feat: add product filtering comparison and shortlist"
```

---

### Task 7：重构产品详情和配件目录

**Files:**
- Modify: `components/product/ProductDetail.tsx`
- Create: `components/product/SpecificationTable.tsx`
- Create: `components/product/RelatedParts.tsx`
- Modify: `pages/products/[category]/[subcategory]/[product].tsx`
- Modify: `pages/parts/index.tsx`
- Modify: `pages/parts/[part].tsx`
- Create: `tests/product-detail.test.ts`

- [ ] **Step 1: 写规格分组测试**

```ts
test('规格按动力、底盘、尺寸和能力分组，未知键进入其他', () => {
  const groups = groupSpecifications({ engine: 'WP10', drive: '6x4', custom: 'value' });
  assert.equal(groups.power.engine, 'WP10');
  assert.equal(groups.chassis.drive, '6x4');
  assert.equal(groups.other.custom, 'value');
});
```

- [ ] **Step 2: 运行并确认失败**

Run: `npx tsx --test tests/product-detail.test.ts`

Expected: FAIL。

- [ ] **Step 3: 实现采购规格页**

详情页顺序：面包屑 → 产品身份与关键规格 → 图库 → 完整规格 → 应用/配置说明 → 关联配件 → 相关产品 → 固定 RFQ 操作。所有规格来自当前产品字段，不写价格，不自动补造参数。

- [ ] **Step 4: 重构配件列表与详情**

保留现有配件记录和图片；提供部件号、分类、兼容车型和关键词筛选。兼容关系为空时显示“Please provide the truck model or VIN for confirmation”，避免错误适配承诺。

- [ ] **Step 5: 验证**

Run: `npm test`

Run: `npm run build`

Expected: 所有现有产品和配件详情页成功生成，无 404 增量。

- [ ] **Step 6: 提交**

```powershell
git add components/product pages/products/[category]/[subcategory]/[product].tsx pages/parts tests/product-detail.test.ts
git commit -m "feat: turn product and parts pages into specification tools"
```

---

### Task 8：完成带采购清单的 RFQ 流程

**Files:**
- Create: `lib/procurement/rfq.ts`
- Create: `components/procurement/RfqForm.tsx`
- Modify: `pages/contact.tsx`
- Modify: `pages/api/contact.ts`
- Modify: `pages/admin/inquiries/index.tsx`
- Create: `tests/rfq.test.ts`

- [ ] **Step 1: 写 RFQ 校验测试**

```ts
test('RFQ 至少需要邮箱、公司、需求内容和同意条款', () => {
  const result = validateRfq({ email: 'buyer@example.com', company: '', message: '', consent: false, selection: [] });
  assert.deepEqual(result.errors.map(item => item.field), ['company', 'message', 'consent']);
});
```

- [ ] **Step 2: 运行并确认失败**

Run: `npx tsx --test tests/rfq.test.ts`

Expected: FAIL。

- [ ] **Step 3: 实现共享校验和安全序列化**

```ts
export type RfqSelection = { productId: string; quantity?: number; note?: string };
export const MAX_SELECTIONS = 20;
```

服务端重新校验产品 ID、字段长度和数量；`selectionPayload` 只保存结构化 JSON，通知正文用纯文本摘要，避免 HTML 注入。

- [ ] **Step 4: 实现 RFQ 页面和后台查看**

表单包含联系人、公司、国家、邮箱/电话、目的港、用途、配置、采购清单、补充说明和隐私同意；自动带入 shortlist。后台询盘页显示清单明细但不改变现有状态流。

- [ ] **Step 5: 保留现有通知集成并验证 API**

不改通知服务地址、密钥或鉴权；只将经过转义的采购摘要附加到现有消息。

Run: `npm test`

Expected: PASS；非法产品 ID、超长文本和无同意请求返回 400。

- [ ] **Step 6: 提交**

```powershell
git add lib/procurement/rfq.ts components/procurement/RfqForm.tsx pages/contact.tsx pages/api/contact.ts pages/admin/inquiries/index.tsx tests/rfq.test.ts
git commit -m "feat: add procurement shortlist to RFQ workflow"
```

---

### Task 9：重写关于、服务和新闻前台结构

**Files:**
- Modify: `pages/about.tsx`
- Modify: `pages/service.tsx`
- Modify: `pages/news/index.tsx`
- Modify: `pages/news/[slug].tsx`
- Create: `components/news/SourceDisclosure.tsx`
- Create: `tests/public-copy.test.ts`

- [ ] **Step 1: 写品牌措辞和来源披露测试**

```ts
test('服务使用第一人称，制造商事实不冒充团队事实', async () => {
  const about = await readFile('pages/about.tsx', 'utf8');
  assert.match(about, /We support|Our export team/);
  assert.doesNotMatch(about, /We manufacture/i);
});
```

- [ ] **Step 2: 运行并确认失败**

Run: `npx tsx --test tests/public-copy.test.ts`

Expected: FAIL。

- [ ] **Step 3: 重写页面内容**

About 聚焦团队角色、服务范围、采购流程和全球交付支持；Service 分别覆盖经销商合作与终端车队采购；不得添加无法核实的员工数量、出口国家数、销量、奖项或客户评价。

- [ ] **Step 4: 重构新闻列表和文章页**

文章页显示原创标题、更新时间、分类、正文、相关产品/文章和来源披露；来源披露格式为 `Facts referenced from: [source name] · [source date]`，链接加 `rel="nofollow noopener noreferrer"`。

- [ ] **Step 5: 验证**

Run: `npm test`

Run: `npm run build`

Expected: PASS；旧新闻 slug 继续可访问。

- [ ] **Step 6: 提交**

```powershell
git add pages/about.tsx pages/service.tsx pages/news components/news tests/public-copy.test.ts
git commit -m "feat: rewrite public brand and editorial pages"
```

---

### Task 10：实现安全的新闻来源抓取、事实抽取和去重

**Files:**
- Modify: `package.json`
- Create: `lib/content-automation/types.ts`
- Create: `lib/content-automation/source-policy.ts`
- Create: `lib/content-automation/feed.ts`
- Create: `lib/content-automation/extract.ts`
- Create: `lib/content-automation/fingerprint.ts`
- Create: `tests/content-source-policy.test.ts`
- Create: `tests/content-extraction.test.ts`
- Create: `tests/fixtures/source-feed.xml`
- Create: `tests/fixtures/source-article.html`

- [ ] **Step 1: 安装最小开源依赖**

Run: `npm install cheerio fast-xml-parser sanitize-html`

Run: `npm install -D @types/sanitize-html`

Expected: lockfile 更新，无付费服务依赖。

- [ ] **Step 2: 先写 SSRF、去重和正文抽取测试**

```ts
test('拒绝 localhost、私网 IP、非 http(s) 与白名单外跳转', async () => {
  for (const url of ['http://127.0.0.1/x', 'http://169.254.169.254/x', 'file:///etc/passwd']) {
    await assert.rejects(() => assertFetchableSource(url, ['example.com']));
  }
});

test('URL 归一化忽略跟踪参数', () => {
  assert.equal(fingerprintUrl('https://a.com/x?utm_source=y'), fingerprintUrl('https://a.com/x'));
});
```

- [ ] **Step 3: 运行并确认失败**

Run: `npx tsx --test tests/content-source-policy.test.ts tests/content-extraction.test.ts`

Expected: FAIL。

- [ ] **Step 4: 实现安全抓取边界**

```ts
export interface SourcePolicy {
  allowedHosts: string[];
  maxBytes: number;
  timeoutMs: number;
  maxRedirects: number;
}
```

只允许 `http/https`；校验初始地址和每次重定向；DNS 解析后的 IPv4/IPv6 不得落入 loopback、link-local、private、multicast；限制 2 MB、10 秒、3 次跳转和 HTML/XML MIME。

- [ ] **Step 5: 实现 feed/HTML 解析和事实包**

```ts
export interface FactPacket {
  sourceUrl: string;
  sourceTitle: string;
  sourceDate?: string;
  facts: string[];
  quotedEntities: string[];
  productHints: string[];
}
```

删除脚本、导航、页脚、广告和表单，只保留标题、日期及正文段落；事实包用于生成，不把原文 HTML 送入发布路径。

- [ ] **Step 6: 验证**

Run: `npm test`

Expected: PASS；固定样本能提取标题、日期、事实且追踪参数不导致重复任务。

- [ ] **Step 7: 提交**

```powershell
git add package.json package-lock.json lib/content-automation tests/content-source-policy.test.ts tests/content-extraction.test.ts tests/fixtures
git commit -m "feat: add safe editorial source ingestion"
```

---

### Task 11：实现原创生成、事实门禁、SEO 布局和自动发布

**Files:**
- Modify: `lib/ai/prompts.ts`
- Create: `lib/content-automation/generate.ts`
- Create: `lib/content-automation/quality.ts`
- Create: `lib/content-automation/publish.ts`
- Modify: `lib/content/mutation-effects.ts`
- Create: `tests/content-quality.test.ts`
- Create: `tests/content-publish.test.ts`

- [ ] **Step 1: 写质量门禁测试**

```ts
test('缺少来源、与原文重合过高或出现未支持数字时禁止发布', () => {
  assert.equal(checkGeneratedArticle(badArticle, factPacket).publishable, false);
});

test('通过文章必须有唯一标题、描述、H1、内链和来源', () => {
  assert.equal(checkGeneratedArticle(goodArticle, factPacket).publishable, true);
});
```

- [ ] **Step 2: 运行并确认失败**

Run: `npx tsx --test tests/content-quality.test.ts tests/content-publish.test.ts`

Expected: FAIL。

- [ ] **Step 3: 定义结构化生成契约**

```ts
export interface GeneratedArticle {
  title: string;
  slug: string;
  excerpt: string;
  html: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  relatedProductIds: string[];
  sourceUrl: string;
  sourceTitle: string;
  sourceDate?: string;
}
```

提示词明确：仅使用 `FactPacket`，英文原创表达，不复制连续长句，不新增数字/型号/引语，不声称 SINOTRUK TEAM 是制造商；输出严格 JSON。

- [ ] **Step 4: 实现发布门禁**

门禁至少检查：字段完整、标题/slug 唯一、300–1800 英文词、标题 35–65 字符、描述 120–160 字符、H1 唯一、层级正确、来源域匹配、事实数字子集、重复 n-gram 阈值、危险 HTML 清除、内链目标存在、图片授权策略。

- [ ] **Step 5: 实现事务发布和修订记录**

在一个 Prisma 事务中创建/更新 News、写 NewsRevision、标记 ContentJob；事务成功后调用现有 `mutation-effects` 做 ISR revalidate、IndexNow 和 Google sitemap 提交。提交失败记录在 `SeoSubmission`，不回滚已发布正文。

- [ ] **Step 6: 验证**

Run: `npm test`

Expected: PASS；失败文章保持 `failed` 且包含阶段/错误，合格文章变为 `published` 并保留来源。

- [ ] **Step 7: 提交**

```powershell
git add lib/ai/prompts.ts lib/content-automation lib/content/mutation-effects.ts tests/content-quality.test.ts tests/content-publish.test.ts
git commit -m "feat: automate original fact-bound news publishing"
```

---

### Task 12：增加后台来源、任务队列和自动 worker

**Files:**
- Create: `lib/content-automation/worker.ts`
- Create: `scripts/content-worker.ts`
- Create: `pages/api/admin/content-sources/index.ts`
- Create: `pages/api/admin/content-sources/[id].ts`
- Create: `pages/api/admin/content-jobs/index.ts`
- Create: `pages/api/admin/content-jobs/[id].ts`
- Create: `pages/admin/content-sources.tsx`
- Create: `pages/admin/content-jobs.tsx`
- Modify: `components/admin/AdminLayout.tsx`
- Modify: `ecosystem.config.cjs`
- Modify: `package.json`
- Create: `tests/content-worker.test.ts`

- [ ] **Step 1: 写 worker 编排测试**

```ts
test('同一来源一次只处理日限额内的新链接', async () => {
  const result = await runSourceOnce(source, deps);
  assert.equal(result.queued, 2);
  assert.equal(result.duplicates, 1);
  assert.ok(result.queued <= source.dailyLimit);
});
```

- [ ] **Step 2: 运行并确认失败**

Run: `npx tsx --test tests/content-worker.test.ts`

Expected: FAIL。

- [ ] **Step 3: 实现可注入依赖的 worker**

```ts
export interface WorkerDeps {
  fetchFeed(source: NewsSource): Promise<FeedItem[]>;
  processJob(jobId: string): Promise<void>;
  now(): Date;
}
```

使用数据库原子状态更新抢占任务；异常写入阶段、消息和重试次数；指数退避，最多 3 次；支持 `--once` 便于部署验收。

- [ ] **Step 4: 实现中文后台**

来源页支持新增、编辑、启停、立即抓取、每日上限和最后结果；任务页显示状态、来源、标题、失败阶段、重试、查看已发布文章。所有 API 复用现有管理员鉴权和 CSRF/方法限制。

- [ ] **Step 5: 加入进程配置**

```js
{
  name: 'sinotruk-content-worker',
  script: 'node_modules/tsx/dist/cli.mjs',
  args: 'scripts/content-worker.ts',
  autorestart: true,
  max_restarts: 10
}
```

`package.json` 增加 `content:worker` 和 `content:worker:once`，不在 Web 请求内执行长时间抓取。

- [ ] **Step 6: 验证**

Run: `npm test`

Run: `npm run content:worker:once`

Expected: 无启用来源时安全退出；使用测试来源时只创建去重后的任务。

- [ ] **Step 7: 提交**

```powershell
git add lib/content-automation/worker.ts scripts/content-worker.ts pages/api/admin/content-sources pages/api/admin/content-jobs pages/admin/content-sources.tsx pages/admin/content-jobs.tsx components/admin/AdminLayout.tsx ecosystem.config.cjs package.json tests/content-worker.test.ts
git commit -m "feat: add editorial automation operations"
```

---

### Task 13：补全全站 SEO 自动化与后台健康检查

**Files:**
- Modify: `components/seo/SeoHead.tsx`
- Modify: `lib/seo/resolve.ts`
- Create: `lib/seo/schema.ts`
- Create: `lib/seo/internal-links.ts`
- Create: `lib/seo/image-alt.ts`
- Create: `lib/seo/health.ts`
- Modify: `pages/sitemap.xml.tsx`
- Modify: `pages/robots.txt.tsx`
- Create: `pages/api/admin/seo/health.ts`
- Create: `pages/api/admin/seo/submit.ts`
- Modify: `pages/admin/seo/index.tsx`
- Create: `tests/seo-health.test.ts`
- Modify: `tests/seo.test.ts`
- Modify: `tests/seo-submission.test.ts`

- [ ] **Step 1: 写 SEO 健康测试**

```ts
test('发现缺失 canonical、重复 title、无 alt 和孤立页面', () => {
  const report = auditSeo(siteFixture);
  assert.deepEqual(report.issues.map(i => i.code), [
    'missing_canonical', 'duplicate_title', 'missing_alt', 'orphan_page'
  ]);
});
```

- [ ] **Step 2: 运行并确认失败**

Run: `npx tsx --test tests/seo-health.test.ts tests/seo.test.ts tests/seo-submission.test.ts`

Expected: FAIL。

- [ ] **Step 3: 扩展统一 SEO 解析器**

```ts
export interface ResolvedSeo {
  title: string;
  description: string;
  canonical: string;
  robots: string;
  openGraph: Record<string, string>;
  jsonLd: Record<string, unknown>[];
}
```

优先级固定为后台显式 SEO → 内容字段 → 类型模板；为 Organization、WebSite、BreadcrumbList、Product、Article、FAQPage（仅页面确有 FAQ 时）生成 JSON-LD。Product schema 不输出价格/Offer。

- [ ] **Step 4: 实现内链、alt 和健康报告**

基于已存在的分类、产品 ID、文章标签生成可验证内链；图片 alt 使用 `品牌/型号 + 视角或用途` 的确定性模板，禁止关键词堆砌；健康报告列出问题 URL、字段、严重级别和修复建议。

- [ ] **Step 5: 完成 sitemap、robots 和非百度提交**

sitemap 包含首页、静态页、分类、产品、配件和已发布新闻；robots 指向 canonical sitemap。提交渠道仅 `IndexNow` 和 `Google Search Console sitemap`，后台可手动重试并查看历史；代码和界面中不出现百度提交入口。

- [ ] **Step 6: 验证**

Run: `npm test`

Run: `npm run build`

Expected: PASS；sitemap URL 全为绝对 canonical；提交测试确认无百度请求。

- [ ] **Step 7: 提交**

```powershell
git add components/seo lib/seo pages/sitemap.xml.tsx pages/robots.txt.tsx pages/api/admin/seo pages/admin/seo/index.tsx tests/seo-health.test.ts tests/seo.test.ts tests/seo-submission.test.ts
git commit -m "feat: complete automated SEO coverage and health checks"
```

---

### Task 14：就地补全现有产品、配件和页面内容

**Files:**
- Create: `scripts/normalize-catalog.ts`
- Create: `scripts/rewrite-existing-content.ts`
- Create: `lib/content/catalog-enrichment.ts`
- Create: `tests/catalog-enrichment.test.ts`
- Modify: `package.json`

- [ ] **Step 1: 写“只增补、不删除、不编造”的测试**

```ts
test('补全结果保留 ID、图片、原始规格且只加入可推导字段', () => {
  const enriched = enrichProduct(existingProduct);
  assert.equal(enriched.id, existingProduct.id);
  assert.equal(enriched.image, existingProduct.image);
  assert.deepEqual(enriched.specifications, existingProduct.specifications);
  assert.ok(Array.isArray(enriched.applicationTags));
});
```

- [ ] **Step 2: 运行并确认失败**

Run: `npx tsx --test tests/catalog-enrichment.test.ts`

Expected: FAIL。

- [ ] **Step 3: 实现确定性规格归一化**

从现有名称、分类和规格字段映射驱动形式、功率、排放、用途等可筛选字段；无法确认的值留空并输出审计报告，不猜测。脚本支持 `--dry-run` 和 `--apply`。

- [ ] **Step 4: 实现现有英文文案重写**

重写脚本将当前描述拆成“已知事实”和“营销表达”，调用现有 AI 客户端生成原创英文描述；事实数字、型号、部件号和规格必须逐项回查，失败则保留原内容并列入报告。每条变更保存前后版本，不更换图片和 URL。

- [ ] **Step 5: 先预览再应用到全部现有记录**

Run: `npm run db:backup`

Run: `npx tsx scripts/normalize-catalog.ts --dry-run`

Run: `npx tsx scripts/rewrite-existing-content.ts --dry-run`

Expected: 报告列出将修改字段、跳过原因和 0 删除。

Run: `npx tsx scripts/normalize-catalog.ts --apply`

Run: `npx tsx scripts/rewrite-existing-content.ts --apply`

Expected: 当前产品、配件和页面内容均就地补全；AI 失败不破坏原内容。

- [ ] **Step 6: 运行完整性检查**

Run: `npm run db:verify-catalog`

Expected: ID、记录数、图片和原规格基线全部通过。

- [ ] **Step 7: 提交**

```powershell
git add scripts/normalize-catalog.ts scripts/rewrite-existing-content.ts lib/content/catalog-enrichment.ts tests/catalog-enrichment.test.ts package.json
git commit -m "feat: enrich existing catalog without data loss"
```

---

### Task 15：上线级验证、中文文档和回滚演练

**Files:**
- Create: `docs/上线部署说明.md`
- Create: `docs/内容自动化运营说明.md`
- Create: `docs/SEO自动化说明.md`
- Create: `docs/数据备份与回滚说明.md`
- Modify: `README.md`

- [ ] **Step 1: 运行全套自动检查**

Run: `npm test`

Expected: 全部测试 PASS。

Run: `npm run lint`

Expected: 0 error。

Run: `npm run build`

Expected: production build 成功，所有动态静态路径生成成功。

- [ ] **Step 2: 核对数据与 URL**

Run: `npm run db:verify-catalog`

Expected: 产品、配件、分类数量不少于基线；全部旧 URL 返回 200 或明确的永久重定向，不能静默 404。

- [ ] **Step 3: 进行浏览器桌面和移动端验收**

在 1440×900、1024×768、390×844 验证：首页、产品目录、筛选、对比、产品详情、配件、新闻、RFQ、后台来源、任务、SEO 健康。检查横向溢出、焦点样式、键盘操作、加载/空/错误状态和图片比例。

- [ ] **Step 4: 检查 SEO 输出**

抽查首页、分类、产品、配件、新闻各 3 个 URL：唯一 title/description、单一 H1、canonical、Open Graph、正确 JSON-LD、面包屑、内链、alt、sitemap 和 robots。用结构化数据测试工具验证无阻断错误。

- [ ] **Step 5: 演练自动内容与提交**

使用固定测试来源执行一次 `content:worker:once`：确认抓取 → 事实包 → 原创文章 → 质量门禁 → 发布 → revalidate → IndexNow/Google 提交记录完整。生产来源上线前只添加已确认白名单。

- [ ] **Step 6: 编写中文交付文档**

文档必须包含：环境变量名称（不写真实密钥）、数据库备份/恢复、PM2 双进程启动、来源配置、任务失败处理、AI 失败策略、SEO 提交配置、上线检查、回滚步骤和日常维护。

- [ ] **Step 7: 回滚演练**

停止 worker，复制当前数据库到临时演练目录，使用最近备份恢复临时副本，运行完整性脚本；不得直接覆盖生产/开发正在使用的数据库。

- [ ] **Step 8: 最终差异和秘密检查**

Run: `git diff --check`

Run: `git status --short`

Expected: 无空白错误；只包含本项目预期文件；代码和文档不包含 API 密钥、通知地址密钥或管理员密码。

- [ ] **Step 9: 提交**

```powershell
git add docs README.md
git commit -m "docs: add Chinese launch and operations guides"
```

---

## 最终验收标准

- [ ] 现有产品、配件及分类的记录数、ID、图片和规格通过基线核验，无需重新上传。
- [ ] 所有公开页面完成英文采购型重构，旧 URL 可访问，移动端与键盘操作正常。
- [ ] 用户可筛选、比较、加入清单并提交包含采购明细的 RFQ，且不公开价格。
- [ ] 关于/服务/新闻内容符合团队身份，不包含无法核实的资质、数字、案例或客户评价。
- [ ] 新闻可按白名单自动抓取、事实抽取、原创生成、质检、发布、留痕和失败重试。
- [ ] 全站 SEO 字段、结构化数据、内链、图片 alt、sitemap、robots、IndexNow 和 Google 提交均可自动运行。
- [ ] 后台可管理内容来源、任务、失败重试、SEO 健康和提交历史，且全部为中文操作界面。
- [ ] `npm test`、`npm run lint`、`npm run build` 和 `npm run db:verify-catalog` 全部通过。
- [ ] 中文部署、内容运营、SEO 和回滚文档完整，项目可直接部署上线。
