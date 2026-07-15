# SINOTRUK 网站优化 - 产品需求文档

## Overview
- **Summary**: 修改 SINOTRUK 网站的导航下拉菜单布局和 Banner 区域，使其与参考网站截图一致。
- **Purpose**: 提升网站视觉效果和用户体验，使导航和 Banner 更符合参考网站设计。
- **Target Users**: 外贸客户和潜在合作伙伴

## Goals
- 修改 Products 下拉菜单布局，使二级分类横向排列（名称+图片）
- 严格按照截图执行一级分类和二级分类结构，包含产品图片
- 使用重汽品牌的卡车图片作为 Banner 背景
- 增加 Banner 高度，覆盖到图2红框区域

## Non-Goals (Out of Scope)
- 不修改其他页面内容
- 不改变网站整体架构
- 不添加新功能

## Background & Context
- 当前下拉菜单是纯文字列表布局
- Banner 高度为 600px/700px，需要增加到覆盖红框区域
- 参考网站截图显示下拉菜单每个分类有图片和文字横向排列

## Functional Requirements
- **FR-1**: 修改 Header 组件中 Products 下拉菜单，将二级分类改为横向排列（名称+图片）
- **FR-2**: 更新 siteConfig.ts 中的产品分类数据，添加二级分类的图片信息
- **FR-3**: 修改 HeroBanner 组件，使用重汽品牌卡车图片作为背景
- **FR-4**: 增加 Banner 高度，使其覆盖到下方"Welcome to SINOTRUK"标题区域

## Non-Functional Requirements
- **NFR-1**: 下拉菜单图片需要清晰显示
- **NFR-2**: Banner 文字与背景保持良好对比度
- **NFR-3**: 修改后网站响应式布局正常

## Constraints
- **Technical**: Next.js 14 + Tailwind CSS 3
- **Dependencies**: lucide-react 图标库

## Assumptions
- 产品分类数据已在 siteConfig.ts 中定义
- 需要为每个二级分类添加图片

## Acceptance Criteria

### AC-1: Products 下拉菜单布局
- **Given**: 用户在桌面端悬停在 Products 导航链接上
- **When**: 查看下拉菜单
- **Then**: 二级分类以"名称+图片"横向排列，每行显示一个分类
- **Verification**: `human-judgment`

### AC-2: 产品分类数据更新
- **Given**: 网站已加载
- **When**: 查看下拉菜单
- **Then**: 每个二级分类显示对应产品图片
- **Verification**: `human-judgment`

### AC-3: Banner 图片更新
- **Given**: 用户访问首页
- **When**: 查看 Banner 区域
- **Then**: Banner 背景显示重汽品牌卡车图片
- **Verification**: `human-judgment`

### AC-4: Banner 高度增加
- **Given**: 用户访问首页
- **When**: 查看页面布局
- **Then**: Banner 高度覆盖到下方"Welcome to SINOTRUK"标题区域
- **Verification**: `human-judgment`

## Open Questions
- [ ] 下拉菜单图片的来源和尺寸要求