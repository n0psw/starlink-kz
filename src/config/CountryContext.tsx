import { createContext, useContext, useMemo } from 'react'
import type { ReactNode } from 'react'
import { detectCountry, getCountryConfig } from './countryConfig'
import type { CountryConfig } from './countryConfig'

interface CountryContextValue {
  countryCode: string
  config: CountryConfig
}

const CountryContext = createContext<CountryContextValue | null>(null)

export const CountryProvider = ({ children }: { children: ReactNode }) => {
  const value = useMemo(() => {
    const countryCode = detectCountry()
    const config = getCountryConfig(countryCode)
    return { countryCode, config }
  }, [])

  return (
    <CountryContext.Provider value={value}>
      {children}
    </CountryContext.Provider>
  )
}

export const useCountry = (): CountryContextValue => {
  const ctx = useContext(CountryContext)
  if (!ctx) {
    throw new Error('useCountry must be used within a CountryProvider')
  }
  return ctx
}
