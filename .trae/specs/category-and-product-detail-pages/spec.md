# 分类列表页和产品详情页 - 产品需求文档

## Overview
- **Summary**: 按照参考网站样式重写所有分类列表页和产品详情页，上传所有58款产品，去掉价格
- **Purpose**: 使分类列表页和产品详情页与参考网站布局一致
- **Target Users**: 浏览产品的网站访客

## Goals
- 6个分类列表页（Heavy Truck, Light Truck, Special Vehicle, Light Vehicle, Semi Trailer, New Energy Vehicle）按照参考网站样式重建
- 所有58款产品数据完整录入，路由到对应产品详情页
- 产品详情页1:1还原参考网站布局
- 所有页面去掉价格显示

## Non-Goals (Out of Scope)
- 不修改首页
- 不修改Products总览页
- 不修改页眉页脚
- 不修改PARTS/ABOUT/NEWS/SERVICE/CONTACT页面

## Background & Context
- 参考网站分类列表页结构：Banner（分类图+面包屑+标题+描述）→ 子分类筛选Tab → 产品网格卡片（图片+名称+描述+Read more链接）→ 底部CTA
- 参考网站产品详情页URL格式：`https://sinotruk.international/products/howo-tx-6x4-dump-truck/`
- 当前路由结构：`/products/[category]/[subcategory]/[product]`
- 现有数据只有少量产品，需补充完整

## Functional Requirements
- **FR-1**: 分类列表页Banner显示分类背景图、面包屑、分类标题、描述
- **FR-2**: 分类列表页有子分类筛选Tab（All + 各子分类）
- **FR-3**: 分类列表页产品网格卡片（图片、名称、描述、Read more链接）
- **FR-4**: 分类列表页底部CTA区域
- **FR-5**: 产品详情页包含面包屑、产品图片、规格参数、特性描述、联系CTA
- **FR-6**: 所有页面不显示价格
- **FR-7**: 所有58款产品从Products页面到分类列表页到产品详情页的路由完整

## Non-Functional Requirements
- **NFR-1**: 响应式布局，移动端和桌面端良好显示
- **NFR-2**: 视觉风格与现有网站一致，主色调 #09918d

## Constraints
- **Technical**: Next.js 14 Pages Router, React 18, TypeScript, Tailwind CSS 3
- **Dependencies**: 现有组件和样式系统

## Acceptance Criteria

### AC-1: 分类列表页Banner正确显示
- **Given**: 用户访问 /products/heavy-truck
- **When**: 查看Banner区域
- **Then**: 显示面包屑(Home > Products > Heavy Truck)、分类标题、分类描述
- **Verification**: `human-judgment`

### AC-2: 分类列表页有子分类筛选Tab
- **Given**: 用户访问 /products/heavy-truck
- **When**: 查看Banner下方
- **Then**: 显示 "All Truck" + 各子分类Tab（如 Dump Truck, Tractor Truck, Cargo Truck）
- **Verification**: `human-judgment`

### AC-3: 产品卡片网格正确显示
- **Given**: 用户访问 /products/heavy-truck
- **When**: 选择 "All Truck" Tab
- **Then**: 显示所有该分类下的产品卡片（图片、名称、描述、Read more链接）
- **Verification**: `human-judgment`

### AC-4: 产品详情页正确显示
- **Given**: 用户访问 /products/heavy-truck/dump-truck/howo-tx-6x4-dump-truck
- **When**: 查看页面
- **Then**: 显示面包屑、产品图片、规格参数、特性描述、联系CTA，无价格
- **Verification**: `human-judgment`

### AC-5: 所有产品可路由到详情页
- **Given**: 用户在Products总览页或分类列表页
- **When**: 点击任意产品链接
- **Then**: 跳转到对应的产品详情页
- **Verification**: `human-judgment`

## Open Questions
- [ ] 无