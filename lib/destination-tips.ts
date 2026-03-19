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
};

export const TIP_CATEGORY_LABELS: Record<TipCategory, string> = {
  vessel:  "Build",
  terrain: "Landing",
  lore:    "Lore",
  egg:     "Easter egg",
};
