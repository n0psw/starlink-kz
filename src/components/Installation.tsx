import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { motion } from 'framer-motion'

const Installation = () => {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation()
  const baseUrl = import.meta.env.BASE_URL || '/'

  const poster = `${baseUrl}bg.jpg`
  const videos = [
    { key: 'visit', src: `${baseUrl}video1.mp4`, label: t('installation.visit.title'), poster },
    { key: 'mount', src: `${baseUrl}video2.mp4`, label: t('installation.mount.title'), poster },
    { key: 'setup', src: `${baseUrl}video3.mp4`, label: t('installation.setup.title'), poster },
  ]

  return (
    <section id="installation" ref={ref} className="py-12 md:py-16 lg:py-20 bg-white pt-20 md:pt-24 lg:pt-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
            {t('installation.title')}
          </h2>
          <p className="text-base md:text-xl text-slate-600">{t('installation.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {videos.map((video, index) => (
            <VideoCard
              key={video.key}
              src={video.src}
              label={video.label}
              poster={video.poster}
              isVisible={isVisible}
              delay={index * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

type VideoCardProps = {
  src: string
  label: string
  poster: string
  isVisible: boolean
  delay: number
}

const VideoCard = ({ src, label, poster, isVisible, delay }: VideoCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = wrapperRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      {
        threshold: 0.35,
        rootMargin: '120px',
      }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isInView) {
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => undefined)
      }
      return
    }

    video.pause()
  }, [isInView])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70"
    >
      <div ref={wrapperRef} className="relative aspect-[9/16] w-full overflow-hidden bg-slate-100">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          aria-label={label}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"></div>
      </div>
    </motion.div>
  )
}

export default Installation
