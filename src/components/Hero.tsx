import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ArrowRight, Check, CheckCircle2 } from 'lucide-react'

const Hero = () => {
  const { t } = useTranslation()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const baseUrl = import.meta.env.BASE_URL || '/'

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth > 768) {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * 20,
          y: (e.clientY / window.innerHeight - 0.5) * 20,
        })
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const openWhatsApp = () => {
    window.open('https://wa.me/77007006613', '_blank')
  }

  const leftPoints = [
    t('hero.leftPointSpeed'),
    t('hero.leftPointCoverage'),
    t('hero.leftPointInstall'),
  ]

  const rightPoints = [
    t('hero.rightLine1'),
    t('hero.rightLine2'),
    t('hero.rightLine3'),
    t('hero.rightLine4'),
  ]

  const stars = [
    { top: '16%', left: '8%', delay: 0.2 },
    { top: '22%', left: '88%', delay: 0.5 },
    { top: '72%', left: '18%', delay: 0.9 },
    { top: '76%', left: '74%', delay: 0.35 },
    { top: '48%', left: '56%', delay: 0.8 },
    { top: '35%', left: '42%', delay: 1.1 },
    { top: '60%', left: '92%', delay: 0.65 },
  ]
  const showDishAsset = false

  return (
    <section id="hero" className="relative min-h-[100svh] overflow-hidden bg-[var(--bg)]">
      <div className="absolute inset-0">
        <img
          src={`${baseUrl}bgmountains1.png`}
          alt=""
          className="h-full w-full object-cover object-center"
          fetchPriority="high"
          decoding="async"
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(112deg,rgba(248,251,255,0.70)_0%,rgba(248,251,255,0.55)_36%,rgba(248,251,255,0.20)_60%,rgba(248,251,255,0.10)_74%,rgba(248,251,255,0.28)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_86%_18%,rgba(27,145,186,0.12),transparent_74%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_58%_at_14%_84%,rgba(14,116,144,0.07),transparent_74%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(244,248,252,0.12),rgba(245,247,251,0.42)_84%,rgba(238,243,248,0.62)_100%)]" />

      {/* STARLINK watermark */}
      <motion.div
        aria-hidden="true"
        className="absolute -left-[4%] top-[28%] hidden text-[160px] font-bold tracking-tight text-slate-900/[0.06] select-none lg:block"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.25 }}
      >
        STARLINK
      </motion.div>

      {/* Ambient teal glow */}
      <motion.div
        aria-hidden="true"
        className="absolute right-[12%] top-[18%] hidden h-96 w-96 rounded-full bg-accent/[0.18] blur-[120px] lg:block"
        animate={{ y: [0, 14, 0], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Blue depth glow */}
      <div
        aria-hidden="true"
        className="absolute right-[5%] top-[15%] hidden h-[520px] w-[520px] rounded-full bg-[radial-gradient(ellipse,rgba(30,80,220,0.14),transparent_72%)] blur-[60px] lg:block"
      />

      {/* Star field */}
      {stars.map((star, idx) => (
        <motion.span
          key={idx}
          aria-hidden="true"
          className="absolute hidden h-1 w-1 rounded-full bg-slate-500/45 sm:block"
          style={{ top: star.top, left: star.left }}
          animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.4, 1] }}
          transition={{ duration: 4, delay: star.delay, repeat: Infinity }}
        />
      ))}

      {/* Dish visual temporarily hidden */}
      {showDishAsset && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-[57%] top-[14%] z-[1] h-[62vh] w-[110vw] max-w-[1350px] -translate-x-1/2 md:left-[60%] md:top-[10%] md:h-[72vh] lg:left-[62%] lg:top-[4%] lg:h-[86vh]"
          initial={{ opacity: 0, x: 80, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.86, delay: 0.2, ease: 'easeOut' }}
        >
          <div
            className="relative h-full w-full"
            style={{
              transform: isMobile
                ? undefined
                : `translate3d(${mousePosition.x * -0.45}px, ${mousePosition.y * -0.36}px, 0)`,
            }}
          >
            {/* Ground shadow under dish */}
            <motion.div
              className="absolute left-1/2 top-[70%] h-16 w-[42%] -translate-x-1/2 rounded-full bg-slate-900/[0.14] blur-[50px] sm:h-20 md:h-24 lg:h-28"
              animate={{ scale: [1, 1.08, 1], opacity: [0.08, 0.2, 0.08] }}
              transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.img
              src={`${baseUrl}starlinkcrop.png`}
              alt=""
              className="absolute inset-0 h-full w-full object-contain object-center opacity-[0.72] drop-shadow-[0_44px_80px_rgba(15,23,42,0.28)] sm:opacity-[0.78] md:opacity-[0.84]"
              fetchPriority="high"
              decoding="async"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.82, delay: 0.3 }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(90deg,rgba(247,250,253,0.92)_0%,rgba(247,250,253,0.72)_30%,rgba(247,250,253,0.32)_54%,rgba(247,250,253,0)_74%)]"
            />
          </div>
        </motion.div>
      )}

      {/* ─── Main content ─── */}
      <motion.div
        className="relative z-20 container mx-auto px-4 pb-16 pt-[104px] md:pb-24 md:pt-[150px] lg:pb-28 lg:pt-[190px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <div className="grid items-start gap-8 lg:grid-cols-[1.18fr_0.82fr] lg:gap-16">
          {/* ─── LEFT COLUMN ─── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.72, delay: 0.18 }}
          >
            <div
              style={{
                transform: isMobile
                  ? undefined
                  : `translate3d(${mousePosition.x * 0.22}px, ${mousePosition.y * 0.2}px, 0)`,
              }}
            >
              {/* Eyebrow badge */}
              <motion.span
                className="mb-5 inline-flex rounded-full border border-accent/[0.30] bg-white/70 px-4 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-accent backdrop-blur-sm md:mb-6 md:text-[11.5px]"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {t('hero.leftBadge')}
              </motion.span>

              {/* Headline */}
              <h1 className="max-w-[560px] text-[33px] font-bold leading-[1.06] tracking-[-0.025em] text-slate-900 drop-shadow-[0_10px_24px_rgba(255,255,255,0.58)] sm:text-[42px] md:text-[52px] lg:text-[62px]">
                {t('hero.title')}
              </h1>

              {/* Subtitle */}
              <p className="mt-4 max-w-[480px] text-[15px] leading-[1.65] text-[var(--muted)] md:mt-5 md:text-[17px] md:leading-[1.6]">
                {t('hero.subtitle')}
              </p>

              {/* Benefit bullets */}
              <ul className="mt-7 space-y-2.5 md:mt-9">
                {leftPoints.map((point, idx) => (
                  <motion.li
                    key={point}
                    className="flex items-center gap-2.5 text-[14px] font-medium text-[var(--text)] md:text-[16px]"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.46 + idx * 0.1 }}
                  >
                    <span className="inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-accent/[0.14] text-accent md:h-6 md:w-6">
                      <Check size={13} strokeWidth={2.5} />
                    </span>
                    <span>{point}</span>
                  </motion.li>
                ))}
              </ul>

              {/* ─── CTA zone ─── */}
              <div className="mt-8 flex flex-col items-start gap-4 md:mt-10">
                <div className="flex flex-wrap items-center gap-3">
                  {/* Primary CTA */}
                  <motion.button
                    onClick={openWhatsApp}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#1279a4] to-[#0f678d] px-8 py-3.5 text-[15px] font-bold text-white shadow-[0_18px_40px_-14px_rgba(15,103,141,0.55)] transition-all hover:shadow-[0_22px_48px_-14px_rgba(15,103,141,0.68)] hover:brightness-110 md:px-10 md:py-4 md:text-[17px]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.82 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t('hero.cta')}
                    <ArrowRight size={17} />
                  </motion.button>
                </div>
                {/* Trust micro-text */}
                <motion.p
                  className="flex items-center gap-2 text-[12.5px] text-[var(--muted)] md:text-[13.5px]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 1.02 }}
                >
                  <span className="inline-block h-1.5 w-1.5 flex-none rounded-full bg-emerald-500 animate-pulse" />
                  {t('hero.ctaHint')}
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* ─── RIGHT COLUMN — service card ─── */}
          <motion.div
            className="w-full max-w-[440px] pt-2 md:pt-6 lg:justify-self-end lg:pt-[120px]"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.28 }}
          >
            <div
              style={{
                transform: isMobile
                  ? undefined
                  : `translate3d(${mousePosition.x * -0.42}px, ${mousePosition.y * -0.34}px, 0)`,
              }}
            >
              <div className="rounded-[20px] border border-white/70 bg-white/78 p-5 shadow-[0_24px_60px_-26px_rgba(15,23,42,0.32)] backdrop-blur-xl md:p-7">
                {/* Card title */}
                <h2 className="text-[18px] font-bold leading-tight text-slate-900 md:text-[20px]">
                  {t('hero.rightTitle')}
                </h2>
                {/* Service list */}
                <ul className="mt-4 space-y-3 md:mt-5 md:space-y-3.5">
                  {rightPoints.map((point, idx) => (
                    <motion.li
                      key={point}
                      className="flex items-start gap-2.5 text-[13px] leading-snug text-[var(--muted)] md:text-[14.5px]"
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 + idx * 0.08 }}
                    >
                      <CheckCircle2 className="mt-0.5 h-[18px] w-[18px] flex-none text-accent" />
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>
                {/* Card footer */}
                <div className="mt-5 border-t border-slate-200/80 pt-4">
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-slate-900/[0.04] px-3 py-1 text-[11.5px] font-medium text-slate-600 md:text-[12.5px]">
                      {t('hero.rightFooter1')}
                    </span>
                    <span className="rounded-full bg-slate-900/[0.04] px-3 py-1 text-[11.5px] font-medium text-slate-600 md:text-[12.5px]">
                      {t('hero.rightFooter2')}
                    </span>
                  </div>
                  <motion.button
                    onClick={openWhatsApp}
                    className="w-full rounded-xl bg-slate-900 py-2.5 text-[13px] font-semibold text-white transition-all hover:bg-slate-800 md:py-3 md:text-[14px]"
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {t('hero.rightCta')}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--surface-2)] to-transparent" />
    </section>
  )
}

export default Hero
