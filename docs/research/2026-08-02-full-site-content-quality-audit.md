# 全站内容质量与“去 AI 味”审计

日期：2026-08-02
范围：首页、产品与配件数据、主要公开页面、新闻数据、SEO 元数据与内容自动化流程。

## 结论

Google 没有公布“检测到 AI 文案就降权”的规则。真正需要控制的是：批量生产但没有新增价值的内容、无法核验的事实、为了排名堆砌关键词、抓取后只替换同义词、重复 URL，以及作者和来源不透明。本轮因此按内容质量与事实风险审计，而不是使用不可靠的所谓 AI 检测分数。

新闻已从 36 篇整合为 14 篇独立主题采购指南。22 篇重复旧正文和数据库记录删除，只保留到最接近主题的永久重定向。14 篇文章均重写，不沿用参考站句式；每篇具有独立标题、描述、关键词组、H2、核对清单、站内链接和编辑审核信息。

## 已修复的高风险问题

- 删除新闻中的未核验价格、融资、授权经销商、保修、库存、即时交付、领先和最佳等承诺。
- 删除 SEO 标题和描述中的过时年份型承诺。
- 合并相互竞争的菲律宾价格、轮数、规格和中国采购文章，避免关键词内耗。
- 旧地址使用永久重定向；旧正文不进入新闻列表与 sitemap。
- Article JSON-LD 增加编辑主体和修改日期；正文输出真实 H2、列表和内链。
- 内容自动化继续要求来源、事实包、300–1800 词、独立 SEO 字段与人工审核，并新增高风险营销表述和模板标题拦截。

## 需要业务资料才能进一步确认的项目

以下表述没有在本轮擅自改写固定专业数据，因为需要产品证书、零件技术资料或企业证明：

- `data/products.ts` 中个别产品的载重、容积与油耗效率描述，需要逐车型规格书支持。
- `data/parts.ts` 中涡轮增压器、喷油器对效率的效果描述，需要零件技术资料或改为中性功能说明。
- `components/home/TechAdvantages.tsx` 中“满足全球环境标准”的范围过宽，需要明确对应排放版本和市场。

这些项目列为“资料核验”，不能通过生成式改写把不确定事实包装成确定事实。

## 文章人工化处理原则

- 按真实采购任务组织文章，不套统一五段结构。
- 使用“需要核对什么、为什么核对、如何记录”的具体动作，少用空泛形容词。
- 不设置关键词密度；主关键词只定义主题，相关词自然出现在必要位置。
- 明确哪些内容来自本目录整理，哪些内容需要车辆、文件或第三方证据。
- 不承诺排名。能改善的是抓取、主题清晰度、独特信息价值和用户信任，排名仍取决于索引、竞争、外链、站点历史与真实用户表现。

## 可重复验证

- `npx tsx scripts/audit-editorial-quality.ts`：扫描公开源码中的高风险商业表述，并验证 14 篇新闻元数据。
- `npx tsx --test tests/full-site-content-quality.test.ts`：验证新闻不存在高风险承诺、过时 SEO 年份或重复元数据。
- `npm test`、`npm run lint`、`npm run build`：上线前完整回归。

## Google 官方依据

- Generative AI content guidance: https://developers.google.com/search/docs/fundamentals/using-gen-ai-content
- Spam policies for Google web search: https://developers.google.com/search/docs/essentials/spam-policies#scaled-content
- Creating helpful, reliable, people-first content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Consolidating duplicate URLs: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Article structured data: https://developers.google.com/search/docs/appearance/structured-data/article
