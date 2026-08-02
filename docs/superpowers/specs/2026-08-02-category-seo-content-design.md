# 六大产品分类页 SEO 内容重构设计

日期：2026-08-02  
状态：用户已根据最终视觉审计确认开始执行

## 目标

在不删除或重命名现有产品、配件、分类、图片及路由的前提下，为六个产品分类页补齐原创、事实受控、可被服务端输出的 SEO 内容，并修正现有分类文案中的品类错误和参考站措辞残留。

## 已确认约束

- 保留现有工业风视觉、页眉、筛选、比较、询盘和产品卡片。
- 产品规格、型号、驱动形式等固定专业数据不做文学化改写。
- 分类正文只能根据本地已发布目录描述，不新增无法验证的销量、领先性、节油率、续航、保修和交付承诺。
- 参考 `sinotruk.international/products/` 的信息架构和产品覆盖范围，不复制其句式。
- SEO 内容必须随静态 HTML 输出，不能只在浏览器运行后生成。
- 不引入新的 CMS、第三方付费服务或复杂基础设施。

## 方案比较

### 方案 A：仅替换现有 description

改动最少，但页面正文仍然太薄，无法同时覆盖车型范围、使用场景和采购决策，不足以解决审计问题。

### 方案 B：扩展现有分类内容模型（采用）

为每个分类增加独立 `seoTitle`、`seoDescription`、首屏介绍及三段采购型正文，由现有分类模板统一输出。它能保持架构简单，同时让内容可见、可索引、可测试。

### 方案 C：新增分类内容后台与数据库表

可让运营人员在线编辑，但会引入迁移、权限、审核和缓存更新链路。当前六个稳定分类没有足够收益支撑该复杂度，暂不采用。

## 内容模型

每个分类保留现有 `id`、`name`、图片和子分类，并增加：

- `seoTitle`：包含核心品类与已发布子类型，控制为适合搜索结果展示的长度。
- `seoDescription`：概括真实目录、常见采购用途和配置核对动作，不写无依据优势。
- `categoryDescription`：首屏可读介绍，语气简洁，避免与 meta 完全重复。
- `tagline`：用于短标签或主题提示，改为真实采购语义。
- `fullDescription`：一段分类总览，不复制参考站。
- `contentSections`：固定三段，分别说明目录范围、典型应用、选择配置时应核对的事实。

## 六大类内容边界

1. Heavy Truck：只覆盖现有 Dump Truck、Tractor Truck、Cargo Truck；不再使用“行业先锋”等领先性表述。
2. Light Truck：覆盖 Cargo Truck、Tipper Truck，以及当前目录中真实存在的厢式、冷藏、翼展和轻型自卸用途；不声称行业领先。
3. Special Vehicle：覆盖 Water Tanker、Oil Tanker、Mixer Truck、Other Truck；强调不同上装用途，避免把所有车型概括成普通货运。
4. Light Vehicle：覆盖 Pickup、SUV；删除混凝土运输内容，采购信息围绕座位、货箱、驱动形式、发动机和变速箱。
5. Semi Trailer：覆盖 Dump、Fuel Tanker、Fence、Sidewall、Flatbed、Low Bed；不再只描述液体和气体运输。
6. New Energy Vehicle：仅覆盖本地发布的纯电轻卡、自卸车、牵引车和码头牵引车；不扩写未发布的氢能或天然气产品，不承诺续航或节能比例。

## 页面布局

- `SeoHead` 使用独立的 `seoTitle` 和 `seoDescription`。
- `PageHero` 使用分类名、首屏介绍和现有 Banner。
- “Browse by vehicle type” 保留；卡片网格按真实子分类数量自适应，不再出现空灰格。
- 在车型入口与产品列表之间增加一个与现有工业设计一致的“Category procurement guide”正文区：左侧总览，右侧三段短内容；正文包含真实子分类内部链接。
- 产品筛选、排序、比较和 RFQ CTA 保持原样。

## 测试与验收

- 六页各自只有一个 H1，且 title/description/canonical 唯一。
- 六页服务端 HTML 中可见新的分类正文与子分类链接。
- 禁止出现已知错误短语：`concrete transportation`、`high-capacity trailers`、只限定 `liquids and gases`、`leading brand`、`pioneer`。
- 桌面端和 375px 移动端无横向溢出、破图或缺失 alt。
- 现有 60 款产品、60 款配件和所有产品路由数量保持不变。
- 全量测试、lint、生产构建和目录完整性校验通过。

## 非目标

- 不修改产品规格事实、产品详情内容、后台登录或询盘流程。
- 不创建新的产品分类和产品记录。
- 不承诺上线后排名、收录或富结果。
