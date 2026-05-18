import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ALL_RACES } from '@/lib/calendar'
import { RACE_DETAILS } from '@/lib/race-detail'
import PhotoGallery from '@/components/PhotoGallery'
import RaceCountdown from '@/components/RaceCountdown'

interface Props { params: { slug: string } }

export function generateStaticParams() {
  return ALL_RACES.filter(r => r.isKC).map(r => ({ slug: r.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const detail = RACE_DETAILS[params.slug]
  if (!detail) return { title: 'Wedstrijd niet gevonden' }
  return {
    title: detail.eventName,
    description: `Alles over ${detail.eventName} — parcours, winnaarslijst en foto's.`,
  }
}

function formatFullDate(dateStr: string): string {
  const months = ['januari','februari','maart','april','mei','juni','juli','augustus','september','oktober','november','december']
  const d = new Date(dateStr)
  return `${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`
}

export default function RaceDetailPage({ params }: Props) {
  const detail = RACE_DETAILS[params.slug]
  if (!detail) notFound()

  const calRace = ALL_RACES.find(r => r.id === params.slug)

  const kcRaces = ALL_RACES.filter(r => r.isKC)
  const raceIndex = kcRaces.findIndex(r => r.id === params.slug)
  const prevRace = kcRaces[raceIndex - 1] ?? null
  const nextRace = kcRaces[raceIndex + 1] ?? null

  const today = new Date(); today.setHours(0, 0, 0, 0)
  const isPast = calRace ? new Date(calRace.date) < today : false
  const isToday = calRace ? new Date(calRace.date).toDateString() === today.toDateString() : false
  const isFinale = calRace?.isFinale ?? false

  // Winners sorted newest first; 2026 shown as TBA
  const winnersDesc = [...detail.winners].sort((a, b) => b.year - a.year)
  const mostRecentYear = winnersDesc[0]?.year ?? null
  const currentYear = 2026

  return (
    <>
      {/* Hero */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: 'clamp(320px, 50vw, 560px)' }}
      >
        <Image
          src={detail.heroImage}
          alt={detail.eventName}
          fill
          className="object-cover"
          style={{ objectPosition: detail.heroObjectPosition }}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/60 to-transparent" />

        {isFinale && (
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent z-10" />
        )}

        {/* Breadcrumb */}
        <div className="absolute top-20 left-0 right-0 z-10">
          <div className="max-w-5xl mx-auto px-6">
            <Link
              href="/wedstrijden"
              className="inline-flex items-center gap-1.5 text-white/50 hover:text-white font-body text-xs transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Wedstrijdkalender
            </Link>
          </div>
        </div>

        {/* Hero text */}
        <div className="absolute bottom-0 left-0 right-0 z-10 max-w-5xl mx-auto px-6 pb-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {isFinale ? (
              <span className="font-heading font-bold text-xs uppercase tracking-[0.25em] text-yellow-400 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                </svg>
                Grote Finale · Eerste Editie
              </span>
            ) : (
              <span className="font-heading font-bold text-[10px] uppercase tracking-widest px-2.5 py-1 bg-primary text-dark rounded">
                KempenCup 2026
              </span>
            )}
            {detail.isFirstEdition && !isFinale && (
              <span className="font-heading font-bold text-[10px] uppercase tracking-widest px-2.5 py-1 bg-yellow-400/20 text-yellow-300 rounded border border-yellow-400/30">
                Eerste editie
              </span>
            )}
            {isPast && (
              <span className="font-heading font-bold text-[10px] uppercase tracking-widest px-2.5 py-1 bg-white/10 text-white/50 rounded backdrop-blur-sm">
                Afgelopen
              </span>
            )}
            {isToday && (
              <span className="font-heading font-bold text-[10px] uppercase tracking-widest px-2.5 py-1 bg-primary text-dark rounded animate-pulse">
                Vandaag!
              </span>
            )}
          </div>
          <h1
            className="font-heading font-bold uppercase tracking-tighter text-white leading-none"
            style={{ fontSize: 'clamp(1.75rem, 5vw, 3.5rem)' }}
          >
            {detail.eventName}
          </h1>
          {calRace && (
            <p className="font-body text-sm text-white/60 mt-2">
              {calRace.day} {formatFullDate(calRace.date)}
              {calRace.startTime && ` · Start: ${calRace.startTime}`}
              {detail.startNote && ` · ${detail.startNote}`}
            </p>
          )}
        </div>
      </div>

      {/* Countdown / Results */}
      {calRace && (
        <div className="bg-white">
          <div className="max-w-5xl mx-auto px-6 py-12">
            <RaceCountdown
              raceDate={calRace.date}
              raceName={detail.eventName}
              raceId={params.slug}
              isPastRace={isPast}
            />
          </div>
        </div>
      )}

      {/* Body */}
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-14">

        {/* Info grid + winners */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Info grid */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-primary flex-shrink-0" />
              <span className="text-primary font-heading font-bold text-xs uppercase tracking-[0.25em]">Wedstrijdinfo</span>
            </div>
            <div className="bg-dark rounded-2xl overflow-hidden">
              <div className="h-0.5 bg-gradient-to-r from-primary via-primary-dark to-primary" />
              <div className="p-6 space-y-4">
                {calRace && (
                  <InfoRow
                    icon={<CalIcon />}
                    label="Datum"
                    value={`${calRace.day}, ${formatFullDate(calRace.date)}`}
                  />
                )}
                {calRace?.startTime && (
                  <InfoRow
                    icon={<ClockIcon />}
                    label="Starttijd"
                    value={detail.startNote ?? calRace.startTime}
                  />
                )}
                {detail.permanence && (
                  <InfoRow
                    icon={<HomeIcon />}
                    label="Permanentie"
                    value={detail.permanence}
                  />
                )}
                {detail.startFinish && (
                  <InfoRow
                    icon={<FlagIcon />}
                    label="Start / Finish"
                    value={detail.startFinish}
                  />
                )}
                {detail.lapLengthKm && detail.laps ? (
                  <InfoRow
                    icon={<RouteIcon />}
                    label="Parcours"
                    value={`${detail.laps} ronden × ${detail.lapLengthKm} km = ${Math.round(detail.laps * detail.lapLengthKm * 10) / 10} km`}
                  />
                ) : detail.lapLengthKm ? (
                  <InfoRow
                    icon={<RouteIcon />}
                    label="Rondelengte"
                    value={`${detail.lapLengthKm} km`}
                  />
                ) : null}
                {detail.website && (
                  <div className="flex items-start gap-3">
                    <div className="text-primary mt-0.5 flex-shrink-0"><LinkIcon /></div>
                    <div>
                      <div className="font-body text-xs text-white/40 uppercase tracking-widest">Website</div>
                      <a
                        href={detail.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-sm text-primary hover:text-primary-dark transition-colors mt-0.5 inline-block"
                      >
                        {detail.websiteLabel ?? detail.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Past winners */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-primary flex-shrink-0" />
              <span className="text-primary font-heading font-bold text-xs uppercase tracking-[0.25em]">Erelijst</span>
            </div>
            <div className="space-y-1">
              {/* 2026 TBA row */}
              <div className="flex items-center gap-4 px-4 py-3 rounded-xl bg-yellow-400/10 border border-yellow-400/20">
                <span className="font-heading font-bold text-sm text-yellow-400 w-10 flex-shrink-0">{currentYear}</span>
                <span className="font-body text-xs uppercase tracking-widest font-bold text-yellow-400/70 px-2 py-0.5 bg-yellow-400/15 rounded">
                  {detail.isFirstEdition ? 'Eerste editie' : 'TBA'}
                </span>
              </div>
              {winnersDesc.map((w, i) => {
                const isNewest = w.year === mostRecentYear
                return (
                  <div
                    key={w.year}
                    className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-colors ${
                      isNewest
                        ? 'bg-primary/10 border border-primary/20'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className={`font-heading font-bold text-sm w-10 flex-shrink-0 ${isNewest ? 'text-primary' : 'text-gray-400'}`}>
                      {w.year}
                    </span>
                    {isNewest && i === 0 && (
                      <svg className="w-3.5 h-3.5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                      </svg>
                    )}
                    <span className={`font-body text-sm ${isNewest ? 'text-dark font-semibold' : 'text-gray-700'}`}>
                      {w.name}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Photo gallery */}
        {detail.photos.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-primary flex-shrink-0" />
              <span className="text-primary font-heading font-bold text-xs uppercase tracking-[0.25em]">Foto&apos;s</span>
            </div>
            <PhotoGallery photos={detail.photos} raceName={detail.eventName} />
          </section>
        )}

        {/* Finale special note */}
        {detail.finaleNote && (
          <section className="bg-yellow-950/20 border border-yellow-400/20 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <div className="text-yellow-400 flex-shrink-0 mt-1">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                </svg>
              </div>
              <div>
                <h3 className="font-heading font-bold text-sm uppercase tracking-widest text-yellow-400 mb-2">
                  Eindhuldiging KempenCup 2026
                </h3>
                <p className="font-body text-gray-600 leading-relaxed text-sm">{detail.finaleNote}</p>
              </div>
            </div>
          </section>
        )}

        {/* Past races link */}
        {isPast && (
          <section>
            <Link
              href="/uitslagen-2026"
              className="inline-flex items-center gap-3 bg-dark text-white font-heading font-bold text-sm uppercase tracking-wide px-6 py-3 rounded-xl hover:bg-dark/80 transition-all hover:-translate-y-0.5 group"
            >
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Bekijk uitslagen 2026
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </section>
        )}

        {/* Prev / Next navigation */}
        {(prevRace || nextRace) && (
          <section>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-primary flex-shrink-0" />
              <span className="text-primary font-heading font-bold text-xs uppercase tracking-[0.25em]">Andere manches</span>
            </div>
            <div className="flex gap-3">
              {prevRace && (
                <Link
                  href={`/wedstrijden/${prevRace.id}`}
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-xl p-4 hover:border-primary/40 hover:bg-primary/5 transition-all group"
                >
                  <div className="text-xs font-heading font-bold uppercase tracking-widest text-gray-400 mb-1 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Vorige
                  </div>
                  <div className="font-heading font-bold text-sm uppercase tracking-tight text-dark group-hover:text-primary transition-colors">{prevRace.shortName}</div>
                  <div className="font-body text-xs text-gray-400 mt-0.5">{prevRace.dateDay} {prevRace.dateMonth}</div>
                </Link>
              )}
              {nextRace && (
                <Link
                  href={`/wedstrijden/${nextRace.id}`}
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-xl p-4 hover:border-primary/40 hover:bg-primary/5 transition-all group text-right"
                >
                  <div className="text-xs font-heading font-bold uppercase tracking-widest text-gray-400 mb-1 flex items-center justify-end gap-1">
                    Volgende
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <div className="font-heading font-bold text-sm uppercase tracking-tight text-dark group-hover:text-primary transition-colors">{nextRace.shortName}</div>
                  <div className="font-body text-xs text-gray-400 mt-0.5">{nextRace.dateDay} {nextRace.dateMonth}</div>
                </Link>
              )}
            </div>
          </section>
        )}
      </div>
    </>
  )
}

/* ── small icon components ── */

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-primary mt-0.5 flex-shrink-0">{icon}</div>
      <div>
        <div className="font-body text-xs text-white/40 uppercase tracking-widest">{label}</div>
        <div className="font-body text-sm text-white/80 mt-0.5">{value}</div>
      </div>
    </div>
  )
}

function CalIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function HomeIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  )
}

function FlagIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21V4m0 0l4-1 4 2 4-2 4 1v13l-4-1-4 2-4-2-4 1" />
    </svg>
  )
}

function RouteIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  )
}

function LinkIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  )
}
