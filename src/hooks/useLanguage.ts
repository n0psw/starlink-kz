import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export const useLanguage = () => {
  const { i18n } = useTranslation()
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language)

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'ru'
    if (savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage)
      setCurrentLanguage(savedLanguage)
    }
  }, [i18n])

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'ru' ? 'kk' : 'ru'
    i18n.changeLanguage(newLanguage)
    setCurrentLanguage(newLanguage)
    localStorage.setItem('language', newLanguage)
  }

  return { currentLanguage, toggleLanguage }
}

