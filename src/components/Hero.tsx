import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useState, useEffect, useRef, useCallback } from 'react'
import { ArrowRight, ChevronRight, ChevronDown } from 'lucide-react'
import KazakhstanMap from './KazakhstanMap'

// Count-up hook (StrictMode-safe)
const useCountUp = (target: number, duration = 1800, delay = 600) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let animFrameId: number
    const timeout = setTimeout(() => {
      const t0 = performance.now()
      const step = (now: number) => {
        const p = Math.min((now - t0) / duration, 1)
        setCount(Math.round((1 - Math.pow(1 - p, 3)) * target))
        if (p < 1) animFrameId = requestAnimationFrame(step)
      }
      animFrameId = requestAnimationFrame(step)
    }, delay)

    return () => {
      clearTimeout(timeout)
      if (animFrameId) cancelAnimationFrame(animFrameId)
    }
  }, [target, duration, delay])

  return count
}

// Animated star field — fewer stars on mobile
const StarField = ({ mobile }: { mobile: boolean }) => {
  const stars = useRef(
    Array.from({ length: mobile ? 25 : 60 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 5,
    }))
  ).current

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {stars.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            animation: `twinkle ${s.duration}s ${s.delay}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  )
}

const Hero = () => {
  const { t, i18n } = useTranslation()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const openWhatsApp = () => {
    window.open('https://wa.me/77007006613', '_blank', 'noopener,noreferrer')
  }

  const scrollToNext = useCallback(() => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const speed = useCountUp(350, 2000, 1200)
  const coverage = useCountUp(100, 1600, 1400)
  const install = useCountUp(1, 600, 1600)

  const lang = i18n.language || 'ru'
  const metricsInline =
    lang === 'en'
      ? [
          { num: speed, suffix: ' Mbps', label: 'speed' },
          { num: coverage, suffix: '%', label: 'coverage' },
          { num: install, suffix: ' day', label: 'setup' },
        ]
      : lang === 'kk'
        ? [
            { num: speed, suffix: ' Мбит/с', label: 'жылдамдық' },
            { num: coverage, suffix: '%', label: 'қамту' },
            { num: install, suffix: ' күн', label: 'орнату' },
          ]
        : [
            { num: speed, suffix: ' Мбит/с', label: 'скорость' },
            { num: coverage, suffix: '%', label: 'покрытие' },
            { num: install, suffix: ' день', label: 'монтаж' },
          ]

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (d: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: d, ease: [0.16, 1, 0.3, 1] },
    }),
  }

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden flex flex-col"
      style={{
        background: 'linear-gradient(180deg, #010306 0%, #020810 40%, #030a14 70%, #010306 100%)',
      }}
    >
      <StarField mobile={isMobile} />

      {/* Ambient glows */}
      <div
        className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse, rgba(14,165,233,0.035) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-[50%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse, rgba(14,165,233,0.06) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 w-full flex-1 flex flex-col items-center pt-24 md:pt-36 pb-4 md:pb-6 px-4 sm:px-6">

        {/* ─── Text Block ─── */}
        <motion.h1
          className="text-center text-[32px] sm:text-[44px] md:text-[60px] lg:text-[74px] xl:text-[88px] font-semibold leading-[1.06] tracking-[-0.035em] max-w-[880px]"
          style={{
            backgroundImage: 'linear-gradient(180deg, #ffffff 0%, #ffffff 55%, rgba(255,255,255,0.45) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          {t('hero.title')}
          <span style={{ WebkitTextFillColor: '#0ea5e9', fontWeight: 300 }}>.</span>
        </motion.h1>

        <motion.p
          className="mt-3 md:mt-5 text-center max-w-[520px] text-[13px] sm:text-[14px] md:text-[17px] leading-relaxed font-light px-2"
          style={{ color: '#6b7280' }}
          custom={0.12}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* CTA */}
        <motion.div
          className="mt-5 md:mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5"
          custom={0.24}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <motion.button
            onClick={openWhatsApp}
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 sm:py-3.5 text-[13px] font-medium text-black transition-all duration-300 hover:bg-slate-100 w-full sm:w-auto justify-center"
            style={{ boxShadow: '0 2px 20px -4px rgba(255,255,255,0.12)' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {t('hero.cta')}
            <ArrowRight size={14} strokeWidth={2.2} />
          </motion.button>

          <button
            onClick={() => document.getElementById('order-options')?.scrollIntoView({ behavior: 'smooth' })}
            className="group inline-flex items-center gap-1 text-[13px] font-medium text-sky-400 hover:text-sky-300 transition-colors"
          >
            <span>{t('hero.ctaSecondary') || 'Узнать цены'}</span>
            <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} />
          </button>
        </motion.div>

        <motion.p
          className="mt-2 sm:mt-3 flex items-center gap-2 text-[9px] sm:text-[10px]"
          style={{ color: '#374151' }}
          custom={0.32}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <span className="inline-block h-1.5 w-1.5 flex-none rounded-full bg-emerald-500 animate-pulse" />
          {t('hero.ctaHint')}
        </motion.p>

        {/* ─── MAP — The Hero Visual ─── */}
        <motion.div
          className="relative w-full flex-1 flex items-center justify-center mt-4 md:mt-8 min-h-[200px] sm:min-h-[260px] md:min-h-[340px]"
          custom={0.35}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, scale: 0.92, y: 20 },
            visible: {
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { duration: 1.2, delay: 0.35, ease: [0.16, 1, 0.3, 1] },
            },
          }}
        >
          {/* Enhanced ambient glow behind map */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, rgba(14,165,233,0.10) 0%, rgba(14,165,233,0.03) 40%, transparent 65%)',
              filter: 'blur(50px)',
              transform: 'scale(1.3)',
            }}
            aria-hidden="true"
          />
          <div className="relative z-10 w-full max-w-[1100px]">
            <KazakhstanMap language={i18n.language} isMobile={isMobile} />
          </div>
        </motion.div>

        {/* ─── Bottom Bar — inline metrics + scroll ─── */}
        <motion.div
          className="w-full max-w-[700px] mt-2 md:mt-6"
          custom={0.6}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          {/* Inline metrics strip */}
          <div
            className="flex items-center justify-center gap-4 sm:gap-6 md:gap-10 py-3 sm:py-4 px-4 sm:px-6 rounded-2xl mx-auto"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {metricsInline.map((m, i) => (
              <div key={i} className="flex items-center gap-2 sm:gap-4">
                {i > 0 && (
                  <div className="w-px h-5 sm:h-6 bg-white/[0.06] -ml-2 sm:-ml-3 md:-ml-5" />
                )}
                <div className="flex flex-col items-center">
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-[18px] sm:text-[24px] md:text-[30px] font-light text-white tracking-tight leading-none">
                      {m.num}
                    </span>
                    <span className="text-[8px] sm:text-[10px] md:text-[11px] font-light text-slate-400">
                      {m.suffix}
                    </span>
                  </div>
                  <span className="text-[7px] sm:text-[9px] md:text-[10px] font-medium tracking-[0.14em] uppercase text-slate-600 mt-0.5 sm:mt-1">
                    {m.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          onClick={scrollToNext}
          className="mt-4 md:mt-6 mb-2 text-slate-700 hover:text-slate-400 transition-colors cursor-pointer"
          custom={0.8}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          aria-label="Scroll down"
        >
          <ChevronDown
            size={16}
            strokeWidth={1.5}
            style={{ animation: 'bounce-gentle 2.5s ease-in-out infinite' }}
          />
        </motion.button>

      </div>
    </section>
  )
}

export default Hero
