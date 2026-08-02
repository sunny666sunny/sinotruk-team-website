# 新闻原创改写、SEO整合与全站内容质量审计设计

日期：2026-08-02  
状态：用户已确认采用14篇支柱文章、删除重复旧正文并保留301映射

## 目标

把现有36篇无来源、短小、重复且包含大量无依据营销表述的新闻，整合为14篇具有独立搜索意图的原创采购文章；删除22篇重复正文与数据库记录，旧URL通过永久301传递到对应支柱页。同步建立全站内容质量审计和未来自动发布门禁。

目标不是规避所谓AI检测器，而是符合Google对people-first、原创增量、事实可靠、非规模化低价值内容和重复URL合并的要求。

## 实施原则

- 复用现有 `data/news.ts`、Prisma `News`、`SeoHead`、文章页和内容自动化门禁。
- 不新增CMS、外部服务、AI检测器或第三方依赖。
- 不复制对标站句式，不做同义词替换。
- 不发布无法核验的价格、销量、排名、融资、授权经销商、保修、油耗收益、现货或即时交付承诺。
- 固定车型名称、驱动形式和已审核规格可以保留；不确定信息写成采购时需要核对的项目。
- 不设置机械关键词密度；每篇只服务一个主要搜索意图。
- 旧新闻记录从数据源与数据库删除；只保留最小的 `newsRedirects` 路由映射。

## 14篇支柱文章

| 支柱主题 | 保留主slug | 主要搜索意图 |
|---|---|---|
| 轮数、轴数与驱动形式 | `6-wheeler-howo-truck-specifications-and-dimensions-what-is-a-6-wheeler-truck` | 理解6/10/12 wheeler与4×2、6×4、8×4的区别 |
| 中国采购与出口成本 | `china-howo-truck-manufacturer-factory-price-dump-trucks-for-sale-used-trucks-and-spare-parts` | 获取配置化报价前需要核对的成本与供应商事实 |
| 菲律宾采购核对 | `howo-for-sale-truck-philippines-howo-truck-for-sale-philippines` | 菲律宾新车/二手车采购与文件核对 |
| 尼日利亚采购核对 | `brand-new-howo-trucks-for-sale-in-nigeria-2021-jiji-olx-listings-used-new-options-near-me` | 尼日利亚采购渠道、车辆身份和文件核对 |
| 二手HOWO检查 | `2017-howo-truck-and-dump-truck-review` | 评估特定年份或二手HOWO时的检查清单 |
| 轻卡与配送车选择 | `howo-delivery-truck-for-efficient-truck-delivery` | Cargo、Box Van、Refrigerated、Wing Van用途选择 |
| 排放标准适配 | `euro-4-howo-truck-and-howo-euro-4-dump-truck-explained-what-is-a-euro-6-truck` | 按目的国、燃油和后处理条件核对排放版本 |
| 自卸车操作安全 | `how-to-drive-a-howo-dump-truck-and-dump-it-engine-number-location-specs-and-engine-no-guide` | 操作前检查、举升边界、铭牌与发动机号识别 |
| 自卸车规格比较 | `howo-dump-truck-specs-dimensions-review-horsepower-howo-380-371-a7-nx-and-400-dump-truck-specifications` | 按工况比较驱动、动力、尺寸和车厢 |
| 配件识别与询价 | `looking-for-howo-dump-truck-spare-parts-and-semi-truck-spare-parts-near-me-check-available-howo-dump-truck-sizes` | 用零件号、VIN和总成信息减少错配 |
| 搅拌车配置 | `howo-cement-truck-howo-concrete-truck-howo-cement-mixer-howo-cement-mixer-truck` | 按项目、底盘和搅拌筒需求准备询价 |
| 轮胎选择与维护 | `howo-dump-truck-tires-size-guide-rotation-and-changing-tips-lifespan-local-options-and-big-tire-costs` | 核对轮胎规格、载荷、成套更换与检查 |
| 悬架与I-Beam术语 | `howo-dump-truck-double-i-beam-what-double-i-beam-truck-means-explained` | 区分营销术语、实际前桥/悬架结构及检查项 |
| 电气图纸识别 | `howo-dump-truck-electrical-wiring-diagram-specs-and-price-details` | 按VIN、车型、驾驶室、发动机和ECU匹配图纸 |

其余22个slug删除正文并永久重定向到最接近的支柱主题。301映射不作为文章内容，不进入新闻列表或sitemap。

## 单篇文章内容契约

每篇保留：

- 独立 `title`、`seoTitle`、`seoDescription`、`excerpt`、`category`。
- 一个 `primaryKeyword` 和2–4个 `supportingKeywords`，作为内容审核数据，不追求meta keywords密度。
- 3–6个与主题匹配的H2，不复用统一五段模板。
- 至少一项本站独有增量：已发布目录对照、采购核对表、适用边界、参数解释或询价字段。
- 1–4个真实产品/配件/服务内链。
- 可见的编辑主体和“内容已于2026-08-02实质更新”信息。
- 有外部一手来源的主题保留引用；基于本站发布目录整理的文章明确标为原创采购指南。

## 页面与SEO

- 文章内容使用轻量文本语法：`##` 渲染H2，`-` 渲染列表，普通段落渲染P；不引入Markdown依赖。
- `SeoHead` 接收关键词、真实 `dateModified` 和文章信息。
- Article JSON-LD增加 `author` 组织、`dateModified`，继续保留publisher和可用citation。
- 相关新闻按独立主题和关键词相关性选择，避免每篇都链向相同三篇。
- 301目标页自引用canonical；旧slug不进入sitemap。

## 数据库同步

- 同步前使用现有一致性备份方法保存 `admin.db`。
- 在一个事务内upsert 14篇支柱文章，删除22篇旧记录；关联任务使用现有 `onDelete: SetNull`，修订记录按现有级联规则处理。
- 同步后验证数据库只保留14篇公开新闻，产品和配件数量仍为60/60。

## 未来内容门禁

- 继续要求来源、事实包、300–1800词、独立SEO字段和内链。
- 拒绝无依据价格、保修、授权、排名、现货、交付和绝对化收益表述。
- 拒绝与来源长句重合、关键词堆砌、模板短语过量和无独立搜索意图的稿件。
- 自动生成只产生待审核内容；保持现有来源与质量门禁，不新增自动直发捷径。

## 全站内容质量审计

审计范围：公开首页、六大分类、60款产品、60款配件、About、Service和14篇新闻。检查：

- 参考站长句重合和已知旧文案残留；
- 过期年份、价格、保修、融资、授权和领先性承诺；
- 模板开头、机械总结、重复排比和空泛形容词；
- title、H1、description和正文搜索意图是否一致；
- 重复title/description、关键词内耗、canonical、sitemap和内链；
- 可见来源/原创说明、作者/审核主体、发布日期与修改日期；
- 图片与主题对应关系、alt和文章结构化数据。

审计结果写入中文报告；本轮修复高风险和可直接确认的中风险项，不虚构资料填补无法核验的事实。

## 验收

- 数据源与数据库均为14篇公开支柱文章；22篇旧记录已删除。
- 36个历史slug全部返回14个目标页之一，旧slug使用永久重定向。
- 14篇title、description、主要搜索意图和关键词组唯一。
- 不出现已知无依据营销词和过期价格/年份承诺。
- 文章服务端HTML包含H1、H2、列表、内链、编辑主体和Article JSON-LD。
- sitemap只包含14篇主文章。
- 全量测试、lint、生产构建、目录完整性和本地浏览器抽检通过。
