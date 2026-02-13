import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../hooks/useLanguage'
import { Menu, X } from 'lucide-react'
import ScrollProgress from './ScrollProgress'

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" fill="currentColor"/>
  </svg>
)

const Header = () => {
  const { t } = useTranslation()
  const { currentLanguage, toggleLanguage } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const loginUrl =
    'https://starlink.com/auth/login?ReturnUrl=https%3A%2F%2Fstarlink.com%2Fapi%2Fauth%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3DauthRelyingPartyId%26redirect_uri%3Dhttps%253A%252F%252Fstarlink.com%252Fauth-rp%252Fauth%252Fcallback%26response_type%3Dcode%26scope%3Dopenid%2520offline_access%2520profile%26code_challenge%3DPYXN3CRQo0BlsM71ry2QakJDTIUYeNUuSec6OcKptgU%26code_challenge_method%3DS256%26response_mode%3Dform_post%26nonce%3D639060383978383194.YzQ5YjAzMGUtNjlkZi00OWU2LThhMTYtYWJhNzdkOTEwYmU4MWVkMWRlN2QtMWYzZi00ZmU1LWJhM2EtNjkyOTcwNTM1ZmM5%26view%3Dcustomer%26sxLoginReturnUrl%3Dhttps%253A%252F%252Fstarlink.com%252Faccount%26state%3DCfDJ8BrmZteN5jdLoWYoVZAk1aSXBUaGSeAochtZ1iuv7fyXUyMA4CjlsIKSb3ZDUbW6vna0kLZ8r0mzFjkPLbH-dRsOURueX1HHnGiy3DxbRjcSD_7CsGPosFES-fdXLDDObAiLqhF3tMNftsLhcJYl5TT2Aq9w5nfuL-b16oE8bqrcjxT6S9u-mwEFtKB2h0ZErCHHngFBfDyhGDP3mnY1HNygR_MeKzbWwAgG9c1wav8xUtFupC3g5CZJSmYlL_HkgqZGTKNZpliFDPpslKzqz7PsM1GQ_rvuasoNH-UT98Gdw7PAEBQvUjG6u_qHalj8dWJByoueJtrUVz4LWGaGsV3HZPpMhjFxdZAt0V-UxQV4NVfxD4zT7CLUiAtrqOOUKwtKMgohJUTmPnWyzJ95A9yPpVoQrO5-YV784un-GLdMGaQSXyF76y-SIV1bV0MAxSo8WtSz5LDmZP5QeHt20DI%26x-client-SKU%3DID_NET9_0%26x-client-ver%3D8.0.1.0'
  const baseUrl = import.meta.env.BASE_URL || '/'

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'usecases', 'pricing', 'footer']
      const scrollPosition = window.scrollY + 200

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
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const navLinks = [
    { id: 'hero', key: 'home' },
    { id: 'usecases', key: 'useCases' },
    { id: 'pricing', key: 'pricing' },
    { id: 'footer', key: 'contact' },
  ]

  return (
    <header className="fixed top-[36px] md:top-[40px] left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-slate-200 w-full overflow-x-hidden">
      <ScrollProgress />
      <div className="container mx-auto px-3 md:px-4 py-1 md:py-1.5 lg:py-2 max-w-full">
        <div className="flex items-center justify-between relative">
          <div className="flex-1 hidden md:block"></div>
          
          <nav className="hidden md:flex items-center gap-3 lg:gap-5 xl:gap-8 flex-1 justify-center">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(link.id)
                }}
                className={`transition-colors whitespace-nowrap text-xs sm:text-sm lg:text-base ${
                  activeSection === link.id
                    ? 'text-accent border-b-2 border-accent'
                    : 'text-slate-700 hover:text-accent'
                }`}
              >
                {t(`nav.${link.key}`)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3 flex-1 justify-end">
            <div className="hidden md:flex items-center gap-3 lg:gap-4">
              <div className="flex flex-col items-end text-[11px] lg:text-sm leading-tight">
                <a
                  href="tel:+77007006613"
                  className="font-semibold text-slate-900 hover:text-accent transition-colors"
                >
                  +7 700 700 6613
                </a>
                <a
                  href="tel:+77019444441"
                  className="text-slate-700 hover:text-accent transition-colors"
                >
                  +7 701 944 4441
                </a>
              </div>
              <a
                href="https://2gis.kz/ust-kamenogorsk/firm/70000001095035295"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center text-slate-700 hover:text-accent transition-colors"
                aria-label="2GIS"
              >
                <img src={`${baseUrl}2gis.svg`} alt="2GIS" className="h-5 w-5" />
              </a>
            </div>
            <a
              href="https://wa.me/77007006613"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 hover:text-accent transition-colors hidden md:block"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon />
            </a>

            <a
              href={loginUrl}
              className="hidden md:inline-flex px-3 py-1.5 md:px-4 md:py-2 border border-slate-200 hover:border-slate-300 text-slate-700 text-sm md:text-base rounded-full transition-colors bg-white/80 hover:bg-white"
            >
              Вход
            </a>
            
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 md:px-4 md:py-2 border border-slate-200 hover:border-slate-300 text-slate-700 text-sm md:text-base rounded-full transition-colors bg-white/80 hover:bg-white"
            >
              {currentLanguage === 'ru' ? 'ҚАЗ' : 'РУС'}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-slate-700"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-3 pb-3 border-t border-slate-200">
            <div className="flex flex-col gap-3 pt-3">
              <div className="flex flex-col gap-2 pb-2 border-b border-slate-200 text-sm">
                <a
                  href="tel:+77007006613"
                  className="text-slate-700 hover:text-accent transition-colors"
                >
                  +7 700 700 6613
                </a>
                <a
                  href="tel:+77019444441"
                  className="text-slate-700 hover:text-accent transition-colors"
                >
                  +7 701 944 4441
                </a>
                <a
                  href="https://2gis.kz/ust-kamenogorsk/firm/70000001095035295"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-slate-700 hover:text-accent transition-colors"
                  aria-label="2GIS"
                >
                  <img src={`${baseUrl}2gis.svg`} alt="2GIS" className="h-4 w-4" />
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
                  className="text-slate-700 hover:text-accent transition-colors"
                >
                  {t(`nav.${link.key}`)}
                </a>
              ))}
              <a
                href="https://wa.me/77007006613"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-700 hover:text-accent transition-colors pt-2 border-t border-slate-200"
              >
                <WhatsAppIcon />
                <span>WhatsApp</span>
              </a>
              <a
                href={loginUrl}
                className="text-slate-700 hover:text-accent transition-colors pt-2 border-t border-slate-200"
              >
                Вход
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header

