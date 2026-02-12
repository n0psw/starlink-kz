import { useTranslation } from 'react-i18next'
import { Plug, Satellite } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { motion } from 'framer-motion'

const Setup = () => {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="setup" ref={ref} className="py-12 md:py-16 lg:py-20 bg-[color:var(--surface-2)] pt-20 md:pt-24 lg:pt-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 md:mb-6 bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
            {t('setup.title')}
          </h2>
          <p className="text-base md:text-xl text-slate-600 mb-8">
            {t('setup.description')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto mb-8 md:mb-12"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="premium-card p-6 md:p-7 lg:p-8 hover:border-accent/50 text-center transition-all hover:shadow-xl hover:shadow-slate-200/70 hover:-translate-y-1"
          >
            <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Plug className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-accent drop-shadow-lg" />
            </div>
            <div className="text-5xl md:text-6xl font-bold text-slate-900 mb-2">1</div>
            <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-2">
              {t('setup.step1')}
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="premium-card p-6 md:p-7 lg:p-8 hover:border-accent/50 text-center transition-all hover:shadow-xl hover:shadow-slate-200/70 hover:-translate-y-1"
          >
            <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Satellite className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-accent drop-shadow-lg" />
            </div>
            <div className="text-5xl md:text-6xl font-bold text-slate-900 mb-2">2</div>
            <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-2">
              {t('setup.step2')}
            </h3>
          </motion.div>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center"></div>
      </div>
    </section>
  )
}

export default Setup

