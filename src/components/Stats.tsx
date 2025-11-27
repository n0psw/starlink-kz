import { useTranslation } from 'react-i18next'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const StatCard = ({ value, label, delay }: { value: string; label: string; delay: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-accent mb-2">{value}</div>
      <div className="text-gray-400 text-sm md:text-base lg:text-lg">{label}</div>
    </motion.div>
  )
}

const Stats = () => {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation()

  const stats = [
    { value: '500+', label: t('stats.clients') },
    { value: '50+', label: t('stats.locations') },
    { value: '200+', label: t('stats.speed') },
    { value: '99.9', label: t('stats.uptime') },
  ]

  return (
    <section id="stats" ref={ref} className="py-12 md:py-20 bg-black pt-24 md:pt-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 md:mb-16 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {t('stats.title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              value={stat.value}
              label={stat.label}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats

