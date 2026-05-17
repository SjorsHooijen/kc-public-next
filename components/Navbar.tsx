'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/wedstrijden', label: 'Wedstrijden' },
  { href: '/uitslagen-2026', label: 'Uitslagen' },
  { href: '/reglement', label: 'Reglement' },
  { href: '/nieuws', label: 'Nieuws' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="inline-block w-2 h-2 bg-primary rotate-45 group-hover:rotate-90 transition-transform duration-300" />
          <span className="font-heading text-2xl font-bold uppercase tracking-wide text-white">
            KEMPEN<span className="text-primary">CUP</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== '/' && pathname.startsWith(link.href.replace('-2026', '')))
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative font-heading font-bold text-sm uppercase tracking-wider pb-1 transition-colors
                    after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300
                    ${isActive
                      ? 'text-primary after:w-full'
                      : 'text-white/80 hover:text-primary after:w-0 hover:after:w-full'
                    }`}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Right — intentionally empty, CTA removed */}
        <div className="hidden md:flex items-center gap-4" />

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Menu openen"
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
              menuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-dark/98 backdrop-blur-md border-t border-white/10">
          <ul className="flex flex-col py-4">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== '/' && pathname.startsWith(link.href.replace('-2026', '')))
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block px-6 py-3 font-heading font-bold text-sm uppercase tracking-wider transition-colors hover:text-primary hover:bg-white/5 ${
                      isActive ? 'text-primary' : 'text-white/80'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </nav>
  )
}
