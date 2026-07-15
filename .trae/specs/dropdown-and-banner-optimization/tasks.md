# SINOTRUK 网站优化 - 实现计划

## [ ] Task 1: 更新产品分类数据，添加二级分类图片
- **Priority**: high
- **Depends On**: None
- **Description**: 
  - 更新 siteConfig.ts 中的 productCategories 数组
  - 为每个二级分类添加 image 字段，使用重汽卡车图片
  - 确保图片与截图中的产品对应
- **Acceptance Criteria Addressed**: AC-2
- **Test Requirements**:
  - `human-judgment` TR-1.1: 每个二级分类都有对应的产品图片
  - `human-judgment` TR-1.2: 图片与参考网站截图中的产品一致
- **Notes**: 需要使用合适的图片源，确保图片能正常加载

## [ ] Task 2: 修改 Products 下拉菜单布局
- **Priority**: high
- **Depends On**: Task 1
- **Description**: 
  - 修改 Header.tsx 中的 renderProductDropdown 函数
  - 将二级分类改为横向排列（名称+图片）
  - 每个大类为一列，二级分类在列内横向排列
- **Acceptance Criteria Addressed**: AC-1
- **Test Requirements**:
  - `human-judgment` TR-2.1: 二级分类以"名称+图片"形式横向排列
  - `human-judgment` TR-2.2: 下拉菜单布局与参考网站截图一致
- **Notes**: 需要使用 flex 布局实现横向排列

## [ ] Task 3: 更新 Banner 背景图片为 SINOTRUK 卡车
- **Priority**: high
- **Depends On**: None
- **Description**: 
  - 修改 HeroBanner.tsx 中的背景图片
  - 使用重汽品牌的卡车图片（HOWO系列）
  - 确保图片清晰可见
- **Acceptance Criteria Addressed**: AC-3
- **Test Requirements**:
  - `human-judgment` TR-3.1: Banner 显示重汽品牌卡车图片
  - `human-judgment` TR-3.2: 图片清晰，与品牌风格一致
- **Notes**: 需要使用可靠的图片源

## [ ] Task 4: 增加 Banner 高度
- **Priority**: high
- **Depends On**: None
- **Description**: 
  - 修改 HeroBanner.tsx 中的高度设置
  - 将高度增加到覆盖下方"Welcome to SINOTRUK"标题区域
- **Acceptance Criteria Addressed**: AC-4
- **Test Requirements**:
  - `human-judgment` TR-4.1: Banner 高度覆盖到红框区域
  - `human-judgment` TR-4.2: 页面整体布局正常，无内容重叠
- **Notes**: 需要调整 CategorySection 的布局，将标题整合到 Banner 中或调整位置