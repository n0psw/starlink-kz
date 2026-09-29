import fs from 'fs'

const MAP_BOUNDS = { minLat: -12, maxLat: 72, minLng: 25, maxLng: 150 }
const SVG_W = 1000
const SVG_H = 600

function project(lat, lng) {
  const x = ((lng - MAP_BOUNDS.minLng) / (MAP_BOUNDS.maxLng - MAP_BOUNDS.minLng)) * SVG_W
  const latRad = (lat * Math.PI) / 180
  const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2))
  const minLatRad = (MAP_BOUNDS.minLat * Math.PI) / 180
  const maxLatRad = (MAP_BOUNDS.maxLat * Math.PI) / 180
  const minMerc = Math.log(Math.tan(Math.PI / 4 + minLatRad / 2))
  const maxMerc = Math.log(Math.tan(Math.PI / 4 + maxLatRad / 2))
  const y = SVG_H - ((mercN - minMerc) / (maxMerc - minMerc)) * SVG_H
  return [x, y]
}

const COUNTRIES_DATA = [
  // Tweak lat/lng slightly to spread out the markers, and use dx/dy for labels
  { code:'KZ', name:'Казахстан',   flag:'🇰🇿', lat:48.5, lng:67.5, active:true, url:'https://starlink.com.kz', dx:0, dy:-30 },
  { code:'KG', name:'Кыргызстан',  flag:'🇰🇬', lat:41.5, lng:75.5, active:true, url:'https://kg.starlink.com.kz', dx:20, dy:20 },
  { code:'TJ', name:'Таджикистан', flag:'🇹🇯', lat:38.5, lng:71.0, active:true, url:'https://tj.starlink.com.kz', dx:0, dy:26 },
  { code:'UZ', name:'Узбекистан',  flag:'🇺🇿', lat:41.8, lng:63.5, active:true, url:'https://uz.starlink.com.kz', dx:-25, dy:20 },
  
  { code:'TM', name:'Туркменистан', flag:'🇹🇲', lat:39.5, lng:59.5 },
  { code:'AF', name:'Афганистан',   flag:'🇦🇫', lat:34.0, lng:66.0 },
  { code:'PK', name:'Пакистан',     flag:'🇵🇰', lat:30.0, lng:69.0 },
  { code:'IN', name:'Индия',        flag:'🇮🇳', lat:22.0, lng:79.0 },
  { code:'NP', name:'Непал',        flag:'🇳🇵', lat:28.4, lng:84.1 },
  { code:'BD', name:'Бангладеш',    flag:'🇧🇩', lat:23.7, lng:90.3 },
  { code:'LK', name:'Шри-Ланка',    flag:'🇱🇰', lat:7.8,  lng:80.7 },
  { code:'CN', name:'Китай',        flag:'🇨🇳', lat:36.0, lng:104.0 },
  { code:'MN', name:'Монголия',     flag:'🇲🇳', lat:46.8, lng:103.8 },
  { code:'RU', name:'Россия',       flag:'🇷🇺', lat:61.5, lng:95.3 },
  { code:'JP', name:'Япония',       flag:'🇯🇵', lat:36.2, lng:138.2 },
  { code:'KR', name:'Южная Корея',  flag:'🇰🇷', lat:35.9, lng:127.7 },
  { code:'TW', name:'Тайвань',      flag:'🇹🇼', lat:23.7, lng:120.9 },
  { code:'MM', name:'Мьянма',       flag:'🇲🇲', lat:21.9, lng:95.9 },
  { code:'TH', name:'Таиланд',      flag:'🇹🇭', lat:15.8, lng:100.9 },
  { code:'VN', name:'Вьетнам',      flag:'🇻🇳', lat:14.0, lng:108.2 },
  { code:'ID', name:'Индонезия',    flag:'🇮🇩', lat:-0.8, lng:113.9 },
  { code:'PH', name:'Филиппины',    flag:'🇵🇭', lat:12.8, lng:121.7 },
  { code:'MY', name:'Малайзия',     flag:'🇲🇾', lat:4.2,  lng:101.9 },
  { code:'TR', name:'Турция',       flag:'🇹🇷', lat:38.9, lng:35.2 },
  { code:'IR', name:'Иран',         flag:'🇮🇷', lat:32.4, lng:54.0 },
  { code:'SA', name:'Сауд. Аравия', flag:'🇸🇦', lat:23.8, lng:45.0 },
  { code:'AE', name:'ОАЭ',          flag:'🇦🇪', lat:23.4, lng:53.8 },
].map(c => {
  const [cx, cy] = project(c.lat, c.lng)
  return { ...c, cx, cy }
})

const code = `import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { asiaPaths } from './asiaPaths'

interface Country {
  code: string; name: string; flag: string
  cx: number; cy: number
  lat?: number; lng?: number
  active?: boolean; url?: string
  dx?: number; dy?: number
}

const COUNTRIES: Country[] = ${JSON.stringify(COUNTRIES_DATA, null, 2)}

type TooltipState = { visible: boolean; x: number; y: number; country: Country | null }

const AsiaMap = () => {
  const [tooltip, setTooltip] = useState<TooltipState>({ visible: false, x: 0, y: 0, country: null })
  const [hovered, setHovered] = useState<string | null>(null)

  const handleMove = useCallback((e: React.MouseEvent, c: Country) => {
    setTooltip({ visible: true, x: e.clientX, y: e.clientY, country: c })
    setHovered(c.code)
  }, [])
  const handleLeave = useCallback(() => {
    setTooltip(t => ({ ...t, visible: false }))
    setHovered(null)
  }, [])
  const handleClick = useCallback((c: Country) => {
    if (c.active && c.url) window.open(c.url, '_blank', 'noopener,noreferrer')
  }, [])

  return (
    <div className="relative w-full select-none overflow-hidden rounded-[16px]" onMouseLeave={handleLeave}>
      <svg viewBox="0 0 1000 600" className="w-full h-full" style={{ overflow: 'hidden' }}>
        <defs>
          <radialGradient id="bgGrad" cx="45%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#0a0d12"/>
            <stop offset="100%" stopColor="#000000"/>
          </radialGradient>
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        <rect width="1000" height="600" fill="url(#bgGrad)"/>

        {/* GeoJSON Map Paths */}
        {asiaPaths.map((p) => {
          const isActive = ['KZ','KG','TJ','UZ'].includes(p.code)
          const isHovered = hovered === p.code
          return (
            <path key={p.code} d={p.d}
              fill={isActive
                ? isHovered ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)'
                : isHovered ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)'}
              stroke={isActive ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)'}
              strokeWidth={isActive ? 1 : 0.6}
              style={{ transition: 'fill 0.2s' }}
            />
          )
        })}

        {/* Connections */}
        {[['KZ','KG'],['KZ','UZ'],['KG','TJ'],['UZ','TJ']].map(([a,b]) => {
          const ca = COUNTRIES.find(c=>c.code===a)
          const cb = COUNTRIES.find(c=>c.code===b)
          if (!ca || !cb) return null
          return <line key={a+b} x1={ca.cx} y1={ca.cy} x2={cb.cx} y2={cb.cy}
            stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3 5"/>
        })}

        {/* Country Markers */}
        {COUNTRIES.map(c => (
          <g key={c.code}
            onMouseMove={e => handleMove(e, c)}
            onMouseLeave={handleLeave}
            onClick={() => handleClick(c)}
            style={{ cursor: c.active ? 'pointer' : 'default' }}>

            {c.active ? (
              <>
                <circle cx={c.cx} cy={c.cy} r="14" fill="rgba(255,255,255,0.06)">
                  <animate attributeName="r" values="8;18;8" dur="3s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.3;0.05;0.3" dur="3s" repeatCount="indefinite"/>
                </circle>
                <circle cx={c.cx} cy={c.cy} r={hovered===c.code ? 5 : 3.5}
                  fill="#fff" filter="url(#softGlow)"
                  style={{ transition: 'r 0.2s' }}>
                  <animate attributeName="r" values="3.5;4.5;3.5" dur="2.5s" repeatCount="indefinite"/>
                </circle>
                <text x={c.cx + (c.dx || 0)} y={c.cy - 12 + (c.dy || 0)} textAnchor="middle" fontSize="14" style={{ userSelect:'none' }}>
                  {c.flag}
                </text>
                <text x={c.cx + (c.dx || 0)} y={c.cy + 4 + (c.dy || 0)} textAnchor="middle" fontSize="9"
                  fill="rgba(255,255,255,0.9)" fontWeight="600" letterSpacing="0.5"
                  style={{ userSelect:'none', textTransform:'uppercase', fontFamily:'-apple-system,sans-serif', filter:'drop-shadow(0 2px 4px rgba(0,0,0,0.8))' }}>
                  {c.name}
                </text>
              </>
            ) : (
              <>
                <text x={c.cx} y={c.cy+4} textAnchor="middle" fontSize="11"
                  style={{ userSelect:'none', opacity: hovered===c.code ? 1 : 0.35,
                    transition:'opacity 0.15s', filter:'drop-shadow(0 1px 3px rgba(0,0,0,0.8))' }}>
                  {c.flag}
                </text>
              </>
            )}
          </g>
        ))}
      </svg>

      <AnimatePresence>
        {tooltip.visible && tooltip.country && (
          <motion.div className="fixed z-[200] pointer-events-none"
            style={{ left: tooltip.x + 16, top: tooltip.y - 60 }}
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }} transition={{ duration: 0.1 }}>
            <div className="px-4 py-2.5 rounded-xl flex items-center gap-3"
              style={{ background: '#16191d', border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 16px 48px rgba(0,0,0,0.6)' }}>
              <span className="text-2xl leading-none">{tooltip.country.flag}</span>
              <div>
                <div className="text-white font-semibold text-sm">{tooltip.country.name}</div>
                <div className="text-[11px] mt-0.5" style={{ color: tooltip.country.active ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.25)' }}>
                  {tooltip.country.active ? 'Нажмите для перехода →' : 'Coming soon'}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AsiaMap
`

fs.writeFileSync('../starlink-asia/src/components/AsiaMap.tsx', code)
console.log('AsiaMap.tsx updated to fix overlapping markers.')
