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
  ]

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-[#eef1f5]">
      {/* Background gradients — softened for less visual noise */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.97),rgba(240,243,247,0.95)_40%,rgba(231,235,241,0.90)_75%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.78),rgba(236,240,246,0.72)_50%,rgba(228,233,239,0.82))]" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/92 via-white/74 to-transparent" />

      {/* STARLINK watermark — opacity reduced to push it further back */}
      <motion.div
        aria-hidden="true"
        className="absolute -left-[4%] top-[28%] hidden text-[160px] font-bold tracking-tight text-slate-900/[0.022] select-none lg:block"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.25 }}
      >
        STARLINK
      </motion.div>

      {/* Ambient glow — softer, more diffuse */}
      <motion.div
        aria-hidden="true"
        className="absolute right-[12%] top-[18%] hidden h-80 w-80 rounded-full bg-white/55 blur-[110px] lg:block"
        animate={{ y: [0, 12, 0], opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Subtle radial glow behind dish area for depth */}
      <div
        aria-hidden="true"
        className="absolute right-[5%] top-[15%] hidden h-[500px] w-[500px] rounded-full bg-gradient-to-br from-slate-200/30 to-transparent blur-[80px] lg:block"
      />

      {/* Decorative stars — softer */}
      {stars.map((star, idx) => (
        <motion.span
          key={idx}
          aria-hidden="true"
          className="absolute h-1 w-1 rounded-full bg-slate-600/18"
          style={{ top: star.top, left: star.left }}
          animate={{ opacity: [0.12, 0.55, 0.12], scale: [1, 1.3, 1] }}
          transition={{ duration: 4, delay: star.delay, repeat: Infinity }}
        />
      ))}

      {/* Dish visual — shifted right, slightly dimmer to not compete with content */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-[54%] top-[14%] z-[1] h-[62vh] w-[110vw] max-w-[1350px] -translate-x-1/2 md:top-[10%] md:h-[72vh] lg:top-[4%] lg:h-[86vh]"
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
            className="absolute left-1/2 top-[70%] h-16 w-[42%] -translate-x-1/2 rounded-full bg-slate-900/12 blur-[38px] sm:h-20 md:h-24 lg:h-28"
            animate={{ scale: [1, 1.08, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Dish image — pulled back visually */}
          <motion.img
            src={`${baseUrl}starlinkcrop.png`}
            alt=""
            className="absolute inset-0 h-full w-full object-contain object-center opacity-[0.46] drop-shadow-[0_40px_80px_rgba(71,85,105,0.18)] sm:opacity-[0.52] md:opacity-[0.60]"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.82, delay: 0.3 }}
          />
        </div>
      </motion.div>

      {/* ─── Main content ─── */}
      <motion.div
        className="relative z-20 container mx-auto px-4 pb-20 pt-[126px] md:pb-24 md:pt-[158px] lg:pb-28 lg:pt-[190px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <div className="grid items-start gap-8 lg:grid-cols-[1.18fr_0.82fr] lg:gap-16">
          {/* ─── LEFT COLUMN — primary reading path ─── */}
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
                className="mb-5 inline-flex rounded-full border border-slate-300/65 bg-white/60 px-4 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-slate-500 backdrop-blur-sm md:mb-6 md:text-[11.5px]"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {t('hero.leftBadge')}
              </motion.span>

              {/* Headline — tighter line-height, narrower max-width for elegant line breaks */}
              <h1 className="max-w-[560px] text-[33px] font-bold leading-[1.06] tracking-[-0.025em] text-slate-900 sm:text-[42px] md:text-[52px] lg:text-[62px]">
                {t('hero.title')}
              </h1>

              {/* Subtitle — stronger contrast than before, deliberate max-width */}
              <p className="mt-4 max-w-[480px] text-[15px] leading-[1.65] text-slate-600 md:mt-5 md:text-[17px] md:leading-[1.6]">
                {t('hero.subtitle')}
              </p>

              {/* Benefit bullets — compact, consistent sizing */}
              <ul className="mt-7 space-y-2.5 md:mt-9">
                {leftPoints.map((point, idx) => (
                  <motion.li
                    key={point}
                    className="flex items-center gap-2.5 text-[14px] font-medium text-slate-800 md:text-[16px]"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.46 + idx * 0.1 }}
                  >
                    <span className="inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-500/12 text-emerald-600 md:h-6 md:w-6">
                      <Check size={13} strokeWidth={2.5} />
                    </span>
                    <span>{point}</span>
                  </motion.li>
                ))}
              </ul>

              {/* ─── CTA zone — two buttons + trust micro-text ─── */}
              <div className="mt-8 flex flex-col items-start gap-4 md:mt-10">
                <div className="flex flex-wrap items-center gap-3">
                  {/* Primary CTA */}
                  <motion.button
                    onClick={openWhatsApp}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#1fbf63] to-[#159b50] px-8 py-3.5 text-[15px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(31,191,99,0.65)] transition-all hover:shadow-[0_22px_44px_-18px_rgba(31,191,99,0.78)] hover:brightness-105 md:px-10 md:py-4 md:text-[17px]"
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
                  className="flex items-center gap-2 text-[12.5px] text-slate-500 md:text-[13.5px]"
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

          {/* ─── RIGHT COLUMN — compact service card ─── */}
          <motion.div
            className="w-full max-w-[440px] pt-2 md:pt-6 lg:justify-self-end lg:pt-[200px]"
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
              <div className="rounded-[20px] border border-slate-200/75 bg-white/78 p-5 shadow-[0_20px_44px_-28px_rgba(15,23,42,0.28)] backdrop-blur-xl md:p-7">
                {/* Card title — smaller than before, doesn't compete with h1 */}
                <h2 className="text-[18px] font-bold leading-tight text-slate-900 md:text-[20px]">
                  {t('hero.rightTitle')}
                </h2>
                {/* Service list — 4 specific items */}
                <ul className="mt-4 space-y-3 md:mt-5 md:space-y-3.5">
                  {rightPoints.map((point, idx) => (
                    <motion.li
                      key={point}
                      className="flex items-start gap-2.5 text-[13px] leading-snug text-slate-600 md:text-[14.5px]"
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 + idx * 0.08 }}
                    >
                      <CheckCircle2 className="mt-0.5 h-[18px] w-[18px] flex-none text-emerald-500" />
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>
                {/* Card footer — trust badges + mini CTA */}
                <div className="mt-5 border-t border-slate-100 pt-4">
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-slate-50 px-3 py-1 text-[11.5px] font-medium text-slate-500 md:text-[12.5px]">
                      {t('hero.rightFooter1')}
                    </span>
                    <span className="rounded-full bg-slate-50 px-3 py-1 text-[11.5px] font-medium text-slate-500 md:text-[12.5px]">
                      {t('hero.rightFooter2')}
                    </span>
                  </div>
                  <motion.button
                    onClick={openWhatsApp}
                    className="w-full rounded-xl bg-slate-900 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-slate-800 md:py-3 md:text-[14px]"
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
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#e8ecf2] to-transparent" />
    </section>
  )
}

export default Hero
