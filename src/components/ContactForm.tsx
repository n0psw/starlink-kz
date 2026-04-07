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
  serviceType: string
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
      const equipmentText = data.equipment === 'mini' ? 'Starlink Mini' : data.equipment === 'v4' ? 'Starlink V4' : 'Не выбрано'
      const serviceTypeText = data.serviceType === 'rental' ? 'Аренда' : data.serviceType === 'purchase' ? 'Покупка' : 'Не выбрано'
      
      const message = `Новая заявка от ${data.name}

📞 Телефон: ${data.phone}
📧 Email: ${data.email}
🎯 Тип услуги: ${serviceTypeText}
📡 Оборудование: ${equipmentText}
💬 Сообщение: ${data.message || 'Нет сообщения'}`

      const whatsappUrl = `https://wa.me/77007006613?text=${encodeURIComponent(message)}`
      
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
      
      toast.success('Открывается WhatsApp для отправки заявки')
      reset()
    } catch (error) {
      toast.error('Произошла ошибка. Пожалуйста, попробуйте еще раз.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" ref={ref} className="py-12 md:py-16 lg:py-20 bg-[color:var(--surface-2)] pt-20 md:pt-24 lg:pt-32">
      <Toaster position="top-right" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-10 lg:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
            {t('contact.title')}
          </h2>
          <p className="text-slate-600 text-base md:text-lg">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto premium-panel p-6 md:p-8"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-slate-700 mb-2 text-sm md:text-base">
                {t('contact.name')}
              </label>
              <input
                {...register('name', { required: true })}
                className="w-full px-4 py-3 text-sm md:text-base bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all shadow-sm"
                placeholder={t('contact.name')}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">Обязательное поле</p>
              )}
            </div>

            <div>
              <label className="block text-slate-700 mb-2 text-sm md:text-base">
                {t('contact.phone')}
              </label>
              <input
                {...register('phone', { required: true })}
                type="tel"
                className="w-full px-4 py-3 text-sm md:text-base bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all shadow-sm"
                placeholder="+7 700 000 0000"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">Обязательное поле</p>
              )}
            </div>

            <div>
              <label className="block text-slate-700 mb-2 text-sm md:text-base">
                {t('contact.email')}
              </label>
              <input
                {...register('email', {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                })}
                type="email"
                className="w-full px-4 py-3 text-sm md:text-base bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all shadow-sm"
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
              <label className="block text-slate-700 mb-2 text-sm md:text-base">
                {t('contact.serviceType')}
              </label>
              <select
                {...register('serviceType', { required: true })}
                className="w-full px-4 py-3 text-sm md:text-base bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all shadow-sm"
              >
                <option value="">{t('contact.selectServiceType')}</option>
                <option value="rental">{t('contact.rental')}</option>
                <option value="purchase">{t('contact.purchase')}</option>
              </select>
              {errors.serviceType && (
                <p className="text-red-500 text-sm mt-1">Обязательное поле</p>
              )}
            </div>

            <div>
              <label className="block text-slate-700 mb-2 text-sm md:text-base">
                {t('contact.equipment')}
              </label>
              <select
                {...register('equipment', { required: true })}
                className="w-full px-4 py-3 text-sm md:text-base bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all shadow-sm"
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
              <label className="block text-slate-700 mb-2 text-sm md:text-base">
                {t('contact.message')}
              </label>
              <textarea
                {...register('message')}
                rows={4}
                className="w-full px-4 py-3 text-sm md:text-base bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all resize-none shadow-sm"
                placeholder={t('contact.message')}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 text-base md:text-lg font-semibold rounded-full transition-all flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-accent/40"
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
