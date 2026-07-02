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
      className="group relative overflow-hidden rounded-2xl transition-all duration-300"
      style={{
        border: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(255,255,255,0.02)',
      }}
    >
      <div ref={wrapperRef} className="relative aspect-[9/16] w-full overflow-hidden">
        <video
          ref={videoRef}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={label}
        >
          <source src={src} type="video/mp4" />
        </video>

        {/* Bottom label gradient */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 px-4 py-4"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)' }}
        >
          <span className="text-sm font-medium text-white/90 leading-tight">{label}</span>
        </div>

        {/* Index badge */}
        <div
          className="absolute top-3 left-3 flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold"
          style={{
            background: 'rgba(14,165,233,0.15)',
            border: '1px solid rgba(14,165,233,0.3)',
            color: '#38bdf8',
          }}
        >
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
    <section
      id="installation"
      ref={ref}
      className="py-24 md:py-36 relative overflow-hidden"
      style={{ background: '#060b14' }}
    >
      {/* Divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)' }}
      />

      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 md:mb-20 max-w-5xl mx-auto"
        >
          <span
            className="text-[10px] font-bold uppercase tracking-[0.2em] mb-5 block"
            style={{ color: '#38bdf8' }}
          >
            {t('installationLabel')}
          </span>
          <h2
            className="font-bold leading-[1.0] tracking-[-0.04em] text-white mb-4"
            style={{ fontSize: 'clamp(38px, 5.5vw, 72px)' }}
          >
            {t('installation.title')}
          </h2>
          <p className="text-[15px] leading-[1.75]" style={{ color: '#475569' }}>
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
