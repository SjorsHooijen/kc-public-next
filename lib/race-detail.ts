export interface Winner {
  year: number
  name: string
}

export interface RaceDetail {
  id: string
  eventName: string
  heroImage: string
  heroObjectPosition: string
  permanence?: string
  startFinish?: string
  lapLengthKm?: number
  laps?: number
  startNote?: string        // extra start-time detail (e.g. proloog time)
  website?: string
  websiteLabel?: string
  winners: Winner[]
  photos: string[]
  isFirstEdition?: boolean
  finaleNote?: string
}

function photos(slug: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) => `/images/races/${slug}/photo-${i + 1}.jpg`)
}

export const RACE_DETAILS: Record<string, RaceDetail> = {
  veldhoven: {
    id: 'veldhoven',
    eventName: 'ASML Wielerweekend Omloop der Kempen',
    heroImage: '/images/races/veldhoven/hero.jpg',
    heroObjectPosition: 'center 40%',
    permanence: "Dorpshuis d'n Bond, Rapportstraat 29, 5504 BN Veldhoven",
    startFinish: 'Dorpstraat Veldhoven',
    lapLengthKm: 1.4,
    laps: 28,
    website: 'https://www.omloopderkempen.nl',
    websiteLabel: 'omloopderkempen.nl',
    winners: [
      { year: 2018, name: 'Dirk Jansen' },
      { year: 2019, name: 'Anton Vervecken' },
      { year: 2024, name: 'Tim Kragten' },
      { year: 2025, name: 'Anton Vervecken' },
    ],
    photos: photos('veldhoven', 5),
  },

  westerhoven: {
    id: 'westerhoven',
    eventName: 'Westerhovense Wielerronde',
    heroImage: '/images/races/westerhoven/hero.jpg',
    heroObjectPosition: 'center 25%',
    permanence: 'De Buitengaander',
    startFinish: 'Provincialeweg',
    lapLengthKm: 1.5,
    website: 'https://www.westerhoven-events.nl',
    websiteLabel: 'westerhoven-events.nl',
    winners: [
      { year: 2018, name: 'Dirk Jansen' },
      { year: 2019, name: 'Maarten Christis' },
      { year: 2022, name: 'Sebastiaan Deckers' },
      { year: 2023, name: 'Tim Kragten' },
      { year: 2024, name: 'Kristof Tielemans' },
      { year: 2025, name: 'Pieter Fleerakkers' },
    ],
    photos: photos('westerhoven', 9),
  },

  riethoven: {
    id: 'riethoven',
    eventName: 'Ronde van Riethoven (33e editie)',
    heroImage: '/images/races/riethoven/hero.jpg',
    heroObjectPosition: 'center 30%',
    permanence: 'De Sleutel, Dorpsstraat 1a',
    startFinish: 'Dorpsstraat',
    lapLengthKm: 2.7,
    laps: 15,
    website: 'https://www.swer.nl',
    websiteLabel: 'swer.nl',
    winners: [
      { year: 2018, name: 'Guido Crutzen' },
      { year: 2019, name: 'Roy Hoogmartens' },
      { year: 2022, name: 'Tom Hens' },
      { year: 2023, name: 'Gijs Aarts' },
      { year: 2024, name: 'Tim Kragten' },
      { year: 2025, name: 'Frans Ruwe' },
    ],
    photos: photos('riethoven', 5),
  },

  luyksgestel: {
    id: 'luyksgestel',
    eventName: '55ste Kermisronde van Luyksgestel',
    heroImage: '/images/races/luyksgestel/hero.jpg',
    heroObjectPosition: 'center 20%',
    permanence: 'Den Eijkholt',
    startFinish: 'Dorpstraat',
    lapLengthKm: 2,
    laps: 18,
    startNote: 'Proloog 14:00u · Wedstrijd 16:30u',
    website: 'https://www.wielerevenementen-luyksgestel.nl',
    websiteLabel: 'wielerevenementen-luyksgestel.nl',
    winners: [
      { year: 2018, name: 'Wout Verbeek' },
      { year: 2019, name: 'Rinus Verhorevoort' },
      { year: 2022, name: 'Luke van de Put' },
      { year: 2023, name: 'Niels Vreys' },
      { year: 2024, name: 'Tim Kragten' },
      { year: 2025, name: 'Jente Sneyders' },
    ],
    photos: photos('luyksgestel', 5),
  },

  bergeijk: {
    id: 'bergeijk',
    eventName: 'Kermis Ronde van Bergeijk',
    heroImage: '/images/races/bergeijk/hero.jpg',
    heroObjectPosition: 'center 35%',
    permanence: 'Bij de VIP tent (ter hoogte van het gemeentehuis)',
    startFinish: 'Burgemeester Magneestraat',
    lapLengthKm: 1.8,
    website: 'https://www.wielercomite-bergeijk.nl',
    websiteLabel: 'wielercomite-bergeijk.nl',
    winners: [
      { year: 2023, name: 'Bas Beljaars' },
      { year: 2024, name: 'Wout Verbeek' },
      { year: 2025, name: 'Gijs Aarts' },
    ],
    photos: [],
  },

  duizel: {
    id: 'duizel',
    eventName: 'Kermis Ronde van Duizel',
    heroImage: '/images/races/duizel/hero.jpg',
    heroObjectPosition: 'center 20%',
    website: 'https://www.wielerrondeduizel.nl',
    websiteLabel: 'wielerrondeduizel.nl',
    winners: [
      { year: 2019, name: 'Maarten Christis' },
      { year: 2022, name: 'Roy Hoogmartens' },
      { year: 2023, name: 'Filip Scholliers' },
      { year: 2024, name: 'Job Peters' },
      { year: 2025, name: 'Job Petersen' },
    ],
    photos: photos('duizel', 3),
  },

  steensel: {
    id: 'steensel',
    eventName: 'Ronde van Steensel (43e editie)',
    heroImage: '/images/races/steensel/hero.jpg',
    heroObjectPosition: 'center 30%',
    permanence: 'Basisschool St Lucy, Hoogeind 4',
    startFinish: 'Riethovenseweg',
    lapLengthKm: 1.6,
    laps: 25,
    website: 'https://www.wielerrondesteensel.nl',
    websiteLabel: 'wielerrondesteensel.nl',
    winners: [
      { year: 2018, name: 'Wout van Verbeek' },
      { year: 2019, name: 'Maarten Christis' },
      { year: 2022, name: 'Birger Vandael' },
      { year: 2023, name: 'Kristof Tielemans' },
      { year: 2024, name: 'Nick Sesink' },
      { year: 2025, name: 'Stan Overgoor' },
    ],
    photos: photos('steensel', 5),
  },

  weebosch: {
    id: 'weebosch',
    eventName: 'Weebosch Kermisronde',
    heroImage: '/images/races/weebosch/hero.jpg',
    heroObjectPosition: 'center 25%',
    permanence: "'T Kroontje, Weebosch 70",
    startFinish: 'bij de Kerk',
    lapLengthKm: 0.9,
    laps: 54,
    website: 'https://www.kermisweebosch.nl',
    websiteLabel: 'kermisweebosch.nl',
    winners: [
      { year: 2018, name: 'Wout Verbeek' },
      { year: 2019, name: 'Anton Vervecken' },
      { year: 2022, name: 'Rinus Verhorenvoort' },
      { year: 2023, name: 'Gijs Aarts' },
      { year: 2024, name: 'Nick Sesink' },
      { year: 2025, name: 'Gijs Aarts' },
    ],
    photos: photos('weebosch', 5),
  },

  loo: {
    id: 'loo',
    eventName: "'T Loo Wielerronde — 1e deelname KempenCup + eindhuldiging",
    heroImage: '/images/races/loo/hero.jpg',
    heroObjectPosition: 'center center',
    permanence: 'Frater Romboutsstraat (nabij VIP tent)',
    startFinish: 'Loo',
    lapLengthKm: 2,
    laps: 20,
    website: 'https://www.wielerrondehetloo.nl',
    websiteLabel: 'wielerrondehetloo.nl',
    winners: [],
    photos: photos('loo', 2),
    isFirstEdition: true,
    finaleNote:
      'De KempenCup 2026 wordt afgesloten met de officiële prijsuitreiking na de race. De winnaar van het eindklassement wordt op het podium gehuldigd voor alle toeschouwers.',
  },
}
