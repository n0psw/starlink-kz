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
    <section id="guarantees" ref={ref} className="py-12 md:py-16 lg:py-20 bg-[color:var(--surface-2)] pt-20 md:pt-24 lg:pt-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
            {t('guarantees.title')}
          </h2>
          <p className="text-base md:text-xl text-slate-600">{t('guarantees.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {guarantees.map((guarantee, index) => {
            const Icon = guarantee.icon
            return (
              <motion.div
                key={guarantee.key}
                initial={{ opacity: 0, y: 50 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-white p-5 md:p-6 lg:p-8 rounded-2xl border border-slate-200/70 hover:border-accent/50 transition-all hover:shadow-xl hover:shadow-slate-200/70 hover:-translate-y-1"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <Icon className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-accent drop-shadow-lg" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-3">
                  {t(`guarantees.${guarantee.key}.title`)}
                </h3>
                <p className="text-slate-600 text-sm md:text-base">
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

