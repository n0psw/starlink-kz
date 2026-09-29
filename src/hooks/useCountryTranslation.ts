import { useTranslation } from 'react-i18next'
import { useCountry } from '../config/CountryContext'

/**
 * Hook that returns a translation function pre-loaded with country
 * interpolation variables in all Russian declension forms.
 *
 * Available variables in translation strings:
 *   {{country}}       — nominative: "Казахстан"
 *   {{country_upper}} — nominative uppercase: "КАЗАХСТАН"
 *   {{country_over}}  — instrumental (над): "Казахстаном"
 *   {{country_in}}    — prepositional (в): "Казахстане"
 *   {{country_by}}    — dative (по): "Казахстану"
 */
export const useCountryTranslation = () => {
  const { t, i18n } = useTranslation()
  const { config } = useCountry()

  const lang = i18n.language || 'ru'
  const countryName = config.name[lang] || config.name.ru
  const countryOver = config.nameOver[lang] || config.nameOver.ru
  const countryIn = config.nameIn[lang] || config.nameIn.ru
  const countryBy = config.nameBy[lang] || config.nameBy.ru

  /** Translation function with country variables pre-injected */
  const tc = (key: string, extraVars?: Record<string, string>) =>
    t(key, {
      country: countryName,
      country_upper: countryName.toUpperCase(),
      country_over: countryOver,
      country_in: countryIn,
      country_by: countryBy,
      ...extraVars,
    })

  return { tc, t, i18n, config, countryName }
}
