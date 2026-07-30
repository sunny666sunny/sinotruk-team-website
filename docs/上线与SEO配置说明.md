# 上线与 SEO 配置说明

## 上线前检查

1. 执行 `npm test`、`npx tsc --noEmit`、`npm run build` 和 `npm run db:verify-catalog`。
2. 配置生产环境 `DATABASE_URL`、`JWT_SECRET` 和 `SITE_URL`；`SITE_URL` 必须是最终 HTTPS 域名。
3. 访问 `/sitemap.xml` 与 `/robots.txt`，确认 sitemap 使用最终域名，且 robots 未收录 `/admin/` 与 `/api/`。
4. 确认后台内容来源仅添加允许转载并重新编写的公开内容；来源默认未启用。

## SEO 提交

后台“SEO 健康与提交”只支持以下两个渠道：

- IndexNow：配置 `INDEXNOW_KEY` 后可提交 URL 更新。
- Google Sitemap：配置 `GOOGLE_SEARCH_CONSOLE_SITE_URL`、`GOOGLE_SERVICE_ACCOUNT_EMAIL` 和 `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` 后可提交 sitemap。

不要在前端代码、仓库或文档中保存密钥。所有提交结果会在后台保留历史记录。

## 内容自动化

- 单次执行：`npm run content:worker:once`。
- 仅处理已启用来源，遵守每日上限并跳过重复链接。
- 抓取会拒绝内网、本机、非 HTTP(S)、未在来源白名单内的地址及不合规跳转。
- 发布前会检查来源、事实、正文长度、SEO 字段、站内链接、关键词、无依据数字和来源文本复用。
