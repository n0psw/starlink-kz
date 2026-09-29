import fs from 'fs'
import path from 'path'

const mapPath = path.join('../starlink-asia/src/components/AsiaMapSection.tsx')
const newMapContent = `import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import AsiaMap from './AsiaMap'

const AsiaMapSection = () => {
  const { t } = useTranslation()
  return (
    <section id="map" className="py-24 bg-black relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <motion.div 
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="relative rounded-[20px] p-[1px] overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)'
          }}>
          <div className="bg-[#05070a] rounded-[20px] overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03]" />
            <AsiaMap />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AsiaMapSection
`
fs.writeFileSync(mapPath, newMapContent, 'utf8')

const footerPath = path.join('../starlink-asia/src/components/Footer.tsx')
const newFooterContent = `import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()
  return (
    <footer className="bg-black pt-20 pb-10 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="text-white font-semibold text-lg tracking-[2px] uppercase mb-4">STARLINK ASIA</div>
            <p className="text-white/50 text-sm max-w-sm">{t('footer.desc')}</p>
          </div>
          
          <div>
            <h4 className="text-white text-sm font-medium mb-4 uppercase tracking-wider">{t('footer.contacts')}</h4>
            <ul className="space-y-3">
              <li><a href="tel:+77007006613" className="text-white/50 hover:text-white transition-colors text-sm">+7 700 700 6613</a></li>
              <li><a href="tel:+77019444441" className="text-white/50 hover:text-white transition-colors text-sm">+7 701 944 4441</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white text-sm font-medium mb-4 uppercase tracking-wider">{t('footer.connect')}</h4>
            <ul className="space-y-3">
              <li><a href="https://starlink.com.kz" className="text-white/50 hover:text-white transition-colors text-sm">Казахстан</a></li>
              <li><a href="https://kg.starlink.com.kz" className="text-white/50 hover:text-white transition-colors text-sm">Кыргызстан</a></li>
              <li><a href="https://uz.starlink.com.kz" className="text-white/50 hover:text-white transition-colors text-sm">Узбекистан</a></li>
              <li><a href="https://tj.starlink.com.kz" className="text-white/50 hover:text-white transition-colors text-sm">Таджикистан</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
`
fs.writeFileSync(footerPath, newFooterContent, 'utf8')

console.log('Elements removed successfully.')
