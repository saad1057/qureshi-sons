// Photography from Unsplash and Pexels, stored locally under public/images.
const unsplash = (id: string) => `/images/us-${id}.jpg`;
const pexels = (id: number) => `/images/px-${id}.jpg`;

export const company = {
  name: "Qureshi Sons",
  tagline: "Importers of fine sanitaryware",
  category: "Sanitaryware & bath fittings importer",
  addressLines: [
    "119, New Galaxy Cinema",
    "Galaxy Shopping Center, Ferozpur Road",
    "Fazlia Colony, Lahore 54000",
  ],
  addressShort: "Galaxy Shopping Center, Ferozpur Road, Lahore",
  street: "119, New Galaxy Cinema, Lahore–Kasur Rd",
  locality: "Lahore",
  postalCode: "54000",
  region: "Punjab",
  country: "PK",
  phoneDisplay: "(042) 3742 9744",
  phoneHref: "tel:+924237429744",
  phoneE164: "+924237429744",
  rating: 4.4,
  reviews: 17,
  geo: { lat: 31.4697, lng: 74.3426 },
  coordsLabel: "31.47° N — 74.34° E",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Qureshi+Sons+Galaxy+Shopping+Center+Ferozpur+Road+Lahore",
  mapsEmbed:
    "https://www.google.com/maps?q=Qureshi+Sons,+Galaxy+Shopping+Center,+Ferozpur+Road,+Fazlia+Colony,+Lahore&z=16&output=embed",
};

export const nav = [
  { href: "/", label: "Home", image: unsplash("1564540583246-934409427776") },
  { href: "/collections", label: "Collections", image: pexels(4194984) },
  { href: "/projects", label: "Projects", image: pexels(2507016) },
  { href: "/about", label: "About", image: pexels(12692470) },
  { href: "/contact", label: "Contact", image: unsplash("1576698483491-8c43f0862543") },
] as const;

export type CategoryId =
  | "showers"
  | "faucets"
  | "basins"
  | "wcs"
  | "bathtubs"
  | "accessories";

export type Category = {
  id: CategoryId;
  name: string;
  short: string;
  blurb: string;
  image: string;
};

export const categories: Category[] = [
  {
    id: "showers",
    name: "Showers & Panels",
    short: "Showers",
    blurb: "Rain heads, thermostatic columns and multi-jet panels.",
    image: pexels(6444256),
  },
  {
    id: "faucets",
    name: "Faucets & Mixers",
    short: "Faucets",
    blurb: "Basin, wall and deck mixers in six finishes.",
    image: pexels(4194984),
  },
  {
    id: "basins",
    name: "Basins & Vanities",
    short: "Basins",
    blurb: "Vessel, counter and wall-hung basins in fine ceramic and stone.",
    image: unsplash("1576698483491-8c43f0862543"),
  },
  {
    id: "wcs",
    name: "WCs & Bidets",
    short: "WCs",
    blurb: "Rimless wall-hung pans, concealed cisterns and smart seats.",
    image: pexels(6970023),
  },
  {
    id: "bathtubs",
    name: "Bathtubs",
    short: "Bathtubs",
    blurb: "Freestanding, stone resin and built-in baths.",
    image: pexels(10825191),
  },
  {
    id: "accessories",
    name: "Accessories",
    short: "Accessories",
    blurb: "Towel warmers, rails, dispensers and the final details.",
    image: pexels(3609986),
  },
];

export type FinishId = "chrome" | "brass" | "black" | "gunmetal" | "nickel" | "rose";

export const finishes: {
  id: FinishId;
  name: string;
  note: string;
  image: string;
}[] = [
  {
    id: "chrome",
    name: "Polished Chrome",
    note: "Mirror-bright, multi-layer plated over solid brass. Timeless and easy to care for.",
    image: pexels(4194863),
  },
  {
    id: "brass",
    name: "Brushed Brass",
    note: "A warm, satin gold with a hand-brushed grain. Our most requested finish.",
    image: pexels(29183251),
  },
  {
    id: "black",
    name: "Matte Black",
    note: "Powder-coated and fingerprint resistant. Architectural and graphic.",
    image: pexels(19836840),
  },
  {
    id: "gunmetal",
    name: "Gunmetal",
    note: "A smoked, deep grey PVD finish that sits quietly against stone.",
    image: pexels(16249148),
  },
  {
    id: "nickel",
    name: "Brushed Nickel",
    note: "Soft silver with a linear brush. Pairs beautifully with oak and limestone.",
    image: pexels(10833566),
  },
  {
    id: "rose",
    name: "Rose Gold",
    note: "Copper-toned PVD, warm and unexpected. Made to order.",
    image: pexels(11312210),
  },
];

export type Product = {
  id: string;
  name: string;
  series: string;
  meaning: string;
  category: CategoryId;
  image: string;
  alt: string;
  description: string;
  specs: string[];
  finishes: FinishId[];
  ratio: "portrait" | "square" | "landscape";
};

export const products: Product[] = [
  {
    id: "barish-rain-column",
    name: "Barish Rain Column",
    series: "Barish",
    meaning: "Barish — rain",
    category: "showers",
    image: pexels(6444256),
    alt: "Ceiling rain shower above a marble-clad walk-in shower",
    description:
      "A thermostatic rain column with a 300 mm ultra-slim head, hand shower and diverter. Water falls the way monsoon rain does: wide, soft and warm.",
    specs: ["Thermostatic cartridge, 38 °C safety stop", "300 mm square rain head", "3-function hand shower", "Solid brass body"],
    finishes: ["chrome", "black", "brass", "gunmetal"],
    ratio: "portrait",
  },
  {
    id: "sukoon-hand-shower",
    name: "Sukoon Hand Shower",
    series: "Sukoon",
    meaning: "Sukoon — calm",
    category: "showers",
    image: pexels(4194863),
    alt: "Chrome hand shower on a white tiled wall with water running",
    description:
      "A slender hand shower on a sliding rail. Anti-limescale nozzles and an air-injected spray that feels fuller with less water.",
    specs: ["Air-injection spray", "Anti-limescale silicone nozzles", "900 mm slide rail", "1.5 m braided hose"],
    finishes: ["chrome", "nickel", "black"],
    ratio: "portrait",
  },
  {
    id: "shabnam-ceiling-head",
    name: "Shabnam Ceiling Head",
    series: "Shabnam",
    meaning: "Shabnam — dew",
    category: "showers",
    image: pexels(13444798),
    alt: "Round shower head recessed into a pale wall",
    description:
      "A flush-mounted ceiling head that disappears into the plaster. Pair it with a concealed thermostat for a minimal wet room.",
    specs: ["Flush ceiling installation", "400 mm round plate", "Rain and mist modes", "Concealed body included"],
    finishes: ["chrome", "nickel", "gunmetal"],
    ratio: "portrait",
  },
  {
    id: "jharna-shower-panel",
    name: "Jharna Shower Panel",
    series: "Jharna",
    meaning: "Jharna — waterfall",
    category: "showers",
    image: unsplash("1638799869566-b17fa794c4de"),
    alt: "Frameless glass shower enclosure with marble walls and a rain shower",
    description:
      "A multi-jet tempered glass panel with body jets, waterfall spout and rain head in one piece. Our showroom’s most demonstrated piece.",
    specs: ["6 body massage jets", "Waterfall spout and rain head", "Tempered safety glass", "Thermostatic mixing"],
    finishes: ["chrome", "black"],
    ratio: "landscape",
  },
  {
    id: "darya-wall-shower",
    name: "Darya Wall Set",
    series: "Darya",
    meaning: "Darya — river",
    category: "showers",
    image: pexels(3315291),
    alt: "Dark green tiled shower with exposed matte shower set",
    description:
      "An exposed shower set with a 250 mm head and a solid metal riser. Designed for the deep-coloured tile bathrooms we love.",
    specs: ["Exposed thermostatic bar", "250 mm rain head", "Height-adjustable riser", "Hand shower with holder"],
    finishes: ["black", "brass", "chrome"],
    ratio: "portrait",
  },
  {
    id: "zar-basin-mixer",
    name: "Zar Basin Mixer",
    series: "Zar",
    meaning: "Zar — gold",
    category: "faucets",
    image: pexels(4194984),
    alt: "Brushed gold basin mixer pouring water into a white basin",
    description:
      "A tall single-lever mixer with a softened square profile. Ceramic disc cartridge, aerated laminar flow and a weight that feels right in the hand.",
    specs: ["35 mm ceramic disc cartridge", "Laminar aerator, 5 L/min", "Solid brass, lead-free", "Click-clack waste included"],
    finishes: ["brass", "chrome", "black", "rose"],
    ratio: "portrait",
  },
  {
    id: "mehr-wall-mixer",
    name: "Mehr Wall Mixer",
    series: "Mehr",
    meaning: "Mehr — warmth",
    category: "faucets",
    image: pexels(29183251),
    alt: "Brass three-hole wall-mounted basin mixer above a basin with candles",
    description:
      "A three-hole wall mixer with knurled cross handles. It frees the counter and turns the wall into the centrepiece.",
    specs: ["Concealed body, 3-hole", "Knurled handles", "Spout projection 200 mm", "Quarter-turn valves"],
    finishes: ["brass", "nickel", "gunmetal"],
    ratio: "portrait",
  },
  {
    id: "saaya-pull-down",
    name: "Saaya Pull-Down",
    series: "Saaya",
    meaning: "Saaya — shade",
    category: "faucets",
    image: pexels(6253786),
    alt: "Matte black pull-down spring faucet over a stone sink",
    description:
      "A professional spring mixer for kitchens and utility rooms. A two-mode magnetic spray head docks with a satisfying click.",
    specs: ["Spring pull-down hose", "Magnetic docking", "Spray and stream modes", "360° swivel"],
    finishes: ["black", "chrome", "gunmetal"],
    ratio: "landscape",
  },
  {
    id: "kohsar-gooseneck",
    name: "Kohsar Gooseneck",
    series: "Kohsar",
    meaning: "Kohsar — mountain",
    category: "faucets",
    image: pexels(19836840),
    alt: "Black gooseneck faucet against an exposed brick wall",
    description:
      "A high-arc gooseneck in powder-coated matte black. Sculptural on its own, quiet in a dark kitchen.",
    specs: ["High-arc 360° spout", "Single side lever", "Powder-coated finish", "Flexible hoses included"],
    finishes: ["black", "brass", "chrome"],
    ratio: "portrait",
  },
  {
    id: "chashma-mono",
    name: "Chashma Mono",
    series: "Chashma",
    meaning: "Chashma — spring",
    category: "faucets",
    image: pexels(10833566),
    alt: "Chrome monoblock basin mixer above a white ceramic basin",
    description:
      "A compact monoblock for cloakrooms and guest baths, with an eco-click limiter that saves water without changing the feel.",
    specs: ["Eco-click flow limiter", "Compact 150 mm height", "Ceramic cartridge", "Push waste included"],
    finishes: ["chrome", "nickel"],
    ratio: "landscape",
  },
  {
    id: "riwayat-bath-filler",
    name: "Riwayat Bath Filler",
    series: "Riwayat",
    meaning: "Riwayat — tradition",
    category: "faucets",
    image: pexels(11312210),
    alt: "Rose gold vintage bath filler with hand shower beside a white tub",
    description:
      "A classic cross-handle bath filler with a telephone hand shower, cast and finished by hand. Old-world form, modern cartridges inside.",
    specs: ["Deck or wall mount", "Telephone hand shower", "Hand-finished casting", "Ceramic disc valves"],
    finishes: ["rose", "brass", "nickel"],
    ratio: "portrait",
  },
  {
    id: "sang-vessel",
    name: "Sang Vessel Basin",
    series: "Sang",
    meaning: "Sang — stone",
    category: "basins",
    image: unsplash("1576698483491-8c43f0862543"),
    alt: "Round vessel basin on a marble counter with an arched brass mirror",
    description:
      "A thin-walled vessel basin in fine fireclay, glazed inside and out. Paired here with a marble vanity and a wall spout.",
    specs: ["Fine fireclay, 5 mm rim", "Ø 420 mm", "Gloss or matte glaze", "Overflow-free design"],
    finishes: ["chrome", "brass", "black"],
    ratio: "portrait",
  },
  {
    id: "noor-double-vanity",
    name: "Noor Double Vanity",
    series: "Noor",
    meaning: "Noor — light",
    category: "basins",
    image: unsplash("1564540583246-934409427776"),
    alt: "Marble double vanity with two round brass mirrors",
    description:
      "A 1600 mm double vanity in book-matched marble with integrated basins and soft-close drawers.",
    specs: ["1600 mm book-matched top", "Twin integrated basins", "Soft-close drawers", "Made to measure"],
    finishes: ["brass", "chrome"],
    ratio: "landscape",
  },
  {
    id: "taal-countertop",
    name: "Taal Countertop Basin",
    series: "Taal",
    meaning: "Taal — lake",
    category: "basins",
    image: pexels(30547730),
    alt: "Ceramic countertop basin under warm ambient light with a chrome tap",
    description:
      "A softly squared countertop basin with a deep bowl that keeps splashes in.",
    specs: ["Vitreous china", "500 × 380 mm", "Deep 140 mm bowl", "Nano-glaze, easy clean"],
    finishes: ["chrome", "nickel", "gunmetal"],
    ratio: "portrait",
  },
  {
    id: "lehr-round-basin",
    name: "Lehr Round Basin",
    series: "Lehr",
    meaning: "Lehr — wave",
    category: "basins",
    image: pexels(709749),
    alt: "Top view of a round white ceramic basin with a chrome faucet",
    description:
      "A perfectly round sit-on basin with a gentle, wave-like slope to the waste.",
    specs: ["Ø 400 mm", "Vitreous china", "Ceramic waste cover", "Gloss white"],
    finishes: ["chrome", "black"],
    ratio: "square",
  },
  {
    id: "shab-dark-vanity",
    name: "Shab Dark Vanity",
    series: "Shab",
    meaning: "Shab — night",
    category: "basins",
    image: unsplash("1603825491103-bd638b1873b0"),
    alt: "Dark bathroom with a stone vessel basin on a timber vanity",
    description:
      "A floating oak vanity with a carved stone vessel for low-lit, hotel-style bathrooms.",
    specs: ["Solid oak, floating", "Carved stone vessel", "Integrated LED strip", "Push-to-open drawers"],
    finishes: ["gunmetal", "black", "brass"],
    ratio: "portrait",
  },
  {
    id: "safa-wall-hung",
    name: "Safa Wall-Hung WC",
    series: "Safa",
    meaning: "Safa — pure",
    category: "wcs",
    image: pexels(6970023),
    alt: "Wall-hung toilet with concealed cistern beside a glass shower",
    description:
      "A rimless wall-hung pan with a concealed frame and slim soft-close seat. Easier to clean, quieter to flush.",
    specs: ["Rimless flush", "Concealed cistern frame", "Quick-release soft-close seat", "Dual flush 4/2.6 L"],
    finishes: ["chrome", "black", "brass"],
    ratio: "portrait",
  },
  {
    id: "raahat-smart-seat",
    name: "Raahat Smart WC",
    series: "Raahat",
    meaning: "Raahat — comfort",
    category: "wcs",
    image: pexels(34754006),
    alt: "Modern toilet in a minimal bathroom with framed glass shower",
    description:
      "An integrated smart toilet with heated seat, warm-water wash and auto-flush. Imported and serviced locally.",
    specs: ["Heated seat", "Warm-water wash, adjustable", "Auto open and flush", "Night light"],
    finishes: ["chrome"],
    ratio: "portrait",
  },
  {
    id: "aab-close-coupled",
    name: "Aab Floor WC",
    series: "Aab",
    meaning: "Aab — water",
    category: "wcs",
    image: pexels(38071647),
    alt: "Floor-standing toilet in a bright minimalist bathroom with artwork",
    description:
      "A back-to-wall floor-standing pan that hides all pipework. A clean silhouette with no wall frame needed.",
    specs: ["Back-to-wall design", "Rimless bowl", "Soft-close seat", "Concealed fixings"],
    finishes: ["chrome", "nickel"],
    ratio: "portrait",
  },
  {
    id: "bahar-suite",
    name: "Bahar Bathroom Suite",
    series: "Bahar",
    meaning: "Bahar — spring",
    category: "wcs",
    image: pexels(7031866),
    alt: "Bright contemporary bathroom with wall-hung toilet and basin",
    description:
      "A coordinated suite of WC, basin and bidet sharing one soft, rounded design language.",
    specs: ["WC, basin and bidet", "Matching flush plate", "Coordinated fittings", "Supplied as a set"],
    finishes: ["chrome", "gunmetal"],
    ratio: "landscape",
  },
  {
    id: "pathar-stone-tub",
    name: "Pathar Stone Bath",
    series: "Pathar",
    meaning: "Pathar — stone",
    category: "bathtubs",
    image: pexels(10825191),
    alt: "Stone resin freestanding bathtub in a timber-clad bathroom with natural light",
    description:
      "A cast stone-resin freestanding bath with a satin finish that stays warm to the touch.",
    specs: ["Solid stone resin", "1700 × 800 mm", "Satin matte finish", "Integrated overflow"],
    finishes: ["chrome", "brass", "gunmetal"],
    ratio: "landscape",
  },
  {
    id: "mauj-slipper",
    name: "Mauj Slipper Bath",
    series: "Mauj",
    meaning: "Mauj — wave",
    category: "bathtubs",
    image: pexels(16249148),
    alt: "White freestanding slipper bath with a black floor-standing filler and marble walls",
    description:
      "A double-ended slipper bath with a high, curved back. Shown with a gunmetal floor-standing filler.",
    specs: ["Double-ended slipper form", "Acrylic, reinforced", "1650 × 750 mm", "Floor filler sold separately"],
    finishes: ["gunmetal", "black", "chrome"],
    ratio: "landscape",
  },
  {
    id: "jheel-oval",
    name: "Jheel Oval Bath",
    series: "Jheel",
    meaning: "Jheel — lake",
    category: "bathtubs",
    image: pexels(19672635),
    alt: "Freestanding oval bathtub in a dark bathroom opening onto greenery",
    description:
      "A wide oval bath for spa-like rooms. The deep 600 mm soak is made for long evenings.",
    specs: ["Oval, freestanding", "600 mm soaking depth", "Thermal-retaining shell", "Pop-up waste"],
    finishes: ["black", "brass", "chrome"],
    ratio: "portrait",
  },
  {
    id: "gulab-soaking",
    name: "Gulab Soaking Tub",
    series: "Gulab",
    meaning: "Gulab — rose",
    category: "bathtubs",
    image: unsplash("1507652313519-d4e9174996dd"),
    alt: "Blush pink freestanding bathtub against a grey stone wall with palm leaves",
    description:
      "A freestanding tub in a soft blush exterior, available in custom colours on request.",
    specs: ["Custom exterior colours", "1600 × 750 mm", "Slim 15 mm rim", "Made to order"],
    finishes: ["rose", "brass", "nickel"],
    ratio: "landscape",
  },
  {
    id: "sahil-freestanding",
    name: "Sahil Freestanding",
    series: "Sahil",
    meaning: "Sahil — shore",
    category: "bathtubs",
    image: pexels(36777588),
    alt: "Freestanding bathtub in a bright bathroom with a glass shower behind",
    description:
      "An oval freestanding bath with a fine tapered edge, our bestseller for family homes.",
    specs: ["Reinforced acrylic", "1700 × 780 mm", "Tapered 20 mm edge", "Chrome click waste"],
    finishes: ["chrome", "nickel", "black"],
    ratio: "landscape",
  },
  {
    id: "garmi-towel-warmer",
    name: "Garmi Towel Warmer",
    series: "Garmi",
    meaning: "Garmi — warmth",
    category: "accessories",
    image: pexels(3609986),
    alt: "Patterned white towel and bristle brush on a heated towel rail",
    description:
      "A ladder towel warmer that runs on low wattage. Handy in Lahore’s foggy winter mornings.",
    specs: ["Electric, 120 W", "Timer and thermostat", "1200 × 500 mm", "Stainless steel"],
    finishes: ["chrome", "black", "brass"],
    ratio: "landscape",
  },
  {
    id: "rang-dispenser",
    name: "Rang Counter Set",
    series: "Rang",
    meaning: "Rang — colour",
    category: "accessories",
    image: pexels(6425756),
    alt: "Stone soap dispenser and a woven basket on a timber counter",
    description:
      "A set of soap dispenser, tumbler and tray in honed stone. Finishing details that make a bathroom feel finished.",
    specs: ["Honed natural stone", "Dispenser, tumbler, tray", "Brass pump", "Hand finished"],
    finishes: ["brass", "black"],
    ratio: "landscape",
  },
  {
    id: "lakri-shelf",
    name: "Lakri Shelf Kit",
    series: "Lakri",
    meaning: "Lakri — wood",
    category: "accessories",
    image: pexels(7303908),
    alt: "Wooden shelf with a soap dish, cup and toothbrush",
    description:
      "An oiled-oak shelf with matching soap dish and cup. Warm, simple, and made to age gracefully.",
    specs: ["Oiled solid oak", "600 mm shelf", "Concealed brackets", "Soap dish and cup"],
    finishes: ["brass", "black", "chrome"],
    ratio: "portrait",
  },
];

export type Project = {
  id: string;
  title: string;
  type: string;
  location: string;
  year: string;
  scope: string;
  summary: string;
  cover: string;
  gallery: string[];
  alt: string;
  size: "tall" | "wide" | "square";
};

export const projects: Project[] = [
  {
    id: "dha-residence",
    title: "The Courtyard Residence",
    type: "Private residence",
    location: "DHA Phase 6, Lahore",
    year: "2025",
    scope: "7 bathrooms · brushed brass throughout",
    summary:
      "A family home arranged around a planted courtyard. We specified every bathroom, from the brass wall mixers in the master suite to the stone vessels in the guest wing.",
    cover: unsplash("1600607688969-a5bfcd646154"),
    gallery: [
      unsplash("1600607688969-a5bfcd646154"),
      unsplash("1564540583246-934409427776"),
      unsplash("1600607687939-ce8a6c25118c"),
    ],
    alt: "Contemporary house with dark timber cladding and a large tree in the garden",
    size: "wide",
  },
  {
    id: "gulberg-hotel",
    title: "Boutique Hotel, Gulberg",
    type: "Hospitality",
    location: "Gulberg III, Lahore",
    year: "2024",
    scope: "48 keys · public washrooms · spa",
    summary:
      "Low-lit guest bathrooms with gunmetal fittings and double vanities, plus touch-free fittings for every public washroom.",
    cover: pexels(2507016),
    gallery: [pexels(2507016), unsplash("1631049307264-da0ec9d70304"), unsplash("1600566752355-35792bedcfea")],
    alt: "Hotel washroom with twin mirrors, dark stone and stacked white towels",
    size: "tall",
  },
  {
    id: "bahria-villa",
    title: "Villa by the Lake",
    type: "Private residence",
    location: "Bahria Town, Lahore",
    year: "2025",
    scope: "5 bathrooms · stone resin baths",
    summary:
      "An airy villa with big glass walls. Freestanding stone baths face the garden, with ceiling rain heads in every shower.",
    cover: unsplash("1600585154340-be6161a56a0c"),
    gallery: [unsplash("1600585154340-be6161a56a0c"), pexels(10825191), unsplash("1604014237800-1c9102c219da")],
    alt: "Modern villa at dusk with warm interior lights and a lawn",
    size: "square",
  },
  {
    id: "resort-murree",
    title: "Hillside Retreat",
    type: "Hospitality",
    location: "Bhurban, Murree",
    year: "2023",
    scope: "32 suites · steam and wellness",
    summary:
      "A retreat in the pines where every suite has a soaking tub. Thermostatic showers were tuned for altitude and cold winters.",
    cover: unsplash("1571003123894-1f0594d2b5d9"),
    gallery: [unsplash("1571003123894-1f0594d2b5d9"), pexels(19672635), unsplash("1582719478250-c89cae4dc85b")],
    alt: "Resort infinity pool at twilight lined with palm trees",
    size: "tall",
  },
  {
    id: "model-town-house",
    title: "A House in Model Town",
    type: "Renovation",
    location: "Model Town, Lahore",
    year: "2024",
    scope: "Full renovation · matte black",
    summary:
      "A 1970s house renovated with care. We paired matte black fittings with terrazzo and kept the original brass details.",
    cover: unsplash("1600047509807-ba8f99d2cdde"),
    gallery: [unsplash("1600047509807-ba8f99d2cdde"), pexels(3315291), pexels(19836840)],
    alt: "Modern house with timber and render facade and a landscaped front lawn",
    size: "wide",
  },
  {
    id: "mm-alam-offices",
    title: "Headquarters, MM Alam Road",
    type: "Commercial",
    location: "MM Alam Road, Lahore",
    year: "2023",
    scope: "12 floors · touch-free fittings",
    summary:
      "Twelve floors of washrooms with sensor taps, concealed cisterns and robust, easy-to-service fittings.",
    cover: pexels(14011664),
    gallery: [pexels(14011664), pexels(6970023), pexels(7031866)],
    alt: "Grand marble foyer with a sweeping staircase and chandelier",
    size: "square",
  },
  {
    id: "islamabad-penthouse",
    title: "Penthouse, E-7",
    type: "Private residence",
    location: "Islamabad",
    year: "2025",
    scope: "4 bathrooms · marble and chrome",
    summary:
      "A penthouse facing the Margalla Hills. Book-matched marble walls, frameless glass and polished chrome throughout.",
    cover: unsplash("1613545325278-f24b0cae1224"),
    gallery: [unsplash("1613545325278-f24b0cae1224"), unsplash("1638799869566-b17fa794c4de"), pexels(16249148)],
    alt: "Bright double-height living room with white sofas and a fireplace",
    size: "tall",
  },
  {
    id: "seaside-resort",
    title: "Seaside Resort",
    type: "Hospitality",
    location: "Karachi",
    year: "2022",
    scope: "Villas · outdoor showers",
    summary:
      "Salt air demands the right materials. We supplied 316 stainless outdoor showers and PVD fittings that resist corrosion.",
    cover: unsplash("1561501900-3701fa6a0864"),
    gallery: [unsplash("1561501900-3701fa6a0864"), pexels(6444256), unsplash("1631889993959-41b4e9c6e3c5")],
    alt: "Seaside resort at sunset with a pool deck and loungers",
    size: "wide",
  },
];

export const media = {
  heroVideo: "/media/hero.mp4",
  heroPoster: "/media/hero-poster.jpg",
  splashVideo: "/media/splash.mp4",
  brassTap: pexels(12692470),
  marbleVanity: unsplash("1564540583246-934409427776"),
  whiteBath: unsplash("1620626011761-996317b8d101"),
  greyBath: unsplash("1604709177225-055f99402ea3"),
  doubleVessel: pexels(1454804),
  glassShower: pexels(7614405),
  hotelLobby: pexels(695193),
  subwayFaucet: unsplash("1523413651479-597eb2da0ad6"),
  sageVanity: unsplash("1595514535415-dae8580c416c"),
  showroom: unsplash("1584622650111-993a426fbf0a"),
};

export const stats = [
  { value: 4.4, decimals: 1, suffix: "", label: "Google rating", note: `${company.reviews} reviews` },
  { value: 1200, decimals: 0, suffix: "+", label: "Pieces in stock", note: "Ready to deliver" },
  { value: 6, decimals: 0, suffix: "", label: "Signature finishes", note: "From chrome to rose gold" },
  { value: 350, decimals: 0, suffix: "+", label: "Projects fitted", note: "Homes, hotels, offices" },
];
