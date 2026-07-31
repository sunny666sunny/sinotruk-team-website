# SINOTRUK TEAM 官网

这是面向海外商用车采购的 Next.js 站点。公共页面采用“工业电影感”主题：深色工业底色、克制的青绿色强调色、宽幅真实车辆与工厂影像、清晰的采购行动路径。后台与既有数据、API、产品 URL 均保持原结构。

## 首页结构

首页固定为以下十个有意义的区块，顺序不得打乱：

1. 电影感主视觉（Cinematic Hero）
2. 六分类产品矩阵（Catalogue Matrix）
3. 精选车型横向展示（Featured Vehicles）
4. 品牌与业务范围（Brand Identity）
5. 制造与质检能力（Engineering）
6. 六类应用场景（Applications）
7. 采购路径（Procurement Support）
8. 配件入口（Parts Entry）
9. 新闻与采购指南（Editorial）
10. 最终询价入口（Final RFQ）

PC 端产品矩阵必须完整展示六个现有分类，不得因视觉主次隐藏任何分类：

| 分类 | 路径 |
| --- | --- |
| Heavy Truck | `/products/heavy-truck` |
| Light Truck | `/products/light-truck` |
| Special Vehicle | `/products/special-vehicle` |
| Light Vehicle | `/products/light-vehicle` |
| Semi Trailer | `/products/semi-trailer` |
| New Energy Vehicle | `/products/new-energy-vehicle` |

## 图片规范

- 优先复用 `public/images` 中的真实车辆、工厂、应用场景与配件素材，不为改版重复上传资源。
- 公共页面使用 Next.js 响应式图片能力，并为布局填写正确的 `sizes`；仅当前首屏主图可使用高优先级加载。
- 承载信息的图片必须有准确 `alt`；纯装饰图使用空 `alt`，避免屏幕阅读器重复播报。
- 图片采用与容器匹配的裁切方式，桌面端和移动端均不得出现拉伸、遮挡、横向溢出或无意裁掉主体。

## SEO 与索引

- 全站共用 SEO 输出，覆盖唯一标题与描述、Canonical、Open Graph、Twitter Card 和 JSON-LD。
- 首页输出 `Organization`、`WebSite`、`WebPage`；分类页输出 `CollectionPage` 与真实产品 `ItemList`；产品及配件页输出 `Product`；新闻页输出 `Article`；存在面包屑时补充 `BreadcrumbList`。结构化数据只使用页面与数据库中的真实内容，产品 schema 不虚构价格、库存、评分或评价。
- 公开页面保留语义化 H1-H3、面包屑、相关产品/配件/新闻等真实站内链接，以及与页面内容一致的图片替代文本。
- `/sitemap.xml` 与 `/robots.txt` 使用最终站点域名。当前提交实现为 Google Search Console 的 sitemap 提交，以及 IndexNow；Bing 通过其支持的 IndexNow 协议接收更新，没有独立 Bing 提交接口。
- 本项目明确不接入百度提交，也不提供百度入口。

## 本地运行与验收

```bash
npm install
npm run dev
```

最终完整验收命令：

```bash
npm run db:verify-catalog
npm test
npm run lint
npm run build
git diff --check
```

`db:verify-catalog` 必须确认产品、分类、配件、媒体与 URL 基线未变化。当前 lint 验收为 **0 errors、9 warnings**；9 个 warnings 均来自既有 `pages/admin` 文件，本次公共 UI 收尾不改后台生产代码，因此不得描述为“0 warnings”。

## 上线注意事项

生产环境需配置最终 HTTPS 站点地址与数据库连接；搜索引擎提交所需的私密配置只存放在部署平台的环境配置中，不写入前端代码、仓库、日志或文档。详细清单见 [`docs/上线与SEO配置说明.md`](docs/上线与SEO配置说明.md)。
