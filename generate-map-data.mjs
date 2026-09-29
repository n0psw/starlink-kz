import fs from 'fs'

const MAP_BOUNDS = { minLat: -12, maxLat: 72, minLng: 25, maxLng: 150 }
const SVG_W = 1000
const SVG_H = 600

const ASIA_CODES = new Set([
  'KZ','KG','TJ','UZ','TM','AF','CN','MN','RU','JP','KR','KP','TW','IN','PK',
  'BD','NP','BT','LK','MV','MM','TH','VN','KH','LA','MY','SG','ID','PH','BN',
  'TL','TR','SA','IR','IQ','SY','JO','IL','LB','KW','AE','QA','BH','OM','YE',
  'GE','AM','AZ','CY'
])

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

console.log('Parsing GeoJSON...')
const data = fs.readFileSync('countries.geojson', 'utf8')
const geojson = JSON.parse(data)
const paths = []

    for (const feature of geojson.features) {
      const iso = feature.properties['ISO3166-1-Alpha-2']
      if (!iso || !ASIA_CODES.has(iso)) continue

  const geom = feature.geometry
  const coordsList = geom.type === 'Polygon' ? [geom.coordinates] : geom.coordinates

  let d = ''
  for (const polygon of coordsList) {
    for (const ring of polygon) {
      const step = ring.length > 500 ? 5 : ring.length > 100 ? 2 : 1
      for (let i = 0; i < ring.length; i += step) {
        const [lng, lat] = ring[i]
        if (lng < MAP_BOUNDS.minLng - 15 || lng > MAP_BOUNDS.maxLng + 15) continue
        if (lat < MAP_BOUNDS.minLat - 15 || lat > MAP_BOUNDS.maxLat + 15) continue
        
        const [px, py] = project(lat, lng)
        d += (i === 0 || d.endsWith('Z') ? 'M' : 'L') + px.toFixed(1) + ',' + py.toFixed(1) + ' '
      }
      if (!d.endsWith('Z')) d += 'Z'
    }
  }
  
  if (d.length > 5) {
    paths.push({ code: iso, d })
  }
}

console.log(`Generated paths for ${paths.length} countries.`)
const tsContent = `// Auto-generated SVG paths for Asia map
export const asiaPaths = ${JSON.stringify(paths, null, 2)};
`
fs.writeFileSync('../starlink-asia/src/components/asiaPaths.ts', tsContent)
console.log('Saved to ../starlink-asia/src/components/asiaPaths.ts')
