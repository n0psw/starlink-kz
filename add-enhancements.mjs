import fs from 'fs'
import path from 'path'

const PROJECT_DIR = '../starlink-asia'
const SRC_DIR = path.join(PROJECT_DIR, 'src')

const files = {}

// 1. UPDATED i18n.ts
files['i18n.ts'] = `import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ru: {
    translation: {
      nav: { map: 'Покрытие', countries: 'Страны', features: 'Преимущества', setup: 'Установка', specs: 'Спецификации', support: 'Поддержка', contact: 'Контакты', signIn: 'Войти' },
      hero: { title: 'Спутниковый интернет по всей Азии', desc: 'Высокоскоростной широкополосный интернет с низкой задержкой. Доступен в любой точке покрытия.', searchPlaceholder: 'Выберите вашу страну...' },
      countries: { title: 'Доступные страны', desc: 'Starlink официально работает в ряде стран Центральной и Восточной Азии.' },
      features: { 
        title: 'Преимущества',
        items: [
          { value: '150+', unit: 'Мбит/с', desc: 'Сверхвысокая скорость скачивания для любых задач' },
          { value: '25', unit: 'мс', desc: 'Минимальная задержка благодаря низкой орбите' },
          { value: '100%', unit: 'Связь', desc: 'Работает в самых удаленных и труднодоступных местах' }
        ]
      },
      setup: {
        title: 'Установка за считанные минуты',
        desc: 'Комплект Starlink поставляется со всем необходимым для выхода в интернет.',
        steps: [
          { title: 'Найдите открытое небо', desc: 'Антенне нужен беспрепятственный обзор неба' },
          { title: 'Подключите к сети', desc: 'Вставьте кабель в розетку' },
          { title: 'Вы в сети', desc: 'Маршрутизатор настроится автоматически' }
        ]
      },
      app: {
        title: 'Управляйте сетью со смартфона',
        desc: 'Приложение Starlink помогает настроить параметры, получать обновления, обращаться в поддержку и проверять скорость в реальном времени.',
        download: 'Доступно для iOS и Android'
      },
      specs: {
        title: 'Спецификации',
        items: [
          { label: 'Антенна', value: 'Электронная фазированная антенная решетка' },
          { label: 'Ориентация', value: 'Автоматическая с электроприводом' },
          { label: 'Защита от среды', value: 'IP54 (Защита от пыли и брызг воды)' },
          { label: 'Плавление снега', value: 'До 40 мм/час' },
          { label: 'Температура', value: 'от -30°C до +50°C' },
          { label: 'Wi-Fi роутер', value: 'Wi-Fi 6 (802.11ax), Dual Band' }
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
      nav: { map: 'Қамту аймағы', countries: 'Елдер', features: 'Артықшылықтар', setup: 'Орнату', specs: 'Сипаттамалар', support: 'Қолдау', contact: 'Байланыс', signIn: 'Кіру' },
      hero: { title: 'Бүкіл Азия бойынша спутниктік интернет', desc: 'Төмен кідірісі бар жоғары жылдамдықты интернет. Қамту аймағының кез келген нүктесінде қолжетімді.', searchPlaceholder: 'Өз еліңізді таңдаңыз...' },
      countries: { title: 'Қолжетімді елдер', desc: 'Starlink Орталық және Шығыс Азияның бірқатар елдерінде ресми түрде жұмыс істейді.' },
      features: { 
        title: 'Артықшылықтар',
        items: [
          { value: '150+', unit: 'Мбит/с', desc: 'Кез келген тапсырма үшін өте жоғары жүктеп алу жылдамдығы' },
          { value: '25', unit: 'мс', desc: 'Төменгі орбитаның арқасында минималды кідіріс' },
          { value: '100%', unit: 'Байланыс', desc: 'Ең шалғай және жету қиын жерлерде жұмыс істейді' }
        ]
      },
      setup: {
        title: 'Бірнеше минут ішінде орнату',
        desc: 'Starlink жинағы интернетке қосылуға қажетті барлық нәрсемен бірге жеткізіледі.',
        steps: [
          { title: 'Ашық аспанды табыңыз', desc: 'Антеннаға аспанның кедергісіз көрінісі қажет' },
          { title: 'Желіге қосыңыз', desc: 'Кабельді розеткаға қосыңыз' },
          { title: 'Сіз желідесіз', desc: 'Маршрутизатор автоматты түрде реттеледі' }
        ]
      },
      app: {
        title: 'Желіні смартфоннан басқарыңыз',
        desc: 'Starlink қолданбасы параметрлерді реттеуге, жаңартулар алуға және жылдамдықты тексеруге көмектеседі.',
        download: 'iOS және Android үшін қолжетімді'
      },
      specs: {
        title: 'Техникалық сипаттамалар',
        items: [
          { label: 'Антенна', value: 'Электрондық фазалық антенна торы' },
          { label: 'Бағдарлау', value: 'Электр жетегі бар автоматты' },
          { label: 'Ортадан қорғау', value: 'IP54 (Шаң мен су шашырандыларынан қорғау)' },
          { label: 'Қарды еріту', value: '40 мм/сағ дейін' },
          { label: 'Температура', value: '-30°C-тан +50°C-қа дейін' },
          { label: 'Wi-Fi роутер', value: 'Wi-Fi 6 (802.11ax), Dual Band' }
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
      nav: { map: 'Камтуу аймагы', countries: 'Өлкөлөр', features: 'Артыкчылыктар', setup: 'Орнотуу', specs: 'Мүнөздөмөлөр', support: 'Колдоо', contact: 'Байланыш', signIn: 'Кирүү' },
      hero: { title: 'Бүткүл Азия боюнча спутниктик интернет', desc: 'Кечигүүсү аз болгон жогорку ылдамдыктагы интернет. Камтуу аймагынын бардык жеринде жеткиликтүү.', searchPlaceholder: 'Өлкөңүздү тандаңыз...' },
      countries: { title: 'Жеткиликтүү өлкөлөр', desc: 'Starlink Борбордук жана Чыгыш Азиянын бир катар өлкөлөрүндө расмий иштейт.' },
      features: { 
        title: 'Артыкчылыктар',
        items: [
          { value: '150+', unit: 'Мбит/с', desc: 'Кандай гана тапшырма болбосун жогорку ылдамдыкта жүктөө' },
          { value: '25', unit: 'мс', desc: 'Төмөнкү орбитанын аркасында минималдуу кечигүү' },
          { value: '100%', unit: 'Байланыш', desc: 'Эң алыскы жана жетүүгө кыйын жерлерде иштейт' }
        ]
      },
      setup: {
        title: 'Бир нече мүнөттүн ичинде орнотуу',
        desc: 'Starlink топтому интернетке кирүү үчүн зарыл болгон бардык нерселер менен келет.',
        steps: [
          { title: 'Ачык асманды табыңыз', desc: 'Антеннага асмандын тоскоолдуксуз көрүнүшү керек' },
          { title: 'Тармакка кошуңуз', desc: 'Кабелди розеткага сайыңыз' },
          { title: 'Сиз тармактасыз', desc: 'Маршрутизатор автоматтык түрдө жөндөлөт' }
        ]
      },
      app: {
        title: 'Тармакты смартфондон башкарыңыз',
        desc: 'Starlink тиркемеси жөндөөлөрдү башкарууга, ылдамдыкты текшерүүгө жана колдоо алууга жардам берет.',
        download: 'iOS жана Android үчүн жеткиликтүү'
      },
      specs: {
        title: 'Техникалык мүнөздөмөлөр',
        items: [
          { label: 'Антенна', value: 'Электрондук фазалык антенна массиви' },
          { label: 'Багыттоо', value: 'Электр кыймылдаткычы менен автоматтык' },
          { label: 'Коргоо', value: 'IP54 (Чаң жана суудан коргоо)' },
          { label: 'Кар эритүү', value: '40 мм/саатка чейин' },
          { label: 'Температура', value: '-30°C дан +50°C га чейин' },
          { label: 'Wi-Fi роутер', value: 'Wi-Fi 6 (802.11ax), Dual Band' }
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
      nav: { map: 'Qamrov hududi', countries: 'Mamlakatlar', features: 'Afzalliklar', setup: "O'rnatish", specs: 'Xususiyatlar', support: "Qo'llab-quvvatlash", contact: 'Aloqa', signIn: 'Kirish' },
      hero: { title: "Butun Osiyo bo'ylab sun'iy yo'ldosh interneti", desc: "Past kechikishga ega yuqori tezlikdagi internet. Qamrov xaritasining barcha nuqtalarida mavjud.", searchPlaceholder: 'Mamlakatingizni tanlang...' },
      countries: { title: 'Mavjud mamlakatlar', desc: 'Starlink Markaziy va Sharqiy Osiyoning bir qator mamlakatlarida rasmiy ravishda ishlaydi.' },
      features: { 
        title: 'Afzalliklar',
        items: [
          { value: '150+', unit: 'Mbit/s', desc: "Har qanday vazifa uchun o'ta yuqori yuklab olish tezligi" },
          { value: '25', unit: 'ms', desc: 'Past orbita tufayli minimal kechikish' },
          { value: '100%', unit: 'Aloqa', desc: 'Eng chekka va borish qiyin joylarda ishlaydi' }
        ]
      },
      setup: {
        title: 'Sanoqli daqiqalarda o\\'rnatish',
        desc: 'Starlink to\\'plami internetga ulanish uchun barcha zarur narsalar bilan ta\\'minlangan.',
        steps: [
          { title: 'Ochiq osmonni toping', desc: 'Antennaga osmonning to\\'siqsiz ko\\'rinishi kerak' },
          { title: 'Tarmoqqa ulang', desc: 'Kabelni rozetkaga ulang' },
          { title: 'Siz tarmoqdasiz', desc: 'Router avtomatik ravishda sozlanadi' }
        ]
      },
      app: {
        title: 'Tarmoqni smartfondan boshqaring',
        desc: 'Starlink ilovasi sozlamalarni boshqarish, tezlikni tekshirish va qo\\'llab-quvvatlash xizmatiga murojaat qilishga yordam beradi.',
        download: 'iOS va Android uchun mavjud'
      },
      specs: {
        title: 'Texnik xususiyatlar',
        items: [
          { label: 'Antenna', value: 'Elektron fazali antenna massivi' },
          { label: 'Yo\\'naltirish', value: 'Elektr uzatmali avtomatik' },
          { label: 'Himoya', value: 'IP54 (Chang va suv sachrashidan himoya)' },
          { label: 'Qor eritish', value: '40 mm/soat gacha' },
          { label: 'Harorat', value: '-30°C dan +50°C gacha' },
          { label: 'Wi-Fi router', value: 'Wi-Fi 6 (802.11ax), Dual Band' }
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
      nav: { map: 'Минтақаи фарогирӣ', countries: 'Кишварҳо', features: 'Афзалиятҳо', setup: 'Насб', specs: 'Хусусиятҳо', support: 'Дастгирӣ', contact: 'Тамос', signIn: 'Вуруд' },
      hero: { title: 'Интернети моҳвораӣ дар тамоми Осиё', desc: 'Интернети баландсуръат бо таъхири кам. Дар тамоми минтақаи фарогирӣ дастрас аст.', searchPlaceholder: 'Кишвари худро интихоб кунед...' },
      countries: { title: 'Кишварҳои дастрас', desc: 'Starlink дар як қатор кишварҳои Осиёи Марказӣ ва Шарқӣ расман фаъолият мекунад.' },
      features: { 
        title: 'Афзалиятҳо',
        items: [
          { value: '150+', unit: 'Мбит/с', desc: 'Суръати фавқулодда баланди зеркашӣ барои ҳама гуна вазифаҳо' },
          { value: '25', unit: 'мс', desc: 'Таъхири ҳадди аққал ба шарофати мадори паст' },
          { value: '100%', unit: 'Алоқа', desc: 'Дар ҷойҳои дурдасттарин ва дастнорас кор мекунад' }
        ]
      },
      setup: {
        title: 'Насб дар чанд дақиқа',
        desc: 'Маҷмӯаи Starlink бо ҳама чизи лозимӣ барои пайвастшавӣ ба интернет меояд.',
        steps: [
          { title: 'Осмони кушодро ёбед', desc: 'Ба антенна намуди бемамониати осмон лозим аст' },
          { title: 'Ба шабака пайваст кунед', desc: 'Кабелро ба васлаки барқ пайваст кунед' },
          { title: 'Шумо дар шабака ҳастед', desc: 'Роутер ба таври худкор танзим мешавад' }
        ]
      },
      app: {
        title: 'Шабакаро аз смартфон идора кунед',
        desc: 'Барномаи Starlink ба шумо дар танзими параметрҳо, санҷиши суръат ва гирифтани кӯмак ёрӣ медиҳад.',
        download: 'Барои iOS ва Android дастрас аст'
      },
      specs: {
        title: 'Мушаххасоти техникӣ',
        items: [
          { label: 'Антенна', value: 'Массиви электронии марҳилавӣ' },
          { label: 'Самтёбӣ', value: 'Автоматӣ бо муҳаррики барқӣ' },
          { label: 'Муҳофизат', value: 'IP54 (Муҳофизат аз чанг ва об)' },
          { label: 'Обкунии барф', value: 'То 40 мм/соат' },
          { label: 'Ҳарорат', value: 'аз -30°C то +50°C' },
          { label: 'Wi-Fi роутер', value: 'Wi-Fi 6 (802.11ax), Dual Band' }
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

// 2. UPDATED Header.tsx
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

          <div className="flex items-center gap-2">
            <a href="tel:+77007006613"
              className="hidden xl:inline-flex text-[12px] text-white/50 hover:text-white transition-colors underline underline-offset-2 mr-2"
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

// 3. UPDATED Hero.tsx (With interactive search and video background vibe)
files['components/Hero.tsx'] = `import { motion } from 'framer-motion'
import { ArrowRight, Satellite, Search, MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import TopBanner from './TopBanner'

const COUNTRIES = [
  { code: 'KZ', name: 'Казахстан', flag: '🇰🇿', url: 'https://starlink.com.kz' },
  { code: 'KG', name: 'Кыргызстан', flag: '🇰🇬', url: 'https://kg.starlink.com.kz' },
  { code: 'TJ', name: 'Таджикистан', flag: '🇹🇯', url: 'https://tj.starlink.com.kz' },
  { code: 'UZ', name: 'Узбекистан', flag: '🇺🇿', url: 'https://uz.starlink.com.kz' },
]

const Hero = () => {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)

  const filtered = COUNTRIES.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="relative min-h-[100vh] flex flex-col pt-16">
      <TopBanner />
      
      {/* Animated Space Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#020406]">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.05] mix-blend-screen" />
        
        {/* Glow effect */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] opacity-30"
          style={{
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.15) 0%, transparent 60%)',
            filter: 'blur(80px)'
          }}
        />

        {/* CSS Planet Curve */}
        <div className="absolute -bottom-[60%] left-1/2 -translate-x-1/2 w-[200%] aspect-square rounded-full border-t border-white/10"
          style={{
            background: 'radial-gradient(circle at center, #08121f 0%, #000000 70%)',
            boxShadow: '0 -20px 100px rgba(255,255,255,0.02)'
          }}
        />
      </div>

      <div className="flex-1 max-w-[1400px] mx-auto px-6 md:px-10 w-full flex flex-col justify-center relative z-10 py-20 items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl w-full flex flex-col items-center">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8">
            <Satellite size={14} className="text-white/70" />
            <span className="text-xs font-medium text-white/80 tracking-wide uppercase">Starlink Asia</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-[80px] font-medium text-white leading-[1.05] tracking-tight mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
            {t('hero.title')}
          </h1>
          
          <p className="text-lg md:text-xl text-white/60 leading-relaxed mb-12 max-w-2xl font-light">
            {t('hero.desc')}
          </p>
          
          {/* Interactive Search exactly like Starlink.com "Service Address" */}
          <div className="relative w-full max-w-lg mb-8">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={20} className="text-white/40 group-focus-within:text-white/80 transition-colors" />
              </div>
              <input
                type="text"
                placeholder={t('hero.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setShowDropdown(true); }}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                className="w-full bg-[#111418] border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all text-lg shadow-2xl"
              />
            </div>
            
            {showDropdown && searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#161a20] border border-white/10 rounded-lg shadow-2xl overflow-hidden z-50">
                {filtered.length > 0 ? (
                  filtered.map(c => (
                    <a key={c.code} href={c.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-between px-4 py-3 hover:bg-white/10 transition-colors border-b border-white/5 last:border-0 group">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{c.flag}</span>
                        <span className="text-white text-base font-medium">{c.name}</span>
                      </div>
                      <ArrowRight size={18} className="text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </a>
                  ))
                ) : (
                  <div className="px-4 py-4 text-white/50 text-sm text-center">
                    Не найдено
                  </div>
                )}
              </div>
            )}
          </div>

        </motion.div>
      </div>
    </div>
  )
}

export default Hero
`

// 4. NEW Setup.tsx (Hardware & Installation)
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
          
          {/* Visual Side - Minimalist Hardware Representation */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="relative aspect-square md:aspect-video lg:aspect-square bg-[#05070a] rounded-3xl border border-white/10 flex items-center justify-center overflow-hidden">
            
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]" />
            
            {/* Minimalist Dish */}
            <div className="relative flex flex-col items-center">
              <div className="w-48 h-32 md:w-64 md:h-40 bg-gradient-to-b from-white/20 to-white/5 rounded-[40%] border border-white/30 transform -rotate-12 flex items-center justify-center shadow-2xl backdrop-blur-sm">
                <div className="w-3/4 h-3/4 border border-white/10 rounded-[40%] opacity-50" />
              </div>
              <div className="w-2 h-16 md:h-24 bg-gradient-to-b from-white/20 to-white/5" />
              <div className="w-16 h-2 bg-white/20 rounded-full" />
            </div>

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

// 5. NEW AppSection.tsx
files['components/AppSection.tsx'] = `import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Smartphone, Download, Settings, BarChart2 } from 'lucide-react'

const AppSection = () => {
  const { t } = useTranslation()
  return (
    <section className="py-32 bg-[#020406] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center flex-col-reverse lg:flex-row-reverse">
          
          {/* Phone Mockup Side */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="flex justify-center lg:justify-end">
            <div className="relative w-[280px] h-[580px] rounded-[40px] border-[6px] border-[#1f2226] bg-black shadow-[0_0_80px_rgba(255,255,255,0.05)] overflow-hidden flex flex-col items-center">
              {/* Notch */}
              <div className="absolute top-0 w-32 h-6 bg-[#1f2226] rounded-b-xl z-10" />
              
              {/* Fake UI */}
              <div className="w-full h-full pt-16 px-6 bg-gradient-to-b from-[#0a0d12] to-black">
                <div className="w-full flex justify-between items-center mb-10">
                  <span className="text-white/80 font-semibold tracking-widest text-xs uppercase">STARLINK</span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"><Smartphone size={14} className="text-white" /></div>
                </div>
                
                <div className="w-40 h-40 mx-auto rounded-full border border-green-500/30 flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(34,197,94,0.1)]">
                  <div className="w-32 h-32 rounded-full border border-green-500/50 flex items-center justify-center bg-green-500/5">
                    <span className="text-green-500 font-medium">ONLINE</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/5 rounded-xl p-4 flex flex-col items-center gap-2">
                    <BarChart2 size={20} className="text-white/60" />
                    <span className="text-white/40 text-xs">Statistics</span>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 flex flex-col items-center gap-2">
                    <Settings size={20} className="text-white/60" />
                    <span className="text-white/40 text-xs">Settings</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text Side */}
          <div className="flex flex-col justify-center">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 text-white">
              <Smartphone size={24} />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-medium text-white mb-6 tracking-tight">
              {t('app.title')}
            </h2>
            <p className="text-xl text-white/50 font-light mb-10 max-w-lg leading-relaxed">
              {t('app.desc')}
            </p>

            <a href="#" className="inline-flex items-center gap-3 px-6 py-4 rounded-lg border border-white/20 hover:bg-white hover:text-black hover:border-transparent text-white transition-all w-fit group">
              <Download size={20} className="group-hover:-translate-y-1 transition-transform" />
              <span className="font-medium text-sm">{t('app.download')}</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}

export default AppSection
`

// 6. NEW Specs.tsx
files['components/Specs.tsx'] = `import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const Specs = () => {
  const { t } = useTranslation()
  const items = t('specs.items', { returnObjects: true }) as { label: string, value: string }[]

  return (
    <section id="specs" className="py-32 bg-[#05070a] border-t border-white/5 relative">
      <div className="max-w-[1000px] mx-auto px-6 md:px-10">
        <h2 className="text-3xl md:text-4xl font-medium text-white mb-16 tracking-tight text-center">
          {t('specs.title')}
        </h2>
        
        <div className="flex flex-col">
          {items.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col md:flex-row md:items-center py-6 border-b border-white/10 last:border-0 gap-2 md:gap-8"
            >
              <div className="md:w-1/3 text-white/60 font-medium tracking-wide text-sm uppercase">
                {item.label}
              </div>
              <div className="md:w-2/3 text-white text-lg">
                {item.value}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Specs
`

// 7. UPDATED App.tsx
files['App.tsx'] = `import Header from './components/Header'
import Hero from './components/Hero'
import Setup from './components/Setup'
import AppSection from './components/AppSection'
import Specs from './components/Specs'
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
      <Setup />
      <AppSection />
      <Specs />
      <Support />
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default App
`

for (const [relPath, content] of Object.entries(files)) {
  const fullPath = path.join(SRC_DIR, relPath)
  fs.writeFileSync(fullPath, content, 'utf8')
  console.log('Updated', relPath)
}
