# SINOTRUK 六分类代表产品上线审计

> 审计日期：2026-08-02
> 数据范围：基准站 `sinotruk.international` 的 6 个产品详情页，以及本地 `data/products.ts`、现有服务页代码。
> 用途：确认现有产品数据能否直接作为 Performance、Gallery、Application Areas、Solutions、Customer Service 和 FAQ 的事实底稿。
> 边界：本报告只记录和比对，不修改生产代码；基准站内容只能作为授权素材与结构参考，不能把其中明显错配或未经本项目验证的营销承诺直接发布。

## 1. 上线结论

| 分类 | 代表产品 | 本地产品 ID | 结论 |
| --- | --- | --- | --- |
| Heavy Truck | [Howo 6X4 Cargo Truck](https://sinotruk.international/products/howo-6x4-cargo-truck/) | `howo-6x4-cargo-truck` | **有条件可用**：规格值基本照录，但来源页本身把 Cargo 写成 Tractor，Performance 和 Gallery 也混入牵引车内容，必须人工纠错后发布。 |
| Light Truck | [Howo Cargo Truck](https://sinotruk.international/products/howo-cargo-truck/) | `howo-cargo-truck` | **有条件可用**：规格基本一致；Gallery 混入 Wing Van，Performance 为通用重复文案，需重写。 |
| Special Vehicle | [Sinotruck Howo Water Tanker](https://sinotruk.international/products/sinotruck-howo-water-tanker/) | `sinotruck-howo-water-tanker` | **有条件可用**：主要规格和水罐图片一致，但本地遗漏多行配置，Performance 是乘用车内容，禁止上线。 |
| Light Vehicle | [Sinotruck Pickup Off-road Version](https://sinotruk.international/products/sinotruck-pickup-off-road-version/) | `sinotruck-pickup-off-road-version` | **阻断**：本地整套参数是水罐车模板，必须按源表重建。 |
| Semi Trailer | [Sinotruck Dump Semi Trailer Truck](https://sinotruk.international/products/sinotruck-dump-semi-trailer-truck/) | `sinotruck-dump-semi-trailer-truck` | **阻断**：本地详细参数和 Performance 是皮卡模板；图片集合也未忠实对应源页。 |
| New Energy | [Howo Pure Electric Light Truck](https://sinotruk.international/products/howo-pure-electric-light-truck/) | `howo-pure-electric-light-truck` | **阻断**：本地参数是半挂车/汽油皮卡模板；来源页顶部摘要自身也是柴油轻卡旧模板，只能采用其五款纯电车型明细表并再次核验。 |

上线前最低要求：清除 4 个明确错误模板（皮卡、水罐 Performance、半挂、新能源），给每张 Gallery 图片增加经看图确认的独立说明；Application Areas、Solutions 和 Customer Service 只保留本项目能够证实的能力，不复制基准站数字承诺。

## 2. 共享模块审计

六个抽样页的 Application Areas、Solutions 和 Customer Service 标准化文本哈希分别完全一致：`2cd931115523`、`1f0d8621af7b`、`d1341c63d17b`。这证明它们是全站通用模板，并非产品级事实。

### 2.1 SINOTRUK Application Areas（六页完全相同）

| 标题 | 图片 | 来源页原始要点 | 本项目使用边界 |
| --- | --- | --- | --- |
| Logistics & Transportation | `/image-library/Logistics.webp` | Long-haul freight transportation；Regional distribution networks；Cross-border logistics solutions | 只能按具体车型改写。水罐车、半挂车、皮卡等不能统一宣称适合全部物流场景。 |
| Construction Industry | `/image-library/Construction.webp` | Concrete mixer trucks；Dump trucks for material transport；Crane carriers and heavy haulers | 只适用于对应专用车型或已核验用途，不能写到普通 Cargo/Pickup 上。 |
| Mining & Quarrying | `/image-library/Mining.webp` | Off-road dump trucks；Heavy-duty haulers；Specialized mineral transport | 必须有车型、底盘、道路条件或产品资料支持，不能因品牌相同就套用。 |
| Agriculture | `/image-library/Agriculture.webp` | Grain and produce transport；Livestock carriers；Farm equipment haulers | 应根据货厢/上装/牵引能力具体选择，不能自动生成全适用结论。 |

### 2.2 SINOTRUK Solutions（六页完全相同）

| 标题 | 图片 | 来源页原始要点 | 来源页数字承诺 | 审计结论 |
| --- | --- | --- | --- | --- |
| Fuel Efficiency Solutions | `/image-library/Fuel-Efficiency-Solutions.webp` | Advanced combustion optimization；Smart energy management systems；Eco-driving training programs | Up to 15% fuel savings compared to industry averages | 本地无试验、对照口径或培训能力证据，数字和培训承诺均不可发布。 |
| Heavy Payload Solutions | `/image-library/Heavy-Payload-Solutions.webp` | Reinforced chassis designs；High-strength alloy components；Advanced suspension systems | Payload capacities up to 70 tons for specialized models | 只能按已核验车型参数表达，不能把 70 吨写成所有车型能力。 |
| Cold Chain Solutions | `/image-library/Cold-Chain-Solutions.webp` | Multi-zone temperature management；Real-time monitoring systems；Energy-efficient refrigeration units | Temperature control range: -30°C to +30°C | 抽样产品并非全部冷藏车型；本地无温控设备与温区证据，禁止通用化。 |
| Digital Fleet Solutions | `/image-library/Digital-Fleet-Solutions.webp` | Real-time GPS tracking；Predictive maintenance alerts；Driver performance analytics | Reduce operational costs by up to 20% | 本地无车联网产品、预测维护或成本研究证据，不能发布。 |

### 2.3 SINOTRUK Customer Service（六页完全相同）

| 标题 | 图片 | 来源页内容 | 本地可核验内容 | 不可核验/不得照搬 |
| --- | --- | --- | --- | --- |
| Technical Support | `/image-library/Training-Programs.webp` | 24/7 expert technical assistance；On-site troubleshooting；Remote diagnostics；Technical hotline support | 现有页面能提供售后信息、维护资料入口、询价/联系入口 | 24/7、现场排障、远程诊断、热线均无本地证据；来源图片文件名与标题错位。 |
| Parts Supply | `/image-library/Parts-Supply.webp` | OEM quality assurance；Global distribution network；Express delivery options | 可基于车型、VIN、零件号和图片协助识别配件 | 全球网络、库存、OEM 质量保证、快速交付均缺少证据。 |
| Maintenance Services | `/image-library/Maintenance-Services.webp` | Scheduled maintenance plans；Preventive maintenance packages；Fleet management solutions | 现有维护手册、日常检查、维修准备信息可作为入口 | 固定维护计划、预防维护套餐、车队管理解决方案未被本地代码证明。 |
| Training Programs | `/image-library/Technical-Support.webp` | Operator certification；Technician training；Fleet management courses | 现有文案只表示“可协助/可覆盖”技术培训 | 操作员认证、实际课程目录、固定培训交付均不可核验；来源图片文件名与标题错位。 |

来源卡片还显示服务、配件、维修、培训邮箱，并把“Locate service center / Find nearest dealer / View course catalog”都包在通用 `/contact/` 链接中，并没有真正的中心定位器、经销商查询或课程目录。实现时按用户要求去掉邮箱，也不得把普通联系页包装成不存在的专用系统。

本地可核验证据主要来自 `pages/service.tsx`、`pages/service/after-sales-service.tsx`、`pages/service/maintenance-manual.tsx` 和 `components/service/ServicePageLayout.tsx`。这些代码能支持“售后信息与指导、服务播报、维护手册、日常检查、维修准备、按车型/VIN/零件号识别配件、联系/询价入口”等谨慎表达；不能支持“24/7、全球服务网、全球库存、特快交付、认证培训、固定保修或响应时限”。

## 3. 六个代表产品逐页比对

### 3.1 Heavy Truck：Howo 6X4 Cargo Truck

来源：[产品页](https://sinotruk.international/products/howo-6x4-cargo-truck/)；本地：`data/products.ts` 中 `howo-6x4-cargo-truck`。

#### 图片映射

| 区域 | 来源文件 | 本地映射 | 判断 |
| --- | --- | --- | --- |
| Banner | `Howo-6X4-Cargo-Truck.jpg` | 同名 | 一致 |
| 主轮播 | `Howo-6X4-Cargo-Truck-3.jpg`、`-1.jpg`、`-2.jpg` | 本地产品图使用同系列文件 | 基本一致 |
| Gallery | `Howo-6X4-Cargo-Truck-2.jpg`、`-1.jpg`、`Howo-6X4-Tractor-Truck-7.jpg` | 同样包含牵引车文件 | **来源与本地都混入 Tractor 图片，不能按 Cargo 图发布描述** |
| Performance | `img30.jpg`、`img31.jpg`、`img32.jpg` | `perf-img30.jpg`、`perf-img31.jpg`、`perf-img32.jpg` | SHA-256/字节级一致，但三图是跨产品复用素材，不能证明当前车型配置 |

#### 来源原始规格

顶部摘要：

| 项目 | 原始值 |
| --- | --- |
| Drive type | 6x4 |
| Transmission | 10F,12F,16F |
| Front axle | 7T-9.5T |
| Engine | Euro II-Euro V |
| Power | 266-430PS |

Feature 表：

| 项目 | 原始值 |
| --- | --- |
| Vehicle type | Tractor |
| Drive type | 6×4 |
| Cab | HW76 single bunk, HW79 double bunk |
| Engine / Emission standerd | Euro II-Euro V |
| Power | 266-430PS |
| Transmission | 10F,12F,16F |
| Front axle | 7T-9.5T |
| Rear axle | 13T-16T/ axle |
| Tyre | 12.00R20,12R22.5,315/ 80R22.5 etc. |

#### 本地差异与发布风险

- 本地基本逐项照录了上述值，也连同 `Vehicle type: Tractor` 错误一起保留；产品名和页面定位却是 Cargo Truck。
- 来源 Performance 开头写成 “Howo Tractor Truck”，三张卡片重复 multi-function steering wheel 文案，本地也不能据此生成 Cargo Truck 独立性能描述。
- 本地 Gallery 继续使用 `Howo-6X4-Tractor-Truck-7.jpg`。发布前要么换成确认属于 Cargo 的图片，要么明确标为系列/配置示意图，不能写成当前车辆实拍。

### 3.2 Light Truck：Howo Cargo Truck

来源：[产品页](https://sinotruk.international/products/howo-cargo-truck/)；本地：`howo-cargo-truck`。

#### 图片映射

| 区域 | 来源文件 | 本地映射 | 判断 |
| --- | --- | --- | --- |
| Banner | `1-Howo-Cargo-Truck-0.jpg` | 同名 | 一致 |
| 主轮播 | `1-Howo-Cargo-Truck-1.jpg`、`3-Howo-Light-Cargo-Truck-2.jpg`、`1-Howo-Cargo-Truck-6.jpg`、`2-Wing-Van-Truck-2.jpg` | 本地未完整保留第二张 | 部分缺失 |
| Gallery | `1-Howo-Cargo-Truck-1.jpg`、`1-Howo-Cargo-Truck-6.jpg`、`2-Wing-Van-Truck-2.jpg` | 同样三张 | 一致，但 Wing Van 可能是不同上装/车型，说明必须标示为示意或可选上装 |
| Performance | `img30.jpg`、`img31.jpg`、`img32.jpg` | 三张 `perf-` 文件 | 字节级一致，仍是通用素材 |

#### 来源原始规格

顶部摘要：

| 项目 | 原始值 |
| --- | --- |
| Drive type | 4x2 |
| Transmission | 5F,6F |
| Front axle | 2.4T/2.7T |
| Engine | Euro II-Euro III |
| Power | 102-116Hp |

Feature 表：

| 项目 | 原始值 |
| --- | --- |
| Vehicle type | Cargo Truck |
| Drive type | 4×2 |
| Cab | 1760 (Cab width 1760MM),1880 (Cab width 1880MM) |
| Engine / Emission standerd | Euro II-Euro III |
| Power | 102-116Hp |
| Transmission | 5F,6F |
| Front axle | 2.4T/2.7T |
| Rear axle | 4.2T/7.2T |
| Tyre | 7.00R16, 7.50R16 etc. |
| Loading capacity | 5T |
| Cargo body length | 4.2-5.15M |

#### 本地差异与发布风险

- 本地规格值与来源基本一致，字段拼写也保留了来源的 `standerd` 等问题；展示层应规范标签，但原始值应可追溯。
- 来源 Gallery 已把 Wing Van 图片放进 Cargo 页面，本地继续复用。SEO 描述不能统一写成“当前平板/栏板货厢实拍”，应根据实际画面写成“可选厢式上装示意”或移除。
- Performance 仍是跨车型重复模板，不能满足“一产品一独立描述”。

### 3.3 Special Vehicle：Sinotruck Howo Water Tanker

来源：[产品页](https://sinotruk.international/products/sinotruck-howo-water-tanker/)；本地：`sinotruck-howo-water-tanker`。注意：本次采用与本地文件完全对应的无 `-2` 后缀页面。

#### 图片映射

| 区域 | 来源文件 | 本地映射 | 判断 |
| --- | --- | --- | --- |
| Banner | `1-Water-Tanker.jpg` | 同名 | 一致 |
| 主轮播 | `1-Water-Tanker-1.jpg` 至 `-4.jpg` | 同系列 | 一致 |
| Gallery | `1-Water-Tanker-3.jpg`、`-1.jpg`、`-2.jpg`、`-6.jpg`、`-4.jpg`、`-5.jpg` | 本地使用同系列 | 一致 |
| Performance | `img30.jpg`、`img31.jpg`、`img32.jpg` | 三张 `perf-` 文件 | 字节级一致，但文案是乘用车/内饰内容，与水罐车严重错配 |

#### 来源原始规格

顶部摘要：

| 项目 | 原始值 |
| --- | --- |
| Cabin | HW 76 cab |
| Engine | WD615.69 |
| Gearbox | 10 Forwards gear & 2 reverse gear |
| Engine Horse Power | 336 HP |
| Payload | 13750 |

Feature 表原始行：

| 项目 | 原始值 |
| --- | --- |
| Cabin | HW 76 cab, with one bed and air condition, |
| （续行） | 70°hydraulically tillable to the front as attached photo for ref. |
| Vehicle Main Dimensions / Overall dimensions (L x W x H) mm | 11690× 2496× 3300 |
| Wheel base (mm) | 1800+ 4600+ 1350 |
| Wheel track ( front/rear) (mm) | 2022/ 1830 |
| Approach / Departure angle(°) | 16/19 |
| Weight in KGS / Tare Weight | 14000 （According to the volume ） |
| Payload | 13750 |
| Front axles loading capacity | 2×9000 |
| Rear axles loading capacity | 2×16000 |
| Engine / Brand | Sinotruk |
| Model | WD615.69 |
| Type | 4-stroke direct injection , |
| （续行） | 6-cylinder in-line, |
| （续行） | turbo-charging and inter-cooling |
| Horse Power （HP) | 336 HP （According to the volume ） |
| Emission standard | Euro2 （Euro3,4 is optional ） |
| Gearbox | 10 Forwards gear & 2 reverse gear |
| Steering | power steering ZF8098 from Germany |
| Tire | 12.00-20 bias tyre （Optional ） |
| Optional | 15,000 -25,000 liters, tank thickness is 4 mm, seal is 5 mm |
| Equipped with | front(rear,side)sprinkler(sprinkling width ＞14m ) |
| Equipped with | rear working platform with water cannon (range ＞28m) |
| Equipped with | pump(suction lift ＞6m) |
| Equipped with | fire valve,water valve,and filter gauze |

#### 本地差异与发布风险

- 本地主要摘要和尺寸/轴荷/动力字段与来源一致，但 `detailedFeatures` 丢失了 `6-cylinder in-line`、`turbo-charging and inter-cooling` 以及四条 `Equipped with` 记录，并把 `Vehicle Main Dimensions`、`Weight in KGS` 的层级压平。
- `Optional` 中罐体容积、厚度、喷洒宽度、水炮射程和泵吸程都是需要再次核验的强事实，不能仅因来源页存在就自动发布。
- Performance 的 2.0T、真皮内饰、屏幕等乘用车式内容与水罐车无关，是明确阻断项。

### 3.4 Light Vehicle：Sinotruck Pickup Off-road Version

来源：[产品页](https://sinotruk.international/products/sinotruck-pickup-off-road-version/)；本地：`sinotruck-pickup-off-road-version`。

#### 图片映射

| 区域 | 来源文件 | 本地映射 | 判断 |
| --- | --- | --- | --- |
| Banner | `3-Pickup-Off-road.jpg` | 同名 | 一致 |
| 主轮播 | `3-Pickup-Off-road-1.jpg`、`-2.jpg` | 同系列 | 一致 |
| Performance | `3-Pickup-VX7-9.jpg`、`3-Pickup-Off-road-5.jpg`、`-4.jpg` | 本地 Performance 使用通用 `perf-img30/31/32.jpg` | **错误；来源自己也混入 VX7 前缀，需人工看图确认** |
| Gallery | `3-Pickup-Off-road-1.jpg`、`-8.jpg`、`3-Pickup-VX7-3.jpg` | 本地为 `1,2,5,3,6,4` 等 Off-road 图 | 集合不一致；来源又混入 VX7，不能机械同步 |

#### 来源顶部摘要

| 项目 | 原始值 |
| --- | --- |
| Emission | National VI |
| Engine | WP2H 2.0T |
| Gearbox | 8AT |
| Max Torque | 420 N·m |
| Max Power | 140 kW |

完整 139 行配置表见附录 A。其核心事实为四驱、`WP2H` 柴油机、`8AT`、`140 kW`、`420 N•m`、`5400*1965*1898 mm`、`265/65 R18`，并区分 Basic / Premium 的标配、选配和不提供状态。

#### 本地差异与发布风险

本地该产品的 `specifications` 与 `detailedFeatures` 整体套用了水罐车模板，包括：

| 本地错误字段 | 本地值 |
| --- | --- |
| Payload | 18000 |
| Engine | WD615.69 |
| Gearbox | 10 Forwards gear & 2 reverse gear |
| Engine Horse Power | 336 HP |
| Cabin | HW76 cab |

详细字段还包含水罐/重卡的尺寸、轴荷、WD615.69、Euro 2、ZF8098、12.00-20 轮胎等。它们与来源页的皮卡数据完全冲突，必须删除后按附录 A 重建；不能只修改显示标题掩盖底层数据错误。

### 3.5 Semi Trailer：Sinotruck Dump Semi Trailer Truck

来源：[产品页](https://sinotruk.international/products/sinotruck-dump-semi-trailer-truck/)；本地：`sinotruck-dump-semi-trailer-truck`。

#### 图片映射

| 区域 | 来源文件 | 本地映射 | 判断 |
| --- | --- | --- | --- |
| Banner | `1-Dump-Semi-Trailer-Truck.jpg` | 同名 | 一致 |
| 主图 | `1-Dump-Semi-Trailer-Truck-1-1-1.jpg` | 同名/同系列 | 一致 |
| Gallery | `-3.jpg`、`-4.jpg`、`-5.jpg`、`-6.jpg`、`-9.jpg`、`-10.jpg` | 本地为 `-1,-2,-5,-3,-6,-4` | 仅 `3/4/5/6` 重合；来源 `9/10` 缺失，本地 `1/2` 额外 |
| Performance | 来源没有图片卡，只出现两段文本 | 本地为皮卡式 2.0T/8AT 内容 | **完全错配** |

#### 来源原始规格

顶部摘要：

| 项目 | 原始值 |
| --- | --- |
| Dimension | 11700*2500*3800m |
| Weight (KG) | Max.80 tons |
| Axle | 2/3/4/5/6 |
| King Pin | 2.0 or 3.5 inch |
| Landing Gear | JOST brand |

`Dimension` 的单位写成 `m`，而详细表为 `mm`，应视为来源笔误，发布时必须采用经确认的 `11700x2500x3800mm`。

Feature 表（标题：`Dump Tipper Semi Trailer Specifications`）：

| 项目 | 原始值 |
| --- | --- |
| Outside Dimension | 11700x 2500x 3800mm |
| Payload | Max.80T capacity |
| Lifting System | HYVA brand oil cylinder 202 model |
| Main Beam | Q345B carbon steel, ‘H” type |
| Frame Beam(Heavy duty) | Upper and lower plate is 16mm and 18mm, Double middle is 10+10 mm. Height is 500 mm |
| Box thickness | Bottom plate:8mm Side plate:6mm |
| Axle | 4 axles 16tons BPW or FUWA |
| Landing Gear | JOST brand 28tons with two speeds |
| King Pin | 2.0 or 3.5 inch |
| Suspension | Mechanical suspension reinforced type |
| Leaf Spring(Strength) | 90mm(W)*16mm(T)*10 Layer |
| Tires | 12R22.5, 315/80R22.5 |
| Color/Logo | By customer demand |

来源 Performance 只有两组标题/正文，主题分别是 `Dump trailer grapple...` 与 `Dump trailer pump...`，没有图片卡。正文同样需要重新核验，不能自动扩写成当前本地的皮卡动力内容。

#### 本地差异与发布风险

- 本地摘要只写 `Axles: 3`、`Material: High-strength Steel`、`Load Capacity: 40T`、`Suspension: Mechanical / Air`、`Tires: 12R22.5`，与来源的 80T、4×16T、HYVA、梁体尺寸等关键值不一致或不完整。
- 本地详细表完全是皮卡：`LZW1030GHU`、5 seats、2WD/4WD、LAR 1.5、215 Nm、115 kW、6MT/6AT、Gasoline、155 km/h、245/70R17、`5277...` 尺寸等，必须整体清除。
- 本地 Performance 的 2.0T、8AT 等也属于皮卡模板，禁止上线。

### 3.6 New Energy：Howo Pure Electric Light Truck

来源：[产品页](https://sinotruk.international/products/howo-pure-electric-light-truck/)；本地：`howo-pure-electric-light-truck`。

#### 图片映射

| 区域 | 来源文件 | 本地映射 | 判断 |
| --- | --- | --- | --- |
| Banner | `Howo-Pure-electric-light-truck.jpg` | 同名 | 一致 |
| 主图 | `Howo-Pure-electric-light-truck-1.jpg` | 同名 | 一致 |
| Gallery | `-1.jpg`、`-2.jpg`、`-1.jpg`（首图重复） | 本地为 `1,2,5,3,6,4` | 本地 3–6 未被该来源页证明；来源自己有重复图 |
| Performance | `img30.jpg`、`img31.jpg`、`img32.jpg` | 三张 `perf-` 文件 | 字节级一致，但性能文案是通用/皮卡式内容，不证明纯电配置 |

#### 来源顶部摘要（来源自身错误）

| 项目 | 原始值 |
| --- | --- |
| Drive type | 4x2 |
| Transmission | 5F,6F |
| Front axle | 2.4T/2.7T |
| Engine | Euro II-Euro III |
| Power | 102-116Hp |

该摘要明显复制了柴油轻卡模板，与下方纯电车型表冲突，**不能导入**。

#### 来源五款纯电车型原始规格

为保留源表结构，以下每列按源页顺序记为 A–E：

- A：`ZZ5047 XXYG 3314Z145 BEV86`
- B：`ZZ5047 XXYH 3414Z147 BEV96`
- C：`ZZ5047 XXYG 3314Z147 BEV`
- D：`ZZ5047 XXYH 3414Z147 BEVA0`
- E：`ZZ5047 CCYH 3414Z145 BEVD1`

| 项目 | A | B | C | D | E |
| --- | --- | --- | --- | --- | --- |
| Market segments | City distribution, commerce, cold chain | City distribution, commerce, cold chain | City distribution, commerce, cold chain | City distribution, commerce, cold chain | Commerce, intercity |
| Drive type | 4×2 | 4×2 | 4×2 | 4×2 | 4×2 |
| Cargo box size (mm) | 4150×2100×2100 | 4150×2100×2100 | 4150×2100×2100 | 4150×2100×2100 | 4150×2100×2100 |
| Overall dimensions | 5990×2170×3100 | 5990×2170×3100 | 5990×2170×3100 | 5990×2170×3100 | 5990×2170×3100 |
| Wheelbase | 3280 | 3360 | 3280 | 3360 | 3360 |
| fully loaded mass | 4495 | 4494 | 4495 | 4495 | 4495 |
| Braking | Hydraulic | Air | Air | Air, hydraulic | Air |
| Drive axle | Hande electric | Sinotruk | Sinotruk | Sinotruk, Hande | Sinotruk |
| Suspension | 3/3+2 | 3/5+3 | 3/5+3 | 3/3+2, 3/5+3 | 3/5+3 |
| tire | 7.00 R16LT | 7.00 R16LT | 7.00 R16LT | 7.00 R16 | 7.00 R16LT |
| Motor power kW | 120 | 140 | 140 | 140 | 140 |
| Battery | CATL LFP | Fudi LFP blade | CATL LFP | CATL LFP | Fudi LFP blade |
| Power kWh | 86.55 | 96.26 | 100.27 | 100.46 | 131.98 |
| Max speed km/h | 90 | 90 | 90 | 90 | 90 |
| Max grade % | 20 | 20 | 20 | 20 | 20 |

#### 本地差异与发布风险

- 本地 `specifications` 是半挂模板：`Axles: 3`、`Material: High-strength Steel`、`Load Capacity: 40T`、`Suspension`、`Tires`。
- 本地 `detailedFeatures` 是汽油皮卡模板：`LZW1030GHU`、5 seats、LAR 1.5、215 Nm、115 kW、6MT/6AT、Gasoline、155 km/h、245/70R17 等。
- 本地 `features` 中的 Fast Charging、Long Range，以及 description 中的 long range / fast charging 没有来源页充电时间或续航值支撑；必须改为可核验的电池容量、电机功率、轴距、制动等事实。
- 本地 Performance 为 2.0T/8AT 皮卡内容。该产品必须整体重建，不能局部修字。

## 4. 跨产品数据质量问题

### 4.1 字段与单位不统一

- 同类含义出现 `Tire` / `Tyre` / `Tires` / `tire`，`Engine Horse Power` / `Horse Power （HP)` / `Power`，`Axle` / `Axles` 等不同键名。
- 来源有明显拼写错误：`standerd`、`cofiguration`、`absorbor`、`Font electric...` 等；应保留原始审计记录，但生产展示标签应规范化。
- 单位存在错误或缺失：半挂摘要 `11700*2500*3800m` 与详细表 `mm` 冲突；水罐 `Payload: 13750` 没写 kg；新能源 `Power kWh` 实际是电池容量，字段名语义不清。
- 布尔/选装表必须保留三态：`● Standard`、`○ Optional`、`– Not`，不能把空值、选装和标配合并成普通文本。

### 4.2 图片不是产品事实的充分证据

本地 `perf-img30.jpg`、`perf-img31.jpg`、`perf-img32.jpg` 与基准站 `img30.jpg`、`img31.jpg` 字节级完全一致：

| 文件 | 字节数 | 比对结果 |
| --- | ---: | --- |
| img30 / perf-img30 | 111302 | 相同 |
| img31 / perf-img31 | 106999 | 相同 |
| img32 / perf-img32 | 108386 | 相同 |

但相同图片被用于货车、水罐和新能源等不同产品，反而证明它们是通用模板素材。Gallery/Performance 的 SEO 描述必须依据人工看图确认的 `viewType`、`featureShown` 和产品归属生成，不能仅根据文件存在或文件名猜测。

### 4.3 建议的数据分层

后续实现应至少区分：

1. `sourceRawSpecs`：按来源页保留原始键、原始值、来源 URL 和核验日期；
2. `publishedSpecs`：人工确认后用于前台的规范字段、值、单位和适用车型；
3. `mediaAssets`：每张图记录产品归属、区域、可见物、SEO alt/caption、授权来源和核验状态；
4. `contentModules`：Performance、Applications、Solutions、FAQ 各自记录事实引用，不从类别模板无条件复制；
5. `serviceClaims`：只能引用站内实际存在的服务入口或经书面确认的服务政策。

## 5. 发布修复优先级

1. **P0 数据阻断**：重建 Pickup、Semi Trailer、Pure Electric Light Truck；移除 Water Tanker 的乘用车 Performance。
2. **P0 事实纠错**：Cargo Truck 的 `Vehicle type: Tractor`、牵引车 Gallery 和 Tractor Performance 不得以 Cargo 事实发布。
3. **P1 图片审校**：逐图确认 Gallery/Performance 所属车型和画面内容，为每张图写独立、可见、非推测的说明。
4. **P1 模块重写**：Application Areas 和 Solutions 按六类/子类事实生成；删除 15%、70 tons、-30°C~+30°C、20% 等未经验证数字。
5. **P1 服务收口**：Customer Service 去邮箱，只链接真实存在的联系、配件、维护页；不宣称 24/7、全球网络或认证培训。
6. **P2 FAQ**：在规格修正后，为每个产品生成独立 FAQ，问题围绕已发布配置、适用场景、选装信息和询价所需资料；任何价格、交期、保修、认证、续航、充电时间都必须有独立事实来源。

## 附录 A：Pickup Off-road Version 来源配置表全量记录

来源页符号：`● Standard`、`○ Optional`、`– Not`。以下保留来源拼写和原始值；`Basic`、`Premium` 为源表两列。

| # | 项目 | Basic | Premium |
| ---: | --- | --- | --- |
| 1 | Version | Off-roading Version | Off-roading Version |
| 2 | Drive mode | Four-wheel drive | Four-wheel drive |
| 3 | Model | Basic | Premium |
| 4 | Basic information |  |  |
| 5 | Length*Width*Height(mm) | 5400*1965*1898 | 5400*1965*1898 |
| 6 | Internal size cargo bed | 1520*1520*530 | 1520*1520*530 |
| 7 | Wheelbase | 3230 | 3230 |
| 8 | Engine model | WP2H | WP2H |
| 9 | Transmission | 8AT | 8AT |
| 10 | Energy | Diesel | Diesel |
| 11 | Engine type | High pressure common rail、turbo engine intercooler | High pressure common rail、turbo engine intercooler |
| 12 | Maximum power kW/(r/min) | 140/4000 | 140/4000 |
| 13 | Maximum torque N•m/(r/min) | 420/1750-2500 | 420/1750-2500 |
| 14 | Braking | Ventilated disc | Ventilated disc |
| 15 | Steering | Electric power | Electric power |
| 16 | Suspension | Double wishbone / multi-link integral axle | Double wishbone / multi-link integral axle |
| 17 | Smart Safety |  |  |
| 18 | ESP | ● | ● |
| 19 | ABS | ● | ● |
| 20 | EBD | ● | ● |
| 21 | TCS | ● | ● |
| 22 | BA | ● | ● |
| 23 | BOS | ● | ● |
| 24 | DTC | ● | ● |
| 25 | ARP | ● | ● |
| 26 | HAC | ● | ● |
| 27 | DAC | ● | ● |
| 28 | EPB | ● | ● |
| 29 | Dual airbag | ● | ● |
| 30 | Front side airbag | ● | ● |
| 31 | Side curtain airbag | ● | ● |
| 32 | Front seat belt with pretensioner/force limiter | ● | ● |
| 33 | Rear 3-point seat belt | ● | ● |
| 34 | Front seat belt warning | ● | ● |
| 35 | AEB | – | ● |
| 36 | FCW | – | ● |
| 37 | LDW | – | ● |
| 38 | TSR | – | ● |
| 39 | IHC | – | ● |
| 40 | SAS | – | ● |
| 41 | LCK | – | ● |
| 42 | ICA | – | ● |
| 43 | TJA | – | ● |
| 44 | TPMS | ● | ● |
| 45 | all-wheel drive lock | ● | ● |
| 46 | auto unlock on collision | ● | ● |
| 47 | collision oil-braking system | ● | ● |
| 48 | reversing radar | ● | ● |
| 49 | 360 panoramic + see-through chassis | ● | ● |
| 50 | anti-theft engine | ● | ● |
| 51 | Central axle differential lock | ● | ● |
| 52 | Front diff lock | ● | ● |
| 53 | Rear diff lock | ● | ● |
| 54 | Brake block abrasion alarming | ● | ● |
| 55 | Intelligent technology |  |  |
| 56 | constant speed cruise | ● | – |
| 57 | ACC | – | ● |
| 58 | Driving Mode | Standard ECO Sports Sand Mud Rock Snow | Standard ECO Sports Sand Mud Rock Snow |
| 59 | electronic gear-shifting | ● | ● |
| 60 | automatic parking | ● | ● |
| 61 | wireless phone charging | ● | ● |
| 62 | 12.3” touchscreen | ● | ● |
| 63 | sat nav | ● | ● |
| 64 | 8 speakers | ● | ● |
| 65 | internet of vehicles | ● | ● |
| 66 | remote control | ● | ● |
| 67 | voice recognition | ● | ● |
| 68 | phone connectivity | ● | ● |
| 69 | bluetooth hands-free | ● | ● |
| 70 | OTA | ● | ● |
| 71 | rear window heating defroster | ● | ● |
| 72 | cabin vibe lights | – | ● |
| 73 | E-instruction | ● | ● |
| 74 | 12V front | ● | ● |
| 75 | 220V rear + USB | ● | ● |
| 76 | Exterior |  |  |
| 77 | Tyre | 265/65 R18 | 265/65 R18 |
| 78 | alloy wheel | ● | ● |
| 79 | fender flares | ● | ● |
| 80 | power adjustable mirror/cornering lights | ● | ● |
| 81 | power folding mirror | ● | ● |
| 82 | roof rack | ● | ● |
| 83 | side pedal | ● | ● |
| 84 | paint cargo box | ● | ● |
| 85 | tailgate gas spring | ● | ● |
| 86 | power tailgate | ○ | ○ |
| 87 | ladder cargo box | ○ | ● |
| 88 | front fog | ● | ● |
| 89 | adjustable headlight | ● | ● |
| 90 | automatic headlights | ● | ● |
| 91 | LED headlights | ● | ● |
| 92 | steering auxiliary light | ● | ● |
| 93 | high brake light | ● | ● |
| 94 | LED DRL | ● | ● |
| 95 | electronic sunroof | ● | ● |
| 96 | shark fin antenna | ● | ● |
| 97 | auto boneless wiper | ● | ● |
| 98 | Anti-roll bar |  |  |
| 99 | Interior |  |  |
| 100 | black/red interior | ● | ● |
| 101 | Slush molding meter | ● | ● |
| 102 | 12.3-inch LCD colorful meter | ● | ● |
| 103 | dual-zone auto AC | ● | ● |
| 104 | electronic window | ● | ● |
| 105 | one-button anti-pinch window | ● | ● |
| 106 | keyless | ● | ● |
| 107 | one-key start | ● | ● |
| 108 | fabric steering wheel | ● | ● |
| 109 | multifunction wheel | ● | ● |
| 110 | 2-way manual wheel | ● | ● |
| 111 | wheel heating | – | ● |
| 112 | paddle shifters | – | ● |
| 113 | faux leather seats | ● | ● |
| 114 | 6-way driver seat | ● | – |
| 115 | 8-way driver seat | – | ● |
| 116 | 4-way passenger seat | ● | ● |
| 117 | rear 4-6 seat foldable | ● | ● |
| 118 | ventilated front seat | – | ● |
| 119 | heated front seat | – | ● |
| 120 | ISOFIX | ● | ● |
| 121 | reading lamp | ● | ● |
| 122 | spectacle case | ● | ● |
| 123 | sun visor driver/passenger | ● | ● |
| 124 | visor ticket holder | ● | ● |
| 125 | visor cosmetic mirror | ● | ● |
| 126 | anti-glare mirror | ● | ● |
| 127 | rear AC vent | ● | ● |
| 128 | dust filter | ● | ● |
| 129 | CN95 filter | ● | ● |
| 130 | recorder joint | – | – |
| 131 | ETC | ○ | ○ |
| 132 | Off-roading cofiguration |  |  |
| 133 | Irony front bumper | ● | ● |
| 134 | air intake duct | ● | ● |
| 135 | chassis protection board | ● | ● |
| 136 | Font electric capstan winch | ○ | ● |
| 137 | nitrogen shock absorbor | – | ● |
| 138 | red caliper | – | ● |
| 139 | Disclaimer | The entire contents of this configuration table are for consultation only. ● Standard ○ Optional – Not | The entire contents of this configuration table are for consultation only. ● Standard ○ Optional – Not |

## 附录 B：来源与本地定位

- Heavy Truck：[来源页](https://sinotruk.international/products/howo-6x4-cargo-truck/)；本地对象约从 `data/products.ts:559` 开始。
- Light Truck：[来源页](https://sinotruk.international/products/howo-cargo-truck/)；本地对象约从 `data/products.ts:796` 开始。
- Special Vehicle：[来源页](https://sinotruk.international/products/sinotruck-howo-water-tanker/)；本地对象约从 `data/products.ts:1128` 开始。
- Light Vehicle：[来源页](https://sinotruk.international/products/sinotruck-pickup-off-road-version/)；本地对象约从 `data/products.ts:2052` 开始。
- Semi Trailer：[来源页](https://sinotruk.international/products/sinotruck-dump-semi-trailer-truck/)；本地对象约从 `data/products.ts:2328` 开始。
- New Energy：[来源页](https://sinotruk.international/products/howo-pure-electric-light-truck/)；本地对象约从 `data/products.ts:2598` 开始。

这些行号以 2026-08-02 当前工作树为准，后续编辑可能发生偏移；稳定定位应以产品 `id` 为准。
