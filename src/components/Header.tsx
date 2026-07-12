import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../hooks/useLanguage'
import { Menu, X, Globe, ChevronDown } from 'lucide-react'
import ScrollProgress from './ScrollProgress'

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" fill="currentColor" />
  </svg>
)

const Header = () => {
  const { t } = useTranslation()
  const { currentLanguage, setLanguage } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const langRef = useRef<HTMLDivElement>(null)

  const languages = [
    { code: 'ru', label: 'Русский', short: 'RU' },
    { code: 'kk', label: 'Қазақша', short: 'KK' },
    { code: 'en', label: 'English', short: 'EN' },
  ]
  const selectedLang = languages.find((l) => l.code === currentLanguage) || languages[0]
  const loginUrl =
    'https://starlink.com/auth/login?ReturnUrl=https%3A%2F%2Fstarlink.com%2Fapi%2Fauth%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3DauthRelyingPartyId%26redirect_uri%3Dhttps%253A%252F%252Fstarlink.com%252Fauth-rp%252Fauth%252Fcallback%26response_type%3Dcode%26scope%3Dopenid%2520offline_access%2520profile%26code_challenge%3DPYXN3CRQo0BlsM71ry2QakJDTIUYeNUuSec6OcKptgU%26code_challenge_method%3DS256%26response_mode%3Dform_post%26nonce%3D639060383978383194.YzQ5YjAzMGUtNjlkZi00OWU2LThhMTYtYWJhNzdkOTEwYmU4MWVkMWRlN2QtMWYzZi00ZmU1LWJhM2EtNjkyOTcwNTM1ZmM5%26view%3Dcustomer%26sxLoginReturnUrl%3Dhttps%253A%252F%252Fstarlink.com%252Faccount%26state%3DCfDJ8BrmZteN5jdLoWYoVZAk1aSXBUaGSeAochtZ1iuv7fyXUyMA4CjlsIKSb3ZDUbW6vna0kLZ8r0mzFjkPLbH-dRsOURueX1HHnGiy3DxbRjcSD_7CsGPosFES-fdXLDDObAiLqhF3tMNftsLhcJYl5TT2Aq9w5nfuL-b16oE8bqrcjxT6S9u-mwEFtKB2h0ZErCHHngFBfDyhGDP3mnY1HNygR_MeKzbWwAgG9c1wav8xUtFupC3g5CZJSmYlL_HkgqZGTKNZpliFDPpslKzqz7PsM1GQ_rvuasoNH-UT98Gdw7PAEBQvUjG6u_qHalj8dWJByoueJtrUVz4LWGaGsV3HZPpMhjFxdZAt0V-UxQV4NVfxD4zT7CLUiAtrqOOUKwtKMgohJUTmPnWyzJ95A9yPpVoQrO5-YV784un-GLdMGaQSXyF76y-SIV1bV0MAxSo8WtSz5LDmZP5QeHt20DI%26x-client-SKU%3DID_NET9_0%26x-client-ver%3D8.0.1.0'
  const baseUrl = import.meta.env.BASE_URL || '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = ['hero', 'features', 'installation', 'satellite-map', 'services', 'support', 'footer']
      const scrollPosition = window.scrollY + 220

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!isLangOpen) return

    const handleOutsideClick = (e: PointerEvent) => {
      const target = e.target as Node
      if (langRef.current && !langRef.current.contains(target)) {
        setIsLangOpen(false)
      }
    }

    document.addEventListener('pointerdown', handleOutsideClick)
    return () => document.removeEventListener('pointerdown', handleOutsideClick)
  }, [isLangOpen])

  useEffect(() => {
    if (!isMenuOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node
      if (headerRef.current && !headerRef.current.contains(target)) {
        setIsMenuOpen(false)
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [isMenuOpen])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const topBanner = document.querySelector<HTMLElement>('[data-top-banner="true"]')
      const topBannerHeight = topBanner?.offsetHeight ?? 0
      const headerHeight = headerRef.current?.offsetHeight ?? 0
      const offset = topBannerHeight + headerHeight + 8
      const targetTop = element.getBoundingClientRect().top + window.pageYOffset - offset

      window.scrollTo({
        top: Math.max(targetTop, 0),
        behavior: 'smooth',
      })
    }
    setIsMenuOpen(false)
  }

  const navLinks = [
    { id: 'hero', key: 'home' },
    { id: 'features', key: 'features' },
    { id: 'installation', key: 'installation' },
    { id: 'satellite-map', key: 'satelliteMap' },
    { id: 'services', key: 'services' },
    { id: 'support', key: 'support' },
    { id: 'footer', key: 'contact' },
  ]

  return (
    <header
      ref={headerRef}
      className="fixed top-[30px] md:top-[36px] left-0 right-0 z-50 w-full transition-all duration-300"
      style={{
        background: scrolled
          ? 'rgba(5, 8, 16, 0.88)'
          : 'rgba(5, 8, 16, 0.6)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <ScrollProgress />
      <div className="container mx-auto px-3 md:px-4 py-1 md:py-2 lg:py-2.5 max-w-full">
        <div className="flex items-center justify-between relative">
          <div className="flex-1 hidden md:block"></div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-3 lg:gap-5 xl:gap-8 flex-1 justify-center">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(link.id)
                }}
                className={`relative transition-colors whitespace-nowrap text-xs sm:text-sm lg:text-[13px] pb-0.5 ${
                  activeSection === link.id
                    ? 'font-semibold after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[1.5px] after:w-4 after:rounded-full after:bg-sky-400'
                    : 'hover:opacity-100 opacity-60'
                }`}
                style={{
                  color: activeSection === link.id ? '#f1f5f9' : '#94a3b8',
                }}
              >
                {t(`nav.${link.key}`)}
              </a>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2 md:gap-3 flex-1 justify-end">
            <div className="hidden md:flex items-center gap-3 lg:gap-4">
              <div className="flex flex-col items-end text-[11px] lg:text-sm leading-tight">
                <a
                  href="tel:+77007006613"
                  className="font-medium transition-colors"
                  style={{ color: '#94a3b8' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#f1f5f9')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}
                >
                  +7 700 700 6613
                </a>
              </div>
              <a
                href="https://2gis.kz/ust-kamenogorsk/firm/70000001095035295"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center transition-opacity opacity-50 hover:opacity-90"
                aria-label="2GIS"
              >
                <img src={`${baseUrl}2gis.svg`} alt="2GIS" className="h-5 w-5" />
              </a>
            </div>

            <a
              href="https://wa.me/77007006613"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hidden md:flex items-center justify-center opacity-60 hover:opacity-100"
              style={{ color: '#94a3b8' }}
              aria-label="WhatsApp"
            >
              <WhatsAppIcon />
            </a>

            {/* Login button */}
            <a
              href={loginUrl}
              className="hidden md:inline-flex px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm rounded-full transition-all font-medium"
              style={{
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#94a3b8',
                background: 'transparent',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'
                e.currentTarget.style.color = '#f1f5f9'
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
                e.currentTarget.style.color = '#94a3b8'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              {t('common.login')}
            </a>

            {/* Language Selector */}
            <div ref={langRef} className="relative z-50">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="inline-flex h-9 items-center justify-center gap-1.5 px-3 md:px-3.5 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 active:scale-95 focus:outline-none"
                style={{
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#94a3b8',
                  background: 'transparent',
                }}
                aria-label="Select language"
                aria-expanded={isLangOpen}
              >
                <Globe className="w-3.5 h-3.5 opacity-70" />
                <span className="uppercase tracking-wider">{selectedLang.short}</span>
                <ChevronDown className={`w-3 h-3 opacity-50 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown */}
              <div
                className={`absolute right-0 mt-2 w-36 origin-top-right rounded-2xl p-1 transition-all duration-200 ${
                  isLangOpen
                    ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'
                }`}
                style={{
                  background: 'rgba(10, 15, 30, 0.95)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 20px 40px -10px rgba(0,0,0,0.6)',
                }}
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code)
                      setIsLangOpen(false)
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs sm:text-sm font-medium transition-colors ${
                      currentLanguage === lang.code
                        ? 'text-sky-400'
                        : 'hover:bg-white/5'
                    }`}
                    style={{
                      color: currentLanguage === lang.code ? '#38bdf8' : '#94a3b8',
                    }}
                  >
                    <span>{lang.label}</span>
                    <span className="text-[10px] opacity-40 uppercase font-mono tracking-wider">{lang.short}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile burger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full transition-all"
              style={{
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#94a3b8',
                background: 'transparent',
              }}
              aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <nav
            id="mobile-nav"
            className="md:hidden mt-3 pb-3"
            style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div className="flex flex-col gap-3 pt-3">
              <div
                className="flex flex-col gap-2 pb-2 text-sm"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
              >
                <a
                  href="tel:+77007006613"
                  className="min-h-11 inline-flex items-center transition-colors"
                  style={{ color: '#94a3b8' }}
                >
                  +7 700 700 6613
                </a>
                <a
                  href="https://2gis.kz/ust-kamenogorsk/firm/70000001095035295"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-11 inline-flex items-center gap-2 transition-colors"
                  style={{ color: '#94a3b8' }}
                  aria-label="2GIS"
                >
                  <img src={`${baseUrl}2gis.svg`} alt="2GIS" className="h-4 w-4 opacity-50" />
                  <span>2GIS</span>
                </a>
              </div>
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(link.id)
                  }}
                  className="min-h-11 inline-flex items-center transition-colors"
                  style={{ color: '#94a3b8' }}
                >
                  {t(`nav.${link.key}`)}
                </a>
              ))}
              <a
                href="https://wa.me/77007006613"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-11 flex items-center gap-2 transition-colors pt-2"
                style={{
                  color: '#94a3b8',
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <WhatsAppIcon />
                <span>WhatsApp</span>
              </a>
              <a
                href={loginUrl}
                className="min-h-11 inline-flex items-center transition-colors pt-2"
                style={{
                  color: '#94a3b8',
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {t('common.login')}
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
