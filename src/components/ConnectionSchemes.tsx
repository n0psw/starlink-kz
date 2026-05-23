import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, ZoomIn, Check, X } from 'lucide-react'

const ConnectionSchemes = () => {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation(0.05)
  const [activeTab, setActiveTab] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const baseUrl = import.meta.env.BASE_URL || '/'

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
    <section id="connection-schemes" ref={ref} className="py-20 md:py-28 bg-[#f8fafc] border-t border-slate-100 relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(14,116,144,0.05),transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-5 bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
            {t('schemes.title')}
          </h2>
          
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            {t('schemes.subtitle')}
          </p>
        </motion.div>

        {/* Dynamic Tab Switcher */}
        <div className="flex justify-center mb-10 md:mb-12">
          <div className="inline-flex flex-wrap md:flex-nowrap gap-1.5 p-1.5 bg-slate-100/80 border border-slate-200/50 rounded-2xl md:rounded-full backdrop-blur-md shadow-inner w-full md:w-auto max-w-lg md:max-w-none">
            {schemes.map((scheme, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveTab(idx)
                  setIsZoomed(false)
                }}
                className={`relative px-5 py-2.5 rounded-xl md:rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 w-full md:w-auto text-center cursor-pointer ${
                  activeTab === idx
                    ? 'text-white bg-slate-900 shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                {scheme.tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white/70 backdrop-blur-md border border-slate-200/40 rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-xl shadow-slate-100/50 relative overflow-hidden">
          
          {/* Subtle gradient highlights inside card */}
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

          {/* Left Column: Scheme Details */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 tracking-tight leading-tight">
                {activeScheme.tab}
              </h3>
              
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-6">
                {activeScheme.desc}
              </p>

              <div className="bg-slate-50/80 border border-slate-100/80 rounded-2xl p-5 backdrop-blur-sm shadow-sm">
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3.5">
                  {t('schemes.equipment')}
                </span>
                
                <ul className="space-y-2.5">
                  {activeScheme.eq.split(',').map((eqItem, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 font-medium">
                      <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100/50">
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
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-slate-900 to-indigo-950 hover:from-slate-800 hover:to-indigo-900 text-white text-sm sm:text-base font-bold rounded-xl shadow-lg hover:shadow-xl hover:shadow-indigo-100/50 transition-all w-full sm:w-auto relative group overflow-hidden border border-indigo-900/10 cursor-pointer"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Shimmer effect */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                <MessageCircle className="w-5 h-5 fill-current" />
                <span className="tracking-wide">{t('schemes.cta')}</span>
              </motion.a>
            </div>
          </div>

          {/* Right Column: Schema Interactive Image */}
          <div className="lg:col-span-7">
            <div
              onClick={() => setIsZoomed(true)}
              className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-2.5 shadow-md cursor-zoom-in group hover:shadow-xl hover:border-slate-300 transition-all duration-300 aspect-[3/2] flex items-center justify-center"
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
