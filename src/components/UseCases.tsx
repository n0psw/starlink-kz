import { useTranslation } from 'react-i18next'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { motion } from 'framer-motion'

const UseCases = () => {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation()

  const baseUrl = import.meta.env.BASE_URL || '/'
  const useCases = [
    {
      key: 'hunting',
      image: `${baseUrl}usecases/usecase-1.jpg`,
    },
    {
      key: 'camping',
      image: `${baseUrl}usecases/usecase-2.jpg`,
    },
    {
      key: 'mountains',
      image: `${baseUrl}usecases/usecase-3.jpg`,
    },
    {
      key: 'streaming',
      image: `${baseUrl}usecases/usecase-4.jpg`,
    },
    {
      key: 'construction',
      image: `${baseUrl}usecases/usecase-5.jpg`,
    },
    {
      key: 'farming',
      image: `${baseUrl}usecases/usecase-6.jpg`,
    },
    {
      key: 'events',
      image: `${baseUrl}usecases/usecase-7.jpg`,
    },
    {
      key: 'tourism',
      image: `${baseUrl}usecases/usecase-8.jpg`,
    },
    {
      key: 'freelance',
      image: `${baseUrl}usecases/usecase-9.jpg`,
    },
  ]

  return (
    <section id="usecases" ref={ref} className="py-12 md:py-16 lg:py-20 bg-white pt-20 md:pt-24 lg:pt-32">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 text-center mb-8 md:mb-12 lg:mb-16 bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent"
        >
          {t('useCases.title')}
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.key}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden premium-card transition-all transform hover:scale-[1.02] hover:border-accent/50 hover:shadow-xl hover:shadow-slate-200/70 hover:-translate-y-1"
            >
              <div className="aspect-video overflow-hidden relative bg-slate-100">
                <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/10 to-transparent z-10"></div>
                <img
                  src={useCase.image}
                  alt={t(`useCases.${useCase.key}.title`)}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = `${baseUrl}usecases/usecase-9.jpg`
                  }}
                />
              </div>
              <div className="p-4 md:p-6 relative z-20">
                <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-2">
                  {t(`useCases.${useCase.key}.title`)}
                </h3>
                <p className="text-slate-600 text-sm md:text-base">
                  {t(`useCases.${useCase.key}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default UseCases

