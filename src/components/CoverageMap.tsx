import { useTranslation } from 'react-i18next'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { motion } from 'framer-motion'
import { Map } from 'lucide-react'

const CoverageMap = () => {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="coverage" ref={ref} className="py-12 md:py-16 lg:py-20 bg-gray-900 pt-20 md:pt-24 lg:pt-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {t('coverage.title')}
          </h2>
          <p className="text-base md:text-xl text-gray-400">{t('coverage.subtitle')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto bg-gradient-to-br from-black via-gray-900/50 to-black p-6 md:p-8 rounded-2xl border border-gray-800/50"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-accent/30 to-accent/10 rounded-full flex items-center justify-center shadow-lg shadow-accent/20">
                <Map className="w-6 h-6 md:w-7 md:h-7 text-accent drop-shadow-lg" />
              </div>
              <div className="text-center md:text-left">
                <p className="text-white font-semibold text-lg md:text-xl">{t('coverage.title')}</p>
                <p className="text-gray-400 text-sm md:text-base">{t('coverage.note')}</p>
              </div>
            </div>

            <a
              href="https://starlink.com/kz/map"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-accent text-white font-semibold hover:bg-accent/90 transition-colors"
            >
              {t('coverage.cta')}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CoverageMap
