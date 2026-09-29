import fs from 'fs'
import path from 'path'

const PROJECT_DIR = '../starlink-asia'
const SRC_DIR = path.join(PROJECT_DIR, 'src')

const translations = {
  ru: {
    title: 'Калькулятор стоимости',
    typeLabel: 'Тип объекта',
    types: {
      house: 'Частный дом / Дача',
      camp: 'Вахтовый поселок / Стройплощадка',
      biz: 'Коммерческий объект / Промышленность',
      mobile: 'Мобильный / Автомобильный'
    },
    usersLabel: 'Количество пользователей',
    usersCount: 'чел.',
    optionsLabel: 'Дополнительные опции',
    meshOption: 'Mesh-модуль Wi-Fi (+45 000 ₸)',
    installOption: 'Профессиональный монтаж (+50 000 ₸)',
    notesLabel: 'Особые пожелания:',
    notesPlaceholder: 'Например: горная местность...',
    recommendedKit: 'Рекомендуемая комплектация:',
    aiRecommendation: 'ИИ-Рекомендация:',
    total: 'Итоговая стоимость:',
    btnWhatsApp: 'Получить КП в WhatsApp',
    recs: {
      mobile: 'Оптимально для быстрого развертывания.',
      standard: 'Рекомендуется стационарный комплект для стабильности.',
      mesh: 'Добавлен Mesh-модуль для покрытия {{users}} чел.',
      install: 'Включен монтаж.'
    }
  },
  kk: {
    title: 'Құнын есептеу',
    typeLabel: 'Нысан түрі',
    types: {
      house: 'Жек үй / Саяжай',
      camp: 'Вахталық кент / Құрылыс',
      biz: 'Коммерциялық нысан',
      mobile: 'Мобилді / Автомобильді'
    },
    usersLabel: 'Пайдаланушылар саны',
    usersCount: 'адам',
    optionsLabel: 'Қосымша опциялар',
    meshOption: 'Wi-Fi Mesh-модулі (+45 000 ₸)',
    installOption: 'Кәсіби орнату (+50 000 ₸)',
    notesLabel: 'Ерекше тілектер:',
    notesPlaceholder: 'Мысалы: таулы аймақ...',
    recommendedKit: 'Ұсынылатын жинақ:',
    aiRecommendation: 'ЖИ-Ұсыныс:',
    total: 'Жалпы құны:',
    btnWhatsApp: 'WhatsApp арқылы КП алу',
    recs: {
      mobile: 'Жылдам орнату үшін оңтайлы.',
      standard: 'Тұрақтылық үшін стандартты жинақ ұсынылады.',
      mesh: '{{users}} адамға арналған Mesh-модуль қосылды.',
      install: 'Орнату қосылған.'
    }
  },
  ky: {
    title: 'Баасын эсептөө',
    typeLabel: 'Объекттин түрү',
    types: {
      house: 'Жеке үй / Дача',
      camp: 'Вахталык айыл / Курулуш',
      biz: 'Коммерциялык объект',
      mobile: 'Мобилдик / Автомобилдик'
    },
    usersLabel: 'Колдонуучулардын саны',
    usersCount: 'адам',
    optionsLabel: 'Кошумча опциялар',
    meshOption: 'Wi-Fi Mesh-модулу (+45 000 ₸)',
    installOption: 'Кесипкөй орнотуу (+50 000 ₸)',
    notesLabel: 'Өзгөчө каалоолор:',
    notesPlaceholder: 'Мисалы: тоолуу аймак...',
    recommendedKit: 'Сунушталган топтом:',
    aiRecommendation: 'ЖИ-Сунуш:',
    total: 'Жалпы баасы:',
    btnWhatsApp: 'WhatsApp аркылуу КП алуу',
    recs: {
      mobile: 'Тез орнотуу үчүн оптималдуу.',
      standard: 'Туруктуулук үчүн стандарттуу топтом сунушталат.',
      mesh: '{{users}} адамга арналган Mesh-модуль кошулду.',
      install: 'Орнотуу кошулган.'
    }
  },
  uz: {
    title: 'Narxni hisoblash',
    typeLabel: 'Obyekt turi',
    types: {
      house: 'Xususiy uy / Dacha',
      camp: 'Vaxta posyolkasi / Qurilish',
      biz: 'Tijorat obyekti',
      mobile: 'Mobil / Avtomobil'
    },
    usersLabel: 'Foydalanuvchilar soni',
    usersCount: 'kishi',
    optionsLabel: "Qo'shimcha variantlar",
    meshOption: 'Wi-Fi Mesh-moduli (+45 000 ₸)',
    installOption: "Professional o'rnatish (+50 000 ₸)",
    notesLabel: 'Maxsus istaklar:',
    notesPlaceholder: "Masalan: tog'li hudud...",
    recommendedKit: "Tavsiya etilgan to'plam:",
    aiRecommendation: 'SI-Tavsiya:',
    total: 'Umumiy narx:',
    btnWhatsApp: 'WhatsApp orqali tijorat taklifini olish',
    recs: {
      mobile: 'Tezkor joylashtirish uchun maqbul.',
      standard: "Barqarorlik uchun standart to'plam tavsiya etiladi.",
      mesh: "{{users}} kishi uchun Mesh-modul qo'shildi.",
      install: "O'rnatish kiritilgan."
    }
  },
  tg: {
    title: 'Ҳисобкунии арзиш',
    typeLabel: 'Намуди иншоот',
    types: {
      house: 'Хонаи шахсӣ / Дача',
      camp: 'Шаҳраки коргарӣ / Сохтмон',
      biz: 'Иншооти тиҷоратӣ',
      mobile: 'Мобилӣ / Автомобилӣ'
    },
    usersLabel: 'Шумораи истифодабарандагон',
    usersCount: 'нафар',
    optionsLabel: 'Имконоти иловагӣ',
    meshOption: 'Модули Wi-Fi Mesh (+45 000 ₸)',
    installOption: 'Насби касбӣ (+50 000 ₸)',
    notesLabel: 'Хоҳишҳои махсус:',
    notesPlaceholder: 'Масалан: минтақаи кӯҳӣ...',
    recommendedKit: 'Маҷмӯи тавсияшаванда:',
    aiRecommendation: 'Тавсияи ЗС:',
    total: 'Арзиши умумӣ:',
    btnWhatsApp: 'Дарёфти ПТ тавассути WhatsApp',
    recs: {
      mobile: 'Барои зуд ҷойгир кардан беҳтарин аст.',
      standard: 'Маҷмӯи стандартӣ барои устуворӣ тавсия мешавад.',
      mesh: 'Модули Mesh барои {{users}} нафар илова карда шуд.',
      install: 'Насб дохил карда шудааст.'
    }
  }
}

let i18nContent = fs.readFileSync(path.join(SRC_DIR, 'i18n.ts'), 'utf8')

// Add 'calc' section to each language in i18n.ts
Object.keys(translations).forEach(lang => {
  const calcString = JSON.stringify(translations[lang]).slice(1, -1)
  const regex = new RegExp("(" + lang + ":\\s*{\\s*translation:\\s*{)")
  i18nContent = i18nContent.replace(regex, "$1 calc: { " + calcString + " },")
})

// Also add 'calculator' to nav translations in all languages
const langs = ['ru', 'kk', 'ky', 'uz', 'tg']
langs.forEach(lang => {
  const navRegex = new RegExp("(" + lang + ":[\\s\\S]*?nav:\\s*{[\\s\\S]*?)(})")
  i18nContent = i18nContent.replace(navRegex, "$1, calc: 'Калькулятор'$2")
})

fs.writeFileSync(path.join(SRC_DIR, 'i18n.ts'), i18nContent, 'utf8')

// Inject into App.tsx
let appContent = fs.readFileSync(path.join(SRC_DIR, 'App.tsx'), 'utf8')
if (!appContent.includes('Calculator')) {
  appContent = appContent.replace("import Specs from './components/Specs'", "import Specs from './components/Specs'\nimport Calculator from './components/Calculator'")
  appContent = appContent.replace("<Specs />", "<Specs />\n      <Calculator />")
  fs.writeFileSync(path.join(SRC_DIR, 'App.tsx'), appContent, 'utf8')
}

// Inject into Header.tsx
let headerContent = fs.readFileSync(path.join(SRC_DIR, 'components/Header.tsx'), 'utf8')
if (!headerContent.includes("id: 'calculator'")) {
  headerContent = headerContent.replace("{ id: 'support', label: t('nav.support') },", "{ id: 'calculator', label: t('nav.calc') || 'Калькулятор' },\n    { id: 'support', label: t('nav.support') },")
  fs.writeFileSync(path.join(SRC_DIR, 'components/Header.tsx'), headerContent, 'utf8')
}

console.log('Fixed calculator injection.')
