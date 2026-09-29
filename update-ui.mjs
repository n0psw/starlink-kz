import fs from 'fs'
import path from 'path'

const PROJECT_DIR = '../starlink-asia'
const SRC_DIR = path.join(PROJECT_DIR, 'src')

const files = {}

// Update Setup.tsx to use real image
files['components/Setup.tsx'] = `import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { CloudSun, Plug, Wifi } from 'lucide-react'

const Setup = () => {
  const { t } = useTranslation()
  const steps = t('setup.steps', { returnObjects: true }) as { title: string, desc: string }[]

  const icons = [
    <CloudSun size={32} strokeWidth={1.5} />,
    <Plug size={32} strokeWidth={1.5} />,
    <Wifi size={32} strokeWidth={1.5} />
  ]

  return (
    <section id="setup" className="py-32 bg-black border-t border-white/5 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Visual Side - Real Hardware Image */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="relative aspect-square md:aspect-video lg:aspect-square bg-[#05070a] rounded-3xl border border-white/10 flex items-center justify-center overflow-hidden">
            
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]" />
            
            <img 
              src="https://pngimg.com/uploads/starlink/starlink_PNG10.png" 
              alt="Starlink Kit" 
              className="relative w-[80%] h-auto object-contain drop-shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
            />

          </motion.div>

          {/* Text Side */}
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-medium text-white mb-6 tracking-tight">
              {t('setup.title')}
            </h2>
            <p className="text-xl text-white/50 font-light mb-12 max-w-lg leading-relaxed">
              {t('setup.desc')}
            </p>

            <div className="space-y-8">
              {steps.map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.2 }}
                  className="flex gap-6 items-start"
                >
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-white">
                    {icons[i]}
                  </div>
                  <div className="pt-2">
                    <h3 className="text-xl font-medium text-white mb-2">{step.title}</h3>
                    <p className="text-white/50 text-[15px]">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Setup
`

// Update Header.tsx to show both numbers
files['components/Header.tsx'] = `import { useState, useEffect, useRef } from 'react'
import { Menu, X, Globe, User } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import ScrollProgress from './ScrollProgress'

const loginUrl = 'https://starlink.com/auth/login?ReturnUrl=https%3A%2F%2Fstarlink.com%2Faccount'
const accountUrl = 'https://starlink.com/account'

const LANGUAGES = [
  { code: 'ru', label: 'Русский' },
  { code: 'kk', label: 'Қазақша' },
  { code: 'ky', label: 'Кыргызча' },
  { code: 'uz', label: "O'zbekcha" },
  { code: 'tg', label: 'Тоҷикӣ' },
]

const Header = () => {
  const { t, i18n } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [langOpen, setLangOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  
  const navLinks = [
    { id: 'map', label: t('nav.map') },
    { id: 'countries', label: t('nav.countries') },
    { id: 'features', label: t('nav.features') },
    { id: 'setup', label: t('nav.setup') },
    { id: 'specs', label: t('nav.specs') },
    { id: 'support', label: t('nav.support') },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
      const ids = navLinks.map(l => l.id)
      const pos = window.scrollY + 200
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i])
        if (el && pos >= el.offsetTop) { setActiveSection(ids[i]); return }
      }
      setActiveSection('')
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [navLinks])

  useEffect(() => {
    if (!isMenuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsMenuOpen(false)
    document.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = prev; document.removeEventListener('keydown', onKey) }
  }, [isMenuOpen])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const offset = headerRef.current?.offsetHeight ?? 64
      window.scrollTo({ top: el.offsetTop - offset - 8, behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const changeLang = (code: string) => {
    i18n.changeLanguage(code)
    setLangOpen(false)
  }

  return (
    <header ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(0,0,0,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
      }}>
      <ScrollProgress />
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between h-14 md:h-16">
          <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({top:0,behavior:'smooth'}) }}
            className="flex items-center gap-1 flex-shrink-0">
            <span className="text-white font-semibold text-[15px] tracking-[2px] uppercase">STARLINK</span>
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <button key={link.id} onClick={() => scrollTo(link.id)}
                className="px-3 py-1.5 text-[12px] uppercase tracking-wider font-medium rounded transition-colors duration-200"
                style={{
                  color: activeSection === link.id ? '#fff' : 'rgba(255,255,255,0.6)',
                  background: activeSection === link.id ? 'rgba(255,255,255,0.08)' : 'transparent',
                }}>
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            
            <div className="hidden xl:flex flex-col items-end gap-1">
              <a href="tel:+77007006613"
                className="text-[11px] text-white/50 hover:text-white transition-colors">
                +7 700 700 6613
              </a>
              <a href="tel:+77019444441"
                className="text-[11px] text-white/50 hover:text-white transition-colors">
                +7 701 944 4441
              </a>
            </div>
            
            <div className="relative">
              <button onClick={() => setLangOpen(!langOpen)}
                className="hidden md:inline-flex items-center gap-1 px-2 h-8 rounded transition-colors text-[12px] text-white/70 hover:text-white"
                style={{ background: langOpen ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)' }}>
                <Globe size={14} />
                <span className="uppercase">{i18n.language}</span>
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-1 w-32 rounded-lg bg-[#16191d] border border-white/10 shadow-2xl overflow-hidden py-1">
                  {LANGUAGES.map(l => (
                    <button key={l.code} onClick={() => changeLang(l.code)}
                      className="w-full text-left px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors">
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a href={accountUrl} target="_blank" rel="noopener noreferrer"
              className="hidden md:inline-flex items-center justify-center w-8 h-8 rounded-full transition-colors"
              style={{ background: 'rgba(255,255,255,0.08)' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}>
              <User size={14} color="#fff" />
            </a>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded transition-colors text-white">
              {isMenuOpen ? <X size={20}/> : <Menu size={20}/>}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden pb-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex flex-col pt-3 gap-1">
              {navLinks.map(link => (
                <button key={link.id} onClick={() => scrollTo(link.id)}
                  className="text-left px-3 py-2.5 text-sm uppercase tracking-wider text-white/70 hover:text-white transition-colors rounded"
                  style={{ background: activeSection === link.id ? 'rgba(255,255,255,0.05)' : 'transparent' }}>
                  {link.label}
                </button>
              ))}
              
              <div className="px-3 py-2 flex flex-wrap gap-2 mt-2">
                {LANGUAGES.map(l => (
                  <button key={l.code} onClick={() => changeLang(l.code)}
                    className="px-2 py-1 text-xs rounded border border-white/20 text-white/70"
                    style={{ background: i18n.language === l.code ? 'rgba(255,255,255,0.1)' : 'transparent' }}>
                    {l.label}
                  </button>
                ))}
              </div>

              <div className="mt-2 pt-2 flex flex-col gap-2" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <a href="tel:+77007006613" className="px-3 py-2 text-sm text-white/50">+7 700 700 6613</a>
                <a href="tel:+77019444441" className="px-3 py-2 text-sm text-white/50">+7 701 944 4441</a>
                <a href={loginUrl} target="_blank" rel="noopener noreferrer"
                  className="mx-3 mt-1 py-2.5 text-center text-sm font-medium rounded text-black bg-white">
                  {t('nav.signIn')}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
`

// Update Footer.tsx
files['components/Footer.tsx'] = `import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()
  return (
    <footer className="bg-black pt-20 pb-10 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="text-white font-semibold text-lg tracking-[2px] uppercase mb-4">STARLINK ASIA</div>
            <p className="text-white/50 text-sm max-w-sm">{t('footer.desc')}</p>
          </div>
          
          <div>
            <h4 className="text-white text-sm font-medium mb-4 uppercase tracking-wider">{t('footer.contacts')}</h4>
            <ul className="space-y-3">
              <li><a href="tel:+77007006613" className="text-white/50 hover:text-white transition-colors text-sm">+7 700 700 6613</a></li>
              <li><a href="tel:+77019444441" className="text-white/50 hover:text-white transition-colors text-sm">+7 701 944 4441</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white text-sm font-medium mb-4 uppercase tracking-wider">{t('footer.connect')}</h4>
            <ul className="space-y-3">
              <li><a href="https://starlink.com.kz" className="text-white/50 hover:text-white transition-colors text-sm">Казахстан</a></li>
              <li><a href="https://kg.starlink.com.kz" className="text-white/50 hover:text-white transition-colors text-sm">Кыргызстан</a></li>
              <li><a href="https://uz.starlink.com.kz" className="text-white/50 hover:text-white transition-colors text-sm">Узбекистан</a></li>
              <li><a href="https://tj.starlink.com.kz" className="text-white/50 hover:text-white transition-colors text-sm">Таджикистан</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-white/40 text-xs">
          <div>&copy; {new Date().getFullYear()} Starlink Asia. {t('footer.rights')}</div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
`

// Update i18n.ts with new translations
const i18nContent = fs.readFileSync(path.join(SRC_DIR, 'i18n.ts'), 'utf8')
const newI18nContent = i18nContent
  .replace("support: 'Служба поддержки'", "contacts: 'Наши контакты'")
  .replace("support: 'Қолдау қызметі'", "contacts: 'Біздің байланыстар'")
  .replace("support: 'Колдоо кызматы'", "contacts: 'Биздин байланыштар'")
  .replace(/support: "Qo'llab-quvvatlash xizmati"/, "contacts: 'Bizning aloqalarimiz'")
  .replace(/support: 'Хадамоти дастгирӣ'/, "contacts: 'Тамосҳои мо'")

files['i18n.ts'] = newI18nContent

for (const [relPath, content] of Object.entries(files)) {
  const fullPath = path.join(SRC_DIR, relPath)
  fs.writeFileSync(fullPath, content, 'utf8')
  console.log('Updated', relPath)
}
