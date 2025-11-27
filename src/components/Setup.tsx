import { useTranslation } from 'react-i18next'
import { Plug, Satellite } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { motion } from 'framer-motion'

const Setup = () => {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="setup" ref={ref} className="py-12 md:py-20 bg-gray-900 pt-24 md:pt-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {t('setup.title')}
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            {t('setup.description')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-br from-black via-gray-900/50 to-black p-8 rounded-xl border border-gray-800/50 hover:border-accent/50 text-center transition-all hover:shadow-2xl hover:shadow-accent/30 hover:-translate-y-1"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-accent/30 to-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-accent/20">
              <Plug className="w-8 h-8 text-accent drop-shadow-lg" />
            </div>
            <div className="text-6xl font-bold text-white mb-2">1</div>
            <h3 className="text-2xl font-semibold text-white mb-2">
              {t('setup.step1')}
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-br from-black via-gray-900/50 to-black p-8 rounded-xl border border-gray-800/50 hover:border-accent/50 text-center transition-all hover:shadow-2xl hover:shadow-accent/30 hover:-translate-y-1"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-accent/30 to-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-accent/20">
              <Satellite className="w-8 h-8 text-accent drop-shadow-lg" />
            </div>
            <div className="text-6xl font-bold text-white mb-2">2</div>
            <h3 className="text-2xl font-semibold text-white mb-2">
              {t('setup.step2')}
            </h3>
          </motion.div>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="https://play.google.com/store/apps/details?id=com.starlink.mobile"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white rounded-lg transition-all hover:shadow-lg hover:shadow-gray-800/50"
          >
            {t('setup.downloadAndroid')}
          </a>
          <a
            href="https://apps.apple.com/app/starlink/id1537177988"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white rounded-lg transition-all hover:shadow-lg hover:shadow-gray-800/50"
          >
            {t('setup.downloadIOS')}
          </a>
        </div>
      </div>
    </section>
  )
}

export default Setup

