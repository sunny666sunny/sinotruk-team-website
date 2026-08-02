# SINOTRUK 剩余 53 款产品上线审计

> 审计日期：2026-08-02
> 第一方对标范围：`https://sinotruk.international/products/` 及 53 个产品详情页。
> 本地范围：`data/products.ts` 中排除已单独核验的 7 个 slug 后的全部产品。
> 边界：本报告只记录可追溯事实、错配和代码校正底稿，不修改业务代码。对标站本身的复制错误、字段矛盾和未经本项目证实的营销承诺不得机械照抄。

## 1. 数据覆盖与总判断

- 对标详情页下载：53/53，HTTP 200，0 个缺页。
- 本地剩余产品：53 个；重卡 16、轻卡 7、专用车 17、轻型车 5、半挂车 5、新能源 3。
- 本地图片资源：所有 `image`、`bannerImage`、`galleryImages` 与通用性能图文件均存在；“文件存在”不等于车型归属正确。
- 标题：52 个与来源完全一致；`howo-pure-electric-tractor-truck` 仅有来源 `Tractor truck` 与本地 `Tractor Truck` 的大小写差异。
- 分类面包屑：`howo-n-6x4-cargo-truck`、`howo-n-8x4-cargo-truck` 和 3 个新能源页面在来源站缺少有效分类文本；本地分类可保留，但不能说是由来源面包屑验证。
- 三个下半页模板在全部 53 页完全相同：Application Areas 哈希 `2cd931115523`、Solutions 哈希 `1f0d8621af7b`、Customer Service 哈希 `d1341c63d17b`。它们是站点模板，不是产品级证据。
- 本地 53 款仅使用 3 套 Performance 文案，全部引用 `perf-img30.jpg`、`perf-img31.jpg`、`perf-img32.jpg`：23 款为重复方向盘模板，17 款专用车为乘用车/ESP/皮革内饰模板，13 款轻型车、半挂和新能源为 Pickup/2.0T+8AT 模板。所有现有 Performance 均不得直接作为产品独立 SEO 正文。

## 2. 发布等级

| 等级 | 范围 | 处理方式 |
| --- | --- | --- |
| P0 阻断 | 17 款专用车、5 款轻型车/SUV、5 款半挂、3 款新能源 | 本地详细参数存在整组复制；必须用本报告的来源表重建，来源自身无可信值时明确留空。 |
| P0 局部阻断 | `howo-6x4-dump-truck`、`howo-n-6x4-dump-truck`、`howo-tx-8x4-dump-truck`、`howo-t7-6x4-tractor-truck`、`howo-4x2-tractor-truck` | 来源或本地字段语义自相矛盾，不能只照抄摘要。 |
| P1 图片审校 | 见第 5 节错配清单 | 采用“安全画廊”清单，排除 banner、重复图、跨产品图和通用 Performance 图。 |
| P1 内容重写 | 全部 53 款 | Performance、Applications、Solutions 必须由已发布参数和已确认图片驱动；Customer Service 仅保留本项目真实入口并去邮箱。 |

## 3. 逐 slug 可信参数映射

说明：每个 JSON 块可直接作为校正底稿。`sourceSummary` 是来源顶部 5 项；`sourceDetailedRows` 保留来源表原始行和列，避免在报告阶段错误压平 rowspan 或多车型列。`recommendedSpecifications` 仅在来源摘要没有已知串键/旧模板时提供；空对象表示“不要发布摘要参数”。所有强事实仍应经过产品资料或人工确认。

### 3.1 heavy-truck（16 款）

#### [howo-tx-8x4-dump-truck](https://sinotruk.international/products/howo-tx-8x4-dump-truck/)

- 结论：摘要把 `257/2100` 写成 Engine；来源详细表表明它是净功率/转速。摘要键不可发布。
- 来源标题：`Howo TX 8X4 Dump Truck`；本地标题：`Howo TX 8X4 Dump Truck`。
- 来源参数表：5 行，已在下方完整保留。

```json
{
  "slug": "howo-tx-8x4-dump-truck",
  "sourceUrl": "https://sinotruk.international/products/howo-tx-8x4-dump-truck/",
  "category": "heavy-truck",
  "subcategory": "dump-truck",
  "title": "Howo TX 8X4 Dump Truck",
  "sourceSummary": {
    "Drive type": "8x4",
    "Engine": "257/2100",
    "Cab": "TX-M (525MM single bunk)",
    "Rear axle": "16T+16T",
    "Up-body configuration": "18-28CBM"
  },
  "recommendedSpecifications": {},
  "sourceDetailedRows": [
    [
      "Howo TX 8X4 Dump Truck"
    ],
    [
      "Vehicle Model",
      "ZZ3317V286GF1B"
    ],
    [
      "Engines",
      "Model",
      "WP8.350E62"
    ],
    [
      "Net power (kw) /speed (r/min)",
      "257/2100"
    ],
    [
      "Maximum torque (Nm) /speed (r/min)",
      "1400/1200-1600"
    ]
  ],
  "safeGalleryImages": [
    "/images/products/Howo-TX7-8X4-Dump-Truck-3.jpg",
    "/images/products/Howo-TX7-8X4-Dump-Truck-5.jpg",
    "/images/products/Howo-TX7-8X4-Dump-Truck-7.jpg",
    "/images/products/Howo-TX7-8X4-Dump-Truck-8.jpg",
    "/images/products/Howo-TX7-8X4-Dump-Truck-2.jpg",
    "/images/products/Howo-TX7-8X4-Dump-Truck-4.jpg"
  ],
  "excludedSourceGalleryImages": [],
  "localOnlyUnverifiedGalleryImages": []
}
```

#### [howo-n-6x4-dump-truck](https://sinotruk.international/products/howo-n-6x4-dump-truck/)

- 结论：来源摘要出现 `Emission: Horsepower 371`，排放与马力串键；只采用详细表中明确字段。
- 来源标题：`Howo N 6X4 Dump Truck`；本地标题：`Howo N 6X4 Dump Truck`。
- 来源参数表：17 行，已在下方完整保留。

```json
{
  "slug": "howo-n-6x4-dump-truck",
  "sourceUrl": "https://sinotruk.international/products/howo-n-6x4-dump-truck/",
  "category": "heavy-truck",
  "subcategory": "dump-truck",
  "title": "Howo N 6X4 Dump Truck",
  "sourceSummary": {
    "Drive type": "6x4",
    "Dimension (mm)": "8450*2496*3170",
    "Fuel Tank (L)": "300",
    "Emission": "Horsepower 371",
    "Power": "371"
  },
  "recommendedSpecifications": {},
  "sourceDetailedRows": [
    [
      "HOWO N 6×4 dump truck (18~24m³)"
    ],
    [
      "Weight Parameter",
      "Curb mass (kg)",
      "12370"
    ],
    [
      "Full loaded mass (kg)",
      "25000"
    ],
    [
      "Dimension Parameter",
      "External Size (L*W*H) mm",
      "8450*2496*3170"
    ],
    [
      "Wheel Base(mm)",
      "3820+1350"
    ],
    [
      "Performance Parameter",
      "Max.Speed (km/h)",
      "90"
    ],
    [
      "Economic Speed (km/h)",
      "65~80"
    ],
    [
      "Max.Grade Ability (%)",
      "34"
    ],
    [
      "Engine",
      "Horsepower",
      "371"
    ],
    [
      "Type",
      "water-cooled, turbo-charged & inter-cooled, direct injection"
    ],
    [
      "Rear Axle",
      "Type",
      "HC16"
    ],
    [
      "Rear Axle Ratio",
      "4.8"
    ],
    [
      "Carriage",
      "Carriage Internal Dimensions (mm)",
      "5200~ 7000* 2300*1500"
    ],
    [
      "Cubage (m³)",
      "18~24"
    ],
    [
      "Steel thickness of Carriage (mm)",
      "Floor:8mm/ Side:4mm (Mn16)"
    ],
    [
      "Fuel Tank (L)",
      "300"
    ],
    [
      "Tire",
      "12.00R20/ 295/ 80R22.5"
    ]
  ],
  "safeGalleryImages": [
    "/images/products/HOWO-N-6X4-dump-truck-3.jpg",
    "/images/products/HOWO-N-6X4-dump-truck-2.jpg",
    "/images/products/HOWO-N-6X4-dump-truck-1.jpg",
    "/images/products/HOWO-N-6X4-dump-truck-4.jpg",
    "/images/products/HOWO-N-6X4-dump-truck-5.jpg",
    "/images/products/HOWO-N-6X4-dump-truck-7.jpg"
  ],
  "excludedSourceGalleryImages": [],
  "localOnlyUnverifiedGalleryImages": []
}
```

#### [howo-n-8x4-dump-truck](https://sinotruk.international/products/howo-n-8x4-dump-truck/)

- 结论：来源摘要 `Engine: 380/400` 未说明单位/含义，只可保留为待确认原始值。
- 来源标题：`Howo N 8X4 Dump Truck`；本地标题：`Howo N 8X4 Dump Truck`。
- 来源参数表：17 行，已在下方完整保留。

```json
{
  "slug": "howo-n-8x4-dump-truck",
  "sourceUrl": "https://sinotruk.international/products/howo-n-8x4-dump-truck/",
  "category": "heavy-truck",
  "subcategory": "dump-truck",
  "title": "Howo N 8X4 Dump Truck",
  "sourceSummary": {
    "Drive type": "8x4",
    "Dimension (mm)": "10745*2496*3668",
    "Rear Axle": "MCX16,5.72",
    "Fuel Tank (L)": "300",
    "Engine": "380/400"
  },
  "recommendedSpecifications": {
    "Drive type": "8x4",
    "Dimension (mm)": "10745*2496*3668",
    "Rear Axle": "MCX16,5.72",
    "Fuel Tank (L)": "300",
    "Engine": "380/400"
  },
  "sourceDetailedRows": [
    [
      "HOWO N 8×4 dump truck (21~30m³)"
    ],
    [
      "Weight Parameter",
      "Curb mass (kg)",
      "15830"
    ],
    [
      "Full loaded mass (kg)",
      "31000"
    ],
    [
      "Dimension Parameter",
      "External Size (L*W*H) mm",
      "10745*2496*3668"
    ],
    [
      "Wheel Base(mm)",
      "1800+3800+1350"
    ],
    [
      "Performance Parameter",
      "Max.Speed(km/h)",
      "90"
    ],
    [
      "Economic Speed (km/h)",
      "65~80"
    ],
    [
      "Max.Grade Ability (%)",
      "34"
    ],
    [
      "Engine",
      "Horsepower",
      "380/400"
    ],
    [
      "Type",
      "water-cooled, turbo-charged & inter-cooled, direct injection"
    ],
    [
      "Rear Axle",
      "Type",
      "MCX16"
    ],
    [
      "Rear Axle Ratio",
      "5.72"
    ],
    [
      "Carriage",
      "Carriage Internal Dimensions (mm)",
      "6200~8800*2300*1500"
    ],
    [
      "Cubage (m³)",
      "21~30"
    ],
    [
      "Steel thickness of Carriage (mm)",
      "Floor:8mm/ Side:4mm (Mn16)"
    ],
    [
      "Fuel Tank (L)",
      "300"
    ],
    [
      "Tire",
      "12.00R20 /295/ 80R22.5"
    ]
  ],
  "safeGalleryImages": [
    "/images/products/Howo-N-8X4-Dump-Truck-1.jpg",
    "/images/products/Howo-N-8X4-Dump-Truck-6.jpg",
    "/images/products/Howo-N-8X4-Dump-Truck-2.jpg",
    "/images/products/Howo-N-8X4-Dump-Truck-3.jpg",
    "/images/products/Howo-N-8X4-Dump-Truck-4.jpg"
  ],
  "excludedSourceGalleryImages": [],
  "localOnlyUnverifiedGalleryImages": []
}
```

#### [howo-6x4-dump-truck](https://sinotruk.international/products/howo-6x4-dump-truck/)

- 结论：来源详细表标题/ITEM 写成 8×4，与本页 6×4 冲突；不可发布详细参数，需另取 6×4 车型资料。
- 来源标题：`Howo 6X4 Dump Truck`；本地标题：`Howo 6X4 Dump Truck`。
- 来源参数表：15 行，已在下方完整保留。

```json
{
  "slug": "howo-6x4-dump-truck",
  "sourceUrl": "https://sinotruk.international/products/howo-6x4-dump-truck/",
  "category": "heavy-truck",
  "subcategory": "dump-truck",
  "title": "Howo 6X4 Dump Truck",
  "sourceSummary": {
    "Drive type": "6x4",
    "Dimension (mm)": "8400×2496×3400",
    "Max load (kg)": "25000",
    "Emission": "EURO2-5",
    "Power": "336-420hp"
  },
  "recommendedSpecifications": {},
  "sourceDetailedRows": [
    [
      "ITEM",
      "6×4 howo dump truck",
      "8×4 howo dump truck"
    ],
    [
      "Series",
      "HOWO DUMP TRUCK",
      "HOWO DUMP TRUCK"
    ],
    [
      "Number of tire",
      "10 wheel",
      "12 wheel"
    ],
    [
      "Dimension (mm)",
      "8400×2496×3400",
      "10245×2496×3400"
    ],
    [
      "Wheel base (mm)",
      "3600+1350",
      "1800+3500+1350"
    ],
    [
      "Curb weight (kg)",
      "12080",
      "14860"
    ],
    [
      "Max load (kg)",
      "25000",
      "30000"
    ],
    [
      "Engine brand",
      "SINOTRUK",
      "SINOTRUK"
    ],
    [
      "Emission",
      "EURO2-5",
      "EURO2-5"
    ],
    [
      "Power",
      "336-420hp",
      "336-420hp"
    ],
    [
      "Gearbox Model",
      "HW19710",
      "HW19710"
    ],
    [
      "Gearbox type",
      "10 Forward speed gear",
      "10 Forward speed gear"
    ],
    [
      "Howo dump truck axle",
      "HF9/HC16",
      "HF9/HC16"
    ],
    [
      "Howo dump truck tire",
      "12.00R20 radial tire",
      "12.00R20 radial tire"
    ],
    [
      "Howo dump truck cab",
      "HW70 without sleeper",
      "HW70 without sleeper"
    ]
  ],
  "safeGalleryImages": [
    "/images/products/Howo-340-6X4-2.jpg",
    "/images/products/Howo-340-6X4-3.jpg",
    "/images/products/Howo-340-6X4-4.jpg",
    "/images/products/Howo-340-6X4-5.jpg",
    "/images/products/Howo-340-6X4-6.jpg",
    "/images/products/Howo-340-6X4-7.jpg"
  ],
  "excludedSourceGalleryImages": [],
  "localOnlyUnverifiedGalleryImages": []
}
```

#### [howo-8x4-dump-truck](https://sinotruk.international/products/howo-8x4-dump-truck/)

- 结论：本地主要参数来自同一来源页；可作为待核验底稿，但 Performance 仍是方向盘通用模板，需按本车型重写。
- 来源标题：`Howo 8X4 Dump Truck`；本地标题：`Howo 8X4 Dump Truck`。
- 来源参数表：15 行，已在下方完整保留。

```json
{
  "slug": "howo-8x4-dump-truck",
  "sourceUrl": "https://sinotruk.international/products/howo-8x4-dump-truck/",
  "category": "heavy-truck",
  "subcategory": "dump-truck",
  "title": "Howo 8X4 Dump Truck",
  "sourceSummary": {
    "Drive type": "8x4",
    "Dimension (mm)": "10245×2496×3400",
    "Max load (kg)": "30000",
    "Emission": "EURO2-5",
    "Power": "336-420hp"
  },
  "recommendedSpecifications": {
    "Drive type": "8x4",
    "Dimension (mm)": "10245×2496×3400",
    "Max load (kg)": "30000",
    "Emission": "EURO2-5",
    "Power": "336-420hp"
  },
  "sourceDetailedRows": [
    [
      "ITEM",
      "6×4 howo dump truck",
      "8×4 howo dump truck"
    ],
    [
      "Series",
      "HOWO DUMP TRUCK",
      "HOWO DUMP TRUCK"
    ],
    [
      "Number of tire",
      "10 wheel",
      "12 wheel"
    ],
    [
      "Dimension (mm)",
      "8400×2496×3400",
      "10245×2496×3400"
    ],
    [
      "Wheel base (mm)",
      "3600+1350",
      "1800+3500+1350"
    ],
    [
      "Curb weight (kg)",
      "12080",
      "14860"
    ],
    [
      "Max load (kg)",
      "25000",
      "30000"
    ],
    [
      "Engine brand",
      "SINOTRUK",
      "SINOTRUK"
    ],
    [
      "Emission",
      "EURO2-5",
      "EURO2-5"
    ],
    [
      "Power",
      "336-420hp",
      "336-420hp"
    ],
    [
      "Gearbox Model",
      "HW19710",
      "HW19710"
    ],
    [
      "Gearbox type",
      "10 Forward speed gear",
      "10 Forward speed gear"
    ],
    [
      "Howo dump truck axle",
      "HF9/HC16",
      "HF9/HC16"
    ],
    [
      "Howo dump truck tire",
      "12.00R20 radial tire",
      "12.00R20 radial tire"
    ],
    [
      "Howo dump truck cab",
      "HW70 without sleeper",
      "HW70 without sleeper"
    ]
  ],
  "safeGalleryImages": [
    "/images/products/HOWO-7-8X4-5.jpg",
    "/images/products/HOWO-7-8X4-4.jpg",
    "/images/products/HOWO-7-8X4-6.jpg",
    "/images/products/HOWO-7-8X4-2.jpg",
    "/images/products/HOWO-7-8X4-1.jpg",
    "/images/products/HOWO-7-8X4-3.jpg"
  ],
  "excludedSourceGalleryImages": [],
  "localOnlyUnverifiedGalleryImages": []
}
```

#### [howo-t7-6x4-tractor-truck](https://sinotruk.international/products/howo-t7-6x4-tractor-truck/)

- 结论：摘要把 `2300 Nm /1000-1400 RPM` 写成 Power，实际是扭矩；来源详细表很少，需谨慎。
- 来源标题：`Howo T7 6X4 Tractor Truck`；本地标题：`Howo T7 6X4 Tractor Truck`。
- 来源参数表：5 行，已在下方完整保留。

```json
{
  "slug": "howo-t7-6x4-tractor-truck",
  "sourceUrl": "https://sinotruk.international/products/howo-t7-6x4-tractor-truck/",
  "category": "heavy-truck",
  "subcategory": "tractor-truck",
  "title": "Howo T7 6X4 Tractor Truck",
  "sourceSummary": {
    "Drive type": "6x4",
    "Dimension (mm)": "6950×2530×3455",
    "Max load (kg)": "30000",
    "Engine": "MC13.54-50",
    "Power": "2300 Nm /1000-1400 RPM"
  },
  "recommendedSpecifications": {},
  "sourceDetailedRows": [
    [
      "Working conditions",
      "Long-distance high-speed transport"
    ],
    [
      "Model",
      "T7/6X4/MC13/540"
    ],
    [
      "Engine",
      "MC13.54-50"
    ],
    [
      "Gearbox",
      "16 straight (MT)"
    ],
    [
      "Rear axle",
      "MAN technology rear axle (speed"
    ]
  ],
  "safeGalleryImages": [
    "/images/products/HOWO-T7-6X4-4.jpg",
    "/images/products/HOWO-T7-6X4-5.jpg",
    "/images/products/HOWO-T7-6X4-6.jpg",
    "/images/products/HOWO-T7-6X4-7.jpg",
    "/images/products/HOWO-T7-6X4-8.jpg",
    "/images/products/HOWO-T7-6X4-2.jpg"
  ],
  "excludedSourceGalleryImages": [],
  "localOnlyUnverifiedGalleryImages": []
}
```

#### [howo-tx-6x4-tractor-truck](https://sinotruk.international/products/howo-tx-6x4-tractor-truck/)

- 结论：本地主要参数来自同一来源页；可作为待核验底稿，但 Performance 仍是方向盘通用模板，需按本车型重写。
- 来源标题：`Howo TX 6X4 Tractor Truck`；本地标题：`Howo TX 6X4 Tractor Truck`。
- 来源参数表：3 行，已在下方完整保留。

```json
{
  "slug": "howo-tx-6x4-tractor-truck",
  "sourceUrl": "https://sinotruk.international/products/howo-tx-6x4-tractor-truck/",
  "category": "heavy-truck",
  "subcategory": "tractor-truck",
  "title": "Howo TX 6X4 Tractor Truck",
  "sourceSummary": {
    "Drive type": "6x4",
    "Dimension (mm)": "6950×2530×3455",
    "Max load (kg)": "8800",
    "Engine": "WP12T480E62",
    "Power": "WP12T 480"
  },
  "recommendedSpecifications": {
    "Drive type": "6x4",
    "Dimension (mm)": "6950×2530×3455",
    "Max load (kg)": "8800",
    "Engine": "WP12T480E62",
    "Power": "WP12T 480"
  },
  "sourceDetailedRows": [
    [
      "Engine",
      "Model",
      "WP12T480E62"
    ],
    [
      "Net power (kw) /Speed (r/min)",
      "353/1800"
    ],
    [
      "Maximum torque (Nm) / Speed (r/min)",
      "2300/950-1400"
    ]
  ],
  "safeGalleryImages": [
    "/images/products/HowoTX-6X4-Tractor-Truck-10.jpg",
    "/images/products/HowoTX-6X4-Tractor-Truck-9.jpg",
    "/images/products/HowoTX-6X4-Tractor-Truck-8.jpg",
    "/images/products/Howo-TX-6X4-Tractor-Truck-4.jpg",
    "/images/products/HowoTX-6X4-Tractor-Truck-7.jpg",
    "/images/products/Howo-TX-6X4-Tractor-Truck-5.jpg"
  ],
  "excludedSourceGalleryImages": [],
  "localOnlyUnverifiedGalleryImages": []
}
```

#### [howo-n-4x2-tractor-truck](https://sinotruk.international/products/howo-n-4x2-tractor-truck/)

- 结论：本地主要参数来自同一来源页；可作为待核验底稿，但 Performance 仍是方向盘通用模板，需按本车型重写。
- 来源标题：`Howo N 4X2 Tractor Truck`；本地标题：`Howo N 4X2 Tractor Truck`。
- 来源参数表：9 行，已在下方完整保留。

```json
{
  "slug": "howo-n-4x2-tractor-truck",
  "sourceUrl": "https://sinotruk.international/products/howo-n-4x2-tractor-truck/",
  "category": "heavy-truck",
  "subcategory": "tractor-truck",
  "title": "Howo N 4X2 Tractor Truck",
  "sourceSummary": {
    "Drive type": "4x2",
    "Transmission": "9F,10F,12F",
    "Front axle": "7T-9.5T",
    "Engine": "Euro II-Euro V",
    "Power": "300-440PS"
  },
  "recommendedSpecifications": {
    "Drive type": "4x2",
    "Transmission": "9F,10F,12F",
    "Front axle": "7T-9.5T",
    "Engine": "Euro II-Euro V",
    "Power": "300-440PS"
  },
  "sourceDetailedRows": [
    [
      "Vehicle type",
      "Tractor"
    ],
    [
      "Drive type",
      "4×2"
    ],
    [
      "Cab",
      "H77L single bunk, H78L double bunk"
    ],
    [
      "Engine",
      "Emission standerd",
      "Euro II- Euro V"
    ],
    [
      "Power",
      "300-440PS"
    ],
    [
      "Transmission",
      "9F，10F,12F"
    ],
    [
      "Front axle",
      "7T-9.5T"
    ],
    [
      "Rear axle",
      "13T-16T /axle"
    ],
    [
      "Tyre",
      "12.00R20,12R22.5,315/ 80R22.5, 13R22,5 etc"
    ]
  ],
  "safeGalleryImages": [
    "/images/products/Howo-N-4X2-Tractor-Truck-2.jpg",
    "/images/products/Howo-N-4X2-Tractor-Truck-5.jpg",
    "/images/products/Howo-N-4X2-Tractor-Truck-3.jpg",
    "/images/products/Howo-N-4X2-Tractor-Truck.jpg",
    "/images/products/Howo-N-4X2-Tractor-Truck-4.jpg",
    "/images/products/Howo-N-4X2-Tractor-Truck-1.jpg"
  ],
  "excludedSourceGalleryImages": [],
  "localOnlyUnverifiedGalleryImages": []
}
```

#### [howo-n-6x4-tractor-truck](https://sinotruk.international/products/howo-n-6x4-tractor-truck/)

- 结论：本地主要参数来自同一来源页；可作为待核验底稿，但 Performance 仍是方向盘通用模板，需按本车型重写。
- 来源标题：`Howo N 6X4 Tractor Truck`；本地标题：`Howo N 6X4 Tractor Truck`。
- 来源参数表：9 行，已在下方完整保留。

```json
{
  "slug": "howo-n-6x4-tractor-truck",
  "sourceUrl": "https://sinotruk.international/products/howo-n-6x4-tractor-truck/",
  "category": "heavy-truck",
  "subcategory": "tractor-truck",
  "title": "Howo N 6X4 Tractor Truck",
  "sourceSummary": {
    "Drive type": "6x4",
    "Transmission": "9F,10F,12F,16F",
    "Front axle": "7T-9.5T",
    "Engine": "Euro II-Euro V",
    "Power": "266-440PS"
  },
  "recommendedSpecifications": {
    "Drive type": "6x4",
    "Transmission": "9F,10F,12F,16F",
    "Front axle": "7T-9.5T",
    "Engine": "Euro II-Euro V",
    "Power": "266-440PS"
  },
  "sourceDetailedRows": [
    [
      "Vehicle type",
      "Tractor"
    ],
    [
      "Drive type",
      "6×4"
    ],
    [
      "Cab",
      "H77L single bunk, H78L double bunk"
    ],
    [
      "Engine",
      "Emission standerd",
      "Euro II- Euro V"
    ],
    [
      "Power",
      "266-440PS"
    ],
    [
      "Transmission",
      "9F，10F,12F,16F"
    ],
    [
      "Front axle",
      "7T-9.5T"
    ],
    [
      "Rear axle",
      "13T-16T /axle"
    ],
    [
      "Tyre",
      "12.00R20,12R22.5,315/ 80R22.5, 13R22,5 etc"
    ]
  ],
  "safeGalleryImages": [
    "/images/products/Howo-N-6X4-Tractor-Truck-2.jpg",
    "/images/products/Howo-N-6X4-Tractor-Truck-10.jpg",
    "/images/products/Howo-N-6X4-Tractor-Truck-4.jpg",
    "/images/products/Howo-N-6X4-Tractor-Truck-9.jpg",
    "/images/products/Howo-N-6X4-Tractor-Truck-3.jpg",
    "/images/products/Howo-N-6X4-Tractor-Truck-11.jpg"
  ],
  "excludedSourceGalleryImages": [],
  "localOnlyUnverifiedGalleryImages": []
}
```

#### [howo-6x4-tractor-truck](https://sinotruk.international/products/howo-6x4-tractor-truck/)

- 结论：本地主要参数来自同一来源页；可作为待核验底稿，但 Performance 仍是方向盘通用模板，需按本车型重写。
- 来源标题：`Howo 6X4 Tractor Truck`；本地标题：`Howo 6X4 Tractor Truck`。
- 来源参数表：9 行，已在下方完整保留。

```json
{
  "slug": "howo-6x4-tractor-truck",
  "sourceUrl": "https://sinotruk.international/products/howo-6x4-tractor-truck/",
  "category": "heavy-truck",
  "subcategory": "tractor-truck",
  "title": "Howo 6X4 Tractor Truck",
  "sourceSummary": {
    "Drive type": "6x4",
    "Transmission": "10F,12F,16F",
    "Front axle": "7T-9.5T",
    "Engine": "Euro II-Euro V",
    "Power": "266-430PS"
  },
  "recommendedSpecifications": {
    "Drive type": "6x4",
    "Transmission": "10F,12F,16F",
    "Front axle": "7T-9.5T",
    "Engine": "Euro II-Euro V",
    "Power": "266-430PS"
  },
  "sourceDetailedRows": [
    [
      "Vehicle type",
      "Tractor"
    ],
    [
      "Drive type",
      "6×4"
    ],
    [
      "Cab",
      "HW76 single bunk, HW79 double bunk"
    ],
    [
      "Engine",
      "Emission standerd",
      "Euro II-Euro V"
    ],
    [
      "Power",
      "266-430PS"
    ],
    [
      "Transmission",
      "10F,12F,16F"
    ],
    [
      "Front axle",
      "7T-9.5T"
    ],
    [
      "Rear axle",
      "13T-16T/ axle"
    ],
    [
      "Tyre",
      "12.00R20,12R22.5,315/ 80R22.5 etc."
    ]
  ],
  "safeGalleryImages": [
    "/images/products/Howo-6X4-Tractor-Truck-9.jpg",
    "/images/products/Howo-6X4-Tractor-Truck-6.jpg",
    "/images/products/Howo-6X4-Tractor-Truck-5.jpg",
    "/images/products/Howo-6X4-Tractor-Truck-7.jpg",
    "/images/products/Howo-6X4-Tractor-Truck-8.jpg",
    "/images/products/Howo-6X4-Tractor-Truck-10.jpg"
  ],
  "excludedSourceGalleryImages": [],
  "localOnlyUnverifiedGalleryImages": []
}
```

#### [howo-4x2-tractor-truck](https://sinotruk.international/products/howo-4x2-tractor-truck/)

- 结论：本地详情存在错误键 `2Cab`；来源表为 Cab，校正键名后仍需验证具体驾驶室配置。
- 来源标题：`Howo 4X2 Tractor Truck`；本地标题：`Howo 4X2 Tractor Truck`。
- 来源参数表：9 行，已在下方完整保留。

```json
{
  "slug": "howo-4x2-tractor-truck",
  "sourceUrl": "https://sinotruk.international/products/howo-4x2-tractor-truck/",
  "category": "heavy-truck",
  "subcategory": "tractor-truck",
  "title": "Howo 4X2 Tractor Truck",
  "sourceSummary": {
    "Drive type": "4x2",
    "Transmission": "10F,12F,16F",
    "Front axle": "7T-9.5T",
    "Engine": "Euro II-Euro V",
    "Power": "266-430PS"
  },
  "recommendedSpecifications": {
    "Drive type": "4x2",
    "Transmission": "10F,12F,16F",
    "Front axle": "7T-9.5T",
    "Engine": "Euro II-Euro V",
    "Power": "266-430PS"
  },
  "sourceDetailedRows": [
    [
      "Vehicle type",
      "Tractor"
    ],
    [
      "Drive type",
      "4×2"
    ],
    [
      "2Cab",
      "HW76 single bunk, HW79 double bunk"
    ],
    [
      "Engine",
      "Emission standerd",
      "Euro II-Euro V"
    ],
    [
      "Power",
      "266-430PS"
    ],
    [
      "Transmission",
      "10F,12F,16F"
    ],
    [
      "Front axle",
      "7T-9.5T"
    ],
    [
      "Rear axle",
      "13T-16T/ axle"
    ],
    [
      "Tyre",
      "12.00R20,12R22.5,315/ 80R22.5 etc."
    ]
  ],
  "safeGalleryImages": [
    "/images/products/Howo-4X2-Tractor-Truck-5.jpg",
    "/images/products/Howo-4X2-Tractor-Truck-6.jpg",
    "/images/products/Howo-4X2-Tractor-Truck-4.jpg",
    "/images/products/Howo-4X2-Tractor-Truck-3.jpg",
    "/images/products/Howo-4X2-Tractor-Truck-2.jpg",
    "/images/products/Howo-4X2-Tractor-Truck-1.jpg"
  ],
  "excludedSourceGalleryImages": [],
  "localOnlyUnverifiedGalleryImages": []
}
```

#### [howo-tx-4x2-cargo-truck-2](https://sinotruk.international/products/howo-tx-4x2-cargo-truck-2/)

- 结论：本地主要参数来自同一来源页；可作为待核验底稿，但 Performance 仍是方向盘通用模板，需按本车型重写。
- 来源标题：`Howo TX 4X2 Cargo Truck`；本地标题：`Howo TX 4X2 Cargo Truck`。
- 来源参数表：10 行，已在下方完整保留。

```json
{
  "slug": "howo-tx-4x2-cargo-truck-2",
  "sourceUrl": "https://sinotruk.international/products/howo-tx-4x2-cargo-truck-2/",
  "category": "heavy-truck",
  "subcategory": "cargo-truck",
  "title": "Howo TX 4X2 Cargo Truck",
  "sourceSummary": {
    "Drive Type": "4x2",
    "Engine Emission": "Euro II-Euro V",
    "Power": "300-440PS",
    "Transmission": "9F,10F,12F",
    "Front Axle": "7T-9.5T"
  },
  "recommendedSpecifications": {
    "Drive Type": "4x2",
    "Engine Emission": "Euro II-Euro V",
    "Power": "300-440PS",
    "Transmission": "9F,10F,12F",
    "Front Axle": "7T-9.5T"
  },
  "sourceDetailedRows": [
    [
      "Vehicle type",
      "Cargo Truck"
    ],
    [
      "Drive type",
      "4×2"
    ],
    [
      "Cab",
      "TX-M single bunk,TX-F single bunk,TX-U double bunk"
    ],
    [
      "Engine",
      "Emission standerd",
      "Euro II-Euro V"
    ],
    [
      "Power",
      "300-440PS"
    ],
    [
      "Transmission",
      "9F,10F,12F"
    ],
    [
      "Front axle",
      "7T-9.5T"
    ],
    [
      "Rear axle",
      "13T-16T/AXLE"
    ],
    [
      "Tyre",
      "12.00R20,12R22.5,315/ 80R22.5, 13R22.5 etc"
    ],
    [
      "Cargo body length",
      "7.1-9.3M"
    ]
  ],
  "safeGalleryImages": [
    "/images/products/Howo-TX-4X2-Cargo-Truck-5.jpg",
    "/images/products/Howo-TX-4X2-Cargo-Truck-4.jpg",
    "/images/products/Howo-TX-4X2-Cargo-Truck-3.jpg"
  ],
  "excludedSourceGalleryImages": [],
  "localOnlyUnverifiedGalleryImages": []
}
```

#### [howo-tx-4x2-cargo-truck](https://sinotruk.international/products/howo-tx-4x2-cargo-truck/)

- 结论：本地主要参数来自同一来源页；可作为待核验底稿，但 Performance 仍是方向盘通用模板，需按本车型重写。
- 来源标题：`Howo TX 4X2 Cargo Truck`；本地标题：`Howo TX 4X2 Cargo Truck`。
- 来源参数表：10 行，已在下方完整保留。

```json
{
  "slug": "howo-tx-4x2-cargo-truck",
  "sourceUrl": "https://sinotruk.international/products/howo-tx-4x2-cargo-truck/",
  "category": "heavy-truck",
  "subcategory": "cargo-truck",
  "title": "Howo TX 4X2 Cargo Truck",
  "sourceSummary": {
    "Drive Type": "4x2",
    "Engine Emission": "Euro II-Euro V",
    "Power": "300-440PS",
    "Transmission": "9F,10F,12F",
    "Front Axle": "7T-9.5T"
  },
  "recommendedSpecifications": {
    "Drive Type": "4x2",
    "Engine Emission": "Euro II-Euro V",
    "Power": "300-440PS",
    "Transmission": "9F,10F,12F",
    "Front Axle": "7T-9.5T"
  },
  "sourceDetailedRows": [
    [
      "Vehicle type",
      "Cargo Truck"
    ],
    [
      "Drive type",
      "4×2"
    ],
    [
      "Cab",
      "TX-M single bunk,TX-F single bunk,TX-U double bunk"
    ],
    [
      "Engine",
      "Emission standerd",
      "Euro II-Euro V"
    ],
    [
      "Power",
      "300-440PS"
    ],
    [
      "Transmission",
      "9F,10F,12F"
    ],
    [
      "Front axle",
      "7T-9.5T"
    ],
    [
      "Rear axle",
      "13T-16T/AXLE"
    ],
    [
      "Tyre",
      "12.00R20,12R22.5,315/ 80R22.5, 13R22.5 etc"
    ],
    [
      "Cargo body length",
      "7.1-9.3M"
    ]
  ],
  "safeGalleryImages": [
    "/images/products/Howo-TX-4X2-Cargo-Truck-1.jpg",
    "/images/products/Howo-TX-4X2-Cargo-Truck.jpg",
    "/images/products/Howo-TX-4X2-Cargo-Truck-2.jpg"
  ],
  "excludedSourceGalleryImages": [],
  "localOnlyUnverifiedGalleryImages": []
}
```

#### [howo-tx-8x4-cargo-truck](https://sinotruk.international/products/howo-tx-8x4-cargo-truck/)

- 结论：本地主要参数来自同一来源页；可作为待核验底稿，但 Performance 仍是方向盘通用模板，需按本车型重写。
- 来源标题：`Howo TX 8X4 Cargo Truck`；本地标题：`Howo TX 8X4 Cargo Truck`。
- 来源参数表：10 行，已在下方完整保留。

```json
{
  "slug": "howo-tx-8x4-cargo-truck",
  "sourceUrl": "https://sinotruk.international/products/howo-tx-8x4-cargo-truck/",
  "category": "heavy-truck",
  "subcategory": "cargo-truck",
  "title": "Howo TX 8X4 Cargo Truck",
  "sourceSummary": {
    "Drive Type": "8x4",
    "Engine Emission": "Euro II-Euro V",
    "Power": "300-440PS",
    "Transmission": "9F,10F,12F,16F",
    "Front Axle": "7T-9.5T"
  },
  "recommendedSpecifications": {
    "Drive Type": "8x4",
    "Engine Emission": "Euro II-Euro V",
    "Power": "300-440PS",
    "Transmission": "9F,10F,12F,16F",
    "Front Axle": "7T-9.5T"
  },
  "sourceDetailedRows": [
    [
      "Vehicle type",
      "Cargo Truck"
    ],
    [
      "Drive type",
      "8×4"
    ],
    [
      "Cab",
      "TX-M single bunk,TX-F single bunk,TX-U double bunk"
    ],
    [
      "Engine",
      "Emission standerd",
      "Euro II-Euro V"
    ],
    [
      "Power",
      "300-440PS"
    ],
    [
      "Transmission",
      "9F,10F,12F,16F"
    ],
    [
      "Front axle",
      "7T-9.5T"
    ],
    [
      "Rear axle",
      "13T-16T/AXLE"
    ],
    [
      "Tyre",
      "12.00R20,12R22.5,315/ 80R22.5, 13R22.5 etc"
    ],
    [
      "Cargo body length",
      "7.1-9.3M"
    ]
  ],
  "safeGalleryImages": [
    "/images/products/Howo-TX-8X4-Cargo-Truck.jpg"
  ],
  "excludedSourceGalleryImages": [
    "/images/products/Howo-TX-4X2-Cargo-Truck-1.jpg",
    "/images/products/HowoTX-6X4-Tractor-Truck-10.jpg"
  ],
  "localOnlyUnverifiedGalleryImages": []
}
```

#### [howo-n-6x4-cargo-truck](https://sinotruk.international/products/howo-n-6x4-cargo-truck/)

- 结论：来源面包屑分类为空，摘要又使用与 N 8×4 自卸接近的数据；只将 Cargo 表内明确值作为待核验底稿。
- 来源标题：`Howo N 6X4 Cargo Truck`；本地标题：`Howo N 6X4 Cargo Truck`。
- 来源参数表：10 行，已在下方完整保留。

```json
{
  "slug": "howo-n-6x4-cargo-truck",
  "sourceUrl": "https://sinotruk.international/products/howo-n-6x4-cargo-truck/",
  "category": "heavy-truck",
  "subcategory": "cargo-truck",
  "title": "Howo N 6X4 Cargo Truck",
  "sourceSummary": {
    "Drive type": "6x4",
    "Dimension (mm)": "10745*2496*3668",
    "Rear Axle": "MCX16,5.72",
    "Fuel Tank (L)": "300",
    "Engine": "380/400"
  },
  "recommendedSpecifications": {
    "Drive type": "6x4",
    "Dimension (mm)": "10745*2496*3668",
    "Rear Axle": "MCX16,5.72",
    "Fuel Tank (L)": "300",
    "Engine": "380/400"
  },
  "sourceDetailedRows": [
    [
      "Vehicle type",
      "Cargo Truck"
    ],
    [
      "Drive type",
      "6×4"
    ],
    [
      "Cab",
      "H77L single bunk, H78L double bunk"
    ],
    [
      "Engine",
      "Emission standerd",
      "Euro II-Euro V"
    ],
    [
      "Power",
      "266-440PS"
    ],
    [
      "Transmission",
      "9F,10F,12F"
    ],
    [
      "Front axle",
      "7T-9.5T"
    ],
    [
      "Rear axle",
      "13T-16T/AXLE"
    ],
    [
      "Tyre",
      "12.00R20,12R22.5,315 / 80R22.5, 13R22.5 etc"
    ],
    [
      "Cargo body length",
      "8.6-9.5M"
    ]
  ],
  "safeGalleryImages": [
    "/images/products/Howo-N-6X4-Cargo-Truck.jpg",
    "/images/products/Howo-N-6X4-Cargo-Truck-1.jpg"
  ],
  "excludedSourceGalleryImages": [
    "/images/products/Howo-N-8X4-Cargo-Truck.jpg"
  ],
  "localOnlyUnverifiedGalleryImages": []
}
```

#### [howo-n-8x4-cargo-truck](https://sinotruk.international/products/howo-n-8x4-cargo-truck/)

- 结论：来源面包屑分类为空且 Gallery 混入两张 Dump Truck；安全画廊只保留当前 8×4 Cargo 图。
- 来源标题：`Howo N 8X4 Cargo Truck`；本地标题：`Howo N 8X4 Cargo Truck`。
- 来源参数表：10 行，已在下方完整保留。

```json
{
  "slug": "howo-n-8x4-cargo-truck",
  "sourceUrl": "https://sinotruk.international/products/howo-n-8x4-cargo-truck/",
  "category": "heavy-truck",
  "subcategory": "cargo-truck",
  "title": "Howo N 8X4 Cargo Truck",
  "sourceSummary": {
    "Drive type": "8x4",
    "Dimension (mm)": "10745*2496*3668",
    "Rear Axle": "MCX16,5.72",
    "Fuel Tank (L)": "300",
    "Engine": "380/400"
  },
  "recommendedSpecifications": {
    "Drive type": "8x4",
    "Dimension (mm)": "10745*2496*3668",
    "Rear Axle": "MCX16,5.72",
    "Fuel Tank (L)": "300",
    "Engine": "380/400"
  },
  "sourceDetailedRows": [
    [
      "Vehicle type",
      "Cargo Truck"
    ],
    [
      "Drive type",
      "8×4"
    ],
    [
      "Cab",
      "H77L single bunk, H78L double bunk"
    ],
    [
      "Engine",
      "Emission standerd",
      "Euro II-Euro V"
    ],
    [
      "Power",
      "266-440PS"
    ],
    [
      "Transmission",
      "9F,10F,12F"
    ],
    [
      "Front axle",
      "7T-9.5T"
    ],
    [
      "Rear axle",
      "13T-16T/AXLE"
    ],
    [
      "Tyre",
      "12.00R20,12R22.5,315/80R22.5, 13R22.5 etc"
    ],
    [
      "Cargo body length",
      "8.6-9.5M"
    ]
  ],
  "safeGalleryImages": [
    "/images/products/Howo-N-8X4-Cargo-Truck.jpg"
  ],
  "excludedSourceGalleryImages": [
    "/images/products/HOWO-N-8%c3%974-dump-truck-6.jpg",
    "/images/products/Howo-N-8X4-Dump-Truck-2.jpg"
  ],
  "localOnlyUnverifiedGalleryImages": []
}
```

### 3.2 light-truck（7 款）

#### [howo-light-cargo-truck](https://sinotruk.international/products/howo-light-cargo-truck/)

- 结论：本地与来源共用轻卡底盘模板；可保留明确的底盘参数，但厢式、栏板、冷藏、翼开启等上装参数缺失，不能由通用表猜测。
- 来源标题：`Howo Light Cargo Truck`；本地标题：`Howo Light Cargo Truck`。
- 来源参数表：11 行，已在下方完整保留。

```json
{
  "slug": "howo-light-cargo-truck",
  "sourceUrl": "https://sinotruk.international/products/howo-light-cargo-truck/",
  "category": "light-truck",
  "subcategory": "cargo-truck",
  "title": "Howo Light Cargo Truck",
  "sourceSummary": {
    "Drive type": "4x2",
    "Transmission": "5F,6F",
    "Front axle": "2.4T/2.7T",
    "Engine": "Euro II-Euro III",
    "Power": "102-116Hp"
  },
  "recommendedSpecifications": {
    "Drive type": "4x2",
    "Transmission": "5F,6F",
    "Front axle": "2.4T/2.7T",
    "Engine": "Euro II-Euro III",
    "Power": "102-116Hp"
  },
  "sourceDetailedRows": [
    [
      "Vehicle type",
      "Cargo Truck"
    ],
    [
      "Drive type",
      "4×2"
    ],
    [
      "Cab",
      "1760 (Cab width 1760MM),1880 (Cab width 1880MM)"
    ],
    [
      "Engine",
      "Emission standerd",
      "Euro II-Euro III"
    ],
    [
      "Power",
      "102-116Hp"
    ],
    [
      "Transmission",
      "5F,6F"
    ],
    [
      "Front axle",
      "2.4T/2.7T"
    ],
    [
      "Rear axle",
      "4.2T/7.2T"
    ],
    [
      "Tyre",
      "7.00R16, 7.50R16 etc."
    ],
    [
      "Loading capacity",
      "5T"
    ],
    [
      "Cargo body length",
      "4.2-5.15M"
    ]
  ],
  "safeGalleryImages": [
    "/images/products/3-Howo-Light-Cargo-Truck-1.jpg",
    "/images/products/3-Howo-Light-Cargo-Truck-4.jpg",
    "/images/products/3-Howo-Light-Cargo-Truck-3.jpg"
  ],
  "excludedSourceGalleryImages": [],
  "localOnlyUnverifiedGalleryImages": []
}
```

#### [howo-box-van-cargo-truck](https://sinotruk.international/products/howo-box-van-cargo-truck/)

- 结论：本地与来源共用轻卡底盘模板；可保留明确的底盘参数，但厢式、栏板、冷藏、翼开启等上装参数缺失，不能由通用表猜测。
- 来源标题：`Howo Box Van Cargo Truck`；本地标题：`Howo Box Van Cargo Truck`。
- 来源参数表：11 行，已在下方完整保留。

```json
{
  "slug": "howo-box-van-cargo-truck",
  "sourceUrl": "https://sinotruk.international/products/howo-box-van-cargo-truck/",
  "category": "light-truck",
  "subcategory": "cargo-truck",
  "title": "Howo Box Van Cargo Truck",
  "sourceSummary": {
    "Drive type": "4x2",
    "Transmission": "5F,6F",
    "Front axle": "2.4T/2.7T",
    "Engine": "Euro II-Euro III",
    "Power": "102-116Hp"
  },
  "recommendedSpecifications": {
    "Drive type": "4x2",
    "Transmission": "5F,6F",
    "Front axle": "2.4T/2.7T",
    "Engine": "Euro II-Euro III",
    "Power": "102-116Hp"
  },
  "sourceDetailedRows": [
    [
      "Vehicle type",
      "Cargo Truck"
    ],
    [
      "Drive type",
      "4×2"
    ],
    [
      "Cab",
      "1760 (Cab width 1760MM),1880 (Cab width 1880MM)"
    ],
    [
      "Engine",
      "Emission standerd",
      "Euro II-Euro III"
    ],
    [
      "Power",
      "102-116Hp"
    ],
    [
      "Transmission",
      "5F,6F"
    ],
    [
      "Front axle",
      "2.4T/2.7T"
    ],
    [
      "Rear axle",
      "4.2T/7.2T"
    ],
    [
      "Tyre",
      "7.00R16, 7.50R16 etc."
    ],
    [
      "Loading capacity",
      "5T"
    ],
    [
      "Cargo body length",
      "4.2-5.15M"
    ]
  ],
  "safeGalleryImages": [
    "/images/products/1-Howo-Cargo-Truck-7.jpg",
    "/images/products/1-Howo-Cargo-Truck-3.jpg"
  ],
  "excludedSourceGalleryImages": [
    "/images/products/2-Wing-Van-Truck-3.jpg"
  ],
  "localOnlyUnverifiedGalleryImages": []
}
```

#### [howo-light-stake-truck](https://sinotruk.international/products/howo-light-stake-truck/)

- 结论：本地与来源共用轻卡底盘模板；可保留明确的底盘参数，但厢式、栏板、冷藏、翼开启等上装参数缺失，不能由通用表猜测。
- 来源标题：`Howo Light Stake Truck`；本地标题：`Howo Light Stake Truck`。
- 来源参数表：11 行，已在下方完整保留。

```json
{
  "slug": "howo-light-stake-truck",
  "sourceUrl": "https://sinotruk.international/products/howo-light-stake-truck/",
  "category": "light-truck",
  "subcategory": "cargo-truck",
  "title": "Howo Light Stake Truck",
  "sourceSummary": {
    "Drive type": "4x2",
    "Transmission": "5F,6F",
    "Front axle": "2.4T/2.7T",
    "Engine": "Euro II-Euro III",
    "Power": "102-116Hp"
  },
  "recommendedSpecifications": {
    "Drive type": "4x2",
    "Transmission": "5F,6F",
    "Front axle": "2.4T/2.7T",
    "Engine": "Euro II-Euro III",
    "Power": "102-116Hp"
  },
  "sourceDetailedRows": [
    [
      "Vehicle type",
      "Cargo Truck"
    ],
    [
      "Drive type",
      "4×2"
    ],
    [
      "Cab",
      "1760 (Cab width 1760MM),1880 (Cab width 1880MM)"
    ],
    [
      "Engine",
      "Emission standerd",
      "Euro II-Euro III"
    ],
    [
      "Power",
      "102-116Hp"
    ],
    [
      "Transmission",
      "5F,6F"
    ],
    [
      "Front axle",
      "2.4T/2.7T"
    ],
    [
      "Rear axle",
      "4.2T/7.2T"
    ],
    [
      "Tyre",
      "7.00R16, 7.50R16 etc."
    ],
    [
      "Loading capacity",
      "5T"
    ],
    [
      "Cargo body length",
      "4.2-5.15M"
    ]
  ],
  "safeGalleryImages": [
    "/images/products/4-Howo-Light-Stake-Truck-1.jpg",
    "/images/products/4-Howo-Light-Stake-Truck-2.jpg"
  ],
  "excludedSourceGalleryImages": [],
  "localOnlyUnverifiedGalleryImages": []
}
```

#### [howo-refrigerator-cargo-truck](https://sinotruk.international/products/howo-refrigerator-cargo-truck/)

- 结论：本地与来源共用轻卡底盘模板；可保留明确的底盘参数，但厢式、栏板、冷藏、翼开启等上装参数缺失，不能由通用表猜测。
- 来源标题：`Howo Refrigerator Cargo Truck`；本地标题：`Howo Refrigerator Cargo Truck`。
- 来源参数表：11 行，已在下方完整保留。

```json
{
  "slug": "howo-refrigerator-cargo-truck",
  "sourceUrl": "https://sinotruk.international/products/howo-refrigerator-cargo-truck/",
  "category": "light-truck",
  "subcategory": "cargo-truck",
  "title": "Howo Refrigerator Cargo Truck",
  "sourceSummary": {
    "Drive type": "4x2",
    "Transmission": "5F,6F",
    "Front axle": "2.4T/2.7T",
    "Engine": "Euro II-Euro III",
    "Power": "102-116Hp"
  },
  "recommendedSpecifications": {
    "Drive type": "4x2",
    "Transmission": "5F,6F",
    "Front axle": "2.4T/2.7T",
    "Engine": "Euro II-Euro III",
    "Power": "102-116Hp"
  },
  "sourceDetailedRows": [
    [
      "Vehicle type",
      "Cargo Truck"
    ],
    [
      "Drive type",
      "4×2"
    ],
    [
      "Cab",
      "1760 (Cab width 1760MM),1880 (Cab width 1880MM)"
    ],
    [
      "Engine",
      "Emission standerd",
      "Euro II-Euro III"
    ],
    [
      "Power",
      "102-116Hp"
    ],
    [
      "Transmission",
      "5F,6F"
    ],
    [
      "Front axle",
      "2.4T/2.7T"
    ],
    [
      "Rear axle",
      "4.2T/7.2T"
    ],
    [
      "Tyre",
      "7.00R16, 7.50R16 etc."
    ],
    [
      "Loading capacity",
      "5T"
    ],
    [
      "Cargo body length",
      "4.2-5.15M"
    ]
  ],
  "safeGalleryImages": [
    "/images/products/1-Howo-Cargo-Truck-Refrigerator-1.jpg",
    "/images/products/1-Howo-Cargo-Truck-Refrigerator-2.jpg"
  ],
  "excludedSourceGalleryImages": [],
  "localOnlyUnverifiedGalleryImages": []
}
```

#### [howo-wing-van-cargo-truck](https://sinotruk.international/products/howo-wing-van-cargo-truck/)

- 结论：本地与来源共用轻卡底盘模板；可保留明确的底盘参数，但厢式、栏板、冷藏、翼开启等上装参数缺失，不能由通用表猜测。
- 来源标题：`Howo Wing Van Cargo Truck`；本地标题：`Howo Wing Van Cargo Truck`。
- 来源参数表：11 行，已在下方完整保留。

```json
{
  "slug": "howo-wing-van-cargo-truck",
  "sourceUrl": "https://sinotruk.international/products/howo-wing-van-cargo-truck/",
  "category": "light-truck",
  "subcategory": "cargo-truck",
  "title": "Howo Wing Van Cargo Truck",
  "sourceSummary": {
    "Drive type": "4x2",
    "Transmission": "5F,6F",
    "Front axle": "2.4T/2.7T",
    "Engine": "Euro II-Euro III",
    "Power": "102-116Hp"
  },
  "recommendedSpecifications": {
    "Drive type": "4x2",
    "Transmission": "5F,6F",
    "Front axle": "2.4T/2.7T",
    "Engine": "Euro II-Euro III",
    "Power": "102-116Hp"
  },
  "sourceDetailedRows": [
    [
      "Vehicle type",
      "Cargo Truck"
    ],
    [
      "Drive type",
      "4×2"
    ],
    [
      "Cab",
      "1760 (Cab width 1760MM),1880 (Cab width 1880MM)"
    ],
    [
      "Engine",
      "Emission standerd",
      "Euro II-Euro III"
    ],
    [
      "Power",
      "102-116Hp"
    ],
    [
      "Transmission",
      "5F,6F"
    ],
    [
      "Front axle",
      "2.4T/2.7T"
    ],
    [
      "Rear axle",
      "4.2T/7.2T"
    ],
    [
      "Tyre",
      "7.00R16, 7.50R16 etc."
    ],
    [
      "Loading capacity",
      "5T"
    ],
    [
      "Cargo body length",
      "4.2-5.15M"
    ]
  ],
  "safeGalleryImages": [
    "/images/products/2-Wing-Van-Truck-2.jpg",
    "/images/products/2-Wing-Van-Truck-1.jpg",
    "/images/products/2-Wing-Van-Truck-3.jpg"
  ],
  "excludedSourceGalleryImages": [],
  "localOnlyUnverifiedGalleryImages": []
}
```

#### [howo-mini-tipper-truck](https://sinotruk.international/products/howo-mini-tipper-truck/)

- 结论：本地与来源共用轻卡底盘模板；可保留明确的底盘参数，但厢式、栏板、冷藏、翼开启等上装参数缺失，不能由通用表猜测。
- 来源标题：`Howo Mini Tipper Truck`；本地标题：`Howo Mini Tipper Truck`。
- 来源参数表：14 行，已在下方完整保留。

```json
{
  "slug": "howo-mini-tipper-truck",
  "sourceUrl": "https://sinotruk.international/products/howo-mini-tipper-truck/",
  "category": "light-truck",
  "subcategory": "tipper-truck",
  "title": "Howo Mini Tipper Truck",
  "sourceSummary": {
    "Drive type": "4x2",
    "Emission": "EURO3-4",
    "Dimension (mm)": "7000×2496×2700",
    "Engine": "Euro II-Euro III",
    "Power": "140-180hp"
  },
  "recommendedSpecifications": {
    "Drive type": "4x2",
    "Emission": "EURO3-4",
    "Dimension (mm)": "7000×2496×2700",
    "Engine": "Euro II-Euro III",
    "Power": "140-180hp"
  },
  "sourceDetailedRows": [
    [
      "ITEM",
      "4×2 MINI Tipper Truck"
    ],
    [
      "Series",
      "HOWO MINI tipper Truck"
    ],
    [
      "Number of tire",
      "6 wheel"
    ],
    [
      "Dimension (mm)",
      "7000×2496×2700"
    ],
    [
      "Wheel base (mm)",
      "3800"
    ],
    [
      "Curb weight (kg)",
      "4895"
    ],
    [
      "Max load (kg)",
      "10000"
    ],
    [
      "Engine brand",
      "YUCHAI (EURO3)/MAN ENGINE (EURO4)"
    ],
    [
      "Emission",
      "EURO3-4"
    ],
    [
      "Power",
      "140-180hp"
    ],
    [
      "Mini tipper truck Gearbox",
      "6 speed gear, option 10 speed with high and low gear."
    ],
    [
      "Mini tipper truck axle",
      "Front 3.2 tons/Rear 8 tons"
    ],
    [
      "Mini tipper truck tire",
      "8.25R20"
    ],
    [
      "Mini tipper truck cab",
      "2080 mini tipper truck cabin single and half row."
    ]
  ],
  "safeGalleryImages": [
    "/images/products/Tipper-Truck-1.jpg",
    "/images/products/Tipper-Truck-2.jpg",
    "/images/products/Tipper-Truck.jpg"
  ],
  "excludedSourceGalleryImages": [],
  "localOnlyUnverifiedGalleryImages": []
}
```

#### [howo-light-duty-tipper-truck](https://sinotruk.international/products/howo-light-duty-tipper-truck/)

- 结论：本地与来源共用轻卡底盘模板；可保留明确的底盘参数，但厢式、栏板、冷藏、翼开启等上装参数缺失，不能由通用表猜测。
- 来源标题：`Howo Light Duty Tipper Truck`；本地标题：`Howo Light Duty Tipper Truck`。
- 来源参数表：14 行，已在下方完整保留。

```json
{
  "slug": "howo-light-duty-tipper-truck",
  "sourceUrl": "https://sinotruk.international/products/howo-light-duty-tipper-truck/",
  "category": "light-truck",
  "subcategory": "tipper-truck",
  "title": "Howo Light Duty Tipper Truck",
  "sourceSummary": {
    "Drive type": "4x2",
    "Emission": "EURO3-4",
    "Dimension (mm)": "7000×2496×2700",
    "Engine": "Euro II-Euro III",
    "Power": "140-180hp"
  },
  "recommendedSpecifications": {
    "Drive type": "4x2",
    "Emission": "EURO3-4",
    "Dimension (mm)": "7000×2496×2700",
    "Engine": "Euro II-Euro III",
    "Power": "140-180hp"
  },
  "sourceDetailedRows": [
    [
      "ITEM",
      "4×2 Tipper Truck"
    ],
    [
      "Series",
      "HOWO Tipper Truck"
    ],
    [
      "Number of tire",
      "6 wheel"
    ],
    [
      "Dimension (mm)",
      "7000×2496×2700"
    ],
    [
      "Wheel base (mm)",
      "3800"
    ],
    [
      "Curb weight (kg)",
      "4895"
    ],
    [
      "Max load (kg)",
      "10000"
    ],
    [
      "Engine brand",
      "YUCHAI (EURO3)/MAN ENGINE (EURO4)"
    ],
    [
      "Emission",
      "EURO3-4"
    ],
    [
      "Power",
      "140-180hp"
    ],
    [
      "Mini tipper truck Gearbox",
      "6 speed gear, option 10 speed with high and low gear."
    ],
    [
      "Mini tipper truck axle",
      "Front 3.2 tons/Rear 8 tons"
    ],
    [
      "Mini tipper truck tire",
      "8.25R20"
    ],
    [
      "Mini tipper truck cab",
      "2080 mini tipper truck cabin single and half row."
    ]
  ],
  "safeGalleryImages": [
    "/images/products/Tipper-Truck-3.jpg",
    "/images/products/Tipper-Truck-1.jpg",
    "/images/products/Tipper-Truck.jpg"
  ],
  "excludedSourceGalleryImages": [],
  "localOnlyUnverifiedGalleryImages": []
}
```

### 3.3 special-vehicle（17 款）

#### [sinotruck-howo-water-tanker-2](https://sinotruk.international/products/sinotruck-howo-water-tanker-2/)

- 结论：来源 `-2` 页面与无后缀水罐页使用同一套 1-Water 图片和参数，无法证明是独立型号；建议合并/规范 canonical，不能制造第二套独立详情。
- 来源标题：`Sinotruck Howo Water Tanker`；本地标题：`Sinotruck Howo Water Tanker`。
- 来源参数表：25 行，已在下方完整保留。

```json
{
  "slug": "sinotruck-howo-water-tanker-2",
  "sourceUrl": "https://sinotruk.international/products/sinotruck-howo-water-tanker-2/",
  "category": "special-vehicle",
  "subcategory": "water-tanker",
  "title": "Sinotruck Howo Water Tanker",
  "sourceSummary": {
    "Cabin": "HW 76 cab",
    "Engine": "WD615.69",
    "Gearbox": "10 Forwards gear & 2 reverse gear",
    "Engine Horse Power": "336 HP",
    "Payload": "13750"
  },
  "recommendedSpecifications": {
    "Cabin": "HW 76 cab",
    "Engine": "WD615.69",
    "Gearbox": "10 Forwards gear & 2 reverse gear",
    "Engine Horse Power": "336 HP",
    "Payload": "13750"
  },
  "sourceDetailedRows": [
    [
      "Cabin",
      "HW 76 cab, with one bed and air condition,"
    ],
    [
      "70°hydraulically tillable to the front as attached photo for ref."
    ],
    [
      "Vehicle Main Dimensions",
      "Overall dimensions (L x W x H) mm",
      "11690× 2496× 3300"
    ],
    [
      "Wheel base (mm)",
      "1800+ 4600+ 1350"
    ],
    [
      "Wheel track ( front/rear) (mm)",
      "2022/ 1830"
    ],
    [
      "Approach / Departure angle(°)",
      "16/19"
    ],
    [
      "Weight in KGS",
      "Tare Weight",
      "14000 （According to the volume ）"
    ],
    [
      "Payload",
      "13750"
    ],
    [
      "Front axles loading capacity",
      "2×9000"
    ],
    [
      "Rear axles loading capacity",
      "2×16000"
    ],
    [
      "Engine",
      "Brand",
      "Sinotruk"
    ],
    [
      "Model",
      "WD615.69"
    ],
    [
      "Type",
      "4-stroke direct injection ,"
    ],
    [
      "6-cylinder in-line,"
    ],
    [
      "turbo-charging and inter-cooling"
    ],
    [
      "Horse Power （HP)",
      "336 HP （According to the volume ）"
    ],
    [
      "Emission standard",
      "Euro2 （Euro3,4 is optional ）"
    ],
    [
      "Gearbox",
      "10 Forwards gear & 2 reverse gear"
    ],
    [
      "Steering",
      "power steering ZF8098 from Germany"
    ],
    [
      "Tire",
      "12.00-20 bias tyre （Optional ）"
    ],
    [
      "Optional",
      "15,000 -25,000 liters, tank thickness is 4 mm, seal is 5 mm"
    ],
    [
      "Equipped with front(rear,side)sprinkler(sprinkling width ＞14m )"
    ],
    [
      "Equipped with rear working platform with water cannon (range ＞28m)"
    ],
    [
      "Equipped with pump(suction lift ＞6m)"
    ],
    [
      "Equipped with fire valve,water valve,and filter gauze"
    ]
  ],
  "safeGalleryImages": [
    "/images/products/1-Water-Tanker-3.jpg",
    "/images/products/1-Water-Tanker-1.jpg",
    "/images/products/1-Water-Tanker-2.jpg",
    "/images/products/1-Water-Tanker-6.jpg",
    "/images/products/1-Water-Tanker-4.jpg",
    "/images/products/1-Water-Tanker-5.jpg"
  ],
  "excludedSourceGalleryImages": [],
  "localOnlyUnverifiedGalleryImages": [
    "/images/products/2-Water-Tanker-1.jpg",
    "/images/products/2-Water-Tanker-2.jpg",
    "/images/products/2-Water-Tanker-5.jpg",
    "/images/products/2-Water-Tanker-3.jpg",
    "/images/products/2-Water-Tanker-6.jpg",
    "/images/products/2-Water-Tanker-4.jpg"
  ]
}
```

#### [sinotruck-howo-oil-tanker](https://sinotruk.international/products/sinotruck-howo-oil-tanker/)

- 结论：本地为水罐模板；来源有油罐车型摘要和 7 行表，可替换为来源原始行并人工确认罐体参数。
- 来源标题：`Sinotruck Howo Oil Tanker`；本地标题：`Sinotruck Howo Oil Tanker`。
- 来源参数表：7 行，已在下方完整保留。

```json
{
  "slug": "sinotruck-howo-oil-tanker",
  "sourceUrl": "https://sinotruk.international/products/sinotruck-howo-oil-tanker/",
  "category": "special-vehicle",
  "subcategory": "oil-tanker",
  "title": "Sinotruck Howo Oil Tanker",
  "sourceSummary": {
    "Engine": "MC07H.35-60",
    "Rear axle ratio": "5.32",
    "Gearbox": "HW25712XSTL",
    "Engine Horse Power": "336 HP",
    "Fuel tank (L)": "400"
  },
  "recommendedSpecifications": {
    "Engine": "MC07H.35-60",
    "Rear axle ratio": "5.32",
    "Gearbox": "HW25712XSTL",
    "Engine Horse Power": "336 HP",
    "Fuel tank (L)": "400"
  },
  "sourceDetailedRows": [
    [
      "Engine model",
      "MC07H.35-60/WP9H350E62"
    ],
    [
      "Gearbox",
      "HW25712XSTL"
    ],
    [
      "Rear axle model",
      "MAT16ZG self-adjusting double rear axle (drum)"
    ],
    [
      "Rear axle ratio",
      "5.32"
    ],
    [
      "Fuel tank (L)",
      "400"
    ],
    [
      "Suspension (front and rear air suspension)",
      "4/4/-/-"
    ],
    [
      "Tire",
      "12R22.5"
    ]
  ],
  "safeGalleryImages": [
    "/images/products/8-howo-oil-tanker-2.jpg",
    "/images/products/8-howo-oil-tanker-3.jpg",
    "/images/products/8-howo-oil-tanker-4.jpg"
  ],
  "excludedSourceGalleryImages": [],
  "localOnlyUnverifiedGalleryImages": [
    "/images/products/1-Oil-Tanker-2.jpg",
    "/images/products/1-Oil-Tanker-1.jpg",
    "/images/products/1-Oil-Tanker-3.jpg",
    "/images/products/1-Oil-Tanker-6.jpg",
    "/images/products/1-Oil-Tanker-4.jpg",
    "/images/products/1-Oil-Tanker-5.jpg"
  ]
}
```

#### [sinotruck-howo-8x4-oil-tanker](https://sinotruk.international/products/sinotruck-howo-8x4-oil-tanker/)

- 结论：本地为水罐模板；来源四个油罐页摘要/表高度相同，8×4 差异未被参数表充分表达，需确认驱动和罐体。
- 来源标题：`Sinotruck Howo 8X4 Oil Tanker`；本地标题：`Sinotruck Howo 8X4 Oil Tanker`。
- 来源参数表：7 行，已在下方完整保留。

```json
{
  "slug": "sinotruck-howo-8x4-oil-tanker",
  "sourceUrl": "https://sinotruk.international/products/sinotruck-howo-8x4-oil-tanker/",
  "category": "special-vehicle",
  "subcategory": "oil-tanker",
  "title": "Sinotruck Howo 8X4 Oil Tanker",
  "sourceSummary": {
    "Engine": "MC07H.35-60",
    "Rear axle ratio": "5.32",
    "Gearbox": "HW25712XSTL",
    "Engine Horse Power": "336 HP",
    "Fuel tank (L)": "400"
  },
  "recommendedSpecifications": {
    "Engine": "MC07H.35-60",
    "Rear axle ratio": "5.32",
    "Gearbox": "HW25712XSTL",
    "Engine Horse Power": "336 HP",
    "Fuel tank (L)": "400"
  },
  "sourceDetailedRows": [
    [
      "Engine model",
      "MC07H.35-60/WP9H350E62"
    ],
    [
      "Gearbox",
      "HW25712XSTL"
    ],
    [
      "Rear axle model",
      "MAT16ZG self-adjusting double rear axle (drum)"
    ],
    [
      "Rear axle ratio",
      "5.32"
    ],
    [
      "Fuel tank (L)",
      "400"
    ],
    [
      "Suspension (front and rear air suspension)",
      "4/4/-/-"
    ],
    [
      "Tire",
      "12R22.5"
    ]
  ],
  "safeGalleryImages": [
    "/images/products/8-howo-oil-tanker-1.jpg",
    "/images/products/8-howo-oil-tanker-3.jpg",
    "/images/products/8-howo-oil-tanker-4.jpg"
  ],
  "excludedSourceGalleryImages": [],
  "localOnlyUnverifiedGalleryImages": [
    "/images/products/2-Oil-Tanker-1.jpg",
    "/images/products/2-Oil-Tanker-2.jpg",
    "/images/products/2-Oil-Tanker-5.jpg",
    "/images/products/2-Oil-Tanker-3.jpg",
    "/images/products/2-Oil-Tanker-6.jpg",
    "/images/products/2-Oil-Tanker-4.jpg"
  ]
}
```

#### [sinotruck-howo-6x4-oil-tanker](https://sinotruk.international/products/sinotruck-howo-6x4-oil-tanker/)

- 结论：本地为水罐模板；来源四个油罐页摘要/表高度相同，需确认该 slug 的实际配置。
- 来源标题：`Sinotruck Howo 6X4 Oil Tanker`；本地标题：`Sinotruck Howo 6X4 Oil Tanker`。
- 来源参数表：7 行，已在下方完整保留。

```json
{
  "slug": "sinotruck-howo-6x4-oil-tanker",
  "sourceUrl": "https://sinotruk.international/products/sinotruck-howo-6x4-oil-tanker/",
  "category": "special-vehicle",
  "subcategory": "oil-tanker",
  "title": "Sinotruck Howo 6X4 Oil Tanker",
  "sourceSummary": {
    "Engine": "MC07H.35-60",
    "Rear axle ratio": "5.32",
    "Gearbox": "HW25712XSTL",
    "Engine Horse Power": "336 HP",
    "Fuel tank (L)": "400"
  },
  "recommendedSpecifications": {
    "Engine": "MC07H.35-60",
    "Rear axle ratio": "5.32",
    "Gearbox": "HW25712XSTL",
    "Engine Horse Power": "336 HP",
    "Fuel tank (L)": "400"
  },
  "sourceDetailedRows": [
    [
      "Engine model",
      "MC07H.35-60/WP9H350E62"
    ],
    [
      "Gearbox",
      "HW25712XSTL"
    ],
    [
      "Rear axle model",
      "MAT16ZG self-adjusting double rear axle (drum)"
    ],
    [
      "Rear axle ratio",
      "5.32"
    ],
    [
      "Fuel tank (L)",
      "400"
    ],
    [
      "Suspension (front and rear air suspension)",
      "4/4/-/-"
    ],
    [
      "Tire",
      "12R22.5"
    ]
  ],
  "safeGalleryImages": [
    "/images/products/8-howo-oil-tanker-2.jpg",
    "/images/products/8-howo-oil-tanker-3.jpg",
    "/images/products/8-howo-oil-tanker-4.jpg"
  ],
  "excludedSourceGalleryImages": [],
  "localOnlyUnverifiedGalleryImages": [
    "/images/products/3-Oil-Tanker-1.jpg",
    "/images/products/3-Oil-Tanker-2.jpg",
    "/images/products/3-Oil-Tanker-5.jpg",
    "/images/products/3-Oil-Tanker-3.jpg",
    "/images/products/3-Oil-Tanker-6.jpg",
    "/images/products/3-Oil-Tanker-4.jpg"
  ]
}
```

#### [sinotruck-howo-6x4-oil-tanker-2](https://sinotruk.international/products/sinotruck-howo-6x4-oil-tanker-2/)

- 结论：与另一个 6×4 油罐页标题和参数重复；应确认是否独立车型或做 canonical 合并。
- 来源标题：`Sinotruck Howo 6X4 Oil Tanker`；本地标题：`Sinotruck Howo 6X4 Oil Tanker`。
- 来源参数表：7 行，已在下方完整保留。

```json
{
  "slug": "sinotruck-howo-6x4-oil-tanker-2",
  "sourceUrl": "https://sinotruk.international/products/sinotruck-howo-6x4-oil-tanker-2/",
  "category": "special-vehicle",
  "subcategory": "oil-tanker",
  "title": "Sinotruck Howo 6X4 Oil Tanker",
  "sourceSummary": {
    "Engine": "MC07H.35-60",
    "Rear axle ratio": "5.32",
    "Gearbox": "HW25712XSTL",
    "Engine Horse Power": "336 HP",
    "Fuel tank (L)": "400"
  },
  "recommendedSpecifications": {
    "Engine": "MC07H.35-60",
    "Rear axle ratio": "5.32",
    "Gearbox": "HW25712XSTL",
    "Engine Horse Power": "336 HP",
    "Fuel tank (L)": "400"
  },
  "sourceDetailedRows": [
    [
      "Engine model",
      "MC07H.35-60/WP9H350E62"
    ],
    [
      "Gearbox",
      "HW25712XSTL"
    ],
    [
      "Rear axle model",
      "MAT16ZG self-adjusting double rear axle (drum)"
    ],
    [
      "Rear axle ratio",
      "5.32"
    ],
    [
      "Fuel tank (L)",
      "400"
    ],
    [
      "Suspension (front and rear air suspension)",
      "4/4/-/-"
    ],
    [
      "Tire",
      "12R22.5"
    ]
  ],
  "safeGalleryImages": [
    "/images/products/8-howo-oil-tanker-2.jpg",
    "/images/products/8-howo-oil-tanker-3.jpg",
    "/images/products/8-howo-oil-tanker-4.jpg"
  ],
  "excludedSourceGalleryImages": [],
  "localOnlyUnverifiedGalleryImages": [
    "/images/products/4-Oil-Tanker-1.jpg",
    "/images/products/4-Oil-Tanker-2.jpg",
    "/images/products/4-Oil-Tanker-5.jpg",
    "/images/products/4-Oil-Tanker-3.jpg",
    "/images/products/4-Oil-Tanker-6.jpg",
    "/images/products/4-Oil-Tanker-4.jpg"
  ]
}
```

#### [howo-mixer-truck-n-6x4](https://sinotruk.international/products/howo-mixer-truck-n-6x4/)

- 结论：本地为油罐/水罐模板；采用来源搅拌车表，Gallery 改为来源 N 系列图片。
- 来源标题：`Howo Mixer Truck N 6X4`；本地标题：`Howo Mixer Truck N 6X4`。
- 来源参数表：10 行，已在下方完整保留。

```json
{
  "slug": "howo-mixer-truck-n-6x4",
  "sourceUrl": "https://sinotruk.international/products/howo-mixer-truck-n-6x4/",
  "category": "special-vehicle",
  "subcategory": "mixer-truck",
  "title": "Howo Mixer Truck N 6X4",
  "sourceSummary": {
    "Drive type": "6x4",
    "Engine": "Euro II-Euro V",
    "Volume": "12-16CBM",
    "Fuel tank (L)": "400",
    "Power": "266-440PS"
  },
  "recommendedSpecifications": {
    "Drive type": "6x4",
    "Engine": "Euro II-Euro V",
    "Volume": "12-16CBM",
    "Fuel tank (L)": "400",
    "Power": "266-440PS"
  },
  "sourceDetailedRows": [
    [
      "Vehicle type",
      "Howo Mixer Truck N 6X4"
    ],
    [
      "Drive type",
      "6×4"
    ],
    [
      "Cab",
      "H77L(single sleeper）"
    ],
    [
      "Engine",
      "Emission standerd",
      "Euro II-Euro V"
    ],
    [
      "Power",
      "266-440PS"
    ],
    [
      "Transmission",
      "9F,10F,12F"
    ],
    [
      "Front axle",
      "9.5T+9.5T"
    ],
    [
      "Rear axle",
      "16T+16T"
    ],
    [
      "Tyre",
      "12.00R20,12R22.5,315/80R22.5 etc."
    ],
    [
      "Volume of body",
      "12-16CBM"
    ]
  ],
  "safeGalleryImages": [
    "/images/products/6-Mixer-Truck-N-1.jpg",
    "/images/products/6-Mixer-Truck-N-2.jpg",
    "/images/products/6-Mixer-Truck-N-3.jpg"
  ],
  "excludedSourceGalleryImages": [],
  "localOnlyUnverifiedGalleryImages": [
    "/images/products/3-Mixer-Truck-1.jpg",
    "/images/products/3-Mixer-Truck-2.jpg",
    "/images/products/3-Mixer-Truck-5.jpg",
    "/images/products/3-Mixer-Truck-3.jpg",
    "/images/products/3-Mixer-Truck-6.jpg",
    "/images/products/3-Mixer-Truck-4.jpg"
  ]
}
```

#### [howo-mixer-truck-n-8x4](https://sinotruk.international/products/howo-mixer-truck-n-8x4/)

- 结论：本地为油罐/水罐模板；采用来源搅拌车表，驱动形式必须保留 8×4。
- 来源标题：`Howo Mixer Truck N 8X4`；本地标题：`Howo Mixer Truck N 8X4`。
- 来源参数表：10 行，已在下方完整保留。

```json
{
  "slug": "howo-mixer-truck-n-8x4",
  "sourceUrl": "https://sinotruk.international/products/howo-mixer-truck-n-8x4/",
  "category": "special-vehicle",
  "subcategory": "mixer-truck",
  "title": "Howo Mixer Truck N 8X4",
  "sourceSummary": {
    "Drive type": "8x4",
    "Engine": "Euro II-Euro V",
    "Volume": "12-16CBM",
    "Fuel tank (L)": "400",
    "Power": "266-440PS"
  },
  "recommendedSpecifications": {
    "Drive type": "8x4",
    "Engine": "Euro II-Euro V",
    "Volume": "12-16CBM",
    "Fuel tank (L)": "400",
    "Power": "266-440PS"
  },
  "sourceDetailedRows": [
    [
      "Vehicle type",
      "Howo Mixer Truck N 8X4"
    ],
    [
      "Drive type",
      "8×4"
    ],
    [
      "Cab",
      "H77L(single sleeper）"
    ],
    [
      "Engine",
      "Emission standerd",
      "Euro II-Euro V"
    ],
    [
      "Power",
      "266-440PS"
    ],
    [
      "Transmission",
      "9F,10F,12F"
    ],
    [
      "Front axle",
      "9.5T+9.5T"
    ],
    [
      "Rear axle",
      "16T+16T"
    ],
    [
      "Tyre",
      "12.00R20,12R22.5,315/80R22.5 etc."
    ],
    [
      "Volume of body",
      "12-16CBM"
    ]
  ],
  "safeGalleryImages": [
    "/images/products/6-Mixer-Truck-N-2.jpg",
    "/images/products/6-Mixer-Truck-N-3.jpg",
    "/images/products/6-Mixer-Truck-N-1.jpg"
  ],
  "excludedSourceGalleryImages": [],
  "localOnlyUnverifiedGalleryImages": [
    "/images/products/6-Mixer-Truck-N-5.jpg",
    "/images/products/6-Mixer-Truck-N-6.jpg",
    "/images/products/6-Mixer-Truck-N-4.jpg"
  ]
}
```

#### [howo-mixer-truck-tx-8x4](https://sinotruk.international/products/howo-mixer-truck-tx-8x4/)

- 结论：本地为油罐/水罐模板；采用来源 TX 8×4 表和 TX 图片。
- 来源标题：`Howo Mixer Truck TX 8X4`；本地标题：`Howo Mixer Truck TX 8X4`。
- 来源参数表：10 行，已在下方完整保留。

```json
{
  "slug": "howo-mixer-truck-tx-8x4",
  "sourceUrl": "https://sinotruk.international/products/howo-mixer-truck-tx-8x4/",
  "category": "special-vehicle",
  "subcategory": "mixer-truck",
  "title": "Howo Mixer Truck TX 8X4",
  "sourceSummary": {
    "Drive type": "8x4",
    "Engine": "Euro II-Euro V",
    "Volume": "12-16CBM",
    "Fuel tank (L)": "400",
    "Power": "266-440PS"
  },
  "recommendedSpecifications": {
    "Drive type": "8x4",
    "Engine": "Euro II-Euro V",
    "Volume": "12-16CBM",
    "Fuel tank (L)": "400",
    "Power": "266-440PS"
  },
  "sourceDetailedRows": [
    [
      "Vehicle type",
      "Howo Mixer Truck N 8X4"
    ],
    [
      "Drive type",
      "8×4"
    ],
    [
      "Cab",
      "TX-M(525MM single bunk),TX-F(749MM single bunk)"
    ],
    [
      "Engine",
      "Emission standerd",
      "Euro II-Euro V"
    ],
    [
      "Power",
      "300-440PS"
    ],
    [
      "Transmission",
      "9F,10F,12F"
    ],
    [
      "Front axle",
      "9.5T+9.5T"
    ],
    [
      "Rear axle",
      "16T+16T"
    ],
    [
      "Tyre",
      "12.00R20,12R22.5,315/80R22.5 etc."
    ],
    [
      "Volume of body",
      "12-16CBM"
    ]
  ],
  "safeGalleryImages": [
    "/images/products/7-Mixer-Truck-tx-4.jpg",
    "/images/products/7-Mixer-Truck-tx-3.jpg",
    "/images/products/7-Mixer-Truck-tx-2.jpg"
  ],
  "excludedSourceGalleryImages": [],
  "localOnlyUnverifiedGalleryImages": [
    "/images/products/7-Mixer-Truck-tx-1.jpg",
    "/images/products/7-Mixer-Truck-tx-5.jpg",
    "/images/products/7-Mixer-Truck-tx-6.jpg"
  ]
}
```

#### [howo-mixer-truck-t7h-6x4](https://sinotruk.international/products/howo-mixer-truck-t7h-6x4/)

- 结论：来源 Gallery 第三张为 3-Mixer，不属于 T7H 前缀；排除。
- 来源标题：`Howo Mixer Truck T7H 6X4`；本地标题：`Howo Mixer Truck T7H 6X4`。
- 来源参数表：22 行，已在下方完整保留。

```json
{
  "slug": "howo-mixer-truck-t7h-6x4",
  "sourceUrl": "https://sinotruk.international/products/howo-mixer-truck-t7h-6x4/",
  "category": "special-vehicle",
  "subcategory": "mixer-truck",
  "title": "Howo Mixer Truck T7H 6X4",
  "sourceSummary": {
    "Drive type": "6x4",
    "Engine": "Euro III",
    "Volume": "12 CBM",
    "Fuel tank (L)": "400",
    "Horse Power": "390hp"
  },
  "recommendedSpecifications": {
    "Drive type": "6x4",
    "Engine": "Euro III",
    "Volume": "12 CBM",
    "Fuel tank (L)": "400",
    "Horse Power": "390hp"
  },
  "sourceDetailedRows": [
    [
      "Cabin",
      "Driving type 6×4 LHD/RHD T7H-W-Wide-body low-floor Lengthen Cab Flat roof.Option:Upgrade Edition;single bunk,safety belts, A/C, 70°hydraulically tillable to the front as attached photo for ref."
    ],
    [
      "Dimensions",
      "Overall dimensions (L×W×H)mm",
      "10005x2496x3980"
    ],
    [
      "Wheel base (mm)",
      "4025+1350"
    ],
    [
      "Weight in KGS",
      "Tare Weight",
      "14170"
    ],
    [
      "Loading Capacity",
      "12070"
    ],
    [
      "Front axles loading capacity",
      "1×9000"
    ],
    [
      "Rear axles loading capacity",
      "2×16000"
    ],
    [
      "Performance",
      "Maximum driving speed (km/h)",
      "80"
    ],
    [
      "Engine",
      "Brand",
      "SINOTRUK"
    ],
    [
      "Type",
      "6-cylinder in line,4-stroke,water-cooled,supercharging intermediate cooler,high pressure common rail"
    ],
    [
      "Horse Power (HP)/(KPM)",
      "390HP"
    ],
    [
      "Emission standard",
      "Euro III"
    ],
    [
      "Transmission",
      "HW19710 or HW23710 transmission,10 forward and 2 reverse"
    ],
    [
      "Steering Gear",
      "ZF power steering, modol ZF8098, hydraulic steering with power assitance"
    ],
    [
      "Fuel tank (L)",
      "400"
    ],
    [
      "Tire",
      "12.00-20,Optional 12.00R20,11.00-20,11.00R20"
    ],
    [
      "Mixer Body"
    ],
    [
      "Volume",
      "12 CBM"
    ],
    [
      "Body Thickness",
      "High tensile strength steel 6mm"
    ],
    [
      "Hydraulics",
      "German or Italy made imported"
    ],
    [
      "German or Italy made imported"
    ],
    [
      "German or Italy made imported"
    ]
  ],
  "safeGalleryImages": [
    "/images/products/5-Mixer-Truck-t7h-1.jpg",
    "/images/products/5-Mixer-Truck-t7h-2.jpg"
  ],
  "excludedSourceGalleryImages": [
    "/images/products/3-Mixer-Truck-2.jpg"
  ],
  "localOnlyUnverifiedGalleryImages": [
    "/images/products/5-Mixer-Truck-t7h-5.jpg",
    "/images/products/5-Mixer-Truck-t7h-3.jpg",
    "/images/products/5-Mixer-Truck-t7h-6.jpg",
    "/images/products/5-Mixer-Truck-t7h-4.jpg"
  ]
}
```

#### [howo-mixer-truck-t7h-8x4](https://sinotruk.international/products/howo-mixer-truck-t7h-8x4/)

- 结论：来源 Gallery 后两张分别为 HOWO 7 与 TX，只有第一张可安全归属本页。
- 来源标题：`Howo Mixer Truck T7H 8X4`；本地标题：`Howo Mixer Truck T7H 8X4`。
- 来源参数表：10 行，已在下方完整保留。

```json
{
  "slug": "howo-mixer-truck-t7h-8x4",
  "sourceUrl": "https://sinotruk.international/products/howo-mixer-truck-t7h-8x4/",
  "category": "special-vehicle",
  "subcategory": "mixer-truck",
  "title": "Howo Mixer Truck T7H 8X4",
  "sourceSummary": {
    "Drive type": "8x4",
    "Engine": "Euro III",
    "Volume": "12 CBM",
    "Fuel tank (L)": "400",
    "Horse Power": "390hp"
  },
  "recommendedSpecifications": {
    "Drive type": "8x4",
    "Engine": "Euro III",
    "Volume": "12 CBM",
    "Fuel tank (L)": "400",
    "Horse Power": "390hp"
  },
  "sourceDetailedRows": [
    [
      "Vehicle type",
      "Mixer"
    ],
    [
      "Drive type",
      "8×4"
    ],
    [
      "Cab",
      "TX-M(525MM single bunk),TX-F(749MM single bunk)"
    ],
    [
      "Engine",
      "Emission standerd",
      "Euro II-Euro V"
    ],
    [
      "Power",
      "266-440PS"
    ],
    [
      "Transmission",
      "9F,10F,12F"
    ],
    [
      "Front axle",
      "9.5T+9.5T"
    ],
    [
      "Rear axle",
      "16T+16T"
    ],
    [
      "Tyre",
      "12.00R20,12R22.5,315/80R22.5，13R22.5 etc."
    ],
    [
      "Volume of body",
      "12-16CBM"
    ]
  ],
  "safeGalleryImages": [
    "/images/products/5-Mixer-Truck-t7h-2.jpg"
  ],
  "excludedSourceGalleryImages": [
    "/images/products/4-Mixer-Truck-7-3.jpg",
    "/images/products/7-Mixer-Truck-tx-4.jpg"
  ],
  "localOnlyUnverifiedGalleryImages": [
    "/images/products/5-Mixer-Truck-t7h-1.jpg",
    "/images/products/5-Mixer-Truck-t7h-5.jpg",
    "/images/products/5-Mixer-Truck-t7h-3.jpg",
    "/images/products/5-Mixer-Truck-t7h-6.jpg",
    "/images/products/5-Mixer-Truck-t7h-4.jpg"
  ]
}
```

#### [howo-7-mixer-truck-6x4](https://sinotruk.international/products/howo-7-mixer-truck-6x4/)

- 结论：本地为罐车模板；采用来源 HOWO 7 详细表与自身前缀图片。
- 来源标题：`Howo 7 Mixer Truck 6X4`；本地标题：`Howo 7 Mixer Truck 6X4`。
- 来源参数表：22 行，已在下方完整保留。

```json
{
  "slug": "howo-7-mixer-truck-6x4",
  "sourceUrl": "https://sinotruk.international/products/howo-7-mixer-truck-6x4/",
  "category": "special-vehicle",
  "subcategory": "mixer-truck",
  "title": "Howo 7 Mixer Truck 6X4",
  "sourceSummary": {
    "Drive type": "6x4",
    "Engine": "Euro III",
    "Volume": "12 CBM",
    "Fuel tank (L)": "400",
    "Horse Power": "390hp"
  },
  "recommendedSpecifications": {
    "Drive type": "6x4",
    "Engine": "Euro III",
    "Volume": "12 CBM",
    "Fuel tank (L)": "400",
    "Horse Power": "390hp"
  },
  "sourceDetailedRows": [
    [
      "Cabin",
      "Driving type 6×4 LHD/RHD T7H-W-Wide-body low-floor Lengthen Cab Flat roof.Option:Upgrade Edition;single bunk,safety belts, A/C, 70°hydraulically tillable to the front as attached photo for ref."
    ],
    [
      "Dimensions",
      "Overall dimensions (L×W×H)mm",
      "10005x2496x3980"
    ],
    [
      "Wheel base (mm)",
      "4025+1350"
    ],
    [
      "Weight in KGS",
      "Tare Weight",
      "14170"
    ],
    [
      "Loading Capacity",
      "12070"
    ],
    [
      "Front axles loading capacity",
      "1×9000"
    ],
    [
      "Rear axles loading capacity",
      "2×16000"
    ],
    [
      "Performance",
      "Maximum driving speed (km/h)",
      "80"
    ],
    [
      "Engine",
      "Brand",
      "SINOTRUK"
    ],
    [
      "Type",
      "6-cylinder in line,4-stroke,water-cooled,supercharging intermediate cooler,high pressure common rail"
    ],
    [
      "Horse Power (HP)/(KPM)",
      "390HP"
    ],
    [
      "Emission standard",
      "Euro III"
    ],
    [
      "Transmission",
      "HW19710 or HW23710 transmission,10 forward and 2 reverse"
    ],
    [
      "Steering Gear",
      "ZF power steering, modol ZF8098, hydraulic steering with power assitance"
    ],
    [
      "Fuel tank (L)",
      "400"
    ],
    [
      "Tire",
      "12.00-20,Optional 12.00R20,11.00-20,11.00R20"
    ],
    [
      "Mixer Body"
    ],
    [
      "Volume",
      "12 CBM"
    ],
    [
      "Body Thickness",
      "High tensile strength steel 6mm"
    ],
    [
      "Hydraulics",
      "German or Italy made imported"
    ],
    [
      "German or Italy made imported"
    ],
    [
      "German or Italy made imported"
    ]
  ],
  "safeGalleryImages": [
    "/images/products/4-Mixer-Truck-7-2.jpg",
    "/images/products/4-Mixer-Truck-7-4.jpg",
    "/images/products/4-Mixer-Truck-7-1.jpg"
  ],
  "excludedSourceGalleryImages": [],
  "localOnlyUnverifiedGalleryImages": [
    "/images/products/4-Mixer-Truck-7-5.jpg",
    "/images/products/4-Mixer-Truck-7-3.jpg",
    "/images/products/4-Mixer-Truck-7-6.jpg"
  ]
}
```

#### [sinotruck-howo-bitumen-tank](https://sinotruk.international/products/sinotruck-howo-bitumen-tank/)

- 结论：本地为罐车通用模板；来源有 39 行沥青设备表，应整体替换并确认容量/温度/燃烧器等强事实。
- 来源标题：`Sinotruck Howo Bitumen Tank`；本地标题：`Sinotruck Howo Bitumen Tank`。
- 来源参数表：39 行，已在下方完整保留。

```json
{
  "slug": "sinotruck-howo-bitumen-tank",
  "sourceUrl": "https://sinotruk.international/products/sinotruck-howo-bitumen-tank/",
  "category": "special-vehicle",
  "subcategory": "other-truck",
  "title": "Sinotruck Howo Bitumen Tank",
  "sourceSummary": {
    "Automatic Grade": "Automatic",
    "Weight (KG)": "25000kg",
    "Chassis": "Howo",
    "Horsepower": "336HP",
    "Product Capacity": "<40t/h"
  },
  "recommendedSpecifications": {
    "Automatic Grade": "Automatic",
    "Weight (KG)": "25000kg",
    "Chassis": "Howo",
    "Horsepower": "336HP",
    "Product Capacity": "<40t/h"
  },
  "sourceDetailedRows": [
    [
      "Chassis Information"
    ],
    [
      "Item Name",
      "SINOTRUK HOWO"
    ],
    [
      "Chassis brand",
      "ZZ1257N4341W"
    ],
    [
      "Drive type",
      "6X4"
    ],
    [
      "Dimension Parameter"
    ],
    [
      "Overall dimension (L*W*H) (mm)",
      "10200*2500*3730"
    ],
    [
      "Wheel base (mm)",
      "4325+1350"
    ],
    [
      "Wheel No.",
      "3"
    ],
    [
      "Weight Parameter"
    ],
    [
      "GVW (kg)",
      "25000"
    ],
    [
      "Kerb weight (kg)",
      "18200"
    ],
    [
      "Front/Rear Axle load",
      "HF7T /ST16T"
    ],
    [
      "Engine Parameter"
    ],
    [
      "Model",
      "WD615.69"
    ],
    [
      "Manufacturer",
      "CNHTC"
    ],
    [
      "Horsepower (hp)",
      "336"
    ],
    [
      "Displacement / power (ml/kw)",
      "9726/247"
    ],
    [
      "Engine type",
      "6 cylinder in line, 4 stroke, water cooled, direct injection"
    ],
    [
      "Emission Standard",
      "EURO 2"
    ],
    [
      "Transmission"
    ],
    [
      "Control type",
      "Manual"
    ],
    [
      "Gear Shift",
      "10 speed forward, 2 speed reverse"
    ],
    [
      "Tyre"
    ],
    [
      "Type",
      "295/80R22.5"
    ],
    [
      "Tyre No.",
      "10+1 spare tire"
    ],
    [
      "Cab"
    ],
    [
      "Type",
      "HOWO HW76 flat-roof cab with A/C, power steering"
    ],
    [
      "Synchronous Chip Sealer Upper Structure"
    ],
    [
      "Volume",
      "8M3 asphalt tank + 12M3 stone silo"
    ],
    [
      "Material of the asphalt tank",
      "Inner 4mm carbon steel, medium 100mm rock wool, outer 1mm stainless steel"
    ],
    [
      "Spraying medium",
      "emulsified asphalt, hot asphalt, modified asphalt"
    ],
    [
      "Asphalt Pump Model",
      "QGB950 (high viscosity asphalt pump) 950L/min"
    ],
    [
      "Hydraulic system",
      "Gear pump (Tianjin GPC4-50-20-16), automatic reversing valve and relief valve, asphalt pump hydraulic drive motor model 05-130-BD31; proportional valve EFRD-G03-160-5-31 (Taiwan)"
    ],
    [
      "Control mode",
      "Touch screen computer intelligent control in cab, control system (Germany Siemens); 32pcs asphalt intelligent nozzles (one control one); 16pcs stone material door."
    ],
    [
      "Heating mode",
      "heat transfer oil automatic heating + burner G20 (Italian imported)."
    ],
    [
      "Gasoline generator",
      "HONDA 5.5KW"
    ],
    [
      "Spraying rate of the asphalt",
      "0.25-4.0L/M2"
    ],
    [
      "Spraying width of the asphalt",
      "4m"
    ],
    [
      "Spraying rate of the stone",
      "adjustable"
    ]
  ],
  "safeGalleryImages": [
    "/images/products/10-howo-asphalt-4.jpg",
    "/images/products/10-howo-asphalt-5.jpg",
    "/images/products/10-howo-asphalt-1.jpg"
  ],
  "excludedSourceGalleryImages": [],
  "localOnlyUnverifiedGalleryImages": [
    "/images/products/10-Bitumen-1.jpg",
    "/images/products/10-Bitumen-2.jpg",
    "/images/products/10-Bitumen-5.jpg",
    "/images/products/10-Bitumen-3.jpg",
    "/images/products/10-Bitumen-6.jpg",
    "/images/products/10-Bitumen-4.jpg"
  ]
}
```

#### [sinotruck-howo-bitumen-tank-2](https://sinotruk.international/products/sinotruck-howo-bitumen-tank-2/)

- 结论：与无后缀页标题和主要参数相同；来源图片不同但是否独立配置不清楚，需确认 canonical。
- 来源标题：`Sinotruck Howo Bitumen Tank`；本地标题：`Sinotruck Howo Bitumen Tank`。
- 来源参数表：39 行，已在下方完整保留。

```json
{
  "slug": "sinotruck-howo-bitumen-tank-2",
  "sourceUrl": "https://sinotruk.international/products/sinotruck-howo-bitumen-tank-2/",
  "category": "special-vehicle",
  "subcategory": "other-truck",
  "title": "Sinotruck Howo Bitumen Tank",
  "sourceSummary": {
    "Automatic Grade": "Automatic",
    "Weight (KG)": "25000kg",
    "Chassis": "Howo",
    "Horsepower": "336HP",
    "Product Capacity": "<40t/h"
  },
  "recommendedSpecifications": {
    "Automatic Grade": "Automatic",
    "Weight (KG)": "25000kg",
    "Chassis": "Howo",
    "Horsepower": "336HP",
    "Product Capacity": "<40t/h"
  },
  "sourceDetailedRows": [
    [
      "Chassis Information"
    ],
    [
      "Item Name",
      "SINOTRUK HOWO"
    ],
    [
      "Chassis brand",
      "ZZ1257N4341W"
    ],
    [
      "Drive type",
      "6X4"
    ],
    [
      "Dimension Parameter"
    ],
    [
      "Overall dimension (L*W*H) (mm)",
      "10200*2500*3730"
    ],
    [
      "Wheel base (mm)",
      "4325+1350"
    ],
    [
      "Wheel No.",
      "3"
    ],
    [
      "Weight Parameter"
    ],
    [
      "GVW (kg)",
      "25000"
    ],
    [
      "Kerb weight (kg)",
      "18200"
    ],
    [
      "Front/Rear Axle load",
      "HF7T /ST16T"
    ],
    [
      "Engine Parameter"
    ],
    [
      "Model",
      "WD615.69"
    ],
    [
      "Manufacturer",
      "CNHTC"
    ],
    [
      "Horsepower (hp)",
      "336"
    ],
    [
      "Displacement / power (ml/kw)",
      "9726/247"
    ],
    [
      "Engine type",
      "6 cylinder in line, 4 stroke, water cooled, direct injection"
    ],
    [
      "Emission Standard",
      "EURO 2"
    ],
    [
      "Transmission"
    ],
    [
      "Control type",
      "Manual"
    ],
    [
      "Gear Shift",
      "10 speed forward, 2 speed reverse"
    ],
    [
      "Tyre"
    ],
    [
      "Type",
      "295/80R22.5"
    ],
    [
      "Tyre No.",
      "10+1 spare tire"
    ],
    [
      "Cab"
    ],
    [
      "Type",
      "HOWO HW76 flat-roof cab with A/C, power steering"
    ],
    [
      "Synchronous Chip Sealer Upper Structure"
    ],
    [
      "Volume",
      "8M3 asphalt tank + 12M3 stone silo"
    ],
    [
      "Material of the asphalt tank",
      "Inner 4mm carbon steel, medium 100mm rock wool, outer 1mm stainless steel"
    ],
    [
      "Spraying medium",
      "emulsified asphalt, hot asphalt, modified asphalt"
    ],
    [
      "Asphalt Pump Model",
      "QGB950 (high viscosity asphalt pump) 950L/min"
    ],
    [
      "Hydraulic system",
      "Gear pump (Tianjin GPC4-50-20-16), automatic reversing valve and relief valve, asphalt pump hydraulic drive motor model 05-130-BD31; proportional valve EFRD-G03-160-5-31 (Taiwan)"
    ],
    [
      "Control mode",
      "Touch screen computer intelligent control in cab, control system (Germany Siemens); 32pcs asphalt intelligent nozzles (one control one); 16pcs stone material door."
    ],
    [
      "Heating mode",
      "heat transfer oil automatic heating + burner G20 (Italian imported)."
    ],
    [
      "Gasoline generator",
      "HONDA 5.5KW"
    ],
    [
      "Spraying rate of the asphalt",
      "0.25-4.0L/M2"
    ],
    [
      "Spraying width of the asphalt",
      "4m"
    ],
    [
      "Spraying rate of the stone",
      "adjustable"
    ]
  ],
  "safeGalleryImages": [
    "/images/products/10-howo-asphalt-2.jpg",
    "/images/products/10-howo-asphalt-5.jpg",
    "/images/products/10-howo-asphalt-7.jpg"
  ],
  "excludedSourceGalleryImages": [],
  "localOnlyUnverifiedGalleryImages": [
    "/images/products/10-Bitumen-2.jpg",
    "/images/products/10-Bitumen-1.jpg",
    "/images/products/10-Bitumen-5.jpg",
    "/images/products/10-Bitumen-3.jpg",
    "/images/products/10-Bitumen-6.jpg",
    "/images/products/10-Bitumen-4.jpg"
  ]
}
```

#### [sinotruck-howo-garbage-truck](https://sinotruk.international/products/sinotruck-howo-garbage-truck/)

- 结论：本地错误使用水罐容量/轴荷模板；来源有垃圾车专用表，应整体替换。
- 来源标题：`Sinotruck Howo Garbage Truck`；本地标题：`Sinotruck Howo Garbage Truck`。
- 来源参数表：26 行，已在下方完整保留。

```json
{
  "slug": "sinotruck-howo-garbage-truck",
  "sourceUrl": "https://sinotruk.international/products/sinotruck-howo-garbage-truck/",
  "category": "special-vehicle",
  "subcategory": "other-truck",
  "title": "Sinotruck Howo Garbage Truck",
  "sourceSummary": {
    "Automatic Grade": "Automatic",
    "Weight (KG)": "25000kg",
    "Chassis": "Howo",
    "Horsepower": "371/2200",
    "Fuel Consumption(L/100km)": "29"
  },
  "recommendedSpecifications": {
    "Automatic Grade": "Automatic",
    "Weight (KG)": "25000kg",
    "Chassis": "Howo",
    "Horsepower": "371/2200",
    "Fuel Consumption(L/100km)": "29"
  },
  "sourceDetailedRows": [
    [
      "HOWO Refuse Compactor Truck COMPACTOR"
    ],
    [
      "HOWO Refuse Compactor Truck COMPACTOR"
    ],
    [
      "Model Number",
      "QDZ5251ZYSA"
    ],
    [
      "Chassis Number",
      "ZZ1257N4341W"
    ],
    [
      "Driving type",
      "6*4"
    ],
    [
      "Rated Loading Weight(kg)",
      "10000"
    ],
    [
      "Kerb Weight(kg)",
      "15000"
    ],
    [
      "Total Mass(kg)",
      "25000"
    ],
    [
      "Overall dimesion(L*W*H)mm",
      "9980*2500*3650"
    ],
    [
      "Min. Turning Circle (m)",
      "21.6"
    ],
    [
      "Max. Speed (Km/h)",
      "90"
    ],
    [
      "Fuel Consumption(L/100km)",
      "29"
    ],
    [
      "Engine",
      "SINOTRUK Brand,WD615.47,EURO-2"
    ],
    [
      "Horse Power(hp/r/min)",
      "371/2200"
    ],
    [
      "Volume of the Body(m3)",
      "18.5"
    ],
    [
      "Volume of the Filler(m3)",
      "2.5"
    ],
    [
      "Time of one Loading Cycle(s)",
      "<25"
    ],
    [
      "Time of one Unloading Cycle(s)",
      "<40"
    ],
    [
      "Max Brake Crase Pressure(kgf)",
      ">35000"
    ],
    [
      "Transmission",
      "HW19710, 10 forward and 2 reverse"
    ],
    [
      "Clutch",
      "Dia.430mm, Hydraulically operating with air assitance"
    ],
    [
      "Front Axle",
      "HF7"
    ],
    [
      "Rear Axle",
      "ST16"
    ],
    [
      "Steering",
      "ZF8098"
    ],
    [
      "Brake",
      "Dual circuit compressed air service bake, spring energy parking brake, engine exhaust auxiliary brake, ABS for option"
    ],
    [
      "Tyre",
      "12.00R20 Radial tyre"
    ]
  ],
  "safeGalleryImages": [
    "/images/products/11-howo-Garbage-8.jpg",
    "/images/products/11-howo-Garbage-7.jpg",
    "/images/products/11-howo-Garbage-3.jpg"
  ],
  "excludedSourceGalleryImages": [],
  "localOnlyUnverifiedGalleryImages": [
    "/images/products/11-Garbage-1.jpg",
    "/images/products/11-Garbage-2.jpg",
    "/images/products/11-Garbage-5.jpg",
    "/images/products/11-Garbage-3.jpg",
    "/images/products/11-Garbage-6.jpg",
    "/images/products/11-Garbage-4.jpg"
  ]
}
```

#### [sinotruck-howo-garbage-truck-2](https://sinotruk.international/products/sinotruck-howo-garbage-truck-2/)

- 结论：与无后缀垃圾车页标题和摘要相同；需确认上装差异，否则合并重复页。
- 来源标题：`Sinotruck Howo Garbage Truck`；本地标题：`Sinotruck Howo Garbage Truck`。
- 来源参数表：26 行，已在下方完整保留。

```json
{
  "slug": "sinotruck-howo-garbage-truck-2",
  "sourceUrl": "https://sinotruk.international/products/sinotruck-howo-garbage-truck-2/",
  "category": "special-vehicle",
  "subcategory": "other-truck",
  "title": "Sinotruck Howo Garbage Truck",
  "sourceSummary": {
    "Automatic Grade": "Automatic",
    "Weight (KG)": "25000kg",
    "Chassis": "Howo",
    "Horsepower": "371/2200",
    "Fuel Consumption(L/100km)": "29"
  },
  "recommendedSpecifications": {
    "Automatic Grade": "Automatic",
    "Weight (KG)": "25000kg",
    "Chassis": "Howo",
    "Horsepower": "371/2200",
    "Fuel Consumption(L/100km)": "29"
  },
  "sourceDetailedRows": [
    [
      "HOWO Refuse Compactor Truck COMPACTOR"
    ],
    [
      "HOWO Refuse Compactor Truck COMPACTOR"
    ],
    [
      "Model Number",
      "QDZ5251ZYSA"
    ],
    [
      "Chassis Number",
      "ZZ1257N4341W"
    ],
    [
      "Driving type",
      "6*4"
    ],
    [
      "Rated Loading Weight(kg)",
      "10000"
    ],
    [
      "Kerb Weight(kg)",
      "15000"
    ],
    [
      "Total Mass(kg)",
      "25000"
    ],
    [
      "Overall dimesion(L*W*H)mm",
      "9980*2500*3650"
    ],
    [
      "Min. Turning Circle (m)",
      "21.6"
    ],
    [
      "Max. Speed (Km/h)",
      "90"
    ],
    [
      "Fuel Consumption(L/100km)",
      "29"
    ],
    [
      "Engine",
      "SINOTRUK Brand,WD615.47,EURO-2"
    ],
    [
      "Horse Power(hp/r/min)",
      "371/2200"
    ],
    [
      "Volume of the Body(m3)",
      "18.5"
    ],
    [
      "Volume of the Filler(m3)",
      "2.5"
    ],
    [
      "Time of one Loading Cycle(s)",
      "<25"
    ],
    [
      "Time of one Unloading Cycle(s)",
      "<40"
    ],
    [
      "Max Brake Crase Pressure(kgf)",
      ">35000"
    ],
    [
      "Transmission",
      "HW19710, 10 forward and 2 reverse"
    ],
    [
      "Clutch",
      "Dia.430mm, Hydraulically operating with air assitance"
    ],
    [
      "Front Axle",
      "HF7"
    ],
    [
      "Rear Axle",
      "ST16"
    ],
    [
      "Steering",
      "ZF8098"
    ],
    [
      "Brake",
      "Dual circuit compressed air service bake, spring energy parking brake, engine exhaust auxiliary brake, ABS for option"
    ],
    [
      "Tyre",
      "12.00R20 Radial tyre"
    ]
  ],
  "safeGalleryImages": [
    "/images/products/11-howo-Garbage-1.jpg",
    "/images/products/11-howo-Garbage-4.jpg",
    "/images/products/11-howo-Garbage-5.jpg"
  ],
  "excludedSourceGalleryImages": [],
  "localOnlyUnverifiedGalleryImages": [
    "/images/products/11-Garbage-2.jpg",
    "/images/products/11-Garbage-1.jpg",
    "/images/products/11-Garbage-5.jpg",
    "/images/products/11-Garbage-3.jpg",
    "/images/products/11-Garbage-6.jpg",
    "/images/products/11-Garbage-4.jpg"
  ]
}
```

#### [sinotruck-howo-mounted-crane-truck](https://sinotruk.international/products/sinotruck-howo-mounted-crane-truck/)

- 结论：本地错误使用水罐模板；来源有吊机能力与底盘表，强事实须人工确认后发布。
- 来源标题：`Sinotruck Howo Mounted Crane Truck`；本地标题：`Sinotruck Howo Mounted Crane Truck`。
- 来源参数表：13 行，已在下方完整保留。

```json
{
  "slug": "sinotruck-howo-mounted-crane-truck",
  "sourceUrl": "https://sinotruk.international/products/sinotruck-howo-mounted-crane-truck/",
  "category": "special-vehicle",
  "subcategory": "other-truck",
  "title": "Sinotruck Howo Mounted Crane Truck",
  "sourceSummary": {
    "Engine": "Weichai",
    "Weight (KG)": "25000kg",
    "Chassis": "Howo",
    "Power": "371/400HP",
    "Max lifting capacity": "18ton"
  },
  "recommendedSpecifications": {
    "Engine": "Weichai",
    "Weight (KG)": "25000kg",
    "Chassis": "Howo",
    "Power": "371/400HP",
    "Max lifting capacity": "18ton"
  },
  "sourceDetailedRows": [
    [
      "Product Name",
      "TRUCK CRANE"
    ],
    [
      "Application",
      "construction"
    ],
    [
      "Rated Loading Capacity",
      "30 Ton"
    ],
    [
      "Rated Lifting Moment",
      "40-50T.m"
    ],
    [
      "Max. Lifting Height",
      "20.3m"
    ],
    [
      "Span",
      "8.3m"
    ],
    [
      "Engine Brand",
      "Weichai"
    ],
    [
      "Weight (KG)",
      "25000kg"
    ],
    [
      "Crane type",
      "Customized definition"
    ],
    [
      "Chassis",
      "Howo"
    ],
    [
      "Power",
      "371/400"
    ],
    [
      "Driving type",
      "6×4"
    ],
    [
      "Max lifting capacity",
      "18ton"
    ]
  ],
  "safeGalleryImages": [
    "/images/products/9-Truck-Crane-1.jpg",
    "/images/products/9-Truck-Crane-5.jpg",
    "/images/products/9-Truck-Crane-2.jpg"
  ],
  "excludedSourceGalleryImages": [],
  "localOnlyUnverifiedGalleryImages": [
    "/images/products/9-Truck-Crane-3.jpg",
    "/images/products/9-Truck-Crane-6.jpg",
    "/images/products/9-Truck-Crane-4.jpg"
  ]
}
```

#### [sinotruck-howo-small-truck-crane](https://sinotruk.international/products/sinotruck-howo-small-truck-crane/)

- 结论：来源摘要仍写 18 ton，可能与“Small”冲突；详细表必须人工确认，不可照搬另一吊车。
- 来源标题：`Sinotruck Howo Small Truck Crane`；本地标题：`Sinotruck Howo Small Truck Crane`。
- 来源参数表：13 行，已在下方完整保留。

```json
{
  "slug": "sinotruck-howo-small-truck-crane",
  "sourceUrl": "https://sinotruk.international/products/sinotruck-howo-small-truck-crane/",
  "category": "special-vehicle",
  "subcategory": "other-truck",
  "title": "Sinotruck Howo Small Truck Crane",
  "sourceSummary": {
    "Engine": "Weichai",
    "Weight (KG)": "25000kg",
    "Chassis": "Howo",
    "Power": "371/400HP",
    "Max lifting capacity": "18ton"
  },
  "recommendedSpecifications": {
    "Engine": "Weichai",
    "Weight (KG)": "25000kg",
    "Chassis": "Howo",
    "Power": "371/400HP",
    "Max lifting capacity": "18ton"
  },
  "sourceDetailedRows": [
    [
      "Product Name",
      "TRUCK CRANE"
    ],
    [
      "Application",
      "construction"
    ],
    [
      "Rated Loading Capacity",
      "30 Ton"
    ],
    [
      "Rated Lifting Moment",
      "40-50T.m"
    ],
    [
      "Max. Lifting Height",
      "20.3m"
    ],
    [
      "Span",
      "8.3m"
    ],
    [
      "Engine Brand",
      "Weichai"
    ],
    [
      "Weight (KG)",
      "25000kg"
    ],
    [
      "Crane type",
      "Customized definition"
    ],
    [
      "Chassis",
      "Howo"
    ],
    [
      "Power",
      "371/400"
    ],
    [
      "Driving type",
      "6×4"
    ],
    [
      "Max lifting capacity",
      "18ton"
    ]
  ],
  "safeGalleryImages": [
    "/images/products/9-Truck-Crane-3.jpg",
    "/images/products/9-Truck-Crane-1.jpg",
    "/images/products/9-Truck-Crane-2.jpg"
  ],
  "excludedSourceGalleryImages": [],
  "localOnlyUnverifiedGalleryImages": [
    "/images/products/9-Truck-Crane-5.jpg",
    "/images/products/9-Truck-Crane-6.jpg",
    "/images/products/9-Truck-Crane-4.jpg"
  ]
}
```

### 3.4 light-vehicle（5 款）

#### [sinotruck-pickup-passenger-version](https://sinotruk.international/products/sinotruck-pickup-passenger-version/)

- 结论：本地使用 LZW1030GHU 汽油模板；来源为 WP2H 2.0T 柴油/8AT 且有 138 行配置表。排除 Off-road 图片。
- 来源标题：`Sinotruck Pickup Passenger Version`；本地标题：`Sinotruck Pickup Passenger Version`。
- 来源参数表：138 行，已在下方完整保留。

```json
{
  "slug": "sinotruck-pickup-passenger-version",
  "sourceUrl": "https://sinotruk.international/products/sinotruck-pickup-passenger-version/",
  "category": "light-vehicle",
  "subcategory": "pickup",
  "title": "Sinotruck Pickup Passenger Version",
  "sourceSummary": {
    "Emission": "National VI",
    "Engine": "WP2H 2.0T",
    "Gearbox": "8AT",
    "Max Torque": "420N·m",
    "Max Power": "140kW"
  },
  "recommendedSpecifications": {
    "Emission": "National VI",
    "Engine": "WP2H 2.0T",
    "Gearbox": "8AT",
    "Max Torque": "420N·m",
    "Max Power": "140kW"
  },
  "sourceDetailedRows": [
    [
      "Version",
      "Passenger Version"
    ],
    [
      "Drive mode",
      "Two-wheel drive",
      "Four-wheel drive"
    ],
    [
      "Model",
      "Elite",
      "Luxury",
      "Elite",
      "Luxury"
    ],
    [
      "Basic information"
    ],
    [
      "Length*Width*Height(mm)",
      "5365*1945*1890"
    ],
    [
      "Internal size of cargo bed(mm)",
      "1520*1520*530"
    ],
    [
      "Wheelbase（mm）",
      "3230"
    ],
    [
      "Engine model",
      "WP2H"
    ],
    [
      "Transmission",
      "8AT"
    ],
    [
      "Energy",
      "Diesel"
    ],
    [
      "Engine type",
      "High pressure common rail、turbo engine intercooler"
    ],
    [
      "Maximum power kW/(r/min)",
      "140/4000"
    ],
    [
      "Maximum torque N•m/(r/min)",
      "420/1750-2500"
    ],
    [
      "Steering",
      "Electric power"
    ],
    [
      "Suspension（front/rear）",
      "Double wishbone suspension/multi-link integral axle"
    ],
    [
      "Safety"
    ],
    [
      "Braking",
      "Ventilated disc"
    ],
    [
      "Electronic stability program（ESP）",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Anti-lock brake system（ABS）",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Electronic brakeforce distribution（EBD）",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Traction control system（TCS）",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Brake assist（BA）",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Brake override system（BOS）",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Drag torque control（DTC）",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Anti rolling program（ARP）",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Hill-start assist control（HAC）",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Down-hill assist control（DAC）",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Electronic parking brake（EPB）",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Airbag(Dural)",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Front side airbag",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Side curtain airbag",
      "–",
      "●",
      "–",
      "●"
    ],
    [
      "Front seat belt( with pre tensioners +force limiter)",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Rear three-point safety seat belt",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Front seat belt warning (warning light + sound)",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Autonomous emergency braking system（AEB）",
      "–",
      "–",
      "●",
      "●"
    ],
    [
      "Front collision warning（FCW）",
      "–",
      "–",
      "●",
      "●"
    ],
    [
      "Lane departure warning（LDW）",
      "–",
      "–",
      "●",
      "●"
    ],
    [
      "Traffic sign recognition（TSR）",
      "–",
      "–",
      "●",
      "●"
    ],
    [
      "Intelligent headlamp control（IHC）",
      "–",
      "–",
      "●",
      "●"
    ],
    [
      "Speed assist system（SAS）",
      "–",
      "–",
      "●",
      "●"
    ],
    [
      "Lane central lock（LCK）",
      "–",
      "–",
      "●",
      "●"
    ],
    [
      "Integrated cruise assist（ICA）",
      "–",
      "–",
      "●",
      "●"
    ],
    [
      "Traffic jam assist（TJA）",
      "–",
      "–",
      "●",
      "●"
    ],
    [
      "Door open warning（DOW）",
      "–",
      "–",
      "–",
      "●"
    ],
    [
      "The rear cross traffic alert（RCTA）",
      "–",
      "–",
      "–",
      "●"
    ],
    [
      "Rear collision warning（RCW）",
      "–",
      "–",
      "–",
      "●"
    ],
    [
      "The blind spot detection（BSD）",
      "–",
      "–",
      "–",
      "●"
    ],
    [
      "Emergency lane keeping （ELK）",
      "–",
      "–",
      "–",
      "●"
    ],
    [
      "Tire-pressure monitoring system (TPMS)",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "All-wheel drive lock mode",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Automatically unlocking function",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Collision oil-braking system",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Front radar(Two)",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Reversing radar",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Reversing image",
      "●",
      "–",
      "●",
      "–"
    ],
    [
      "Right blind spots assist",
      "●",
      "–",
      "●",
      "–"
    ],
    [
      "360° panoramic image+see through chassis",
      "–",
      "●",
      "–",
      "●"
    ],
    [
      "Anti-theft engine",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Central differential (with lock)",
      "–",
      "–",
      "–",
      "●"
    ],
    [
      "Rear axle differential lock",
      "–",
      "–",
      "○",
      "○"
    ],
    [
      "Brake block abrasion alarming",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Intelligent technology"
    ],
    [
      "Constant speed cruise control",
      "●",
      "●",
      "–",
      "–"
    ],
    [
      "ACC",
      "–",
      "–",
      "●",
      "●"
    ],
    [
      "Driving Mode",
      "Standard ECO Sporty",
      "Standard ECO Sporty",
      "标准Standard ECO Sporty",
      "Standard ECO Sporty"
    ],
    [
      "Electronic gear-shifting",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Automatic parking",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Wireless charging for mobile phone",
      "–",
      "●",
      "–",
      "●"
    ],
    [
      "12.3-inch central touchscreen",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Satellite navigation system",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "8 Speakers",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Internet of Vehicle",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Remote control",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Voice recognition system",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Phone connectivity to your car",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Bluetooth hands-free phone system",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Over the air (OTA)",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Rear window defroster",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Colorful vibe lights in the cabin",
      "–",
      "●",
      "–",
      "●"
    ],
    [
      "E-instruction",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "12V power supply in front row",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "220V outlet in the rear+ USB outlet",
      "–",
      "●",
      "–",
      "●"
    ],
    [
      "Exterior"
    ],
    [
      "Tyre",
      "265/60 R18"
    ],
    [
      "Aluminum alloy wheel hub",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Fender flares",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Power exterior adjustable rearview mirror/cornering lights",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Power heating exterior rearview",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Power folding exterior rearview mirror(automatic folding when lock the car)",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Roof rack",
      "–",
      "●",
      "–",
      "●"
    ],
    [
      "Side pedal",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Paint cargo box",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Tailgate gas spring",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Electric tailgate",
      "○",
      "○",
      "○",
      "○"
    ],
    [
      "Ladder outside cargo box",
      "○",
      "○",
      "○",
      "○"
    ],
    [
      "Front fog lamp",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Front headlight adjustment",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Automatic headlights",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "LED headlight",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Steering auxiliary light",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "High brake light",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "LED daytime running lamp",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Electronic sunroof",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Shark fin style antenna wire",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Auto boneless windshield wiper",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Anti-roll bar",
      "○",
      "○",
      "○",
      "○"
    ],
    [
      "Interior"
    ],
    [
      "Black and coffee color car interior",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Slush molding meter",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "12.3-inch LCD coloful meter",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Dual zone automatic air conditioner",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Electronic car window",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "One-button lifting window with anti-pinch function",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Keyless entry",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "One key start button",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Leather steering wheel",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Multi-function steering wheel",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "2-way manual ajustment wheel steering",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Steering wheel heating",
      "–",
      "●",
      "–",
      "●"
    ],
    [
      "Paddle shifters on steering wheel",
      "–",
      "●",
      "–",
      "●"
    ],
    [
      "Faux leather seats",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "6-way electric ajustable drive seat",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "4-way electric ajustable passenger seat",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Rear 4-6 seat(foldable/unfixed cushion)",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Ventilated front seat",
      "–",
      "○",
      "–",
      "●"
    ],
    [
      "Heated front seat",
      "–",
      "●",
      "–",
      "●"
    ],
    [
      "Internationally standardised car seat fitting system(ISOFIX)",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Reading lamp",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Spectacle case",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Sun visor on driver and passenger seat",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Sun visor ( with ticket holder)",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Anti-glare interior rearview mirror",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Rear air conditioner exhaust vent",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Dust filter",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "CN95 air conditioner filter",
      "–",
      "●",
      "–",
      "●"
    ],
    [
      "Driving recorder joint",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "ETC",
      "○",
      "○",
      "○",
      "○"
    ],
    [
      "Attention: The entire contents of this advertisement and promotional material are for consultation only, if it does not match with the car, please refer to the car. Note：● Standard ○ Optional – Not"
    ]
  ],
  "safeGalleryImages": [
    "/images/products/4-Pickup-Passenger-1.jpg",
    "/images/products/4-Pickup-Passenger-2.jpg"
  ],
  "excludedSourceGalleryImages": [
    "/images/products/3-Pickup-Off-road-3.jpg"
  ],
  "localOnlyUnverifiedGalleryImages": [
    "/images/products/4-Pickup-Passenger-5.jpg",
    "/images/products/4-Pickup-Passenger-3.jpg",
    "/images/products/4-Pickup-Passenger-6.jpg",
    "/images/products/4-Pickup-Passenger-4.jpg"
  ]
}
```

#### [sinotruck-pickup-commercial-version](https://sinotruk.international/products/sinotruck-pickup-commercial-version/)

- 结论：本地使用 LZW1030GHU 汽油模板；来源为 WP2H 2.0T、8AT/6MT 且有独立 112 行配置表。
- 来源标题：`Sinotruck Pickup Commercial Version`；本地标题：`Sinotruck Pickup Commercial Version`。
- 来源参数表：112 行，已在下方完整保留。

```json
{
  "slug": "sinotruck-pickup-commercial-version",
  "sourceUrl": "https://sinotruk.international/products/sinotruck-pickup-commercial-version/",
  "category": "light-vehicle",
  "subcategory": "pickup",
  "title": "Sinotruck Pickup Commercial Version",
  "sourceSummary": {
    "Emission": "National VI",
    "Engine": "WP2H 2.0T",
    "Gearbox": "8AT/6MT",
    "Max Torque": "420N·m",
    "Max Power": "140kW"
  },
  "recommendedSpecifications": {
    "Emission": "National VI",
    "Engine": "WP2H 2.0T",
    "Gearbox": "8AT/6MT",
    "Max Torque": "420N·m",
    "Max Power": "140kW"
  },
  "sourceDetailedRows": [
    [
      "Version",
      "Comercial Version"
    ],
    [
      "Transmission",
      "6MT",
      "8AT"
    ],
    [
      "Drive mode",
      "Two-wheel drive",
      "Four-wheel drive",
      "Two-wheel drive",
      "Four-wheel drive",
      "Two-wheel drive",
      "Four-wheel drive"
    ],
    [
      "Configuration",
      "Young",
      "Luxury",
      "Young",
      "Luxury",
      "Young",
      "Luxury",
      "Young",
      "Luxury",
      "Young",
      "Luxury",
      "Young",
      "Luxury"
    ],
    [
      "Basic information"
    ],
    [
      "Length*Width*Height(mm)",
      "5645*1895*1890",
      "5365*1895*1890",
      "5645*1895*1890"
    ],
    [
      "Internal size of cargo bed(mm)",
      "1800*1520*530",
      "1520*1520*530",
      "1800*1520*530"
    ],
    [
      "Wheelbase（mm）",
      "3470",
      "3230",
      "3470"
    ],
    [
      "Engine model",
      "WP2H",
      "WP2H"
    ],
    [
      "Energy",
      "Diesel",
      "Diesel"
    ],
    [
      "Engine type",
      "High pressure common rail、turbo engine intercooler",
      "High pressure common rail、turbo engine intercooler"
    ],
    [
      "Maximum power kW/(r/min)",
      "140/4000",
      "140/4000"
    ],
    [
      "Maximum torque N•m/(r/min)",
      "420/1750-2500",
      "420/1750-2500"
    ],
    [
      "Steering",
      "Hydraulic power",
      "Hydraulic power"
    ],
    [
      "Suspension（front/rear）",
      "Double wishbone independent suspension/steel spring",
      "Double wishbone independent suspension/steel spring"
    ],
    [
      "Safety"
    ],
    [
      "Braking",
      "Ventilated disc",
      "Ventilated disc"
    ],
    [
      "Electronic stability program（ESP）",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Anti-lock brake system（ABS）",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Electronic brakeforce distribution（EBD）",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Traction control system（TCS）",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Brake assist（BA）",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Brake override system（BOS）",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Drag torque control（DTC）",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Anti rolling program（ARP）",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Hill-start assist control（HAC）",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Down-hill assist control（DAC）",
      "–",
      "–",
      "–",
      "–",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Electronic parking brake（EPB）",
      "–",
      "–",
      "–",
      "–",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Airbag (Dural)",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Front side airbag、Side curtain airbag",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●"
    ],
    [
      "Front seat belt (with pre tensioners +force limiter)",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Rear three-point seat belt",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Front seat belt warning (warning light + sound)",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Autonomous emergency braking system（AEB）",
      "–",
      "–",
      "–",
      "–",
      "–",
      "–",
      "–",
      "●",
      "–",
      "–",
      "–",
      "●"
    ],
    [
      "Front collision warning（FCW）",
      "–",
      "–",
      "–",
      "–",
      "–",
      "–",
      "–",
      "●",
      "–",
      "–",
      "–",
      "●"
    ],
    [
      "Lane departure warning（LDW）",
      "–",
      "–",
      "–",
      "–",
      "–",
      "–",
      "–",
      "●",
      "–",
      "–",
      "–",
      "●"
    ],
    [
      "Traffic sign recognition（TSR）",
      "–",
      "–",
      "–",
      "–",
      "–",
      "–",
      "–",
      "●",
      "–",
      "–",
      "–",
      "●"
    ],
    [
      "Intelligent headlamp control（IHC）",
      "–",
      "–",
      "–",
      "–",
      "–",
      "–",
      "–",
      "●",
      "–",
      "–",
      "–",
      "●"
    ],
    [
      "Speed assist system（SAS）",
      "–",
      "–",
      "–",
      "–",
      "–",
      "–",
      "–",
      "●",
      "–",
      "–",
      "–",
      "●"
    ],
    [
      "Tire-pressure monitoring system (TPMS)",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "All-wheel drive lock mode",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Automatically unlocking function",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Collision oil-braking system",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Reversing radar",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Reversing image",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Right blind spots assist",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●"
    ],
    [
      "Anti-theft engine",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Brake facing abrasion Warning",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Technology Configuration"
    ],
    [
      "Constant Speed Cruise control",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "–",
      "●",
      "●",
      "●",
      "–"
    ],
    [
      "ACC",
      "–",
      "–",
      "–",
      "–",
      "–",
      "–",
      "–",
      "●",
      "–",
      "–",
      "–",
      "●"
    ],
    [
      "Driving Mode",
      "–",
      "–",
      "–",
      "–",
      "ECO Sports Standard",
      "ECO Sports Standard",
      "ECO Sports Standard",
      "ECO Sports Standard",
      "ECO Sports Standard",
      "ECO Sports Standard",
      "ECO Sports Standard",
      "ECO Sports Standard"
    ],
    [
      "Electronic gear-shifting",
      "–",
      "–",
      "–",
      "–",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Automatic parking",
      "–",
      "–",
      "–",
      "–",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "12.3-inch central touchscreen",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Satellite navigation system",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "6 Speakers",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "A Bluetooth hands-free call system",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Rear windowe heating defroster",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "E-instructions",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●"
    ],
    [
      "12 V outlet in the front",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Exterior"
    ],
    [
      "Tyre",
      "245/70 R17",
      "245/70 R17"
    ],
    [
      "Aluminum alloy wheel hub",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Power adjustment exterior rearview mirror/cornering lights",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Exterior power heating rearview mirror",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●"
    ],
    [
      "Side pedal",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Paint cargo box",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Rope hook outside cargo bed",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Ladder outside cargo bed",
      "○",
      "○",
      "○",
      "○",
      "○",
      "○",
      "○",
      "○",
      "○",
      "○",
      "○",
      "○"
    ],
    [
      "Front fog lamp",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●"
    ],
    [
      "Adjustable Front headlight",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Automatic headlights",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●"
    ],
    [
      "Halogen headlights",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Steering auxiliary light",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●"
    ],
    [
      "High brake light",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "LED daytime running lamp",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Electronic sunroof",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●"
    ],
    [
      "Shark fin style antenna wire",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Boneless windshield wiper",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–"
    ],
    [
      "Auto boneless windshield wiper",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●"
    ],
    [
      "Anti-roll bar",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Interior"
    ],
    [
      "Black and grey car interior",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Slush molding meter",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "7-inch LCD color meter",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Automatic air conditioner",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–"
    ],
    [
      "Dual zone automatic air conditioner",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●"
    ],
    [
      "Electronic car window",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "One-button lifting window with anti-pinch function",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Keyless entry",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "One key start button",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Faux leather steering wheel",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Multi-function steering wheel",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "2-way manual ajustable steering wheel",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Fabric seat",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–"
    ],
    [
      "Faux leather seat",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●"
    ],
    [
      "6-way manual adjustable Driver seat",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Passenger seat with manual 4-way adjustment",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "4-way manual adjustable passenger seat",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Rear 4-6 seat(foldable/unfixed cushion)",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Internationally standardised car seat fitting system(ISOFIX)",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Reading lamp",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Spectacles case",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Sun visor on driver and passenger seat",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Sun visor ( with ticket holder)",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Anti-glare manual interior rearview mirror",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–"
    ],
    [
      "Anti-glare auto rearview mirror",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●"
    ],
    [
      "Dust filter",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Driving recorder joint",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●",
      "–",
      "●"
    ],
    [
      "ETC",
      "○",
      "○",
      "○",
      "○",
      "○",
      "○",
      "○",
      "○",
      "○",
      "○",
      "○",
      "○"
    ],
    [
      "Note：● Standard ○ Optional – Not"
    ]
  ],
  "safeGalleryImages": [
    "/images/products/5-Pickup-Commercial-Version-3.jpg",
    "/images/products/5-Pickup-Commercial-Version-4.jpg",
    "/images/products/5-Pickup-Commercial-Version-5.jpg",
    "/images/products/5-Pickup-Commercial-Version-2.jpg",
    "/images/products/5-Pickup-Commercial-Version-1.jpg",
    "/images/products/5-Pickup-Commercial-Version-6.jpg"
  ],
  "excludedSourceGalleryImages": [],
  "localOnlyUnverifiedGalleryImages": [
    "/images/products/5-Pickup-Commercial-1.jpg",
    "/images/products/5-Pickup-Commercial-2.jpg",
    "/images/products/5-Pickup-Commercial-5.jpg",
    "/images/products/5-Pickup-Commercial-3.jpg",
    "/images/products/5-Pickup-Commercial-6.jpg",
    "/images/products/5-Pickup-Commercial-4.jpg"
  ]
}
```

#### [sinotruk-vgv-vx7](https://sinotruk.international/products/sinotruk-vgv-vx7/)

- 结论：本地与其他 SUV 共用 LZW1030GHU；来源为 2.0TGDI/8AT、5 座的独立 110 行表。
- 来源标题：`Sinotruk VGV VX7`；本地标题：`Sinotruk VGV VX7`。
- 来源参数表：110 行，已在下方完整保留。

```json
{
  "slug": "sinotruk-vgv-vx7",
  "sourceUrl": "https://sinotruk.international/products/sinotruk-vgv-vx7/",
  "category": "light-vehicle",
  "subcategory": "suv",
  "title": "Sinotruk VGV VX7",
  "sourceSummary": {
    "Emission": "National VI",
    "Engine": "2.0TGDI",
    "Gearbox": "8AT",
    "Curb weight (kg)": "1730",
    "Seats": "5"
  },
  "recommendedSpecifications": {
    "Emission": "National VI",
    "Engine": "2.0TGDI",
    "Gearbox": "8AT",
    "Curb weight (kg)": "1730",
    "Seats": "5"
  },
  "sourceDetailedRows": [
    [
      "Configuration Name",
      "VX7"
    ],
    [
      "elite version",
      "Deluxe Edition",
      "Ultimate",
      "Premium Edition"
    ],
    [
      "Manufacturer’s suggested price (10,000 yuan)",
      "11.28",
      "11.78",
      "11.98",
      "15.98"
    ],
    [
      "Basic Information"
    ],
    [
      "Length × width × height (mm)",
      "5015×1870×1732"
    ],
    [
      "Wheelbase (mm)",
      "2800"
    ],
    [
      "Cargo box size (mm)",
      "1114×1438×588"
    ],
    [
      "Curb weight (kg)",
      "1730"
    ],
    [
      "Number of seats",
      "5"
    ],
    [
      "Performance Parameters"
    ],
    [
      "Emission Standards",
      "National VI"
    ],
    [
      "engine",
      "2.0TGDI"
    ],
    [
      "Gearbox",
      "8AT"
    ],
    [
      "Maximum output power kW/rpm",
      "165/5500"
    ],
    [
      "Maximum output torque N·m/rpm",
      "385/1800-3600"
    ],
    [
      "Maximum speed (km/h)",
      "196"
    ],
    [
      "Driving Mode",
      "ECO/SPORT/NORMAL/Snow mode"
    ],
    [
      "Fuel tank capacity (L)",
      "58"
    ],
    [
      "Chassis system"
    ],
    [
      "Braking System",
      "Front ventilated disc/Rear disc"
    ],
    [
      "Suspension",
      "Front McPherson independent suspension/Rear multi-link independent suspension"
    ],
    [
      "steering system",
      "EPS electronic power steering system (standard/comfort/sports three power adjustment options)"
    ],
    [
      "Drive mode",
      "Front front drive"
    ],
    [
      "Wheel specifications",
      "18-inch luxury multi-spoke aluminum alloy wheels"
    ],
    [
      "Tire specifications",
      "225/55R18"
    ],
    [
      "Exterior"
    ],
    [
      "Integrated high and low beam headlights",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Daytime running lights",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Headlights delayed off",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Headlight height adjustment",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Eagle Eye full LED headlights",
      "–",
      "–",
      "●",
      "–"
    ],
    [
      "Sensor LED headlights",
      "–",
      "–",
      "●",
      "–"
    ],
    [
      "LED rear taillight",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "LED high-mount brake light",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Panoramic skylight",
      "–",
      "●",
      "●",
      "–"
    ],
    [
      "Roof rack",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Car window decorative strips",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Sporty body highlights on the side of the car",
      "–",
      "–",
      "○",
      "–"
    ],
    [
      "Interior"
    ],
    [
      "Fabric upholstered seats",
      "●",
      "–",
      "–",
      "●"
    ],
    [
      "Luxurious leather interior seats",
      "○",
      "●",
      "●",
      "○"
    ],
    [
      "Multifunction steering wheel",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Six-way manual adjustment of the driver’s seat",
      "●",
      "●",
      "–",
      "●"
    ],
    [
      "Six-way electric adjustment of the driver’s seat",
      "–",
      "–",
      "●",
      "–"
    ],
    [
      "Steering wheel with adjustable steering force",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Manual anti-glare interior rearview mirror",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Passenger passenger sun visor with vanity mirror and vanity light",
      "–",
      "–",
      "●",
      "–"
    ],
    [
      "Second row seats 4-way adjustable",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Second row center armrest",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "The second row seat cushions can be flipped upright",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "science and technology"
    ],
    [
      "10.25-inch full LCD high-definition instrument panel",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "10.1-inch high-definition waterfall touch screen",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Full LCD air conditioning touch panel",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Electronic shift knob",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Car voice control",
      "–",
      "●",
      "●",
      "–"
    ],
    [
      "Mobile Internet",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Driving Recorder",
      "–",
      "–",
      "●",
      "–"
    ],
    [
      "Bluetooth/Car Phone",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Car navigation",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Internet of Vehicles",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Electric air conditioner",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Second row air conditioning vents",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Keyless entry system",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "One-button start system",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Cruise control",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "One-touch lifting and lowering of the main driving window (with anti-pinch function)",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Remote control opening of all car windows",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Electric adjustment of exterior mirrors",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Electric folding exterior mirrors",
      "–",
      "–",
      "●",
      "–"
    ],
    [
      "Engine compartment pneumatic struts",
      "–",
      "–",
      "●",
      "–"
    ],
    [
      "The second row of 12V power interface",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Speaker (pcs)",
      "4",
      "4",
      "6",
      "4"
    ],
    [
      "Safety"
    ],
    [
      "EPB electronic parking system",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "AUTO HOLD automatic parking system",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Tire Pressure Monitoring System",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Driver airbag",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Passenger airbag",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Rear parking radar",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Reversing camera system",
      "●",
      "●",
      "–",
      "●"
    ],
    [
      "360-degree panoramic imaging system",
      "–",
      "–",
      "●",
      "–"
    ],
    [
      "BOS brake priority system",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Collapsible steering column",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Collision oil cut-off system",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "ABS Anti-lock Braking System",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "EBD brake force distribution system",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "BA Brake Assist System",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "HAC Hill Start Assist System",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "DAC steep slope descent system",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "TCS traction control system",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "ESP vehicle stability system",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "ARP anti-rollover system",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Cargo Box"
    ],
    [
      "Tailgate flip-down opening",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Damping cargo box tailgate",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Electronic unlocking of cargo box tailgate",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Cargo box ladder",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Bottom storage space",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Cargo box lighting",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Cargo box material-hard plastic",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Cargo box drain hole",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "4 cargo box rope hooks",
      "●",
      "●",
      "●",
      "●"
    ],
    [
      "Value-added services"
    ],
    [
      "Online Entertainment",
      "–",
      "–",
      "–",
      "●"
    ],
    [
      "Personalized car body stickers",
      "–",
      "–",
      "–",
      "○"
    ],
    [
      "Extra long warranty",
      "–",
      "–",
      "–",
      "●"
    ],
    [
      "VIP Special Service",
      "–",
      "–",
      "–",
      "●"
    ],
    [
      "Premium service items",
      "–",
      "–",
      "–",
      "●"
    ],
    [
      "Notes: 1. ● Standard configuration, ○ Optional configuration, – No configuration; Statement: All contents of this advertising material are for consultation only. If there is any discrepancy with the actual vehicle, please refer to the actual vehicle."
    ]
  ],
  "safeGalleryImages": [
    "/images/products/3-Pickup-VX7-6.jpg",
    "/images/products/3-Pickup-VX7-4.jpg",
    "/images/products/3-Pickup-VX7-5.jpg",
    "/images/products/3-Pickup-VX7-3.jpg",
    "/images/products/3-Pickup-VX7-2.jpg",
    "/images/products/3-Pickup-VX7-1.jpg"
  ],
  "excludedSourceGalleryImages": [],
  "localOnlyUnverifiedGalleryImages": []
}
```

#### [sinotruk-vgv-u70pro](https://sinotruk.international/products/sinotruk-vgv-u70pro/)

- 结论：本地与其他 SUV 共用 LZW1030GHU；来源为 7 座、154HP、最高 175 km/h 的独立 72 行表。
- 来源标题：`Sinotruk VGV U70PRO`；本地标题：`Sinotruk VGV U70PRO`。
- 来源参数表：72 行，已在下方完整保留。

```json
{
  "slug": "sinotruk-vgv-u70pro",
  "sourceUrl": "https://sinotruk.international/products/sinotruk-vgv-u70pro/",
  "category": "light-vehicle",
  "subcategory": "suv",
  "title": "Sinotruk VGV U70PRO",
  "sourceSummary": {
    "Kerb Mass (kg)": "1565",
    "Trunk Capacity(L)": "Up to 1800L",
    "Max Speed (km/h)": "175",
    "Max Power (HP/rpm)": "154/5600",
    "Seats": "7"
  },
  "recommendedSpecifications": {
    "Kerb Mass (kg)": "1565",
    "Trunk Capacity(L)": "Up to 1800L",
    "Max Speed (km/h)": "175",
    "Max Power (HP/rpm)": "154/5600",
    "Seats": "7"
  },
  "sourceDetailedRows": [
    [
      "U70 PRO Specification"
    ],
    [
      "Specification",
      "U70 PRO Luxury AT"
    ],
    [
      "1.5T + 6AT"
    ],
    [
      "Basic Parameter"
    ],
    [
      "Length X Width X Height (mm)",
      "4825 x 1870 x 1691"
    ],
    [
      "Wheel Base (mm)",
      "2800"
    ],
    [
      "Kerb Mass (kg)",
      "1565"
    ],
    [
      "Ground Clearance (mm)",
      "200(no-load)"
    ],
    [
      "Trunk Capacity(L)",
      "Up to 1800L"
    ],
    [
      "Seats",
      "7"
    ],
    [
      "Performance Parameter"
    ],
    [
      "Max Power (HP/rpm)",
      "154/5600"
    ],
    [
      "Max Torque (N-M/rpm)",
      "215/2000-4000"
    ],
    [
      "Max Speed (km/h)",
      "175"
    ],
    [
      "Fuel Tank Capacity (L)",
      "55"
    ],
    [
      "Chassis System"
    ],
    [
      "Braking System (Front/Rear)",
      "Front Vented Disc/Rear Disc"
    ],
    [
      "Front Suspension/Rear Suspension",
      "McPherson Independent Suspension/Torsion Bar Suspension"
    ],
    [
      "Steering System",
      "EPS(Electic Power Steering)"
    ],
    [
      "Driving Mode",
      "Front Engine, Front Wheel Drive"
    ],
    [
      "Wheel Hub Type",
      "18 inch Multiple Aluminium Alloy Wheel Hub"
    ],
    [
      "Tire Size",
      "225/55R18"
    ],
    [
      "Appearance"
    ],
    [
      "High & Low Beam Integrated Headlight",
      "●"
    ],
    [
      "LED Head Lamp",
      "●"
    ],
    [
      "Day Light",
      "●"
    ],
    [
      "LED Tail Light",
      "●"
    ],
    [
      "Door Sports Exterior Trim",
      "●"
    ],
    [
      "Electric Adjusting Out Rear View Mirror",
      "●"
    ],
    [
      "Oversized Panoramic Sunroof",
      "●"
    ],
    [
      "Roof Rack",
      "●"
    ],
    [
      "Window Strip",
      "●"
    ],
    [
      "Interior Trim"
    ],
    [
      "Brown PU Seat",
      "●"
    ],
    [
      "Multi-steering Wheel",
      "●"
    ],
    [
      "Driver Seat 6 Directions Adjuster (Electrical)",
      "●"
    ],
    [
      "Passenger Seat 4 Directions Adjuster (Manual)",
      "true"
    ],
    [
      "Second row A/C Independent Air Outlets",
      "●"
    ],
    [
      "Intelligent Technology"
    ],
    [
      "10.25inch LCD Meters",
      "●"
    ],
    [
      "10.25inch HD Touchscreen",
      "●"
    ],
    [
      "Bluetooth",
      "●"
    ],
    [
      "Electric AC",
      "●"
    ],
    [
      "Keyless Entry",
      "●"
    ],
    [
      "Keyless Start System",
      "●"
    ],
    [
      "Cruise Control System",
      "●"
    ],
    [
      "Electric Tail Door",
      "●"
    ],
    [
      "Four-door Electric Window (One button down)",
      "●"
    ],
    [
      "Driver Electric Window(Anti-pinch)",
      "●"
    ],
    [
      "Remote Four Door Windows Open",
      "●"
    ],
    [
      "Engine Hood Hydraulic Strut",
      "●"
    ],
    [
      "12V Connector in Second Row",
      "●"
    ],
    [
      "Safety Configuration"
    ],
    [
      "EPB (Electrical Park Brake)",
      "●"
    ],
    [
      "AUTO HOLD",
      "●"
    ],
    [
      "TPM (Tyre Pressure Monitoring System)",
      "●"
    ],
    [
      "Drive Airbag",
      "●"
    ],
    [
      "Co-driver Airbag",
      "●"
    ],
    [
      "Side Airbags",
      "2"
    ],
    [
      "Reverse Sensors",
      "●"
    ],
    [
      "Reverse Image",
      "●"
    ],
    [
      "Ultra-high strength cage body",
      "●"
    ],
    [
      "Enhanced prevention of side impact of boron steel B – pillar",
      "●"
    ],
    [
      "ABS (Anti-lock Braking System)",
      "●"
    ],
    [
      "EBD (Braking Force Distribution System)",
      "●"
    ],
    [
      "BOS (Brake Override System)",
      "●"
    ],
    [
      "HAC (Hill-start Assist Control)",
      "●"
    ],
    [
      "DAC (Decent Assist Control)",
      "●"
    ],
    [
      "TCS (Traction Control System)",
      "●"
    ],
    [
      "ESP (Electonic Stability Program)",
      "●"
    ],
    [
      "ARP (Anti-roll System)",
      "●"
    ],
    [
      "Note: Due to continuous product improvement all specifications above are subject to change by manufacturer without notice. ● Standard ○ Optional – Not Available"
    ]
  ],
  "safeGalleryImages": [
    "/images/products/2-U70PRO-5.jpg",
    "/images/products/2-U70PRO-4.jpg",
    "/images/products/2-U70PRO-6.jpg",
    "/images/products/2-U70PRO-11.jpg",
    "/images/products/2-U70PRO-12.jpg",
    "/images/products/2-U70PRO-10.jpg"
  ],
  "excludedSourceGalleryImages": [],
  "localOnlyUnverifiedGalleryImages": [
    "/images/products/2-U70PRO-1.jpg",
    "/images/products/2-U70PRO-2.jpg",
    "/images/products/2-U70PRO-3.jpg"
  ]
}
```

#### [sinotruk-vgv-u75plus](https://sinotruk.international/products/sinotruk-vgv-u75plus/)

- 结论：本地与其他 SUV 共用 LZW1030GHU；来源为 2.0TGDI/8AT、5 座的独立 83 行表。
- 来源标题：`Sinotruk VGV U75PLUS`；本地标题：`Sinotruk VGV U75PLUS`。
- 来源参数表：83 行，已在下方完整保留。

```json
{
  "slug": "sinotruk-vgv-u75plus",
  "sourceUrl": "https://sinotruk.international/products/sinotruk-vgv-u75plus/",
  "category": "light-vehicle",
  "subcategory": "suv",
  "title": "Sinotruk VGV U75PLUS",
  "sourceSummary": {
    "Emission": "National VI",
    "Engine": "2.0TGDI",
    "Gearbox": "8AT",
    "Maximum speed": "210",
    "Number of seats": "5 seats"
  },
  "recommendedSpecifications": {
    "Emission": "National VI",
    "Engine": "2.0TGDI",
    "Gearbox": "8AT",
    "Maximum speed": "210",
    "Number of seats": "5 seats"
  },
  "sourceDetailedRows": [
    [
      "Model Configuration",
      "U75PLUS Automatic Premium Edition"
    ],
    [
      "Announcement Model",
      "YZ6481YFJB2Z multi-purpose passenger vehicle"
    ],
    [
      "Market guidance price (ten thousand yuan)",
      "18.68"
    ],
    [
      "Basic parameters"
    ],
    [
      "Length × width × height (mm)",
      "4825×1870×1691"
    ],
    [
      "Wheelbase (mm)",
      "2800"
    ],
    [
      "Curb weight (kg)",
      "1680"
    ],
    [
      "Luggage compartment volume (L)",
      "Expandable to 1800L"
    ],
    [
      "Number of seats",
      "5 seats"
    ],
    [
      "Performance Parameters"
    ],
    [
      "Emission Standards",
      "National VI"
    ],
    [
      "engine",
      "2.0TGDI"
    ],
    [
      "Gearbox",
      "8AT"
    ],
    [
      "Maximum output power kW/rpm",
      "165/5500"
    ],
    [
      "Maximum output torque N·m/rpm",
      "385/1800-3600"
    ],
    [
      "Maximum speed (km/h)",
      "210"
    ],
    [
      "Fuel tank capacity (L)",
      "58"
    ],
    [
      "Chassis system"
    ],
    [
      "Braking System",
      "Front ventilated disc/Rear disc"
    ],
    [
      "Suspension",
      "Front McPherson independent suspension/Rear multi-link independent suspension"
    ],
    [
      "steering system",
      "EPS electronic power steering system (three power modes: standard/comfort/sport)"
    ],
    [
      "Drive mode",
      "Front front drive"
    ],
    [
      "Wheel specifications",
      "18-inch luxury multi-spoke aluminum alloy wheels"
    ],
    [
      "Tire specifications",
      "225/55 R18 Famous brand"
    ],
    [
      "Appearance"
    ],
    [
      "High-brightness full LED dual headlights",
      "●"
    ],
    [
      "LED all-weather driving lights",
      "●"
    ],
    [
      "Smoked LED taillights",
      "●"
    ],
    [
      "Large panoramic sunroof",
      "●"
    ],
    [
      "Sport appearance kit",
      "●"
    ],
    [
      "Roof rack",
      "●"
    ],
    [
      "Car window bright strips",
      "●"
    ],
    [
      "Body decoration kit",
      "●"
    ],
    [
      "Boutique Service Package",
      "●"
    ],
    [
      "Comfortable interior"
    ],
    [
      "Leather interior seats",
      "●"
    ],
    [
      "Door interior panel decoration",
      "●"
    ],
    [
      "Leather multifunction steering wheel",
      "●"
    ],
    [
      "Six-way electric adjustment of the driver’s seat",
      "●"
    ],
    [
      "Second row comfortable multifunctional seats (4-way adjustment)",
      "●"
    ],
    [
      "Luggage compartment curtain (five seats)",
      "●"
    ],
    [
      "Intelligent Technology"
    ],
    [
      "10.25-inch full LCD high-definition instrument panel",
      "●"
    ],
    [
      "10.1-inch high-definition waterfall touch screen",
      "●"
    ],
    [
      "Electronic knob shift",
      "●"
    ],
    [
      "Intelligent voice control system",
      "●"
    ],
    [
      "Car driving recorder",
      "High pixel/wide angle/large memory"
    ],
    [
      "360-degree panoramic imaging system",
      "●"
    ],
    [
      "Bluetooth/Car Phone",
      "●"
    ],
    [
      "GPS Navigation System",
      "●"
    ],
    [
      "Electric air conditioner",
      "●"
    ],
    [
      "Keyless entry system",
      "●"
    ],
    [
      "One-button start system",
      "●"
    ],
    [
      "Cruise control",
      "●"
    ],
    [
      "Smart electric tailgate",
      "●"
    ],
    [
      "Internet of Vehicles",
      "●"
    ],
    [
      "All car windows can be lowered electrically with one button",
      "●"
    ],
    [
      "Electric anti-pinch system for main driving window",
      "●"
    ],
    [
      "Remote control opening of all car windows",
      "●"
    ],
    [
      "Electric folding exterior mirrors",
      "●"
    ],
    [
      "Engine compartment pneumatic struts",
      "●"
    ],
    [
      "The second row of 12V power interface",
      "●"
    ],
    [
      "sound system",
      "6-channel surround sound quality"
    ],
    [
      "All-round security"
    ],
    [
      "Four driving modes: Economy/Sports/Standard/Snow",
      "●"
    ],
    [
      "EPB electronic parking system",
      "●"
    ],
    [
      "AUTO HOLD automatic parking system",
      "●"
    ],
    [
      "Tire Pressure Monitoring System",
      "●"
    ],
    [
      "Ultra-high strength cage-type lightweight body",
      "●"
    ],
    [
      "Boron steel B-pillar to strengthen side impact protection",
      "●"
    ],
    [
      "Driver airbag",
      "●"
    ],
    [
      "Passenger airbag",
      "●"
    ],
    [
      "Rear parking radar",
      "●"
    ],
    [
      "ABS Anti-lock Braking System",
      "●"
    ],
    [
      "EBD brake force distribution system",
      "●"
    ],
    [
      "TCS traction control system",
      "●"
    ],
    [
      "HAC Hill Start Assist System",
      "●"
    ],
    [
      "DAC steep slope descent system",
      "●"
    ],
    [
      "ESP vehicle stability system",
      "●"
    ],
    [
      "ARP active crosswind and rollover protection system",
      "●"
    ],
    [
      "LDW Lane Departure Warning",
      "●"
    ],
    [
      "FCW forward collision warning",
      "●"
    ],
    [
      "Note: 1. ● Standard configuration, ○ Optional configuration, – No configuration;"
    ]
  ],
  "safeGalleryImages": [
    "/images/products/1-SUV-U75PLUS-4.jpg",
    "/images/products/1-SUV-U75PLUS-2.jpg",
    "/images/products/1-SUV-U75PLUS-3.jpg",
    "/images/products/1-SUV-U75PLUS-5.jpg",
    "/images/products/1-SUV-U75PLUS.jpg",
    "/images/products/1-SUV-U75PLUS-1.jpg"
  ],
  "excludedSourceGalleryImages": [],
  "localOnlyUnverifiedGalleryImages": [
    "/images/products/1-SUV-U75PLUS-6.jpg"
  ]
}
```

### 3.5 semi-trailer（5 款）

#### [sinotruck-fuel-tanker-trailer-truck](https://sinotruk.international/products/sinotruck-fuel-tanker-trailer-truck/)

- 结论：来源没有参数表，摘要尺寸单位又写成 `m`；不可发布详细参数，只保留产品类型和经确认的图片。
- 来源标题：`Sinotruck Fuel Tanker Trailer Truck`；本地标题：`Sinotruck Fuel Tanker Trailer Truck`。
- 来源参数表：**无表格，禁止用本地模板补齐**。

```json
{
  "slug": "sinotruck-fuel-tanker-trailer-truck",
  "sourceUrl": "https://sinotruk.international/products/sinotruck-fuel-tanker-trailer-truck/",
  "category": "semi-trailer",
  "subcategory": "semi-trailer",
  "title": "Sinotruck Fuel Tanker Trailer Truck",
  "sourceSummary": {
    "Dimension": "11700*2500*3800m",
    "Weight (KG)": "Max.80 tons",
    "Axle": "2/3/4/5/6",
    "King Pin": "2.0 or 3.5 inch",
    "Landing Gear": "JOST brand"
  },
  "recommendedSpecifications": {},
  "sourceDetailedRows": [],
  "safeGalleryImages": [
    "/images/products/6-Fuel-Tanker-Trailer-6.jpg",
    "/images/products/6-Fuel-Tanker-Trailer-5.jpg",
    "/images/products/6-Fuel-Tanker-Trailer-3.jpg",
    "/images/products/6-Fuel-Tanker-Trailer-4.jpg",
    "/images/products/6-Fuel-Tanker-Trailer-2.jpg",
    "/images/products/6-Fuel-Tanker-Trailer-7.jpg"
  ],
  "excludedSourceGalleryImages": [],
  "localOnlyUnverifiedGalleryImages": [
    "/images/products/6-Fuel-Tanker-Trailer-1.jpg"
  ]
}
```

#### [sinotruck-fence-semi-trailer-truck](https://sinotruk.international/products/sinotruck-fence-semi-trailer-truck/)

- 结论：来源没有参数表；不可发布本地皮卡详情，也不能把摘要 70 tons 直接当已验证载荷。
- 来源标题：`Sinotruck Fence Semi Trailer Truck`；本地标题：`Sinotruck Fence Semi Trailer Truck`。
- 来源参数表：**无表格，禁止用本地模板补齐**。

```json
{
  "slug": "sinotruck-fence-semi-trailer-truck",
  "sourceUrl": "https://sinotruk.international/products/sinotruck-fence-semi-trailer-truck/",
  "category": "semi-trailer",
  "subcategory": "semi-trailer",
  "title": "Sinotruck Fence Semi Trailer Truck",
  "sourceSummary": {
    "Dimension": "13000*2500*3350mm",
    "Weight (KG)": "Max.70 tons",
    "Axle": "2/3/4/5/6",
    "King Pin": "90#",
    "Landing Gear": "JOST brand"
  },
  "recommendedSpecifications": {},
  "sourceDetailedRows": [],
  "safeGalleryImages": [
    "/images/products/5-Fence-Semi-Trailer-6-1.jpg",
    "/images/products/5-Fence-Semi-Trailer-4.jpg",
    "/images/products/5-Fence-Semi-Trailer-7.jpg",
    "/images/products/5-Fence-Semi-Trailer-3.jpg",
    "/images/products/5-Fence-Semi-Trailer-2.jpg",
    "/images/products/5-Fence-Semi-Trailer-5-1.jpg"
  ],
  "excludedSourceGalleryImages": [],
  "localOnlyUnverifiedGalleryImages": [
    "/images/products/5-Fence-Semi-Trailer-1.jpg",
    "/images/products/5-Fence-Semi-Trailer-5.jpg",
    "/images/products/5-Fence-Semi-Trailer-6.jpg"
  ]
}
```

#### [sinotruck-sidewall-semi-trailer-truck](https://sinotruk.international/products/sinotruck-sidewall-semi-trailer-truck/)

- 结论：本地为皮卡模板；来源有 21 行侧墙半挂表，可作为待核验底稿。
- 来源标题：`Sinotruck Sidewall Semi Trailer Truck`；本地标题：`Sinotruck Sidewall Semi Trailer Truck`。
- 来源参数表：21 行，已在下方完整保留。

```json
{
  "slug": "sinotruck-sidewall-semi-trailer-truck",
  "sourceUrl": "https://sinotruk.international/products/sinotruck-sidewall-semi-trailer-truck/",
  "category": "semi-trailer",
  "subcategory": "semi-trailer",
  "title": "Sinotruck Sidewall Semi Trailer Truck",
  "sourceSummary": {
    "Dimension": "12500x2500x3260mm",
    "Weight (KG)": "Max.70 tons",
    "Axle": "2/3/4/5/6",
    "King Pin": "90#",
    "Landing Gear": "JOST brand"
  },
  "recommendedSpecifications": {
    "Dimension": "12500x2500x3260mm",
    "Weight (KG)": "Max.70 tons",
    "Axle": "2/3/4/5/6",
    "King Pin": "90#",
    "Landing Gear": "JOST brand"
  },
  "sourceDetailedRows": [
    [
      "Product Name",
      "3 Axle Side Wall Semi Trailer"
    ],
    [
      "Usage",
      "Transport of Cargo Goods and Container"
    ],
    [
      "Weight",
      "Loading Weight",
      "60Ton"
    ],
    [
      "Overall Size",
      "12500x2500x2200mm"
    ],
    [
      "Frame",
      "Design/ Welding Technology",
      "Heavy Duty and Extra Durablity Designed; Welding by Automatic Submerged-Arc Processes"
    ],
    [
      "Main Beam",
      "High Strength T700 Steel. Upper Plate Thickness is 14mm, Down Plate Thickness is 16mm, Middle Plate Thickness is 8mm."
    ],
    [
      "Side Beam",
      "16#Channel Steel"
    ],
    [
      "Platform Plate",
      "3mm Diamond Plate"
    ],
    [
      "Parts",
      "Axle",
      "FUWA 3 Axle"
    ],
    [
      "King Pin",
      "2.0 or 3.5 Inch Bolts Type or Welding Type"
    ],
    [
      "Suspension",
      "Mechanical Suspension, Thickening"
    ],
    [
      "Leaf Spring",
      "Heavy Duty Standard Leaf Spring 90(W)mm×13(Thickness)mm×10(Layer)"
    ],
    [
      "Laning Gear",
      "Standard 28Ton"
    ],
    [
      "Tire",
      "12R22.5 *12 Pieces"
    ],
    [
      "Steel Rim",
      "9.00×22.5 *12 Pieces"
    ],
    [
      "Brake System",
      "Dual Line Braking System"
    ],
    [
      "ABS",
      "Without ABS(Optional)"
    ],
    [
      "Electrical",
      "24V, 7 Pin Socket, One Set 7-Core Standard Cable (Rear and Tail Combination Lights, Side Marker Lights, License Plate Lights, Brake Lights)"
    ],
    [
      "Painting",
      "Two Component Paint"
    ],
    [
      "Spare Tire Frame",
      "2 Sets"
    ],
    [
      "Tool Box",
      "1 Set(1×0.5×0.5M)"
    ]
  ],
  "safeGalleryImages": [
    "/images/products/4-Sidewall-Semi-Trailer-6.jpg",
    "/images/products/4-Sidewall-Semi-Trailer-5.jpg",
    "/images/products/4-Sidewall-Semi-Trailer-7.jpg",
    "/images/products/4-Sidewall-Semi-Trailer-3.jpg",
    "/images/products/4-Sidewall-Semi-Trailer-2.jpg",
    "/images/products/4-Sidewall-Semi-Trailer-4.jpg"
  ],
  "excludedSourceGalleryImages": [],
  "localOnlyUnverifiedGalleryImages": [
    "/images/products/4-Sidewall-Semi-Trailer-1.jpg"
  ]
}
```

#### [sinotruck-flatbed-semi-trailer-truck](https://sinotruk.international/products/sinotruck-flatbed-semi-trailer-truck/)

- 结论：本地为皮卡模板；来源有 14 行平板半挂表，但摘要尺寸单位 `m` 错误，采用详细表单位。
- 来源标题：`Sinotruck Flatbed Semi Trailer Truck`；本地标题：`Sinotruck Flatbed Semi Trailer Truck`。
- 来源参数表：14 行，已在下方完整保留。

```json
{
  "slug": "sinotruck-flatbed-semi-trailer-truck",
  "sourceUrl": "https://sinotruk.international/products/sinotruck-flatbed-semi-trailer-truck/",
  "category": "semi-trailer",
  "subcategory": "semi-trailer",
  "title": "Sinotruck Flatbed Semi Trailer Truck",
  "sourceSummary": {
    "Dimension": "11700*2500*3800m",
    "Weight (KG)": "Max.80 tons",
    "Axle": "2/3/4/5/6",
    "King Pin": "2.0 or 3.5 inch",
    "Landing Gear": "JOST brand"
  },
  "recommendedSpecifications": {
    "Dimension": "11700*2500*3800m",
    "Weight (KG)": "Max.80 tons",
    "Axle": "2/3/4/5/6",
    "King Pin": "2.0 or 3.5 inch",
    "Landing Gear": "JOST brand"
  },
  "sourceDetailedRows": [
    [
      "Dump Tipper Semi Trailer Specifications"
    ],
    [
      "Outside Dimension",
      "11700x 2500x 3800mm"
    ],
    [
      "Payload",
      "Max.80T capacity"
    ],
    [
      "Lifting System",
      "HYVA brand oil cylinder 202 model"
    ],
    [
      "Main Beam",
      "Q345B carbon steel, ‘H” type"
    ],
    [
      "Frame Beam(Heavy duty)",
      "Upper and lower plate is 16mm and 18mm, Double middle is 10+10 mm. Height is 500 mm"
    ],
    [
      "Box thickness",
      "Bottom plate:8mm Side plate:6mm"
    ],
    [
      "Axle",
      "4 axles 16tons BPW or FUWA"
    ],
    [
      "Landing Gear",
      "JOST brand 28tons with two speeds"
    ],
    [
      "King Pin",
      "2.0 or 3.5 inch"
    ],
    [
      "Suspension",
      "Mechanical suspension reinforced type"
    ],
    [
      "Leaf Spring(Strength)",
      "90mm(W)*16mm(T)*10 Layer"
    ],
    [
      "Tires",
      "12R22.5, 315/80R22.5"
    ],
    [
      "Color/Logo",
      "By customer demand"
    ]
  ],
  "safeGalleryImages": [
    "/images/products/2-Flatbed-Semi-Trailer-4.jpg",
    "/images/products/2-Flatbed-Semi-Trailer-5.jpg",
    "/images/products/2-Flatbed-Semi-Trailer-6.jpg",
    "/images/products/2-Flatbed-Semi-Trailer-7.jpg",
    "/images/products/2-Flatbed-Semi-Trailer-8.jpg",
    "/images/products/2-Flatbed-Semi-Trailer-2.jpg"
  ],
  "excludedSourceGalleryImages": [],
  "localOnlyUnverifiedGalleryImages": [
    "/images/products/2-Flatbed-Semi-Trailer-1.jpg",
    "/images/products/2-Flatbed-Semi-Trailer-3.jpg"
  ]
}
```

#### [sinotruck-low-bed-semi-trailer-truck](https://sinotruk.international/products/sinotruck-low-bed-semi-trailer-truck/)

- 结论：本地为皮卡模板；来源有 22 行低平板表，载荷/车轴/材料等强事实发布前确认。
- 来源标题：`Sinotruck Low Bed Semi Trailer Truck`；本地标题：`Sinotruck Low Bed Semi Trailer Truck`。
- 来源参数表：22 行，已在下方完整保留。

```json
{
  "slug": "sinotruck-low-bed-semi-trailer-truck",
  "sourceUrl": "https://sinotruk.international/products/sinotruck-low-bed-semi-trailer-truck/",
  "category": "semi-trailer",
  "subcategory": "semi-trailer",
  "title": "Sinotruck Low Bed Semi Trailer Truck",
  "sourceSummary": {
    "Dimension": "16000*3000*1700mm",
    "Weight (KG)": "Max.70 tons",
    "Axle": "2/3/4/5/6",
    "King Pin": "90#",
    "Landing Gear": "JOST brand"
  },
  "recommendedSpecifications": {
    "Dimension": "16000*3000*1700mm",
    "Weight (KG)": "Max.70 tons",
    "Axle": "2/3/4/5/6",
    "King Pin": "90#",
    "Landing Gear": "JOST brand"
  },
  "sourceDetailedRows": [
    [
      "Overall Dimension(mm)",
      "13000x3000x1700mm"
    ],
    [
      "Working Deck Dimension(mm)",
      "9000x3000x1350mm"
    ],
    [
      "Platform thickness(mm)",
      "4mm"
    ],
    [
      "Main Beam",
      "“H”main beam design,345B carbon steel, the height of the beam is 500mm, upper plate is 16mm,down plate is 18mm,middle plate is 10mm."
    ],
    [
      "Wheelbase",
      "7,650mm+1,310mm+1,310mm"
    ],
    [
      "Plyload",
      "60,000kg"
    ],
    [
      "Axle",
      "3X13Ton,ZYbrand optional FUWA brand one hundred fifty thousand Kilometers no need maintenance"
    ],
    [
      "Tire",
      "1100R20,12pcs Taitong brand"
    ],
    [
      "Rim",
      "8.0*22.5 steel disc wheel,10 holes ISO,12pcs"
    ],
    [
      "Suspension system",
      "Common Mechanical Suspension"
    ],
    [
      "Steel Spring",
      "10/10/10 leaf spring with 90mm(W)*13mm(thickness)"
    ],
    [
      "Brake air chamber",
      "6 units T30/30 spring brake chambers"
    ],
    [
      "Emergency relay valve",
      "Wabco relay valve"
    ],
    [
      "Traction/King Pin",
      "2″and3.5″ removable Kingpin"
    ],
    [
      "Landing Gear",
      "28ton"
    ],
    [
      "Tool box",
      "1pcs,One crank and ont shaft head wrench"
    ],
    [
      "Ramp",
      "Heavy duty trailer ramp"
    ],
    [
      "Spare theel carriers",
      "2pcs"
    ],
    [
      "bumper",
      "Rear bumper"
    ],
    [
      "Electrical system",
      "1.Voltage; 21v 2.Receptacle;7 ways(7 wire hamess)"
    ],
    [
      "Tail lamp with tum signal,brake light&reflector,side lamp etc."
    ],
    [
      "One set 6-core eletric cable protected by PVC conduit on main farme"
    ]
  ],
  "safeGalleryImages": [
    "/images/products/3-Low-Bed-Semi-Trailer-3.jpg",
    "/images/products/3-Low-Bed-Semi-Trailer-2.jpg",
    "/images/products/3-Low-Bed-Semi-Trailer-4.jpg",
    "/images/products/3-Low-Bed-Semi-Trailer-5.jpg",
    "/images/products/3-Low-Bed-Semi-Trailer-6.jpg",
    "/images/products/3-Low-Bed-Semi-Trailer-7.jpg"
  ],
  "excludedSourceGalleryImages": [],
  "localOnlyUnverifiedGalleryImages": [
    "/images/products/3-Low-Bed-Semi-Trailer-1.jpg"
  ]
}
```

### 3.6 new-energy-vehicle（3 款）

#### [howo-pure-electric-dump-truck](https://sinotruk.international/products/howo-pure-electric-dump-truck/)

- 结论：来源顶部摘要仍是柴油轻卡模板，禁止使用；只保留下方纯电详细表并再次核验。Gallery 去重。
- 来源标题：`Howo Pure Electric Dump Truck`；本地标题：`Howo Pure Electric Dump Truck`。
- 来源参数表：19 行，已在下方完整保留。

```json
{
  "slug": "howo-pure-electric-dump-truck",
  "sourceUrl": "https://sinotruk.international/products/howo-pure-electric-dump-truck/",
  "category": "new-energy-vehicle",
  "subcategory": "new-energy",
  "title": "Howo Pure Electric Dump Truck",
  "sourceSummary": {
    "Drive type": "8x4",
    "Transmission": "5F,6F",
    "Front axle": "2.4T/2.7T",
    "Engine": "Euro II-Euro III",
    "Power": "102-116Hp"
  },
  "recommendedSpecifications": {},
  "sourceDetailedRows": [
    [
      "Urban construction waste",
      "Short fall in the field"
    ],
    [
      "Drive type",
      "8×4"
    ],
    [
      "model",
      "ZZ3317 V326 GZ1BEV",
      "ZZ3317 V426 GZ1BEV"
    ],
    [
      "Cab",
      "TX-K/ TX-F",
      "TX-K",
      "TX-F"
    ],
    [
      "Cargo compartment size (mm)",
      "5600",
      "5800",
      "7600/7800",
      "8000/8200"
    ],
    [
      "Overall dimensions (mm)",
      "9745× 2550× 3450",
      "9750× 2550× 3450",
      "10650/ 10680× 2550× 3600",
      "11050/ 11250× 2550× 3600"
    ],
    [
      "Wheelbase (mm)",
      "1800+ 3225+ 1350",
      "1800+ 3525+ 1350",
      "1800+ 4225+ 1350",
      "1800+ 4425+ 1350"
    ],
    [
      "Vehicle fully loaded mass (kg)",
      "31000"
    ],
    [
      "Front axle",
      "VGD75 front axle (drum)",
      "VGD95 front axle (drum)"
    ],
    [
      "Rear axle",
      "MCX16ZG/MCP16ZG double rear axle (drum)",
      "MCP16ZG double rear axle (drum)",
      "MCP16ZG/MCP23ZG double rear axle (drum)",
      "MCP23ZG double rear axle (drum)"
    ],
    [
      "Suspension",
      "11/11/12"
    ],
    [
      "tire",
      "11.00R20/12.00R20",
      "12.00R20"
    ],
    [
      "Motor",
      "Sinotruk"
    ],
    [
      "Motor power (kW)",
      "270/410"
    ],
    [
      "Battery",
      "CATL Lithium Iron Phosphate"
    ],
    [
      "Power(kWh)",
      "422",
      "350"
    ],
    [
      "Maximum speed (km/h)",
      "89"
    ],
    [
      "Maximum grade(%)",
      "30"
    ],
    [
      "Turning radius (mm)",
      "10170",
      "10750",
      "11670",
      "11960"
    ]
  ],
  "safeGalleryImages": [
    "/images/products/Howo-Pure-electric-Dump-Truck-2.jpg",
    "/images/products/Howo-Pure-electric-Dump-Truck-1.jpg"
  ],
  "excludedSourceGalleryImages": [],
  "localOnlyUnverifiedGalleryImages": [
    "/images/products/Howo-Pure-electric-Dump-Truck-5.jpg",
    "/images/products/Howo-Pure-electric-Dump-Truck-3.jpg",
    "/images/products/Howo-Pure-electric-Dump-Truck-6.jpg",
    "/images/products/Howo-Pure-electric-Dump-Truck-4.jpg"
  ]
}
```

#### [howo-pure-electric-tractor-truck](https://sinotruk.international/products/howo-pure-electric-tractor-truck/)

- 结论：来源顶部摘要仍是柴油轻卡模板，禁止使用；只保留下方换电/纯电详细表并再次核验。Gallery 去重。
- 来源标题：`Howo Pure Electric Tractor truck`；本地标题：`Howo Pure Electric Tractor Truck`。
- 来源参数表：16 行，已在下方完整保留。

```json
{
  "slug": "howo-pure-electric-tractor-truck",
  "sourceUrl": "https://sinotruk.international/products/howo-pure-electric-tractor-truck/",
  "category": "new-energy-vehicle",
  "subcategory": "new-energy",
  "title": "Howo Pure Electric Tractor truck",
  "sourceSummary": {
    "Drive type": "4x2",
    "Transmission": "5F,6F",
    "Front axle": "2.4T/2.7T",
    "Engine": "Euro II-Euro III",
    "Power": "102-116Hp"
  },
  "recommendedSpecifications": {},
  "sourceDetailedRows": [
    [
      "Market segments",
      "City distribution, commerce, cold chain",
      "Commerce, intercity"
    ],
    [
      "Drive type",
      "4×2"
    ],
    [
      "model",
      "ZZ5047 XXYG 3314Z145 BEV86",
      "ZZ5047 XXYH 3414Z147 BEV96",
      "ZZ5047 XXYG 3314Z147 BEV",
      "ZZ5047 XXYH 3414Z147 BEVA0",
      "ZZ5047 CCYH 3414Z145 BEVD1"
    ],
    [
      "Cargo box size (mm)",
      "4150× 2100× 2100",
      "4150× 2100× 2100",
      "4150× 2100× 2100",
      "4150× 2100× 2100",
      "4150× 2100× 2100"
    ],
    [
      "Overall dimen- sions (mm)",
      "5990× 2170× 3100",
      "5990× 2170× 3100",
      "5990× 2170× 3100",
      "5990× 2170× 3100",
      "5990× 2170× 3100"
    ],
    [
      "Wheel- base (mm)",
      "3280",
      "3360",
      "3280",
      "3360",
      "3360"
    ],
    [
      "Vehicle fully loaded mass (kg)",
      "4495",
      "4494",
      "4495",
      "4495",
      "4495"
    ],
    [
      "Braking type",
      "Hydraulic brake",
      "Air brake",
      "Air brake",
      "Air brake, hydraulic brake",
      "Air brake"
    ],
    [
      "Drive axle",
      "Hande electric drive axle",
      "Sinotruk Electric Drive Axle",
      "Sinotruk Electric Drive Axle",
      "Sinotruk, Hande electric drive axle",
      "Sinotruk Electric Drive Axle"
    ],
    [
      "Suspension",
      "3/3+2, 3/5+3",
      "3/ 3+2, 3/ 5+3",
      "3/ 3+2, 3/5+3",
      "3/ 3+2, 3/ 5+3",
      "3/ 3+2, 3/ 5+3"
    ],
    [
      "tire",
      "7.00 R16LT",
      "7.00 R16LT",
      "7.00 R16LT",
      "7.00 R16",
      "7.00 R16LT"
    ],
    [
      "Motor power (kW)",
      "120",
      "140",
      "140",
      "140",
      "140"
    ],
    [
      "Battery",
      "CATL lithium iron phos-phate battery",
      "Fudi lithium iron phos-phate blade battery",
      "CATL lithium iron phos-phate battery",
      "CATL lithium iron phos-phate battery",
      "Fudi lithium iron phos-phate blade battery"
    ],
    [
      "Power (kWh)",
      "86.55",
      "96.26",
      "100.27",
      "100.46",
      "131.98"
    ],
    [
      "Maxi- mum speed (km/h)",
      "90",
      "90",
      "90",
      "90",
      "90"
    ],
    [
      "Maxi- mum grade(%)",
      "20",
      "20",
      "20",
      "20",
      "20"
    ]
  ],
  "safeGalleryImages": [
    "/images/products/2-Howo-Pure-electric-Tractor-truck-1.jpg",
    "/images/products/2-Howo-Pure-electric-Tractor-truck-2.jpg"
  ],
  "excludedSourceGalleryImages": [],
  "localOnlyUnverifiedGalleryImages": [
    "/images/products/2-Howo-Pure-electric-Tractor-truck-5.jpg",
    "/images/products/2-Howo-Pure-electric-Tractor-truck-3.jpg",
    "/images/products/2-Howo-Pure-electric-Tractor-truck-6.jpg",
    "/images/products/2-Howo-Pure-electric-Tractor-truck-4.jpg"
  ]
}
```

#### [howo-pure-electric-single-side-dock-tractor-truck](https://sinotruk.international/products/howo-pure-electric-single-side-dock-tractor-truck/)

- 结论：来源顶部摘要仍是柴油轻卡模板，且 Gallery 混入纯电轻卡和普通纯电牵引车；只保留本系列首图，详细表需核验。
- 来源标题：`Howo Pure Electric Single Side Dock Tractor Truck`；本地标题：`Howo Pure Electric Single Side Dock Tractor Truck`。
- 来源参数表：16 行，已在下方完整保留。

```json
{
  "slug": "howo-pure-electric-single-side-dock-tractor-truck",
  "sourceUrl": "https://sinotruk.international/products/howo-pure-electric-single-side-dock-tractor-truck/",
  "category": "new-energy-vehicle",
  "subcategory": "new-energy",
  "title": "Howo Pure Electric Single Side Dock Tractor Truck",
  "sourceSummary": {
    "Drive type": "4x2",
    "Transmission": "5F,6F",
    "Front axle": "2.4T/2.7T",
    "Engine": "Euro II-Euro III",
    "Power": "102-116Hp"
  },
  "recommendedSpecifications": {},
  "sourceDetailedRows": [
    [
      "Market segments",
      "City distribution, commerce, cold chain",
      "Commerce, intercity"
    ],
    [
      "Drive type",
      "4×2"
    ],
    [
      "model",
      "ZZ5047 XXYG 3314Z145 BEV86",
      "ZZ5047 XXYH 3414Z147 BEV96",
      "ZZ5047 XXYG 3314Z147 BEV",
      "ZZ5047 XXYH 3414Z147 BEVA0",
      "ZZ5047 CCYH 3414Z145 BEVD1"
    ],
    [
      "Cargo box size (mm)",
      "4150× 2100× 2100",
      "4150× 2100× 2100",
      "4150× 2100× 2100",
      "4150× 2100× 2100",
      "4150× 2100× 2100"
    ],
    [
      "Overall dimen- sions (mm)",
      "5990× 2170× 3100",
      "5990× 2170× 3100",
      "5990× 2170× 3100",
      "5990× 2170× 3100",
      "5990× 2170× 3100"
    ],
    [
      "Wheel- base (mm)",
      "3280",
      "3360",
      "3280",
      "3360",
      "3360"
    ],
    [
      "Vehicle fully loaded mass (kg)",
      "4495",
      "4494",
      "4495",
      "4495",
      "4495"
    ],
    [
      "Braking type",
      "Hydraulic brake",
      "Air brake",
      "Air brake",
      "Air brake, hydraulic brake",
      "Air brake"
    ],
    [
      "Drive axle",
      "Hande electric drive axle",
      "Sinotruk Electric Drive Axle",
      "Sinotruk Electric Drive Axle",
      "Sinotruk, Hande electric drive axle",
      "Sinotruk Electric Drive Axle"
    ],
    [
      "Suspension",
      "3/3+2, 3/5+3",
      "3/ 3+2, 3/ 5+3",
      "3/ 3+2, 3/5+3",
      "3/ 3+2, 3/ 5+3",
      "3/ 3+2, 3/ 5+3"
    ],
    [
      "tire",
      "7.00 R16LT",
      "7.00 R16LT",
      "7.00 R16LT",
      "7.00 R16",
      "7.00 R16LT"
    ],
    [
      "Motor power (kW)",
      "120",
      "140",
      "140",
      "140",
      "140"
    ],
    [
      "Battery",
      "CATL lithium iron phos-phate battery",
      "Fudi lithium iron phos-phate blade battery",
      "CATL lithium iron phos-phate battery",
      "CATL lithium iron phos-phate battery",
      "Fudi lithium iron phos-phate blade battery"
    ],
    [
      "Power (kWh)",
      "86.55",
      "96.26",
      "100.27",
      "100.46",
      "131.98"
    ],
    [
      "Maxi- mum speed (km/h)",
      "90",
      "90",
      "90",
      "90",
      "90"
    ],
    [
      "Maxi- mum grade(%)",
      "20",
      "20",
      "20",
      "20",
      "20"
    ]
  ],
  "safeGalleryImages": [
    "/images/products/Single-Side-Dock-Series.jpg"
  ],
  "excludedSourceGalleryImages": [
    "/images/products/Howo-Pure-electric-light-truck-1.jpg",
    "/images/products/2-Howo-Pure-electric-Tractor-truck-1.jpg"
  ],
  "localOnlyUnverifiedGalleryImages": [
    "/images/products/Single-Side-Dock-Series-2.jpg",
    "/images/products/Single-Side-Dock-Series-5.jpg",
    "/images/products/Single-Side-Dock-Series-3.jpg",
    "/images/products/Single-Side-Dock-Series-6.jpg",
    "/images/products/Single-Side-Dock-Series-4.jpg"
  ]
}
```

## 4. Performance、Applications、Solutions 与 Customer Service 事实边界

### 4.1 Performance

- 全部 53 个来源页也高度复用 Performance；多数重卡/轻卡重复三张 `img30/31/32.jpg` 与同一方向盘文案，不能证明每款车都有相同配置。
- 本地专用车的 2.0T、ESP、麦弗逊、皮革内饰、10.25 英寸屏，以及半挂/新能源的 2.0T+8AT、Pickup 平台，是明确错配，全部删除。
- 新 Performance 只能从该 slug 的已确认详细参数和安全图片生成；若图片不能确认部件，就只写车型级概述，不创建图片功能卡。

### 4.2 Application Areas

全部 53 页与上一轮 6 页使用相同的物流、建筑、矿业、农业模板。它只能作为栏目结构参考。发布时按产品类型选择：自卸对应工程/矿区物料，牵引车对应干线/区域运输，专用车按上装用途，半挂按车身类型，新能源按已验证运营路线；不允许每页全选四类。

### 4.3 Solutions

全部页面复用 Fuel Efficiency、Heavy Payload、Cold Chain、Digital Fleet，并带 15%、70 tons、-30°C~+30°C、20% 等数字。除非本项目另有试验和产品资料，这些数字全部不得使用。Solutions 应改为配置匹配、上装/车身方案、运输与交付准备等可证实内容。

### 4.4 Customer Service

全部页面复用 Technical Support、Parts Supply、Maintenance Services、Training Programs。本站代码可证实：售后信息与指导、维护手册/日常检查、维修准备、按车型/VIN/零件号识别配件、联系/询价入口。本站不能证实：24/7、现场排障、远程诊断、全球服务网/库存、特快交付、认证培训和固定响应时限。实现时去掉邮箱，也不把通用 Contact 页面命名为服务中心定位器或课程目录。

## 5. 错配画廊与去重规则

以下高风险项已在每个 JSON 的 `safeGalleryImages` 中排除；未列出的来源 Gallery 按文件名前缀与页面一致，但仍需人工看图确认。

| slug | 必须排除/处理 | 原因 |
| --- | --- | --- |
| `howo-tx-8x4-cargo-truck` | 4×2 Cargo、6×4 Tractor 两图 | 跨驱动/跨产品 |
| `howo-n-6x4-cargo-truck` | N 8×4 Cargo 图 | 跨驱动 |
| `howo-n-8x4-cargo-truck` | 两张 Dump Truck 图 | 跨产品 |
| `howo-box-van-cargo-truck` | Wing Van 图 | 跨上装 |
| `howo-light-stake-truck` | 重复的 Stake-1 | 重复图只保留一次 |
| `howo-refrigerator-cargo-truck` | 重复的 Refrigerator-1 | 重复图只保留一次 |
| `sinotruck-howo-water-tanker-2` | 整页与无后缀水罐页重复 | 不能把重复素材包装成独立型号 |
| `howo-mixer-truck-t7h-6x4` | 3-Mixer 图 | 跨系列 |
| `howo-mixer-truck-t7h-8x4` | HOWO 7、TX 图 | 跨系列；只剩自身首图 |
| `sinotruck-pickup-passenger-version` | Pickup Off-road 图 | 跨版本 |
| `howo-pure-electric-dump-truck` | 重复首图 | 去重后只保留 2 张 |
| `howo-pure-electric-tractor-truck` | 重复首图 | 去重后只保留 2 张 |
| `howo-pure-electric-single-side-dock-tractor-truck` | Pure Electric Light Truck、普通 Pure Electric Tractor 两图 | 跨产品；只保留 Single-Side-Dock-Series 首图 |

本地专用车、轻型车、半挂和新能源大量存在“本地文件确实存在，但不在来源 Gallery”的额外图片。它们已列在每个 JSON 的 `localOnlyUnverifiedGalleryImages`；在人工确认归属前不得加入安全画廊。

## 6. 代码落地顺序

1. 读取第 3 节 JSON，按 slug 替换错误的 `specifications` / `detailedFeatures`；`recommendedSpecifications: {}` 的产品不要发布顶部参数。
2. 对 `sourceDetailedRows: []` 的 Fuel Tanker Trailer 和 Fence Semi Trailer 删除本地皮卡详情，只保留经确认的产品类型和图片。
3. Gallery 只使用 `safeGalleryImages`；对不足 3 张的产品不要用跨产品图凑数。
4. 删除全部通用 Performance 项，按“已确认参数 + 已确认画面”逐产品重写；证据不足时允许不显示卡片。
5. Applications、Solutions 按类别和已确认用途改写；Customer Service 使用站点级共享模块、去邮箱和未经证实承诺。
6. 完成参数核验后再生成每产品独立 FAQ；价格、交期、保修、认证、续航、充电时间不得猜测。
