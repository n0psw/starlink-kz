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
    <section id="usecases" ref={ref} className="bg-[var(--bg)] py-8 md:py-10 lg:py-12">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-5 bg-gradient-to-r from-[#E4EEFA] to-[#8AAED8] bg-clip-text text-center text-2xl font-bold text-transparent sm:text-3xl md:mb-6 md:text-4xl lg:mb-8 lg:text-5xl"
        >
          {t('useCases.title')}
        </motion.h2>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-5">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.key}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0B1121]/80 transition-all hover:-translate-y-1 hover:border-accent/[0.35] hover:shadow-xl hover:shadow-black/50"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-[#0B1121]">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1121]/85 via-[#0B1121]/15 to-transparent z-10"></div>
                <img
                  src={useCase.image}
                  alt={t(`useCases.${useCase.key}.title`)}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = `${baseUrl}usecases/usecase-9.jpg`
                  }}
                />
              </div>
              <div className="relative z-20 p-3.5 md:p-4">
                <h3 className="mb-1.5 text-base font-semibold text-[var(--text)] md:text-lg">
                  {t(`useCases.${useCase.key}.title`)}
                </h3>
                <p className="text-sm leading-snug text-[var(--muted)] md:text-[15px]">
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
