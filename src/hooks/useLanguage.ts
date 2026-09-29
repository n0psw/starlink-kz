import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { detectCountry, getCountryConfig } from '../config/countryConfig'

const countryCode = detectCountry()
const countryConfig = getCountryConfig(countryCode)

/** Per-country localStorage key so each subdomain remembers its own language choice */
const LANG_KEY = `starlink_lang_${countryCode}`

const validLangs = countryConfig.languages.map(l => l.code)

export const useLanguage = () => {
  const { i18n } = useTranslation()
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language)

  useEffect(() => {
    const saved = localStorage.getItem(LANG_KEY)
    // Only apply saved pref if it's valid for this country
    const lang = saved && validLangs.includes(saved) ? saved : countryConfig.defaultLang
    if (lang !== i18n.language) {
      i18n.changeLanguage(lang)
      setCurrentLanguage(lang)
    }
  }, [i18n])

  const setLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
    setCurrentLanguage(lang)
    // Save per-country key
    localStorage.setItem(LANG_KEY, lang)
  }

  const toggleLanguage = () => {
    const langs = validLangs
    const idx = langs.indexOf(currentLanguage)
    const next = langs[(idx + 1) % langs.length]
    setLanguage(next)
  }

  return { currentLanguage, toggleLanguage, setLanguage }
}
