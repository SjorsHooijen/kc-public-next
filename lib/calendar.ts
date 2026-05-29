// Shared 2026 race calendar data — used by /wedstrijden and /wedstrijden/[slug]

import IMAGES from '@/config/images'

export interface CalendarRace {
  id: string
  date: string       // YYYY-MM-DD
  day: string        // Dutch weekday, capitalised
  dateDay: string    // '16'
  dateMonth: string  // 'MEI'
  name: string
  shortName: string  // city name only
  location: string
  isKC: boolean
  isFinale: boolean
  imageUrl: string
  startTime?: string
  distanceKm?: number
  description: string
}

export const ALL_RACES: CalendarRace[] = [
  {
    id: 'geldrop',
    date: '2026-04-26', day: 'Zondag', dateDay: '26', dateMonth: 'APR',
    name: 'Ronde van Geldrop', shortName: 'Geldrop', location: 'Geldrop',
    isKC: false, isFinale: false,
    imageUrl: IMAGES.races.geldrop,
    startTime: '14:00', distanceKm: 80,
    description: 'De Ronde van Geldrop is een lokale wielerwedstrijd in de gemeente Geldrop-Mierlo, maar maakt geen deel uit van de KempenCup 2026. Een mooie warming-up voor het seizoen door de straten van Geldrop.',
  },
  {
    id: 'veldhoven',
    date: '2026-05-16', day: 'Zaterdag', dateDay: '16', dateMonth: 'MEI',
    name: 'Ronde van Veldhoven', shortName: 'Veldhoven', location: 'Veldhoven',
    isKC: true, isFinale: false,
    imageUrl: IMAGES.races.veldhoven,
    startTime: '16:15', distanceKm: 75,
    description: 'De Ronde van Veldhoven trapt het KempenCup-seizoen af met een technisch en veeleisend parcours door de woonwijken en bedrijventerreinen van Veldhoven. Goed voor liefhebbers van korte rondes met veel bochtenwerk.',
  },
  {
    id: 'westerhoven',
    date: '2026-05-30', day: 'Zaterdag', dateDay: '30', dateMonth: 'MEI',
    name: 'Ronde van Westerhoven', shortName: 'Westerhoven', location: 'Westerhoven',
    isKC: true, isFinale: false,
    imageUrl: IMAGES.races.westerhoven,
    startTime: '13:00', distanceKm: 70,
    description: 'Westerhoven verwelkomt de KempenCup op een schilderachtig parcours door het rustige dorpskern en de omliggende landbouwwegen. Een wedstrijd waarbij de lokale sfeer en het publiek langs de kant altijd indruk maken.',
  },
  {
    id: 'riethoven',
    date: '2026-06-22', day: 'Maandag', dateDay: '22', dateMonth: 'JUN',
    name: 'Ronde van Riethoven', shortName: 'Riethoven', location: 'Riethoven',
    isKC: true, isFinale: false,
    imageUrl: IMAGES.races.riethoven,
    startTime: '17:00', distanceKm: 65,
    description: 'De avondwedstrijd in Riethoven staat bekend om haar snelle start en de technische afdaling richting de Dommel. Het gezellige dorp in de gemeente Bergeijk biedt een uniek wielrenspektakel op de lange maandagavonden van juni.',
  },
  {
    id: 'hapert',
    date: '2026-06-24', day: 'Woensdag', dateDay: '24', dateMonth: 'JUN',
    name: 'Ronde van Hapert', shortName: 'Hapert', location: 'Hapert',
    isKC: false, isFinale: false,
    imageUrl: IMAGES.races.hapert,
    startTime: '19:00', distanceKm: 60,
    description: 'De Ronde van Hapert is een gevestigde wielerwedstrijd in de Kempen, maar staat buiten de KempenCup 2026. Desalniettemin een mooie avondkoers door de gemeente Bladel voor liefhebbers van de streek.',
  },
  {
    id: 'bladel',
    date: '2026-06-28', day: 'Zondag', dateDay: '28', dateMonth: 'JUN',
    name: 'Ronde van Bladel', shortName: 'Bladel', location: 'Bladel',
    isKC: false, isFinale: false,
    imageUrl: IMAGES.races.bladel,
    startTime: '14:30', distanceKm: 85,
    description: 'De Ronde van Bladel trekt elk jaar veel deelnemers uit de regio, maar valt buiten de KempenCup 2026. Een koers door het groene hart van de gemeente Bladel met een finish in het dorpscentrum.',
  },
  {
    id: 'luyksgestel',
    date: '2026-06-29', day: 'Maandag', dateDay: '29', dateMonth: 'JUN',
    name: 'Ronde van Luyksgestel', shortName: 'Luyksgestel', location: 'Luyksgestel',
    isKC: true, isFinale: false,
    imageUrl: IMAGES.races.luyksgestel,
    distanceKm: 72,
    description: 'Luyksgestel, het meest zuidwestelijke dorp van Nederland, herbergt een van de meest pittoreske KempenCup-wedstrijden. Het parcours kruist de grens met België en slingert door de heide- en bosgebieden van de Kempen.',
  },
  {
    id: 'bergeijk',
    date: '2026-07-12', day: 'Zondag', dateDay: '12', dateMonth: 'JUL',
    name: 'Ronde van Bergeijk', shortName: 'Bergeijk', location: 'Bergeijk',
    isKC: true, isFinale: false,
    imageUrl: IMAGES.races.bergeijk,
    startTime: '16:30', distanceKm: 90,
    description: 'Bergeijk, de gemeente met de meeste KempenCup-wedstrijden op haar grondgebied, toont zich hier van haar sportieve kant. Een koers door de rijke natuur van de Kempen, met smalle dorpswegen en een vurige finish voor de kerk.',
  },
  {
    id: 'duizel',
    date: '2026-07-27', day: 'Maandag', dateDay: '27', dateMonth: 'JUL',
    name: 'Ronde van Duizel', shortName: 'Duizel', location: 'Duizel',
    isKC: true, isFinale: false,
    imageUrl: IMAGES.races.duizel,
    startTime: '15:00', distanceKm: 68,
    description: 'Het compacte dorpje Duizel organiseert een avontuurlijk parcours met typische Kempische zandpaden en smalle dorpsstraten. Een sfeervolle zomerse maandagmiddag op de fiets, met een vrolijk festijn rondom de finish.',
  },
  {
    id: 'steensel',
    date: '2026-08-10', day: 'Maandag', dateDay: '10', dateMonth: 'AUG',
    name: 'Ronde van Steensel', shortName: 'Steensel', location: 'Steensel',
    isKC: true, isFinale: false,
    imageUrl: IMAGES.races.steensel,
    startTime: '17:00', distanceKm: 70,
    description: 'Steensel markeert het begin van het slot van de KempenCup. De wedstrijd voert door rustige polderwegen en slingert langs de beekdalen van de Kempen. Het klassement begint zijn definitieve vorm te krijgen.',
  },
  {
    id: 'weebosch',
    date: '2026-09-05', day: 'Zaterdag', dateDay: '5', dateMonth: 'SEP',
    name: 'Ronde van Weebosch', shortName: 'Weebosch', location: 'Weebosch',
    isKC: true, isFinale: false,
    imageUrl: IMAGES.races.weebosch,
    startTime: '17:15', distanceKm: 75,
    description: 'De voorlaatste KempenCup-manche in Weebosch is een ware krachtmeting. Op dit punt in het seizoen staat er veel op het spel voor de klassementsrenners. Het parcours loopt door de uitgestrekte bossen en velden rondom dit afgelegen dorp.',
  },
  {
    id: 'loo',
    date: '2026-09-19', day: 'Zaterdag', dateDay: '19', dateMonth: 'SEP',
    name: "Ronde van 't Loo",  shortName: "'t Loo",  location: "'t Loo, Bergeijk",
    isKC: true, isFinale: true,
    imageUrl: IMAGES.races.bergeijk,
    startTime: '15:30', distanceKm: 80,
    description: "De Grote Finale van de KempenCup 2026 in 't Loo is het hoogtepunt van het wielerjaar in de Kempen. In dit pittoreske gehucht van Bergeijk wordt de definitieve KempenCup-winnaar gekroond. Publiek, spanning en een onvergetelijke sfeer maken dit de meest bijzondere dag van het seizoen.",
  },
]

export const MONTHS = [
  { key: 'mei', label: 'Mei',       ids: ['veldhoven', 'westerhoven'] },
  { key: 'jun', label: 'Juni',      ids: ['riethoven', 'luyksgestel'] },
  { key: 'jul', label: 'Juli',      ids: ['bergeijk', 'duizel'] },
  { key: 'aug', label: 'Augustus',  ids: ['steensel'] },
  { key: 'sep', label: 'September', ids: ['weebosch', 'loo'] },
]
