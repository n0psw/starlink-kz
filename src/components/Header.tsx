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

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'usecases', 'benefits', 'features', 'setup', 'testimonials', 'pricing', 'faq', 'contact']
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
    { id: 'benefits', key: 'benefits' },
    { id: 'features', key: 'features' },
    { id: 'setup', key: 'setup' },
    { id: 'testimonials', key: 'testimonials' },
    { id: 'pricing', key: 'pricing' },
    { id: 'faq', key: 'faq' },
    { id: 'contact', key: 'contact' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-900">
      <ScrollProgress />
      <div className="container mx-auto px-3 md:px-4 py-2.5 md:py-3 lg:py-4">
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
                    : 'text-white hover:text-accent'
                }`}
              >
                {t(`nav.${link.key}`)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3 flex-1 justify-end">
            <a
              href="https://wa.me/77007006613"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-accent transition-colors hidden md:block"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon />
            </a>
            
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 md:px-4 md:py-2 border border-gray-700 hover:border-gray-600 text-white text-sm md:text-base rounded transition-colors bg-transparent hover:bg-gray-900/50"
            >
              {currentLanguage === 'ru' ? 'ҚАЗ' : 'РУС'}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-3 pb-3 border-t border-gray-800">
            <div className="flex flex-col gap-3 pt-3">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(link.id)
                  }}
                  className="text-white hover:text-accent transition-colors"
                >
                  {t(`nav.${link.key}`)}
                </a>
              ))}
              <a
                href="https://wa.me/77007006613"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white hover:text-accent transition-colors pt-2 border-t border-gray-800"
              >
                <WhatsAppIcon />
                <span>WhatsApp</span>
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header

