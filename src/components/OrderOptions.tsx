import { useTranslation } from 'react-i18next'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { motion } from 'framer-motion'
import { MessageCircle, Clock, ShieldCheck, Zap } from 'lucide-react'

const OrderOptions = () => {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation(0.05)

  const features = [
    {
      title: t('orderOptions.feature1Title'),
      desc: t('orderOptions.feature1Desc'),
      icon: Zap
    },
    {
      title: t('orderOptions.feature2Title'),
      desc: t('orderOptions.feature2Desc'),
      icon: Clock
    },
    {
      title: t('orderOptions.feature3Title'),
      desc: t('orderOptions.feature3Desc'),
      icon: ShieldCheck
    }
  ]

  return (
    <section id="order-options" ref={ref} className="py-20 md:py-28 bg-[#f8fafc] relative overflow-hidden">
      {/* Decorative ambient elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(27,145,186,0.06),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_10%_90%,rgba(16,185,129,0.03),transparent_60%)] pointer-events-none" />
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-200/60 to-transparent pointer-events-none" />
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        


        {/* Benefits Panel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-b from-white/95 to-sky-50/20 border border-slate-200/60 rounded-[32px] p-8 md:p-12 lg:p-14 mb-16 shadow-xl shadow-slate-100/50 backdrop-blur-xl relative overflow-hidden"
        >
          {/* Subtle decoration overlay */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-sky-400/5 to-indigo-400/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
            <div className="lg:col-span-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-5 leading-tight">
                {t('orderOptions.panelTitle')}
              </h3>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                {t('orderOptions.panelDesc')}
              </p>
            </div>
            
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
              {features.map((item, i) => {
                const IconComponent = item.icon
                return (
                  <div key={i} className="flex flex-col items-start bg-white/50 p-5 rounded-2xl border border-slate-100/60 backdrop-blur-sm shadow-sm">
                    <div className="p-3 bg-gradient-to-tr from-sky-50 to-indigo-50 border border-sky-100/60 text-sky-600 rounded-xl w-fit shadow-sm mb-4">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-800 text-base mb-2 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center relative flex flex-col items-center"
        >
          {/* Ambient glow behind CTA */}
          <div className="absolute w-60 h-20 bg-emerald-500/20 rounded-full blur-2xl -z-10 pointer-events-none" />
          
          <motion.a
            href="https://wa.me/77007006613?text=Здравствуйте!%20Меня%20интересует%20быстрая%20экспресс-доставка%20Starlink.%20Есть%20ли%20в%20наличии%20в%20моем%20городе%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-base font-bold rounded-2xl shadow-[0_12px_24px_-8px_rgba(16,185,129,0.45)] hover:shadow-[0_16px_32px_-6px_rgba(16,185,129,0.6)] transition-all w-full sm:w-auto relative group overflow-hidden border border-emerald-400/20"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Shimmer effect */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            
            <MessageCircle className="w-5.5 h-5.5 fill-current" />
            <span className="tracking-wide">{t('orderOptions.cta')}</span>
          </motion.a>
        </motion.div>

      </div>
    </section>
  )
}

export default OrderOptions
