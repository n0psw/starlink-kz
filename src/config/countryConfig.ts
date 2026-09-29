export interface CountryLanguage {
  code: string
  label: string
  short: string
}

export interface CountryConfig {
  code: string
  name: Record<string, string>
  /** Instrumental case for Russian: "над Казахстаном" */
  nameOver: Record<string, string>
  /** Prepositional case: "в Казахстане" */
  nameIn: Record<string, string>
  /** Dative case: "по Казахстану" */
  nameBy: Record<string, string>
  languages: CountryLanguage[]
  defaultLang: string
  showMap: boolean
  showCityList: boolean
  cities: Record<string, string>
  suffix: string
  metaTitle: string
  metaDescription: Record<string, string>
  phone: string
  whatsapp: string
}

export const countries: Record<string, CountryConfig> = {
  kz: {
    code: 'kz',
    name: {
      ru: 'Казахстан',
      kk: 'Қазақстан',
      en: 'Kazakhstan',
    },
    nameOver: {
      ru: 'Казахстаном',
      kk: 'Қазақстан',
      en: 'Kazakhstan',
    },
    nameIn: {
      ru: 'Казахстане',
      kk: 'Қазақстанда',
      en: 'Kazakhstan',
    },
    nameBy: {
      ru: 'Казахстану',
      kk: 'Қазақстан',
      en: 'Kazakhstan',
    },
    languages: [
      { code: 'ru', label: 'Русский', short: 'RU' },
      { code: 'kk', label: 'Қазақша', short: 'KK' },
      { code: 'en', label: 'English', short: 'EN' },
    ],
    defaultLang: 'ru',
    showMap: true,
    showCityList: true,
    cities: {
      ru: 'Оскемен, Риддер, Алтай, Алматы,\nАлматинская область, Талдыкорган, Кокшетау,\nАстана, Атырау, Темиртау',
      kk: 'Өскемен, Риддер, Алтай, Алматы,\nАлматы облысы, Талдықорған, Көкшетау,\nАстана, Атырау, Теміртау',
      en: 'Oskemen, Ridder, Altay, Almaty,\nAlmaty Region, Taldykorgan, Kokshetau,\nAstana, Atyrau, Temirtau',
    },
    suffix: 'KZ',
    metaTitle: 'Starlink Kazakhstan : Space X KZ',
    metaDescription: {
      ru: 'Space X KZ — аренда и покупка Starlink в Казахстане. Высокоскоростной интернет везде, где нет сотовой связи.',
      kk: 'Space X KZ — Қазақстанда Starlink жалға алу және сатып алу. Ұялы байланыс жоқ жерде жоғары жылдамдықты интернет.',
      en: 'Space X KZ — rent and buy Starlink in Kazakhstan. High-speed internet where there is no cellular coverage.',
    },
    phone: '+7 700 700 6613',
    whatsapp: '77007006613',
  },
  kg: {
    code: 'kg',
    name: {
      ru: 'Кыргызстан',
      ky: 'Кыргызстан',
      en: 'Kyrgyzstan',
    },
    nameOver: {
      ru: 'Кыргызстаном',
      ky: 'Кыргызстан',
      en: 'Kyrgyzstan',
    },
    nameIn: {
      ru: 'Кыргызстане',
      ky: 'Кыргызстанда',
      en: 'Kyrgyzstan',
    },
    nameBy: {
      ru: 'Кыргызстану',
      ky: 'Кыргызстан',
      en: 'Kyrgyzstan',
    },
    languages: [
      { code: 'ru', label: 'Русский', short: 'RU' },
      { code: 'ky', label: 'Кыргызча', short: 'KY' },
      { code: 'en', label: 'English', short: 'EN' },
    ],
    defaultLang: 'ky',
    showMap: true,
    showCityList: false,
    cities: {
      ru: 'Доставка по всему Кыргызстану',
      ky: 'Бүткүл Кыргызстан боюнча жеткирүү',
      en: 'Delivery across Kyrgyzstan',
    },
    suffix: 'KG',
    metaTitle: 'Starlink Кыргызстан : Space X KG',
    metaDescription: {
      ru: 'Space X KG — аренда и покупка Starlink в Кыргызстане. Высокоскоростной интернет везде, где нет сотовой связи.',
      ky: 'Space X KG — Кыргызстанда Starlink ижарага алуу жана сатып алуу. Уюлдук байланыш жок жерде жогорку ылдамдыктагы интернет.',
      en: 'Space X KG — rent and buy Starlink in Kyrgyzstan. High-speed internet where there is no cellular coverage.',
    },
    phone: '+996 500 047 926',
    whatsapp: '996500047926',
  },
  tj: {
    code: 'tj',
    name: {
      ru: 'Таджикистан',
      tg: 'Тоҷикистон',
      en: 'Tajikistan',
    },
    nameOver: {
      ru: 'Таджикистаном',
      tg: 'Тоҷикистон',
      en: 'Tajikistan',
    },
    nameIn: {
      ru: 'Таджикистане',
      tg: 'Тоҷикистон',
      en: 'Tajikistan',
    },
    nameBy: {
      ru: 'Таджикистану',
      tg: 'Тоҷикистон',
      en: 'Tajikistan',
    },
    languages: [
      { code: 'ru', label: 'Русский', short: 'RU' },
      { code: 'tg', label: 'Тоҷикӣ', short: 'TG' },
      { code: 'en', label: 'English', short: 'EN' },
    ],
    defaultLang: 'tg',
    showMap: true,
    showCityList: false,
    cities: {
      ru: 'Доставка по всему Таджикистану',
      tg: 'Расонидан ба тамоми Тоҷикистон',
      en: 'Delivery across Tajikistan',
    },
    suffix: 'TJ',
    metaTitle: 'Starlink Тоҷикистон : Space X TJ',
    metaDescription: {
      ru: 'Space X TJ — аренда и покупка Starlink в Таджикистане. Высокоскоростной интернет везде, где нет сотовой связи.',
      tg: 'Space X TJ — иҷора ва хариди Starlink дар Тоҷикистон. Интернети босуръат дар ҷойҳое, ки алоқаи мобилӣ нест.',
      en: 'Space X TJ — rent and buy Starlink in Tajikistan. High-speed internet where there is no cellular coverage.',
    },
    phone: '+7 700 700 6613',
    whatsapp: '77007006613',
  },
  uz: {
    code: 'uz',
    name: {
      ru: 'Узбекистан',
      uz: 'O\'zbekiston',
      en: 'Uzbekistan',
    },
    nameOver: {
      ru: 'Узбекистаном',
      uz: 'O\'zbekiston',
      en: 'Uzbekistan',
    },
    nameIn: {
      ru: 'Узбекистане',
      uz: 'O\'zbekiston',
      en: 'Uzbekistan',
    },
    nameBy: {
      ru: 'Узбекистану',
      uz: 'O\'zbekiston',
      en: 'Uzbekistan',
    },
    languages: [
      { code: 'ru', label: 'Русский', short: 'RU' },
      { code: 'uz', label: 'O\'zbek', short: 'UZ' },
      { code: 'en', label: 'English', short: 'EN' },
    ],
    defaultLang: 'uz',
    showMap: true,
    showCityList: false,
    cities: {
      ru: 'Доставка по всему Узбекистану',
      uz: 'O\'zbekiston bo\'ylab yetkazib berish',
      en: 'Delivery across Uzbekistan',
    },
    suffix: 'UZ',
    metaTitle: 'Starlink O\'zbekiston : Space X UZ',
    metaDescription: {
      ru: 'Space X UZ — аренда и покупка Starlink в Узбекистане. Высокоскоростной интернет везде, где нет сотовой связи.',
      uz: 'Space X UZ — O\'zbekistonda Starlink ijarasi va sotib olish. Aloqa yo\'q joylarda yuqori tezlikdagi internet.',
      en: 'Space X UZ — rent and buy Starlink in Uzbekistan. High-speed internet where there is no cellular coverage.',
    },
    phone: '+7 700 700 6613',
    whatsapp: '77007006613',
  },
}

/**
 * Determine country code from the current hostname.
 * kg.starlink.com.kz → 'kg'
 * tj.starlink.com.kz → 'tj'
 * uz.starlink.com.kz → 'uz'
 * starlink.com.kz (or anything else) → 'kz'
 */
export function detectCountry(): string {
  const hostname = window.location.hostname
  if (hostname.startsWith('kg.')) return 'kg'
  if (hostname.startsWith('tj.')) return 'tj'
  if (hostname.startsWith('uz.')) return 'uz'
  return 'kz'
}

export function getCountryConfig(code?: string): CountryConfig {
  const countryCode = code || detectCountry()
  return countries[countryCode] || countries.kz
}
