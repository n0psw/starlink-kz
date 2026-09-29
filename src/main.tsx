import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './i18n/config.ts'
import { CountryProvider } from './config/CountryContext.tsx'
import { getCountryConfig } from './config/countryConfig.ts'

// Set dynamic meta tags based on detected country
const config = getCountryConfig()
document.title = config.metaTitle
const metaDesc = document.querySelector('meta[name="description"]')
if (metaDesc) {
  metaDesc.setAttribute('content', config.metaDescription.ru)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CountryProvider>
      <App />
    </CountryProvider>
  </StrictMode>,
)

