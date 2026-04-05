import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'

const Installation = () => {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation()
  const baseUrl = import.meta.env.BASE_URL || '/'

  const poster = `${baseUrl}bg.jpg`
  const videos = [
    {
      key: 'visit',
      src: `${baseUrl}video1.mp4`,
      label: t('installation.visit.title'),
      poster,
    },
    {
      key: 'mount',
      src: `${baseUrl}video2.mp4`,
      label: t('installation.mount.title'),
      poster,
    },
    {
      key: 'setup',
      src: `${baseUrl}video3.mp4`,
      label: t('installation.setup.title'),
      poster,
    },
    {
      key: 'extra1',
      src: `${baseUrl}video4.mp4`,
      label: t('installation.extra1.title'),
      poster,
    },
    {
      key: 'extra2',
      src: `${baseUrl}video5.mp4`,
      label: t('installation.extra2.title'),
      poster,
    },
    {
      key: 'extra3',
      src: `${baseUrl}video6.mp4`,
      label: t('installation.extra3.title'),
      poster,
    },
  ]

  return (
    <section id="installation" ref={ref} className="bg-[var(--surface)] py-8 md:py-10 lg:py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-5 text-center md:mb-6 lg:mb-7"
        >
          <h2 className="mb-3 bg-gradient-to-r from-[#E4EEFA] to-[#8AAED8] bg-clip-text text-3xl font-bold text-transparent sm:text-4xl md:text-5xl">
            {t('installation.title')}
          </h2>
          <p className="mx-auto max-w-3xl text-sm text-[var(--muted)] md:text-base">{t('installation.subtitle')}</p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
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
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const element = wrapperRef.current
    if (!element) return

    if (!('IntersectionObserver' in window)) {
      setIsInView(true)
      return
    }

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
    setIsPlaying(false)
  }, [isInView])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0F1928] shadow-none transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 hover:border-accent/[0.25]"
    >
      <div ref={wrapperRef} className="relative aspect-[3/4] w-full overflow-hidden bg-[#0B1121]">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={label}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />
        {!isPlaying && (
          <button
            type="button"
            onClick={() => {
              const video = videoRef.current
              if (!video) return
              const playPromise = video.play()
              if (playPromise !== undefined) {
                playPromise.catch(() => undefined)
              }
            }}
            aria-label={`Смотреть видео: ${label}`}
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/50 via-black/10 to-transparent transition-opacity"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/[0.10] text-white shadow-lg shadow-black/30 ring-1 ring-white/[0.20] backdrop-blur-sm">
              <Play className="h-6 w-6 translate-x-[1px]" />
            </span>
          </button>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3">
          <h3 className="text-sm font-semibold text-white md:text-[15px]">{label}</h3>
        </div>
      </div>
    </motion.div>
  )
}

export default Installation
