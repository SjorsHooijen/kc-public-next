'use client'

import { useState, useEffect } from 'react'

interface Props {
  raceName: string
  raceDate: string   // 'YYYY-MM-DD'
  raceLocation: string
  isFinale?: boolean
}

function pad(n: number) { return String(n).padStart(2, '0') }

export default function CountdownBanner({ raceName, raceDate, raceLocation, isFinale }: Props) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, done: false })

  useEffect(() => {
    const target = new Date(`${raceDate}T08:00:00`)

    const tick = () => {
      const diff = target.getTime() - Date.now()
      if (diff <= 0) { setTime(t => ({ ...t, done: true })); return }
      setTime({
        days:    Math.floor(diff / 86_400_000),
        hours:   Math.floor((diff % 86_400_000) / 3_600_000),
        minutes: Math.floor((diff % 3_600_000) / 60_000),
        seconds: Math.floor((diff % 60_000) / 1000),
        done: false,
      })
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [raceDate])

  if (time.done) return null

  return (
    <div className={`sticky top-16 z-20 border-b ${isFinale ? 'bg-gradient-to-r from-dark via-yellow-950/80 to-dark border-yellow-500/30' : 'bg-dark/95 border-primary/20'} backdrop-blur-sm`}>
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center gap-3 flex-wrap">
        {/* Pulse dot + label */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className={`w-2 h-2 rounded-full animate-pulse ${isFinale ? 'bg-yellow-400' : 'bg-primary'}`} />
          <span className={`font-heading font-bold text-[10px] uppercase tracking-[0.25em] ${isFinale ? 'text-yellow-400' : 'text-primary'}`}>
            {isFinale ? '🏆 Grote Finale' : 'Volgende race'}
          </span>
        </div>

        <div className="w-px h-4 bg-white/10 flex-shrink-0" />

        {/* Race name */}
        <span className="font-heading font-bold text-sm uppercase tracking-tight text-white truncate">
          {raceName}
        </span>
        <span className="font-body text-xs text-white/40 hidden sm:block truncate">
          {raceLocation}
        </span>

        {/* Countdown */}
        <div className="ml-auto flex items-center gap-1.5 flex-shrink-0">
          {[
            { v: time.days,    l: 'd' },
            { v: time.hours,   l: 'u' },
            { v: time.minutes, l: 'm' },
            { v: time.seconds, l: 's' },
          ].map(({ v, l }, i) => (
            <div key={l} className="flex items-baseline gap-0.5">
              {i > 0 && <span className="text-white/20 font-body text-xs mr-0.5">:</span>}
              <span className={`font-heading font-bold text-lg tabular-nums ${isFinale ? 'text-yellow-300' : 'text-white'}`}>
                {pad(v)}
              </span>
              <span className="font-body text-[10px] text-white/30">{l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
