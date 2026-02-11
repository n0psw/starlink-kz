import { useTranslation } from 'react-i18next'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { motion } from 'framer-motion'
import { MapPin, Wrench, Shield } from 'lucide-react'

const Installation = () => {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation()

  const services = [
    { key: 'visit', icon: MapPin },
    { key: 'mount', icon: Wrench },
    { key: 'setup', icon: Shield },
  ]

  return (
    <section id="installation" ref={ref} className="py-12 md:py-16 lg:py-20 bg-black pt-20 md:pt-24 lg:pt-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {t('installation.title')}
          </h2>
          <p className="text-base md:text-xl text-gray-400">{t('installation.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 50 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-gradient-to-br from-gray-900 via-black to-gray-900 p-5 md:p-6 lg:p-8 rounded-xl border border-gray-800/50 hover:border-accent/50 transition-all text-center group hover:shadow-2xl hover:shadow-accent/30 hover:-translate-y-1"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-accent/30 to-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-accent/20 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-accent drop-shadow-lg" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-3">
                  {t(`installation.${service.key}.title`)}
                </h3>
                <p className="text-gray-400 text-sm md:text-base">
                  {t(`installation.${service.key}.description`)}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Installation
