import { useState, useCallback, useRef, useEffect } from 'react'

// Real Kazakhstan outline from GeoJSON data (112 points)
const KZ_PATH = 'M 535.2,385.3 L 523.1,390.5 L 495.4,409.9 L 486.2,429.8 L 478.3,430 L 472.6,416.8 L 445.8,415.9 L 441.5,393.1 L 431.3,392.9 L 432.9,365 L 407.7,344.6 L 371.6,346.8 L 347,350.9 L 326.9,325.8 L 309.7,315.2 L 277.1,295.3 L 273.1,292.9 L 219,309.3 L 219.8,412 L 209,413.4 L 194.3,391.5 L 180.1,383.7 L 156.2,389.5 L 146.9,398.8 L 145.8,392 L 150.9,380.4 L 146.9,370.7 L 122.5,361.2 L 113.1,336.2 L 101.4,329.1 L 100.7,320.1 L 121.2,322.7 L 122,302.4 L 139.9,297.8 L 158.3,302 L 162,274.8 L 158.3,257.6 L 137.3,259 L 119.4,252.2 L 95,264.4 L 75.4,270.2 L 64.7,265.7 L 66.9,251.4 L 53.5,232.8 L 37.9,233.6 L 20,214.7 L 32.1,193.6 L 26,187.9 L 42.8,157.3 L 64.4,173.5 L 67,153.1 L 110.4,122.8 L 143.3,122.1 L 189.6,141.4 L 214.5,152.7 L 236.9,140.9 L 270.2,140.3 L 297.1,154.8 L 303.2,146.5 L 332.7,147.7 L 338,134.5 L 303.9,115.4 L 324.1,101.8 L 320.2,94.2 L 340.4,87 L 325.2,67.9 L 334.8,58.4 L 413.5,48.7 L 423.8,41.8 L 476.4,31.6 L 495.3,20 L 533.1,26 L 539.7,54.9 L 561.7,48.1 L 588.7,57.6 L 587,72.8 L 607.1,71.2 L 659.8,44.9 L 652.1,53.6 L 679,75.2 L 726,145.9 L 737.2,131.3 L 766.1,147.3 L 796.4,140.2 L 808,145.2 L 818.1,161.3 L 832.8,166.7 L 841.8,178.5 L 868.8,174.8 L 880,191.8 L 864,210.4 L 846.5,213 L 845.5,240.9 L 833.8,253.5 L 792.1,244.3 L 776.9,294.2 L 766.2,300.4 L 724.5,311.5 L 743.4,359.9 L 729,367.1 L 730.7,383 L 717.7,378.9 L 707.2,368.9 L 676,366 L 641.1,365.2 L 633.5,368.3 L 603.5,356.6 L 591.6,362.4 L 588.3,378.8 L 553.7,369.2 L 539.9,373.1 L 535.2,385.3 Z'

interface City {
  id: string
  nameRu: string
  nameKk: string
  x: number
  y: number
  isWarehouse: boolean
}

// Real geographic positions projected to SVG viewBox 900x450
const CITIES: City[] = [
  { id: 'almaty', nameRu: 'Алматы', nameKk: 'Алматы', x: 660.6, y: 358.3, isWarehouse: true },
  { id: 'astana', nameRu: 'Астана', nameKk: 'Астана', x: 545.4, y: 137.4, isWarehouse: true },
  { id: 'oskemen', nameRu: 'Оскемен', nameKk: 'Өскемен', x: 780.2, y: 171.4, isWarehouse: true },
  { id: 'shymkent', nameRu: 'Шымкент', nameKk: 'Шымкент', x: 506.4, y: 383.9, isWarehouse: false },
  { id: 'karaganda', nameRu: 'Караганда', nameKk: 'Қарағанды', x: 579.8, y: 175.4, isWarehouse: false },
  { id: 'aktau', nameRu: 'Актау', nameKk: 'Ақтау', x: 118.4, y: 346.7, isWarehouse: false },
  { id: 'atyrau', nameRu: 'Атырау', nameKk: 'Атырау', x: 133.8, y: 250.3, isWarehouse: false },
  { id: 'kostanay', nameRu: 'Костанай', nameKk: 'Қостанай', x: 380.9, y: 80.5, isWarehouse: false },
  { id: 'aktobe', nameRu: 'Актобе', nameKk: 'Ақтөбе', x: 245.9, y: 162.1, isWarehouse: false },
  { id: 'pavlodar', nameRu: 'Павлодар', nameKk: 'Павлодар', x: 661, y: 106.3, isWarehouse: false },
  { id: 'semey', nameRu: 'Семей', nameKk: 'Семей', x: 730, y: 158.5, isWarehouse: false },
  { id: 'taraz', nameRu: 'Тараз', nameKk: 'Тараз', x: 543.7, y: 367.7, isWarehouse: false },
]

// Connection lines between warehouse cities
const CONNECTIONS = [
  { from: 'astana', to: 'almaty' },
  { from: 'astana', to: 'oskemen' },
  { from: 'astana', to: 'karaganda' },
  { from: 'astana', to: 'kostanay' },
  { from: 'astana', to: 'aktobe' },
  { from: 'astana', to: 'pavlodar' },
  { from: 'oskemen', to: 'semey' },
  { from: 'almaty', to: 'shymkent' },
  { from: 'almaty', to: 'taraz' },
  { from: 'aktobe', to: 'atyrau' },
  { from: 'atyrau', to: 'aktau' },
]

interface KazakhstanMapProps {
  language: string
  isMobile: boolean
}

const KazakhstanMap = ({ language, isMobile }: KazakhstanMapProps) => {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Animate in on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isMobile) return
      const rect = e.currentTarget.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      setTilt({ x: y * -8, y: x * 12 })
    },
    [isMobile]
  )

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 })
    setHoveredCity(null)
  }, [])

  const getCity = (id: string) => CITIES.find(c => c.id === id)

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1200px' }}
    >
      <div
        className="relative w-full transition-all duration-700 ease-out"
        style={{
          transform: isMobile
            ? undefined
            : `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d',
          opacity: isVisible ? 1 : 0,
          filter: isVisible ? 'none' : 'blur(8px)',
        }}
      >
        <svg
          viewBox="0 0 900 450"
          className="w-full h-auto"
          style={{ filter: 'drop-shadow(0 4px 20px rgba(14,165,233,0.12))' }}
        >
          <defs>
            {/* Gradient for country fill */}
            <linearGradient id="kz-fill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(14,165,233,0.08)" />
              <stop offset="50%" stopColor="rgba(56,189,248,0.05)" />
              <stop offset="100%" stopColor="rgba(14,165,233,0.1)" />
            </linearGradient>

            {/* Animated gradient for border */}
            <linearGradient id="kz-border" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(14,165,233,0.7)" />
              <stop offset="50%" stopColor="rgba(56,189,248,0.5)" />
              <stop offset="100%" stopColor="rgba(2,132,199,0.7)" />
            </linearGradient>

            {/* Glow filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* City glow */}
            <filter id="city-glow" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Inner shadow for depth */}
            <filter id="inner-shadow">
              <feGaussianBlur in="SourceAlpha" stdDeviation="8" result="blur" />
              <feOffset dx="0" dy="4" result="offset" />
              <feComposite in="SourceGraphic" in2="offset" operator="over" />
            </filter>

            {/* Clip for grid */}
            <clipPath id="kz-clip">
              <path d={KZ_PATH} />
            </clipPath>

            {/* Scan beam gradient */}
            <linearGradient id="scan-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(56,189,248,0)" />
              <stop offset="45%" stopColor="rgba(56,189,248,0.08)" />
              <stop offset="50%" stopColor="rgba(56,189,248,0.15)" />
              <stop offset="55%" stopColor="rgba(56,189,248,0.08)" />
              <stop offset="100%" stopColor="rgba(56,189,248,0)" />
            </linearGradient>
          </defs>

          {/* Background dots grid inside Kazakhstan */}
          <g clipPath="url(#kz-clip)" opacity="0.5">
            {Array.from({ length: 35 }, (_, row) =>
              Array.from({ length: 70 }, (_, col) => {
                const cx = 20 + col * 12.5
                const cy = 20 + row * 12.5
                return (
                  <circle
                    key={`${row}-${col}`}
                    cx={cx}
                    cy={cy}
                    r="0.8"
                    fill="rgba(14,165,233,0.25)"
                  />
                )
              })
            )}
          </g>

          {/* Country fill */}
          <path
            d={KZ_PATH}
            fill="url(#kz-fill)"
            stroke="none"
          />

          {/* Scan beam */}
          <g clipPath="url(#kz-clip)">
            <rect
              x="0"
              y="0"
              width="180"
              height="450"
              fill="url(#scan-grad)"
              style={{ animation: 'scan-beam 8s linear infinite' }}
            />
          </g>

          {/* Country border with glow */}
          <path
            d={KZ_PATH}
            fill="none"
            stroke="url(#kz-border)"
            strokeWidth="1.8"
            strokeLinejoin="round"
            filter="url(#glow)"
          />

          {/* Connection lines */}
          {CONNECTIONS.map((conn) => {
            const from = getCity(conn.from)
            const to = getCity(conn.to)
            if (!from || !to) return null

            const isActive = hoveredCity === conn.from || hoveredCity === conn.to

            return (
              <line
                key={`${conn.from}-${conn.to}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={isActive ? 'rgba(56,189,248,0.35)' : 'rgba(14,165,233,0.1)'}
                strokeWidth={isActive ? '1.2' : '0.6'}
                strokeDasharray="6 4"
                style={{
                  transition: 'all 0.3s ease',
                  animation: 'data-flow 2s linear infinite',
                }}
              />
            )
          })}

          {/* City dots */}
          {CITIES.map((city) => {
            const isHovered = hoveredCity === city.id
            const isConnected = hoveredCity && CONNECTIONS.some(
              c => (c.from === hoveredCity && c.to === city.id) || (c.to === hoveredCity && c.from === city.id)
            )

            return (
              <g key={city.id}>
                {/* Pulse ring for warehouses */}
                {city.isWarehouse && (
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r="8"
                    fill="none"
                    stroke="rgba(56,189,248,0.3)"
                    strokeWidth="1"
                    style={{ animation: 'pulse-ring 3s ease-out infinite' }}
                  />
                )}

                {/* Outer glow */}
                <circle
                  cx={city.x}
                  cy={city.y}
                  r={city.isWarehouse ? 6 : 3.5}
                  fill={city.isWarehouse ? 'rgba(56,189,248,0.15)' : 'rgba(56,189,248,0.08)'}
                  filter={city.isWarehouse ? 'url(#city-glow)' : undefined}
                />

                {/* Core dot */}
                <circle
                  cx={city.x}
                  cy={city.y}
                  r={isHovered ? (city.isWarehouse ? 5 : 4) : (city.isWarehouse ? 4 : 2.5)}
                  fill={
                    isHovered || isConnected
                      ? '#38bdf8'
                      : city.isWarehouse
                        ? '#0ea5e9'
                        : 'rgba(14,165,233,0.5)'
                  }
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    filter: isHovered ? 'drop-shadow(0 0 8px rgba(56,189,248,0.6))' : 'none',
                  }}
                  onMouseEnter={() => setHoveredCity(city.id)}
                  onMouseLeave={() => setHoveredCity(null)}
                />

                {/* City label */}
                {(isHovered || city.isWarehouse) && (
                  <text
                    x={city.x}
                    y={city.y - (city.isWarehouse ? 14 : 10)}
                    textAnchor="middle"
                    fill={isHovered ? '#0ea5e9' : 'rgba(14,165,233,0.7)'}
                    fontSize={isHovered ? '12' : '10'}
                    fontWeight="600"
                    fontFamily="'Golos Text', sans-serif"
                    style={{
                      pointerEvents: 'none',
                      transition: 'all 0.2s ease',
                      textShadow: '0 1px 3px rgba(255,255,255,0.9)',
                    }}
                  >
                    {language === 'kk' ? city.nameKk : city.nameRu}
                  </text>
                )}
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}

export default KazakhstanMap
