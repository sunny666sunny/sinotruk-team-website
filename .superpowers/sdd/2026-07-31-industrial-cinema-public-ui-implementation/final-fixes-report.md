# Final integration fixes report

基线：`37f23b8`。范围严格限定为最终审查的 3 个 Important 与 2 个 Minor；未修改产品、配件或新闻记录，未修改后台 API/schema/provider，未增加依赖或百度生产集成。

## 修复结果

1. **SSR public theme**
   - `_app` 在服务端直接为公开页面输出 `industrial-site` 根节点；admin 路由不输出该类。
   - 删除 body hydration effect，并把背景、字体、token、focus 与 reduced-motion 作用域改到该 SSR 根节点；未改 `_document` 或引入 `getInitialProps`。
   - 生产构建 HTML 抽查确认公开页有主题根、admin 无主题根。

2. **统一 SeoHead**
   - `AboutPageLayout`、`ServicePageLayout`、`video`、`shortlist` 改用 `SeoHead`，保留既有 layout 导出与 props 兼容。
   - About/Service 子路由 canonical 在 SSR/SSG 阶段按真实路由生成；代表页面均有 title、description、single canonical、robots、OG、Twitter 与 WebPage JSON-LD。
   - shortlist 使用 `noindex,follow`，同时保留完整辅助页 metadata。

3. **RFQ context**
   - 产品卡片与详情 sticky action 使用 `?product=<id>`；配件详情两个 RFQ 入口均保留 `?part=<id>`。
   - Contact 的 `getStaticProps` 复用 published catalogue repository 提供 allowlist；页面把 shortlist 与 product/part query 合并、去重并排除未发布/注入 ID。
   - `/api/contact`、`handleSubmit`、payload key 与 JSON 结构保持不变。

4. **News filter URL**
   - 分类控件改为真实 `Link` query URL，筛选直接从 `router.query.category` 派生，支持刷新与前后退。
   - 默认构建 HTML 仍包含全部 36 个文章链接，并输出 4 个分类 query 链接。

5. **Card heading semantics**
   - `IndustrialProductCard` 条目标题从 `h2` 改为 `h3`，排序与渲染语义测试同步覆盖。

## TDD RED → GREEN 证据

- SSR：`tests/industrial-public-ui.test.ts` 初始 `6/7`，失败原因为 public renderToString HTML 无 `industrial-site`；实现后 `7/7`。
- SEO：`tests/industrial-seo-layout.test.ts` 初始 `13/14`，失败原因为代表页面 canonical 数为 0；实现后 `14/14`。
- RFQ/heading/part links：三个聚焦文件初始 `7/10`，分别因 product href 丢 ID、第二个 part href 丢 ID、卡片仍为 h2 失败；实现后 `10/10`。
- Contact：`tests/shortlist-resolution.test.ts` 初始 `2/3`，payload 含注入 shortlist ID 且缺合法 query part；实现后 `3/3`，精确 payload 断言通过。
- News：`tests/news-presentation.test.ts` 初始 `3/4`，失败原因为分类控件无 query href；实现后 `4/4`。

## 最终验证

- `npm test`：PASS，`125/125`。
- `npm run lint`：PASS，`0 errors`；保留 9 个既有 `pages/admin` warnings，本次未扩大范围处理。
- `npm run build`：PASS；TypeScript、生产编译与 `203/203` 静态页生成成功。
- `npm run db:verify-catalog`：PASS，`60 products / 60 parts`。
- 构建产物抽查：public theme/admin exclusion、四个代表 metadata 页面、News 全量初始链接均符合预期；本次没有布局几何变更，因此未另做 PC/移动视觉回归。
- 双轴自查：修正一次超范围尝试后 Spec 无 finding；Standards 仅提出可选的 URL builder/test fixture 抽取与 canonical 派生建议，按 Ponytail/YAGNI 未增加抽象。

## 保护与提交

- `.codex-local-dev-4318.log` 与 `admin.db` 保持未跟踪，未暂存、未删除、未写入。
- 本报告与修复使用提交信息 `fix: resolve final public integration gaps` 一并提交。
