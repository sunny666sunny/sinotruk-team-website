# SINOTRUK 产品详情页内容与 SEO 对标研究

> 研究日期：2026-08-02
> 研究范围：SINOTRUK TEAM 现有 60 个产品详情页；主对标页 `Howo 6X4 Cargo Truck`；六大产品类别抽样；Google Search Central 与 Schema.org 官方规范。
> 结论用途：指导后续数据建模、原创内容生产、图片整理和结构化数据实现。本报告不等于对任何产品参数、服务承诺或素材权属的事实背书。

## 一、结论摘要

1. **可以借鉴模块顺序，不能复制页面正文。** 主对标页采用“产品简介/参数 → Performance → Gallery → Application Areas → Solutions → Customer Service → FAQ → Inquiry”的完整交易型详情页结构，适合作为 SINOTRUK TEAM 的信息架构基线。主证据见 [Howo 6X4 Cargo Truck](https://sinotruk.international/products/howo-6x4-cargo-truck/)。
2. **对标站六大类别的下半页高度模板化。** 抽样页面均有上述六个扩展模块，但 Application Areas、Solutions、Customer Service 和 FAQ 基本复用同一套文案，甚至在轻型车、新能源车页面仍使用“heavy-duty trucks”通用介绍。SINOTRUK TEAM 不应照搬这一做法，应以车型事实为驱动生成真正不同的内容。
3. **对标站自身存在明显错配，不能作为产品事实数据库。** 例如主对标的货车页面参数表出现 `Vehicle type: Tractor`，Performance 段也写成牵引车；水罐车的 Performance 卡片出现 2.0T 乘用车动力、真皮内饰和大屏等内容。对标站只能证明“模块形式和表达主题”，不能单独证明具体车型能力、参数或配置。
4. **当前仓库已有完整图片和 Performance 字段，但内容重复严重。** 2026-08-02 对 `data/products.ts` 静态目录的本地统计中，60 个产品均有 `performanceItems` 与 `galleryImages`；180 条 Performance 卡片仅有 7 个不同标题、7 个不同描述和 3 个不同图片 URL，318 个 Gallery 引用对应 283 个不同 URL，60 条产品简介仅 48 条不同文本。这是本轮最需要修复的 SEO 与可信度问题；数据库发布记录仍应在实施时另行核对。
5. **FAQ 的价值是帮助采购者，不再是 Google FAQ 富摘要。** Google 已于 2026-05-07 停止展示 FAQ rich result，并于 2026 年 6 月移除相关文档；因此可以保留每产品独立、页面可见的 FAQ，也可以输出 Schema.org `FAQPage` 语义，但不得承诺 Google FAQ 富摘要、排名提升或特定展示效果。见 [Google 2026 FAQ rich result 移除记录](https://developers.google.com/search/updates#removing-faq-rich-result) 和 [Schema.org FAQPage](https://schema.org/FAQPage)。
6. **询价型 B2B 页面不要伪造价格、库存、评分或评论。** Google 的 Product snippet 要求 `name`，并要求 `review`、`aggregateRating`、`offers` 至少一种才能获得该富结果资格。当前 RFQ 模式若没有真实公开价格或真实评论，可继续输出语义正确的 `Product`，但不能为富结果资格虚构 `Offer`、评分或评价。见 [Google Product snippet 要求](https://developers.google.com/search/docs/appearance/structured-data/product-snippet)。

## 二、对标站结构审计

### 2.1 主对标页的实际模块顺序

[Howo 6X4 Cargo Truck](https://sinotruk.international/products/howo-6x4-cargo-truck/) 的正文顺序为：

1. 面包屑、H1、短介绍；
2. 5 个主要参数与询价按钮；
3. Product Description / Features 参数表；
4. Performance 总述、功能图片卡片和安全功能文字；
5. Gallery 总述与 3 张车型图片；
6. SINOTRUK Application Areas，展示物流、建筑、矿业、农业四个入口；
7. SINOTRUK Solutions，展示燃油效率、重载、冷链、数字车队四类方案及图片；
8. SINOTRUK Customer Service，展示技术支持、配件、维护、培训；
9. Frequently Asked Questions；
10. 询价表单。

这个顺序符合采购者从“是什么 → 参数是否适配 → 怎么使用 → 如何交付和维护 → 还有哪些疑问 → 发起询价”的决策路径，可以保留。

### 2.2 六大类别抽样矩阵

| 类别 | 抽样页 | Performance | Gallery + 描述 | Application Areas | Solutions | Customer Service | FAQ | 主要变体 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Heavy Truck | [Howo 6X4 Cargo Truck](https://sinotruk.international/products/howo-6x4-cargo-truck/) | 有 | 有，3 图 | 有 | 有 | 有 | 有 | Performance 开头与货车事实错配，后四模块为通用模板 |
| Light Truck | [Howo Cargo Truck](https://sinotruk.international/products/howo-cargo-truck/) | 有 | 有，3 图 | 有 | 有 | 有 | 有 | Performance 强调城市灵活性，后四模块仍为通用模板 |
| Special Vehicle | [Howo Water Tanker](https://sinotruk.international/products/sinotruck-howo-water-tanker-2/) | 有 | 有，6 图 | 有 | 有 | 有 | 有 | 产品规格与用途较细，但 Performance 卡片出现疑似乘用车错配 |
| Light Vehicle | [Pickup Off-road Version](https://sinotruk.international/products/sinotruck-pickup-off-road-version/) | 有 | 有，3 图 | 有 | 有 | 有 | 有 | Performance 强调货斗与越野；通用解决方案仍包含冷链和重载 |
| Semi Trailer | [Dump Semi Trailer](https://sinotruk.international/products/sinotruck-dump-semi-trailer-truck/) | 有 | 有，6 图 | 有 | 有 | 有 | 有 | Performance 使用结构、材料、泵/侧面实拍主题；后四模块通用 |
| New Energy Vehicle | [Pure Electric Light Truck](https://sinotruk.international/products/howo-pure-electric-light-truck/) | 有 | 有，3 图 | 有 | 有 | 有 | 有 | Performance 与 Gallery 强调新能源平台；下半页仍沿用燃油/重载模板 |

**可复用的是信息架构，不是每个模块的固定内容。** 六个抽样页均包含完整模块，说明这种长详情页形式稳定；但后半页的高度重复和错配也说明，复制通用模块会制造薄内容、错误承诺和页面相似度问题。

### 2.3 图片使用模式

- Hero / 主图：整车外观或场景图，承担首屏识别；
- Performance：驾驶室、方向盘、结构细节、泵体、底盘或实际功能部件等近景；
- Gallery：同一车型的外观、侧面、前后视角或真实工作图；
- Application Areas：行业场景图；
- Solutions：燃油效率、重载、冷链、数字车队等方案型图片；
- FAQ：通用支持视觉。

主对标页的 Performance 图文卡片提供了良好形式，但其多张卡片标题和描述重复，不能原样复用。SINOTRUK TEAM 应让每张图回答一个具体采购问题，例如“驾驶室视野”“货箱结构”“后桥与悬架”“水罐喷洒组件”，而不是只重复车型名。

## 三、哪些内容可以生成，哪些必须验证

| 内容 | 可基于现有字段原创生成 | 必须增加的事实/素材来源 | 禁止猜测或照搬 |
| --- | --- | --- | --- |
| Performance 总述 | `name`、`category`、`subcategory`、已发布 `specifications`、`features`、`detailedFeatures`、`normalizedSpecs` | 车型手册、制造商资料、已审核参数表；必要时由产品人员确认 | 油耗节省百分比、可靠性寿命、市场排名、未经验证的安全系统、最大载荷或动力 |
| Performance 卡片 | 已验证的配置项与对应现有产品图片 | 每张图真实展示的部件/功能；图片与车型的对应关系 | 仅根据文件名猜部件；把其他车型配置写到当前车型；“最佳”“领先”“永不故障”等绝对化用语 |
| Gallery 引导语 | 车型名称、类别和已确认的图片类型 | 图片实际视角、拍摄场景、是否为选装/示意图 | 将通用图描述成当前车型实拍；根据画面猜载荷、路况、国家或客户 |
| Gallery 单图描述 | 车型名 + 已人工确认的 `viewType` / `featureShown` | 图片资产清单、原始文件或人工看图确认 | 用“前视/后视/驾驶室”等标签掩盖无法确认的图片内容 |
| Application Areas | 产品类型、`applicationTags`、车身/罐体/货箱/驱动形式等已验证字段 | 区域法规、上装用途、道路/矿区适用证明（若要做强断言） | 所有车型统一写物流/建筑/矿业/农业；宣称某市场覆盖或客户采用 |
| Solutions | 已验证规格可支持的采购决策主题，例如动力匹配、轴荷配置、车身方案、运输方式 | 方案图片、交付流程、可提供的选装和服务能力 | 对标站的 15% 节油、70 吨、-30°C 至 +30°C、20% 成本下降等未验证数字 |
| Customer Service | 项目真实存在的询价、配置确认、配件识别、维护资料、交付协调入口 | 团队服务范围、时区、响应机制、经销/服务网络、培训能力的书面确认 | 24/7、全球库存、快速交付、固定响应时间、保修年限、授权网点数量；页面中保留邮箱 |
| FAQ | 本产品参数、可选配置、RFQ 所需信息、运输/合规确认流程 | 保修、交期、价格、备件库存、认证、充电时间/续航等的最新书面来源 | 统一复制通用 FAQ；伪造融资政策、交付时效、维护周期、保修条款 |
| 图片权属 | 当前仓库内已登记为自有或已授权的资产 | 授权记录、来源 URL、用途范围、期限；必要时保存授权凭证 | 仅因图片出现在对标站就默认可复制；用改名、裁剪规避权属审核 |

对标站上的下列营销承诺应列入**禁止自动导入清单**：节油比例、载重上限、温控范围、运营成本降幅、24/7 支持、全球配件可用、固定配送时效、保修年限/里程、融资和政府补贴。这些内容在 [主对标页](https://sinotruk.international/products/howo-6x4-cargo-truck/) 中出现，但没有构成本项目的事实证据。

## 四、推荐的信息架构与内容标准

### 4.1 页面顺序

建议所有产品详情统一为：

1. Hero：H1、独立短介绍、5 个关键参数、RFQ；
2. Published Configuration：完整规格和配置说明；
3. Performance：独立总述 + 3 个基于该车型事实的性能/配置卡片；
4. Gallery：独立引导语 + 3–6 张图 + 每图可见说明；
5. SINOTRUK Application Areas：2–4 个真正相关场景；
6. SINOTRUK Solutions：2–4 个与该车型采购相关的解决方案；
7. SINOTRUK Customer Service：站点级真实服务入口，不显示邮箱；
8. Frequently Asked Questions：每产品独立的一组问答；
9. Related Products / Parts / Articles；
10. RFQ CTA。

页面 H2 可保持用户指定的英文标题。正文应以站点正式发布语言为准，并保持同一页面语言一致，不要在英文页中插入只为排名的中文关键词块。

### 4.2 六类产品的 Application Areas 与 Solutions 内容边界

| 产品类别 | Application Areas 建议 | Solutions 建议 | 只有验证后才能写的内容 |
| --- | --- | --- | --- |
| Heavy Truck | 长途干线、区域配送、工程物料运输；按 Cargo / Tractor / Dump 继续细分 | 动力链与路况匹配、轴荷/货箱配置、驾驶室与长途运营配置 | 具体载重、油耗、道路适用等级、矿区能力 |
| Light Truck | 城配、商贸配送、短途运输；冷链只用于冷藏车型 | 货箱尺寸匹配、城市工况配置、上装选择 | 转弯半径、每公里成本、冷机温区 |
| Special Vehicle | 水罐车对应洒水/非饮用水运输，油罐车对应液体运输，搅拌车对应混凝土作业等 | 底盘与上装匹配、罐体/泵/喷洒或搅拌系统、作业场景配置 | 危化资质、消防用途、罐体材质厚度、泵程、容积 |
| Light Vehicle | 日常通勤、轻载运输、拖挂或非铺装道路，仅按具体版本选择 | 2WD/4WD、货斗/乘用空间、驾驶辅助与舒适配置 | 涉水、拖拽、越野等级、安全评级 |
| Semi Trailer | 砂石/矿料、液体、集装箱、工程设备等，严格按 Trailer 子类型选择 | 轴数、悬架、牵引销、主梁、装卸系统与牵引车匹配 | 最大载荷、材料等级、焊接工艺、品牌部件 |
| New Energy Vehicle | 城配、港口/园区、固定路线短倒，按真实车型选择 | 电池/电机方案、路线与补能评估、载荷和气候适配 | 续航、充电时间、电池寿命、能耗、补贴资格 |

### 4.3 Customer Service：去邮箱后的安全版本

建议使用一个站点级服务模块，避免为 60 个产品重复维护承诺；每张卡片链接到 Contact / RFQ 或已存在的服务页面，不显示电子邮箱，也不生成 `mailto:`：

- **Configuration Consultation**：根据用途、载荷、道路、排放和目的国要求整理配置；
- **Parts Identification**：根据车型、VIN/零件号和照片协助确认配件；
- **Maintenance Guidance**：提供已发布手册、保养检查表和维护信息入口；
- **Delivery Coordination**：在团队确实可提供的范围内说明验车、单据和运输协调。

只有在合同、服务政策或团队流程已明确时，才可增加响应时间、培训、现场支持、服务中心、库存或交期承诺。对标站 Customer Service 的四类主题可作为栏目灵感，但其中的邮箱、24/7、全球供应和时效不能复制，证据见 [主对标页](https://sinotruk.international/products/howo-6x4-cargo-truck/)。

## 五、每产品独立 FAQ 方案

### 5.1 数量与独立性

“一个产品一个 FAQ”应理解为：**每个产品拥有独立 FAQ 集合**，而不是每页只放一个问题。建议每页 4–6 个问题，默认 5 个：

1. 两个直接读取本产品已审核参数的问题；
2. 一个该子类别的应用/配置选择问题；
3. 一个 RFQ 或目的国合规确认问题；
4. 一个维护/配件识别问题。

至少 3 个问题必须包含该产品独有的配置、型号、驱动形式、货箱/罐体/电池/车桥等信息。站点级服务问题最多保留 1–2 个，且答案仍要引用当前产品所需信息。不要把产品名机械替换进同一套五问五答。

### 5.2 分类问题池

- Heavy Truck：动力与变速箱组合、6×4/8×4 选择、货箱/牵引/自卸用途、路况与排放版本、RFQ 需要哪些参数；
- Light Truck：核载与货箱尺寸、城配/短途用途、厢式/仓栅/冷藏上装、驾驶室和轮胎选择、目的国法规；
- Special Vehicle：罐体/搅拌筒容积、泵与作业组件、底盘与上装匹配、材料/介质限制、维护检查；
- Light Vehicle：驱动方式、变速箱、货斗/乘员空间、已发布安全配置、进口与注册文件；
- Semi Trailer：轴数、悬架、牵引销、主梁/箱体、牵引车兼容、装卸系统；
- New Energy Vehicle：电池容量和电机、路线与载荷、补能接口、低温/高温影响、充电与续航。若源数据没有续航、充电时间或接口，只能回答“需按具体配置确认”，不能生成数字。

### 5.3 FAQ 的当前 SEO 边界

- Google 自 2026-05-07 起已停止展示 FAQ rich result，2026 年 6 月移除了该功能文档；旧的“政府/医疗权威站点才常规展示”政策已不再是当前状态。见 [Google 更新记录](https://developers.google.com/search/updates#removing-faq-rich-result)。
- [Schema.org FAQPage](https://schema.org/FAQPage) 仍是有效类型，可用于表达页面包含一个或多个常见问答；保留它的理由应是语义完整和其他数据消费者，而不是 Google 富摘要。
- 如果输出 JSON-LD，所有问题和答案必须在页面中真实可见、内容一致；不应为结构化数据制作隐藏 FAQ。结构化数据还应遵守 [Google 通用结构化数据政策](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)。
- FAQPage 可以与 Product 节点同页存在，通过稳定 `@id` 与 `mainEntityOfPage` 关联；但这是数据建模建议，不代表 Google 会提供特殊展示。

## 六、Gallery 与图片 SEO

### 6.1 每张图需要四层信息

建议将当前 `string[]` 画廊升级为结构化条目：

1. `src`：稳定、可抓取的图片 URL；
2. `alt`：描述图片实际内容和车型，例如“HOWO TX 6×4 dump truck front three-quarter view”；
3. `caption` / `<figcaption>`：用户可见，说明视角或部件与采购判断的关系；
4. `description`：可选，用于更长的图片语义或 `ImageObject.description`。

Google 会综合页面正文、caption、图片标题和 alt 理解图片，且明确反对 alt 关键词堆砌；图片应放在相关文字附近。见 [Google 图片 SEO 最佳实践](https://developers.google.com/search/docs/appearance/google-images)。

### 6.2 描述规则

- Gallery 模块有一段 25–50 词的独立引导语，说明本组图片展示什么；
- 每张图有 12–30 词的可见 caption，优先写“车型 + 视角/部件 + 可确认的信息”；
- `alt` 只描述图像，不重复整段 caption，不罗列关键词；
- 装饰性纹理或纯背景图使用空 `alt`，产品主图、性能图和画廊图不得当作装饰图；
- 不知道图片视角或部件时，先标记待审核，不允许自动猜测。

上述字数是本项目的编辑规范，不是 Google 的排名要求。

### 6.3 重复素材策略

Google 建议同一真实图片在多页使用时始终引用同一个 URL，便于抓取、缓存和复用；不应为了制造“独立图片”而复制改名。见 [Google 图片 SEO 最佳实践](https://developers.google.com/search/docs/appearance/google-images)。

但同一通用图不能被描述成 60 个不同车型：

- 若图片确实为通用驾驶室/服务场景，标记 `sharedAsset: true`，使用同一 URL 和诚实说明；
- 若图片要作为产品主图或 Performance 证据，必须确认属于该型号；
- 同一图片不得通过改文件名、alt、caption 伪装成另一车型；
- 选择页面首选图时，应使用相关、具代表性、高分辨率且宽高比合理的图片，不要用 Logo、文字海报或通用 FAQ 图。Google 也允许通过结构化数据主图和 `og:image` 表达首选图，见同一 [图片指南](https://developers.google.com/search/docs/appearance/google-images)。

### 6.4 ImageObject 使用边界

`Product.image` 直接使用图片 URL 已足够；只有需要表达 caption、description、content URL 或尺寸等信息时才嵌套 `ImageObject`。Schema.org 明确定义了 `caption`、`contentUrl` 和 `description`，见 [Schema.org ImageObject](https://schema.org/ImageObject)。不需要为每张装饰图创建复杂节点。

## 七、推荐的数据模型

### 7.1 最小可行模型

保持现有 Next.js / Prisma / 数据仓库结构，不引入新 CMS。建议在现有 Product DTO 上增加以下字段；站点级 Customer Service 单独维护：

```ts
type EvidenceStatus = 'reviewed' | 'draft' | 'blocked'

interface EvidenceRef {
  sourceUrl?: string
  sourceLabel: string
  verifiedAt?: string
  status: EvidenceStatus
  verifiedBy?: string
}

interface SeoImage {
  src: string
  alt: string
  caption: string
  description?: string
  kind: 'hero' | 'exterior' | 'interior' | 'detail' | 'application' | 'solution'
  sharedAsset?: boolean
  evidenceKeys: string[]
}

interface ContentCard {
  title: string
  description: string
  bullets?: string[]
  image?: SeoImage
  evidenceKeys: string[]
}

interface ProductFaq {
  question: string
  answer: string
  evidenceKeys: string[]
}

interface ProductDetailContent {
  performanceSummary: string
  performanceItems: ContentCard[]
  galleryIntro: string
  gallery: SeoImage[]
  applicationAreas: ContentCard[]
  solutions: ContentCard[]
  faq: ProductFaq[]
  evidence: Record<string, EvidenceRef>
  reviewedAt?: string
  reviewStatus: EvidenceStatus
}
```

### 7.2 字段矩阵

| 模块 | 必填字段 | 每产品独立 | 可类别共享 | 可全站共享 | 发布门槛 |
| --- | --- | --- | --- | --- | --- |
| Performance | summary、3 cards、evidenceKeys | 是 | 仅写作框架 | 否 | 所有强断言有已审核事实 |
| Gallery | intro、3–6 images、alt、caption | 是 | 否 | 真实通用资产可共享 | 图与车型/部件对应关系已确认 |
| Application Areas | 2–4 cards | 是 | 可共享行业词库 | 否 | 用途与车型类型匹配 |
| Solutions | 2–4 cards | 是 | 可共享方案框架与场景图 | 否 | 不含未验证指标/能力 |
| Customer Service | 4 cards、CTA | 可选产品引导语 | 可选 | 是 | 删除邮箱；所有服务承诺真实 |
| FAQ | 4–6 Q&A | 是 | 可共享问题池 | 最多 1–2 个通用问题 | 答案可见、证据充分、无承诺幻觉 |
| Product JSON-LD | name、description、image、brand、category 等 | 是 | 否 | brand 可共享 | 与页面可见内容一致 |
| FAQPage JSON-LD | Question/Answer | 是 | 否 | 否 | 可选；页面中真实可见 |

## 八、60 个产品的原创化与自动化规则

### 8.1 生成流程

1. **抽取事实**：只读产品自身的已审核参数、features、applicationTags、marketTags 和经人工确认的图片标签；
2. **选择内容角度**：根据子类别选择 2–4 个采购决策主题，而不是对所有产品输出同一四个主题；
3. **生成草稿**：输出 Performance、Gallery 引导语/说明、Application、Solutions 和 FAQ；
4. **自动事实校验**：草稿中的数字、单位、型号、品牌、市场、服务承诺必须能映射到 `evidenceKeys`；
5. **相似度校验**：排除全站 Customer Service 等合法共享模块后，检查产品正文和 FAQ 的近重复；
6. **人工复核**：参数密集、危化、消防、矿区、新能源续航/充电等高风险车型必须人工审核；
7. **发布**：只有 `reviewStatus: reviewed` 的内容进入 SSG 页面、sitemap 和结构化数据。

### 8.2 避免模板化和重复内容

- 每个产品的 Performance 至少引用 3 个该产品独有或组合独有的事实；
- 不允许仅替换产品名、马力、驱动形式后复用整段句子；
- Application Areas 只展示与当前子类型相关的 2–4 项，不为凑数量强塞四大行业；
- Solutions 的标题可以来自受控词库，但摘要、要点和图片必须与当前车型采购问题相关；
- 每套 FAQ 至少 3 个问题和答案对该产品独有；
- 在质量门禁中对产品主内容进行 n-gram / MinHash 或简单 Jaccard 检查。建议将 0.65 以上的相似正文送人工复核；该阈值是内部质量门槛，不是 Google 规则；
- 全站相同的 Customer Service、法律声明和 CTA 从重复度检测中排除，因为它们是合理的共享界面；
- 写作目标是解决采购问题，而不是达到某个字数。Google 明确表示没有偏好的固定字数，并强调原创、完整、可信和对用户有用的内容，见 [People-first content 指南](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)。

### 8.3 避免关键词堆砌

- H1 只用正式产品名；
- 每个 H2 对应一个真实模块，不重复堆叠 “SINOTRUK / HOWO / China truck / for sale”；
- 正文自然使用车型名、子类别、驱动形式和用途，参数表无需在段落中全部重复；
- alt 只描述图像，不把同一关键词组合复制到所有图片；
- FAQ 问题采用采购者真实问法，不用关键词列表式问题；
- 自动生成内容必须经过准确性、质量和相关性检查。Google 明确将“大量生成、缺乏新增价值的页面”“轻微同义改写他站内容”列入 scaled content abuse / scraping 风险，见 [Google spam policies](https://developers.google.com/search/docs/essentials/spam-policies#scaled-content) 和 [生成式 AI 内容指南](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content)。

## 九、结构化数据落地建议

### 9.1 Product

当前项目已输出 `Product`，建议逐步增加以下**已验证**字段：

- `name`、`description`、`url`、`brand`；
- `image`：首选图或图片数组；需要 caption/description 时使用 `ImageObject`；
- `category`；
- `model`、`sku` 或 `mpn`：只有数据确实代表这些标识时才输出；
- `additionalProperty`：把已审核的驱动形式、发动机、变速箱、轴荷、尺寸、容量等转成 `PropertyValue`。

[Schema.org Product](https://schema.org/Product) 支持 `brand`、`category`、`model`、`sku`、`mpn` 和 `additionalProperty` 等字段。不要输出不存在的 GTIN、价格、库存、评分、评论或认证。

Google 的 Product snippet 需要 `review`、`aggregateRating` 或 `offers` 至少一种；当前询价型页面若没有真实数据，不应为获取富结果伪造这些字段。即使结构化数据合法，Google 也不保证展示富结果，见 [Google Product snippet 文档](https://developers.google.com/search/docs/appearance/structured-data/product-snippet)。

### 9.2 FAQPage

若实现，可在 JSON-LD `@graph` 中保留独立的 `FAQPage` / `Question` / `Answer` 节点，并与当前 WebPage 建立稳定关系。FAQ 文本必须和页面可见文本一致。由于 Google 已停止 FAQ 富摘要，它属于低优先级语义增强，不应阻塞页面正文、图片、Product 和内部链接等更重要工作。

### 9.3 ImageObject

仅对主图和具有独立说明价值的 Gallery / Performance 图片输出 `ImageObject`，建议字段为：`contentUrl`、`name`、`caption`、`description`。页面中仍须使用标准 `<img>` / Next Image 生成的可抓取图片元素，不能只把图片放在 CSS 背景中。Google 图片指南明确说明标准图片元素、相关上下文、alt 和可见说明的重要性，见 [Google 图片 SEO 最佳实践](https://developers.google.com/search/docs/appearance/google-images)。

## 十、实施优先级与验收门槛

### P0：先阻止错误和重复扩散

- 建立对标站营销承诺黑名单；
- 任何 Performance / FAQ 数字都必须有 evidence；
- 删除或改写当前 180 条 Performance 中的高度重复和车型错配内容；
- Customer Service 删除邮箱及 `mailto:`，不添加未验证的 24/7、库存、网点、保修或交期承诺。

### P1：完成 60 产品可见正文

- 每产品独立 Performance 总述和 3 张事实卡；
- 每产品 Gallery 引导语、alt、caption；
- 每产品 2–4 个相关 Application Areas；
- 每产品 2–4 个相关 Solutions；
- 每产品 4–6 个独立 FAQ；
- 共用的 Customer Service 四卡保持真实、无邮箱。

### P2：结构化和质量自动化

- Product 增加已验证 `additionalProperty` 和图片数组；
- 可选 FAQPage / ImageObject；
- 构建时验证可见文本与 JSON-LD 一致；
- 自动检查空字段、断图、重复 FAQ、重复 Performance、无 evidence 的数字/承诺、关键词堆砌和近重复正文；
- 使用 Schema.org Validator、Google Rich Results Test（仅测试当前支持的 Product 等类型）及 Search Console URL Inspection 抽样验证。

### 验收清单

- [ ] 60/60 产品有独立 Performance 总述；
- [ ] 60/60 产品的 3 个 Performance 卡片内容与图片属于当前产品；
- [ ] 所有 Gallery 图片都有非堆砌 alt 和可见 caption；
- [ ] Application 与 Solutions 不再全站复用同一四项；
- [ ] Customer Service 无邮箱、无未验证服务承诺；
- [ ] 60/60 产品各有 4–6 个 FAQ，至少 3 个为产品独有；
- [ ] FAQPage 不被描述为 Google 富摘要功能；
- [ ] Product JSON-LD 不伪造 Offer、评分、评论、GTIN 或库存；
- [ ] 所有数字、性能、安全、服务、市场和客户断言可追溯到 evidence；
- [ ] 正文近重复超过内部阈值时阻止自动发布并转人工复核。

## 十一、抽样对标 URL 清单

### 首要证据

- https://sinotruk.international/products/howo-6x4-cargo-truck/

### 六类验证样本

- Heavy Truck：https://sinotruk.international/products/howo-6x4-cargo-truck/
- Light Truck：https://sinotruk.international/products/howo-cargo-truck/
- Special Vehicle：https://sinotruk.international/products/sinotruck-howo-water-tanker-2/
- Light Vehicle：https://sinotruk.international/products/sinotruck-pickup-off-road-version/
- Semi Trailer：https://sinotruk.international/products/sinotruck-dump-semi-trailer-truck/
- New Energy Vehicle：https://sinotruk.international/products/howo-pure-electric-light-truck/
- 产品分类总览：https://sinotruk.international/products/

### SEO 与结构化数据一手规范

- Google FAQ rich result 移除记录：https://developers.google.com/search/updates#removing-faq-rich-result
- Google Product structured data：https://developers.google.com/search/docs/appearance/structured-data/product
- Google Product snippet：https://developers.google.com/search/docs/appearance/structured-data/product-snippet
- Google 图片 SEO：https://developers.google.com/search/docs/appearance/google-images
- Google People-first content：https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google 生成式 AI 内容指南：https://developers.google.com/search/docs/fundamentals/using-gen-ai-content
- Google Spam policies：https://developers.google.com/search/docs/essentials/spam-policies#scaled-content
- Schema.org Product：https://schema.org/Product
- Schema.org FAQPage：https://schema.org/FAQPage
- Schema.org ImageObject：https://schema.org/ImageObject
