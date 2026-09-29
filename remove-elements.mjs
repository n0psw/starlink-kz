import fs from 'fs'
import path from 'path'

// 1. Remove legend from AsiaMapSection.tsx
const mapPath = path.join('../starlink-asia/src/components/AsiaMapSection.tsx')
let mapContent = fs.readFileSync(mapPath, 'utf8')
mapContent = mapContent.replace(/<div className="absolute bottom-6 left-6 flex items-center gap-6">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, '</div>\n          </div>')
fs.writeFileSync(mapPath, mapContent, 'utf8')

// 2. Remove copyright section from Footer.tsx
const footerPath = path.join('../starlink-asia/src/components/Footer.tsx')
let footerContent = fs.readFileSync(footerPath, 'utf8')
footerContent = footerContent.replace(/<div className="flex flex-col md:flex-row items-center pt-8 border-t border-white\/10 text-white\/40 text-xs">[\s\S]*?<\/div>/, '')
fs.writeFileSync(footerPath, footerContent, 'utf8')

console.log('Elements removed successfully.')
