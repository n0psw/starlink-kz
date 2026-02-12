import { useTranslation } from 'react-i18next'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const Testimonials = () => {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation()

  const testimonials = [
    {
      name: 'Асхат Н.',
      location: 'Алматы',
      text: 'Отличный сервис! Использовал Starlink для работы в горах. Интернет стабильный, скорость высокая. Рекомендую!',
      rating: 5,
    },
    {
      name: 'Айгуль М.',
      location: 'Астана',
      text: 'Арендовала для мероприятия на природе. Все гости были в восторге от стабильного Wi-Fi. Очень довольна!',
      rating: 5,
    },
    {
      name: 'Ерлан Т.',
      location: 'Шымкент',
      text: 'Использую для удаленной работы в полях. Никаких проблем, все работает отлично. Спасибо за качественный сервис!',
      rating: 5,
    },
  ]

  return (
    <section id="testimonials" ref={ref} className="py-12 md:py-16 lg:py-20 bg-white pt-20 md:pt-24 lg:pt-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
            {t('testimonials.title')}
          </h2>
          <p className="text-base md:text-xl text-slate-600">{t('testimonials.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="premium-card p-5 md:p-6 lg:p-8 hover:border-accent transition-all relative hover:shadow-xl hover:shadow-slate-200/70"
            >
              <Quote className="w-8 h-8 text-accent mb-4 opacity-50" />
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-slate-600 mb-6 text-sm md:text-base leading-relaxed">{testimonial.text}</p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <div>
                  <p className="text-slate-900 font-semibold text-base md:text-lg">{testimonial.name}</p>
                  <p className="text-slate-500 text-sm">{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials



