# 产品图片补充与分类页面优化 - Spec

## Why
当前分类页面Banner的图片裁剪方式(`bg-cover`)导致图片显示不完整，部分产品图片缺失，且存在旧的子分类模板页面需要替换。

## What Changes
- 从参考网站获取所有产品图片并补充到产品数据中
- 调整分类页面Banner高度和图片显示方式，使图片完整可见
- 删除旧的 `[category]/[subcategory].tsx` 子分类模板页面（已被新分类页面的Tab筛选功能替代）
- 确保所有页面面包屑和路由正常工作

## Impact
- Affected specs: category-and-product-detail-pages
- Affected code: 
  - `pages/products/[category]/[subcategory].tsx` (删除)
  - `pages/products/[category].tsx` (修改Banner)
  - `data/products.ts` (补充图片URL)

## ADDED Requirements
### Requirement: 产品图片从参考网站1:1复制
系统 SHALL 从 `https://sinotruk.international/` 参考网站获取每个产品的封面图片，并作为 `image` 字段写入产品数据。

#### Scenario: 有图片的产品
- **WHEN** 参考网站产品页面有封面图片
- **THEN** 直接复制图片URL（如 `https://sinotruk.international/image-library/xxx.jpg`）

#### Scenario: 无图片的产品
- **WHEN** 参考网站产品页面没有封面图片
- **THEN** 使用生成的卡车图片作为占位

### Requirement: 分类页Banner显示完整图片
系统 SHALL 调整 Banner 高度和图片显示方式，使图片内容完整可见而非裁剪。

#### Scenario: Banner图片完整显示
- **WHEN** 用户访问分类页面
- **THEN** Banner 背景图使用 `bg-contain` 或合适的高度完整显示图片

## REMOVED Requirements
### Requirement: 旧子分类模板页
**Reason**: 已被新分类页面的Tab筛选功能替代，无需单独的子分类路由页
**Migration**: 删除 `pages/products/[category]/[subcategory].tsx`，产品详情页路由 `[category]/[subcategory]/[product].tsx` 保持不变