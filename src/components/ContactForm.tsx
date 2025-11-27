import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { motion } from 'framer-motion'
import toast, { Toaster } from 'react-hot-toast'
import { Loader2 } from 'lucide-react'

interface FormData {
  name: string
  phone: string
  email: string
  equipment: string
  message: string
}

const ContactForm = () => {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log('Form submitted:', data)
      toast.success('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.')
      reset()
    } catch (error) {
      toast.error('Произошла ошибка. Пожалуйста, попробуйте еще раз.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" ref={ref} className="py-12 md:py-20 bg-black pt-24 md:pt-32">
      <Toaster position="top-right" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 md:mb-12 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {t('contact.title')}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-white mb-2">
                {t('contact.name')}
              </label>
              <input
                {...register('name', { required: true })}
                className="w-full px-4 py-3 bg-gray-900/80 border border-gray-800/50 rounded-lg text-white focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all"
                placeholder={t('contact.name')}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">Обязательное поле</p>
              )}
            </div>

            <div>
              <label className="block text-white mb-2">
                {t('contact.phone')}
              </label>
              <input
                {...register('phone', { required: true })}
                type="tel"
                className="w-full px-4 py-3 bg-gray-900/80 border border-gray-800/50 rounded-lg text-white focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all"
                placeholder="+7 700 000 0000"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">Обязательное поле</p>
              )}
            </div>

            <div>
              <label className="block text-white mb-2">
                {t('contact.email')}
              </label>
              <input
                {...register('email', {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                })}
                type="email"
                className="w-full px-4 py-3 bg-gray-900/80 border border-gray-800/50 rounded-lg text-white focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all"
                placeholder="example@email.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.type === 'required'
                    ? 'Обязательное поле'
                    : 'Неверный email'}
                </p>
              )}
            </div>

            <div>
              <label className="block text-white mb-2">
                {t('contact.equipment')}
              </label>
              <select
                {...register('equipment', { required: true })}
                className="w-full px-4 py-3 bg-gray-900/80 border border-gray-800/50 rounded-lg text-white focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all"
              >
                <option value="">{t('contact.selectEquipment')}</option>
                <option value="mini">Starlink Mini</option>
                <option value="v4">Starlink V4</option>
              </select>
              {errors.equipment && (
                <p className="text-red-500 text-sm mt-1">Обязательное поле</p>
              )}
            </div>

            <div>
              <label className="block text-white mb-2">
                {t('contact.message')}
              </label>
              <textarea
                {...register('message')}
                rows={4}
                className="w-full px-4 py-3 bg-gray-900/80 border border-gray-800/50 rounded-lg text-white focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all resize-none"
                placeholder={t('contact.message')}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-4 bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent disabled:opacity-50 disabled:cursor-not-allowed text-white text-lg font-semibold rounded-lg transition-all flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-accent/50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Отправка...</span>
                </>
              ) : (
                t('contact.submit')
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactForm

