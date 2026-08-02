import assert from 'node:assert/strict'
import test from 'node:test'

import { allProducts } from '../data/products'
import { preparePublishedProduct, canonicalizeSpecifications, hasPublishedProductCorrection } from '../lib/product-data/published-product'
import { generateProductDetailContent, normalizeProductDetailContent } from '../lib/product-detail/generate'
import { buildComparisonRows } from '../lib/procurement/compare-products'
import { toProductDto } from '../lib/content/serializers'
import { buildReviewedProductDatabaseUpdate } from '../lib/product-data/reviewed-catalog-sync'

const product = (id: string) => preparePublishedProduct(allProducts.find((item) => item.id === id)!)

test('六大类代表产品使用经过核对的发布参数', () => {
  const representatives = [
    product('howo-tx-6x4-dump-truck'),
    product('howo-cargo-truck'),
    product('sinotruck-howo-water-tanker'),
    product('sinotruck-pickup-off-road-version'),
    product('sinotruck-dump-semi-trailer-truck'),
    product('howo-pure-electric-light-truck'),
  ]

  assert.equal(representatives.length, 6)
  assert.equal(representatives[0].specifications['Engine power'], '266–440 PS')
  assert.equal(representatives[1].specifications['Payload capacity'], '5 t')
  assert.equal(representatives[2].specifications['Tank volume'], '15,000–25,000 L')
  assert.equal(representatives[3].specifications['Engine model'], 'WP2H 2.0T')
  assert.equal(representatives[3].specifications['Drive type'], '4×4')
  assert.equal(representatives[4].specifications['Payload capacity'], 'Up to 80 t')
  assert.equal(representatives[5].specifications['Motor power'], '120–140 kW')
  assert.equal(representatives[5].specifications['Battery energy'], '86.55–131.98 kWh')
  assert.deepEqual(representatives[3].galleryImages, [
    '/images/products/3-Pickup-Off-road-1.jpg',
    '/images/products/3-Pickup-Off-road-2.jpg',
    '/images/products/3-Pickup-Off-road-5.jpg',
    '/images/products/3-Pickup-Off-road-4.jpg',
  ])
  assert.deepEqual(representatives[4].galleryImages, [
    '/images/products/1-Dump-Semi-Trailer-Truck-3.jpg',
    '/images/products/1-Dump-Semi-Trailer-Truck-4.jpg',
    '/images/products/1-Dump-Semi-Trailer-Truck-5.jpg',
    '/images/products/1-Dump-Semi-Trailer-Truck-6.jpg',
  ])
  assert.deepEqual(representatives[5].galleryImages, [
    '/images/products/Howo-Pure-electric-light-truck-1.jpg',
    '/images/products/Howo-Pure-electric-light-truck-2.jpg',
  ])
})

test('代表产品不再发布从其他车型复制来的冲突参数', () => {
  const cargo = product('howo-6x4-cargo-truck')
  const pickup = product('sinotruck-pickup-off-road-version')
  const trailer = product('sinotruck-dump-semi-trailer-truck')
  const electric = product('howo-pure-electric-light-truck')

  assert.equal(cargo.specifications['Vehicle type'], 'Cargo truck')
  assert.ok(!cargo.galleryImages?.some((image) => /Tractor-Truck/i.test(image)))
  assert.doesNotMatch(JSON.stringify(pickup.specifications), /WD615|336 HP|18000|HW 76/i)
  assert.doesNotMatch(JSON.stringify(trailer.specifications), /Gasoline|LZW1030GHU|Number of seats|Engine model/i)
  assert.doesNotMatch(JSON.stringify(electric.specifications), /Gasoline|Euro II|Engine model|6-speed manual/i)
})

test('同义参数标题统一为同一大小写和名称', () => {
  const normalized = canonicalizeSpecifications({
    'Drive Type': '6x4',
    'Engine Horse Power': '336 HP',
    Gearbox: '10F+2R',
    Cabin: 'HW76',
    'Wheel base (mm)': '3800',
    Tires: '12R22.5',
    'Load Capacity': '40T',
  }, 'heavy-truck')

  assert.deepEqual(normalized, {
    'Drive type': '6x4',
    'Engine power': '336 HP',
    Transmission: '10F+2R',
    Cab: 'HW76',
    Wheelbase: '3800',
    Tyre: '12R22.5',
    'Payload capacity': '40T',
  })

  assert.deepEqual(canonicalizeSpecifications({ Engine: 'Euro II-Euro V', Power: '430 PS', Axles: '3', Torque: '420 N·m', 'Fuel Tank (L)': '400' }, 'heavy-truck'), {
    'Emission standard': 'Euro II-Euro V',
    'Engine power': '430 PS',
    Axle: '3',
    'Maximum torque': '420 N·m',
    'Fuel tank capacity': '400',
  })
})

test('剩余产品使用的历史参数标题全部归一为可逐行比较的工程名称', () => {
  const normalized = canonicalizeSpecifications({
    'Vehicle Model': 'ZZ3317V286GF1B',
    'Engine Emission': 'Euro V',
    'Engine power (kW)': '257',
    'Net power (kw) /speed (r/min)': '257/2100',
    'Maximum torque (Nm) / Speed (r/min)': '1400/1200-1600',
    'Front Axle': '9.5 t',
    'Rear Axle': '16 t',
    'Overall dimensions (mm)': '10745×2496×3668',
    'Wheel track ( front/rear) (mm)': '2022/1830',
    'Approach / Departure angle(°)': '16/19',
    'Curb weight (kg)': '14000',
    'Full loaded mass (kg)': '25000',
    'Maximum speed km/h': '90',
    'Max.Grade Ability (%)': '34',
    'Number of seats': '2',
  }, 'heavy-truck')

  assert.deepEqual(normalized, {
    'Vehicle model': 'ZZ3317V286GF1B',
    'Emission standard': 'Euro V',
    'Engine power': '257',
    'Rated engine power / speed': '257/2100',
    'Maximum torque / speed': '1400/1200-1600',
    'Front axle': '9.5 t',
    'Rear axle': '16 t',
    'Overall dimensions': '10745×2496×3668',
    'Wheel track': '2022/1830',
    'Approach / departure angle': '16/19',
    'Curb weight': '14000',
    'Gross vehicle mass': '25000',
    'Maximum speed': '90',
    'Maximum gradeability': '34',
    'Seating capacity': '2',
  })
})

test('60 款产品都必须经过产品级事实审核后才能进入公开发布层', () => {
  for (const source of allProducts) {
    assert.equal(hasPublishedProductCorrection(source.id), true, `${source.id} 尚未建立审核校正记录`)
    assert.deepEqual(preparePublishedProduct(source).detailedFeatures, {}, `${source.id} 仍暴露未审核的旧详情参数`)
  }
})

test('半挂车和新能源页面不得继续发布复制来的汽油皮卡参数', () => {
  for (const source of allProducts.filter((item) => ['semi-trailer', 'new-energy-vehicle'].includes(item.category))) {
    const published = preparePublishedProduct(source)
    assert.doesNotMatch(
      JSON.stringify(published.specifications),
      /LZW1030GHU|Gasoline|1\.5T|6-speed manual|Number of seats|Engine model/i,
      source.id,
    )
  }
})

test('同一来源表中的 6×4 与 8×4 自卸车只发布各自对应列', () => {
  const sixByFour = product('howo-6x4-dump-truck')
  const eightByFour = product('howo-8x4-dump-truck')

  assert.equal(sixByFour.specifications['Drive type'], '6×4')
  assert.equal(sixByFour.specifications['Overall dimensions'], '8400×2496×3400 mm')
  assert.doesNotMatch(JSON.stringify(sixByFour.specifications), /10245×2496×3400/)
  assert.equal(eightByFour.specifications['Drive type'], '8×4')
  assert.equal(eightByFour.specifications['Overall dimensions'], '10245×2496×3400 mm')
  assert.doesNotMatch(JSON.stringify(eightByFour.specifications), /8400×2496×3400/)
})

test('专用车使用本车型来源表而不是 18000 kg 水罐车复制模板', () => {
  const mixer = product('howo-mixer-truck-n-6x4')
  const garbage = product('sinotruck-howo-garbage-truck')
  const crane = product('sinotruck-howo-mounted-crane-truck')

  assert.equal(mixer.specifications['Vehicle type'], 'Concrete mixer truck')
  assert.equal(mixer.specifications['Drive type'], '6×4')
  assert.equal(mixer.specifications['Body volume'], '12-16CBM')
  assert.equal(garbage.specifications['Vehicle model'], 'QDZ5251ZYSA')
  assert.equal(garbage.specifications['Payload capacity'], '10000 kg')
  assert.equal(crane.specifications['Vehicle type'], 'Truck-mounted crane')
  assert.equal(crane.specifications['Lifting capacity'], '18ton')
  for (const item of [mixer, garbage, crane]) {
    assert.doesNotMatch(JSON.stringify(item.specifications), /WD615\.69|15,000-25,000|LZW1030GHU/i, item.id)
  }
})

test('轻型车、半挂车和纯电车发布各自来源支持的参数边界', () => {
  const passengerPickup = product('sinotruck-pickup-passenger-version')
  const u70 = product('sinotruk-vgv-u70pro')
  const sidewall = product('sinotruck-sidewall-semi-trailer-truck')
  const fuelTrailer = product('sinotruck-fuel-tanker-trailer-truck')
  const electricDump = product('howo-pure-electric-dump-truck')
  const electricTractor = product('howo-pure-electric-tractor-truck')

  assert.equal(passengerPickup.specifications['Engine model'], 'WP2H')
  assert.equal(passengerPickup.specifications['Transmission'], '8AT')
  assert.equal(u70.specifications['Overall dimensions'], '4825 x 1870 x 1691 mm')
  assert.equal(u70.specifications['Seating capacity'], '7')
  assert.equal(sidewall.specifications['Payload capacity'], '60Ton')
  assert.equal(fuelTrailer.specifications['Vehicle type'], 'Fuel tanker semi-trailer')
  assert.deepEqual(Object.keys(fuelTrailer.specifications), ['Vehicle type'])
  assert.equal(electricDump.specifications['Motor power'], '270/410 kW')
  assert.equal(electricDump.specifications['Battery energy'], '422 kWh / 350 kWh')
  assert.deepEqual(electricTractor.specifications, { 'Vehicle type': 'Pure electric tractor truck' })
})

test('已知跨车型图片从公开主图、Banner 和画廊中移除', () => {
  const cargo8x4 = product('howo-tx-8x4-cargo-truck')
  const cargoN6x4 = product('howo-n-6x4-cargo-truck')
  const boxVan = product('howo-box-van-cargo-truck')
  const passengerPickup = product('sinotruck-pickup-passenger-version')

  assert.ok(cargo8x4.galleryImages?.every((image) => /TX-8X4-Cargo/i.test(image)))
  assert.doesNotMatch(JSON.stringify(cargoN6x4), /Tractor-Truck|N-8X4-Cargo/i)
  assert.ok(boxVan.galleryImages?.every((image) => !/Wing-Van/i.test(image)))
  assert.match(passengerPickup.image, /Pickup-Passenger/i)
})

test('分组参数保留发动机、变速箱、轮胎和驾驶室上下文而不串成车型号', () => {
  const bitumen = product('sinotruck-howo-bitumen-tank')
  const u70 = product('sinotruk-vgv-u70pro')

  assert.equal(bitumen.specifications['Engine model'], 'WD615.69')
  assert.equal(bitumen.specifications['Gross vehicle mass'], '25000 kg')
  assert.equal(bitumen.specifications['Transmission'], '10 speed forward, 2 speed reverse')
  assert.equal(bitumen.specifications['Cab'], 'HOWO HW76 flat-roof cab with A/C, power steering')
  assert.equal(bitumen.specifications['Tyre'], '295/80R22.5')
  assert.equal(bitumen.specifications['Tank volume'], '8M3 asphalt tank + 12M3 stone silo')
  assert.equal(bitumen.specifications['Production capacity'], '<40t/h')
  assert.equal(bitumen.specifications['Control mode'], 'Automatic')
  assert.equal(bitumen.specifications['Vehicle model'], undefined)
  assert.equal(u70.specifications['Cargo volume'], 'Up to 1800L')
})

test('全部产品发布参数不存在大小写别名和已知同义旧标题', () => {
  const forbidden = /^(?:Drive Type|Driving form|Gearbox|Cabin|Tire|Tires|Load Capacity|Loading capacity|Payload|Power|Axles|Torque|Up-body configuration|Fuel Tank \(L\))$/
  for (const source of allProducts) {
    const labels = Object.keys(preparePublishedProduct(source).specifications)
    assert.ok(labels.every((label) => !forbidden.test(label)), `${source.id}: ${labels.join(', ')}`)
    const caseFolded = labels.map((label) => label.toLocaleLowerCase('en-US'))
    assert.equal(new Set(caseFolded).size, labels.length, source.id)
  }
})

test('比较表按统一工程顺序逐行对照而不是按字母排序', () => {
  const rows = buildComparisonRows([
    { id: 'a', name: 'A', normalizedSpecs: { 'Payload capacity': '30 t', 'Drive type': '6×4', 'Engine power': '380 HP', drive: '6×4', power: '380 HP' } },
    { id: 'b', name: 'B', normalizedSpecs: { 'Engine power': '420 HP', 'Drive type': '8×4', drive: '8×4', power: '420 HP' } },
  ])

  assert.deepEqual(rows.map((row) => row.label), ['Drive type', 'Engine power', 'Payload capacity'])
  assert.deepEqual(rows[2].values, ['30 t', 'Not specified'])
})

test('扩展工程参数在同类产品比较时仍按动力底盘尺寸能力顺序排列', () => {
  const rows = buildComparisonRows([
    {
      id: 'a',
      name: 'A',
      normalizedSpecs: {
        'Production capacity': '40 t/h',
        'Cargo volume': '1800 L',
        'Gross vehicle mass': '25000 kg',
        'Overall dimensions': '10000×2500×3500 mm',
        'Tyre count': '10+1',
        Chassis: 'HOWO',
        'Transmission control': 'Manual',
        'Maximum torque': '1400 N·m',
        'Rated engine power / speed': '257 kW at 2100 r/min',
        'Engine model': 'WP8.350E62',
        'Vehicle model': 'ZZ3317',
        'Vehicle type': 'Dump truck',
      },
    },
  ])

  assert.deepEqual(rows.map((row) => row.label), [
    'Vehicle type',
    'Vehicle model',
    'Engine model',
    'Rated engine power / speed',
    'Maximum torque',
    'Transmission control',
    'Chassis',
    'Tyre count',
    'Overall dimensions',
    'Gross vehicle mass',
    'Cargo volume',
    'Production capacity',
  ])
})

test('产品内容只使用本车型主图和画廊图，不复用通用 Performance 图片', () => {
  for (const source of [
    product('howo-tx-6x4-dump-truck'),
    product('howo-cargo-truck'),
    product('sinotruck-howo-water-tanker'),
    product('sinotruck-pickup-off-road-version'),
    product('sinotruck-dump-semi-trailer-truck'),
    product('howo-pure-electric-light-truck'),
  ]) {
    const allowed = new Set([source.image, ...(source.galleryImages || [])])
    const content = generateProductDetailContent(source)
    assert.ok(content.performanceItems.every((item) => allowed.has(item.image)), source.id)
    assert.ok(content.gallery.every((item) => allowed.has(item.image)), source.id)
    assert.doesNotMatch(JSON.stringify(content.performanceItems), /perf-img\d+/i, source.id)
  }
})

test('旧详情中错配图片会回退到当前产品的安全内容', () => {
  const source = product('howo-cargo-truck')
  const normalized = normalizeProductDetailContent({
    performanceItems: [{ title: 'Wrong', description: 'Wrong image.', image: '/images/products/perf-img30.jpg' }],
    gallery: [{ image: '/images/products/2-Wing-Van-Truck-2.jpg', alt: 'Wrong', title: 'Wrong', description: 'Wrong.' }],
  }, source)

  assert.ok(normalized.performanceItems.every((item) => item.image !== '/images/products/perf-img30.jpg'))
  assert.ok(normalized.gallery.every((item) => item.image !== '/images/products/2-Wing-Van-Truck-2.jpg'))
})

test('数据库公开 DTO 直接读取已落库的审核事实和统一比较字段', () => {
  const source = allProducts.find((item) => item.id === 'sinotruck-pickup-off-road-version')!
  const legacyRecord = {
    id: source.id,
    name: source.name,
    description: source.description,
    categoryId: source.category,
    subcategoryId: `${source.category}:${source.subcategory}`,
    image: source.image,
    bannerImage: source.bannerImage || null,
    specifications: JSON.stringify(source.specifications),
    features: JSON.stringify(source.features || []),
    detailedFeatures: JSON.stringify(source.detailedFeatures || {}),
    galleryImages: JSON.stringify(source.galleryImages || []),
    detailContent: JSON.stringify(generateProductDetailContent(source)),
    normalizedSpecs: '{}',
    applicationTags: '[]',
    marketTags: '[]',
    performanceItems: source.performanceItems || [],
  }
  const reviewed = buildReviewedProductDatabaseUpdate(legacyRecord)
  const dto = toProductDto({
    ...legacyRecord,
    ...reviewed.data,
    performanceItems: reviewed.performanceItems,
  }, { includeDetailContent: true })

  assert.equal(dto.specifications['Engine model'], 'WP2H 2.0T')
  assert.equal(dto.normalizedSpecs['Drive type'], '4×4')
  assert.equal(dto.normalizedSpecs.drive, '4×4')
  assert.ok(dto.detailContent?.performanceItems.every((item) => !/perf-img\d+/i.test(item.image)))
})
