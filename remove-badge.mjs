import fs from 'fs'
import path from 'path'

const heroPath = path.join('../starlink-asia/src/components/Hero.tsx')
let content = fs.readFileSync(heroPath, 'utf8')

// Remove the badge div
content = content.replace(/<div className="inline-flex items-center gap-2 px-3 py-1\.5 rounded-full bg-white\/5 border border-white\/10 mb-8">[\s\S]*?<\/div>/, '')

fs.writeFileSync(heroPath, content, 'utf8')
console.log('Badge removed successfully.')
