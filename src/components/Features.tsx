import { useTranslation } from 'react-i18next'
import { Shield, Wifi } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { motion } from 'framer-motion'

const Features = () => {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation()
  const baseUrl = import.meta.env.BASE_URL || '/'

  return (
    <section id="features" ref={ref} className="py-12 md:py-16 lg:py-20 bg-white pt-20 md:pt-24 lg:pt-32">
      <div className="container mx-auto px-4">
        {/* <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="premium-card p-5 md:p-6 lg:p-8 hover:border-accent/50 transition-all hover:shadow-xl hover:shadow-slate-200/70 hover:-translate-y-1"
          >
            <div className="flex items-center gap-3 md:gap-4 mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-accent/10 rounded-lg flex items-center justify-center shadow-sm">
                <Wifi className="w-6 h-6 md:w-8 md:h-8 text-accent drop-shadow-lg" />
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-slate-900">
                {t('benefits.versatility.title')}
              </h3>
            </div>
            <p className="text-slate-600 text-sm md:text-base">
              {t('benefits.versatility.description')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="premium-card p-5 md:p-6 lg:p-8 hover:border-accent/50 transition-all hover:shadow-xl hover:shadow-slate-200/70 hover:-translate-y-1"
          >
            <div className="flex items-center gap-3 md:gap-4 mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-accent/10 rounded-lg flex items-center justify-center shadow-sm">
                <Shield className="w-6 h-6 md:w-8 md:h-8 text-accent drop-shadow-lg" />
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-slate-900">
                {t('benefits.weather.title')}
              </h3>
            </div>
            <p className="text-slate-600 text-sm md:text-base">
              {t('benefits.weather.description')}
            </p>
          </motion.div>
        </motion.div> */}

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="premium-card p-8 hover:border-accent/50 transition-all hover:shadow-xl hover:shadow-slate-200/70 hover:-translate-y-1 relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 relative z-10">
              {t('features.mini.title')}
            </h3>
            <p className="text-slate-600 mb-4 text-sm md:text-base">
              {t('features.mini.description')}
            </p>
            <div className="w-full h-48 bg-slate-100 rounded-lg overflow-hidden relative flex items-center justify-center">
              <img
                src={`${baseUrl}1.jpg`}
                alt="Starlink Mini"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="premium-card p-8 hover:border-accent/50 transition-all hover:shadow-xl hover:shadow-slate-200/70 hover:-translate-y-1 relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 relative z-10">
              {t('features.v4.title')}
            </h3>
            <p className="text-slate-600 mb-4 text-sm md:text-base">
              {t('features.v4.description')}
            </p>
            <div className="w-full h-48 bg-slate-100 rounded-lg overflow-hidden relative flex items-center justify-center">
              <img
                src={`${baseUrl}2.jpg`}
                alt="Starlink V4"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Features
