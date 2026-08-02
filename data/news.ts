export interface NewsItem {
  slug: string
  title: string
  date: string
  updatedAt?: string
  image: string
  excerpt: string
  content: string
  seoTitle: string
  seoDescription: string
  category?: string | null
  keywords: string[]
  internalLinks: string[]
  sourceUrl?: string | null
  sourceTitle?: string | null
  sourceDate?: string | null
}

const REVIEWED_AT = '2026-08-02'

export const newsItems: NewsItem[] = [
  {
    slug: '6-wheeler-howo-truck-specifications-and-dimensions-what-is-a-6-wheeler-truck',
    title: 'HOWO Wheel, Axle and Drive Configurations Explained',
    date: '2025-10-31', updatedAt: REVIEWED_AT,
    image: '/images/news/HOWO-TX-6x4-tractor5.webp', category: 'Procurement Guides',
    excerpt: 'A practical way to distinguish wheel-count labels from axle and drive formulas when comparing HOWO trucks for a specific route or job site.',
    seoTitle: 'HOWO Wheel, Axle and Drive Configuration Guide',
    seoDescription: 'Compare HOWO wheel-count terms with 4x2, 6x4 and 8x4 drive formulas, then prepare the right configuration details for a truck enquiry.',
    keywords: ['HOWO truck axle configuration', '6 wheeler HOWO truck', 'HOWO 6x4 meaning', 'HOWO 8x4 truck'],
    internalLinks: ['/products/heavy-truck', '/products/heavy-truck/dump-truck', '/contact'],
    content: `Wheel-count descriptions are useful in everyday conversation, but they are not a complete truck specification. The same phrase can be used differently between markets, especially when twin tyres are counted individually. A buyer comparing HOWO trucks should therefore record the axle layout and drive formula before discussing body size, payload or price.

## Read the drive formula first

In a formula such as 6x4, the first number refers to wheel positions and the second identifies driven positions. It does not tell you the number of tyres fitted, the legal payload or the body volume. A 4x2 layout is commonly considered for lighter road distribution, while 6x4 and 8x4 layouts may be shortlisted when traction, load distribution or body length has greater importance. The correct choice still depends on local axle-load rules and the intended surface.

- Record the exact drive formula shown on the specification sheet.
- Confirm how many front and rear axles the chassis has.
- Ask whether rear positions use single or twin tyres.
- Check steering-axle and drive-axle ratings separately.

## Translate local wheel names into engineering details

Terms such as six-wheeler, ten-wheeler and twelve-wheeler are market shorthand. Before comparing two offers, ask both suppliers to describe the vehicle using the same fields: drive formula, axle count, tyre arrangement, wheelbase and gross vehicle weight. This prevents a wheel-count label from being mistaken for a payload class. Photographs should show both sides of the chassis and the rear bogie, not only the cab.

## Match the layout to the route

Urban delivery places more value on turning room and access. Construction haulage may place more value on traction and resistance to uneven surfaces. Longer regional transport can make cruising speed, legal axle distribution and service access more important. None of these priorities can be decided from wheel count alone. Supply the route type, road condition, gradient, expected daily distance and loading method with the enquiry.

## Compare like with like

Use one comparison sheet for every candidate. Keep configuration, legal limits, body dimensions and optional equipment in separate rows. If two quotations use different terminology, pause the price comparison until the underlying chassis details match. The HOWO heavy-truck catalogue can be used to identify relevant body types, while the final selection should be checked against destination-country registration and operating requirements.`,
  },
  {
    slug: 'china-howo-truck-manufacturer-factory-price-dump-trucks-for-sale-used-trucks-and-spare-parts',
    title: 'Sourcing a HOWO Truck from China: Cost and Supplier Checks',
    date: '2025-10-31', updatedAt: REVIEWED_AT,
    image: '/images/news/HOWO-TX-6x4-tractor14.webp', category: 'Procurement Guides',
    excerpt: 'Build a comparable export quotation by separating the truck configuration, body, documentation, logistics and destination costs.',
    seoTitle: 'HOWO Truck Sourcing from China: Buyer Checklist',
    seoDescription: 'Learn which specifications, supplier records, export documents and logistics costs to verify before sourcing a HOWO truck from China.',
    keywords: ['HOWO truck sourcing China', 'buy HOWO truck from China', 'HOWO export quotation', 'China truck supplier check'],
    internalLinks: ['/products', '/parts', '/contact'],
    content: `A useful export quotation begins with a defined truck, not a headline price. Chassis configuration, body construction, emissions version, tyres, optional equipment and destination requirements can all change the delivered cost. Buyers should request the same evidence and cost fields from every prospective supplier so that a low initial figure does not hide a different specification.

## Define the vehicle before requesting a quotation

Start with the operating task: material, route, surface, gradient, loading equipment and expected working pattern. Then record the drive formula, cab, power range, transmission, axle configuration, tyre specification and body dimensions. For special bodies, state the material and functional requirements rather than relying on a model nickname.

- Ask for a dated specification sheet tied to the quotation.
- Match chassis and body descriptions across every document.
- Request photographs that identify the offered configuration.
- Mark optional equipment as included, excluded or to be confirmed.

## Separate the cost layers

The vehicle amount is only one layer of an international purchase. A comparable quotation should identify body fabrication, inland movement, export handling, ocean or land freight, insurance and any optional inspection. Import duty, tax, port charges, registration and local transport are normally destination-side questions. Currency, quotation validity and payment milestones should be written explicitly rather than inferred from a chat message.

## Verify the contracting party

Check the legal entity named on the quotation, contract, invoice and receiving bank account. Ask for registration information and verify it through an appropriate official or independent channel. Brand references alone do not prove the seller's role. If an inspection is arranged, define what the inspector must record: identification plates, visible configuration, dimensions, functions and document consistency.

## Prepare an export document checklist

Document requirements vary by destination. Common files may include a commercial invoice, packing list, transport document and vehicle-specific records, but the exact set must be confirmed with the importer and local authorities. Keep a version-controlled folder for the signed specification, amendments and inspection evidence. Browse the published product catalogue to shortlist a configuration, then send one structured enquiry containing the destination port and required document checks.`,
  },
  {
    slug: 'howo-for-sale-truck-philippines-howo-truck-for-sale-philippines',
    title: 'Buying a HOWO Truck for the Philippines: Verification Guide',
    date: '2025-10-03', updatedAt: REVIEWED_AT,
    image: '/images/news/HOWO-MAX-6x4-tractor4.webp', category: 'Procurement Guides',
    excerpt: 'A Philippines-focused checklist for comparing new and used HOWO truck offers without relying on unverified listing claims.',
    seoTitle: 'HOWO Truck Philippines Buyer Verification Guide',
    seoDescription: 'Check configuration, vehicle identity, documents and landed-cost fields when comparing a HOWO truck for use in the Philippines.',
    keywords: ['HOWO truck Philippines', 'HOWO Philippines buyer guide', 'HOWO dump truck Philippines', 'import truck Philippines'],
    internalLinks: ['/products/heavy-truck', '/products/heavy-truck/dump-truck', '/contact'],
    content: `Online listings can help a Philippine buyer discover possible trucks, but they do not replace vehicle and document verification. Photos, model years and wheel-count labels are often incomplete. Compare offers only after the seller supplies a consistent chassis description, identification evidence and a written explanation of what is included in the amount quoted.

## Start with the actual operating route

Describe whether the truck will work on public roads, construction access roads, quarry routes or mixed conditions. Note loading method, material density, turning limits and daily distance. These details shape the choice between cargo, tractor, dump and special-purpose configurations more reliably than a generic “ten-wheeler” label.

- Record drive formula, axle layout and tyre arrangement.
- Confirm body type, internal dimensions and material.
- Check the emissions version against local fuel and registration needs.
- Identify all modifications required after arrival.

## Verify a new or used vehicle

For any offer, request clear images of the vehicle identification plate and the relevant chassis markings. A used truck also needs evidence of engine condition, transmission operation, axle noise, braking, steering, frame repairs, hydraulic operation and tyre condition. Ask for a cold-start video and a walk-around recorded for the specific vehicle, not a general stock video. An independent physical inspection is preferable where feasible.

## Build the landed-cost worksheet

Separate the vehicle, body and optional equipment from inland transport, export handling, freight and insurance. Destination charges, duties, taxes, registration, local modifications and onward transport belong in separate rows. This structure makes two offers comparable even when they use different shipping terms. The cheapest headline listing may not be the lowest landed cost.

## Confirm documents before payment milestones

Ask the importer, broker or relevant Philippine authority which documents and compliance checks apply to the exact vehicle condition and category. Put document delivery, inspection evidence and configuration acceptance into the contract schedule. The published dump-truck range can support the initial shortlist; the final enquiry should include destination, application and the completed verification checklist.`,
  },
  {
    slug: 'brand-new-howo-trucks-for-sale-in-nigeria-2021-jiji-olx-listings-used-new-options-near-me',
    title: 'HOWO Trucks in Nigeria: A Buyer Due-Diligence Checklist',
    date: '2025-10-29', updatedAt: REVIEWED_AT,
    image: '/images/news/HOWO-TX-EV-8x4-Tippe2.webp', category: 'Procurement Guides',
    excerpt: 'How to move from an online truck listing to a documented, inspectable offer suitable for Nigerian operating conditions.',
    seoTitle: 'HOWO Truck Nigeria Buyer Due-Diligence Checklist',
    seoDescription: 'Use this Nigeria-focused checklist to verify a HOWO truck listing, vehicle identity, condition, documents and operating fit.',
    keywords: ['HOWO truck Nigeria', 'HOWO Nigeria buyer checklist', 'used HOWO truck Nigeria', 'truck listing verification Nigeria'],
    internalLinks: ['/products/heavy-truck', '/parts', '/contact'],
    content: `A marketplace listing is a lead, not proof of ownership, condition or specification. Nigerian buyers comparing HOWO trucks should convert every listing into a standard evidence pack before discussing final terms. That pack should connect the seller, vehicle identity, physical condition, documents and intended operating route.

## Convert the listing into a specification

Save the listing date and ask the seller to identify the exact truck being offered. Record drive formula, axle layout, engine identification, transmission, cab, body and tyre arrangement. Ask which details were read from the vehicle and which came from a generic advertisement. If the photos do not show the identification points, request new images taken with a dated reference.

- Match the seller name to the contracting and payment entities.
- Compare identification numbers across the vehicle and documents.
- Request a cold start, instrument-panel view and driving video.
- Record every repair, replacement or modification disclosed.

## Inspect for Nigerian duty cycles

Condition must be judged against the planned work. A road tractor and a construction tipper face different frame, suspension, cooling and tyre demands. For a used vehicle, inspect corrosion, welds, rail alignment, steering play, brake condition, drivetrain leaks and differential noise. A tipper additionally needs a controlled hydraulic test on level ground. Use an independent technician when the purchase value justifies it.

## Check parts and service preparation

Before selecting a configuration, identify routine filters, brake components, belts, electrical items and any model-specific parts likely to be needed. Record part numbers from the actual assemblies instead of assuming that every truck with the same badge uses identical components. A starter package should be based on the inspected vehicle and planned maintenance interval.

## Keep payment tied to evidence

Write the accepted specification, included equipment, document list and inspection process into the agreement. Separate vehicle cost from logistics, taxes, registration and local work. Do not rely on claims about scarcity or rapid delivery without documentary support. Use the heavy-truck catalogue to define the target configuration and the parts catalogue to prepare identification questions before contacting a seller.`,
  },
  {
    slug: '2017-howo-truck-and-dump-truck-review',
    title: 'Used HOWO Truck Inspection: What a Model Year Cannot Tell You',
    date: '2025-10-28', updatedAt: REVIEWED_AT,
    image: '/images/news/Extreme-Testing-2.webp', category: 'Industry Insights',
    excerpt: 'Judge a used HOWO truck by identity, condition, maintenance evidence and application history instead of the model year alone.',
    seoTitle: 'Used HOWO Truck Inspection and Condition Guide',
    seoDescription: 'Inspect a used HOWO truck systematically, from identity and cold start to chassis, drivetrain, hydraulics and service records.',
    keywords: ['used HOWO truck inspection', 'used HOWO dump truck check', 'HOWO truck condition report', 'second hand HOWO buyer guide'],
    internalLinks: ['/products/heavy-truck', '/parts', '/contact'],
    content: `A model year is a filing detail, not a condition report. Two HOWO trucks registered in the same period may have different duty cycles, repairs and component combinations. A serious used-truck review begins by identifying the exact vehicle and then recording evidence in a repeatable order.

## Establish identity and history

Photograph the identification plate, chassis marking, engine identification and cab details. Compare them with the available registration, import and service documents. Ask where the truck worked, what it carried and why it is being sold. Maintenance invoices are more useful when component references and dates can be matched to the vehicle.

- Arrange the inspection before the engine is warmed.
- Keep photos of all identification points and instrument readings.
- Note non-standard wiring, hoses, switches and body modifications.
- List missing documents instead of assuming they can be replaced.

## Check the truck cold and stationary

Look for fluid levels, contamination, leaks, damaged mounts and temporary repairs. During a cold start, record cranking behaviour, smoke progression, warning lights and unusual sound. Inspect steering play, brake lines, air-system behaviour, springs, torque rods, tyres and wheel fasteners. Frame rails deserve attention around suspension mounts, body pivots and any visible weld.

## Test the drivetrain and working equipment

A controlled road test should cover clutch engagement, gear selection, steering response, braking and drivetrain noise under different loads. For a dump truck, inspect the subframe, hinge, cylinder, hoses, control valve and body alignment before a level-ground lifting test. Never stand beneath a raised body without the specified mechanical support and a trained operator.

## Turn findings into a decision

Classify each issue as safety-critical, required before operation, monitor or cosmetic. Estimate repairs using identified parts rather than generic web prices. The inspection should end with an accepted configuration sheet, defect list and photographs attached to the purchase record. If the seller will not permit identification checks or an independent inspection, the uncertainty should be reflected in the decision, not hidden by a polished exterior.`,
  },
  {
    slug: 'howo-delivery-truck-for-efficient-truck-delivery',
    title: 'Choosing a HOWO Delivery Truck Body for the Route',
    date: '2025-10-03', updatedAt: REVIEWED_AT,
    image: '/images/news/HOWO-TX-EV-8x4-Tippe4.webp', category: 'Procurement Guides',
    excerpt: 'Compare cargo, box, refrigerated and wing-opening bodies by cargo handling, route access and temperature requirements.',
    seoTitle: 'HOWO Delivery Truck Body and Route Selection Guide',
    seoDescription: 'Choose a HOWO delivery truck by cargo, body type, route access, loading method and temperature-control requirements.',
    keywords: ['HOWO delivery truck', 'HOWO cargo truck body', 'HOWO box truck', 'delivery truck selection'],
    internalLinks: ['/products/light-truck', '/products/heavy-truck/cargo-truck', '/contact'],
    content: `Delivery productivity depends on how the vehicle fits the route and handling process. A larger body may carry more per trip but lose time at narrow streets, low entrances or crowded docks. Begin with cargo and stops, then select the chassis and body as one operating system.

## Describe the load in handling terms

Record unit size, total mass, fragility, stacking limits and whether goods travel on pallets, racks or loose. Note loading equipment at both ends. Side access, rear access and roof clearance can matter as much as internal volume. If the cargo is temperature-sensitive, document the required range, loading temperature, trip duration and door-opening pattern for the body specialist.

- Measure the tightest entrance, turning area and loading bay.
- Record the heaviest realistic load, not only an average trip.
- Identify tie-down, partition, drainage and cleaning needs.
- State whether loading uses people, forklifts or dock equipment.

## Compare common body types

An open cargo body suits loads that need flexible loading and weather protection can be added separately. A closed box improves security and weather control but needs planned access and ventilation. A refrigerated body requires insulation, refrigeration sizing and power planning based on the real duty cycle. A wing-opening body can accelerate side loading where enough space is available, but its mechanism and sealing add maintenance points.

## Match chassis details to the route

Payload is constrained by the completed vehicle, local axle limits and body weight. Wheelbase affects body length, turning and axle distribution. Cab choice, tyre specification, gearing and emissions equipment should also be checked against traffic, gradients, fuel and service capability. Do not treat a body-volume claim as a legal or practical payload.

## Send a useful enquiry

Provide cargo details, route type, access measurements, required body features, destination and expected daily pattern. Ask the quotation to separate chassis, body, refrigeration or tail-lift equipment and documentation. The light-truck catalogue helps narrow the chassis size; the cargo-truck range provides alternatives for heavier regional work. A complete route brief reduces revisions and makes offers easier to compare.`,
  },
  {
    slug: 'euro-4-howo-truck-and-howo-euro-4-dump-truck-explained-what-is-a-euro-6-truck',
    title: 'HOWO Emissions Versions: Euro IV and Euro VI Buying Checks',
    date: '2025-10-25', updatedAt: REVIEWED_AT,
    image: '/images/news/HOWO-TX-6x4-tractor14.webp', category: 'Industry Insights',
    excerpt: 'Verify an emissions version against destination rules, fuel quality, aftertreatment hardware and diagnostic support.',
    seoTitle: 'HOWO Euro IV and Euro VI Emissions Buyer Guide',
    seoDescription: 'Check HOWO emissions versions against local registration, fuel, aftertreatment, fluid and diagnostic requirements before ordering.',
    keywords: ['HOWO Euro IV truck', 'HOWO Euro VI truck', 'HOWO emissions version', 'truck aftertreatment check'],
    internalLinks: ['/products', '/service', '/contact'],
    content: `An emissions label should not be chosen by assuming that a higher Roman numeral is automatically suitable for every destination. Registration rules, fuel quality, aftertreatment consumables, diagnostic capability and operating pattern all matter. The buyer needs evidence tied to the offered vehicle rather than a generic model description.

## Confirm the legal requirement first

Ask the importer or relevant authority which emissions evidence applies to the vehicle category, production date and import condition. Record the exact standard wording required on certificates and registration documents. A sales description that says “Euro IV” or “Euro VI” is not a substitute for vehicle-specific documentation.

- Identify the engine model and calibration shown on the offered unit.
- Request images of emissions and engine identification labels.
- Match certificate references to the chassis and engine information.
- Confirm whether destination testing or inspection is required.

## Understand the hardware difference

Different emissions versions can use different combinations of engine calibration, exhaust-gas recirculation, oxidation catalysts, particulate filters and selective catalytic reduction. The exact arrangement must be read from the specification and physical vehicle. It affects sensors, exhaust components, operating fluids, regeneration behaviour and diagnostic procedures. Do not order replacement parts using the emissions label alone.

## Check fuel, fluids and duty cycle

Aftertreatment systems depend on fuel and consumables meeting the specified quality. Repeated short trips, long idle periods and low exhaust temperatures can affect some systems differently from sustained highway work. Ask how regeneration and warning states are handled for the exact engine and control system. Confirm that suitable diagnostic tools and trained service support are available where the truck will operate.

## Put evidence into the purchase file

The accepted specification should include engine identification, emissions version, aftertreatment components and required operating fluids. Add label photographs and certificate copies to the inspection checklist. The product catalogue can identify candidate vehicles, but the final configuration must be reconciled with local rules before shipment. When uncertainty remains, treat emissions compliance as an approval condition rather than a marketing feature.`,
  },
  {
    slug: 'how-to-drive-a-howo-dump-truck-and-dump-it-engine-number-location-specs-and-engine-no-guide',
    title: 'HOWO Dump Truck Operating Safety and Identification Checks',
    date: '2025-10-09', updatedAt: REVIEWED_AT,
    image: '/images/news/HOWO-MAX-6x4-tractor8.webp', category: 'Industry Insights',
    excerpt: 'A pre-operation and tipping checklist covering ground conditions, exclusion zones, vehicle identity and safe information handover.',
    seoTitle: 'HOWO Dump Truck Safety and Identification Checklist',
    seoDescription: 'Review HOWO dump truck pre-start, tipping-area, stability and identification checks before operation or parts enquiries.',
    keywords: ['HOWO dump truck safety', 'HOWO dump truck operation', 'HOWO engine number location', 'dump truck tipping checklist'],
    internalLinks: ['/products/heavy-truck/dump-truck', '/parts', '/service'],
    content: `Dump-body operation combines a heavy vehicle, moving material and a changing centre of gravity. Site rules, the vehicle manual and trained supervision take priority over any general online guide. The checklist below is intended to help a fleet organize questions and records; it is not a substitute for operator training.

## Complete the walk-around before starting

Check tyres, wheel fasteners, fluid leaks, lights, mirrors, steps and visible damage. Inspect the body hinge, subframe, hydraulic cylinder, hoses and controls. Make sure loose material cannot fall during travel. In the cab, confirm warning indicators, steering, brakes, horn and communication equipment according to the site procedure.

- Keep people outside the vehicle and tipping exclusion zones.
- Use level, stable ground with adequate overhead clearance.
- Check for power lines, structures and soft shoulders.
- Stop if the body rises unevenly or the vehicle begins to lean.

## Control the tipping area

The operator needs a clear view or a designated spotter using agreed signals. Do not tip while the vehicle is turning or positioned across a slope. Tailgate operation, material sticking and wind can change the risk. After discharge, verify that the body is fully lowered and the controls are secured before moving away.

## Record vehicle identity correctly

Engine and chassis identification locations vary by configuration. Use the vehicle documentation and manufacturer service information to locate them; never rely on one internet photograph. Clean the area carefully and record the characters without grinding, restamping or damaging the marking. Photograph the wider component and a close view so a parts specialist can understand the location.

## Build a handover record

For each truck, keep an identification sheet, approved operating procedure, inspection form and defect history. A parts enquiry should include the VIN or chassis number where appropriate, engine and transmission identification, assembly photographs and the existing part number. This is safer and more accurate than ordering from the truck badge alone. Use the dump-truck catalogue for configuration context and the parts catalogue for the identification workflow.`,
  },
  {
    slug: 'howo-dump-truck-specs-dimensions-review-horsepower-howo-380-371-a7-nx-and-400-dump-truck-specifications',
    title: 'How to Compare HOWO Dump Truck Specifications',
    date: '2025-10-03', updatedAt: REVIEWED_AT,
    image: '/images/news/HOWO-TX-4.webp', category: 'Industry Insights',
    excerpt: 'Compare drive layout, body, mass, powertrain and operating limits in a row-by-row worksheet instead of mixing model nicknames.',
    seoTitle: 'HOWO Dump Truck Specifications Comparison Guide',
    seoDescription: 'Compare HOWO dump truck drive layouts, body dimensions, mass, powertrain and site requirements with a consistent worksheet.',
    keywords: ['HOWO dump truck specifications', 'HOWO dump truck dimensions', 'HOWO dump truck comparison', 'HOWO 6x4 8x4'],
    internalLinks: ['/products/heavy-truck/dump-truck', '/products', '/contact'],
    content: `Dump-truck comparisons become unreliable when one offer describes engine power, another emphasizes body volume and a third uses a regional model nickname. Start with the work and place every candidate into the same worksheet. Empty cells should remain “to be confirmed” rather than being filled from a similar-looking truck.

## Define the application boundary

Record material density, loading equipment, haul distance, road surface, gradients, turning constraints and discharge conditions. These facts determine whether traction, axle distribution, body protection, manoeuvrability or road speed deserves more weight. The largest body is not automatically the most productive configuration.

- Drive formula and axle arrangement.
- Complete-vehicle and body dimensions.
- Chassis, body and permitted mass fields.
- Engine, transmission, axle ratio and tyre specification.
- Hydraulic equipment and body construction.

## Keep dimensions and capacity separate

External vehicle dimensions affect access and transport. Internal body dimensions describe physical volume. Material density and legal limits determine how much can actually be carried. Ask whether dimensions are nominal, measured or configurable, and whether mass figures refer to chassis-cab or completed vehicle. Never calculate legal payload from body volume alone.

## Compare the complete powertrain

Engine output is only one row. Transmission ratios, axle ratio, tyre size, cooling package and operating altitude influence how the truck performs. Record the emissions version and aftertreatment arrangement as separate fields. A familiar horsepower label can appear across more than one configuration, so the quotation must identify the specific engine and driveline.

## Review evidence before price

Attach the dated specification, identification photos and body drawing to each offer. Mark standard equipment, options and exclusions. Then compare commercial terms only between configurations that meet the same technical boundary. Record who confirmed every open field and the date of that confirmation. The online dump-truck catalogue provides a starting set of models; use the comparison feature to align published fields and send unresolved items as written questions with the enquiry.`,
  },
  {
    slug: 'looking-for-howo-dump-truck-spare-parts-and-semi-truck-spare-parts-near-me-check-available-howo-dump-truck-sizes',
    title: 'HOWO Spare Parts Identification and RFQ Checklist',
    date: '2025-10-05', updatedAt: REVIEWED_AT,
    image: '/images/news/HOWO-TX-6x4-tractor3.webp', category: 'Procurement Guides',
    excerpt: 'Reduce wrong-part risk by sending assembly identity, part number, vehicle data, measurements and clear photographs in one RFQ.',
    seoTitle: 'HOWO Spare Parts Identification and RFQ Guide',
    seoDescription: 'Prepare a HOWO spare parts enquiry with part numbers, VIN context, assembly details, measurements and clear identification photos.',
    keywords: ['HOWO spare parts identification', 'HOWO parts RFQ', 'HOWO part number', 'SINOTRUK truck spare parts'],
    internalLinks: ['/parts', '/products', '/contact'],
    content: `Truck badges are not precise enough for many parts orders. Production changes, engine variants, axle assemblies and previous repairs can create different components within trucks that share a model name. A useful request for quotation connects the required part to the actual vehicle and assembly.

## Begin with the existing part

Clean the component without removing markings and photograph the number, logo, connector, mounting points and surrounding assembly. Record whether the part is still installed and what symptom led to replacement. If a number is damaged, provide every readable character and measured dimensions rather than guessing the missing section.

- Part number and any revision or suffix.
- VIN or chassis information where appropriate.
- Engine, transmission or axle identification.
- Quantity, left/right position and installation location.
- Wide, close and connector-side photographs.

## Add vehicle and assembly context

For engine parts, record the engine identification and photograph the relevant system. For transmission or axle parts, use the assembly plate rather than only the chassis model. Electrical items need voltage, connector shape, pin count and controller context. Cab and body parts benefit from side, position and mounting details. Protect personal and unnecessary ownership information when sharing documents.

## Separate identification from availability

The first task is determining the correct reference; stock, lead time and shipping are separate commercial questions. Ask the supplier to state whether the offered item is an exact reference, a supersession or an alternative, and request the technical basis for any substitution. Do not accept visual similarity as the only match for safety-related or internal components.

## Send one structured RFQ

Group parts by vehicle and assembly, use one line per item and attach numbered photographs. State destination, preferred transport method and whether a partial shipment is acceptable, but avoid mixing those questions with the identity data. The parts catalogue can help locate a component family. The final match should use the number and assembly evidence supplied with the enquiry, followed by an installation check by a qualified technician.`,
  },
  {
    slug: 'howo-cement-truck-howo-concrete-truck-howo-cement-mixer-howo-cement-mixer-truck',
    title: 'HOWO Concrete Mixer Truck Configuration Brief',
    date: '2025-10-05', updatedAt: REVIEWED_AT,
    image: '/images/news/Casting.webp', category: 'Procurement Guides',
    excerpt: 'Define the chassis, mixer body, concrete workflow, site access and cleaning needs before requesting a mixer-truck quotation.',
    seoTitle: 'HOWO Concrete Mixer Truck Configuration Guide',
    seoDescription: 'Prepare a HOWO concrete mixer truck enquiry covering chassis, drum system, site route, loading workflow and cleaning requirements.',
    keywords: ['HOWO concrete mixer truck', 'HOWO cement mixer truck', 'mixer truck configuration', 'concrete truck buyer guide'],
    internalLinks: ['/products/heavy-truck/mixer-truck', '/products/heavy-truck', '/contact'],
    content: `A mixer truck is a combined chassis and working body. A body volume on its own does not describe legal carrying capacity, mixing performance or route suitability. The enquiry should connect the concrete plant, travel time, site access and discharge method to a defined completed vehicle.

## Map the concrete workflow

Record loading method, typical travel time, road surface, gradients, discharge height and cleaning location. Note whether the truck regularly waits in traffic or works on confined sites. These details influence chassis selection, drum system requirements, water arrangement and access for maintenance.

- Destination rules for completed-vehicle mass and dimensions.
- Chassis drive formula, wheelbase and tyre arrangement.
- Drum, drive, control and water-system descriptions.
- Feed and discharge arrangement for site equipment.
- Cleaning, residual concrete and maintenance procedure.

## Specify the completed vehicle

Ask for a drawing that shows overall dimensions, axle distribution and the relationship between the drum and chassis. The quoted capacity should state what it represents and how it relates to local limits. Record engine, transmission, axles, emissions version and any power take-off or hydraulic interface used by the body. Identify who is responsible for chassis-body compatibility.

## Review maintenance and safety access

Operators need safe access to controls and clearly marked emergency procedures. Maintenance planning should cover drum drive, rollers, hydraulic components, water system, chutes and mounting points. Cleaning procedures must follow site environmental and safety rules. Any work near moving equipment requires isolation according to the equipment instructions and trained supervision.

## Compare quotations on the same brief

Use one configuration brief for every supplier and ask them to mark deviations. Separate chassis, mixer body, optional equipment, documentation and logistics in the commercial schedule. Keep the latest signed drawing with the accepted quotation so later revisions cannot be confused with the ordered vehicle. The mixer-truck catalogue can provide candidate chassis-body combinations, but final capacity and compliance need vehicle-specific drawings and destination review before acceptance.`,
  },
  {
    slug: 'howo-dump-truck-tires-size-guide-rotation-and-changing-tips-lifespan-local-options-and-big-tire-costs',
    title: 'HOWO Truck Tyre Selection and Maintenance Records',
    date: '2025-10-04', updatedAt: REVIEWED_AT,
    image: '/images/news/HOWO-TX-6x4-tractor26.webp', category: 'Industry Insights',
    excerpt: 'Match tyre size, load and service type to the vehicle, then use position-based records to manage inspection and replacement.',
    seoTitle: 'HOWO Truck Tyre Selection and Maintenance Guide',
    seoDescription: 'Check HOWO truck tyre size, load and service type, and maintain position-based pressure, damage and replacement records.',
    keywords: ['HOWO truck tyre size', 'HOWO dump truck tyres', 'truck tyre maintenance', 'HOWO tyre replacement'],
    internalLinks: ['/products/heavy-truck', '/parts', '/service'],
    content: `Tyre choice begins with the vehicle placard, approved specification and axle loads. A size that physically fits may still have the wrong load, speed, construction or service designation. Mixed patterns and uneven condition can also affect traction, braking and differential operation.

## Identify the approved specification

Record the full sidewall marking, load and speed information, construction, rim size and position. Compare it with the vehicle documentation and actual axle configuration. For twin assemblies, check that paired tyres are compatible in size and remaining diameter. Any proposed change should be reviewed for clearance, load, gearing and legal compliance.

- Photograph each tyre position and sidewall marking.
- Measure pressure cold with a maintained gauge.
- Record tread, cuts, bulges, exposed material and valve condition.
- Check rims, fasteners and signs of movement or overheating.

## Match the pattern to the duty

Long-distance paved work, mixed construction access and severe off-road haulage place different demands on tread, casing and heat management. Steering, drive and trailer positions also have different priorities. Describe the route and material to the tyre specialist instead of asking only for a “HOWO tyre.”

## Keep position-based records

Assign every wheel position a stable code. Record fitment date, tyre identity, pressure checks, inspections, repairs and removal reason. This makes recurring shoulder wear, impact damage or heat visible. Rotation should follow the tyre and vehicle guidance, local rules and fleet policy; it should not be used to hide a steering, alignment, suspension or loading problem.

## Plan replacement safely

Truck wheels and inflated assemblies store substantial energy. Removal, inflation and repair require trained personnel, appropriate restraints and specified procedures. Replace a tyre based on condition and applicable limits rather than an advertised lifespan. When requesting parts or service, send the complete marking, rim information, axle position and route description. The published truck catalogue provides configuration context, while the service enquiry should use the specific vehicle record.`,
  },
  {
    slug: 'howo-dump-truck-double-i-beam-what-double-i-beam-truck-means-explained',
    title: 'HOWO Double I-Beam Terminology and Front-Axle Checks',
    date: '2025-10-03', updatedAt: REVIEWED_AT,
    image: '/images/news/HOWO-MAX1.webp', category: 'Industry Insights',
    excerpt: 'Translate informal double I-beam descriptions into the actual front-axle, suspension and steering components shown on a truck.',
    seoTitle: 'HOWO Double I-Beam and Front-Axle Inspection Guide',
    seoDescription: 'Understand double I-beam truck terminology and verify the actual HOWO front-axle, suspension, steering and chassis arrangement.',
    keywords: ['HOWO double I beam', 'HOWO front axle', 'double I beam truck meaning', 'HOWO suspension inspection'],
    internalLinks: ['/products/heavy-truck/dump-truck', '/parts', '/contact'],
    content: `“Double I-beam” is often used informally in truck listings. Depending on the speaker, it may refer to two steering axles, an axle-beam shape, chassis rails or a general claim of strength. It is not enough information to identify a suspension or order a component.

## Ask what the term points to

Request a photograph and have the seller mark the relevant structure. Then record the drive formula, number of steering axles, suspension type and axle identification. If the subject is the chassis frame, ask for rail and reinforcement details separately. Avoid translating the phrase directly into a technical specification without physical evidence.

- Wide view of the complete front-axle arrangement.
- Identification plate or casting marks for each axle.
- Steering linkage, spring and mounting-point photographs.
- Tyre wear and ride-height observations by position.

## Inspect the actual components

Look for cracks, deformation, corrosion, damaged fasteners, displaced springs, worn bushes and fluid leaks. Check steering joints and wheel-bearing condition according to the service procedure. Uneven tyre wear may indicate alignment, load, suspension or steering issues, but it does not identify the cause by itself. Safety-critical findings need a qualified inspection before operation.

## Do not confuse other truck terms

A B-double describes a trailer combination in some markets and is unrelated to an I-beam front axle. Twin-steer, tandem drive and reinforced frame also describe different features. Write each feature in its own row so that a marketing phrase does not merge the steering, chassis and trailer configuration.

## Order parts from assembly identity

For front-axle or suspension parts, provide the axle identification, VIN context where appropriate, existing part number, dimensions and position. The dump-truck catalogue can help establish the vehicle family, but the parts catalogue and photographs must be reconciled with the actual assembly. When the original listing uses ambiguous language, preserve the phrase only as a note and base the decision on the verified component description.`,
  },
  {
    slug: 'howo-dump-truck-electrical-wiring-diagram-specs-and-price-details',
    title: 'Finding the Correct HOWO Truck Wiring Diagram',
    date: '2025-10-03', updatedAt: REVIEWED_AT,
    image: '/images/news/HOWO-MAX-6x4-tractor1.webp', category: 'Industry Insights',
    excerpt: 'Match wiring information to the VIN context, cab, engine, controller and harness before diagnosing or repairing a HOWO truck.',
    seoTitle: 'HOWO Truck Wiring Diagram Identification Guide',
    seoDescription: 'Identify the correct HOWO truck wiring diagram using vehicle, engine, cab, ECU, harness and connector information.',
    keywords: ['HOWO truck wiring diagram', 'HOWO electrical diagram', 'HOWO ECU wiring', 'HOWO harness identification'],
    internalLinks: ['/parts', '/service', '/contact'],
    content: `A diagram for a similar-looking truck can send a technician to the wrong connector or circuit. Wiring may vary with engine, emissions system, cab, production change, controller, optional equipment and previous modifications. Start by identifying the exact vehicle and electrical system.

## Build the diagram request

Record the VIN or chassis context, cab type, engine identification, emissions version and controller labels. Photograph the fuse and relay layout, harness labels and both sides of the relevant connector. State the symptom, when it occurs and any recent repair or body installation. Remove personal information that is not needed for technical matching.

- Vehicle and engine identification details.
- ECU or controller part number and software reference if available.
- Connector shape, keying, pin count and wire colours.
- Voltage readings with test points and conditions recorded.
- Photograph of non-standard splices or added equipment.

## Confirm the diagram revision

Ask what model, system and revision the document covers. Compare component and connector references with the vehicle before testing. If the match is uncertain, stop and obtain the correct service information. A web image without document identity or revision should be treated as a clue, not an authority.

## Diagnose without damaging the system

Electrical work should follow the vehicle service procedure and be performed by a competent technician. Use suitable test equipment and avoid probing that spreads terminals or creates short circuits. Record power, ground and signal measurements under defined conditions. Disconnecting controllers or welding on the chassis may require special precautions from the service information.

## Preserve the repair trail

Save the matched diagram reference, diagnostic readings, fault cause, parts fitted and final test. For an electrical parts enquiry, send the controller or harness part number with connector photographs rather than ordering from the truck name. The parts catalogue can narrow the component family, while a service request should include the evidence pack so that the correct diagram and part can be checked together.`,
  },
]

export const newsRedirects: Record<string, string> = {
  '10-wheeler-howo-truck-price-philippines-dump-truck-axle-wheels-tons-cubic-meter-capacity-and-dimensions': '6-wheeler-howo-truck-specifications-and-dimensions-what-is-a-6-wheeler-truck',
  'brand-new-howo-dump-truck-for-sale-philippines-price-price-list-details': 'howo-for-sale-truck-philippines-howo-truck-for-sale-philippines',
  'china-howo-dump-truck-price-and-dimensions-how-much-is-howo-truck-in-china-with-size-details': 'china-howo-truck-manufacturer-factory-price-dump-trucks-for-sale-used-trucks-and-spare-parts',
  'elf-howo-trucks-size-and-price-guide-for-howo-elf-truck-models': 'howo-delivery-truck-for-efficient-truck-delivery',
  'cost-and-price-of-howo-dump-truck-philippines-and-nigeria-price-list-how-much-does-it-cost-to-buy-a-dump-truck': 'howo-for-sale-truck-philippines-howo-truck-for-sale-philippines',
  'howo-dump-truck-capacity-cubic-meter-ton-engine-fuel-and-load-specs-for-howo-a7-371-and-sinotruk-models': 'howo-dump-truck-specs-dimensions-review-horsepower-howo-380-371-a7-nx-and-400-dump-truck-specifications',
  'howo-10-wheeler-dump-truck-price-in-the-philippines-second-hand-options-dimensions-length-cost-guide': 'howo-for-sale-truck-philippines-howo-truck-for-sale-philippines',
  'howo-dump-truck-t7-and-t7h-models-complete-specs-guide': 'howo-dump-truck-specs-dimensions-review-horsepower-howo-380-371-a7-nx-and-400-dump-truck-specifications',
  'howo-dump-truck-6x4-nx-tx-a7-and-371-models-for-sale-price-weight-and-dimensions-of-sinotruk-howo-6x4-dump-trucks': 'howo-dump-truck-specs-dimensions-review-horsepower-howo-380-371-a7-nx-and-400-dump-truck-specifications',
  'howo-dump-truck-side-view-and-side-dump-trailer-dimensions-explained': 'howo-dump-truck-specs-dimensions-review-horsepower-howo-380-371-a7-nx-and-400-dump-truck-specifications',
  'howo-dump-trucks-china-price-dimensions-size-and-used-howo-dump-trucks-for-sale-in-china': 'china-howo-truck-manufacturer-factory-price-dump-trucks-for-sale-used-trucks-and-spare-parts',
  'howo-dump-trucks-and-tipper-trucks-for-sale-in-china-philippines-zimbabwe-ghana-nigeria-new-and-used-options-available': 'china-howo-truck-manufacturer-factory-price-dump-trucks-for-sale-used-trucks-and-spare-parts',
  'looking-for-howo-trucks-for-sale-in-the-philippines-find-new-and-used-howo-dump-trucks-on-olx-and-learn-how-much-a-10-wheeler-truck-costs-in-the-philippines': 'howo-for-sale-truck-philippines-howo-truck-for-sale-philippines',
  'how-to-apply-for-a-howo-delivery-truck-on-shopee-in-the-philippines': 'howo-delivery-truck-for-efficient-truck-delivery',
  'howo-dump-truck-price-list-in-philippines-howo-dump-truck-philippines-price-list-and-howo-dump-truck-price-in-the-philippines': 'howo-for-sale-truck-philippines-howo-truck-for-sale-philippines',
  'howo-dump-truck-for-sale-philippines-contact-supplier-now': 'howo-for-sale-truck-philippines-howo-truck-for-sale-philippines',
  'how-to-learn-to-drive-a-dump-truck-and-become-a-dump-truck-driver-understanding-howo-dump-truck-specs-engine-details-capacity-and-engine-number-location': 'how-to-drive-a-howo-dump-truck-and-dump-it-engine-number-location-specs-and-engine-no-guide',
  'how-to-lift-a-howo-twin-i-beam-truck-understanding-double-i-beam-truck-meaning-for-howo-dump-trucks': 'howo-dump-truck-double-i-beam-what-double-i-beam-truck-means-explained',
  'howo-dump-truck-double-beam-vs-double-i-beam-difference-between-a-double-and-b-double-trucks-and-how-to-reverse-b-double-truck': 'howo-dump-truck-double-i-beam-what-double-i-beam-truck-means-explained',
  'howo-dump-trucks-philippines-price-list-dimensions-sizes-dealers-and-mini-dump-trucks-for-sale': 'howo-for-sale-truck-philippines-howo-truck-for-sale-philippines',
  'used-howo-dump-truck-for-sale-philippines-olx-check-size-price': '2017-howo-truck-and-dump-truck-review',
  'howo-dump-truck-12-wheeler-price-howo-12-wheeler-dump-truck-price-philippines-second-hand-howo-dump-truck-price-12-wheeler-dumper-price-in-india-12-wheeler-dumper-price': '6-wheeler-howo-truck-specifications-and-dimensions-what-is-a-6-wheeler-truck',
}
