import { useTranslation } from 'react-i18next'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const Features = () => {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation()
  const baseUrl = import.meta.env.BASE_URL || '/'

  const openWhatsApp = () => {
    window.open('https://wa.me/77007006613', '_blank', 'noopener,noreferrer')
  }

  return (
    <section
      id="features"
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: '#030508' }}
    >
      {/* TOP DIVIDER */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)' }}
      />

      {/* ── PRODUCT 1: Starlink Mini ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 lg:grid-cols-2 min-h-[560px] lg:min-h-[640px]"
      >
        {/* Text side */}
        <div className="flex flex-col justify-center px-8 py-20 lg:px-16 xl:px-24 order-2 lg:order-1">
          {/* Product label */}
          <span
            className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
            style={{ color: '#38bdf8' }}
          >
            Starlink Mini
          </span>

          <h2
            className="font-bold leading-[1.0] tracking-[-0.04em] mb-6 text-white"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
          >
            {t('features.mini.title')}
          </h2>

          <p
            className="text-[15px] leading-[1.8] mb-10 max-w-[420px]"
            style={{ color: '#64748b' }}
          >
            {t('features.mini.description')}
          </p>

          {/* Specs row */}
          <div className="flex items-center gap-10 mb-10">
            <div>
              <div
                className="text-[38px] font-bold tracking-[-0.04em] leading-none mb-1"
                style={{ color: '#f1f5f9' }}
              >
                100+
              </div>
              <div className="text-[11px] font-medium uppercase tracking-[0.12em]" style={{ color: '#334155' }}>
                Мбит/с
              </div>
            </div>
            <div
              className="w-px h-10 self-center"
              style={{ background: 'rgba(255,255,255,0.07)' }}
            />
            <div>
              <div
                className="text-[38px] font-bold tracking-[-0.04em] leading-none mb-1"
                style={{ color: '#f1f5f9' }}
              >
                1.1 кг
              </div>
              <div className="text-[11px] font-medium uppercase tracking-[0.12em]" style={{ color: '#334155' }}>
                Вес
              </div>
            </div>
          </div>

          <button
            onClick={openWhatsApp}
            className="inline-flex items-center gap-2 text-[13px] font-semibold transition-all w-fit group"
            style={{ color: '#38bdf8' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#7dd3fc')}
            onMouseLeave={e => (e.currentTarget.style.color = '#38bdf8')}
          >
            Заказать
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
          </button>
        </div>

        {/* Image side */}
        <motion.div
          className="relative overflow-hidden order-1 lg:order-2 min-h-[320px] lg:min-h-0"
          initial={{ opacity: 0, x: 30 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={`${baseUrl}1.jpg`}
            alt="Starlink Mini"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'brightness(0.82) contrast(1.05)' }}
            loading="lazy"
          />
          {/* Left fade */}
          <div
            className="absolute inset-y-0 left-0 w-24 lg:w-32 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #030508, transparent)' }}
          />
          {/* Bottom fade */}
          <div
            className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
            style={{ background: 'linear-gradient(to top, #030508, transparent)' }}
          />
        </motion.div>
      </motion.div>

      {/* Separator */}
      <div
        className="mx-8 lg:mx-24 h-px"
        style={{ background: 'rgba(255,255,255,0.05)' }}
      />

      {/* ── PRODUCT 2: Starlink V4 ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-2 min-h-[560px] lg:min-h-[640px]"
      >
        {/* Image side — left on desktop */}
        <motion.div
          className="relative overflow-hidden min-h-[320px] lg:min-h-0"
          initial={{ opacity: 0, x: -30 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={`${baseUrl}2.jpg`}
            alt="Starlink V4"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'brightness(0.82) contrast(1.05)' }}
            loading="lazy"
          />
          {/* Right fade */}
          <div
            className="absolute inset-y-0 right-0 w-24 lg:w-32 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #030508, transparent)' }}
          />
          {/* Bottom fade */}
          <div
            className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
            style={{ background: 'linear-gradient(to top, #030508, transparent)' }}
          />
        </motion.div>

        {/* Text side — right */}
        <div className="flex flex-col justify-center px-8 py-20 lg:px-16 xl:px-24">
          <span
            className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
            style={{ color: '#38bdf8' }}
          >
            Starlink V4
          </span>

          <h2
            className="font-bold leading-[1.0] tracking-[-0.04em] mb-6 text-white"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
          >
            {t('features.v4.title')}
          </h2>

          <p
            className="text-[15px] leading-[1.8] mb-10 max-w-[420px]"
            style={{ color: '#64748b' }}
          >
            {t('features.v4.description')}
          </p>

          {/* Specs row */}
          <div className="flex items-center gap-10 mb-10">
            <div>
              <div
                className="text-[38px] font-bold tracking-[-0.04em] leading-none mb-1"
                style={{ color: '#f1f5f9' }}
              >
                350+
              </div>
              <div className="text-[11px] font-medium uppercase tracking-[0.12em]" style={{ color: '#334155' }}>
                Мбит/с
              </div>
            </div>
            <div
              className="w-px h-10 self-center"
              style={{ background: 'rgba(255,255,255,0.07)' }}
            />
            <div>
              <div
                className="text-[38px] font-bold tracking-[-0.04em] leading-none mb-1"
                style={{ color: '#f1f5f9' }}
              >
                4.8 кг
              </div>
              <div className="text-[11px] font-medium uppercase tracking-[0.12em]" style={{ color: '#334155' }}>
                Вес
              </div>
            </div>
          </div>

          <button
            onClick={openWhatsApp}
            className="inline-flex items-center gap-2 text-[13px] font-semibold transition-all w-fit group"
            style={{ color: '#38bdf8' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#7dd3fc')}
            onMouseLeave={e => (e.currentTarget.style.color = '#38bdf8')}
          >
            Заказать
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
          </button>
        </div>
      </motion.div>

      {/* BOTTOM DIVIDER */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)' }}
      />
    </section>
  )
}

export default Features
