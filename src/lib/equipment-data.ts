// ── Static equipment data ─────────────────────────────────────────────────────
//
// This is the source of truth when Sanity CMS is not yet configured.
// It is also used by /equipment/[slug] to generate static pages at build time
// and to serve SEO metadata for every machine.
//
// Conventions:
//  • shortDesc  — shown on the homepage grid card (≤ 2 lines)
//  • description — full SEO-rich body copy for the detail page (200–260 words)
//  • seoDescription — ≤ 160 characters for <meta name="description">

export type EquipmentCategory = "strength" | "cardio" | "free-weights" | "functional";

export interface StaticSpec {
  label: string;
  value: string;
}

export interface StaticEquipment {
  slug:           string;
  name:           string;
  category:       EquipmentCategory;
  shortDesc:      string;
  description:    string;
  muscleGroups:   string[];
  specs:          StaticSpec[];
  benefits:       string[];
  trainingTips:   string[];
  seoTitle:       string;
  seoDescription: string;
  keywords:       string[];
}

// ── Machine data ──────────────────────────────────────────────────────────────

export const STATIC_EQUIPMENT: StaticEquipment[] = [
  {
    slug:     "smith-machine",
    name:     "Smith Machine",
    category: "strength",
    shortDesc:
      "A guided barbell system with counterbalanced movement, ideal for squats, bench press, and shoulder press with added stability and safety.",
    description:
      "The Smith Machine at Spark Fitness Zone is a commercial-grade guided barbell system designed for maximum safety and versatility across all strength levels. Unlike a free barbell, the counterbalanced bar travels on fixed vertical guide rails with safety hooks every 5 cm — allowing you to bail out of any lift without a spotter. This makes it the preferred choice for solo heavy training sessions and for beginners learning compound movement patterns under load for the first time. " +
      "The Smith Machine supports an enormous range of exercises beyond the obvious squat and bench press: incline and decline chest press, overhead shoulder press, hip thrusts, Bulgarian split squats, barbell rows, calf raises, and shrugs all benefit from the fixed path. The vertical plane removes the stabiliser demand that can cause technique breakdown under near-max loads, letting you focus 100% of effort on the target muscle. " +
      "At Spark Fitness Zone, the Smith Machine sits in the central strength zone alongside free-weight racks and the cable crossover, making it easy to superset between movements without moving across the floor. Whether you are adding 2.5 kg to your squat for the first time or pressing 140 kg in a controlled drop set, this machine handles it safely.",
    muscleGroups: ["Chest", "Quads", "Shoulders", "Hamstrings", "Glutes", "Calves"],
    specs: [
      { label: "Max Load Capacity", value: "200 kg" },
      { label: "Bar Path",          value: "Fixed Vertical" },
      { label: "Safety Hook Spacing", value: "Every 5 cm" },
      { label: "Counterbalanced Bar", value: "~15 kg (felt weight)" },
      { label: "Guide Rail Height",  value: "220 cm" },
      { label: "Grade",              value: "Commercial" },
      { label: "Maintenance",        value: "Serviced Weekly" },
    ],
    benefits: [
      "Train to failure solo without a spotter",
      "Learn compound movement patterns safely under load",
      "Isolate specific muscle heads with reduced stabiliser demand",
      "Supports 20+ exercise variations from a single station",
      "Adjustable safety catches at every 5 cm for precise rack height",
    ],
    trainingTips: [
      "Set safety catches 2–3 cm below your lowest point of motion so you can bail safely",
      "For Smith Machine squats, allow a slight forward foot position (vs. free-bar squats) to accommodate the fixed bar path",
      "Incline Smith press with a 30° bench targets the upper chest fibres with excellent overload",
      "Hip thrusts on the Smith Machine allow heavier loading than a free barbell because both ends are fixed",
    ],
    seoTitle:       "Smith Machine Gym in Jamshedpur | Spark Fitness Zone — Best Strength Training",
    seoDescription: "Commercial Smith Machine at Spark Fitness Zone Jamshedpur. Solo squats, bench press & 20+ exercises. Best strength gym in Jharkhand. Book free trial.",
    keywords: [
      "Smith Machine gym Jamshedpur",
      "Smith Machine squat Jamshedpur",
      "best gym in Jamshedpur",
      "strength training gym Jamshedpur",
      "gym near me Jamshedpur",
      "safe bench press gym Jamshedpur",
      "gym Mango Jamshedpur",
      "gym Chepapul Jamshedpur",
      "guided barbell gym Jharkhand",
      "premium gym Jamshedpur",
      "Spark Fitness Zone Jamshedpur",
      "join gym Jamshedpur",
    ],
  },
  {
    slug:     "cable-crossover",
    name:     "Cable Crossover",
    category: "strength",
    shortDesc:
      "A dual pulley system with adjustable height — highly versatile for chest flyes, rows, curls, and tricep pushdowns across 180-degree angles.",
    description:
      "The Cable Crossover tower at Spark Fitness Zone is the most versatile single piece of strength equipment in the facility. It features two fully independent weight stacks — each rated to 100 kg — with pulley heights that slide from floor level (0 cm) to full overhead (220 cm). This infinite angle adjustment lets you attack any muscle from any fibre angle, something neither machines nor free weights can match. " +
      "Common applications include cable chest flyes at both high and low angles to target the sternal and clavicular heads independently, straight-arm pulldowns for lat isolation, face pulls for rear delt and rotator cuff health, cable curls for bicep peak, and rope tricep pushdowns. Because the resistance is constant throughout the full range of motion (unlike dumbbells, which lose tension at the top), cable exercises provide superior muscular time under tension — the key driver of hypertrophy. " +
      "The station comes with a full attachment set: straight bar, EZ-curl bar, V-bar, rope attachment, single D-ring handles, and ankle strap. Unilateral cable training also dramatically improves core stability and side-to-side muscle symmetry — making this station essential for both aesthetic and functional training goals. Available to all members at Spark Fitness Zone with no booking required.",
    muscleGroups: ["Chest", "Back", "Shoulders", "Arms", "Core"],
    specs: [
      { label: "Weight Stack (per side)", value: "100 kg" },
      { label: "Pulley Height Range",     value: "0–220 cm (fully adjustable)" },
      { label: "Cable Ratio",             value: "1:1" },
      { label: "Attachments Included",    value: "Straight bar, EZ-bar, V-bar, Rope, D-rings, Ankle strap" },
      { label: "Grade",                   value: "Commercial Heavy Duty" },
      { label: "Maintenance",             value: "Serviced Weekly" },
    ],
    benefits: [
      "Constant tension throughout full range of motion — superior for muscle growth",
      "Infinite pulley height adjustment targets any muscle fibre angle",
      "Unilateral training corrects left-right strength imbalances",
      "Multiple attachment handles = 40+ exercise variations from one station",
      "Safer on joints than free weights for isolation movements",
    ],
    trainingTips: [
      "Set both pulleys to the same height for bilateral chest flyes to keep tension symmetrical",
      "High-to-low cable flyes (pulley at shoulder height) target lower chest fibres most effectively",
      "Face pulls with the rope at eye level are the single best exercise for long-term shoulder health",
      "Use a D-ring handle for single-arm cable rows to maximise lat stretch at full extension",
    ],
    seoTitle:       "Cable Crossover Machine Jamshedpur | Best Gym for Chest & Back — Spark Fitness Zone",
    seoDescription: "Dual 100 kg cable crossover at Spark Fitness Zone Jamshedpur. 40+ exercise variations for chest, back & arms. Best gym in Jharkhand. Book free trial.",
    keywords: [
      "cable crossover gym Jamshedpur",
      "cable machine Jamshedpur",
      "cable fly chest workout Jamshedpur",
      "best gym for chest Jamshedpur",
      "cable row back workout Jamshedpur",
      "gym in Jamshedpur",
      "best gym Jamshedpur",
      "gym near me Mango Jamshedpur",
      "strength training gym Jharkhand",
      "Spark Fitness Zone Jamshedpur",
      "bodybuilding gym Jamshedpur",
      "premium gym Jharkhand",
    ],
  },
  {
    slug:     "technogym-treadmill",
    name:     "Technogym Treadmill",
    category: "cardio",
    shortDesc:
      "Commercial-grade treadmills with incline up to 15%, speed up to 22 km/h, and integrated heart rate monitoring for precise cardio training.",
    description:
      "Spark Fitness Zone runs Technogym commercial treadmills — the same equipment used by professional football clubs, Olympic training centres, and cardiac rehabilitation hospitals. These are not budget consumer machines; every component is engineered for continuous multi-user commercial use at maximum effort. " +
      "The deck features Technogym's patented impact-absorption cushioning, which reduces ground-reaction force by up to 30% versus running on tarmac. This dramatically reduces cumulative knee, hip, and ankle stress — critical for members training 5–6 days per week. The motorised incline range of 0–15% lets you simulate hill running and ramp up caloric output without increasing speed, making it ideal for fat loss programming. " +
      "At the upper end, 22 km/h supports even elite sprinters for short interval work. Built-in contact heart rate grips and Bluetooth chest strap compatibility allow you to train in precise heart rate zones — Zone 2 aerobic base building at 60–70% max HR, or Zone 4 threshold work at 80–90% for VO2 max development. The Technogym MyWellness cloud platform logs every session automatically when paired with your profile. All units at Spark Fitness Zone are maintained under a Technogym service contract with weekly inspections.",
    muscleGroups: ["Cardiovascular", "Quads", "Hamstrings", "Glutes", "Calves"],
    specs: [
      { label: "Brand / Model",      value: "Technogym Run Series" },
      { label: "Speed Range",        value: "0.5–22 km/h" },
      { label: "Incline Range",      value: "0–15%" },
      { label: "Motor",              value: "4.5 HP continuous duty" },
      { label: "Deck Cushioning",    value: "Impact-absorbing (−30% vs. tarmac)" },
      { label: "Heart Rate Monitor", value: "Contact grips + Bluetooth chest strap" },
      { label: "App Integration",    value: "Technogym MyWellness" },
      { label: "Grade",              value: "Commercial / Hospital Grade" },
    ],
    benefits: [
      "30% less impact on joints vs. outdoor running — safe for daily use",
      "Precise incline control for fat-burning hill protocols",
      "Heart rate zone training for VO2 max and aerobic base development",
      "MyWellness app integration for automatic workout logging",
      "Speed range covers walking rehabilitation through sprint intervals",
    ],
    trainingTips: [
      "For fat loss, use 10–12% incline at a brisk walk (5–6 km/h) to maximise caloric output with minimal joint stress",
      "Zone 2 training (60–70% max HR) for 45–60 min builds aerobic base and metabolic efficiency over 8–12 weeks",
      "Norwegian 4×4 intervals: 4 min at 85–95% max HR, 3 min recovery × 4 rounds — one of the most effective VO2 max protocols",
      "Increase treadmill incline to 1–2% to better simulate outdoor running biomechanics on flat terrain",
    ],
    seoTitle:       "Best Treadmill Gym in Jamshedpur | Technogym Cardio — Spark Fitness Zone",
    seoDescription: "Technogym treadmill at Spark Fitness Zone Jamshedpur — 22 km/h, 15% incline, heart rate zones. Jharkhand's best cardio gym. Book a free session.",
    keywords: [
      "treadmill gym Jamshedpur",
      "best cardio gym Jamshedpur",
      "running gym Jamshedpur",
      "fat loss gym Jamshedpur",
      "cardio machine gym Jamshedpur",
      "gym near me Jamshedpur cardio",
      "Technogym gym Jamshedpur",
      "gym Mango Chepapul Jamshedpur",
      "heart rate training gym Jharkhand",
      "best gym in Jharkhand",
      "Spark Fitness Zone cardio zone",
      "weight loss gym Jamshedpur",
    ],
  },
  {
    slug:     "leg-press-machine",
    name:     "Leg Press Machine",
    category: "strength",
    shortDesc:
      "45-degree sled leg press with a 400 kg capacity. Ideal for quad-dominant lower body development with reduced spinal compression versus squats.",
    description:
      "The 45-degree plate-loaded leg press at Spark Fitness Zone is the definitive lower body overload machine — and one of the most-used pieces of equipment in the facility. The 45-degree angle geometry is deliberately chosen: it allows the spine to remain in a neutral supported position throughout the press, eliminating the spinal compression that makes heavy squatting high-risk for those with disc or lower back issues. " +
      "With a 400 kg maximum load capacity and Olympic plate sleeves on both sides, advanced members can load 200–300+ kg for ultra-heavy quad and glute work. The adjustable backrest locks in four positions to accommodate different leg lengths and torso proportions, ensuring the knee angle at the bottom of the movement is consistent for every user. " +
      "Foot placement dramatically changes which muscle group is targeted: feet high and wide recruits the hamstrings and glutes; feet low and narrow isolates the VMO (inner quad) for knee stability and aesthetics. The leg press is a cornerstone of every programme at Spark Fitness Zone — from the fat loss clients using lighter loads for high-rep metabolic circuits, to the bodybuilders stacking 8–10 plates per side for maximum quad hypertrophy. Available across all membership plans, no advance booking required.",
    muscleGroups: ["Quads", "Hamstrings", "Glutes", "Calves"],
    specs: [
      { label: "Angle",              value: "45 degrees" },
      { label: "Max Load Capacity",  value: "400 kg" },
      { label: "Plate Compatibility", value: "Olympic (50 mm bore)" },
      { label: "Back Pad Positions", value: "4 adjustable positions" },
      { label: "Platform Size",      value: "Wide (accommodates all stance widths)" },
      { label: "Grade",              value: "Commercial" },
      { label: "Maintenance",        value: "Serviced Weekly" },
    ],
    benefits: [
      "Heavy quad overload with zero spinal compression risk",
      "Safe for members with lower back sensitivities — no axial load",
      "Foot position variations target different muscle groups precisely",
      "400 kg capacity supports elite-level overloading",
      "Adjustable back pad fits all body types",
    ],
    trainingTips: [
      "Low, narrow foot placement (near bottom of platform) isolates the VMO (inner quad) for knee stability",
      "High, wide foot placement shifts load to hamstrings and glutes — excellent for glute development",
      "Pause at the bottom for 1–2 seconds to eliminate stretch reflex and maximise quad tension",
      "Single-leg leg press corrects left-right strength imbalances common in runners and cyclists",
    ],
    seoTitle:       "Leg Press Machine Gym in Jamshedpur | Best Leg Day — Spark Fitness Zone",
    seoDescription: "400 kg leg press at Spark Fitness Zone Jamshedpur. Heavy quad & glute training, zero spinal load. Best leg day gym in Jharkhand. Book a free trial.",
    keywords: [
      "leg press machine Jamshedpur",
      "leg day gym Jamshedpur",
      "best gym for legs Jamshedpur",
      "quad workout gym Jamshedpur",
      "glute training gym Jamshedpur",
      "lower body strength gym Jamshedpur",
      "gym near me Jamshedpur legs",
      "gym Mango Jamshedpur",
      "bodybuilding leg gym Jharkhand",
      "back-safe leg workout Jamshedpur",
      "Spark Fitness Zone leg zone",
      "best gym Jharkhand",
    ],
  },
  {
    slug:     "assault-bike",
    name:     "Assault Bike",
    category: "functional",
    shortDesc:
      "Full-body air resistance bike. The harder you push, the more resistance is generated — delivering one of the most intense conditioning sessions possible.",
    description:
      "The Assault AirBike is widely regarded as the single most brutal conditioning tool in any gym — and Spark Fitness Zone has it in the functional training zone for a reason. Unlike magnetic or friction resistance bikes, the Assault Bike uses a large fan to generate resistance: the harder you pedal and push, the more air resistance the fan creates. This means resistance is completely unlimited and self-regulating — every member from beginner to elite athlete trains at their own ceiling. " +
      "The dual-arm handles engage the upper body simultaneously with the legs, recruiting an estimated 80%+ of skeletal muscle mass in a single movement. This produces the highest metabolic output — calories per minute and VO2 max stimulus — of almost any single piece of cardio equipment. It is used extensively in CrossFit, military fitness, NFL conditioning, and cardiac rehab for exactly this reason. " +
      "At Spark Fitness Zone, the Assault Bike is a key tool in both the fat loss programme (20-second Tabata intervals with 10-second rest) and the athletic performance conditioning work. The LCD console tracks calories, RPM, heart rate, and watts in real time. Because it requires zero electricity for the resistance mechanism, it never breaks down mid-session. An essential machine for anyone serious about metabolic conditioning.",
    muscleGroups: ["Full Body", "Quads", "Hamstrings", "Glutes", "Chest", "Triceps", "Shoulders", "Cardiovascular"],
    specs: [
      { label: "Resistance Type",    value: "Air (fan-based, self-regulating)" },
      { label: "Max Resistance",     value: "Unlimited (effort-dependent)" },
      { label: "Drive",              value: "Dual-arm push/pull + legs simultaneously" },
      { label: "Console Metrics",    value: "Calories, RPM, Watts, Heart Rate, Distance" },
      { label: "Power Source",       value: "Self-powered (no electricity)" },
      { label: "Frame",              value: "Heavy gauge steel" },
      { label: "Max User Weight",    value: "136 kg" },
    ],
    benefits: [
      "Maximum caloric burn in minimum time — unmatched metabolic output",
      "Full-body movement recruits 80%+ of skeletal muscle simultaneously",
      "Self-regulating resistance means every athlete trains at their own ceiling",
      "Zero impact on joints — safe conditioning for injured athletes",
      "Tabata and AMRAP protocols deliver VO2 max gains in 20 minutes",
    ],
    trainingTips: [
      "Tabata protocol: 20 seconds all-out effort, 10 seconds rest × 8 rounds (4 minutes total) — scientifically proven for VO2 max gains",
      "For fat loss, use 10-second sprint intervals with 50 seconds of low RPM recovery for 20 minutes",
      "Maintain upright posture and push/pull the handles equally with your upper body — many people underuse their arms",
      "Track your 10-calorie time as a benchmark — aim to improve it by 1–2 seconds every 2 weeks",
    ],
    seoTitle:       "Assault Bike & HIIT Gym Jamshedpur | Spark Fitness Zone — Functional Training",
    seoDescription: "Assault AirBike at Spark Fitness Zone Jamshedpur — full-body HIIT, unlimited air resistance. Jharkhand's top functional gym. Book a free session.",
    keywords: [
      "assault bike gym Jamshedpur",
      "HIIT gym Jamshedpur",
      "best HIIT training Jamshedpur",
      "functional training gym Jamshedpur",
      "air bike workout Jamshedpur",
      "CrossFit gym Jamshedpur",
      "fat burning gym Jamshedpur",
      "gym near me HIIT Jamshedpur",
      "conditioning gym Jharkhand",
      "best gym Jamshedpur HIIT",
      "Spark Fitness Zone functional",
      "metabolic conditioning gym Jamshedpur",
    ],
  },
  {
    slug:     "dumbbells-2-50kg",
    name:     "Dumbbells 2–50 kg",
    category: "free-weights",
    shortDesc:
      "A complete rubber hex dumbbell rack from 2 kg to 50 kg with rubberised floor zone, mirrors, and benches for every angle of free weight training.",
    description:
      "Spark Fitness Zone houses one of the most complete free weights zones in Jharkhand — a full rubber hex dumbbell rack spanning 2 kg to 50 kg in 2 kg increments, totalling 25 pairs and 50 dumbbells in constant availability. The hexagonal rubber coating prevents rolling on the floor, protects the rubberised platform surface, and significantly reduces noise during racking. " +
      "The dedicated free weights zone surrounds the rack with floor-to-ceiling mirrors on three walls, three adjustable benches (flat, incline up to 70°, and decline), a pair of EZ-curl bars, and a preacher curl station. This setup allows you to perform every free weight exercise without moving more than 2 metres — essential when training during peak hours. " +
      "Whether you are performing 4 kg lateral raises for shoulder width, 20 kg dumbbell rows for back thickness, 40 kg dumbbell chest press for pectoral overload, or 50 kg hammer curls to build arm mass, the complete range is there. Free weight training with dumbbells activates significantly more stabiliser muscle activity versus machines, producing superior functional strength, muscle coordination, and long-term joint health. " +
      "For beginners, the lighter end of the rack is ideal for learning movement patterns before progressing to barbell work. For advanced athletes, the 50 kg end supports elite-level single-arm press, incline press, and row loads. All members at Spark Fitness Zone have full access to the free weights zone.",
    muscleGroups: ["All Muscle Groups"],
    specs: [
      { label: "Dumbbell Range",      value: "2 kg to 50 kg (2 kg increments)" },
      { label: "Total Pairs",         value: "25 pairs (50 dumbbells)" },
      { label: "Coating",             value: "Rubber hex, anti-roll, anti-noise" },
      { label: "Benches Available",   value: "Flat, Incline (0–70°), Decline" },
      { label: "Additional Equipment", value: "EZ-curl bars, Preacher curl station" },
      { label: "Zone Surface",        value: "Commercial rubber flooring" },
      { label: "Mirrors",             value: "3 walls, floor-to-ceiling" },
    ],
    benefits: [
      "Complete range from rehabilitation weights to elite-level loads",
      "Activates more stabiliser muscles than machines for superior functional strength",
      "Corrects left-right muscle imbalances impossible to hide behind bilateral machines",
      "Infinite exercise variety — every muscle group, every angle",
      "Floor-to-ceiling mirrors allow real-time form correction",
    ],
    trainingTips: [
      "For hypertrophy, use a weight where failure occurs at 8–12 reps — increase when you can complete 12 reps with clean form",
      "Single-arm dumbbell rows with full range of motion (elbow past torso) maximise lat engagement",
      "Dumbbell chest press with a slight wrist rotation (palms neutral to slightly inward at top) reduces shoulder stress",
      "For shoulder health, include face pulls and rear delt flyes (3–5 kg) in every push session",
    ],
    seoTitle:       "Free Weights Gym Jamshedpur — Dumbbells 2–50 kg | Spark Fitness Zone",
    seoDescription: "Full dumbbell rack 2–50 kg at Spark Fitness Zone Jamshedpur. 25 pairs, adjustable benches & mirrors. Best free weights gym in Jharkhand. Book now.",
    keywords: [
      "free weights gym Jamshedpur",
      "dumbbell gym Jamshedpur",
      "best free weights gym Jamshedpur",
      "weight training gym Jamshedpur",
      "gym with dumbbells Jamshedpur",
      "gym near me Jamshedpur free weights",
      "dumbbell workout gym Mango Jamshedpur",
      "gym Chepapul Jamshedpur",
      "bodybuilding gym Jharkhand",
      "muscle building gym Jamshedpur",
      "Spark Fitness Zone free weights",
      "premium gym Jamshedpur",
    ],
  },
  {
    slug:     "rowing-machine",
    name:     "Rowing Machine",
    category: "cardio",
    shortDesc:
      "Concept2 RowErg air rower — the global standard for rowing performance. Tracks split time, watts, and stroke rate for data-driven cardio.",
    description:
      "Spark Fitness Zone uses the Concept2 RowErg — the universally accepted global standard for rowing performance used in every Olympic training centre, elite CrossFit facility, and cardiac rehabilitation programme worldwide. The RowErg has been the official measurement tool for indoor rowing records for over 40 years, and its consistency across every unit means your 500m split time at Spark Fitness Zone is directly comparable to any other Concept2 in the world. " +
      "Unlike the treadmill or assault bike, the rowing stroke is a full-body coordinated movement: the drive begins with a leg push (60% of power), transitions through the hips (20%), and finishes with the arm pull (20%). This sequence engages the posterior chain — hamstrings, glutes, erector spinae — plus the lats, rhomboids, biceps, and core, burning more calories per minute than most other cardio machines at equivalent effort levels. " +
      "The PM5 performance monitor displays split time (how long it takes you to row 500 metres), watts, strokes per minute, total calories, and elapsed time. ErgData Bluetooth connectivity uploads your session automatically to Concept2's online logbook — building a searchable history of every workout. The telescoping footrest adjusts for shoe sizes from 36 to 47 and the ergonomic aluminium handle reduces wrist strain during long sessions. Available to all members at Spark Fitness Zone.",
    muscleGroups: ["Hamstrings", "Glutes", "Core", "Lats", "Rhomboids", "Biceps", "Cardiovascular"],
    specs: [
      { label: "Brand / Model",       value: "Concept2 RowErg (Model D/E)" },
      { label: "Resistance Type",     value: "Air flywheel (damper 1–10)" },
      { label: "Performance Monitor", value: "PM5 (Split time, Watts, S/M, Calories)" },
      { label: "Connectivity",        value: "Bluetooth (ErgData app)" },
      { label: "Footrest",            value: "Telescoping, shoe size 36–47" },
      { label: "Max User Weight",     value: "272 kg" },
      { label: "Grade",               value: "Olympic / Commercial" },
    ],
    benefits: [
      "Full-body workout in one movement — legs, hips, back, arms, and core simultaneously",
      "Zero impact — joints never bear weight, safe for daily use",
      "PM5 monitor enables precise, repeatable training with real data",
      "ErgData app builds a permanent session history for progressive overload tracking",
      "Highest calorie burn per minute of any low-impact cardio machine",
    ],
    trainingTips: [
      "Learn the stroke sequence: legs first, then lean back, then arms — many beginners rush to arm-pull which kills power and strains the back",
      "Damper setting 3–5 is optimal for most users — high damper (8–10) does NOT mean more resistance, it means more drag (like rowing a barge vs. a racing shell)",
      "Target a 2:00–2:10 split time per 500m as an intermediate benchmark — elite rowers hold sub-1:30",
      "For fat loss, try the 20/10 interval: 20 strokes all-out at 28–32 s/m, 10 strokes easy recovery × 8 rounds",
    ],
    seoTitle:       "Rowing Machine Gym Jamshedpur | Concept2 RowErg — Spark Fitness Zone",
    seoDescription: "Concept2 RowErg at Spark Fitness Zone Jamshedpur — full-body low-impact cardio, PM5 monitor & Bluetooth. Best cardio gym in Jharkhand. Book now.",
    keywords: [
      "rowing machine gym Jamshedpur",
      "Concept2 rowing Jamshedpur",
      "low impact cardio gym Jamshedpur",
      "full body cardio gym Jamshedpur",
      "best cardio gym Jamshedpur",
      "gym near me Jamshedpur rowing",
      "calorie burn gym Jamshedpur",
      "gym Mango Jamshedpur cardio",
      "Olympic rowing gym Jharkhand",
      "indoor rowing Jamshedpur",
      "Spark Fitness Zone rowing machine",
      "best gym Jharkhand",
    ],
  },
  {
    slug:     "t-bar-row",
    name:     "T-Bar Row",
    category: "strength",
    shortDesc:
      "A landmine-mounted T-bar row station for building back thickness. Supports heavy bilateral and unilateral loading for advanced back development.",
    description:
      "The T-Bar Row station at Spark Fitness Zone is specifically designed for building upper-back thickness and mass — a training goal that is notoriously difficult to achieve with cables or machines alone. The landmine-mounted pivot point allows a natural arc of motion that closely mirrors the pulling mechanics of the barbell row, but with a chest pad support option that eliminates lower back fatigue and allows true back-to-failure training. " +
      "The chest-supported variant is particularly valuable: by removing hip drive and lower back engagement from the equation, every gram of effort goes directly into the lats, rhomboids, and trapezius — the three muscle groups responsible for the wide, thick back that defines a competition-ready physique. This makes it the preferred back exercise for our bodybuilding programme members. " +
      "Two handle attachments are available at this station: a narrow-grip V-handle (neutral grip, hands shoulder-width apart) that targets the lower lats and creates that all-important V-taper, and a wide overhand bar that hits the upper back, rear deltoids, and rhomboids more aggressively. Loading is via standard Olympic plates, and the station supports weights well beyond what most members will ever need. A staple of every serious back day at Spark Fitness Zone.",
    muscleGroups: ["Lats", "Rhomboids", "Trapezius", "Rear Deltoids", "Biceps", "Erector Spinae"],
    specs: [
      { label: "Type",                value: "Landmine-mounted, plate-loaded" },
      { label: "Plate Compatibility", value: "Olympic (50 mm bore)" },
      { label: "Support Options",     value: "Standing and chest-pad supported" },
      { label: "Handle Attachments",  value: "Narrow V-grip + Wide overhand bar" },
      { label: "Grade",               value: "Commercial" },
      { label: "Maintenance",         value: "Serviced Weekly" },
    ],
    benefits: [
      "Targets upper back thickness and mass more directly than cable rows",
      "Chest-supported variant eliminates lower back fatigue — train back to true failure",
      "V-grip handle builds lower lat width and the V-taper silhouette",
      "Wide-grip option recruits rear deltoids and rhomboids for full upper back development",
      "Heavier loading possible vs. dumbbell rows — drives greater hypertrophy stimulus",
    ],
    trainingTips: [
      "Use the chest-pad support for your last 2 sets per session to ensure full lat recruitment without spinal fatigue",
      "V-grip rows: pull elbows behind the torso and hold for 1 second at peak contraction — this activates the lats maximally",
      "Wide-grip overhand rows: focus on pulling the elbows out and upward (like spreading wings) to recruit rear delts",
      "Control the eccentric (lowering) phase for 2–3 seconds — back thickness is built in the stretch, not just the contraction",
    ],
    seoTitle:       "T-Bar Row Gym in Jamshedpur | Best Back Training — Spark Fitness Zone",
    seoDescription: "T-Bar Row at Spark Fitness Zone Jamshedpur. Build back thickness & V-taper with chest-supported & standing variants. Premier bodybuilding gym in Jharkhand.",
    keywords: [
      "T-bar row machine Jamshedpur",
      "back workout gym Jamshedpur",
      "best back training gym Jamshedpur",
      "lat workout gym Jamshedpur",
      "bodybuilding gym Jamshedpur",
      "V-taper back gym Jamshedpur",
      "gym near me back day Jamshedpur",
      "gym Mango Jamshedpur strength",
      "muscle building gym Jharkhand",
      "best gym for back Jamshedpur",
      "Spark Fitness Zone strength zone",
      "premium gym Jharkhand",
    ],
  },
  {
    slug:     "battle-ropes-sled",
    name:     "Battle Ropes & Sled",
    category: "functional",
    shortDesc:
      "A dedicated functional training turf with heavy battle ropes, a push/pull sled, resistance bands, and plyometric boxes for HIIT and athletic training.",
    description:
      "The functional training turf at Spark Fitness Zone is the most comprehensive athletic conditioning area in Jharkhand. It is built around four key tools: heavy-duty battle ropes, a weighted push/pull sled on artificial turf, plyometric boxes, and a ceiling-mounted pull-up and climbing rig — each designed to develop power, speed, and metabolic conditioning that traditional machine-based training cannot replicate. " +
      "Two pairs of 15-metre battle ropes are available — 38mm diameter for endurance-focused wave training, and a thicker 50mm rope for maximal power output in short intervals. Battle rope training delivers near-maximal shoulder, core, and cardiovascular activation simultaneously, making it one of the highest-intensity tools in the gym without any impact on the lower body joints. " +
      "The weighted sled travels the full length of the turf on low-friction AstroTurf for both push and pull variations. Sled pushes are universally prescribed for quad strength, metabolic conditioning, and sprint power without any eccentric component — meaning zero muscle soreness the following day, making it safe to train with high frequency. " +
      "Plyometric boxes at three heights (30, 45, and 60 cm) enable box jumps, step-ups, and depth jumps for explosive leg power. Combined with the resistance band anchors and pull-up rig, this zone enables complete GPP (General Physical Preparedness) circuits that form the backbone of our fat loss and athletic performance programmes.",
    muscleGroups: ["Full Body", "Shoulders", "Core", "Quads", "Hamstrings", "Glutes", "Cardiovascular", "Power", "Endurance"],
    specs: [
      { label: "Battle Ropes",       value: "2× 15m (38mm) + 2× 15m (50mm)" },
      { label: "Weighted Sled",      value: "Push/pull, stackable plates, AstroTurf" },
      { label: "Plyometric Boxes",   value: "30 cm, 45 cm, 60 cm (3 sizes)" },
      { label: "Resistance Bands",   value: "5 resistance levels, wall-anchored" },
      { label: "Pull-up Rig",        value: "Ceiling-mounted, multiple grip options" },
      { label: "Climbing Rope",      value: "6 m, ceiling-mounted" },
      { label: "Surface",            value: "Commercial AstroTurf / rubber flooring" },
    ],
    benefits: [
      "Sport-specific conditioning that transfers directly to athletic performance",
      "Zero-impact sled training — maximum conditioning with no muscle soreness",
      "Battle ropes provide maximal upper body and cardio stimulus simultaneously",
      "Plyometric boxes build explosive power for sprinting, jumping, and sport",
      "High-frequency fat loss circuits burn 15–20% more calories than treadmill equivalents",
    ],
    trainingTips: [
      "Battle rope alternating waves at 20-second intervals with 40 seconds rest × 10 rounds is one of the best shoulder conditioning finishers",
      "Sled push: use your full body weight forward at a 45-degree lean and drive through the heels — never stand upright",
      "Box jumps: always land softly with knees bent to absorb force — step down rather than jump down to protect the knees",
      "For fat loss circuits, rotate: battle ropes (30s) → sled push (20m) → box jumps (10 reps) → rest 90 seconds × 5 rounds",
    ],
    seoTitle:       "Battle Ropes & Sled Gym Jamshedpur | HIIT & Functional Training — Spark Fitness Zone",
    seoDescription: "Battle ropes, sled & plyometric boxes at Spark Fitness Zone Jamshedpur. Jharkhand's best HIIT & functional fitness facility. Book a free session.",
    keywords: [
      "battle ropes gym Jamshedpur",
      "functional training gym Jamshedpur",
      "HIIT gym Jamshedpur",
      "sled push gym Jamshedpur",
      "athletic training gym Jamshedpur",
      "best HIIT gym Jharkhand",
      "plyometric training Jamshedpur",
      "fat loss gym Jamshedpur functional",
      "gym near me HIIT Jamshedpur",
      "gym Mango Jamshedpur functional",
      "Spark Fitness Zone turf zone",
      "sports conditioning gym Jamshedpur",
    ],
  },
  {
    slug:     "leg-extension",
    name:     "Leg Extension Machine",
    category: "strength",
    shortDesc:
      "A selectorised leg extension machine that isolates the quadriceps through a full arc of motion — the definitive finishing movement for quad definition and VMO development.",
    description:
      "The Leg Extension Machine at Spark Fitness Zone is the most direct way to isolate the quadriceps — specifically the rectus femoris, vastus lateralis, and VMO (vastus medialis oblique) — without any involvement from the glutes or hamstrings. Unlike compound movements such as squats and leg press, the leg extension places the entire resistance load exclusively on the quads through a fixed arc of motion from 90 degrees of knee flexion to full extension. " +
      "This isolation quality makes it irreplaceable in two specific scenarios: first, as a pre-exhaustion tool before compound leg work to ensure maximum quad recruitment; second, as a finishing movement to drive blood and metabolic stress into the quads at the end of a leg session. The VMO — the teardrop-shaped muscle just above the inner knee — responds particularly well to the top portion of the extension arc, making this machine essential for aesthetic quad development. " +
      "The selectorised weight stack allows precise load selection in small increments, and the adjustable back pad and ankle roller accommodate all leg lengths. Drop sets and high-rep pump sets (15–25 reps) work exceptionally well on this machine to maximise time under tension. At Spark Fitness Zone, the leg extension is paired with the leg curl as part of a balanced leg isolation circuit available to all members.",
    muscleGroups: ["Quads", "Rectus Femoris", "VMO", "Vastus Lateralis"],
    specs: [
      { label: "Resistance Type",    value: "Selectorised weight stack" },
      { label: "Range of Motion",    value: "0–90° knee extension arc" },
      { label: "Back Pad",           value: "Adjustable position" },
      { label: "Ankle Roller",       value: "Adjustable for all leg lengths" },
      { label: "Weight Stack",       value: "Up to 100 kg" },
      { label: "Grade",              value: "Commercial" },
      { label: "Maintenance",        value: "Serviced Weekly" },
    ],
    benefits: [
      "Isolates the quadriceps completely — no glute or hamstring involvement",
      "VMO development at the top of the arc for aesthetic teardrop definition",
      "Precise selectorised loading — ideal for drop sets and progressive overload",
      "Safe for post-ACL rehab and knee strengthening protocols",
      "Excellent pre-exhaust tool before compound leg movements",
    ],
    trainingTips: [
      "For VMO activation, slow down the last 15° of extension and hold at the top for 1–2 seconds",
      "Slightly toe-outward foot position increases VMO activation versus straight-ahead",
      "Drop sets work particularly well — immediately reduce weight by 30% at failure and continue for 6–8 more reps",
      "Do not lock out violently at the top — extend smoothly and control the eccentric for 3 seconds back down",
    ],
    seoTitle:       "Leg Extension Machine Jamshedpur | Quad Isolation Gym — Spark Fitness Zone",
    seoDescription: "Leg extension machine at Spark Fitness Zone Jamshedpur. Isolate quads & build VMO definition. Best leg training gym in Jharkhand. Book free trial.",
    keywords: [
      "leg extension machine Jamshedpur",
      "quad isolation gym Jamshedpur",
      "best gym for quads Jamshedpur",
      "VMO exercise gym Jamshedpur",
      "leg day machine gym Jamshedpur",
      "gym near me legs Jamshedpur",
      "knee rehab gym Jamshedpur",
      "gym Mango Jamshedpur legs",
      "strength training gym Jharkhand",
      "bodybuilding gym Jamshedpur",
      "Spark Fitness Zone leg machine",
      "best gym Jamshedpur",
    ],
  },
  {
    slug:     "chest-press-flat",
    name:     "Chest Press Flat Machine",
    category: "strength",
    shortDesc:
      "A selectorised flat chest press machine providing a stable pressing arc — ideal for chest hypertrophy, beginners learning pressing mechanics, and heavy drop sets.",
    description:
      "The Flat Chest Press Machine at Spark Fitness Zone delivers the mechanical advantage of a barbell bench press in a guided, joint-friendly format that is accessible to members of every experience level. The fixed pressing arc keeps the bar path consistent rep after rep, eliminating the stabilisation demand that causes technique breakdown under heavy free-weight loads — making it the ideal tool for training chest to true failure without a spotter. " +
      "Unlike the flat barbell bench press, the machine chest press allows the hands to converge slightly at peak extension, producing a partial pec contraction at the top of the movement that free weights cannot replicate. This makes it an effective hypertrophy tool even for advanced lifters when programmed as a heavy compound movement or as a burnout finisher. The selectorised weight stack enables seamless weight changes between sets — critical for rest-pause, drop sets, and mechanical drop set protocols. " +
      "Seat height adjustment aligns the handles with mid-chest level (the sternal head of the pectoralis major) to maximise primary muscle activation and protect the anterior deltoid from unnecessary stress. At Spark Fitness Zone, the flat chest press machine sits in the strength zone alongside the pec fly and cable crossover, enabling complete chest training circuits without moving across the facility. Available to all membership tiers.",
    muscleGroups: ["Chest", "Pectoralis Major", "Anterior Deltoid", "Triceps"],
    specs: [
      { label: "Resistance Type",   value: "Selectorised weight stack" },
      { label: "Press Arc",         value: "Flat / horizontal" },
      { label: "Seat Adjustment",   value: "Height-adjustable, multiple positions" },
      { label: "Grip",              value: "Neutral / pronated dual-position handles" },
      { label: "Weight Stack",      value: "Up to 120 kg" },
      { label: "Grade",             value: "Commercial" },
      { label: "Maintenance",       value: "Serviced Weekly" },
    ],
    benefits: [
      "Train chest to true failure without a spotter — safety built in",
      "Consistent pressing arc eliminates technique breakdown under heavy loads",
      "Slight hand convergence at top produces pec contraction free weights cannot match",
      "Selectorised stack enables instant weight changes for drop sets",
      "Adjustable seat ensures correct alignment for all body types",
    ],
    trainingTips: [
      "Set seat height so handles are at mid-chest (nipple line) — too high shifts load to shoulders",
      "Drive the handles together at full extension to maximise pec contraction rather than just locking out elbows",
      "For a mechanical drop set: heavy load for 6 reps, immediately shift grip to neutral handles, continue for 6 more reps",
      "Slow down the eccentric (return) to 3 seconds to maximise time under tension in the stretched position",
    ],
    seoTitle:       "Chest Press Machine Gym in Jamshedpur | Best Chest Workout — Spark Fitness Zone",
    seoDescription: "Flat chest press machine at Spark Fitness Zone Jamshedpur. 120 kg stack, guided arc — train chest to failure solo. Premier gym in Jharkhand. Book now.",
    keywords: [
      "chest press machine Jamshedpur",
      "best chest gym Jamshedpur",
      "flat bench press gym Jamshedpur",
      "chest workout gym Jamshedpur",
      "pectoral machine gym Jamshedpur",
      "gym near me chest day Jamshedpur",
      "push day gym Jamshedpur",
      "gym Mango Jamshedpur chest",
      "bodybuilding gym Jharkhand",
      "muscle building gym Jamshedpur",
      "Spark Fitness Zone chest zone",
      "best gym in Jamshedpur",
    ],
  },
  {
    slug:     "ab-crunches",
    name:     "Ab Crunches Machine",
    category: "strength",
    shortDesc:
      "A dedicated abdominal crunch machine with selectorised resistance — isolates the rectus abdominis with controlled spinal flexion for targeted core development.",
    description:
      "The Ab Crunches Machine at Spark Fitness Zone provides the most direct and effective overloaded resistance training for the rectus abdominis — the muscle responsible for the defined, visible six-pack aesthetic. Unlike floor crunches or sit-ups, the machine applies constant selectorised resistance throughout the entire spinal flexion arc, making it possible to progressively overload the abs just like any other muscle group. " +
      "The pivot design guides the torso through a fixed spinal flexion arc, preventing hip flexors from taking over — the most common fault in floor-based ab work. This isolation quality means every repetition produces direct stimulus to the rectus abdominis and the obliques (which assist through spinal rotation), with zero lower back stress. The padded arm rests and head support ensure correct positioning from the first rep to the last. " +
      "Visible abdominal development requires two things: low enough body fat percentage for the muscle to be visible, and sufficient muscle size and thickness to create definition. The Ab Crunches Machine addresses the second factor directly — progressive loading over 8–12 weeks builds genuine ab muscle thickness that becomes increasingly visible as body composition improves through the fat loss programmes at Spark Fitness Zone. " +
      "Recommended as the final movement in any training session — 3–4 sets of 15–20 reps with a 2-second squeeze at peak contraction. Increasing the weight stack by 5 kg every 2–3 weeks ensures consistent progressive overload.",
    muscleGroups: ["Rectus Abdominis", "Obliques", "Core"],
    specs: [
      { label: "Resistance Type",   value: "Selectorised weight stack" },
      { label: "Movement Arc",      value: "Spinal flexion (crunch pattern)" },
      { label: "Arm Rests",         value: "Padded, adjustable" },
      { label: "Head Support",      value: "Built-in padded support" },
      { label: "Weight Stack",      value: "Up to 80 kg" },
      { label: "Grade",             value: "Commercial" },
      { label: "Maintenance",       value: "Serviced Weekly" },
    ],
    benefits: [
      "Progressive overload for abs — builds genuine muscle thickness, not just endurance",
      "Eliminates hip flexor dominance common in floor crunches",
      "Constant selectorised resistance throughout the full flexion arc",
      "Zero lower back stress — safe daily use for all fitness levels",
      "Builds the rectus abdominis thickness that creates visible six-pack definition",
    ],
    trainingTips: [
      "Breathe out and squeeze hard at the peak of each crunch — hold for 1–2 seconds before releasing",
      "Do not rush the eccentric (return) — control it for 3 seconds to maximise time under tension",
      "Increase the weight stack by 5 kg when you can complete 20 clean reps with a 2-second squeeze",
      "Superset with the pec fly or leg extension as a finisher — no rest needed between movements",
    ],
    seoTitle:       "Ab Machine & Core Gym Jamshedpur | Six-Pack Training — Spark Fitness Zone",
    seoDescription: "Ab crunches machine at Spark Fitness Zone Jamshedpur. Progressive overload for core & visible abs. Best abs gym in Jharkhand. Book a free trial.",
    keywords: [
      "ab machine gym Jamshedpur",
      "six pack gym Jamshedpur",
      "core workout gym Jamshedpur",
      "best abs gym Jamshedpur",
      "abdominal training Jamshedpur",
      "gym near me core workout Jamshedpur",
      "ab crunches machine Jamshedpur",
      "gym Mango Jamshedpur abs",
      "core strength gym Jharkhand",
      "fat loss gym Jamshedpur abs",
      "Spark Fitness Zone core training",
      "best gym in Jamshedpur",
    ],
  },
  {
    slug:     "air-bike",
    name:     "Air Bike",
    category: "cardio",
    shortDesc:
      "A fan-resistance upright stationary bike delivering smooth, self-regulating cardio — ideal for steady-state Zone 2 training and interval conditioning.",
    description:
      "The Air Bike at Spark Fitness Zone is a commercial-grade fan resistance stationary cycle designed for a broad spectrum of cardiovascular training — from low-intensity Zone 2 aerobic sessions to high-intensity interval conditioning. Like all air-resistance equipment, the fan blade generates resistance in direct proportion to how hard you pedal: the faster you go, the more resistance is created. This means the bike automatically adapts to every fitness level without manual adjustment. " +
      "The upright seating position provides a natural, comfortable cycling geometry that most members find intuitive from the first session. The large fan blade moves enough air to keep you cool during extended sessions, reducing perceived exertion during longer aerobic work. The console tracks RPM, calories, time, and distance in real time — giving you the data you need for structured heart rate zone training. " +
      "At Spark Fitness Zone, the Air Bike is used as both a warm-up tool (5–10 minutes of easy spinning before resistance training) and as a primary cardio machine for fat loss programming. Its low-impact nature makes it particularly suitable for members with knee, hip, or ankle sensitivities who cannot run on the treadmill at higher intensities. For Zone 2 aerobic base building — the cornerstone of long-term cardiovascular health — the Air Bike is one of the most comfortable and effective options in the cardio zone.",
    muscleGroups: ["Cardiovascular", "Quads", "Hamstrings", "Glutes", "Calves"],
    specs: [
      { label: "Resistance Type",    value: "Air (fan-based, self-regulating)" },
      { label: "Seating Position",   value: "Upright" },
      { label: "Console Metrics",    value: "RPM, Calories, Time, Distance" },
      { label: "Drive",              value: "Pedal-only" },
      { label: "Power Source",       value: "Self-powered (no electricity for resistance)" },
      { label: "Frame",              value: "Heavy-gauge steel, commercial grade" },
      { label: "Max User Weight",    value: "130 kg" },
    ],
    benefits: [
      "Self-regulating resistance adapts to every fitness level automatically",
      "Low-impact — zero stress on knees, hips, and ankles",
      "Ideal for Zone 2 aerobic base building and fat-burning sessions",
      "Natural cooling from fan airflow reduces perceived effort during long sessions",
      "Effective warm-up tool — brings the body to working temperature in 5 minutes",
    ],
    trainingTips: [
      "For Zone 2 aerobic training, maintain a pace where you can hold a conversation — typically 60–70% of your max heart rate",
      "20-minute sessions at moderate steady-state intensity burn significant calories while remaining easy to recover from",
      "Use as a warm-up at low resistance (easy spin) for 5 minutes before any resistance training session",
      "For interval work, alternate 30 seconds of hard effort with 90 seconds of easy pedalling for 15–20 minutes",
    ],
    seoTitle:       "Air Bike Cardio Gym Jamshedpur | Zone 2 & Fat Loss Training — Spark Fitness Zone",
    seoDescription: "Air bike at Spark Fitness Zone Jamshedpur — self-regulating cardio for Zone 2 & fat loss. Best cardio gym in Mango, Jamshedpur. Book free trial.",
    keywords: [
      "air bike gym Jamshedpur",
      "stationary bike gym Jamshedpur",
      "Zone 2 training gym Jamshedpur",
      "low impact cardio gym Jamshedpur",
      "fat loss cardio gym Jamshedpur",
      "best cardio gym Jamshedpur",
      "gym near me cardio Jamshedpur",
      "cycling gym Mango Jamshedpur",
      "cardio machines gym Jharkhand",
      "weight loss gym Jamshedpur",
      "Spark Fitness Zone air bike",
      "best gym Jharkhand",
    ],
  },
  {
    slug:     "stairmaster",
    name:     "StairMaster",
    category: "cardio",
    shortDesc:
      "A commercial stair-climbing machine that simulates continuous step climbing — delivering intense lower body cardio with superior glute and quad activation versus the treadmill.",
    description:
      "The StairMaster at Spark Fitness Zone is one of the most effective cardio machines for simultaneous fat loss and lower body conditioning. Unlike the treadmill or bike, stair climbing places the body in a hip-flexed position that directly loads the glutes and quads through a functional range of motion — producing both a cardiovascular stimulus and meaningful muscular work in the same session. This dual-effect makes it the preferred cardio tool for members focused on body recomposition. " +
      "The revolving staircase design forces continuous, rhythmic step climbing at a pace you control — from a slow, deliberate 26 steps per minute for Zone 2 fat-burning work up to an aggressive 160+ steps per minute for high-intensity conditioning. The self-powered rotating steps never allow momentum or coasting, meaning every step requires active muscular effort. Grip the side rails lightly for balance only — leaning heavily reduces glute activation by up to 40% and shifts load to the arms. " +
      "At Spark Fitness Zone, the StairMaster is heavily used in both the fat loss programme and the lower body development circuits. Fifteen minutes on the StairMaster at moderate intensity burns more calories than an equivalent treadmill walk, and produces significantly more glute and hamstring activation. For members who want to develop the glutes while maintaining cardiovascular fitness, it is the single best machine in the cardio zone.",
    muscleGroups: ["Glutes", "Quads", "Hamstrings", "Calves", "Cardiovascular", "Core"],
    specs: [
      { label: "Step Type",          value: "Revolving staircase" },
      { label: "Step Speed Range",   value: "26–162 steps per minute" },
      { label: "Resistance Levels",  value: "1–20 (motorised)" },
      { label: "Console Metrics",    value: "Steps, Floors, Calories, Heart Rate, Time" },
      { label: "Heart Rate Monitor", value: "Contact grips + chest strap compatible" },
      { label: "Grade",              value: "Commercial" },
      { label: "Maintenance",        value: "Serviced Weekly" },
    ],
    benefits: [
      "Burns more calories per minute than treadmill walking at equivalent effort",
      "Superior glute and quad activation versus flat cardio machines",
      "Functional stair-climbing motion transfers directly to everyday movement",
      "Zone 2 fat-burning: sustain conversation pace for 20–40 min to maximise fat oxidation",
      "Builds lower body endurance and muscular conditioning simultaneously",
    ],
    trainingTips: [
      "Do NOT lean on the rails — light fingertip contact only. Leaning reduces glute activation by up to 40%",
      "For glute emphasis, take larger, slower steps (one stair at a time, deliberate pace) rather than fast, shallow steps",
      "Start at level 6–8 for your first session — the StairMaster is harder than it looks",
      "Intervals: 60 seconds at level 14–16, 60 seconds at level 6 recovery × 10 rounds for maximum EPOC calorie burn",
    ],
    seoTitle:       "StairMaster Gym in Jamshedpur | Best Cardio for Glutes & Fat Loss — Spark Fitness Zone",
    seoDescription: "StairMaster at Spark Fitness Zone Jamshedpur — best cardio for glutes & fat loss. Burns more than a treadmill. Jharkhand's top gym. Book free trial.",
    keywords: [
      "stairmaster gym Jamshedpur",
      "stair climber gym Jamshedpur",
      "best gym for glutes Jamshedpur",
      "glute cardio gym Jamshedpur",
      "fat loss gym Jamshedpur stairmaster",
      "best cardio gym Jamshedpur",
      "gym near me Jamshedpur cardio",
      "gym Mango Jamshedpur stairmaster",
      "weight loss gym Jharkhand",
      "calorie burning gym Jamshedpur",
      "Spark Fitness Zone cardio zone",
      "top gym Jharkhand",
    ],
  },
  {
    slug:     "pullup-dips",
    name:     "Pull-up & Dips Machine",
    category: "strength",
    shortDesc:
      "An assisted pull-up and dips station with counterbalanced weight assistance — enabling every member to train pull-ups and tricep dips at the correct intensity regardless of bodyweight.",
    description:
      "The Pull-up and Dips Machine at Spark Fitness Zone is a counterbalanced assistance station that makes two of the most effective upper body exercises — the pull-up and the parallel bar dip — accessible to members at every strength level. A selectorised weight stack provides upward assistance through a knee pad: the more weight you select, the lighter the effective load you pull or push. This means a member who cannot yet perform a single unassisted pull-up can still train the full movement pattern through the correct range of motion, building the exact strength needed to eventually go unassisted. " +
      "Pull-ups are widely considered the best back width exercise available — they recruit the lats, rhomboids, teres major, and rear deltoids through a full overhead pulling arc that no cable or machine can fully replicate. The wide-grip variant emphasises lat width; the neutral-grip (parallel) variant reduces shoulder stress and targets the lower lats more heavily; the supinated underhand grip (chin-up) brings the biceps strongly into the movement. " +
      "Parallel bar dips are equally powerful for lower chest and tricep development — the forward lean angle determines which muscle is targeted most. An upright torso with elbows close isolates the triceps; a forward lean with elbows flared loads the lower chest (sternal head of pectoralis major). For advanced members, the dip station can be used unassisted or with a dipping belt for added load, making this machine useful across beginner to elite levels.",
    muscleGroups: ["Lats", "Rhomboids", "Biceps", "Chest", "Triceps", "Rear Deltoids", "Core"],
    specs: [
      { label: "Type",                value: "Counterbalanced assisted pull-up / dip" },
      { label: "Assistance Stack",    value: "Selectorised (5–80 kg assistance)" },
      { label: "Pull-up Grips",       value: "Wide overhand, neutral parallel, underhand" },
      { label: "Dip Handles",         value: "Parallel bars, shoulder-width" },
      { label: "Knee Pad",            value: "Height-adjustable" },
      { label: "Frame",               value: "Heavy-gauge steel" },
      { label: "Grade",               value: "Commercial" },
    ],
    benefits: [
      "Makes pull-ups and dips accessible to beginners — train the pattern before the strength is there",
      "Progressive reduction of assistance builds toward full unassisted bodyweight reps",
      "Three grip options target different portions of the back and arms",
      "Dip angle variation shifts load between chest and triceps precisely",
      "Available for unassisted or weighted use — suits every strength level",
    ],
    trainingTips: [
      "Set assistance weight so you reach failure between 6–10 reps — reduce assistance by 5 kg every 2–3 weeks",
      "Full range of motion is critical: start from dead hang (arms fully extended), pull chin above the bar",
      "For tricep dips: keep torso upright and elbows pointing behind you — leaning forward makes it a chest exercise",
      "Once you can do 3×10 with zero assistance, add a dipping belt with 5–10 kg for progressive overload",
    ],
    seoTitle:       "Pull-up & Dips Machine Gym Jamshedpur | Best Upper Body — Spark Fitness Zone",
    seoDescription: "Assisted pull-up & dips machine at Spark Fitness Zone Jamshedpur. Build lats, chest & triceps from beginner to elite. Best gym in Jharkhand. Book.",
    keywords: [
      "pull-up machine gym Jamshedpur",
      "assisted pull-up gym Jamshedpur",
      "dips machine gym Jamshedpur",
      "best upper body gym Jamshedpur",
      "lat workout gym Jamshedpur",
      "back width gym Jamshedpur",
      "tricep dips gym Jamshedpur",
      "gym near me Jamshedpur upper body",
      "gym Mango Jamshedpur pull-up",
      "bodybuilding gym Jharkhand",
      "Spark Fitness Zone strength",
      "best gym in Jamshedpur",
    ],
  },
  {
    slug:     "pec-fly",
    name:     "Pec Fly Machine",
    category: "strength",
    shortDesc:
      "A plate-loaded or selectorised pec deck machine that isolates the chest through a fixed arc, delivering peak contraction at the midpoint for maximum pectoral hypertrophy.",
    description:
      "The Pec Fly Machine at Spark Fitness Zone is a dedicated chest isolation machine engineered to target the pectoralis major with near-zero involvement from the triceps or front deltoids — making it one of the most effective tools for building chest width and thickness when used alongside compound pressing movements. " +
      "Unlike dumbbell flyes, the pec deck maintains constant resistance throughout the entire range of motion, delivering maximum tension at the fully contracted midpoint position where free weights go slack. This sustained tension through peak contraction is a primary driver of muscle hypertrophy and the reason the pec fly remains a staple in bodybuilding programmes at every level. " +
      "The adjustable seat height ensures correct alignment of the shoulder joint with the machine's pivot axis — essential for reducing rotator cuff stress and isolating the chest rather than the anterior deltoid. The padded arm rests allow for both forearm-pad and handle-grip variations, enabling you to shift emphasis between the sternal (lower/middle) and clavicular (upper) heads of the pectoralis major. " +
      "Recommended as a finishing movement after compound pressing (bench press or machine press), the pec fly is particularly effective for achieving a deep muscle pump and establishing the mind-muscle connection that translates to better recruitment during heavy compound lifts. Three to four sets of 12–15 reps at moderate load, with a two-second squeeze at midpoint, produces optimal hypertrophic stimulus.",
    muscleGroups: ["Chest", "Pectoralis Major", "Anterior Deltoid", "Serratus Anterior"],
    specs: [
      { label: "Resistance Type",   value: "Selectorised weight stack" },
      { label: "Range of Motion",   value: "180° arc, adjustable start angle" },
      { label: "Seat Adjustment",   value: "Height-adjustable, 6 positions" },
      { label: "Arm Attachment",    value: "Forearm pad + handle grip options" },
      { label: "Weight Stack",      value: "Up to 80 kg" },
      { label: "Frame",             value: "Heavy-gauge steel, commercial grade" },
    ],
    benefits: [
      "Constant tension through full range of motion — no slack at peak contraction",
      "Eliminates tricep involvement, forcing the chest to work in complete isolation",
      "Safe shoulder-friendly arc reduces rotator cuff stress versus free-weight flyes",
      "Ideal finishing movement to achieve maximum chest pump and mind-muscle connection",
      "Adjustable alignment accommodates all body types for correct joint tracking",
    ],
    trainingTips: [
      "Set the seat so your elbows align with the machine's pivot point — incorrect height shifts load onto the shoulders",
      "Use a two-second squeeze at the midpoint (fully closed position) to maximise time under tension",
      "Do not let the pads fly back uncontrolled — use a 3-second eccentric (opening) for maximum hypertrophic benefit",
      "Keep your back flat against the pad throughout — arching the lower back reduces chest activation",
      "Superset with flat or incline machine press for a complete chest finisher at the end of push day",
    ],
    seoTitle:       "Pec Fly Machine Jamshedpur | Best Chest Isolation Gym — Spark Fitness Zone",
    seoDescription: "Pec deck machine at Spark Fitness Zone Jamshedpur. Constant-tension chest isolation for maximum pectoral hypertrophy. Best gym in Jharkhand. Book.",
    keywords: [
      "pec fly machine Jamshedpur",
      "pec deck gym Jamshedpur",
      "best chest isolation gym Jamshedpur",
      "chest fly machine Jamshedpur",
      "pectoral workout gym Jamshedpur",
      "chest gym near me Jamshedpur",
      "push day gym Jamshedpur",
      "gym Mango Jamshedpur chest",
      "bodybuilding gym Jharkhand",
      "muscle building gym Jamshedpur",
      "Spark Fitness Zone chest machine",
      "best gym in Jamshedpur",
    ],
  },
];

// ── Lookup helpers ─────────────────────────────────────────────────────────────

export function getEquipmentBySlug(slug: string): StaticEquipment | undefined {
  return STATIC_EQUIPMENT.find((e) => e.slug === slug);
}

export function getRelatedEquipment(currentSlug: string, limit = 3): StaticEquipment[] {
  const current = getEquipmentBySlug(currentSlug);
  if (!current) return STATIC_EQUIPMENT.slice(0, limit);

  // Same category first, then fill from others
  const sameCategory = STATIC_EQUIPMENT.filter(
    (e) => e.slug !== currentSlug && e.category === current.category
  );
  const others = STATIC_EQUIPMENT.filter(
    (e) => e.slug !== currentSlug && e.category !== current.category
  );

  return [...sameCategory, ...others].slice(0, limit);
}

export function getAllSlugs(): string[] {
  return STATIC_EQUIPMENT.map((e) => e.slug);
}

// Local images for equipment that has a photo in /public/assets/equipments/
export const EQUIPMENT_LOCAL_IMAGES: Record<string, string> = {
  "smith-machine":       "/assets/equipments/smith_machine.png",
  "technogym-treadmill": "/assets/equipments/treadmill.png",
  "leg-press-machine":   "/assets/equipments/ledg_press.png",
  "assault-bike":        "/assets/equipments/assault_bike.png",
  "leg-extension":       "/assets/equipments/leg_extension.png",
  "chest-press-flat":    "/assets/equipments/chest_press_flat.png",
  "ab-crunches":         "/assets/equipments/ab_crunches.png",
  "air-bike":            "/assets/equipments/air_bike.png",
  "pec-fly":             "/assets/equipments/pec_fly.png",
  "cable-crossover":     "/assets/equipments/cable_cross.png",
  "stairmaster":         "/assets/equipments/stairmaster.png",
  "pullup-dips":         "/assets/equipments/pullup_dips_machine.png",
  "rowing-machine":      "/assets/equipments/rowing_machine.png",
};
