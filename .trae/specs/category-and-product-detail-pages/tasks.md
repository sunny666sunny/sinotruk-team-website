# 分类列表页和产品详情页 - 实现计划

## [x] Task 1: 更新完整产品数据（58款产品）
- **Priority**: high
- **Depends On**: None
- **Description**: 
  - 在 data/products.ts 中添加所有58款产品的完整数据
  - 每款产品包含：id, name, category, subcategory, description, image, specifications, features
  - 去掉所有 price 相关字段
  - 更新 Product 接口定义
- **Acceptance Criteria Addressed**: AC-5
- **Test Requirements**:
  - `programmatic` TR-1.1: 所有58款产品ID可被 getProductById 正确查询
  - `programmatic` TR-1.2: 每个分类的产品数量与参考网站一致
  - `human-judgement` TR-1.3: 产品描述与参考网站一致

## [x] Task 2: 重写分类列表页 ([category].tsx)
- **Priority**: high
- **Depends On**: Task 1
- **Description**: 
  - Banner：分类背景图、面包屑(Home > Products > 分类名)、分类标题、分类描述
  - 子分类筛选Tab：All + 各子分类，点击切换显示对应产品
  - 产品网格：3列网格，每张卡片包含图片、名称、描述、Read more链接
  - 底部CTA：Ready to find your perfect truck? + Request Quote / Browse Products按钮
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-3
- **Test Requirements**:
  - `human-judgement` TR-2.1: Banner显示面包屑、标题、描述
  - `human-judgement` TR-2.2: 子分类Tab可点击切换筛选
  - `human-judgement` TR-2.3: 产品卡片显示图片、名称、描述、Read more链接
  - `human-judgement` TR-2.4: 底部CTA区域正确显示

## [x] Task 3: 重写产品详情页组件和路由
- **Priority**: high
- **Depends On**: Task 1
- **Description**: 
  - 重写 ProductDetail 组件：面包屑、产品大图、规格参数表、特性列表、联系CTA
  - 去掉价格显示
  - 更新 [category]/[subcategory]/[product].tsx 路由页
- **Acceptance Criteria Addressed**: AC-4
- **Test Requirements**:
  - `human-judgement` TR-3.1: 产品详情页显示面包屑导航
  - `human-judgement` TR-3.2: 产品图片区域正确
  - `human-judgement` TR-3.3: 规格参数表显示完整
  - `human-judgement` TR-3.4: 不显示价格
  - `human-judgement` TR-3.5: 联系CTA按钮可点击

## [x] Task 4: 更新 Products 总览页的产品链接
- **Priority**: medium
- **Depends On**: Task 1
- **Description**: 
  - 确保 Products 总览页中 Product Categories 区域的产品链接指向正确的路由
- **Acceptance Criteria Addressed**: AC-5
- **Test Requirements**:
  - `human-judgement` TR-4.1: 从Products总览页点击产品链接可跳转到正确详情页

## [x] Task 5: 验证所有页面
- **Priority**: high
- **Depends On**: Task 2, Task 3, Task 4
- **Description**: 
  - 运行开发服务器，验证各分类列表页和产品详情页
- **Acceptance Criteria Addressed**: AC-1, AC-2, AC-3, AC-4, AC-5
- **Test Requirements**:
  - `human-judgement` TR-5.1: 所有6个分类列表页正常显示
  - `human-judgement` TR-5.2: 至少验证3个产品详情页正常显示
  - `human-judgement` TR-5.3: 响应式布局正常