import { useTranslation } from 'react-i18next'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { motion } from 'framer-motion'

const UseCases = () => {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation()

  const useCases = [
    {
      key: 'hunting',
      image: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800&q=80',
    },
    {
      key: 'camping',
      image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=800&q=80',
    },
    {
      key: 'mountains',
      image: 'https://images.unsplash.com/photo-1464822759844-d150ad849687?w=800&q=80',
    },
    {
      key: 'streaming',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
    },
    {
      key: 'construction',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    },
    {
      key: 'farming',
      image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80',
    },
    {
      key: 'events',
      image: 'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?w=800&q=80',
    },
    {
      key: 'tourism',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    },
    {
      key: 'freelance',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80',
    },
  ]

  return (
    <section id="usecases" ref={ref} className="py-12 md:py-20 bg-black pt-24 md:pt-32">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-12 md:mb-16 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
        >
          {t('useCases.title')}
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.key}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-black hover:from-gray-800 hover:to-gray-900 transition-all transform hover:scale-[1.02] border border-gray-800/50 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/30 hover:-translate-y-1"
            >
              <div className="aspect-video overflow-hidden relative bg-gray-900">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10"></div>
                <img
                  src={useCase.image}
                  alt={t(`useCases.${useCase.key}.title`)}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = `https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&q=80`
                  }}
                />
              </div>
              <div className="p-4 md:p-6 relative z-20">
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2 drop-shadow-lg">
                  {t(`useCases.${useCase.key}.title`)}
                </h3>
                <p className="text-gray-300 text-sm md:text-base">
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

