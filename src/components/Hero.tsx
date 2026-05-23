import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ArrowRight, Satellite, Wifi, Zap } from 'lucide-react'
import KazakhstanMap from './KazakhstanMap'

// Generate star field once — outside component to avoid re-creation
const generateStars = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 0.5,
    duration: 3 + Math.random() * 5,
    delay: Math.random() * 4,
    opacity: 0.15 + Math.random() * 0.45,
  }))

const STAR_DATA = generateStars(70)

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

  const leftPoints = [
    { icon: Zap, text: t('hero.leftPointSpeed') },
    { icon: Satellite, text: t('hero.leftPointCoverage') },
    { icon: Wifi, text: t('hero.leftPointInstall') },
  ]

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #050810 0%, #0a1020 30%, #0c1428 55%, #081020 80%, #050810 100%)',
      }}
    >
      {/* ─── Starfield ─── */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {STAR_DATA.map((star) => (
          <div
            key={star.id}
            className="hero-star"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              ['--twinkle-duration' as string]: `${star.duration}s`,
              ['--twinkle-delay' as string]: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      {/* ─── Large ambient glow behind map ─── */}
      <div
        className="absolute top-[8%] right-[-8%] w-[65vw] h-[80vh] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(56,189,248,0.05) 0%, rgba(14,165,233,0.02) 40%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[5%] left-[-5%] w-[35vw] h-[35vh] pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(ellipse, rgba(14,165,233,0.04) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* ─── Very subtle grid ─── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(56,189,248,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56,189,248,0.4) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
        aria-hidden="true"
      />

      {/* ─── Main content ─── */}
      <div className="relative z-20 container mx-auto px-4 pb-16 pt-[110px] md:pb-24 md:pt-[150px] lg:pb-28 lg:pt-[180px]">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12 xl:gap-16">

          {/* ─── LEFT COLUMN — Content ─── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {/* Badge */}
            <motion.span
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/[0.07] px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-400 md:mb-6 md:text-[11px]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
              {t('hero.leftBadge')}
            </motion.span>

            {/* Headline */}
            <h1
              className="max-w-[540px] text-[32px] font-bold leading-[1.08] tracking-[-0.03em] text-white sm:text-[40px] md:text-[48px] lg:text-[56px]"
              style={{
                textShadow: '0 0 60px rgba(56,189,248,0.1)',
              }}
            >
              {t('hero.title')}
            </h1>

            {/* Subtitle */}
            <p className="mt-4 max-w-[460px] text-[14px] leading-[1.7] text-slate-400 md:mt-5 md:text-[16px]">
              {t('hero.subtitle')}
            </p>

            {/* Benefit bullets */}
            <ul className="mt-7 space-y-3 md:mt-8">
              {leftPoints.map((point, idx) => (
                <motion.li
                  key={idx}
                  className="flex items-center gap-3 text-[13px] font-medium text-slate-300 md:text-[15px]"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.5 + idx * 0.1 }}
                >
                  <span className="inline-flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-sky-500/[0.1] text-sky-400 ring-1 ring-sky-500/[0.15] md:h-8 md:w-8">
                    <point.icon size={14} strokeWidth={2} />
                  </span>
                  <span>{point.text}</span>
                </motion.li>
              ))}
            </ul>

            {/* CTA */}
            <motion.div
              className="mt-8 flex flex-col items-start gap-3 md:mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.85 }}
            >
              <motion.button
                onClick={openWhatsApp}
                className="group inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-3.5 text-[14px] font-bold text-white md:px-10 md:py-4 md:text-[16px]"
                style={{
                  background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 60%, #0369a1 100%)',
                  boxShadow: '0 0 30px -5px rgba(14,165,233,0.35), 0 8px 20px -8px rgba(0,0,0,0.3)',
                }}
                whileHover={{
                  scale: 1.04,
                  boxShadow: '0 0 40px -4px rgba(14,165,233,0.5), 0 12px 28px -8px rgba(0,0,0,0.4)',
                }}
                whileTap={{ scale: 0.97 }}
              >
                {t('hero.cta')}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </motion.button>

              <p className="flex items-center gap-2 text-[12px] text-slate-500 md:text-[13px]">
                <span className="inline-block h-1.5 w-1.5 flex-none rounded-full bg-emerald-500 animate-pulse" />
                {t('hero.ctaHint')}
              </p>
            </motion.div>
          </motion.div>

          {/* ─── RIGHT COLUMN — Map (no card wrapper) ─── */}
          <motion.div
            className="relative w-full lg:pt-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.25, ease: 'easeOut' }}
          >
            {/* Soft glow behind the map */}
            <div
              className="absolute inset-0 -inset-x-8 -inset-y-8 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 50% 45%, rgba(56,189,248,0.06) 0%, transparent 65%)',
              }}
              aria-hidden="true"
            />

            <KazakhstanMap language={i18n.language} isMobile={isMobile} />
          </motion.div>
        </div>
      </div>

      {/* ─── Bottom gradient transition dark → light ─── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-44 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, #050810 40%, var(--surface-2) 100%)',
        }}
      />
    </section>
  )
}

export default Hero
