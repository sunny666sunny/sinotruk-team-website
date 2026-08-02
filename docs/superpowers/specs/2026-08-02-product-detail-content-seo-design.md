# SINOTRUK 产品详情内容与 SEO 自动化设计规格

## 目标

在不删除现有 60 个产品、分类、参数、主图、Banner、Performance 和 Gallery 素材的前提下，把所有产品详情页扩展为可直接上线的询价型 B2B 长详情页。页面参考 `sinotruk.international` 的信息顺序，但所有正文由当前产品事实生成或人工编辑，不复制对标站正文，也不导入未经验证的营销承诺。

同时把配件列表与配件详情的白底产品摄影区域统一为冷白色 `#F3F5F2`，保留现有深色卡片正文和工业科技视觉。

## 已确认的页面顺序

1. Hero：面包屑、H1、独立简介、关键参数、RFQ。
2. Published Configuration：完整参数和询价说明。
3. Performance：每款产品独立总述和 3 个事实驱动的图文项。
4. Gallery：3–6 张现有图片，每张有可见标题、说明和真实 alt。
5. SINOTRUK Application Areas：按大类和子类选择 2–4 个真实相关场景。
6. SINOTRUK Solutions：按车型事实选择 2–4 个采购解决方案。
7. SINOTRUK Customer Service：配置确认、配件识别、维护资料、交付协调；不显示邮箱。
8. Frequently Asked Questions：每款产品 4–6 个独立问答，默认 5 个。
9. 相关车辆、配件和采购文章。
10. RFQ CTA。

## 方案选择

采用“单个结构化 `detailContent` JSON + 事实驱动默认生成器 + 后台人工覆盖”。它比为每个内容块建立多张关系表更轻，也比浏览器或请求时调用 AI 更稳定、更易审核。

- `Product.detailContent` 保存已审核的页面内容。
- 纯函数生成器只读取产品名称、分类、子分类、已发布参数、标签和现有图片；不调用外部 AI，不产生价格、库存、评分、质保、交期或性能百分比。
- 数据库字段为空时，服务端生成完整默认内容，确保 60 个页面不是空壳。
- 后台可修改生成结果并保存；保存后优先使用人工内容。
- 自动补全按钮从当前产品事实重新生成草稿，但不会静默覆盖已编辑内容。

## 数据模型

```ts
type ProductDetailContent = {
  performanceSummary: string
  performanceItems: Array<{ title: string; description: string; image: string }>
  gallery: Array<{ image: string; alt: string; title: string; description: string }>
  applicationAreas: Array<{ title: string; description: string; bullets: string[]; image: string; href: string }>
  solutions: Array<{ title: string; description: string; bullets: string[]; image: string }>
  faqs: Array<{ question: string; answer: string }>
}
```

Customer Service 是站点级真实能力，不为 60 个产品重复入库；组件使用四个固定入口，并根据当前产品名称生成上下文 CTA。邮箱和 `mailto:` 均不渲染。

现有 `performanceItems` 与 `galleryImages` 保留。生成器把它们转换为新结构，旧数据和后台上传流程不会丢失。

## 原创与事实边界

- Performance 至少引用产品名和一项已发布配置；不把图片文件名猜成具体配置。
- Gallery 描述使用“已发布产品视图/配置参考图”这类可验证表述，只有能确定的车型名和序号，不猜拍摄地点、载荷、路况或部件。
- Application Areas 与 Solutions 由分类、子分类、`applicationTags` 和公开参数选择，不把所有车型统一写成物流、矿山、建筑、农业。
- FAQ 至少 3 个问题包含该产品的名称、驱动形式、动力、车身/罐体/货箱/电池等独有事实；其余问题围绕询价所需信息、目的国配置确认、维护和配件识别。
- 禁止自动写入节油比例、载重上限、温控范围、成本下降、24/7、保修期、固定交期、融资、库存、价格、星级和客户评价。

## SEO 设计

- 页面只保留一个 H1；新增模块使用 H2，卡片使用 H3。
- 所有主要正文在服务端静态生成，搜索引擎不依赖客户端请求或交互才能读取。
- `Product` JSON-LD 增加图片数组、产品 ID、分类和基于已发布参数的 `additionalProperty`；不创建虚假 `Offer`、`AggregateRating` 或 `Review`。
- 输出 `BreadcrumbList`。
- FAQ 在页面可见，并输出与可见内容一致的 `FAQPage` 语义节点。Google 已停止 FAQ 富摘要，因此不承诺富摘要或排名提升。
- Gallery 使用 `<figure>` 与 `<figcaption>`；图片 `alt` 描述真实产品和视图用途，结构化图片说明与可见说明一致。
- SEO description 保持产品独立，避免把重复记录编号或乱码写入摘要。

## 视觉与交互

- 延续已确认的 Industrial Cinema 深色工业视觉、青绿色强调色、方正边框和大字号标题。
- Performance、Application、Solutions、Service 采用深色图文卡，避免大段纯文字。
- Gallery 主图使用冷白摄影台，`object-contain` 展示完整车辆；缩略图与说明联动。
- FAQ 使用可访问的原生按钮折叠，首项默认展开；键盘可操作，44px 最小触控高度。
- 配件图片台使用 `#F3F5F2`，卡片正文继续使用深色背景。

## 自动化与后台

- 后台产品编辑页增加“自动补全详情 SEO 内容”按钮和五组可编辑字段。
- API 对 `detailContent` 做服务端形状校验、字符串清理和 4–6 个 FAQ 数量约束。
- 自动生成不需要第三方付费服务，不暴露密钥，不在浏览器内调用 AI。
- 生成结果可重复：相同产品事实产生相同内容，便于测试和审核。

## 验收标准

- 60/60 产品都有独立 Performance 总述、Gallery 描述、2–4 个 Application、2–4 个 Solutions、4–6 个 FAQ。
- 每款 FAQ 问题集合唯一；至少 3 个问题使用该产品事实。
- 页面无邮箱、无 `mailto:`、无禁止承诺、无虚假结构化数据。
- 配件列表和配件详情的图片容器均为冷白底。
- 后台能够生成、编辑、保存并重新读取 `detailContent`。
- 测试、lint、生产构建、目录完整性检查和 `git diff --check` 通过。
