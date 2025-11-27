import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../hooks/useLanguage'
import { Menu, X } from 'lucide-react'
import ScrollProgress from './ScrollProgress'

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
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(link.id)
                }}
                className={`transition-colors ${
                  activeSection === link.id
                    ? 'text-accent border-b-2 border-accent'
                    : 'text-white hover:text-accent'
                }`}
              >
                {t(`nav.${link.key}`)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 md:px-4 md:py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm md:text-base rounded transition-colors"
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
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-800">
            <div className="flex flex-col gap-4 pt-4">
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
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header

