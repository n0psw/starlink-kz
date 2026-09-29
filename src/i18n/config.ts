import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { getCountryConfig, detectCountry } from '../config/countryConfig'
import ru from './locales/ru.json'
import kk from './locales/kk.json'
import en from './locales/en.json'
import ky from './locales/ky.json'
import tg from './locales/tg.json'
import uz from './locales/uz.json'

const countryCode = detectCountry()
const countryConfig = getCountryConfig(countryCode)

// Storage key is per-country so each subdomain has its own language preference
const LANG_KEY = `starlink_lang_${countryCode}`

// If user has explicitly chosen a language for THIS country/subdomain before — honour it.
// Otherwise fall back to the country's default language (e.g. 'ky' for kg.starlink.com.kz).
const savedLang = localStorage.getItem(LANG_KEY)
const validLangs = countryConfig.languages.map(l => l.code)
const initialLang =
  savedLang && validLangs.includes(savedLang)
    ? savedLang
    : countryConfig.defaultLang

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ru: { translation: ru },
      kk: { translation: kk },
      en: { translation: en },
      ky: { translation: ky },
      tg: { translation: tg },
      uz: { translation: uz },
    },
    lng: initialLang,
    fallbackLng: countryConfig.defaultLang,
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
