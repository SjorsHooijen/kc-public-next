interface Race {
  id: number
  name: string
  location: string
  date: string
  start_time: string | null
  distance_km: number | null
  season: number
  is_finale: boolean
  status: string
}

interface Props {
  race: Race
}

function formatDutchDate(dateStr: string): string {
  const months = [
    'januari', 'februari', 'maart', 'april', 'mei', 'juni',
    'juli', 'augustus', 'september', 'oktober', 'november', 'december',
  ]
  const date = new Date(dateStr)
  const day = date.getUTCDate()
  const month = months[date.getUTCMonth()]
  const year = date.getUTCFullYear()
  return `${day} ${month} ${year}`
}

export default function RaceCard({ race }: Props) {
  const isFinished = race.status === 'finished'

  return (
    <div className={`card-lift border-reveal bg-white overflow-hidden relative ${isFinished ? 'opacity-70' : ''}`}>
      {/* Top gradient bar */}
      <div
        className={`h-1 w-full ${
          isFinished
            ? 'bg-gray-300'
            : 'bg-gradient-to-r from-primary to-[#b5e55a]'
        }`}
      />

      {/* Badge — absolute top-right */}
      <div className="absolute top-4 right-4 flex flex-col items-end gap-1">
        {race.is_finale && (
          <span className="bg-accent text-white font-heading font-bold text-xs uppercase tracking-wide px-2 py-0.5">
            Finale
          </span>
        )}
        {isFinished ? (
          <span className="bg-gray-400 text-white font-heading font-bold text-xs uppercase tracking-wide px-2 py-0.5">
            Afgelopen
          </span>
        ) : (
          <span className="bg-primary text-dark font-heading font-bold text-xs uppercase tracking-wide px-2 py-0.5">
            Aankomend
          </span>
        )}
      </div>

      {/* Card body */}
      <div className="p-5 pr-24">
        {/* Race name */}
        <h3 className="font-heading font-bold text-2xl uppercase tracking-tight text-dark mb-3 leading-tight">
          {race.name}
        </h3>

        {/* Details */}
        <div className="space-y-2 text-sm font-body text-gray-600">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formatDutchDate(race.date)}</span>
          </div>
          {race.start_time && (
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Start: {race.start_time}</span>
            </div>
          )}
          {race.distance_km && (
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <span>{race.distance_km} km</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom location strip */}
      <div className="bg-gray-50 border-t border-gray-100 px-5 py-3 flex items-center gap-2">
        <svg className="w-3.5 h-3.5 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="font-body text-xs text-gray-500 uppercase tracking-wide">{race.location}</span>
      </div>
    </div>
  )
}
