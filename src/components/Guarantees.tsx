import { useTranslation } from 'react-i18next'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { motion } from 'framer-motion'
import { Package, Wrench, Phone, RefreshCw } from 'lucide-react'

const Guarantees = () => {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation()

  const guarantees = [
    {
      key: 'equipment',
      icon: Package,
    },
    {
      key: 'setup',
      icon: Wrench,
    },
    {
      key: 'support',
      icon: Phone,
    },
    {
      key: 'refund',
      icon: RefreshCw,
    },
  ]

  return (
    <section id="guarantees" ref={ref} className="py-12 md:py-20 bg-gray-900 pt-24 md:pt-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {t('guarantees.title')}
          </h2>
          <p className="text-base md:text-xl text-gray-400">{t('guarantees.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {guarantees.map((guarantee, index) => {
            const Icon = guarantee.icon
            return (
              <motion.div
                key={guarantee.key}
                initial={{ opacity: 0, y: 50 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-gradient-to-br from-black via-gray-900/50 to-black p-8 rounded-xl border border-gray-800/50 hover:border-accent/50 transition-all hover:shadow-2xl hover:shadow-accent/30 hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-accent/30 to-accent/10 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-accent/20">
                  <Icon className="w-8 h-8 text-accent drop-shadow-lg" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {t(`guarantees.${guarantee.key}.title`)}
                </h3>
                <p className="text-gray-400">
                  {t(`guarantees.${guarantee.key}.description`)}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Guarantees

