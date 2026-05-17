interface Standing {
  position: number
  rider_name: string
  total_points: number
  races_entered: number
}

interface Props {
  standings: Standing[]
}

function PositionBadge({ position }: { position: number }) {
  if (position === 1) {
    return (
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400 text-dark font-heading font-bold text-sm">
        1
      </span>
    )
  }
  if (position === 2) {
    return (
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 text-dark font-heading font-bold text-sm">
        2
      </span>
    )
  }
  if (position === 3) {
    return (
      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-600 text-white font-heading font-bold text-sm">
        3
      </span>
    )
  }
  return (
    <span className="font-heading font-bold text-sm text-gray-400">{position}</span>
  )
}

export default function StandingsTable({ standings }: Props) {
  if (!standings || standings.length === 0) {
    return (
      <p className="text-gray-500 font-body text-sm italic py-4">
        Geen klassement beschikbaar voor dit seizoen.
      </p>
    )
  }

  return (
    <div className="overflow-x-auto rounded-sm shadow-sm">
      <table className="w-full text-sm font-body border-separate border-spacing-0">
        <thead>
          <tr className="bg-dark text-white">
            <th className="font-heading font-bold uppercase tracking-widest text-left px-4 py-3 w-16 rounded-tl-sm">#</th>
            <th className="font-heading font-bold uppercase tracking-widest text-left px-4 py-3">Naam</th>
            <th className="font-heading font-bold uppercase tracking-widest text-right px-4 py-3 text-primary">Punten</th>
            <th className="font-heading font-bold uppercase tracking-widest text-right px-4 py-3 rounded-tr-sm">Wedstrijden</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((standing) => (
            <tr
              key={standing.position}
              className={`transition-colors duration-150 hover:bg-primary/5 ${
                standing.position <= 3
                  ? 'border-l-4 border-primary bg-white'
                  : standing.position % 2 === 0
                    ? 'bg-gray-50/50'
                    : 'bg-white'
              }`}
            >
              <td className="px-4 py-3">
                <PositionBadge position={standing.position} />
              </td>
              <td className="px-4 py-3 text-dark font-medium">{standing.rider_name}</td>
              <td className="px-4 py-3 text-right font-bold text-primary">{standing.total_points}</td>
              <td className="px-4 py-3 text-right text-gray-500">{standing.races_entered}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
