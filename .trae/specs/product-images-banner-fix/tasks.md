# Tasks

## [x] Task 1: 从参考网站获取所有产品图片并更新 products.ts
- **Priority**: high
- **Depends On**: None
- **Description**: 
  - 访问参考网站各产品详情页获取产品封面图片URL
  - 将图片URL写入 `data/products.ts` 中对应产品的 `image` 字段
  - 无图片的产品使用 Unsplash 卡车图片作为 fallback
- **Acceptance Criteria Addressed**: AC-1
- **Test Requirements**:
  - `human-judgement` TR-1.1: 所有有图片的产品显示正确的参考网站图片
  - `human-judgement` TR-1.2: 无图片的产品有合理的 fallback 图片

## [x] Task 2: 调整分类页面Banner显示完整图片
- **Priority**: high
- **Depends On**: None
- **Description**: 
  - 修改 `[category].tsx` 的 Banner 区域
  - 使用 `<img>` 标签 + `object-contain` 使图片完整显示
  - 面包屑和标题叠加在Banner底部
- **Acceptance Criteria Addressed**: AC-2
- **Test Requirements**:
  - `human-judgement` TR-2.1: Banner中图片完整可见，不被裁剪
  - `human-judgement` TR-2.2: 面包屑和标题在图片上方清晰可读

## [x] Task 3: 删除旧子分类模板页
- **Priority**: high
- **Depends On**: None
- **Description**: 
  - 删除 `pages/products/[category]/[subcategory].tsx`
  - 该页面已被新分类页面的Tab筛选功能替代
- **Acceptance Criteria Addressed**: AC-3
- **Test Requirements**:
  - `programmatic` TR-3.1: 文件已删除
  - `human-judgement` TR-3.2: 访问旧路由返回404

## [x] Task 4: 验证面包屑和路由
- **Priority**: medium
- **Depends On**: Task 1, Task 2, Task 3
- **Description**: 
  - 验证所有页面面包屑和路由
- **Acceptance Criteria Addressed**: AC-4
- **Test Requirements**:
  - `human-judgement` TR-4.1: Products总览页面包屑正确
  - `human-judgement` TR-4.2: 分类列表页面包屑正确
  - `human-judgement` TR-4.3: 产品详情页面包屑正确
  - `human-judgement` TR-4.4: 所有页面间路由跳转正常