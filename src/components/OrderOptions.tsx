import { useTranslation } from 'react-i18next'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

const OrderOptions = () => {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation(0.05)

  const stats = [
    { number: t('orderOptionsExtras.deliveryVal'), label: t('orderOptionsExtras.delivery') },
    { number: t('orderOptionsExtras.warrantyVal'), label: t('orderOptionsExtras.warranty') },
    { number: '24/7', label: t('orderOptionsExtras.support') },
  ]

  return (
    <section
      id="order-options"
      ref={ref}
      className="relative overflow-hidden py-24 md:py-36"
      style={{ background: '#060b14' }}
    >
      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)' }}
      />

      {/* Ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(14,165,233,0.04) 0%, transparent 65%)' }}
      />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 md:mb-28"
        >
          <span
            className="text-[10px] font-bold uppercase tracking-[0.2em] mb-5 block"
            style={{ color: '#38bdf8' }}
          >
            {t('orderOptionsExtras.whyUs')}
          </span>
          <h2
            className="font-bold leading-[1.0] tracking-[-0.04em] text-white mb-6"
            style={{ fontSize: 'clamp(38px, 5.5vw, 72px)' }}
          >
            {t('orderOptions.panelTitle')}
          </h2>
          <p
            className="text-[16px] leading-[1.75] max-w-[540px]"
            style={{ color: '#475569' }}
          >
            {t('orderOptions.panelDesc')}
          </p>
        </motion.div>

        {/* Big Stats — no cards, just big numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 mb-24 md:mb-32">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="py-10 px-0 sm:px-8 relative"
              style={{
                borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.05)' : undefined,
              }}
            >
              {i > 0 && (
                <div
                  className="absolute left-0 top-8 bottom-8 w-px sm:hidden"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                />
              )}
              <div
                className="text-[52px] md:text-[64px] font-bold tracking-[-0.05em] leading-none mb-3"
                style={{ color: '#f1f5f9' }}
              >
                {stat.number}
              </div>
              <div
                className="text-[12px] font-medium uppercase tracking-[0.14em]"
                style={{ color: '#334155' }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features list — horizontal lines */}
        <div
          className="mb-16"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          {[
            t('orderOptions.feature1Title'),
            t('orderOptions.feature2Title'),
            t('orderOptions.feature3Title'),
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-between py-5"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              <span className="text-[15px] font-medium" style={{ color: '#94a3b8' }}>
                {feature}
              </span>
              <span
                className="text-[11px] font-bold uppercase tracking-[0.15em]"
                style={{ color: '#1e3a5f' }}
              >
                {t('common.included')}
              </span>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
        >
          <motion.a
            href="https://wa.me/77007006613?text=Здравствуйте!%20Меня%20интересует%20Starlink.%20Есть%20ли%20в%20наличии%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 text-white text-[13px] font-semibold rounded-full relative group overflow-hidden"
            style={{
              background: 'rgba(16,185,129,0.9)',
              boxShadow: '0 6px 20px -4px rgba(16,185,129,0.35)',
            }}
            whileHover={{ scale: 1.02, boxShadow: '0 10px 28px -4px rgba(16,185,129,0.5)' }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <MessageCircle className="w-4 h-4 fill-current flex-shrink-0" />
            {t('orderOptions.cta')}
          </motion.a>

          <p className="text-[12px]" style={{ color: '#334155' }}>
            {t('common.officialEquipment')}
          </p>
        </motion.div>
      </div>

      {/* Bottom divider */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)' }}
      />
    </section>
  )
}

export default OrderOptions
