/**
 * Seed script — populates MongoDB with marques and cars.
 *
 * Usage (from project root):
 *   node server/seed/seed.js
 */

import 'dotenv/config'
import mongoose from 'mongoose'
import Marque from '../models/Marque.js'
import Car from '../models/Car.js'

// ── Marque data (9 brands) ───────────────────────────────────────────────────
const MARQUES = [
  {
    slug: 'bugatti',
    name: 'Bugatti',
    foundedYear: 1909,
    country: 'France',
    biography:
      'Founded by Ettore Bugatti in Molsheim, Alsace, Bugatti is synonymous with art, speed, and exclusivity. From dominating pre-war Grand Prix racing with the Type 35 to redefining the hypercar era with the Veyron and Chiron, Bugatti has always pursued perfection at the intersection of engineering and artistry. Now under Rimac Group ownership, the brand enters its electrified future with the V16 hybrid Tourbillon.',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/60/Bugatti_logo.svg/200px-Bugatti_logo.svg.png',
  },
  {
    slug: 'ferrari',
    name: 'Ferrari',
    foundedYear: 1947,
    country: 'Italy',
    biography:
      'Founded by Enzo Ferrari, the Prancing Horse brand grew from a racing team into the world\'s most iconic sports car manufacturer. Ferrari\'s DNA is forged in Formula 1, with technology transfer from the track to the road defining every generation. From the legendary 250 GTO to the hybrid LaFerrari, Ferrari represents the ultimate fusion of passion, performance, and Italian craftsmanship.',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d1/Ferrari-Logo.svg/200px-Ferrari-Logo.svg.png',
  },
  {
    slug: 'lamborghini',
    name: 'Lamborghini',
    foundedYear: 1963,
    country: 'Italy',
    biography:
      'Born from Ferruccio Lamborghini\'s dissatisfaction with his Ferrari, Automobili Lamborghini has been the rebellious outsider of the supercar world since 1963. The Miura invented the mid-engine supercar layout, the Countach defined poster-car culture, and the brand continues to push boundaries with theatrical design and visceral V12 power. Now under Volkswagen Group (Audi), Lamborghini is transitioning to hybrid powertrains while preserving its wild DNA.',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Lamborghini_Logo.svg/200px-Lamborghini_Logo.svg.png',
  },
  {
    slug: 'porsche',
    name: 'Porsche',
    foundedYear: 1931,
    country: 'Germany',
    biography:
      'Porsche is the quintessential driver\'s brand, built on a philosophy of continuous evolution rather than revolution. The 911\'s rear-engine flat-six layout has endured for over 60 years, while the brand has also produced game-changing supercars like the 959, Carrera GT, and 918 Spyder. Porsche dominates both road and track, holding more Le Mans victories than any other manufacturer.',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/66/Porsche_logo.svg/200px-Porsche_logo.svg.png',
  },
  {
    slug: 'mercedes-benz',
    name: 'Mercedes-Benz',
    foundedYear: 1886,
    country: 'Germany',
    biography:
      'As the world\'s oldest car manufacturer, Mercedes-Benz has been synonymous with automotive innovation since Karl Benz patented the first gasoline-powered automobile in 1886. The brand pioneered safety technologies including ABS, airbags, and crumple zones through its flagship S-Class. From the iconic 300 SL Gullwing to the AMG ONE with its F1-derived powertrain, Mercedes-Benz bridges luxury, technology, and performance like no other.',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/200px-Mercedes-Logo.svg.png',
  },
  {
    slug: 'bmw',
    name: 'BMW',
    foundedYear: 1916,
    country: 'Germany',
    biography:
      'Bayerische Motoren Werke began as an aircraft engine manufacturer before pivoting to motorcycles and then automobiles. BMW\'s identity as the \'Ultimate Driving Machine\' was forged through models like the 2002 and the M3, blending everyday practicality with genuine sporting intent. The M division remains the gold standard for high-performance luxury sedans, while the brand pushes into electrification with its i-series.',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/200px-BMW.svg.png',
  },
  {
    slug: 'volkswagen',
    name: 'Volkswagen',
    foundedYear: 1937,
    country: 'Germany',
    biography:
      'Volkswagen — \'the people\'s car\' — was born from Ferdinand Porsche\'s vision of affordable motoring for the masses. The Beetle became the best-selling single-model car in history, while the Golf GTI invented the hot hatchback segment. Today, VW heads one of the world\'s largest automotive groups (owning Porsche, Lamborghini, Bentley, Bugatti) and is leading Europe\'s transition to electric mobility with its ID. series.',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/200px-Volkswagen_logo_2019.svg.png',
  },
  {
    slug: 'ford',
    name: 'Ford',
    foundedYear: 1903,
    country: 'United States',
    biography:
      'Henry Ford didn\'t just build cars — he revolutionized manufacturing with the moving assembly line, making automobiles accessible to ordinary Americans. The Model T put the world on wheels, the Mustang created the pony car segment, and the GT40\'s four consecutive Le Mans victories (1966–1969) wrote one of motorsport\'s greatest chapters. Ford remains America\'s most iconic automaker.',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Ford_Motor_Company_Logo.svg/200px-Ford_Motor_Company_Logo.svg.png',
  },
  {
    slug: 'toyota',
    name: 'Toyota',
    foundedYear: 1937,
    country: 'Japan',
    biography:
      'Toyota Motor Corporation transformed from a loom manufacturer into the world\'s largest automaker through relentless focus on quality, reliability, and efficiency. The Corolla became the best-selling car nameplate in history, the Prius pioneered mass-market hybrid technology, and the Supra earned legendary JDM status. Toyota\'s production system (TPS) revolutionized global manufacturing far beyond the automotive industry.',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Toyota.svg/200px-Toyota.svg.png',
  },
]

// ── Car data (33 vehicles across 9 marques) ──────────────────────────────────
const CARS_DATA = [

  // ══════════════════════════════════════════════════════════════════════════
  //  BUGATTI  (4 cars)
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: 'bugatti-type-35',
    marqueName: 'bugatti',
    name: 'Type 35',
    year: 1924,
    era: 'golden-age',
    category: 'Racing',
    description:
      'The most successful racing car in history by victories. The Type 35 won over 1,000 races and 14 Grand Prix championships between 1924 and 1930, including five consecutive Targa Florio wins. Its supercharged inline-8 and elegant aluminium body set the template for the Grand Prix car for a generation.',
    specs: {
      engine:   '2.0L Supercharged Inline-8',
      power:    '128 hp',
      topSpeed: '125 mph',
      weight:   '750 kg',
    },
    provenance:
      'Over 340 Type 35 variants produced (1924–1930). Won more than 1,000 races in period competition. The supercharged Type 35B is the most coveted variant; well-preserved examples fetch $1M+ at auction.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Bugatti_35%2C_Bj_1924%2C_M_Nicolosi_-_1976.jpg/1280px-Bugatti_35%2C_Bj_1924%2C_M_Nicolosi_-_1976.jpg',
        alt: 'Bugatti Type 35 Grand Prix racing car in period blue livery, wire wheels and exposed exhaust pipes',
        primary: true,
      },
    ],
    featured: true,
  },
  {
    slug: 'bugatti-type-57sc-atlantic',
    marqueName: 'bugatti',
    name: 'Type 57SC Atlantic',
    year: 1936,
    era: 'golden-age',
    category: 'Grand Tourer',
    description:
      'Art Deco design masterpiece by Jean Bugatti. Only 4 built; one of the most valuable cars in history with auction values exceeding $40 million. The riveted dorsal seam, teardrop body, and supercharged inline-8 represent the pinnacle of pre-war automotive artistry.',
    specs: {
      engine:   '3.3L Supercharged Inline-8',
      power:    '200 hp',
      topSpeed: '135 mph',
      weight:   '950 kg',
    },
    provenance:
      'Only 4 produced (1936–1938). Chassis #57374 sold for $30M+ in 2010; Chassis #57591 owned by Ralph Lauren. Won Pebble Beach Best of Show in 1990 and 2003.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Bugatti_Type_57_Atalante_1936.jpg',
        alt: 'Bugatti Type 57 Atalante 1936, sweeping black coachwork with fastback roofline and prominent dorsal spine',
        primary: true,
      },
    ],
    featured: true,
  },
  {
    slug: 'bugatti-veyron-16-4',
    marqueName: 'bugatti',
    name: 'Veyron 16.4',
    year: 2005,
    era: 'modern-classic',
    category: 'Sports',
    description:
      'The car that reignited the top-speed war. The Veyron\'s quad-turbocharged W16 engine was an unprecedented engineering achievement, combining 1,001 hp with luxury grand touring capability. It was the first production car to exceed 250 mph and launched the modern hypercar era under Volkswagen Group ownership.',
    specs: {
      engine:   '8.0L Quad-Turbo W16',
      power:    '1,001 hp',
      topSpeed: '253 mph',
      weight:   '1,888 kg',
    },
    provenance:
      '450 units produced (2005–2015). Developed under VW Group at a reported loss of €6M per unit. Super Sport variant set 267.8 mph world record in 2010.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Bugatti_Veyron_16.4_%E2%80%93_Frontansicht_%281%29%2C_5._April_2012%2C_D%C3%BCsseldorf.jpg/1280px-Bugatti_Veyron_16.4_%E2%80%93_Frontansicht_%281%29%2C_5._April_2012%2C_D%C3%BCsseldorf.jpg',
        alt: 'Bugatti Veyron 16.4 in silver and black, low-angle front three-quarter view showing the massive air intakes',
        primary: true,
      },
    ],
    featured: true,
  },
  {
    slug: 'bugatti-chiron',
    marqueName: 'bugatti',
    name: 'Chiron',
    year: 2016,
    era: 'modern-classic',
    category: 'Sports',
    description:
      'The Veyron\'s 1,479 hp successor and the pinnacle of the internal combustion hypercar. The Chiron\'s evolution of the W16 engine adds four larger turbochargers and revised cooling to push the limits of what a road-legal automobile can achieve. The Chiron Super Sport 300+ became the first production car to exceed 300 mph in 2019.',
    specs: {
      engine:   '8.0L Quad-Turbo W16',
      power:    '1,479 hp',
      topSpeed: '261 mph (limited)',
      weight:   '1,995 kg',
    },
    provenance:
      '500 units planned; production ran 2016–2022. Base price €2.4M. The Chiron Super Sport 300+ achieved 304.77 mph in 2019 — the first production car past 300 mph.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Bugatti_Chiron_1.jpg/1280px-Bugatti_Chiron_1.jpg',
        alt: 'Bugatti Chiron in classic French Racing Blue with polished aluminium C-pillar, front three-quarter view',
        primary: true,
      },
    ],
    featured: true,
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  FERRARI  (5 cars)
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: 'ferrari-250-gto',
    marqueName: 'ferrari',
    name: '250 GTO',
    year: 1962,
    era: 'golden-age',
    category: 'Racing',
    description:
      'The \'Holy Grail\' of collector cars. Built for FIA Group 3 GT racing homologation, the 250 GTO combined a Colombo-designed 3.0L V12 with Scaglietti\'s aerodynamic bodywork. Only 36 were produced, each requiring personal approval from Enzo Ferrari. It dominated international GT racing from 1962 to 1964.',
    specs: {
      engine:   '3.0L Colombo V12',
      power:    '296 hp',
      topSpeed: '174 mph',
      weight:   '880 kg',
    },
    provenance:
      'Only 36 built. A 1963 example (chassis 4153GT) sold privately for $70M in 2018, making it the most expensive car ever sold. Buyers required Enzo Ferrari\'s personal approval.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/1963_Ferrari_250_GTO_%28chassis_4153GT%29_2.95.jpg/1280px-1963_Ferrari_250_GTO_%28chassis_4153GT%29_2.95.jpg',
        alt: 'Ferrari 250 GTO chassis 4153GT in Rosso Corsa, iconic long-nose GT bodywork with quad exhausts',
        primary: true,
      },
    ],
    featured: true,
  },
  {
    slug: 'ferrari-288-gto',
    marqueName: 'ferrari',
    name: '288 GTO',
    year: 1984,
    era: 'muscle-era',
    category: 'Sports',
    description:
      'Built for Group B homologation racing that never came, the 288 GTO became the first of Ferrari\'s modern special series. Its twin-turbocharged V8 produced 400 hp from 2.9 litres and was mounted longitudinally — a first for a mid-engine Ferrari. The 288 GTO directly inspired the F40 and launched Ferrari\'s lineage of ultimate performance machines.',
    specs: {
      engine:   '2.9L Twin-Turbo V8',
      power:    '400 hp',
      topSpeed: '189 mph',
      weight:   '1,160 kg',
    },
    provenance:
      '272 road cars built (1984–1986), plus 5 GTO Evoluzione prototypes. Group B was cancelled before competition. Prices now exceed $3M for concours examples, reflecting its status as the F40\'s direct ancestor.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Ferrari_288_GTO_%281%29.JPG/1280px-Ferrari_288_GTO_%281%29.JPG',
        alt: 'Ferrari 288 GTO in Rosso Corsa, NACA ducts and twin rear grilles visible on the flared bodywork',
        primary: true,
      },
    ],
    featured: true,
  },
  {
    slug: 'ferrari-testarossa',
    marqueName: 'ferrari',
    name: 'Testarossa',
    year: 1984,
    era: 'muscle-era',
    category: 'Sports',
    description:
      'The definitive 1980s Ferrari and the decade\'s ultimate poster car. Pininfarina\'s radical side-strake bodywork channelled air to the flat-12 engine\'s massive side-mounted radiators. Its visual drama and starring role in Miami Vice made it the cultural symbol of 1980s excess and aspiration worldwide.',
    specs: {
      engine:   '4.9L Flat-12',
      power:    '390 hp',
      topSpeed: '180 mph',
      weight:   '1,506 kg',
    },
    provenance:
      '7,177 produced across Testarossa, 512 TR, and F512 M variants (1984–1996). The longest-running Ferrari of its era. Original 1984 Monospecchio (single mirror) examples are most collectible.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Ferrari_Testarossa_IMG_3043.jpg/1280px-Ferrari_Testarossa_IMG_3043.jpg',
        alt: 'Ferrari Testarossa in classic red, the iconic side strakes and wide rear haunches catching studio light',
        primary: true,
      },
    ],
    featured: true,
  },
  {
    slug: 'ferrari-f40',
    marqueName: 'ferrari',
    name: 'F40',
    year: 1987,
    era: 'muscle-era',
    category: 'Sports',
    description:
      'The last car personally approved by Enzo Ferrari before his death in 1988, built to celebrate the company\'s 40th anniversary. The F40 was the first production car to break the 200 mph barrier. Its stripped-out, no-nonsense approach — carbon/Kevlar body, no ABS, no power steering — made it the purest supercar of its generation.',
    specs: {
      engine:   '2.9L Twin-Turbo V8',
      power:    '471 hp',
      topSpeed: '201 mph',
      weight:   '1,100 kg',
    },
    provenance:
      '1,315 produced (1987–1992). Originally planned at 400 units; demand forced increased production. During the late-1980s supercar boom, examples traded at 3× list price.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/1989_Ferrari_F40_SCD_24.jpg/1280px-1989_Ferrari_F40_SCD_24.jpg',
        alt: 'Ferrari F40 in Rosso Corsa, the raw NACA-ducted nose and fixed rear wing captured in side profile',
        primary: true,
      },
    ],
    featured: true,
  },
  {
    slug: 'ferrari-laferrari',
    marqueName: 'ferrari',
    name: 'LaFerrari',
    year: 2013,
    era: 'modern-classic',
    category: 'Sports',
    description:
      'Ferrari\'s first hybrid and the ultimate road-going expression of Formula 1 KERS technology. One of the \'Holy Trinity\' hypercars alongside the Porsche 918 Spyder and McLaren P1, LaFerrari combines a 6.3L V12 with a HY-KERS electric motor for a combined 950 hp and sub-3-second 0–60 mph. Only 499 coupes and 210 Aperta convertibles were built.',
    specs: {
      engine:   '6.3L V12 + HY-KERS Electric',
      power:    '950 hp (combined)',
      topSpeed: '217 mph',
      weight:   '1,255 kg',
    },
    provenance:
      '499 coupes (2013–2015) and 210 Aperta (2016–2018). Allocated exclusively to existing Ferrari clients with significant purchasing history. Current values exceed $3.5M.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/LaFerrari_in_Beverly_Hills_%2814563979888%29.jpg/1280px-LaFerrari_in_Beverly_Hills_%2814563979888%29.jpg',
        alt: 'LaFerrari in Rosso Corsa on Rodeo Drive, the dramatically sculpted carbon body and active aerodynamics on full display',
        primary: true,
      },
    ],
    featured: true,
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  LAMBORGHINI  (4 cars)
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: 'lamborghini-miura',
    marqueName: 'lamborghini',
    name: 'Miura',
    year: 1966,
    era: 'golden-age',
    category: 'Sports',
    description:
      'Widely regarded as the world\'s first true supercar. Conceived by a trio of young engineers (Dallara, Stanzani, Wallace) and styled by Marcello Gandini at Bertone, the Miura placed a transverse V12 behind the driver — a layout that became the supercar standard. It redefined automotive performance and beauty overnight.',
    specs: {
      engine:   '3.9L Transverse V12',
      power:    '350 hp',
      topSpeed: '174 mph',
      weight:   '980 kg',
    },
    provenance:
      'Approximately 764 produced across P400, S, and SV variants (1966–1973). Featured in the opening sequence of \'The Italian Job\' (1969). SV examples regularly exceed $3M at auction.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/1971_Lamborghini_Miura_P400_SV.jpg/1280px-1971_Lamborghini_Miura_P400_SV.jpg',
        alt: 'Lamborghini Miura P400 SV in orange, the sensual Gandini bodywork with eyelash headlights and wide rear haunches',
        primary: true,
      },
    ],
    featured: true,
  },
  {
    slug: 'lamborghini-countach',
    marqueName: 'lamborghini',
    name: 'Countach',
    year: 1974,
    era: 'muscle-era',
    category: 'Sports',
    description:
      'The ultimate poster car. Marcello Gandini\'s wedge-shaped design with scissor doors became the defining image of 1980s supercar culture. The Countach evolved through LP400, LP400S, LP500S, 5000QV, and 25th Anniversary editions over a 16-year production run, each iteration adding more drama and power.',
    specs: {
      engine:   '3.9–5.2L V12',
      power:    '375–455 hp',
      topSpeed: '183 mph',
      weight:   '1,490 kg',
    },
    provenance:
      'Approximately 2,049 produced (1974–1990). The LP400 \'Periscopio\' is the most collectible. Young Horacio Pagani worked on the 25th Anniversary edition\'s body strakes before founding his own company.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Lamborghini_Countach_-_Flickr_-_exfordy_%282%29_%28cropped-2%29.jpg/1280px-Lamborghini_Countach_-_Flickr_-_exfordy_%282%29_%28cropped-2%29.jpg',
        alt: 'Lamborghini Countach in white with scissor door raised, the razor-edged wedge silhouette from the front',
        primary: true,
      },
    ],
    featured: true,
  },
  {
    slug: 'lamborghini-diablo',
    marqueName: 'lamborghini',
    name: 'Diablo',
    year: 1990,
    era: 'muscle-era',
    category: 'Sports',
    description:
      'The Countach\'s successor and the last Lamborghini developed entirely under the Mimran family before Audi takeover. Designed by Marcello Gandini with styling softened by Chrysler, the Diablo was the first Lamborghini to exceed 200 mph. The VT (Viscous Traction) all-wheel-drive variant made its monstrous V12 power accessible for the first time.',
    specs: {
      engine:   '5.7L V12',
      power:    '485–595 hp',
      topSpeed: '202 mph',
      weight:   '1,576 kg',
    },
    provenance:
      'Approximately 2,884 produced across all variants (1990–2001). The Diablo SE30 Jota (30 units, 595 hp) is the ultimate collector variant. Prices for clean examples have surged past $500K.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/1995_Lamborghini_Diablo_SE_30.jpg/1280px-1995_Lamborghini_Diablo_SE_30.jpg',
        alt: 'Lamborghini Diablo SE30 in yellow, the aggressive front splitter and louvred hood visible in three-quarter view',
        primary: true,
      },
    ],
    featured: true,
  },
  {
    slug: 'lamborghini-murcielago',
    marqueName: 'lamborghini',
    name: 'Murciélago LP640',
    year: 2006,
    era: 'modern-classic',
    category: 'Sports',
    description:
      'The first Lamborghini developed under Audi Group ownership and the first to use the LP (Longitudinale Posteriore) designation. The LP640 variant pushed the 6.5L V12 to 640 hp, making it one of the most dramatic supercars of the 2000s. It featured active air intakes that opened hydraulically under hard acceleration.',
    specs: {
      engine:   '6.5L V12',
      power:    '640 hp',
      topSpeed: '211 mph',
      weight:   '1,665 kg',
    },
    provenance:
      '4,099 Murciélagos produced across all variants (2001–2010). Named after a famous fighting bull that survived 24 sword thrusts. The LP670-4 SuperVeloce (186 units) is the rarest and most valued variant.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Lamborghini_Murci%C3%A9lago_LP-640_-_Flickr_-_Alexandre_Pr%C3%A9vot_%2840%29.jpg/1280px-Lamborghini_Murci%C3%A9lago_LP-640_-_Flickr_-_Alexandre_Pr%C3%A9vot_%2840%29.jpg',
        alt: 'Lamborghini Murciélago LP640 in orange, the angular body with active air scoops deployed at speed',
        primary: true,
      },
    ],
    featured: false,
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  PORSCHE  (5 cars)
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: 'porsche-356',
    marqueName: 'porsche',
    name: '356',
    year: 1948,
    era: 'golden-age',
    category: 'Sports',
    description:
      'The car that started it all. Ferry Porsche built the 356 from Volkswagen parts in a Gmünd sawmill, creating the first production automobile to bear the Porsche name. Its lightweight aluminium body, rear-mounted air-cooled engine, and poised handling established the Porsche DNA that continues in every 911 to this day.',
    specs: {
      engine:   '1.1–2.0L Air-Cooled Flat-4',
      power:    '40–130 hp',
      topSpeed: '90–125 mph',
      weight:   '780 kg',
    },
    provenance:
      'Approximately 76,313 produced across A, B, and C series (1948–1965). Original Gmünd-built aluminium coupes (52 units) are the holy grail. Carrera 2000 GS and Speedster variants command $500K+ at auction.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/0/07/2007-07-08_Porsche_356_C_%2801_kl_ret%29.jpg',
        alt: 'Porsche 356 C in silver, the smooth egg-shaped coupe silhouette that began the Porsche legend',
        primary: true,
      },
    ],
    featured: true,
  },
  {
    slug: 'porsche-911',
    marqueName: 'porsche',
    name: '911',
    year: 1964,
    era: 'golden-age',
    category: 'Sports',
    description:
      'The most iconic sports car in history. Debuted at the 1963 Frankfurt Motor Show as the successor to the 356, the 911\'s rear-engine flat-six layout has endured through continuous evolution for over 60 years and eight generations. No other car combines daily usability, motorsport pedigree, and design continuity so perfectly.',
    specs: {
      engine:   '2.0L Air-Cooled Flat-6 (original)',
      power:    '130 hp (original)',
      topSpeed: '131 mph (original)',
      weight:   '1,080 kg (original)',
    },
    provenance:
      'Continuous production since 1964. Originally named 901, renamed 911 after a Peugeot trademark dispute. Over 1 million 911s produced. The air-cooled 993 generation (1994–1998) is the most collectible.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Porsche_911_No_1000000%2C_70_Years_Porsche_Sports_Car%2C_Berlin_%281X7A3888%29.jpg/1280px-Porsche_911_No_1000000%2C_70_Years_Porsche_Sports_Car%2C_Berlin_%281X7A3888%29.jpg',
        alt: 'Porsche 911 the 1,000,000th unit in silver metallic, the timeless 70-year silhouette photographed in Berlin',
        primary: true,
      },
    ],
    featured: true,
  },
  {
    slug: 'porsche-959',
    marqueName: 'porsche',
    name: '959',
    year: 1986,
    era: 'muscle-era',
    category: 'Sports',
    description:
      'The most technologically advanced car in the world at its launch. Built for Group B rally homologation, the 959 introduced sequential twin-turbocharging, a sophisticated all-wheel-drive system with adjustable torque split, and ride-height adjustment. Bill Gates famously had his 959 impounded by US Customs for 13 years because it couldn\'t pass federal safety standards.',
    specs: {
      engine:   '2.85L Sequential Twin-Turbo Flat-6',
      power:    '444 hp',
      topSpeed: '197 mph',
      weight:   '1,450 kg',
    },
    provenance:
      '337 produced (1986–1988), including 29 Sport variants and 37 Komfort. Won the 1986 Paris-Dakar Rally 1-2. Originally priced at DM 420,000 — below Porsche\'s actual cost. Bill Gates\' car was finally imported under the Show or Display rule in 1999.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Porsche_959_%E2%80%93_Frontansicht_%282%29%2C_21._M%C3%A4rz_2013%2C_D%C3%BCsseldorf.jpg/1280px-Porsche_959_%E2%80%93_Frontansicht_%282%29%2C_21._M%C3%A4rz_2013%2C_D%C3%BCsseldorf.jpg',
        alt: 'Porsche 959 in Guards Red, the smooth aerodynamic body with integrated rear wing and flush door handles',
        primary: true,
      },
    ],
    featured: true,
  },
  {
    slug: 'porsche-carrera-gt',
    marqueName: 'porsche',
    name: 'Carrera GT',
    year: 2004,
    era: 'modern-classic',
    category: 'Sports',
    description:
      'Porsche\'s last naturally aspirated V10 supercar and widely considered the most demanding production car ever built. Its 5.7L V10 — derived from a cancelled Le Mans prototype — redlines at 8,400 rpm and produces 603 hp with no electronic driving aids. The ceramic clutch is notoriously difficult to master; its demanding character contributed to tragic accidents including the death of actor Paul Walker.',
    specs: {
      engine:   '5.7L NA V10',
      power:    '603 hp',
      topSpeed: '205 mph',
      weight:   '1,380 kg',
    },
    provenance:
      '1,270 produced (2004–2006). Derived from the cancelled Le Mans LMP900 project. Paul Walker\'s fatal 2013 crash in a Carrera GT drew global attention. Values now exceed $1.5M for clean examples.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Porsche_Carrera_GT_-_Goodwood_Breakfast_Club_%28July_2008%29.jpg/1280px-Porsche_Carrera_GT_-_Goodwood_Breakfast_Club_%28July_2008%29.jpg',
        alt: 'Porsche Carrera GT in silver at Goodwood, the open-top targa roof removed revealing the V10\'s intake stacks',
        primary: true,
      },
    ],
    featured: true,
  },
  {
    slug: 'porsche-918-spyder',
    marqueName: 'porsche',
    name: '918 Spyder',
    year: 2013,
    era: 'modern-classic',
    category: 'Sports',
    description:
      'Porsche\'s first hybrid hypercar, one of the \'Holy Trinity\' alongside the LaFerrari and McLaren P1. The 918 proved that electrification could enhance rather than diminish the supercar experience. It was the first street-legal car to break the 7-minute barrier at the Nürburgring Nordschleife with a 6:57 lap time.',
    specs: {
      engine:   '4.6L NA V8 + 2 Electric Motors',
      power:    '875 hp (combined)',
      topSpeed: '214 mph',
      weight:   '1,674 kg',
    },
    provenance:
      '918 units produced (2013–2015), a number chosen to match the model name. Originally priced at $845,000. Set multiple production car lap records including the Nürburgring 6:57.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Porsche_918_Spyder_IAA_2013.jpg/1280px-Porsche_918_Spyder_IAA_2013.jpg',
        alt: 'Porsche 918 Spyder at the 2013 Frankfurt Motor Show, the liquid silver paint revealing every aerodynamic surface',
        primary: true,
      },
    ],
    featured: true,
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  MERCEDES-BENZ  (3 cars)
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: 'mercedes-benz-300-sl-gullwing',
    marqueName: 'mercedes-benz',
    name: '300 SL Gullwing',
    year: 1954,
    era: 'golden-age',
    category: 'Grand Tourer',
    description:
      'A road car born directly from Mercedes-Benz\'s dominant W194 race car. The 300 SL was the world\'s first production car with mechanical fuel injection, giving it a significant power advantage. Its iconic gullwing doors were an engineering necessity — the tubular space frame chassis made conventional doors impossible.',
    specs: {
      engine:   '3.0L Fuel-Injected Inline-6',
      power:    '215 hp',
      topSpeed: '161 mph',
      weight:   '1,295 kg',
    },
    provenance:
      '1,400 Gullwing coupes built (1954–1957), followed by 1,858 Roadsters (1957–1963). First production car with fuel injection. Prices now range from $1M–$2M+ depending on condition.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/1955_Mercedes-Benz_300SL_Gullwing_Coupe_34.jpg',
        alt: 'Mercedes-Benz 300 SL Gullwing in silver, both iconic gullwing doors raised in the classic welcoming pose',
        primary: true,
      },
    ],
    featured: true,
  },
  {
    slug: 'mercedes-benz-s-class-w126',
    marqueName: 'mercedes-benz',
    name: 'S-Class (W126)',
    year: 1979,
    era: 'muscle-era',
    category: 'Grand Tourer',
    description:
      'The W126 S-Class defined what \'the best car in the world\' meant for an entire generation. It debuted the driver-side airbag (1981) and standard ABS, pioneering safety technologies now universal across all cars. Its build quality was legendary — many examples have exceeded 1 million kilometres.',
    specs: {
      engine:   'Various (2.8L I6 to 5.6L V8)',
      power:    '156–300 hp',
      topSpeed: '155 mph (limited)',
      weight:   '1,600–1,800 kg',
    },
    provenance:
      'Over 818,000 produced (1979–1991), the best-selling S-Class generation. Introduced the first production driver airbag in 1981. The 560 SEL remains the most sought-after variant.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/1987-1991_Mercedes-Benz_300_SEL_%28V_126%29_sedan_%282010-04-03%29_02.jpg/1280px-1987-1991_Mercedes-Benz_300_SEL_%28V_126%29_sedan_%282010-04-03%29_02.jpg',
        alt: 'Mercedes-Benz W126 300 SEL in pearl white, the crisp Sacco-designed bodywork capturing the era of Germanic precision',
        primary: true,
      },
    ],
    featured: false,
  },
  {
    slug: 'mercedes-benz-sls-amg',
    marqueName: 'mercedes-benz',
    name: 'SLS AMG',
    year: 2010,
    era: 'modern-classic',
    category: 'Sports',
    description:
      'Mercedes-AMG\'s first fully in-house developed car and a spiritual successor to the 300 SL Gullwing. The SLS revived the iconic gullwing door configuration with a 6.2L naturally aspirated V8 producing 563 hp. It was also offered as a Black Series (631 hp) and as the world\'s first all-electric supercar, the SLS AMG Electric Drive.',
    specs: {
      engine:   '6.2L NA V8 (AMG M159)',
      power:    '563 hp',
      topSpeed: '197 mph',
      weight:   '1,620 kg',
    },
    provenance:
      'Approximately 2,000 produced per year (2010–2014). Black Series (159 units UK) commands significant premiums. The Electric Drive (2013) produced 740 hp combined from four motors — a preview of AMG\'s electric future.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Mercedes-Benz_SLS_AMG_%28C_197%29_%E2%80%93_Frontansicht_ge%C3%B6ffnet%2C_10._August_2011%2C_D%C3%BCsseldorf.jpg/1280px-Mercedes-Benz_SLS_AMG_%28C_197%29_%E2%80%93_Frontansicht_ge%C3%B6ffnet%2C_10._August_2011%2C_D%C3%BCsseldorf.jpg',
        alt: 'Mercedes-Benz SLS AMG in silver with both gullwing doors open, the long bonnet and mid-mounted V8 on full display',
        primary: true,
      },
    ],
    featured: true,
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  BMW  (3 cars)
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: 'bmw-2002-turbo',
    marqueName: 'bmw',
    name: '2002 Turbo',
    year: 1973,
    era: 'golden-age',
    category: 'Sports',
    description:
      'Europe\'s first turbocharged production car and the spiritual origin of BMW\'s performance DNA. The 2002 series created the \'compact sport sedan\' category, proving that a small, affordable car could deliver genuine driving thrills. The Turbo variant was controversial at launch — its reversed \'Turbo\' decal on the front spoiler was deemed provocative during the 1973 oil crisis.',
    specs: {
      engine:   '2.0L Turbocharged Inline-4',
      power:    '170 hp',
      topSpeed: '130 mph',
      weight:   '1,080 kg',
    },
    provenance:
      'Only 1,672 2002 Turbos built (1973–1974), cut short by the oil crisis. The broader 2002 series sold over 860,000 units. Established the template for every 3-Series that followed.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/8/87/BMW_2002_turbo_%2852870523334%29.jpg',
        alt: 'BMW 2002 Turbo in Chamonix White with the controversial reversed "2002 turbo" front air dam lettering',
        primary: true,
      },
    ],
    featured: true,
  },
  {
    slug: 'bmw-m1',
    marqueName: 'bmw',
    name: 'M1',
    year: 1978,
    era: 'muscle-era',
    category: 'Sports',
    description:
      'BMW\'s first and only true supercar — a mid-engine, Giugiaro-styled sports car developed with Lamborghini. The M1 was built for Group 4/5 motorsport homologation and spawned the legendary Procar Series, where Formula 1 drivers raced identical M1s at GP support events. Though production was small, it established the M brand as a genuine performance force.',
    specs: {
      engine:   '3.5L Inline-6 (M88)',
      power:    '277 hp',
      topSpeed: '162 mph',
      weight:   '1,300 kg',
    },
    provenance:
      '453 road cars and 55 racing cars produced (1978–1981). Development started by Lamborghini before their bankruptcy forced BMW to complete it. The M88 engine later powered the M635CSi and original M5.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/BMW_M1%2C_front_right_%28Brooklyn%29.jpg/1280px-BMW_M1%2C_front_right_%28Brooklyn%29.jpg',
        alt: 'BMW M1 in orange at the Brooklyn Museum, the Giugiaro-designed wedge form with NACA duct side intakes',
        primary: true,
      },
    ],
    featured: true,
  },
  {
    slug: 'bmw-e30-m3',
    marqueName: 'bmw',
    name: 'E30 M3',
    year: 1986,
    era: 'muscle-era',
    category: 'Racing',
    description:
      'The car that launched BMW\'s M division into mainstream consciousness. Built for DTM homologation, the E30 M3\'s high-revving S14 4-cylinder engine, box-flared fenders, and razor-sharp handling made it the benchmark for sports sedans. Its dominance on track — multiple DTM titles, numerous rally victories — cemented the \'M\' badge as a symbol of motorsport excellence.',
    specs: {
      engine:   '2.3L High-Rev Inline-4 (S14)',
      power:    '195 hp (238 hp Sport Evo)',
      topSpeed: '146 mph',
      weight:   '1,165 kg',
    },
    provenance:
      'Approximately 17,970 produced (1986–1991). Won two DTM championships and countless touring car races worldwide. Sport Evolution variant (500 units, 238 hp) is the most collectible, valued over $150K.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/E30_M3_cabrio_wiki.jpg',
        alt: 'BMW E30 M3 in red, the signature boxy rear spoiler and flared arches distinguishing it from the standard 3 Series',
        primary: true,
      },
    ],
    featured: true,
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  VOLKSWAGEN  (2 cars)
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: 'volkswagen-beetle',
    marqueName: 'volkswagen',
    name: 'Beetle (Type 1)',
    year: 1938,
    era: 'golden-age',
    category: 'Roadster',
    description:
      'The car that mobilized the world. Designed by Ferdinand Porsche as an affordable \'people\'s car\', the Beetle became the best-selling single-design automobile in history. Its air-cooled rear-engine layout, simple mechanicals, and cheerful character made it beloved across continents and generations. From post-war Germany to California surf culture, the Beetle transcended transportation to become a cultural icon.',
    specs: {
      engine:   '1.1–1.6L Air-Cooled Flat-4',
      power:    '25–50 hp',
      topSpeed: '80 mph',
      weight:   '840 kg',
    },
    provenance:
      'Over 21.5 million produced (1938–2003), making it the most-produced car of a single design in history. Original production ended in Mexico in 2003. VW later revived the name for the New Beetle (1997) and Beetle A5 (2011).',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/VW_K%C3%A4fer_Baujahr_1966.jpg/1280px-VW_K%C3%A4fer_Baujahr_1966.jpg',
        alt: 'Volkswagen Beetle in pale yellow, the iconic rounded silhouette that became the world\'s most produced single design',
        primary: true,
      },
    ],
    featured: true,
  },
  {
    slug: 'volkswagen-golf-gti-mk1',
    marqueName: 'volkswagen',
    name: 'Golf GTI (Mk1)',
    year: 1976,
    era: 'muscle-era',
    category: 'Sports',
    description:
      'The car that invented the \'hot hatchback\' — a formula of taking an affordable, practical hatchback and injecting genuine sports car performance. The original GTI combined the Golf\'s practicality with a fuel-injected 1.6L engine, sport suspension, and iconic tartan seats. It proved that speed and fun didn\'t require sacrificing everyday usability.',
    specs: {
      engine:   '1.6L Fuel-Injected Inline-4',
      power:    '110 hp',
      topSpeed: '113 mph',
      weight:   '810 kg',
    },
    provenance:
      'Originally intended as a limited run of 5,000 units; overwhelming demand led to over 460,000 Mk1 GTIs sold. The red-stripe grille, golf-ball gear knob, and tartan upholstery became defining design elements copied industry-wide.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Volkswagen_Golf_1-2_%28cropped%29.jpg/1280px-Volkswagen_Golf_1-2_%28cropped%29.jpg',
        alt: 'Volkswagen Golf Mk1 in red, the crisp Giugiaro-designed three-door hatchback that created the hot hatch segment',
        primary: true,
      },
    ],
    featured: true,
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  FORD  (3 cars)
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: 'ford-model-t',
    marqueName: 'ford',
    name: 'Model T',
    year: 1908,
    era: 'golden-age',
    category: 'Roadster',
    description:
      'The car that changed civilization. Henry Ford\'s Model T didn\'t just put America on wheels — its revolutionary moving assembly line transformed global manufacturing forever. By driving the price down from $850 to $260, Ford made the automobile accessible to the average working family for the first time, fundamentally reshaping cities, culture, and the American way of life.',
    specs: {
      engine:   '2.9L Inline-4',
      power:    '20 hp',
      topSpeed: '45 mph',
      weight:   '540 kg',
    },
    provenance:
      'Over 15 million produced (1908–1927). Assembly line innovation reduced build time from 12 hours to 93 minutes. At peak production, a Model T rolled off the line every 24 seconds.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/1925_Ford_Model_T_touring.jpg/1280px-1925_Ford_Model_T_touring.jpg',
        alt: 'Ford Model T touring in black, the high-clearance body and spoke wheels of the car that put the world on wheels',
        primary: true,
      },
    ],
    featured: true,
  },
  {
    slug: 'ford-mustang-1964',
    marqueName: 'ford',
    name: 'Mustang (1st Gen)',
    year: 1964,
    era: 'golden-age',
    category: 'Sports',
    description:
      'The original pony car and one of the most culturally significant automobiles in history. Introduced at the 1964 World\'s Fair, the Mustang created an entirely new market segment of affordable, sporty personal coupes. It sold 22,000 units on its first day and over 400,000 in its first year — a record that stood for decades.',
    specs: {
      engine:   '4.7L V8 (Hi-Po K-code)',
      power:    '271 hp',
      topSpeed: '120 mph',
      weight:   '1,160 kg',
    },
    provenance:
      'Over 1 million produced in the first 18 months (1964–1966). Lee Iacocca\'s vision for a sports car for the masses. The 1968 Mustang featured in Bullitt remains the most famous chase car in cinema.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/1965_Ford_Mustang_2D_Hardtop_Front.jpg/1280px-1965_Ford_Mustang_2D_Hardtop_Front.jpg',
        alt: '1965 Ford Mustang 2-door hardtop in Wimbledon White, the long hood short deck proportions that defined the pony car',
        primary: true,
      },
    ],
    featured: true,
  },
  {
    slug: 'ford-gt40',
    marqueName: 'ford',
    name: 'GT40',
    year: 1966,
    era: 'golden-age',
    category: 'Racing',
    description:
      'Born from Henry Ford II\'s vendetta against Enzo Ferrari after a failed acquisition deal. The GT40 was built with one mission: beat Ferrari at Le Mans. It succeeded spectacularly, winning the 24 Hours of Le Mans four consecutive years (1966–1969), including a legendary 1-2-3 finish in 1966. The story was immortalized in the 2019 film \'Ford v Ferrari\'.',
    specs: {
      engine:   '7.0L Ford V8 (Mk II)',
      power:    '485 hp',
      topSpeed: '210 mph',
      weight:   '1,100 kg',
    },
    provenance:
      'Approximately 105 GT40s built across all variants (1964–1969). Named GT40 because it stood just 40 inches (101.6 cm) tall. The modern Ford GT (2005, 2017) pays homage to this legend.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/GT40_at_Goodwood.jpg/1280px-GT40_at_Goodwood.jpg',
        alt: 'Ford GT40 at Goodwood in Gulf Oil livery, the impossibly low racing silhouette that four times conquered Le Mans',
        primary: true,
      },
    ],
    featured: true,
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  MERCEDES-BENZ  additional (5 cars — total 8)
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: 'mercedes-benz-w113-sl',
    marqueName: 'mercedes-benz',
    name: '280 SL "Pagoda"',
    year: 1968,
    era: 'golden-age',
    category: 'Roadster',
    description:
      'Nicknamed "Pagoda" for its concave hardtop roof, the W113 SL was the jet-set roadster of the 1960s. Designed by Paul Bracq as a smaller, more elegant successor to the 300 SL, it offered a perfect balance of open-air motoring and grand touring refinement. The pagoda roofline was structurally functional as well as visually distinctive.',
    specs: {
      engine:   '2.8L Inline-6',
      power:    '170 hp',
      topSpeed: '124 mph',
      weight:   '1,295 kg',
    },
    provenance:
      '48,912 produced across 230/250/280 SL variants (1963–1971). Favored by royalty and celebrities including Brigitte Bardot and Sophia Loren. The 280 SL final variant is the most desirable.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/1969_Mercedes-Benz_280_SL_%28W_113%29_roadster_%282011-10-31%29_01.jpg/1280px-1969_Mercedes-Benz_280_SL_(W_113)_roadster_(2011-10-31)_01.jpg',
        alt: 'Mercedes-Benz 280 SL W113 Pagoda in white with the distinctive concave hardtop, three-quarter front view',
        primary: true,
      },
    ],
    featured: true,
  },
  {
    slug: 'mercedes-benz-600',
    marqueName: 'mercedes-benz',
    name: '600 Grosser',
    year: 1963,
    era: 'golden-age',
    category: 'Grand Tourer',
    description:
      'The definitive car of power and prestige. The 600 Grosser was ordered by heads of state, dictators, rock stars, and royalty — its client list read like a who\'s who of mid-century power. Every function was controlled by a hydraulic system powered by an engine-driven pump: windows, sunroof, seats, door locks, even the trunk lid.',
    specs: {
      engine:   '6.3L V8 (M100)',
      power:    '300 hp',
      topSpeed: '127 mph',
      weight:   '2,600 kg',
    },
    provenance:
      '2,677 produced (1963–1981). Clients included Elvis Presley, Coco Chanel, Hugh Hefner, Mao Zedong, Kim Il-sung, and Pope Paul VI. The Pullman 6-door limousine (428 units) is the ultimate variant.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Mercedes-Benz_600_vl_silver_TCE.jpg/1280px-Mercedes-Benz_600_vl_silver_TCE.jpg',
        alt: 'Mercedes-Benz 600 Grosser in silver, the massive long-wheelbase limousine that served heads of state worldwide',
        primary: true,
      },
    ],
    featured: true,
  },
  {
    slug: 'mercedes-benz-190e-23-16',
    marqueName: 'mercedes-benz',
    name: '190E 2.3-16',
    year: 1984,
    era: 'muscle-era',
    category: 'Sports',
    description:
      'The car that proved Mercedes could build a racer. Developed with Cosworth, the 16-valve cylinder head transformed the baby 190 sedan into a motorsport weapon. At the 1984 Nürburgring debut race, a 24-year-old Ayrton Senna won the celebrity contest — beating Niki Lauda, Carlos Reutemann, and Carlos Pace in identical cars.',
    specs: {
      engine:   '2.3L DOHC 16V Inline-4 (Cosworth)',
      power:    '185 hp',
      topSpeed: '146 mph',
      weight:   '1,145 kg',
    },
    provenance:
      '5,302 produced (1984–1988). The 2.5-16 Evolution II (502 units, 235 hp) is the pinnacle variant. Senna\'s Nürburgring win in the 190E launch race remains one of motorsport\'s great coming-of-age moments.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/1993_190E_2.3.jpg/1280px-1993_190E_2.3.jpg',
        alt: 'Mercedes-Benz 190E in dark silver, the compact rear-wheel-drive sedan that Cosworth turned into a racing weapon',
        primary: true,
      },
    ],
    featured: true,
  },
  {
    slug: 'mercedes-benz-clk-gtr',
    marqueName: 'mercedes-benz',
    name: 'CLK GTR',
    year: 1997,
    era: 'muscle-era',
    category: 'Racing',
    description:
      'The most extreme road-legal car Mercedes-Benz ever produced. Built purely to homologate 25 road cars for FIA GT1 racing, the CLK GTR is a race car with number plates. Its mid-mounted 6.9L V12 dominates the cabin, leaving no space for carpets or insulation. It dominated the 1997 FIA GT Championship, winning 11 of 12 rounds in its debut year.',
    specs: {
      engine:   '6.9L NA V12',
      power:    '604 hp',
      topSpeed: '214 mph',
      weight:   '1,390 kg',
    },
    provenance:
      '26 road cars (20 coupes + 6 roadsters) produced to satisfy homologation minimum. Original price DM 3.0 million. Auction values now approach $10M for low-mileage examples — among the rarest Mercedes ever built.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Mercedes-Benz_CLK_GTR_at_Goodwood_2014_001.jpg/1280px-Mercedes-Benz_CLK_GTR_at_Goodwood_2014_001.jpg',
        alt: 'Mercedes-Benz CLK GTR at Goodwood 2014, the massive road-legal race car with its distinctive high rear tail',
        primary: true,
      },
    ],
    featured: true,
  },
  {
    slug: 'mercedes-benz-amg-gt',
    marqueName: 'mercedes-benz',
    name: 'AMG GT',
    year: 2014,
    era: 'modern-classic',
    category: 'Sports',
    description:
      'Mercedes-AMG\'s first fully independent sports car and the spiritual successor to the SLS. The AMG GT\'s front-mid-mounted twin-turbo V8 and rear-transaxle layout deliver near-perfect weight distribution. The GT Black Series (2020, 720 hp) set a 6:43 production car Nürburgring record, and continues the SLS tradition of extreme performance.',
    specs: {
      engine:   '4.0L Twin-Turbo V8 (AMG M178)',
      power:    '462–720 hp',
      topSpeed: '197 mph',
      weight:   '1,540 kg',
    },
    provenance:
      'Production 2014–2024. Black Series (900 units, 720 hp) holds multiple lap records. The AMG GT3/GT4/GT63 racing variants dominate GT racing globally. Final year of production marks end of pure AMG sports car era.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Festival_automobile_international_2015_-_Mercedes_AMG_GT_-_003.jpg/1280px-Festival_automobile_international_2015_-_Mercedes_AMG_GT_-_003.jpg',
        alt: 'Mercedes-AMG GT in silver at the 2015 Paris Motor Show, the long bonnet and athletic haunches of the AMG sports car',
        primary: true,
      },
    ],
    featured: false,
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  BMW  additional (5 cars — total 8)
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: 'bmw-507',
    marqueName: 'bmw',
    name: '507',
    year: 1956,
    era: 'golden-age',
    category: 'Roadster',
    description:
      'Designed by Count Albrecht Goertz and widely regarded as one of the most beautiful automobiles ever created. The 507 was BMW\'s challenge to the Mercedes-Benz 300 SL — a V8-powered roadster aimed at the American export market. Elvis Presley famously owned one during his military service in Germany and spray-painted it red to deter fans.',
    specs: {
      engine:   '3.2L V8 (M507)',
      power:    '150 hp',
      topSpeed: '136 mph',
      weight:   '1,330 kg',
    },
    provenance:
      'Only 252 produced (1956–1959). Sold at a loss — the financial strain contributed to BMW\'s near-bankruptcy in 1959. Elvis Presley\'s restored example is now displayed at BMW Museum Munich. Values exceed $2M.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/BMW_507.jpg/1280px-BMW_507.jpg',
        alt: 'BMW 507 in silver, Albrecht Goertz\'s masterpiece roadster with its perfectly proportioned long bonnet and twin nostrils',
        primary: true,
      },
    ],
    featured: true,
  },
  {
    slug: 'bmw-e34-m5',
    marqueName: 'bmw',
    name: 'E34 M5',
    year: 1988,
    era: 'muscle-era',
    category: 'Sports',
    description:
      'The definitive performance luxury sedan of its era. The E34 M5\'s hand-built S38 straight-six traced its lineage directly to the M1 supercar. Hand-assembled at BMW\'s Garching facility with no robotic production, every engine was signed by its builder. It proved that a four-door saloon could embarrass dedicated sports cars on track without sacrificing daily usability.',
    specs: {
      engine:   '3.5–3.8L NA Inline-6 (S38)',
      power:    '311–340 hp',
      topSpeed: '155 mph (limited)',
      weight:   '1,670 kg',
    },
    provenance:
      '12,254 E34 M5s produced (1988–1995). Final 3.8L Touring variant (891 units) is the rarest. Each S38 engine hand-assembled and signed at Garching. Values for clean examples now exceed $60K.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/BMW_M5_%281993%29_%2853686112505%29.jpg',
        alt: 'BMW M5 E34 in silver, the discreetly powerful performance sedan with its wider arches and subtle M-Sport bodywork',
        primary: true,
      },
    ],
    featured: true,
  },
  {
    slug: 'bmw-e31-8-series',
    marqueName: 'bmw',
    name: '8 Series (E31)',
    year: 1989,
    era: 'muscle-era',
    category: 'Grand Tourer',
    description:
      'BMW\'s most technologically ambitious car of the 1990s and a dramatic grand tourer ahead of its time. The 8 Series featured fly-by-wire throttle, four-wheel steering, and a pillarless hardtop coupe body. The legendary M8 prototype — fitted with a 550 hp V12 borrowed from the McLaren F1 project — was cancelled by management, a decision widely lamented.',
    specs: {
      engine:   '4.0–5.6L V8 / V12',
      power:    '296–322 hp',
      topSpeed: '155 mph (limited)',
      weight:   '1,760 kg',
    },
    provenance:
      '30,621 produced (1989–1999). The V12-powered 850CSi (1,510 units, 380 hp) is the enthusiast\'s choice. Development cost exceeded DM 2 billion. The M8 prototype (1 unit, 550 hp) exists at BMW Museum.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/BMW_850i_E31_-_Flickr_-_Alexandre_Pr%C3%A9vot_Crop.jpg/1280px-BMW_850i_E31_-_Flickr_-_Alexandre_Pr%C3%A9vot_Crop.jpg',
        alt: 'BMW 850i E31 in white, the dramatic pillarless coupe with pop-up headlights and low wedge profile',
        primary: true,
      },
    ],
    featured: false,
  },
  {
    slug: 'bmw-z8',
    marqueName: 'bmw',
    name: 'Z8',
    year: 2000,
    era: 'modern-classic',
    category: 'Roadster',
    description:
      'A 21st-century tribute to the legendary 507. Designed by Henrik Fisker, the Z8 reinterpreted Goertz\'s 1956 masterpiece with modern proportions and a 394 hp V8 borrowed from the E39 M5. James Bond drove one in The World Is Not Enough (1999) — although the villain promptly cut it in half with a sawmill, which felt rather ungrateful.',
    specs: {
      engine:   '5.0L NA V8 (S62)',
      power:    '394 hp',
      topSpeed: '155 mph (limited)',
      weight:   '1,585 kg',
    },
    provenance:
      '5,703 produced (2000–2003), each with a numbered certificate of authenticity. The Alpina Z8 (555 units, 450 hp) is the rarest. Values for unmolested examples have climbed steadily past $200K.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/BMW_Z8_front_20100508.jpg/1280px-BMW_Z8_front_20100508.jpg',
        alt: 'BMW Z8 in silver, Henrik Fisker\'s modern 507 tribute with traditional round instrument binnacle and silver-spoke wheels',
        primary: true,
      },
    ],
    featured: true,
  },
  {
    slug: 'bmw-e46-m3-csl',
    marqueName: 'bmw',
    name: 'E46 M3 CSL',
    year: 2003,
    era: 'modern-classic',
    category: 'Sports',
    description:
      'The most focused M3 ever made and a benchmark driver\'s car of its generation. CSL (Coupe Sport Leichtbau) shed 110 kg from the standard M3 through a carbon fibre roof, polycarbonate rear window, and deleted sound insulation. In period testing it lapped the Nürburgring Nordschleife in 7:50 — faster than a contemporary Ferrari 360 Modena.',
    specs: {
      engine:   '3.2L NA Inline-6 (S54)',
      power:    '360 hp',
      topSpeed: '155 mph (limited)',
      weight:   '1,385 kg',
    },
    provenance:
      'Only 1,383 produced (2003). Never officially sold in the USA. Now among the most sought-after modern BMWs at $100K–$200K+. The CSL\'s carbon roof panel is structurally bonded — replacement costs exceed $20K.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/BMW_M3_CSL_%28E46%29.jpg',
        alt: 'BMW M3 CSL E46 in carbon black metallic, the lightweight M3 that outpaced Ferrari on the Nürburgring',
        primary: true,
      },
    ],
    featured: true,
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  TOYOTA  (4 cars)
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: 'toyota-2000gt',
    marqueName: 'toyota',
    name: '2000GT',
    year: 1967,
    era: 'golden-age',
    category: 'Grand Tourer',
    description:
      'Japan\'s first true supercar and one of the most beautiful automobiles ever built. A joint venture between Toyota and Yamaha, the 2000GT combined a twin-cam inline-6 with a perfectly balanced chassis and stunning Satoru Nozaki styling. It appeared as the first Japanese Bond car in \'You Only Live Twice\' (1967) and proved that Japanese engineering could rival the best from Europe.',
    specs: {
      engine:   '2.0L DOHC Inline-6',
      power:    '150 hp',
      topSpeed: '135 mph',
      weight:   '1,120 kg',
    },
    provenance:
      'Only 351 produced (1967–1970), making it one of the rarest Japanese classics. The two convertibles built for the Bond film are the most valuable. Prices now exceed $1M for clean examples — extraordinary for any Japanese car.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/9/97/TOYOTA_2000GT.jpg',
        alt: 'Toyota 2000GT in white, the long-bonnet fastback GT silhouette that announced Japan\'s arrival in the supercar world',
        primary: true,
      },
    ],
    featured: true,
  },
  {
    slug: 'toyota-ae86',
    marqueName: 'toyota',
    name: 'AE86 Sprinter Trueno',
    year: 1983,
    era: 'muscle-era',
    category: 'Sports',
    description:
      'The last rear-wheel-drive compact Toyota and the car that defined a generation of Japanese motorsport. The AE86\'s high-revving 4A-GE twin-cam engine, light weight, and balanced chassis made it a motorsport weapon on a budget. Immortalized as the Hachi-Roku in the manga/anime \'Initial D\', the AE86 became the global symbol of grassroots drifting culture.',
    specs: {
      engine:   '1.6L 4A-GE Twin-Cam Inline-4',
      power:    '128 hp',
      topSpeed: '118 mph',
      weight:   '940 kg',
    },
    provenance:
      'Approximately 400,000 AE86 variants produced (1983–1987) across Corolla Levin and Sprinter Trueno body styles. The Trueno (pop-up headlights) is more collectible. Tofu delivery legend courtesy of Initial D has driven global cult status.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/1983_Toyota_Corolla_Levin.jpg/1280px-1983_Toyota_Corolla_Levin.jpg',
        alt: '1983 Toyota Corolla Levin AE86 in white and black, the fixed headlights and pop-up grille that defined the Hachi-Roku',
        primary: true,
      },
    ],
    featured: true,
  },
  {
    slug: 'toyota-corolla',
    marqueName: 'toyota',
    name: 'Corolla (E10)',
    year: 1966,
    era: 'golden-age',
    category: 'Roadster',
    description:
      'The best-selling car nameplate in automotive history. The original E10 Corolla established Toyota\'s philosophy of delivering reliable, affordable, fuel-efficient transportation to the world. Over 12 generations and nearly 60 years, the Corolla has served as transportation backbone for millions of families in over 150 countries.',
    specs: {
      engine:   '1.1L K-series Inline-4',
      power:    '60 hp',
      topSpeed: '85 mph',
      weight:   '685 kg',
    },
    provenance:
      'Over 50 million sold across 12 generations since 1966, making it the best-selling car nameplate ever. Surpassed the VW Beetle\'s record in 1997. The E10 original is now a cherished Japanese classic.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/6/62/1966_Toyota_Corolla_01.jpg',
        alt: '1966 Toyota Corolla E10 in white, the compact sedan that launched the world\'s best-selling nameplate',
        primary: true,
      },
    ],
    featured: false,
  },
  {
    slug: 'toyota-supra-a80',
    marqueName: 'toyota',
    name: 'Supra (A80 / Mk4)',
    year: 1993,
    era: 'modern-classic',
    category: 'Sports',
    description:
      'The A80 Supra achieved legendary status through its bulletproof 2JZ-GTE twin-turbo inline-6 engine, capable of handling over 1,000 hp with stock internals. It became the ultimate tuner car and JDM icon, cemented in popular culture by Paul Walker\'s orange Supra in \'The Fast and the Furious\' (2001). The 2JZ engine\'s overengineered reliability made it the foundation of an entire aftermarket industry.',
    specs: {
      engine:   '3.0L 2JZ-GTE Twin-Turbo Inline-6',
      power:    '276 hp (320 hp actual)',
      topSpeed: '155 mph (limited)',
      weight:   '1,510 kg',
    },
    provenance:
      'Produced 1993–2002. The 2JZ engine could reliably produce 1,000+ hp with modifications. Values have skyrocketed from under $40K to over $150K+ for clean examples, driven by Fast & Furious nostalgia and JDM collector demand.',
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Toyota_Supra_JZA80%2C_Bangladesh._%2830982360318%29.jpg',
        alt: 'Toyota Supra JZA80 A80 Mk4 in red, the wide-body twin-turbo icon that became the world\'s most famous tuner car',
        primary: true,
      },
    ],
    featured: true,
  },
]

// ── Seed logic ───────────────────────────────────────────────────────────────
async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected')

    // Clear existing data (idempotent)
    await Promise.all([Marque.deleteMany(), Car.deleteMany()])
    console.log('Cleared existing data')

    // Insert marques, build slug → ObjectId map
    const insertedMarques = await Marque.insertMany(MARQUES)
    const marqueMap = Object.fromEntries(
      insertedMarques.map((m) => [m.slug, m._id])
    )
    console.log(`Inserted ${insertedMarques.length} marques`)

    // Insert cars — resolve marqueName → ObjectId
    const carsToInsert = CARS_DATA.map(({ marqueName, ...car }) => ({
      ...car,
      marque: marqueMap[marqueName],
    }))

    const insertedCars = await Car.insertMany(carsToInsert)
    console.log(`Inserted ${insertedCars.length} cars`)

    console.log('\nSeed complete!')
    console.log('  Marques:', MARQUES.map((m) => m.name).join(', '))
    console.log('\n  Cars by brand:')
    MARQUES.forEach((marque) => {
      const brandCars = CARS_DATA.filter((c) => c.marqueName === marque.slug)
      console.log(`    ${marque.name} (${brandCars.length}): ${brandCars.map((c) => c.name).join(', ')}`)
    })
  } catch (err) {
    console.error('Seed error:', err.message)
    process.exit(1)
  } finally {
    await mongoose.disconnect()
  }
}

seed()
