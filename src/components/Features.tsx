import { useTranslation } from 'react-i18next'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { motion } from 'framer-motion'
import { ArrowRight, KeyRound, LogIn, ExternalLink } from 'lucide-react'

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

      {/* ── STARLINK ACCOUNT BLOCK ── */}
      <div
        className="relative mx-0 border-t border-b"
        style={{
          borderColor: 'rgba(255,255,255,0.05)',
          background: 'rgba(14,165,233,0.025)',
        }}
      >
        {/* subtle glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 120% at 50% 50%, rgba(14,165,233,0.06) 0%, transparent 70%)',
          }}
        />

        <div className="container mx-auto px-8 lg:px-16 py-10 lg:py-12 relative z-10">
          {/* Header row */}
          <div className="flex items-start gap-3 mb-6">
            <div
              className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5"
              style={{ background: 'rgba(14,165,233,0.12)', border: '1px solid rgba(14,165,233,0.2)' }}
            >
              <KeyRound size={14} style={{ color: '#38bdf8' }} strokeWidth={2} />
            </div>
            <div>
              <p
                className="text-[11px] font-bold uppercase tracking-[0.18em] mb-1"
                style={{ color: '#38bdf8' }}
              >
                Аккаунт Starlink
              </p>
              <p
                className="text-[14px] leading-[1.65] max-w-[520px]"
                style={{ color: '#475569' }}
              >
                Для активации оборудования и управления подпиской вам понадобится официальный аккаунт на{' '}
                <span style={{ color: '#64748b' }}>starlink.com</span>.
                {' '}Мы бесплатно поможем зарегистрироваться и активировать устройство.
              </p>
            </div>
          </div>

          {/* Links row */}
          <div className="flex flex-wrap items-center gap-4 ml-11">
            <a
              href="https://starlink.com/auth"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold transition-all group"
              style={{
                background: 'rgba(14,165,233,0.1)',
                border: '1px solid rgba(14,165,233,0.2)',
                color: '#38bdf8',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(14,165,233,0.18)'
                e.currentTarget.style.borderColor = 'rgba(14,165,233,0.4)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(14,165,233,0.1)'
                e.currentTarget.style.borderColor = 'rgba(14,165,233,0.2)'
              }}
            >
              <LogIn size={12} strokeWidth={2.5} />
              Войти в аккаунт
              <ExternalLink size={10} className="opacity-50 group-hover:opacity-80 transition-opacity" strokeWidth={2.5} />
            </a>

            <a
              href="https://starlink.com/auth/forgot-password"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[12px] font-medium transition-colors group"
              style={{ color: '#475569' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#94a3b8')}
              onMouseLeave={e => (e.currentTarget.style.color = '#475569')}
            >
              <KeyRound size={11} strokeWidth={2} className="opacity-60" />
              Забыли пароль?
              <ExternalLink size={10} className="opacity-40 group-hover:opacity-70 transition-opacity" strokeWidth={2.5} />
            </a>

            <span
              className="hidden sm:block w-px h-4 self-center"
              style={{ background: 'rgba(255,255,255,0.07)' }}
            />

            <p className="text-[11px]" style={{ color: '#334155' }}>
              Нужна помощь?{' '}
              <a
                href="https://wa.me/77007006613?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%21%20%D0%9F%D0%BE%D0%BC%D0%BE%D0%B3%D0%B8%D1%82%D0%B5%20%D1%81%20%D0%B0%D0%BA%D0%BA%D0%B0%D1%83%D0%BD%D1%82%D0%BE%D0%BC%20Starlink."
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: '#38bdf8' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#7dd3fc')}
                onMouseLeave={e => (e.currentTarget.style.color = '#38bdf8')}
              >
                Напишите нам в WhatsApp
              </a>{' '}— поможем бесплатно.
            </p>
          </div>
        </div>
      </div>

      {/* BOTTOM DIVIDER */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)' }}
      />
    </section>
  )
}

export default Features
