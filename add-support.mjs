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
      nav: { map: 'Покрытие', countries: 'Страны', features: 'Преимущества', support: 'Поддержка', contact: 'Контакты', signIn: 'Войти' },
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
      support: {
        title: 'Часто задаваемые вопросы',
        items: [
          { q: 'Как установить Starlink?', a: 'В комплект входит всё необходимое: терминал, роутер, кабели и база. Система сама настраивается за пару минут, нужно лишь обеспечить ей открытый вид на небо.' },
          { q: 'Какая будет скорость?', a: 'Обычно скорость скачивания составляет от 100 до 200 Мбит/с, а задержка — около 20 мс в большинстве локаций.' },
          { q: 'Можно ли приостановить обслуживание?', a: 'Да, в зависимости от выбранного тарифа вы можете приостанавливать и возобновлять сервис в любое время.' }
        ]
      },
      footer: { desc: 'Глобальный провайдер спутникового интернета нового поколения.', support: 'Служба поддержки', connect: 'Подключение', rights: 'Все права защищены.' }
    }
  },
  kk: {
    translation: {
      nav: { map: 'Қамту аймағы', countries: 'Елдер', features: 'Артықшылықтар', support: 'Қолдау', contact: 'Байланыс', signIn: 'Кіру' },
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
      support: {
        title: 'Жиі қойылатын сұрақтар',
        items: [
          { q: 'Starlink-ті қалай орнатуға болады?', a: 'Жинақта барлық қажетті заттар бар: терминал, роутер, кабельдер және база. Жүйе өзін-өзі бірнеше минут ішінде реттейді, тек ашық аспан көрінісін қамтамасыз ету керек.' },
          { q: 'Жылдамдық қандай болады?', a: 'Әдетте жүктеп алу жылдамдығы 100-ден 200 Мбит/с-қа дейін, ал кідіріс көптеген аймақтарда шамамен 20 мс құрайды.' },
          { q: 'Қызметті уақытша тоқтатуға бола ма?', a: 'Иә, таңдалған тарифке байланысты қызметті кез келген уақытта тоқтатып, қайта жалғастыра аласыз.' }
        ]
      },
      footer: { desc: 'Жаңа буын спутниктік интернетінің жаһандық провайдери.', support: 'Қолдау қызметі', connect: 'Қосылу', rights: 'Барлық құқықтар қорғалған.' }
    }
  },
  ky: {
    translation: {
      nav: { map: 'Камтуу аймагы', countries: 'Өлкөлөр', features: 'Артыкчылыктар', support: 'Колдоо', contact: 'Байланыш', signIn: 'Кирүү' },
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
      support: {
        title: 'Көп берилүүчү суроолор',
        items: [
          { q: 'Starlink кантип орнотулат?', a: 'Топтомдо бардык керектүү нерселер бар: терминал, роутер, кабелдер жана база. Система бир нече мүнөттүн ичинде өзүн-өзү жөндөйт, болгону ачык асманды камсыз кылуу керек.' },
          { q: 'Ылдамдык кандай болот?', a: 'Адатта жүктөө ылдамдыгы 100дөн 200 Мбит/с чейин, ал эми кечигүү көпчүлүк аймактарда 20 мс түзөт.' },
          { q: 'Кызматты убактылуу токтотууга болобу?', a: 'Ооба, тандалган тарифке жараша кызматты каалаган убакта токтотуп жана кайра уланта аласыз.' }
        ]
      },
      footer: { desc: 'Жаңы муундагы спутниктик интернеттин дүйнөлүк провайдери.', support: 'Колдоо кызматы', connect: 'Кошулуу', rights: 'Бардык укуктар корголгон.' }
    }
  },
  uz: {
    translation: {
      nav: { map: 'Qamrov hududi', countries: 'Mamlakatlar', features: 'Afzalliklar', support: "Qo'llab-quvvatlash", contact: 'Aloqa', signIn: 'Kirish' },
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
      support: {
        title: "Ko'p so'raladigan savollar",
        items: [
          { q: "Starlink qanday o'rnatiladi?", a: "To'plamda barcha kerakli narsalar mavjud: terminal, router, kabellar va baza. Tizim o'zini bir necha daqiqada sozlaydi, faqat ochiq osmonni ta'minlash kerak." },
          { q: "Tezlik qanday bo'ladi?", a: "Odatda yuklab olish tezligi 100 dan 200 Mbit/s gacha, kechikish esa aksariyat hududlarda taxminan 20 ms ni tashkil qiladi." },
          { q: "Xizmatni vaqtincha to'xtatib turish mumkinmi?", a: "Ha, tanlangan tarifga qarab xizmatni xohlagan vaqtda to'xtatib turishingiz va qayta tiklashingiz mumkin." }
        ]
      },
      footer: { desc: "Yangi avlod sun'iy yo'ldosh internetining global provayderi.", support: "Qo'llab-quvvatlash xizmati", connect: 'Ulanish', rights: 'Barcha huquqlar himoyalangan.' }
    }
  },
  tg: {
    translation: {
      nav: { map: 'Минтақаи фарогирӣ', countries: 'Кишварҳо', features: 'Афзалиятҳо', support: 'Дастгирӣ', contact: 'Тамос', signIn: 'Вуруд' },
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
      support: {
        title: 'Саволҳои маъмул',
        items: [
          { q: 'Starlink чӣ гуна насб карда мешавад?', a: 'Маҷмӯа ҳама чизи лозимиро дар бар мегирад: терминал, роутер, кабелҳо ва база. Система дар якчанд дақиқа худро танзим мекунад, танҳо дидани осмони кушод лозим аст.' },
          { q: 'Суръат чӣ гуна хоҳад буд?', a: 'Одатан суръати боргирӣ аз 100 то 200 Мбит/с ва таъхир дар аксари минтақаҳо тақрибан 20 мс мебошад.' },
          { q: 'Оё мумкин аст хизматрасониро муваққатан боздошт кунем?', a: 'Бале, вобаста аз тарифи интихобшуда шумо метавонед хизматрасониро дар дилхоҳ вақт боздошт ва дубора фаъол кунед.' }
        ]
      },
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

files['components/Support.tsx'] = `import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const Support = () => {
  const { t } = useTranslation()
  const faqs = t('support.items', { returnObjects: true }) as { q: string, a: string }[];
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="support" className="py-24 bg-[#05070a] border-t border-white/5 relative">
      <div className="max-w-[800px] mx-auto px-6 md:px-10">
        <h2 className="text-3xl md:text-4xl font-medium text-white mb-12 tracking-tight">
          {t('support.title')}
        </h2>
        
        <div className="flex flex-col border-t border-white/10">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div key={i} className="border-b border-white/10">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
                >
                  <span className="text-lg text-white font-medium pr-8 group-hover:text-white/80 transition-colors">
                    {faq.q}
                  </span>
                  <div className="flex-shrink-0 text-white/50 group-hover:text-white transition-colors">
                    {isOpen ? <Minus size={20} strokeWidth={1.5} /> : <Plus size={20} strokeWidth={1.5} />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-white/60 text-[15px] leading-relaxed pr-8">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Support
`

files['App.tsx'] = `import Header from './components/Header'
import Hero from './components/Hero'
import AsiaMapSection from './components/AsiaMapSection'
import Countries from './components/Countries'
import Features from './components/Features'
import Support from './components/Support'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden max-w-full" style={{ background: '#000' }}>
      <Header />
      <Hero />
      <AsiaMapSection />
      <Countries />
      <Features />
      <Support />
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default App
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
    { id: 'support', label: t('nav.support') },
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

for (const [relPath, content] of Object.entries(files)) {
  const fullPath = path.join(SRC_DIR, relPath)
  fs.writeFileSync(fullPath, content, 'utf8')
  console.log('Updated', relPath)
}
