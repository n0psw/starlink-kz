import { useTranslation } from 'react-i18next'
import { Zap, Plug, Calendar, MapPin, Cloud, Globe } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { motion } from 'framer-motion'

const Benefits = () => {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation()

  const benefits = [
    {
      key: 'simplicity',
      icon: Plug,
    },
    {
      key: 'speed',
      icon: Zap,
    },
    {
      key: 'flexibility',
      icon: Calendar,
    },
    {
      key: 'everywhere',
      icon: MapPin,
    },
    {
      key: 'weather',
      icon: Cloud,
    },
    {
      key: 'versatility',
      icon: Globe,
    },
  ]

  return (
    <section id="benefits" ref={ref} className="py-12 md:py-16 lg:py-20 bg-gray-900 pt-20 md:pt-24 lg:pt-32">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-8 md:mb-12 lg:mb-16 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
        >
          {t('benefits.title')}
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={benefit.key}
                initial={{ opacity: 0, y: 50 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-black via-gray-900/50 to-black p-5 md:p-6 lg:p-8 rounded-xl border border-gray-800/50 hover:border-accent/50 transition-all hover:shadow-2xl hover:shadow-accent/30 hover:-translate-y-1"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-accent/30 to-accent/10 rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-accent/20">
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-accent drop-shadow-lg" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3">
                  {t(`benefits.${benefit.key}.title`)}
                </h3>
                <p className="text-sm md:text-base text-gray-400">
                  {t(`benefits.${benefit.key}.description`)}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Benefits

