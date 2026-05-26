import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { motion } from 'framer-motion'

// ─── Types ───────────────────────────────────────────────────────────────────
interface VideoConfig {
  id: number
  file: string
  poster?: string
  title: string
  titleKk?: string
  titleEn?: string
  enabled: boolean
}

// ─── VideoCard ────────────────────────────────────────────────────────────────
type VideoCardProps = {
  src: string
  label: string
  poster: string
  isVisible: boolean
  delay: number
  index: number
}

const VideoCard = ({ src, label, poster, isVisible, delay, index }: VideoCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  // Lazy load + autoplay when in viewport
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25, rootMargin: '100px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (inView) {
      video.play().catch(() => undefined)
    } else {
      video.pause()
    }
  }, [inView])

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay }}
      className="group relative overflow-hidden rounded-2xl bg-slate-100 shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      <div ref={wrapperRef} className="relative aspect-[9/16] w-full overflow-hidden">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={label}
        >
          <source src={src} type="video/mp4" />
        </video>

        {/* Bottom label */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-4 py-4">
          <span className="text-sm font-semibold text-white leading-tight">{label}</span>
        </div>

        {/* Index badge */}
        <div className="absolute top-3 left-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-xs font-bold text-slate-700 shadow-sm">
          {index + 1}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
const Installation = () => {
  const { t, i18n } = useTranslation()
  const { ref, isVisible } = useScrollAnimation()
  const baseUrl = import.meta.env.BASE_URL || '/'
  const [videos, setVideos] = useState<VideoConfig[]>([])

  // Load video config from videos.json, fallback to defaults
  useEffect(() => {
    fetch(`${baseUrl}videos.json`)
      .then((r) => r.json())
      .then((data: VideoConfig[]) => setVideos(data.filter((v) => v.enabled)))
      .catch(() => {
        // Fallback: use hardcoded defaults
        setVideos([
          { id: 1, file: 'video1.mp4', title: t('installation.visit.title'), enabled: true },
          { id: 2, file: 'video2.mp4', title: t('installation.mount.title'), enabled: true },
          { id: 3, file: 'video3.mp4', title: t('installation.setup.title'), enabled: true },
          { id: 4, file: 'video4.mp4', title: t('installation.extra1.title'), enabled: true },
          { id: 5, file: 'video5.mp4', title: t('installation.extra2.title'), enabled: true },
          { id: 6, file: 'video6.mp4', title: t('installation.extra3.title'), enabled: true },
        ])
      })
  }, [baseUrl])

  const getLabel = (v: VideoConfig) => {
    const lang = i18n.language
    if (lang === 'kk' && v.titleKk) return v.titleKk
    if (lang === 'en' && v.titleEn) return v.titleEn
    return v.title
  }

  return (
    <section id="installation" ref={ref} className="bg-[var(--surface-2)] py-10 md:py-14 lg:py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-6 text-center md:mb-8"
        >
          <h2 className="mb-2 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl md:text-5xl">
            {t('installation.title')}
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-[var(--muted)] md:text-base">
            {t('installation.subtitle')}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
          {videos.map((video, index) => (
            <VideoCard
              key={video.id}
              src={`${baseUrl}${video.file}`}
              label={getLabel(video)}
              poster={video.poster ? `${baseUrl}${video.poster}` : `${baseUrl}bg-poster-960.jpg`}
              isVisible={isVisible}
              delay={index * 0.1}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Installation
