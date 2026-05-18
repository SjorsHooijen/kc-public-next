'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'

interface Props {
  photos: string[]
  raceName: string
}

export default function PhotoGallery({ photos, raceName }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const prev = useCallback(() => setLightboxIndex(i => i !== null ? (i - 1 + photos.length) % photos.length : null), [photos.length])
  const next = useCallback(() => setLightboxIndex(i => i !== null ? (i + 1) % photos.length : null), [photos.length])

  if (photos.length === 0) return null

  return (
    <>
      {/* Horizontal scroll gallery */}
      <div
        className="flex gap-3 overflow-x-auto pb-4"
        style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}
      >
        {photos.map((src, i) => (
          <button
            key={src}
            onClick={() => openLightbox(i)}
            className="flex-none rounded-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary hover:opacity-90 transition-opacity"
            style={{ scrollSnapAlign: 'start', width: 'clamp(200px, 40vw, 320px)', aspectRatio: '4/3' }}
          >
            <div className="relative w-full h-full">
              <Image
                src={src}
                alt={`${raceName} foto ${i + 1}`}
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 40vw, 320px"
              />
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Image */}
          <div
            className="relative w-full h-full max-w-5xl max-h-[90vh] mx-auto px-16"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image
                src={photos[lightboxIndex]}
                alt={`${raceName} foto ${lightboxIndex + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
              />
            </div>
          </div>

          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/60 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Prev */}
          {photos.length > 1 && (
            <button
              onClick={e => { e.stopPropagation(); prev() }}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Next */}
          {photos.length > 1 && (
            <button
              onClick={e => { e.stopPropagation(); next() }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-body text-xs text-white/40">
            {lightboxIndex + 1} / {photos.length}
          </div>
        </div>
      )}
    </>
  )
}
