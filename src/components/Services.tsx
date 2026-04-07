import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  Antenna,
  Bus,
  Building2,
  Camera,
  CheckCircle2,
  Globe2,
  Network,
  Router,
  SatelliteDish,
  Signal,
  Wifi,
  Wrench,
} from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const Services = () => {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation()
  const [showAll, setShowAll] = useState(false)

  const services = useMemo(
    () => [
      {
        key: 'installation',
        icon: SatelliteDish,
      },
      {
        key: 'wifi',
        icon: Wifi,
      },
      {
        key: 'mesh',
        icon: Network,
      },
      {
        key: 'mobile',
        icon: Bus,
      },
      {
        key: 'b2b',
        icon: Building2,
      },
      {
        key: 'ptp',
        icon: Signal,
      },
      {
        key: 'cameras',
        icon: Camera,
      },
      {
        key: 'routers',
        icon: Router,
      },
      {
        key: 'remote',
        icon: Globe2,
      },
      {
        key: 'events',
        icon: Antenna,
      },
      {
        key: 'expeditions',
        icon: Wrench,
      },
      {
        key: 'custom',
        icon: CheckCircle2,
      },
    ],
    [],
  )

  const visibleServices = showAll ? services : services.slice(0, 6)

  return (
    <section id="services" ref={ref} className="bg-[var(--surface)] py-8 md:py-10 lg:py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mx-auto mb-6 max-w-3xl text-center md:mb-8"
        >
          <h2 className="mb-3 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl md:text-4xl">
            {t('services.title')}
          </h2>
          <p className="text-sm text-[var(--muted)] md:text-base">
            {t('services.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {visibleServices.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.article
                key={service.key}
                initial={{ opacity: 0, y: 28 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="premium-card rounded-2xl p-4 transition-all hover:-translate-y-0.5 hover:border-accent/[0.30] hover:shadow-[0_20px_34px_-24px_rgba(15,23,42,0.38)]"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/[0.12] text-accent">
                  <Icon size={20} />
                </div>
                <h3 className="mb-1.5 text-base font-semibold text-[var(--text)] md:text-lg">
                  {t(`services.items.${service.key}.title`)}
                </h3>
                <p className="text-sm leading-snug text-[var(--muted)]">
                  {t(`services.items.${service.key}.description`)}
                </p>
              </motion.article>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="mt-4 flex flex-col items-center gap-3 md:mt-5"
        >
          {services.length > 6 && (
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center justify-center rounded-xl border border-slate-300/80 bg-white/80 px-4 py-2 text-sm font-semibold text-[var(--text)] transition-colors hover:border-slate-400/80 hover:bg-white"
            >
              {showAll ? t('services.hide') : t('services.showAll')}
            </button>
          )}

          <div className="w-full premium-card p-4 text-center md:p-5">
            <p className="text-sm font-semibold text-[var(--text)] md:text-base">
              {t('services.customText')}
            </p>
            <a
              href="https://wa.me/77007006613"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-slate-800"
            >
              {t('services.customCta')}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Services
