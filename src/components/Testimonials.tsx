import { useTranslation } from 'react-i18next'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const Testimonials = () => {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation()

  const testimonials = [
    {
      name: 'Алексей К.',
      location: 'Алматы',
      text: 'Отличный сервис! Использовал Starlink для работы в горах. Интернет стабильный, скорость высокая. Рекомендую!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
    },
    {
      name: 'Мария С.',
      location: 'Нур-Султан',
      text: 'Арендовала для мероприятия на природе. Все гости были в восторге от стабильного Wi-Fi. Очень довольна!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
    },
    {
      name: 'Дмитрий В.',
      location: 'Шымкент',
      text: 'Использую для удаленной работы в полях. Никаких проблем, все работает отлично. Спасибо за качественный сервис!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80',
    },
  ]

  return (
    <section id="testimonials" ref={ref} className="py-12 md:py-20 bg-gray-900 pt-24 md:pt-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {t('testimonials.title')}
          </h2>
          <p className="text-base md:text-xl text-gray-400">{t('testimonials.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-black p-6 md:p-8 rounded-lg border border-gray-800 hover:border-accent transition-all relative"
            >
              <Quote className="w-8 h-8 text-accent mb-4 opacity-50" />
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-gray-300 mb-6">{testimonial.text}</p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-gray-400 text-sm">{testimonial.location}</p>
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

