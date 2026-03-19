export type TipCategory = "vessel" | "terrain" | "lore" | "egg";

export interface Tip {
  text: string;
  category: TipCategory;
}

export const DESTINATION_TIPS: Record<string, Tip[]> = {
  mun: [
    { category: "terrain", text: "No atmosphere — parachutes are useless. Budget full propulsive delta-v for landing and ascent." },
    { category: "terrain", text: "Crater walls are steeper than they look from orbit. Land on flat crater floors, not rims." },
    { category: "vessel",  text: "20 named biomes make the Mun an excellent science farm. A single lander with fuel for 3–4 short hops can cover most of them." },
    { category: "egg",     text: "Three natural rock arches exist on the surface — fly under them for the best screenshot in the game." },
    { category: "egg",     text: "A memorial to Neil Armstrong is located at 0°42'N 22°44'E, added shortly after his death in 2012." },
    { category: "egg",     text: "Three Munoliths (monoliths) are scattered across the surface. Use KerbNet from orbit and watch for '?' markers to locate them." },
  ],

  minmus: [
    { category: "terrain", text: "Switch your navball to Surface mode before landing — the default Orbital speed can fool you into touching down with sideways velocity." },
    { category: "terrain", text: "Gravity is so low (~0.05 m/s²) that a Kerbal on EVA jetpack can reach orbit unaided. Don't let your crew bounce off into space." },
    { category: "vessel",  text: "Even a tiny lander with a single LV-909 is over-engineered for Minmus. Don't over-build." },
    { category: "terrain", text: "The flat frozen 'lakes' are far easier landing zones than the mountain ranges — aim for them." },
    { category: "lore",    text: "Nicknamed the 'mint ice cream moon' for its pale green color. Kerbals apparently find it delicious-looking." },
    { category: "egg",     text: "A monolith on a circular dais surrounded by six glowing crystal pillars sits at approximately 23°46'N, 60°02'E." },
  ],

  moho: [
    { category: "vessel",  text: "Budget 10,000+ m/s for a round trip from LKO. Moho is one of KSP's three 'boss' destinations alongside Eve and Tylo." },
    { category: "vessel",  text: "Do NOT use nuclear or ion engines for orbital insertion. The capture burn is 3,000–4,000 m/s and must be completed quickly — use high-thrust chemical engines." },
    { category: "vessel",  text: "Moho's inclination and eccentricity mean actual capture ΔV almost always exceeds what maps suggest. Budget generously." },
    { category: "terrain", text: "No atmosphere — all braking is propulsive. ~1,050 m/s from 100 km orbit to land." },
    { category: "egg",     text: "The 'Mohole' sits at the geographic north pole — a ~4.6 km deep vertical shaft with ~80° walls. Any craft entering it is almost certainly destroyed." },
    { category: "lore",    text: "The Mohole references the real-world Project Mohole, a 1960s attempt to drill through Earth's crust to the mantle." },
  ],

  eve: [
    { category: "vessel",  text: "Escaping from sea level requires ~11,200 m/s due to 1.7g gravity and a 5-atmosphere-thick atmosphere. Eve return is considered the hardest mission in stock KSP." },
    { category: "vessel",  text: "Use the aerospike engine for ascent — it performs well across Eve's extreme pressure range and produces less drag than bell engines." },
    { category: "vessel",  text: "Strip everything before launch: chutes, landing legs, science gear, struts, antennas. Every protrusion adds crippling drag in the thick atmosphere." },
    { category: "vessel",  text: "Landing at high altitude (peaks reach ~8 km) dramatically cuts ascent ΔV. A rover to drive to a high launch site is worth considering." },
    { category: "vessel",  text: "Use Apollo-style architecture: leave return fuel in Eve orbit. Only the ascent vehicle goes to the surface." },
    { category: "terrain", text: "Eve has purple liquid oceans — splashing down is survivable, but you cannot launch from them." },
    { category: "lore",    text: "Eve is KSP's Venus analog. Its oceans are vivid purple and the sky is pinkish-violet from the surface — one of the most visually stunning planets in the game." },
  ],

  gilly: [
    { category: "vessel",  text: "Gravity is ~0.049 m/s² — the lowest in the Kerbol system. RCS thrusters alone can land and launch a small craft." },
    { category: "vessel",  text: "Some players use the Klaw (asteroid capture claw) to grip the surface instead of landing legs, eliminating tip-over risk entirely." },
    { category: "terrain", text: "After touchdown, craft will slowly bounce and drift for a very long time. Use RCS to thrust downward to stay planted." },
    { category: "terrain", text: "A Kerbal jumping on EVA can escape Gilly's sphere of influence entirely — use the jetpack very sparingly." },
    { category: "lore",    text: "Believed to be a captured asteroid. Its dark coloration comes from high solid carbon content." },
    { category: "egg",     text: "The legendary 'Magic Boulder' — a glowing green asteroid that caused ships to spontaneously explode — once orbited here and was later removed by the developers." },
  ],

  duna: [
    { category: "vessel",  text: "Duna's atmosphere is ~1/10th as dense as Kerbin's. Parachutes alone cannot land most craft — you need drogue chutes plus retro-rockets for the final touchdown." },
    { category: "vessel",  text: "You need ~3× more parachute canopy than on Kerbin. Lower the minimum deployment pressure in the VAB — the default is calibrated for Kerbin." },
    { category: "vessel",  text: "Repack your parachutes on the surface before return. A Level 1 Engineer must EVA and right-click the chute." },
    { category: "terrain", text: "If you enter the atmosphere faster than ~1,000 m/s, chutes open too close to the ground to fully arrest your speed. Come in shallow." },
    { category: "lore",    text: "Duna is KSP's Mars — red surface, thin CO₂ atmosphere, polar ice caps. Duna and Ike are tidally locked, always facing each other." },
    { category: "egg",     text: "The 'Face on Duna' parodies the real Face on Mars (~17°03'N, 85°27'W). A pyramid nearby bears a Kerbal parody of Shelley's Ozymandias." },
    { category: "egg",     text: "A Curiosity rover camera mast easter egg sits at approximately 30°20'S, 28°48'W." },
  ],

  ike: [
    { category: "vessel",  text: "No atmosphere — all landing and ascent is propulsive, similar to the Mun but with slightly higher gravity." },
    { category: "terrain", text: "Terrain outside crater floors is treacherous. Aim for the bottom of a flat crater." },
    { category: "terrain", text: "A steep mountain sits right at Ike's north pole. Don't attempt to land on the pole." },
    { category: "lore",    text: "Ike and Duna are tidally locked — from Ike's surface, Duna hangs completely stationary in the sky." },
    { category: "egg",     text: "A 'Fallen Meteorite' anomaly is located at approximately -11.38°, 27.31°." },
    { category: "egg",     text: "The legendary 'Magic Boulder' — a glowing green asteroid with a Monolith on it that caused ships to explode — originally orbited Ike at 15 km altitude before being removed." },
  ],

  dres: [
    { category: "vessel",  text: "No atmosphere. Orbital inclination (~5°) and distance mean a meaningful capture burn — plan for ~1,600–1,900 m/s from Kerbin departure." },
    { category: "terrain", text: "A massive canyon system runs just south of the equator. Stunning to visit, but tricky to land inside." },
    { category: "lore",    text: "'Dres does not exist' is one of KSP's most enduring community memes — Dres is so often ignored the community jokes it was never added." },
    { category: "lore",    text: "KSP's analog to Ceres, orbiting in a belt of 'Drestroids' between Duna and Jool." },
    { category: "egg",     text: "Elon Musk's Tesla Roadster (referencing the real Falcon Heavy launch payload) is located on the surface at approximately 1.956°, 64.138°." },
  ],

  jool: [
    { category: "vessel",  text: "Jool is a gas giant with no solid surface. Any craft that reaches the 'bottom' is instantly destroyed — no exceptions." },
    { category: "vessel",  text: "Aerobraking is possible but unforgiving. Keep your periapsis in the upper atmosphere (100 km or above) — going just 5 km too deep at interplanetary speed means destruction." },
    { category: "lore",    text: "The game's science log for 'landing on Jool's surface' reads: 'You're not sure how you even landed on the surface of a gas giant. But it's probably best not to think about it for too long.'" },
    { category: "vessel",  text: "A Tylo or Laythe gravity assist can capture you into Jool orbit for literally 0 m/s ΔV if timed correctly." },
  ],

  laythe: [
    { category: "vessel",  text: "Laythe has an oxygen atmosphere — air-breathing jet engines work here. A spaceplane or VTOL jet design cuts fuel needs dramatically." },
    { category: "vessel",  text: "The surface is mostly deep ocean. Design for the possibility of a water landing if you miss an island." },
    { category: "terrain", text: "Laythe has very little actual land. Precisely targeting a small island with a heavy lander is genuinely difficult — consider a wide landing strut footprint." },
    { category: "terrain", text: "Even 'flat' Laythe islands are covered with steep sand dunes. A top-heavy lander can only tolerate a 10–15° slope before tipping." },
    { category: "lore",    text: "The only moon in the Kerbol system with an atmosphere and liquid surface water. Kerbals can remove their helmets on the surface." },
    { category: "lore",    text: "Two of Laythe's biomes are named for real scientists: the Sagan Sea (Carl Sagan) and the Degrasse Sea (Neil deGrasse Tyson)." },
    { category: "egg",     text: "An 'Ancient Waterfowl Skeleton' anomaly is located at latitude 0.073°, longitude -162.527°." },
  ],

  tylo: [
    { category: "vessel",  text: "Tylo is considered the hardest landing in KSP — Kerbin-scale gravity with absolutely no atmosphere. Every m/s of braking is propulsive." },
    { category: "vessel",  text: "Budget at least 3,000 m/s for landing and another 3,000 m/s for ascent. A total lander ΔV of 7–8 km/s is comfortable." },
    { category: "vessel",  text: "Minimum surface TWR of ~1.2, target 1.5+. Clustered Spark engines are a popular and effective choice." },
    { category: "vessel",  text: "Practical rule of thumb: if your lander can take off and land on Kerbin without parachutes, it can handle Tylo." },
    { category: "terrain", text: "Do NOT bring your return fuel down to the surface. Leave it in orbit." },
    { category: "lore",    text: "Tylo's massive sphere of influence makes accidental encounters a constant hazard when navigating the Jool system." },
    { category: "egg",     text: "A giant cave-like underground formation exists at approximately 40°11'N, 174°00'E — its appearance varies with terrain quality settings." },
  ],

  vall: [
    { category: "vessel",  text: "No atmosphere — purely propulsive. Gravity sits between Mun and Duna. Bring meaningfully more ΔV than a Mun mission." },
    { category: "terrain", text: "The entire surface is covered with chiseled-ice ridges. Almost no flat areas — target the darker low-elevation ice basins for the flattest spots." },
    { category: "terrain", text: "Mountain ridges reach nearly 8,000 m. Check your orbital altitude before assuming a low periapsis is safe." },
    { category: "lore",    text: "KSP's analog to Europa — an ice-covered moon with eroded ridges suggesting cryovolcanic geological activity." },
    { category: "lore",    text: "Community joke: 'ALL THESE WORLDS ARE YOURS EXCEPT VALL. ATTEMPT NO LANDING THERE.' — a parody of the film 2010." },
    { category: "egg",     text: "'Vallhenge' — a Stonehenge-like ring of stone pillars and pyramids — is at 60°05'S, 83°46'E. One of the most spectacular easter eggs in the game." },
  ],

  bop: [
    { category: "vessel",  text: "Bop's gravity is tiny — a very small rocket can land and return, making it the easiest Jool moon to visit." },
    { category: "terrain", text: "Bop has surprisingly tall mountains for its size. Stay above 10 km until you have a confirmed flat landing zone." },
    { category: "lore",    text: "Believed to be a captured asteroid. Along with Pol, it's an ideal ISRU refueling stop in the Jool system — low gravity means cheap launches." },
    { category: "egg",     text: "The Dead Deep Space Kraken — a massive 6-tentacled green creature with three orange eyes — sits at 68°41'N, 117°00'E. Large enough to spot as a dot from 30 km altitude." },
    { category: "egg",     text: "The Kraken was placed as a tribute to the old 'Space Kraken' physics bug that would tear ships apart far from Kerbin. 'The Kraken merely sleeps.'" },
    { category: "egg",     text: "Kerbals can walk through the Kraken's tentacles — they have no collision mesh." },
  ],

  pol: [
    { category: "vessel",  text: "Second-lowest gravity in the Jool system (after Bop). A single small engine with modest fuel is all you need." },
    { category: "terrain", text: "Pol's yellowish 'pollen-grain' surface is jagged and irregular with very few flat spots — scout a crater floor before committing to a burn." },
    { category: "lore",    text: "Named and shaped after a grain of pollen. Along with Bop, the ideal ISRU base for the Jool system." },
    { category: "vessel",  text: "Getting a Pol encounter can be frustrating — some players report spending 4,000+ m/s extra trying to match orbits. Use the other Jool moons for gravity assists." },
  ],

  eeloo: [
    { category: "vessel",  text: "So far from the sun that solar panels produce only ~4% of Kerbin power at periapsis and ~1.4% at apoapsis. RTGs are essentially mandatory." },
    { category: "vessel",  text: "Surface gravity is similar to the Mun — a Mun lander design is sufficient. The hard part is the interplanetary transit." },
    { category: "terrain", text: "Flat icy plains are forgiving landing zones, but canyon rims can sneak up on you. Scout before committing to a retrograde burn." },
    { category: "lore",    text: "Released as a Christmas gift to the KSP community. KSP's Pluto analog — highly eccentric and inclined orbit that occasionally puts it closer to Kerbol than Jool." },
    { category: "lore",    text: "Originally planned as a moon of an unimplemented second gas giant with active cryovolcanism. That planet was never added to KSP 1." },
    { category: "egg",     text: "A 'Snowman made of rusty rocket parts' is located at 25.9968°N, 110.5918°E — a fitting memorial on the distant icy world." },
  ],

  // ── Outer Planets Mod ─────────────────────────────────────────────────────

  sarnus: [
    { category: "vessel",  text: "Sarnus is a gas giant with no solid surface — any craft descending too deep into the atmosphere will be destroyed. Treat it like Jool." },
    { category: "vessel",  text: "Aerobraking into low Sarnus orbit is possible but demands a robust heat shield. The upper atmosphere is thinner than Jool's — set your periapsis slightly lower than you would at Jool." },
    { category: "vessel",  text: "RTGs are mandatory. Solar panels produce less than 1% of Kerbin output at Sarnus' distance from Kerbol." },
    { category: "lore",    text: "KSP's Saturn analog, complete with a ring system visible from the surfaces of its moons. The rings are particle-based and will not destroy craft passing through them." },
    { category: "lore",    text: "Sarnus has five moons: Hale, Ovok, Eeloo, Slate, and Tekto — a diverse mix of rocky, icy, and atmospheric worlds." },
  ],

  slate: [
    { category: "vessel",  text: "Slate has no atmosphere and ~0.56g surface gravity — comparable to Tylo but slightly easier. All landing and ascent burns are propulsive." },
    { category: "vessel",  text: "Budget at least 1,800 m/s for landing and 1,800 m/s for ascent from low Slate orbit. Leave your return fuel in orbit, Apollo-style." },
    { category: "vessel",  text: "A surface TWR of 1.3+ is recommended. Orbital velocity at 30 km is around 1,800 m/s — similar in scale to the Mun." },
    { category: "terrain", text: "Slate's terrain is heavily cratered with wide flat floors — these are your best landing zones. Avoid crater rims and highlands." },
    { category: "lore",    text: "The largest moon of Sarnus and one of the most scientifically interesting in the outer system. Its slate-grey surface suggests a silicate-rich composition." },
  ],

  tekto: [
    { category: "vessel",  text: "Tekto has a thick nitrogen atmosphere — parachutes work, but jet engines do not (no oxygen). Plan your ascent vehicle around rockets only." },
    { category: "vessel",  text: "The atmosphere is dense enough that a heatshield-equipped probe can aerobrake directly from a Sarnus transfer. Useful for robotic precursor missions." },
    { category: "vessel",  text: "Ascent through Tekto's thick atmosphere creates significant drag. Keep your ascent profile steep and your rocket aerodynamically clean." },
    { category: "terrain", text: "The surface is dotted with liquid hydrocarbon lakes, similar to Titan in the real solar system. Land on solid ground — liquid 'biomes' exist but splashdowns may be unrecoverable." },
    { category: "lore",    text: "KSP's Titan analog. Orange atmospheric haze dominates the sky. Kerbals must keep helmets on — the atmosphere is chemically hostile." },
    { category: "lore",    text: "Tekto is the outermost moon of Sarnus and the only one with a significant atmosphere. Its orange-tinted sky and hydrocarbon seas make it visually one of the most striking worlds in the mod." },
  ],

  ovok: [
    { category: "vessel",  text: "Ovok's gravity is extremely low — small RCS thrusters or a tiny engine is enough to land and return. Avoid overshooting your deorbit burn." },
    { category: "vessel",  text: "Surface gravity of ~0.05g means any unanchored craft will slowly bounce and drift. Thrust downward with RCS to stay planted after touchdown." },
    { category: "terrain", text: "Ovok is distinctly egg-shaped (oblate spheroid) — terrain elevation varies substantially depending on which 'pole' you approach. The flatter equatorial band offers the easiest landings." },
    { category: "lore",    text: "Its unusual shape is caused by the same tidal and accretion forces that govern small irregular bodies. Ovok spins slowly, giving it a noticeable equatorial bulge." },
    { category: "lore",    text: "One of two very small inner moons of Sarnus alongside Hale. Both are likely captured Kuiper Belt-analog objects." },
  ],

  hale: [
    { category: "vessel",  text: "Gravity is essentially zero — you can land with a single RCS thruster burst. The 'landing' is more of a controlled dock with a body." },
    { category: "vessel",  text: "A Kerbal on EVA can easily exceed escape velocity with a single jetpack burst. Do not let crew step outside without anchoring the vessel first." },
    { category: "vessel",  text: "Delta-v from Sarnus orbit to Hale surface and back is under 100 m/s total. This is arguably the cheapest surface in the Kerbol system to access." },
    { category: "terrain", text: "Hale is tiny — so small that line-of-sight to Kerbin is nearly always maintained regardless of landing position. No relay network needed." },
    { category: "lore",    text: "Innermost moon of Sarnus. At such close proximity to the gas giant, Hale skims the outer edge of Sarnus' ring system — spectacular views guaranteed." },
  ],

  "eeloo-opm": [
    { category: "vessel",  text: "Eeloo's surface gravity and ΔV requirements are unchanged from its stock incarnation — a Mun-capable lander with extra range is sufficient." },
    { category: "vessel",  text: "RTGs remain essential. Sarnus is so far from Kerbol that solar output is negligible." },
    { category: "vessel",  text: "Access via Sarnus orbit first — aerobrake at Sarnus, then transfer to Eeloo. This is more efficient than a direct transfer from LKO." },
    { category: "terrain", text: "Flat icy plains dominate the equatorial regions. Avoid canyon rims and the cratered highlands near the poles." },
    { category: "lore",    text: "In OPM lore, Eeloo is a captured icy body — swept inward from the outer reaches and locked into a Sarnus orbit. The same world, a very different journey." },
    { category: "lore",    text: "The 'Snowman' easter egg from stock Eeloo has followed it into the mod, still sitting at 25.9968°N, 110.5918°E." },
  ],

  plock: [
    { category: "vessel",  text: "RTGs are mandatory at Plock's distance. Solar panels are almost completely useless this far from Kerbol." },
    { category: "vessel",  text: "The transfer window is rare and the transit time is extremely long — budget for the communication delay if playing with CommNet. A relay satellite left in Plock orbit helps significantly." },
    { category: "vessel",  text: "Plock-Karen is a binary system — tidal forces mean the two bodies are always face-to-face. Factor in which one you're targeting when planning a capture burn." },
    { category: "terrain", text: "Plock's surface is icy and moderately cratered. Gravity is low enough that a precision landing near a biome boundary is very achievable." },
    { category: "lore",    text: "KSP's Pluto-Charon analog. Plock and Karen orbit a shared barycentre that lies between them — technically, neither body 'orbits' the other." },
    { category: "lore",    text: "Plock occupies an eccentric, highly inclined orbit. At some points in its 'year', it actually comes inside Neidon's orbit — though the inclination difference prevents a collision." },
  ],

  karen: [
    { category: "vessel",  text: "Karen's gravity is very low — the same considerations as Hale or Gilly apply. Gentle approach burns only." },
    { category: "vessel",  text: "Transferring from Plock to Karen costs very little ΔV (~130 m/s total). A single small engine can manage the entire surface mission." },
    { category: "vessel",  text: "Karen and Plock are tidally locked to each other — from Karen's surface, Plock hangs motionless in the sky, filling a large portion of the view." },
    { category: "terrain", text: "The surface is icy and relatively smooth. Gravity is low enough that gentle slope angles are manageable without tipping." },
    { category: "lore",    text: "Named after Charon, Pluto's binary companion — itself named after the mythological ferryman of the dead. Karen is roughly half the size of Plock by diameter." },
    { category: "lore",    text: "The Plock-Karen system is so tidally evolved that both bodies show the same face to each other at all times — a double tidal lock unique in the Kerbol system." },
  ],

  urlum: [
    { category: "vessel",  text: "Urlum is a gas giant with no surface. Its extreme axial tilt (~97°) means its moons have unusual polar orbits relative to the ecliptic." },
    { category: "vessel",  text: "Aerobraking is possible but the upper atmosphere is thin — be more conservative than at Jool. A periapsis of 85–100 km above the 0 km datum is typically safe." },
    { category: "vessel",  text: "RTGs are critical. At Urlum's distance, solar power output is less than 0.5% of Kerbin values." },
    { category: "lore",    text: "KSP's Uranus analog. The extreme axial tilt (98°) means its rings are nearly vertical — a stunning sight when orbiting the equatorial moons." },
    { category: "lore",    text: "Urlum has four moons: Polta, Priax, Wal, and Wal's subsatellite Tal. The system is compact compared to Jool's." },
  ],

  polta: [
    { category: "vessel",  text: "No atmosphere — all landing and ascent is propulsive. Gravity is modest at ~0.2g. A lander similar in scale to a Mun mission works well." },
    { category: "vessel",  text: "Polta and Priax share similar orbits and are often called the 'Urlum twins'. Visiting both in one mission with minimal extra ΔV is very achievable." },
    { category: "terrain", text: "The surface is rocky and cratered but has identifiable flat areas. Normal landing procedures apply." },
    { category: "lore",    text: "Innermost major moon of Urlum. Co-orbital resonance with Priax keeps them in a stable configuration despite their proximity." },
  ],

  priax: [
    { category: "vessel",  text: "No atmosphere, low gravity (~0.15g). Similar in difficulty to Polta — a mid-range lander handles both without redesign." },
    { category: "vessel",  text: "The transfer burn from Polta to Priax is minimal — if visiting Urlum's moons, doing Polta and Priax in sequence barely costs extra ΔV." },
    { category: "terrain", text: "Slightly smaller and less spherical than Polta. Rocky terrain with scattered craters — look for crater floors as landing zones." },
    { category: "lore",    text: "Shares an orbital resonance with Polta, keeping them from ever colliding despite orbiting at similar altitudes. An elegant gravitational arrangement." },
  ],

  wal: [
    { category: "vessel",  text: "Wal has ~0.5g surface gravity and no atmosphere — a significant landing challenge at Urlum's distance. Budget at least 2,500 m/s for landing and ascent." },
    { category: "vessel",  text: "Leave your interplanetary stage and return fuel in Urlum orbit, not Wal orbit — saves carrying extra mass all the way to the surface." },
    { category: "vessel",  text: "Wal is large enough that orbital velocity matters. A circular 30 km orbit is around 1,050 m/s — don't let the Urlum transit lull you into underestimating it." },
    { category: "terrain", text: "Wal has a varied terrain with highlands and crater basins. Target the low-lying plains for the flattest landing zones." },
    { category: "lore",    text: "The largest moon of Urlum and one of the most scientifically significant in the outer system. Notable for hosting its own subsatellite, Tal — a moon of a moon." },
  ],

  tal: [
    { category: "vessel",  text: "Tal is a subsatellite — it orbits Wal, which orbits Urlum. You must capture into Urlum orbit, then Wal orbit, before transferring to Tal." },
    { category: "vessel",  text: "Tal's gravity is negligible (~0.02g). Treat it like Gilly: approach very slowly, use RCS for touchdown, and don't let your Kerbals EVA unsecured." },
    { category: "vessel",  text: "The full mission chain — Kerbin → Urlum → Wal → Tal — is one of the most complex in KSP. Plan your staging carefully; each body needs its own capture and departure budget." },
    { category: "lore",    text: "One of the only natural subsatellites (moon of a moon) in the Kerbol system. In the real universe, such objects are rare due to gravitational instability — their Hill spheres are usually too small." },
    { category: "lore",    text: "Tal's existence is a nod to theoretical real-world subsatellites. Wal's Hill sphere is unusually large due to Urlum's weak tidal forces at that distance, allowing Tal to persist." },
  ],

  neidon: [
    { category: "vessel",  text: "Neidon is the furthest planet from Kerbol. The capture burn is the largest in the Kerbol system at ~2,860 m/s — plan accordingly and consider a gravity assist." },
    { category: "vessel",  text: "RTGs are not just recommended but critical. Solar panels produce virtually nothing at Neidon's orbital distance." },
    { category: "vessel",  text: "Neidon has no solid surface. It is a gas giant — any craft descending below the safe atmospheric threshold will be destroyed." },
    { category: "vessel",  text: "Gravity assists from Thatmo can help reduce the capture burn if timed correctly. Thatmo's retrograde orbit makes this tricky to set up but possible." },
    { category: "lore",    text: "KSP's Neptune analog. Its deep blue color comes from methane absorption in the upper atmosphere — similar to the real Uranus and Neptune." },
    { category: "lore",    text: "Neidon's two moons — Thatmo and Nissee — are strikingly different from each other, suggesting they were captured independently rather than forming in-situ." },
  ],

  thatmo: [
    { category: "vessel",  text: "Thatmo has a thick atmosphere and orbits Neidon in a retrograde direction — it almost certainly formed elsewhere and was captured." },
    { category: "vessel",  text: "Parachutes work on Thatmo due to its thick nitrogen atmosphere. However, ascent requires a full rocket — no jet engines." },
    { category: "vessel",  text: "The retrograde orbit means launch timing matters more than usual. Launching into the correct orbital direction from the surface avoids wasting hundreds of m/s." },
    { category: "terrain", text: "The atmosphere is thick enough for significant aerodynamic drag during ascent. Keep your rocket aerodynamically streamlined and ascend steeply early on." },
    { category: "lore",    text: "KSP's Triton analog — a large captured moon with a retrograde orbit and thick atmosphere. The real Triton is thought to be a captured Kuiper Belt object, and Thatmo follows the same logic." },
    { category: "lore",    text: "Thatmo's retrograde orbit means it is slowly spiralling inward — in the far future it will cross the Roche limit and break up into rings around Neidon. Thankfully, not for billions of years." },
  ],

  nissee: [
    { category: "vessel",  text: "Nissee's gravity is negligible. A single RCS burst can exceed escape velocity — approach at the minimum speed your guidance system allows." },
    { category: "vessel",  text: "There is virtually no distinction between 'orbit' and 'surface' operations at Nissee. Even a full-speed EVA jump from the surface can escape." },
    { category: "terrain", text: "The surface is irregular and rocky. Without meaningful gravity to pull the craft down, any non-flat terrain is a tipping hazard — land on the flattest spot you can find." },
    { category: "lore",    text: "Nissee is a tiny captured irregular moon in a highly inclined orbit around Neidon. Like Gilly around Eve, its presence is a geological curiosity rather than a natural formation." },
    { category: "lore",    text: "At this distance from Kerbol, Nissee is one of the coldest and most remote surfaces in the game. The sky is completely black — no atmospheric scattering, no nearby sun." },
  ],
};

export const TIP_CATEGORY_LABELS: Record<TipCategory, string> = {
  vessel:  "Build",
  terrain: "Landing",
  lore:    "Lore",
  egg:     "Easter egg",
};
