import fs from 'fs'
import path from 'path'

const PROJECT_DIR = '../starlink-asia'
const SRC_DIR = path.join(PROJECT_DIR, 'src')

const files = {}

files['i18n.ts'] = `import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ru: {
    translation: {
      nav: { map: 'Покрытие', countries: 'Страны', features: 'Преимущества', contact: 'Контакты', signIn: 'Войти' },
      hero: { title: 'Спутниковый интернет по всей Азии', desc: 'Высокоскоростной широкополосный интернет с низкой задержкой. Доступен в любой точке покрытия.', orderBtn: 'Подключить', coverageBtn: 'Карта покрытия' },
      countries: { title: 'Доступные страны', desc: 'Starlink официально работает в ряде стран Центральной и Восточной Азии.' },
      features: { 
        title: 'Преимущества',
        items: [
          { value: '150+', unit: 'Мбит/с', desc: 'Сверхвысокая скорость скачивания для любых задач' },
          { value: '25', unit: 'мс', desc: 'Минимальная задержка благодаря низкой орбите' },
          { value: '100%', unit: 'Связь', desc: 'Работает в самых удаленных и труднодоступных местах' }
        ]
      },
      map: { active: 'Активное покрытие', asia: 'Страны Азии', click: 'Нажмите для перехода', soon: 'Скоро' },
      footer: { desc: 'Глобальный провайдер спутникового интернета нового поколения.', support: 'Служба поддержки', connect: 'Подключение', rights: 'Все права защищены.' }
    }
  },
  kk: {
    translation: {
      nav: { map: 'Қамту аймағы', countries: 'Елдер', features: 'Артықшылықтар', contact: 'Байланыс', signIn: 'Кіру' },
      hero: { title: 'Бүкіл Азия бойынша спутниктік интернет', desc: 'Төмен кідірісі бар жоғары жылдамдықты интернет. Қамту аймағының кез келген нүктесінде қолжетімді.', orderBtn: 'Қосылу', coverageBtn: 'Қамту картасы' },
      countries: { title: 'Қолжетімді елдер', desc: 'Starlink Орталық және Шығыс Азияның бірқатар елдерінде ресми түрде жұмыс істейді.' },
      features: { 
        title: 'Артықшылықтар',
        items: [
          { value: '150+', unit: 'Мбит/с', desc: 'Кез келген тапсырма үшін өте жоғары жүктеп алу жылдамдығы' },
          { value: '25', unit: 'мс', desc: 'Төменгі орбитаның арқасында минималды кідіріс' },
          { value: '100%', unit: 'Байланыс', desc: 'Ең шалғай және жету қиын жерлерде жұмыс істейді' }
        ]
      },
      map: { active: 'Белсенді қамту', asia: 'Азия елдері', click: 'Өту үшін басыңыз', soon: 'Жақында' },
      footer: { desc: 'Жаңа буын спутниктік интернетінің жаһандық провайдери.', support: 'Қолдау қызметі', connect: 'Қосылу', rights: 'Барлық құқықтар қорғалған.' }
    }
  },
  ky: {
    translation: {
      nav: { map: 'Камтуу аймагы', countries: 'Өлкөлөр', features: 'Артыкчылыктар', contact: 'Байланыш', signIn: 'Кирүү' },
      hero: { title: 'Бүткүл Азия боюнча спутниктик интернет', desc: 'Кечигүүсү аз болгон жогорку ылдамдыктагы интернет. Камтуу аймагынын бардык жеринде жеткиликтүү.', orderBtn: 'Кошулуу', coverageBtn: 'Камтуу картасы' },
      countries: { title: 'Жеткиликтүү өлкөлөр', desc: 'Starlink Борбордук жана Чыгыш Азиянын бир катар өлкөлөрүндө расмий иштейт.' },
      features: { 
        title: 'Артыкчылыктар',
        items: [
          { value: '150+', unit: 'Мбит/с', desc: 'Кандай гана тапшырма болбосун жогорку ылдамдыкта жүктөө' },
          { value: '25', unit: 'мс', desc: 'Төмөнкү орбитанын аркасында минималдуу кечигүү' },
          { value: '100%', unit: 'Байланыш', desc: 'Эң алыскы жана жетүүгө кыйын жерлерде иштейт' }
        ]
      },
      map: { active: 'Активдүү камтуу', asia: 'Азия өлкөлөрү', click: 'Өтүү үчүн басыңыз', soon: 'Жакында' },
      footer: { desc: 'Жаңы муундагы спутниктик интернеттин дүйнөлүк провайдери.', support: 'Колдоо кызматы', connect: 'Кошулуу', rights: 'Бардык укуктар корголгон.' }
    }
  },
  uz: {
    translation: {
      nav: { map: 'Qamrov hududi', countries: 'Mamlakatlar', features: 'Afzalliklar', contact: 'Aloqa', signIn: 'Kirish' },
      hero: { title: "Butun Osiyo bo'ylab sun'iy yo'ldosh interneti", desc: "Past kechikishga ega yuqori tezlikdagi internet. Qamrov xaritasining barcha nuqtalarida mavjud.", orderBtn: 'Ulanish', coverageBtn: 'Qamrov xaritasi' },
      countries: { title: 'Mavjud mamlakatlar', desc: 'Starlink Markaziy va Sharqiy Osiyoning bir qator mamlakatlarida rasmiy ravishda ishlaydi.' },
      features: { 
        title: 'Afzalliklar',
        items: [
          { value: '150+', unit: 'Mbit/s', desc: "Har qanday vazifa uchun o'ta yuqori yuklab olish tezligi" },
          { value: '25', unit: 'ms', desc: 'Past orbita tufayli minimal kechikish' },
          { value: '100%', unit: 'Aloqa', desc: 'Eng chekka va borish qiyin joylarda ishlaydi' }
        ]
      },
      map: { active: 'Faol qamrov', asia: 'Osiyo mamlakatlari', click: "O'tish uchun bosing", soon: 'Tez kunda' },
      footer: { desc: "Yangi avlod sun'iy yo'ldosh internetining global provayderi.", support: "Qo'llab-quvvatlash xizmati", connect: 'Ulanish', rights: 'Barcha huquqlar himoyalangan.' }
    }
  },
  tg: {
    translation: {
      nav: { map: 'Минтақаи фарогирӣ', countries: 'Кишварҳо', features: 'Афзалиятҳо', contact: 'Тамос', signIn: 'Вуруд' },
      hero: { title: 'Интернети моҳвораӣ дар тамоми Осиё', desc: 'Интернети баландсуръат бо таъхири кам. Дар тамоми минтақаи фарогирӣ дастрас аст.', orderBtn: 'Пайваст шудан', coverageBtn: 'Харитаи фарогирӣ' },
      countries: { title: 'Кишварҳои дастрас', desc: 'Starlink дар як қатор кишварҳои Осиёи Марказӣ ва Шарқӣ расман фаъолият мекунад.' },
      features: { 
        title: 'Афзалиятҳо',
        items: [
          { value: '150+', unit: 'Мбит/с', desc: 'Суръати фавқулодда баланди зеркашӣ барои ҳама гуна вазифаҳо' },
          { value: '25', unit: 'мс', desc: 'Таъхири ҳадди аққал ба шарофати мадори паст' },
          { value: '100%', unit: 'Алоқа', desc: 'Дар ҷойҳои дурдасттарин ва дастнорас кор мекунад' }
        ]
      },
      map: { active: 'Фарогирии фаъол', asia: 'Кишварҳои Осиё', click: 'Барои гузаштан пахш кунед', soon: 'Ба зудӣ' },
      footer: { desc: 'Провайдери ҷаҳонии интернети моҳвораии насли нав.', support: 'Хадамоти дастгирӣ', connect: 'Пайвастшавӣ', rights: 'Ҳамаи ҳуқуқҳо маҳфузанд.' }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
`

files['main.tsx'] = `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
`

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
    { id: 'contact', label: t('nav.contact') },
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

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <button key={link.id} onClick={() => scrollTo(link.id)}
                className="px-3.5 py-1.5 text-[13px] font-medium rounded transition-colors duration-200"
                style={{
                  color: activeSection === link.id ? '#fff' : 'rgba(255,255,255,0.6)',
                  background: activeSection === link.id ? 'rgba(255,255,255,0.08)' : 'transparent',
                }}>
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href="tel:+77007006613"
              className="hidden lg:inline-flex text-[12px] text-white/50 hover:text-white transition-colors underline underline-offset-2"
              style={{textDecorationColor:'rgba(255,255,255,0.2)'}}>
              +7 700 700 6613
            </a>
            
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
              className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded transition-colors text-white">
              {isMenuOpen ? <X size={20}/> : <Menu size={20}/>}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex flex-col pt-3 gap-1">
              {navLinks.map(link => (
                <button key={link.id} onClick={() => scrollTo(link.id)}
                  className="text-left px-3 py-2.5 text-sm text-white/70 hover:text-white transition-colors rounded"
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

files['components/Hero.tsx'] = `import { motion } from 'framer-motion'
import { ArrowRight, Satellite } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import TopBanner from './TopBanner'

const Hero = () => {
  const { t } = useTranslation()
  const scrollToMap = () => {
    const el = document.getElementById('map')
    if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' })
  }

  return (
    <div className="relative min-h-[90vh] flex flex-col pt-16">
      <TopBanner />
      
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0d12] via-[#05070a] to-[#000000]" />
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
        />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03]" />
      </div>

      <div className="flex-1 max-w-[1400px] mx-auto px-6 md:px-10 w-full flex flex-col justify-center relative z-10 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
            <Satellite size={14} className="text-white/70" />
            <span className="text-xs font-medium text-white/80 tracking-wide uppercase">Starlink Asia</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-[80px] font-medium text-white leading-[1.05] tracking-tight mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
            {t('hero.title')}
          </h1>
          
          <p className="text-lg md:text-xl text-white/60 leading-relaxed mb-10 max-w-xl font-light">
            {t('hero.desc')}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a href="https://starlink.com.kz" target="_blank" rel="noopener noreferrer"
               className="w-full sm:w-auto px-8 py-3.5 bg-white text-black text-[15px] font-medium rounded hover:bg-gray-200 transition-colors text-center inline-flex justify-center items-center gap-2 group">
              {t('hero.orderBtn')}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            
            <button onClick={scrollToMap}
               className="w-full sm:w-auto px-8 py-3.5 bg-transparent text-white border border-white/20 text-[15px] font-medium rounded hover:bg-white/5 hover:border-white/40 transition-all text-center">
              {t('hero.coverageBtn')}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Hero
`

files['components/Countries.tsx'] = `import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const COUNTRIES = [
  { code: 'KZ', name: 'Казахстан', flag: '🇰🇿', url: 'https://starlink.com.kz', region: 'Central Asia' },
  { code: 'KG', name: 'Кыргызстан', flag: '🇰🇬', url: 'https://kg.starlink.com.kz', region: 'Central Asia' },
  { code: 'TJ', name: 'Таджикистан', flag: '🇹🇯', url: 'https://tj.starlink.com.kz', region: 'Central Asia' },
  { code: 'UZ', name: 'Узбекистан', flag: '🇺🇿', url: 'https://uz.starlink.com.kz', region: 'Central Asia' },
]

const Countries = () => {
  const { t } = useTranslation()
  return (
    <section id="countries" className="py-24 bg-[#05070a] relative border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-medium text-white mb-4 tracking-tight">{t('countries.title')}</h2>
            <p className="text-white/50 text-lg font-light">{t('countries.desc')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {COUNTRIES.map((c, i) => (
            <motion.a
              key={c.code}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group block p-6 rounded-2xl border border-white/10 bg-[#0a0d12] hover:bg-[#11161d] hover:border-white/20 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />
              
              <div className="flex items-center justify-between mb-8">
                <span className="text-5xl drop-shadow-lg">{c.flag}</span>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white text-white group-hover:text-black transition-all">
                  <ExternalLink size={14} />
                </div>
              </div>
              
              <div>
                <div className="text-xs font-medium text-white/40 tracking-wider uppercase mb-1">{c.region}</div>
                <h3 className="text-2xl font-medium text-white">{c.name}</h3>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Countries
`

files['components/Features.tsx'] = `import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const Features = () => {
  const { t } = useTranslation()
  const features = t('features.items', { returnObjects: true }) as any[];
  
  return (
    <section id="features" className="py-24 bg-black border-t border-white/5 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <h2 className="text-3xl md:text-5xl font-medium text-white mb-16 tracking-tight text-center">
          {t('features.title')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="flex flex-col items-center text-center p-8 rounded-2xl bg-white/[0.02] border border-white/5"
            >
              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-6xl lg:text-7xl font-light text-white tracking-tighter">{f.value}</span>
                <span className="text-xl text-white/50">{f.unit}</span>
              </div>
              <p className="text-white/60 text-lg leading-relaxed max-w-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
`

files['components/AsiaMapSection.tsx'] = `import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import AsiaMap from './AsiaMap'

const AsiaMapSection = () => {
  const { t } = useTranslation()
  return (
    <section id="map" className="py-24 bg-black relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <motion.div 
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="relative rounded-[20px] p-[1px] overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)'
          }}>
          <div className="bg-[#05070a] rounded-[20px] overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03]" />
            <AsiaMap />
            <div className="absolute bottom-6 left-6 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                <span className="text-xs text-white/60 font-medium">{t('map.active')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-2.5 bg-white/10 rounded-[2px]" />
                <span className="text-xs text-white/60 font-medium">{t('map.asia')}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AsiaMapSection
`

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
            <h4 className="text-white text-sm font-medium mb-4 uppercase tracking-wider">{t('footer.support')}</h4>
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

for (const [relPath, content] of Object.entries(files)) {
  const fullPath = path.join(SRC_DIR, relPath)
  fs.writeFileSync(fullPath, content, 'utf8')
  console.log('Updated', relPath)
}
