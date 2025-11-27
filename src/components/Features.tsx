import { useTranslation } from 'react-i18next'
import { Shield, Wifi } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { motion } from 'framer-motion'

const Features = () => {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="features" ref={ref} className="py-12 md:py-20 bg-black pt-24 md:pt-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-gray-900 via-black to-gray-900 p-8 rounded-xl border border-gray-800/50 hover:border-accent/50 transition-all hover:shadow-2xl hover:shadow-accent/30 hover:-translate-y-1"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-accent/30 to-accent/10 rounded-lg flex items-center justify-center shadow-lg shadow-accent/20">
                <Wifi className="w-8 h-8 text-accent drop-shadow-lg" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                {t('benefits.versatility.title')}
              </h3>
            </div>
            <p className="text-gray-400">
              {t('benefits.versatility.description')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-gray-900 via-black to-gray-900 p-8 rounded-xl border border-gray-800/50 hover:border-accent/50 transition-all hover:shadow-2xl hover:shadow-accent/30 hover:-translate-y-1"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-accent/30 to-accent/10 rounded-lg flex items-center justify-center shadow-lg shadow-accent/20">
                <Shield className="w-8 h-8 text-accent drop-shadow-lg" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                {t('benefits.weather.title')}
              </h3>
            </div>
            <p className="text-gray-400">
              {t('benefits.weather.description')}
            </p>
          </motion.div>
        </motion.div>

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
            className="bg-gradient-to-br from-gray-900 via-black to-gray-900 p-8 rounded-xl border border-gray-800/50 hover:border-accent/50 transition-all hover:shadow-2xl hover:shadow-accent/30 hover:-translate-y-1 relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
            <h3 className="text-2xl font-bold text-white mb-4 relative z-10">
              {t('features.mini.title')}
            </h3>
            <p className="text-gray-400 mb-4">
              {t('features.mini.description')}
            </p>
            <div className="w-full h-48 bg-gray-800 rounded flex items-center justify-center">
              <span className="text-gray-500">Starlink Mini</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-gradient-to-br from-gray-900 via-black to-gray-900 p-8 rounded-xl border border-gray-800/50 hover:border-accent/50 transition-all hover:shadow-2xl hover:shadow-accent/30 hover:-translate-y-1 relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
            <h3 className="text-2xl font-bold text-white mb-4 relative z-10">
              {t('features.v4.title')}
            </h3>
            <p className="text-gray-400 mb-4">
              {t('features.v4.description')}
            </p>
            <div className="w-full h-48 bg-gray-800 rounded flex items-center justify-center">
              <span className="text-gray-500">Starlink V4</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Features

