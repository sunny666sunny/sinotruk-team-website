# SINOTRUK 网站优化 - 产品需求文档

## Overview
- **Summary**: 修改 SINOTRUK 外贸网站的导航结构和视觉效果，包括将产品分类和配件分类移至页眉下拉菜单、移除固定导航栏、调整 banner 背景透明度、优化 About 部分文字布局。
- **Purpose**: 使网站导航结构更简洁，视觉效果更清晰，提升用户体验。
- **Target Users**: 外贸客户和潜在合作伙伴

## Goals
- 将产品分类整合到页眉 PRODUCTS 下拉菜单中
- 将配件分类整合到页眉 PARTS 下拉菜单中
- 移除固定的 Navigation 组件（产品分类下拉栏）
- 调整 banner 背景透明度，使图片更清晰可见
- 优化 AboutSection 描述文字宽度，使其与内容区域平齐

## Non-Goals (Out of Scope)
- 不修改网站整体架构
- 不添加新页面或功能
- 不改变产品数据结构

## Background & Context
- 当前网站有一个固定的 Navigation 组件显示产品分类
- 页眉导航是简单的链接，没有下拉菜单功能
- Banner 背景过暗，影响图片可见度
- AboutSection 文字被压缩在右侧列中，阅读体验不佳

## Functional Requirements
- **FR-1**: 在 Header 组件中为 PRODUCTS 添加下拉菜单，包含所有产品分类及二级分类
- **FR-2**: 在 Header 组件中为 PARTS 添加下拉菜单，包含所有配件分类
- **FR-3**: 移除 Navigation 组件及其在页面中的引用
- **FR-4**: 调整 HeroBanner 背景渐变透明度，使背景图片更清晰
- **FR-5**: 调整 AboutSection 布局，使描述文字宽度与内容区域平齐

## Non-Functional Requirements
- **NFR-1**: 导航下拉菜单需要响应式设计，桌面端悬停显示，移动端点击显示
- **NFR-2**: Banner 背景调整后文字仍需保持良好对比度
- **NFR-3**: 修改后网站加载速度不受影响

## Constraints
- **Technical**: Next.js 14 + Tailwind CSS 3
- **Dependencies**: lucide-react 图标库

## Assumptions
- 产品分类数据和配件分类数据已在 siteConfig.ts 中定义
- 所有分类页面路由已存在

## Acceptance Criteria

### AC-1: PRODUCTS 下拉菜单
- **Given**: 用户在桌面端访问网站
- **When**: 鼠标悬停在页眉的 PRODUCTS 链接上
- **Then**: 显示包含 6 个产品大类的下拉菜单，每个大类下显示其二级分类
- **Verification**: `human-judgment`

### AC-2: PARTS 下拉菜单
- **Given**: 用户在桌面端访问网站
- **When**: 鼠标悬停在页眉的 PARTS 链接上
- **Then**: 显示包含所有配件分类的下拉菜单
- **Verification**: `human-judgment`

### AC-3: Navigation 组件移除
- **Given**: 网站已加载
- **When**: 查看页面布局
- **Then**: 页面中不再显示固定的产品分类导航栏（原 Navigation 组件）
- **Verification**: `human-judgment`

### AC-4: Banner 背景优化
- **Given**: 用户访问首页
- **When**: 查看 Hero Banner 区域
- **Then**: 背景图片清晰可见，不再被深色覆盖
- **Verification**: `human-judgment`

### AC-5: AboutSection 文字布局优化
- **Given**: 用户访问首页
- **When**: 滚动到 About 区域
- **Then**: 描述文字宽度与内容区域平齐，不再被压缩
- **Verification**: `human-judgment`

## Open Questions
- [ ] 移动端下拉菜单的交互方式（点击展开/收起）