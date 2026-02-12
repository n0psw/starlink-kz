import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const FAQ = () => {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'Как быстро можно получить оборудование?',
      answer: 'Оборудование можно получить в день обращения. Мы доставляем по Алматы и можем организовать доставку в другие города Казахстана.',
    },
    {
      question: 'Нужна ли помощь в установке?',
      answer: 'Установка очень простая - достаточно подключить оборудование и направить его в небо. Мы предоставляем подробную инструкцию и можем проконсультировать по телефону.',
    },
    {
      question: 'Работает ли Starlink в плохую погоду?',
      answer: 'Да, оборудование Starlink устойчиво к различным погодным условиям. Тарелка автоматически растапливает снег и выдерживает дождь и ветер.',
    },
    {
      question: 'Какая скорость интернета?',
      answer: 'Скорость может варьироваться от 50 до 350 Мбит/с в зависимости от модели оборудования и условий. В среднем скорость составляет 150-200 Мбит/с.',
    },
    {
      question: 'Можно ли использовать для онлайн-игр?',
      answer: 'Да, Starlink обеспечивает низкую задержку (latency) и подходит для онлайн-игр, видеозвонков и стриминга.',
    },
    {
      question: 'Что входит в стоимость аренды?',
      answer: 'В стоимость входит само оборудование, кабель, роутер (если есть) и техническая поддержка на время аренды.',
    },
  ]

  return (
    <section id="faq" ref={ref} className="py-12 md:py-16 lg:py-20 bg-white pt-20 md:pt-24 lg:pt-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
            {t('faq.title')}
          </h2>
          <p className="text-base md:text-xl text-slate-600">{t('faq.subtitle')}</p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="premium-card overflow-hidden hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-slate-200/70"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-4 md:px-6 py-4 flex items-center justify-between text-left gap-4"
              >
                <span className="text-slate-900 font-semibold text-base md:text-lg flex-1">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-accent transition-transform flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 md:px-6 pb-4 text-slate-600 text-sm md:text-base">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ

