# Product页面布局调整 - 产品需求文档

## Overview
- **Summary**: 调整Product页面布局，将副标题和描述移至分类板块上方，PRODUCT标题居中，添加面包屑导航
- **Purpose**: 使Product页面布局与参考网站一致，提升用户体验
- **Target Users**: 浏览产品的网站访客

## Goals
- 将 "Customized Transportation Solutions" 标题和描述移至产品分类卡片板块上方
- PRODUCT标题在Banner中实现上下左右居中
- 在Banner左上角添加面包屑导航

## Non-Goals (Out of Scope)
- 不修改产品分类卡片内容
- 不修改Product Categories区域布局
- 不修改页脚布局

## Background & Context
- 当前Product页面Banner包含PRODUCTS标题、副标题和描述
- 用户希望副标题和描述作为分类板块的标题使用
- 参考网站的布局：Banner只有产品标题，分类板块上方有副标题和描述

## Functional Requirements
- **FR-1**: Banner区域只显示PRODUCTS标题，标题上下左右居中
- **FR-2**: Banner左上角添加面包屑导航（Home > Products）
- **FR-3**: "Customized Transportation Solutions" 标题和描述移至产品分类卡片板块上方

## Non-Functional Requirements
- **NFR-1**: 布局响应式，在移动端和桌面端都有良好显示
- **NFR-2**: 视觉风格与现有网站一致，使用主色调 #09918d

## Constraints
- **Technical**: Next.js 14, React 18, Tailwind CSS 3
- **Dependencies**: 现有组件和样式系统

## Assumptions
- 面包屑导航使用首页和当前页面的链接
- 副标题和描述的样式保持与当前一致

## Acceptance Criteria

### AC-1: Banner只显示PRODUCTS标题且居中
- **Given**: 用户访问 /products 页面
- **When**: 查看Banner区域
- **Then**: Banner中只有PRODUCTS大标题，且标题在Banner中上下左右居中
- **Verification**: `human-judgment`

### AC-2: Banner左上角显示面包屑导航
- **Given**: 用户访问 /products 页面
- **When**: 查看Banner区域左上角
- **Then**: 显示面包屑导航 "Home > Products"
- **Verification**: `human-judgment`

### AC-3: 副标题和描述移至分类板块上方
- **Given**: 用户访问 /products 页面
- **When**: 滚动到产品分类卡片区域
- **Then**: 在卡片上方看到 "Customized Transportation Solutions" 标题和描述
- **Verification**: `human-judgment`

## Open Questions
- [ ] 无
