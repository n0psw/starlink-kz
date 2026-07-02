import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageCircle,
  ZoomIn,
  Check,
  X,
  SatelliteDish,
  Wifi,
  Network,
  Bus,
  Signal,
  Building2
} from 'lucide-react'

const ConnectionSchemes = () => {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation(0.05)
  const [activeTab, setActiveTab] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const baseUrl = import.meta.env.BASE_URL || '/'

  const services = [
    { key: 'installation', icon: SatelliteDish },
    { key: 'wifi', icon: Wifi },
    { key: 'mesh', icon: Network },
    { key: 'mobile', icon: Bus },
    { key: 'ptp', icon: Signal },
    { key: 'b2b', icon: Building2 },
  ]

  const schemes = [
    {
      tab: t('schemes.tab1'),
      desc: t('schemes.desc1'),
      img: `${baseUrl}scheme-5-houses.jpg`,
      eq: t('schemes.eqHouses'),
      waText: 'Здравствуйте! Меня интересует схема подключения Starlink на 5 домов. Расскажите подробнее.'
    },
    {
      tab: t('schemes.tab2'),
      desc: t('schemes.desc2'),
      img: `${baseUrl}scheme-5-story.jpg`,
      eq: t('schemes.eqFiveStory'),
      waText: 'Здравствуйте! Меня интересует схема подключения Starlink в пятиэтажном доме. Расскажите подробнее.'
    },
    {
      tab: t('schemes.tab3'),
      desc: t('schemes.desc3'),
      img: `${baseUrl}scheme-2-story.jpg`,
      eq: t('schemes.eqTwoStory'),
      waText: 'Здравствуйте! Меня интересует схема подключения Starlink в двухэтажном доме (200 м²). Расскажите подробнее.'
    },
    {
      tab: t('schemes.tab4'),
      desc: t('schemes.desc4'),
      img: `${baseUrl}scheme-bus.jpg`,
      eq: t('schemes.eqBus'),
      waText: 'Здравствуйте! Меня интересует схема подключения Starlink Mini на автобусе. Расскажите подробнее.'
    }
  ]

  const activeScheme = schemes[activeTab]

  return (
    <section id="services" ref={ref} className="py-20 md:py-28 bg-[#050810] border-t border-white/5 relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(14,116,144,0.05),transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">

        {/* ─── Sub-section 1: Turnkey Services ─── */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              {t('services.title')}
            </h2>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed">
              {t('services.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className="w-full"
                >
                  <div className="flex items-start gap-4 p-5 bg-white/[0.02] border border-white/[0.08] rounded-2xl hover:bg-white/[0.04] hover:border-sky-500/30 hover:shadow-[0_0_30px_-5px_rgba(14,165,233,0.15)] transition-all duration-300 group w-full h-full">
                    <div className="flex-none inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="mb-1 text-base font-bold text-white leading-snug group-hover:text-sky-400 transition-colors">
                        {t(`services.items.${service.key}.title`)}
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {t(`services.items.${service.key}.description`)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="text-center text-sm sm:text-base text-slate-400 max-w-2xl mx-auto"
          >
            {t('services.customText')}{' '}
            <a
              href="https://wa.me/77007006613"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 font-semibold hover:text-sky-300 underline transition-colors"
            >
              {t('services.customCta')}
            </a>
          </motion.p>
        </div>

        <hr className="border-white/5 my-16" />



        {/* Dynamic Tab Switcher */}
        <div className="flex justify-center mb-10 md:mb-12">
          <div className="inline-flex flex-wrap md:flex-nowrap gap-1.5 p-1.5 bg-white/[0.03] border border-white/[0.08] rounded-2xl md:rounded-full backdrop-blur-md w-full md:w-auto max-w-lg md:max-w-none">
            {schemes.map((scheme, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveTab(idx)
                  setIsZoomed(false)
                }}
                className={`relative px-5 py-2.5 rounded-xl md:rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 w-full md:w-auto text-center cursor-pointer ${activeTab === idx
                    ? 'text-black bg-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                {scheme.tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white/[0.02] backdrop-blur-md border border-white/[0.08] rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">

          {/* Subtle gradient highlights inside card */}
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

          {/* Left Column: Scheme Details */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight leading-tight">
                {activeScheme.tab}
              </h3>

              <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
                {activeScheme.desc}
              </p>

              <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5 shadow-sm">
                <span className="block text-xs font-bold uppercase tracking-wider mb-3.5" style={{ color: '#475569' }}>
                  {t('schemes.equipment')}
                </span>

                <ul className="space-y-2.5">
                  {activeScheme.eq.split(',').map((eqItem, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 font-medium">
                      <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                        <Check size={11} strokeWidth={3} />
                      </span>
                      <span>{eqItem.trim()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-2">
              <motion.a
                href={`https://wa.me/77007006613?text=${encodeURIComponent(activeScheme.waText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white hover:bg-slate-100 text-black text-sm sm:text-base font-bold rounded-xl shadow-lg transition-all w-full sm:w-auto relative group overflow-hidden cursor-pointer"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Shimmer effect */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                <MessageCircle className="w-5 h-5 fill-current" />
                <span className="tracking-wide">{t('schemes.cta')}</span>
              </motion.a>
            </div>
          </div>

          {/* Right Column: Schema Interactive Image */}
          <div className="lg:col-span-7">
            <div
              onClick={() => setIsZoomed(true)}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/95 p-2.5 shadow-md cursor-zoom-in group hover:shadow-xl hover:border-sky-500/50 transition-all duration-300 aspect-[3/2] flex items-center justify-center"
            >
              <img
                src={activeScheme.img}
                alt={activeScheme.tab}
                className="max-h-full max-w-full object-contain rounded-lg group-hover:scale-[1.015] transition-all duration-500"
              />

              {/* Overlay with Zoom Indicator */}
              <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/20 transition-all duration-300 flex items-center justify-center pointer-events-none">
                <span className="p-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 text-slate-800 flex items-center gap-2 text-xs font-bold border border-slate-200/80 pointer-events-none">
                  <ZoomIn className="w-4 h-4 text-slate-700" />
                  {t('schemes.zoom')}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Full-Screen Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
            className="fixed inset-0 z-[9999] bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 md:top-6 md:right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer shadow-lg border border-white/10"
              aria-label="Close fullscreen view"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Image container */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="max-w-5xl max-h-[85vh] w-full h-full relative flex items-center justify-center"
            >
              <img
                src={activeScheme.img}
                alt={activeScheme.tab}
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl bg-white p-3"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default ConnectionSchemes
