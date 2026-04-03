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
  ]

  const bottomPoints = [
    t('hero.bottomReliability'),
    t('hero.bottomFastInstall'),
    t('hero.bottomSupport'),
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_34%,rgba(255,255,255,0.95),rgba(240,243,247,0.95)_38%,rgba(231,235,241,0.92)_74%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.72),rgba(236,240,246,0.78)_45%,rgba(228,233,239,0.86))]" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/86 via-white/68 to-transparent" />

      <motion.div
        aria-hidden="true"
        className="absolute -left-[5%] top-[26%] hidden text-[148px] font-bold tracking-tight text-slate-900/[0.045] lg:block"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.25 }}
      >
        STARLINK
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="absolute right-[10%] top-[16%] hidden h-56 w-56 rounded-full bg-white/90 blur-[86px] lg:block"
        animate={{ y: [0, 10, 0], opacity: [0.55, 0.85, 0.55] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      {stars.map((star, idx) => (
        <motion.span
          key={idx}
          aria-hidden="true"
          className="absolute h-1 w-1 rounded-full bg-slate-600/25"
          style={{ top: star.top, left: star.left }}
          animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.3, 1] }}
          transition={{ duration: 4, delay: star.delay, repeat: Infinity }}
        />
      ))}

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[14%] z-[1] h-[66vh] w-[122vw] max-w-[1500px] -translate-x-1/2 md:top-[12%] md:h-[74vh] lg:top-[6%] lg:h-[88vh]"
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
          <motion.div
            className="absolute left-1/2 top-[70%] h-16 w-[42%] -translate-x-1/2 rounded-full bg-slate-900/16 blur-[38px] sm:h-20 md:h-24 lg:h-28"
            animate={{ scale: [1, 1.08, 1], opacity: [0.14, 0.26, 0.14] }}
            transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.img
            src={`${baseUrl}starlinkcrop.png`}
            alt=""
            className="absolute inset-0 h-full w-full object-contain object-center opacity-[0.58] drop-shadow-[0_50px_100px_rgba(71,85,105,0.26)] sm:opacity-[0.64] md:opacity-[0.72]"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.82, delay: 0.3 }}
          />
        </div>
      </motion.div>

      <motion.div
        className="relative z-20 container mx-auto px-4 pb-16 pt-[126px] md:pb-20 md:pt-[158px] lg:pb-24 lg:pt-[186px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <div className="grid items-start gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
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
              <span className="mb-4 inline-flex rounded-full border border-slate-300/90 bg-white/75 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-700 backdrop-blur md:mb-5 md:text-xs">
                {t('hero.leftBadge')}
              </span>
              <h1 className="max-w-2xl text-4xl font-bold leading-[1.03] text-slate-900 sm:text-5xl md:text-6xl lg:text-[76px]">
                {t('hero.title')}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 md:mt-5 md:text-[22px]">
                {t('hero.subtitle')}
              </p>

              <ul className="mt-6 space-y-3.5 md:mt-8">
                {leftPoints.map((point, idx) => (
                  <motion.li
                    key={point}
                    className="flex items-center gap-3 text-[15px] text-slate-800 md:text-[25px] md:font-medium md:tracking-tight"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.48 + idx * 0.12 }}
                  >
                    <span className="inline-flex h-6 w-6 flex-none items-center justify-center rounded-full border border-emerald-300/90 bg-emerald-100/90 text-emerald-700 md:h-8 md:w-8">
                      <Check size={16} />
                    </span>
                    <span>{point}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col items-start gap-3 md:mt-10">
                <motion.button
                  onClick={openWhatsApp}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#1fbf63] to-[#159b50] px-7 py-3 text-base font-bold text-white shadow-[0_24px_45px_-24px_rgba(31,191,99,0.88)] transition-all hover:brightness-105 md:px-10 md:py-4 md:text-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.88 }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t('hero.cta')}
                  <ArrowRight size={18} />
                </motion.button>
                <motion.p
                  className="text-sm text-slate-500 md:text-base"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 1 }}
                >
                  {t('hero.ctaHint')}
                </motion.p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="w-full max-w-[620px] pt-4 md:pt-8 lg:justify-self-end lg:pt-[230px]"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.22 }}
          >
            <div
              style={{
                transform: isMobile
                  ? undefined
                  : `translate3d(${mousePosition.x * -0.42}px, ${mousePosition.y * -0.34}px, 0)`,
              }}
            >
              <div className="mt-4 rounded-[24px] border border-slate-200/95 bg-white/84 p-6 backdrop-blur-xl shadow-[0_26px_48px_-34px_rgba(15,23,42,0.45)] md:p-8">
                <h2 className="text-2xl font-bold leading-tight text-slate-900 md:text-4xl md:leading-[1.07]">
                  {t('hero.rightTitle')}
                </h2>
                <ul className="mt-6 space-y-4 md:mt-7 md:space-y-5">
                  {rightPoints.map((point, idx) => (
                    <motion.li
                      key={point}
                      className="flex items-start gap-3 text-sm text-slate-700 md:text-lg"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.45, delay: 0.62 + idx * 0.1 }}
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-600" />
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-7 grid grid-cols-2 gap-3 border-t border-white/12 pt-5">
                  <div className="rounded-xl border border-slate-200 bg-white/85 px-3 py-2 text-sm text-slate-700 md:text-base">
                    {t('hero.kpiSpeed')}
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white/85 px-3 py-2 text-sm text-slate-700 md:text-base">
                    {t('hero.kpiInstall')}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-10 grid grid-cols-1 gap-3 md:mt-12 md:grid-cols-3 md:gap-4"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.92 }}
        >
          {bottomPoints.map((point) => (
            <div
              key={point}
              className="flex items-center gap-3 rounded-2xl border border-slate-200/95 bg-white/70 px-4 py-3 text-sm text-slate-700 backdrop-blur md:text-base"
            >
              <span className="inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <Check size={14} />
              </span>
              <span>{point}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#e8ecf2] to-transparent" />
    </section>
  )
}

export default Hero
