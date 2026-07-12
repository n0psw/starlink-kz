import { useTranslation } from 'react-i18next'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { motion } from 'framer-motion'
import {
  HelpCircle,
  Wifi,
  CreditCard,
  Settings,
  AlertTriangle,
  User,
  ExternalLink,
  Headphones,
} from 'lucide-react'

const supportCategories = [
  {
    icon: User,
    titleKey: 'support.categories.account.title',
    descKey: 'support.categories.account.desc',
    url: 'https://starlink.com/ru-kz/support/topic/account',
  },
  {
    icon: Settings,
    titleKey: 'support.categories.setup.title',
    descKey: 'support.categories.setup.desc',
    url: 'https://starlink.com/ru-kz/support/topic/setup',
  },
  {
    icon: Wifi,
    titleKey: 'support.categories.connectivity.title',
    descKey: 'support.categories.connectivity.desc',
    url: 'https://starlink.com/ru-kz/support/topic/connectivity',
  },
  {
    icon: AlertTriangle,
    titleKey: 'support.categories.troubleshooting.title',
    descKey: 'support.categories.troubleshooting.desc',
    url: 'https://starlink.com/ru-kz/support/topic/troubleshooting',
  },
  {
    icon: CreditCard,
    titleKey: 'support.categories.billing.title',
    descKey: 'support.categories.billing.desc',
    url: 'https://starlink.com/ru-kz/support/topic/billing',
  },
  {
    icon: HelpCircle,
    titleKey: 'support.categories.faq.title',
    descKey: 'support.categories.faq.desc',
    url: 'https://starlink.com/ru-kz/support',
  },
]

const Support = () => {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section
      id="support"
      ref={ref}
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ background: '#070b14' }}
    >
      {/* Background effects */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(14,165,233,0.06) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 80% 100%, rgba(56,189,248,0.04) 0%, transparent 60%)',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-5">
            <Headphones className="w-4 h-4" style={{ color: '#38bdf8' }} />
            <span
              className="text-[11px] uppercase tracking-[0.2em] font-semibold"
              style={{ color: '#38bdf8' }}
            >
              {t('support.badge')}
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            style={{
              background: 'linear-gradient(135deg, #f1f5f9 0%, #94a3b8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {t('support.title')}
          </h2>
          <p
            className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: '#64748b' }}
          >
            {t('support.subtitle')}
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto mb-12">
          {supportCategories.map((cat, index) => {
            const Icon = cat.icon
            return (
              <motion.a
                key={index}
                href={cat.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 25 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
                className="group relative rounded-2xl p-5 md:p-6 transition-all duration-300 cursor-pointer"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                  e.currentTarget.style.borderColor = 'rgba(56,189,248,0.2)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow =
                    '0 8px 30px -10px rgba(14,165,233,0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300"
                    style={{
                      background: 'rgba(56,189,248,0.08)',
                      border: '1px solid rgba(56,189,248,0.12)',
                    }}
                  >
                    <Icon
                      className="w-5 h-5 transition-colors"
                      style={{ color: '#38bdf8' }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <h3
                        className="font-semibold text-sm md:text-base transition-colors"
                        style={{ color: '#e2e8f0' }}
                      >
                        {t(cat.titleKey)}
                      </h3>
                      <ExternalLink
                        className="w-3.5 h-3.5 opacity-0 group-hover:opacity-50 transition-opacity flex-shrink-0"
                        style={{ color: '#94a3b8' }}
                      />
                    </div>
                    <p
                      className="text-xs md:text-sm leading-relaxed"
                      style={{ color: '#64748b' }}
                    >
                      {t(cat.descKey)}
                    </p>
                  </div>
                </div>
              </motion.a>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <a
            href="https://starlink.com/ru-kz/support"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm md:text-base transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
              color: '#fff',
              boxShadow: '0 4px 20px -4px rgba(14,165,233,0.4)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                '0 8px 30px -4px rgba(14,165,233,0.5)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                '0 4px 20px -4px rgba(14,165,233,0.4)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <Headphones className="w-4.5 h-4.5" />
            {t('support.cta')}
            <ExternalLink className="w-4 h-4 opacity-70" />
          </a>
          <p
            className="mt-4 text-xs"
            style={{ color: '#475569' }}
          >
            {t('support.ctaHint')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Support
