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
    seoTitle:       "Smith Machine | Spark Fitness Zone Gym, Jamshedpur",
    seoDescription: "Train on a commercial Smith Machine at Spark Fitness Zone, Jamshedpur's premier gym. Safe solo squats, bench press & 20+ exercises. Book a free trial.",
    keywords: [
      "Smith Machine Jamshedpur",
      "guided barbell gym Jamshedpur",
      "Smith Machine squat Jamshedpur",
      "strength training gym Jamshedpur",
      "safe bench press Jamshedpur",
      "Spark Fitness Zone equipment",
      "gym Mango Jamshedpur",
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
    seoTitle:       "Cable Crossover Machine | Spark Fitness Zone Gym, Jamshedpur",
    seoDescription: "Cable Crossover tower at Spark Fitness Zone Jamshedpur. Dual 100kg stacks, fully adjustable pulleys, 40+ exercise variations. Book a free trial today.",
    keywords: [
      "cable crossover gym Jamshedpur",
      "cable machine Jamshedpur",
      "cable fly chest workout Jamshedpur",
      "strength training Jamshedpur",
      "Spark Fitness Zone cable tower",
      "gym equipment Jamshedpur",
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
    seoTitle:       "Technogym Treadmill | Cardio Zone, Spark Fitness Zone Jamshedpur",
    seoDescription: "Commercial Technogym treadmills at Spark Fitness Zone Jamshedpur. 22 km/h, 15% incline, heart rate monitoring. Jamshedpur's best cardio gym. Book free trial.",
    keywords: [
      "Technogym treadmill Jamshedpur",
      "best treadmill gym Jamshedpur",
      "cardio gym Jamshedpur",
      "running machine Jamshedpur",
      "fat loss gym Jamshedpur",
      "Spark Fitness Zone cardio",
      "gym Mango Chepapul Jamshedpur",
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
    seoTitle:       "Leg Press Machine | Spark Fitness Zone Gym, Jamshedpur",
    seoDescription: "45-degree leg press with 400 kg capacity at Spark Fitness Zone Jamshedpur. Best leg day machine in Jharkhand. Book a free trial today.",
    keywords: [
      "leg press machine Jamshedpur",
      "leg day gym Jamshedpur",
      "quad workout machine Jamshedpur",
      "lower body strength Jamshedpur",
      "Spark Fitness Zone leg press",
      "gym Jharkhand leg training",
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
    seoTitle:       "Assault Bike | Functional Training Zone, Spark Fitness Zone Jamshedpur",
    seoDescription: "Assault AirBike at Spark Fitness Zone Jamshedpur. Full-body conditioning, HIIT training, unlimited resistance. Jharkhand's top functional gym. Book free trial.",
    keywords: [
      "assault bike HIIT Jamshedpur",
      "air bike gym Jamshedpur",
      "functional training Jamshedpur",
      "HIIT gym Jamshedpur",
      "conditioning workout Jamshedpur",
      "Spark Fitness Zone assault bike",
      "CrossFit gym Jamshedpur",
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
    seoTitle:       "Free Weights — Dumbbell Rack 2–50 kg | Spark Fitness Zone Jamshedpur",
    seoDescription: "Complete dumbbell rack 2–50 kg at Spark Fitness Zone Jamshedpur. Full free weights zone, benches, mirrors. Best free weights gym in Jharkhand. Book free trial.",
    keywords: [
      "dumbbell rack Jamshedpur",
      "free weights gym Jamshedpur",
      "weight training Jamshedpur",
      "best gym free weights Jharkhand",
      "dumbbell exercises Jamshedpur",
      "Spark Fitness Zone dumbbells",
      "gym Mango Jamshedpur",
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
    seoTitle:       "Concept2 Rowing Machine | Cardio Zone, Spark Fitness Zone Jamshedpur",
    seoDescription: "Concept2 RowErg rowing machine at Spark Fitness Zone Jamshedpur. Olympic-grade cardio, full-body low-impact workout. Book a free trial at Jamshedpur's best gym.",
    keywords: [
      "Concept2 rowing machine Jamshedpur",
      "rowing machine gym Jamshedpur",
      "cardio machines Jamshedpur",
      "low impact cardio gym Jamshedpur",
      "RowErg Jamshedpur",
      "Spark Fitness Zone rowing",
      "gym Jharkhand cardio",
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
    seoTitle:       "T-Bar Row Machine | Spark Fitness Zone Gym, Jamshedpur",
    seoDescription: "T-Bar Row station at Spark Fitness Zone Jamshedpur. Build back thickness and V-taper with chest-supported and standing variants. Book a free trial today.",
    keywords: [
      "T-bar row machine Jamshedpur",
      "back exercise gym Jamshedpur",
      "lat workout Jamshedpur",
      "back training gym Jharkhand",
      "bodybuilding gym Jamshedpur",
      "Spark Fitness Zone back training",
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
    seoTitle:       "Battle Ropes & Sled — Functional Training | Spark Fitness Zone Jamshedpur",
    seoDescription: "Functional training turf with battle ropes, sled, plyometric boxes at Spark Fitness Zone Jamshedpur. Jharkhand's best HIIT and athletic training facility.",
    keywords: [
      "battle ropes gym Jamshedpur",
      "functional training Jamshedpur",
      "HIIT training gym Jamshedpur",
      "sled push gym Jamshedpur",
      "athletic training Jamshedpur",
      "plyometric boxes gym Jharkhand",
      "Spark Fitness Zone functional zone",
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
