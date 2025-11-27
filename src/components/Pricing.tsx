import { useTranslation } from 'react-i18next'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const Pricing = () => {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation()

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const plans = [
    {
      equipment: 'mini',
      name: t('pricing.mini'),
      features: [
        'Компактный размер',
        'Портативный',
        'До 100 Мбит/с',
        'Wi-Fi роутер встроен',
      ],
      prices: {
        day: '15 000',
        week: '90 000',
        month: '300 000',
      },
    },
    {
      equipment: 'v4',
      name: t('pricing.v4'),
      features: [
        'Максимальная скорость',
        'До 350 Мбит/с',
        'Стационарное использование',
        'Высокая производительность',
      ],
      prices: {
        day: '25 000',
        week: '150 000',
        month: '500 000',
      },
    },
  ]

  return (
    <section id="pricing" ref={ref} className="py-12 md:py-16 lg:py-20 bg-black pt-20 md:pt-24 lg:pt-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {t('pricing.title')}
          </h2>
          <p className="text-base md:text-xl text-gray-400">{t('pricing.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.equipment}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gradient-to-br from-gray-900 via-black to-gray-900 p-5 md:p-6 lg:p-8 rounded-xl border border-gray-800/50 hover:border-accent/50 transition-all relative hover:shadow-2xl hover:shadow-accent/30 hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4 relative z-10">{plan.name}</h3>
              
              <div className="mb-6 relative z-10">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent mb-2 drop-shadow-lg">
                  {t('pricing.from')} {plan.prices.day} 〒
                </div>
                <p className="text-gray-400 text-sm">/{t('pricing.day')}</p>
              </div>

              <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-300 text-sm md:text-base">
                    <Check className="w-4 h-4 md:w-5 md:h-5 text-accent flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mb-6 p-3 md:p-4 bg-gradient-to-br from-gray-900/80 to-black/80 rounded-lg border border-gray-800/30 relative z-10">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">{t('pricing.rental')}</div>
                <div className="text-sm text-gray-400 mb-2">{t('pricing.week')}:</div>
                <div className="text-lg md:text-xl font-semibold text-white">{plan.prices.week} 〒</div>
                <div className="text-sm text-gray-400 mt-2 mb-2">{t('pricing.month')}:</div>
                <div className="text-lg md:text-xl font-semibold text-white">{plan.prices.month} 〒</div>
                <div className="mt-4 pt-4 border-t border-gray-800/50">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">{t('pricing.purchase')}</div>
                  <div className="text-lg md:text-xl font-semibold text-accent">
                    {plan.equipment === 'mini' ? 'Уточняйте' : 'Уточняйте'}
                  </div>
                </div>
              </div>

              <button
                onClick={scrollToContact}
                className="w-full px-4 py-2.5 md:px-6 md:py-3 bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent text-white text-sm md:text-base font-semibold rounded-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent/50 relative z-10"
              >
                {t('pricing.contactUs')}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing

