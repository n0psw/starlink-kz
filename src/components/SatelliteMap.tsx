import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

const SATELLITE_MAP_URL = 'https://satellitemap.space/s/v3K_XsNY'

interface Sat {
  angle: number
  speed: number
  orbitA: number
  orbitB: number
  tilt: number
  trail: { x: number; y: number }[]
}

const GlobeCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const satsRef = useRef<Sat[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    satsRef.current = Array.from({ length: 22 }, (_, i) => ({
      angle: (i / 22) * Math.PI * 2,
      speed: 0.004 + Math.random() * 0.005,
      orbitA: 100 + Math.random() * 70,
      orbitB: 35 + Math.random() * 45,
      tilt: Math.random() * Math.PI,
      trail: [],
    }))

    const SAT_COLOR = '#38bdf8'

    let isIntersecting = false

    const draw = () => {
      if (!isIntersecting) return
      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      if (W === 0 || H === 0) {
        animRef.current = requestAnimationFrame(draw)
        return
      }
      const cx = W / 2
      const cy = H / 2

      ctx.clearRect(0, 0, W, H)

      // Earth glow
      const grd = ctx.createRadialGradient(cx, cy, 10, cx, cy, 85)
      grd.addColorStop(0, 'rgba(14,165,233,0.10)')
      grd.addColorStop(1, 'transparent')
      ctx.fillStyle = grd
      ctx.beginPath()
      ctx.arc(cx, cy, 85, 0, Math.PI * 2)
      ctx.fill()

      // Earth
      const earth = ctx.createRadialGradient(cx - 16, cy - 16, 4, cx, cy, 62)
      earth.addColorStop(0, '#1e3a8a')
      earth.addColorStop(1, '#0c1a3a')
      ctx.fillStyle = earth
      ctx.beginPath()
      ctx.arc(cx, cy, 62, 0, Math.PI * 2)
      ctx.fill()

      // Earth border
      ctx.strokeStyle = 'rgba(56,189,248,0.25)'
      ctx.lineWidth = 1
      ctx.stroke()

      // Grid
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, 62, 0, Math.PI * 2)
      ctx.clip()
      ctx.beginPath()
      for (let lat = -60; lat <= 60; lat += 30) {
        const r = 62 * Math.cos((lat * Math.PI) / 180)
        const y = cy + 62 * Math.sin((lat * Math.PI) / 180)
        ctx.arc(cx, y, r, 0, Math.PI * 2)
      }
      for (let lng = 0; lng < 180; lng += 30) {
        const rad = (lng * Math.PI) / 180
        ctx.arc(cx, cy, 62, rad, rad + Math.PI)
      }
      ctx.strokeStyle = 'rgba(56,189,248,0.08)'
      ctx.lineWidth = 0.5
      ctx.stroke()
      ctx.restore()

      // Satellites
      satsRef.current.forEach((sat) => {
        sat.angle += sat.speed
        const cosT = Math.cos(sat.tilt)
        const sinT = Math.sin(sat.tilt)
        const rx = Math.cos(sat.angle) * sat.orbitA
        const ry = Math.sin(sat.angle) * sat.orbitB
        const x = cx + rx * cosT - ry * sinT
        const y = cy + rx * sinT + ry * cosT

        sat.trail.push({ x, y })
        if (sat.trail.length > 14) sat.trail.shift()

        // Orbit ring
        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(sat.tilt)
        ctx.beginPath()
        ctx.ellipse(0, 0, sat.orbitA, sat.orbitB, 0, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(56,189,248,0.06)'
        ctx.lineWidth = 0.5
        ctx.stroke()
        ctx.restore()

        // Trail
        if (sat.trail.length > 2) {
          ctx.beginPath()
          ctx.moveTo(sat.trail[0].x, sat.trail[0].y)
          sat.trail.forEach((p, i) => { if (i > 0) ctx.lineTo(p.x, p.y) })
          const tg = ctx.createLinearGradient(
            sat.trail[0].x, sat.trail[0].y,
            sat.trail[sat.trail.length - 1].x, sat.trail[sat.trail.length - 1].y
          )
          tg.addColorStop(0, 'transparent')
          tg.addColorStop(1, SAT_COLOR + '55')
          ctx.strokeStyle = tg
          ctx.lineWidth = 0.7
          ctx.stroke()
        }

        // Dot
        ctx.fillStyle = SAT_COLOR
        ctx.beginPath()
        ctx.arc(x, y, 1.5, 0, Math.PI * 2)
        ctx.fill()
      })

      animRef.current = requestAnimationFrame(draw)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting
        if (isIntersecting) {
          if (!animRef.current) {
            animRef.current = requestAnimationFrame(draw)
          }
        } else {
          if (animRef.current) {
            cancelAnimationFrame(animRef.current)
            animRef.current = 0
          }
        }
      },
      { threshold: 0.05 }
    )
    observer.observe(canvas)

    return () => {
      observer.disconnect()
      if (animRef.current) cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" style={{ display: 'block' }} />
}

const SatelliteMap = () => {
  const { t } = useTranslation()
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section
      id="satellite-map"
      ref={ref}
      className="py-16 md:py-24 relative overflow-hidden"
      style={{ background: '#080d1a' }}
    >
      {/* Divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)',
        }}
      />

      {/* Ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 60% at 20% 50%, rgba(14,165,233,0.04) 0%, transparent 60%)',
        }}
      />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 max-w-4xl mx-auto"
        >
          {/* Globe */}
          <div className="flex-shrink-0" style={{ width: 260, height: 260 }}>
            <GlobeCanvas />
          </div>

          {/* Text + CTA */}
          <div className="flex-1 text-center lg:text-left">
            <h2
              className="text-2xl sm:text-3xl font-bold mb-3"
              style={{ color: '#f1f5f9', letterSpacing: '-0.03em' }}
            >
              {t('satelliteMap.title')}
            </h2>
            <p className="text-sm mb-8 leading-relaxed" style={{ color: '#64748b' }}>
              {t('satelliteMap.subtitle')}
            </p>

            <a
              href={SATELLITE_MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all duration-200"
              style={{ background: '#0ea5e9' }}
              onMouseEnter={e => {
                e.currentTarget.style.opacity = '0.85'
                e.currentTarget.style.boxShadow = '0 8px 24px -6px rgba(14,165,233,0.5)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.opacity = '1'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {t('satelliteMap.cta')}
              <ExternalLink className="w-4 h-4 opacity-70" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SatelliteMap
