'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { BrandLogo } from './brand-logo'
import { cn } from '@/lib/utils'
import { BOOKING_URL } from '@/lib/config'
import { SpecularButton } from '@/components/ui/SpecularButton'

const LINKS = [
  { label: 'Work', href: '/#what-we-do' },
  { label: 'Testimonials', href: '/#testimonials' },
  { label: 'FAQ', href: '/#faq' },
]

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="size-9 rounded-md border border-border" />
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-muted"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  )
}

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const currentTheme = mounted ? (resolvedTheme || theme) : 'dark'
  const isDark = currentTheme === 'dark'

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const hash = href.includes('#') ? '#' + href.split('#')[1] : href
    if (pathname === '/') {
      e.preventDefault()
      const element = document.querySelector(hash)
      if (element) {
        const y = element.getBoundingClientRect().top + window.scrollY - 80
        window.scrollTo({ top: y, behavior: 'smooth' })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      setOpen(false)
    }
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b transition-colors',
        scrolled
          ? 'border-border bg-background/85 backdrop-blur-md'
          : 'border-transparent bg-background/60 backdrop-blur-sm',
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Primary"
      >
        <Link href="/" className="flex items-center">
          <BrandLogo />
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 sm:flex">
          <ThemeToggle />
          <SpecularButton
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
            radius={8}
            tint={isDark ? '#ffffff' : '#0c0c0c'}
            tintOpacity={isDark ? 0.1 : 0.9}
            blur={8}
            textColor="#ffffff"
            lineColor={isDark ? '#ffffff' : '#0c0c0c'}
            baseColor={isDark ? '#525252' : '#1c1917'}
            intensity={1.2}
            shineSize={12}
            shineFade={35}
            thickness={1.5}
            speed={0.35}
            followMouse
            proximity={250}
            autoAnimate
          >
            Book a call
          </SpecularButton>
        </div>

        <div className="flex items-center gap-3 sm:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-md border border-border text-foreground"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-background px-4 py-4 sm:hidden">
          <div className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="rounded-md px-2 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-3 flex flex-col gap-2">
            <SpecularButton
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              size="sm"
              radius={8}
              tint={isDark ? '#ffffff' : '#0c0c0c'}
              tintOpacity={isDark ? 0.1 : 0.9}
              blur={8}
              textColor="#ffffff"
              lineColor={isDark ? '#ffffff' : '#0c0c0c'}
              baseColor={isDark ? '#525252' : '#1c1917'}
              intensity={1.2}
              shineSize={12}
              shineFade={35}
              thickness={1.5}
              speed={0.35}
              followMouse
              proximity={250}
              autoAnimate
              className="w-full justify-center"
            >
              Book a call
            </SpecularButton>
          </div>
        </div>
      )}
    </header>
  )
}
