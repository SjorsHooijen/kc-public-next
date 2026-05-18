'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Props {
  raceDate: string
  raceName: string
  raceId: string
  isPastRace: boolean
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  isOver: boolean
}

function calculateTimeLeft(raceDate: string): TimeLeft {
  const now = new Date().getTime()
  const race = new Date(raceDate).getTime()
  const difference = race - now

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true }
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isOver: false,
  }
}

export default function RaceCountdown({ raceDate, raceName, raceId, isPastRace }: Props) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: isPastRace })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTimeLeft(calculateTimeLeft(raceDate))

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(raceDate))
    }, 1000)

    return () => clearInterval(timer)
  }, [raceDate])

  if (!mounted) return null

  if (timeLeft.isOver || isPastRace) {
    return (
      <div className="bg-dark rounded-2xl overflow-hidden border border-green-500/30">
        <div className="h-1 bg-gradient-to-r from-green-400 via-green-500 to-green-400" />
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="text-green-500 flex-shrink-0 mt-1">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-heading font-bold text-sm uppercase tracking-widest text-green-500 mb-2">
                Race afgelopen
              </h3>
              <p className="font-body text-white/60 text-sm mb-4">
                Dank je wel voor je deelname aan {raceName}! Bekijk de uitslagen en je resultaten.
              </p>
              <Link
                href="/uitslagen-2026"
                className="inline-flex items-center gap-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 font-heading font-bold text-xs uppercase tracking-widest px-4 py-2 rounded-lg transition-colors border border-green-500/40"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Bekijk uitslagen
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const hasStarted = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes < 60

  return (
    <div className="bg-dark rounded-2xl overflow-hidden border border-primary/30">
      <div className="h-1 bg-gradient-to-r from-primary via-yellow-400 to-primary" />
      <div className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-8 bg-primary flex-shrink-0" />
          <span className="text-primary font-heading font-bold text-xs uppercase tracking-[0.25em]">
            Aftelling tot de race
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <CountdownUnit value={timeLeft.days} label="Dag" />
          <CountdownUnit value={timeLeft.hours} label="Uur" />
          <CountdownUnit value={timeLeft.minutes} label="Min" />
          <CountdownUnit value={timeLeft.seconds} label="Sec" />
        </div>
        {hasStarted && (
          <div className="mt-6 pt-6 border-t border-primary/20 flex items-center gap-2 text-primary font-heading font-bold text-sm uppercase tracking-widest animate-pulse">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="8" />
            </svg>
            Race is bezig!
          </div>
        )}
      </div>
    </div>
  )
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-primary/20 mb-2">
        <div className="font-heading font-bold text-3xl sm:text-4xl text-primary text-center leading-none">
          {String(value).padStart(2, '0')}
        </div>
      </div>
      <div className="font-body text-xs uppercase tracking-widest text-white/40 font-semibold">
        {label}
      </div>
    </div>
  )
}
