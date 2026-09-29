import { useState, useCallback, useRef, useEffect } from 'react'

const KG_PATH = 'M124.842,119.18L143.515,69.646L198.403,53.62L335.558,92.684L348.526,25.605L395.844,1.925L514.573,49.923L544.869,37.383L683.102,40.498L806.807,52.403L848.615,93.161L900,109.727L888.281,135.183L756.908,195.815L727.189,239.921L620.248,253.073L588.724,323.343L500.472,308.639L442.865,330.078L363.278,381.595L374.764,406.976L351.034,431.71L193.405,448.075L90.397,413.018L0,421.401L7.897,358.824L98.639,377.054L129.168,343.422L192.586,354.175L299.347,275.205L200.527,216.888L141.145,244.542L79.631,202.75L149.598,130.261Z'

interface City {
  id: string
  nameRu: string
  nameLocal: string
  x: number
  y: number
  isWarehouse: boolean
}

const CITIES: City[] = [
  { id: 'bishkek', nameRu: 'Бишкек', nameLocal: 'Бишкек', x: 427.3, y: 50.8, isWarehouse: true },
  { id: 'osh', nameRu: 'Ош', nameLocal: 'Ош', x: 278.1, y: 314.4, isWarehouse: true },
  { id: 'jalal-abad', nameRu: 'Жалал-Абад', nameLocal: 'Жалал-Абад', x: 294.7, y: 268.2, isWarehouse: true }
]

const CONNECTIONS = [
  { from: 'bishkek', to: 'osh' },
  { from: 'bishkek', to: 'jalal-abad' },
  { from: 'osh', to: 'jalal-abad' }
]

interface KyrgyzstanMapProps {
  language: string
  isMobile: boolean
  onCityHover?: (city: { id: string; nameRu: string; nameLocal: string; isWarehouse: boolean } | null) => void
}

const KyrgyzstanMap = ({ language, isMobile, onCityHover }: KyrgyzstanMapProps) => {
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
    if (onCityHover) onCityHover(null)
  }, [onCityHover])

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
        className="relative w-full transition-all duration-1000 ease-out"
        style={{
          opacity: isVisible ? 1 : 0,
          filter: isVisible ? 'none' : 'blur(8px)',
        }}
      >
        <div
          className="relative w-full transition-transform duration-200 ease-out"
          style={{
            transform: isMobile
              ? undefined
              : `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          <svg
            viewBox="0 0 900 450"
            className="w-full h-auto"
            style={{ filter: 'drop-shadow(0 4px 20px rgba(14,165,233,0.12))' }}
          >
            <defs>
              <linearGradient id="kg-fill" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(14,165,233,0.08)" />
                <stop offset="50%" stopColor="rgba(56,189,248,0.05)" />
                <stop offset="100%" stopColor="rgba(14,165,233,0.1)" />
              </linearGradient>

              <linearGradient id="kg-border" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(14,165,233,0.7)" />
                <stop offset="50%" stopColor="rgba(56,189,248,0.5)" />
                <stop offset="100%" stopColor="rgba(2,132,199,0.7)" />
              </linearGradient>

              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="city-glow" x="-200%" y="-200%" width="500%" height="500%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <clipPath id="kg-clip">
                <path d={KG_PATH} />
              </clipPath>

              <linearGradient id="scan-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(56,189,248,0)" />
                <stop offset="45%" stopColor="rgba(56,189,248,0.08)" />
                <stop offset="50%" stopColor="rgba(56,189,248,0.15)" />
                <stop offset="55%" stopColor="rgba(56,189,248,0.08)" />
                <stop offset="100%" stopColor="rgba(56,189,248,0)" />
              </linearGradient>
            </defs>

            <g clipPath="url(#kg-clip)" opacity="0.5">
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

            <path
              d={KG_PATH}
              fill="url(#kg-fill)"
              stroke="none"
            />

            <g clipPath="url(#kg-clip)">
              <rect
                x="0"
                y="0"
                width="900"
                height="450"
                fill="url(#scan-grad)"
                style={{ animation: 'scan-beam 8s linear infinite' }}
              />
            </g>

            <path
              d={KG_PATH}
              fill="none"
              stroke="url(#kg-border)"
              strokeWidth="1.8"
              strokeLinejoin="round"
              filter="url(#glow)"
            />

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

            {CITIES.map((city) => {
              const isHovered = hoveredCity === city.id
              const isConnected = hoveredCity && CONNECTIONS.some(
                c => (c.from === hoveredCity && c.to === city.id) || (c.to === hoveredCity && c.from === city.id)
              )

              return (
                <g key={city.id}>
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

                  <circle
                    cx={city.x}
                    cy={city.y}
                    r={city.isWarehouse ? 6 : 3.5}
                    fill={city.isWarehouse ? 'rgba(56,189,248,0.15)' : 'rgba(56,189,248,0.08)'}
                    filter={city.isWarehouse ? 'url(#city-glow)' : undefined}
                  />

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
                    onMouseEnter={() => {
                      setHoveredCity(city.id)
                      if (onCityHover) onCityHover({ id: city.id, nameRu: city.nameRu, nameLocal: city.nameLocal, isWarehouse: city.isWarehouse })
                    }}
                    onMouseLeave={() => {
                      setHoveredCity(null)
                      if (onCityHover) onCityHover(null)
                    }}
                  />
                  <text
                    x={city.x}
                    y={city.y - (city.isWarehouse ? 14 : 10)}
                    textAnchor="middle"
                    fill={isHovered || city.isWarehouse ? '#38bdf8' : 'rgba(226,232,240,0.85)'}
                    fontSize={isHovered ? '12' : city.isWarehouse ? '10' : '8.5'}
                    fontWeight="600"
                    fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', sans-serif"
                    style={{
                      pointerEvents: 'none',
                      transition: 'all 0.2s ease',
                      textShadow: '0 2px 5px rgba(5,8,16,0.95), 0 0 10px rgba(56,189,248,0.3)',
                      opacity: isHovered ? 1 : city.isWarehouse ? 0.95 : 0.55,
                    }}
                  >
                    {language === 'ru' ? city.nameRu : city.nameLocal}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>
      </div>
    </div>
  )
}

export default KyrgyzstanMap
