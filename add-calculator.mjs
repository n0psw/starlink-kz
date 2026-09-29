import fs from 'fs'
import path from 'path'

const PROJECT_DIR = '../starlink-asia'
const SRC_DIR = path.join(PROJECT_DIR, 'src')

const files = {}

files['components/Calculator.tsx'] = `import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Calculator as CalcIcon, MessageCircle } from 'lucide-react'

const Calculator = () => {
  const { t } = useTranslation()
  
  const [objType, setObjType] = useState('house')
  const [users, setUsers] = useState(10)
  const [mesh, setMesh] = useState(false)
  const [install, setInstall] = useState(true)
  const [notes, setNotes] = useState('')

  const types = [
    { id: 'house', label: t('calc.types.house'), base: 280000, mount: 35000 },
    { id: 'camp', label: t('calc.types.camp'), base: 280000, mount: 65000 },
    { id: 'biz', label: t('calc.types.biz'), base: 280000, mount: 65000 },
    { id: 'mobile', label: t('calc.types.mobile'), base: 220000, mount: 35000 },
  ]

  const selectedType = types.find(t => t.id === objType) || types[0]
  
  const autoMesh = mesh || users > 15
  const totalPrice = selectedType.base + selectedType.mount + (autoMesh ? 45000 : 0) + (install ? 50000 : 0)
  const kitName = objType === 'mobile' ? 'Starlink Mini Kit' : 'Starlink Standard Kit'

  const getRecommendations = () => {
    let recs = []
    if (objType === 'mobile') {
      recs.push(t('calc.recs.mobile'))
    } else {
      recs.push(t('calc.recs.standard'))
    }
    if (autoMesh) {
      recs.push(t('calc.recs.mesh').replace('{{users}}', users.toString()))
    }
    if (install) {
      recs.push(t('calc.recs.install'))
    }
    return recs.join(' ')
  }

  const sendToWhatsApp = () => {
    const phone = '77007006613'
    const msg = [
      \`Здравствуйте! Меня интересует расчет Starlink:\`,
      \`- Объект: \${selectedType.label}\`,
      \`- Пользователей: \${users}\`,
      \`- Опции: \${autoMesh ? 'Mesh ' : ''}\${install ? 'Монтаж' : ''}\`,
      \`- Итого: \${totalPrice.toLocaleString('ru-RU')} ₸\`,
      notes ? \`- Пожелания: \${notes}\` : '',
      \`Просьба подготовить КП.\`
    ].filter(Boolean).join('%0A')
    
    window.open(\`https://wa.me/\${phone}?text=\${msg}\`, '_blank')
  }

  return (
    <section id="calculator" className="py-24 bg-[#05070a] border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03)_0%,transparent_50%)]" />
      
      <div className="max-w-[800px] mx-auto px-6 md:px-10 relative z-10">
        
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <CalcIcon size={24} className="text-white/80" />
          </div>
          <h2 className="text-3xl md:text-4xl font-medium text-white tracking-tight">
            {t('calc.title')}
          </h2>
        </div>

        <div className="bg-[#0a0d12] border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl">
          
          <div className="space-y-8 mb-10">
            {/* Type */}
            <div>
              <label className="block text-white/80 font-medium mb-3 text-sm">{t('calc.typeLabel')}</label>
              <select 
                value={objType} onChange={(e) => setObjType(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-white/30 appearance-none"
              >
                {types.map(t => (
                  <option key={t.id} value={t.id}>{t.label}</option>
                ))}
              </select>
            </div>

            {/* Users */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-white/80 font-medium text-sm">{t('calc.usersLabel')}</label>
                <span className="text-white font-bold bg-white/10 px-3 py-1 rounded-lg text-sm">{users} {t('calc.usersCount')}</span>
              </div>
              <input 
                type="range" min="1" max="50" value={users} onChange={(e) => setUsers(parseInt(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
              />
            </div>

            {/* Options */}
            <div>
              <label className="block text-white/80 font-medium mb-4 text-sm">{t('calc.optionsLabel')}</label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={\`w-5 h-5 rounded border flex items-center justify-center transition-colors \${mesh ? 'bg-white border-white' : 'border-white/20 group-hover:border-white/50'}\`}>
                    {mesh && <div className="w-2.5 h-2.5 bg-black rounded-sm" />}
                  </div>
                  <input type="checkbox" checked={mesh} onChange={(e) => setMesh(e.target.checked)} className="hidden" />
                  <span className="text-white/70 text-sm group-hover:text-white transition-colors">{t('calc.meshOption')}</span>
                </label>
                
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={\`w-5 h-5 rounded border flex items-center justify-center transition-colors \${install ? 'bg-white border-white' : 'border-white/20 group-hover:border-white/50'}\`}>
                    {install && <div className="w-2.5 h-2.5 bg-black rounded-sm" />}
                  </div>
                  <input type="checkbox" checked={install} onChange={(e) => setInstall(e.target.checked)} className="hidden" />
                  <span className="text-white/70 text-sm group-hover:text-white transition-colors">{t('calc.installOption')}</span>
                </label>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-white/80 font-medium mb-3 text-sm">{t('calc.notesLabel')}</label>
              <textarea 
                rows={2}
                value={notes} onChange={(e) => setNotes(e.target.value)}
                placeholder={t('calc.notesPlaceholder')}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 text-sm resize-none"
              />
            </div>
          </div>

          {/* Results Block */}
          <div className="bg-black/40 border border-white/5 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-white/20" />
            
            <div className="mb-6">
              <div className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-2">{t('calc.recommendedKit')}</div>
              <div className="text-xl text-white font-medium">{kitName}</div>
            </div>
            
            <div className="mb-8">
              <div className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-2">{t('calc.aiRecommendation')}</div>
              <p className="text-white/70 text-sm leading-relaxed">{getRecommendations()}</p>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between pt-6 border-t border-white/10 gap-6">
              <div>
                <div className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-1">{t('calc.total')}</div>
                <div className="text-3xl text-white font-semibold">{totalPrice.toLocaleString('ru-RU')} ₸</div>
              </div>
              
              <button 
                onClick={sendToWhatsApp}
                className="bg-[#25D366] hover:bg-[#20b958] text-white px-6 py-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-3 w-full md:w-auto"
              >
                <MessageCircle size={20} />
                <span>{t('calc.btnWhatsApp')}</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Calculator
`

// Simple helper to inject translations
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
      mobile: 'Мобильді / Автомобильді'
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
    meshOption: "Wi-Fi Mesh-moduli (+45 000 ₸)",
    installOption: "Professional o'rnatish (+50 000 ₸)",
    notesLabel: "Maxsus istaklar:",
    notesPlaceholder: "Masalan: tog'li hudud...",
    recommendedKit: "Tavsiya etilgan to'plam:",
    aiRecommendation: "SI-Tavsiya:",
    total: "Umumiy narx:",
    btnWhatsApp: "WhatsApp orqali tijorat taklifini olish",
    recs: {
      mobile: "Tezkor joylashtirish uchun maqbul.",
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
  const calcString = JSON.stringify(translations[lang]).slice(1, -1) // remove outer braces
  const regex = new RegExp(\`(\${lang}:\\s*{\\s*translation:\\s*{)\`)
  i18nContent = i18nContent.replace(regex, \`$1 calc: { \${calcString} },\`)
})

// Also add 'calculator' to nav translations in all languages
['ru', 'kk', 'ky', 'uz', 'tg'].forEach(lang => {
  const navRegex = new RegExp(\`(\${lang}:[\\\\s\\\\S]*?nav:\\s*{[\\\\s\\\\S]*?)(})\`)
  i18nContent = i18nContent.replace(navRegex, \`$1, calc: 'Калькулятор'$2\`) // simplistic nav translation
})

fs.writeFileSync(path.join(SRC_DIR, 'i18n.ts'), i18nContent, 'utf8')

// Inject into App.tsx
let appContent = fs.readFileSync(path.join(SRC_DIR, 'App.tsx'), 'utf8')
if (!appContent.includes('Calculator')) {
  appContent = appContent.replace("import Specs from './components/Specs'", "import Specs from './components/Specs'\\nimport Calculator from './components/Calculator'")
  appContent = appContent.replace("<Specs />", "<Specs />\\n      <Calculator />")
  fs.writeFileSync(path.join(SRC_DIR, 'App.tsx'), appContent, 'utf8')
}

// Inject into Header.tsx
let headerContent = fs.readFileSync(path.join(SRC_DIR, 'components/Header.tsx'), 'utf8')
if (!headerContent.includes("id: 'calculator'")) {
  headerContent = headerContent.replace("{ id: 'support', label: t('nav.support') },", "{ id: 'calculator', label: t('nav.calc') || 'Калькулятор' },\\n    { id: 'support', label: t('nav.support') },")
  fs.writeFileSync(path.join(SRC_DIR, 'components/Header.tsx'), headerContent, 'utf8')
}

for (const [relPath, content] of Object.entries(files)) {
  const fullPath = path.join(SRC_DIR, relPath)
  fs.writeFileSync(fullPath, content, 'utf8')
  console.log('Updated', relPath)
}
