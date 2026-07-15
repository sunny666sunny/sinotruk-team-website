# SINOTRUK 网站优化 - 实现计划

## [ ] Task 1: 修改 Header 组件添加 PRODUCTS 和 PARTS 下拉菜单
- **Priority**: high
- **Depends On**: None
- **Description**: 
  - 在 Header 组件中为 PRODUCTS 链接添加下拉菜单，包含所有产品分类及二级分类
  - 在 Header 组件中为 PARTS 链接添加下拉菜单，包含所有配件分类
  - 使用 hover 状态控制下拉菜单显示/隐藏（桌面端）
- **Acceptance Criteria Addressed**: AC-1, AC-2
- **Test Requirements**:
  - `human-judgment` TR-1.1: PRODUCTS 下拉菜单包含 6 个产品大类，每个大类下有二级分类
  - `human-judgment` TR-1.2: PARTS 下拉菜单包含所有配件分类
  - `human-judgment` TR-1.3: 下拉菜单在鼠标悬停时显示，离开时隐藏
- **Notes**: 需要导入 productCategories 和 partCategories 数据

## [ ] Task 2: 移除 Navigation 组件及其引用
- **Priority**: high
- **Depends On**: Task 1
- **Description**: 
  - 从页面布局中移除 Navigation 组件的引用
  - 更新 _app.tsx 或其他引用该组件的文件
- **Acceptance Criteria Addressed**: AC-3
- **Test Requirements**:
  - `human-judgment` TR-2.1: 页面中不再显示固定的产品分类导航栏
  - `human-judgment` TR-2.2: 页面布局不受影响，其他组件正常显示
- **Notes**: 需要查找所有引用 Navigation 组件的文件

## [ ] Task 3: 调整 HeroBanner 背景透明度
- **Priority**: high
- **Depends On**: None
- **Description**: 
  - 调整 banner 背景渐变的透明度，使背景图片更清晰可见
  - 确保文字与背景保持良好对比度
- **Acceptance Criteria Addressed**: AC-4
- **Test Requirements**:
  - `human-judgment` TR-3.1: 背景图片清晰可见，细节能辨认
  - `human-judgment` TR-3.2: 文字与背景对比度良好，易于阅读
- **Notes**: 建议将渐变透明度从 90%/50% 调整为 60%/30% 左右

## [ ] Task 4: 优化 AboutSection 文字布局
- **Priority**: high
- **Depends On**: None
- **Description**: 
  - 调整 AboutSection 的布局结构，使描述文字宽度与内容区域平齐
  - 可能需要将图片和文字改为上下布局或调整网格比例
- **Acceptance Criteria Addressed**: AC-5
- **Test Requirements**:
  - `human-judgment` TR-4.1: 描述文字宽度与页面内容区域平齐
  - `human-judgment` TR-4.2: 文字阅读体验良好，行宽适中
- **Notes**: 参考用户提供的图2，文字应该跨越更宽的区域