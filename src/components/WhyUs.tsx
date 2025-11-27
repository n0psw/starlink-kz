import { useTranslation } from 'react-i18next'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { motion } from 'framer-motion'
import { Award, Headphones, Shield, Users } from 'lucide-react'

const WhyUs = () => {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation()

  const advantages = [
    {
      key: 'experience',
      icon: Award,
    },
    {
      key: 'support',
      icon: Headphones,
    },
    {
      key: 'quality',
      icon: Shield,
    },
    {
      key: 'flexibility',
      icon: Users,
    },
  ]

  return (
    <section id="whyus" ref={ref} className="py-12 md:py-20 bg-black pt-24 md:pt-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {t('whyUs.title')}
          </h2>
          <p className="text-base md:text-xl text-gray-400">{t('whyUs.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon
            return (
              <motion.div
                key={advantage.key}
                initial={{ opacity: 0, y: 50 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-gradient-to-br from-gray-900 via-black to-gray-900 p-8 rounded-xl border border-gray-800/50 hover:border-accent/50 transition-all text-center group hover:shadow-2xl hover:shadow-accent/30 hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-accent/30 to-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-accent/20 group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-accent drop-shadow-lg" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {t(`whyUs.${advantage.key}.title`)}
                </h3>
                <p className="text-gray-400">
                  {t(`whyUs.${advantage.key}.description`)}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhyUs

