import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const Hero = () => {
  const { t } = useTranslation()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const baseUrl = import.meta.env.BASE_URL || '/'

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth > 768) {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * 20,
          y: (e.clientY / window.innerHeight - 0.5) * 20,
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const openWhatsApp = () => {
    window.open('https://wa.me/77007006613', '_blank')
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-slate-50 to-white pt-28 md:pt-32 overflow-hidden"
      style={{
        backgroundImage: isMobile 
          ? 'url(https://i.pinimg.com/736x/34/fd/63/34fd63f6ca8340ae3838135748067965.jpg)'
          : `url(${baseUrl}heroo.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/70 to-white/85"></div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 lg:h-48 bg-gradient-to-t from-white via-white/80 to-transparent z-10"></div>
      
      <motion.div
        className="relative z-10 container mx-auto px-4 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
        }}
      >
        <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200/70 bg-white/75 backdrop-blur-md px-6 py-8 md:px-10 md:py-12 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.45)]">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-slate-900 mb-4 md:mb-6 leading-tight bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent px-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 mb-6 md:mb-8 max-w-3xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t('hero.subtitle')}
          </motion.p>
          <motion.button
            onClick={openWhatsApp}
            className="px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent text-slate-900 text-base md:text-lg font-semibold rounded-full transition-all transform hover:scale-105 shadow-xl shadow-accent/30 hover:shadow-2xl hover:shadow-accent/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('hero.cta')}
          </motion.button>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero

