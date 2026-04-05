import { useTranslation } from 'react-i18next'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { motion } from 'framer-motion'

const Features = () => {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation()
  const baseUrl = import.meta.env.BASE_URL || '/'

  return (
    <section id="features" ref={ref} className="py-12 md:py-16 lg:py-20 bg-[var(--surface)] pt-20 md:pt-24 lg:pt-32">
      <div className="container mx-auto px-4">
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
            className="premium-card p-8 hover:border-accent/[0.30] transition-all hover:shadow-[0_24px_64px_-16px_rgba(0,0,0,0.70)] hover:-translate-y-1 relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/[0.07] rounded-full blur-3xl"></div>
            <h3 className="text-xl md:text-2xl font-bold text-[#E4EEFA] mb-4 relative z-10">
              {t('features.mini.title')}
            </h3>
            <p className="text-[var(--muted)] mb-4 text-sm md:text-base">
              {t('features.mini.description')}
            </p>
            <div className="w-full h-48 bg-[#0B1121] rounded-lg overflow-hidden relative flex items-center justify-center">
              <img
                src={`${baseUrl}1.jpg`}
                alt="Starlink Mini"
                className="w-full h-full object-cover opacity-90"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="premium-card p-8 hover:border-accent/[0.30] transition-all hover:shadow-[0_24px_64px_-16px_rgba(0,0,0,0.70)] hover:-translate-y-1 relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/[0.07] rounded-full blur-3xl"></div>
            <h3 className="text-xl md:text-2xl font-bold text-[#E4EEFA] mb-4 relative z-10">
              {t('features.v4.title')}
            </h3>
            <p className="text-[var(--muted)] mb-4 text-sm md:text-base">
              {t('features.v4.description')}
            </p>
            <div className="w-full h-48 bg-[#0B1121] rounded-lg overflow-hidden relative flex items-center justify-center">
              <img
                src={`${baseUrl}2.jpg`}
                alt="Starlink V4"
                className="w-full h-full object-cover opacity-90"
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
