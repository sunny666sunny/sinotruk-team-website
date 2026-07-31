# 上线与 SEO 配置说明

## 公共页面交付基线

公共站点采用工业电影感主题：深色工业画布、青绿色信号色、宽幅真实车辆与制造场景、明确的采购行动入口。主题覆盖首页、产品与分类、产品详情、配件与配件详情、关于、服务、新闻、联系和询价等公开路由；后台不在本次视觉改造范围内。

首页上线时必须按以下顺序保留十个区块：电影感主视觉、六分类产品矩阵、精选车型、品牌与业务范围、制造与质检、应用场景、采购路径、配件入口、新闻与采购指南、最终询价。原型页面已在生产首页验收后删除，`/prototype/industrial-home` 不得出现在构建路由中。

PC 端六分类矩阵必须一次完整呈现：

| 分类 | Canonical 路径 |
| --- | --- |
| Heavy Truck | `/products/heavy-truck` |
| Light Truck | `/products/light-truck` |
| Special Vehicle | `/products/special-vehicle` |
| Light Vehicle | `/products/light-vehicle` |
| Semi Trailer | `/products/semi-trailer` |
| New Energy Vehicle | `/products/new-energy-vehicle` |

## 图片验收规范

1. 复用 `public/images` 中已有的真实车辆、工厂、应用和配件素材，不因主题切换重新上传或复制图片。
2. 公共页面使用响应式图片并设置与断点匹配的 `sizes`；仅活动首屏图可高优先级加载，其余图片正常延迟加载。
3. 信息图片使用准确、简洁的 `alt`，装饰图片使用空 `alt`。
4. 桌面与移动端检查主体裁切、清晰度和阅读顺序；不得出现图片拉伸、区块重叠、文字裁切或横向滚动。

## SEO 输出与站内链接

- 每个公开页面输出唯一标题、描述、Canonical、Open Graph、Twitter Card 与 JSON-LD，筛选查询参数不生成新的 Canonical。
- 首页 schema 为 `Organization`、`WebSite`、`WebPage`；分类与目录为 `CollectionPage` 和真实记录组成的 `ItemList`；产品与配件为 `Product`；新闻为 `Article`；有面包屑的页面增加 `BreadcrumbList`。
- JSON-LD 只使用现有数据库和页面真实字段。产品 schema 不填写未提供的价格、库存、评分或评价；新闻保留真实发布日期和已有来源说明。
- 页面保持单一 H1、层级正确的 H2/H3、面包屑，以及指向真实分类、产品、配件、新闻、联系和询价页面的内部链接。
- `/sitemap.xml` 覆盖公开静态页、分类、产品、配件和已发布新闻；`/robots.txt` 指向同一最终域名下的 sitemap，并排除后台与 API 路由。

## Google、Bing 与 IndexNow

现有代码只提供两种提交动作：

- Google Search Console：提交站点 sitemap。
- IndexNow：提交新增或变更 URL；Bing 通过其支持的 IndexNow 协议接收更新。本项目没有单独的 Bing 提交接口。

本项目明确不接入百度搜索提交，后台、API 和文档均不应增加百度入口。提交功能所需的私密配置只放在部署平台的环境配置中；本文不记录名称或值，也不在前端、仓库或日志中保存。

## 上线前检查

1. 在生产部署平台配置最终 HTTPS 站点地址、数据库连接和必要的服务端私密配置。
2. 访问 `/sitemap.xml` 与 `/robots.txt`，确认所有公开 URL 使用最终域名，后台和 API URL 未进入 sitemap。
3. 抽查首页、六个分类、产品、配件和新闻页面：单一 H1、语义标题、站内链接、图片 `alt`、Canonical、Open Graph 与对应 JSON-LD 均存在。
4. 分别在桌面和移动视口检查导航、十个首页区块、六分类矩阵、详情媒体、表单与页脚，无裁切、重叠或横向溢出。
5. 后台内容来源只启用已确认允许使用的公开来源；发布前继续执行事实、正文、SEO 与站内链接质量检查。

## 完整性验证

```bash
npm run db:verify-catalog
npm test
npm run lint
npm run build
git diff --check
```

验收标准：

- `db:verify-catalog` 确认产品、分类、子分类、配件、媒体和 URL 基线未变化。
- 全量测试通过，原型文件不存在断言通过。
- lint 为 0 errors。当前结果仍有 9 个既有 `pages/admin` warnings（原生图片、Hook 依赖和未使用变量），不得声称 0 warnings；本次不为消除后台 warnings 重构生产代码。
- build 成功，路由列表不含 `/prototype/industrial-home`。
- `git diff --check` 无空白错误。

## 内容自动化

- 单次执行：`npm run content:worker:once`。
- 仅处理已启用来源，遵守每日上限并跳过重复链接。
- 抓取拒绝内网、本机、非 HTTP(S)、未在来源白名单内的地址及不合规跳转。
- 发布前检查来源、事实、正文长度、SEO 字段、站内链接、关键词、无依据数字和来源文本复用。
