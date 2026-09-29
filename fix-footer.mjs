import fs from 'fs'
import path from 'path'

const filePath = path.join('../starlink-asia/src/components/Footer.tsx')
let content = fs.readFileSync(filePath, 'utf8')

// Remove the Privacy Policy div
content = content.replace(/<div className="flex gap-6 mt-4 md:mt-0">[\s\S]*?<\/div>/, '')

// Also replace justify-between with just items-center so it aligns nicely or stays on the left
content = content.replace('flex-col md:flex-row items-center justify-between pt-8', 'flex-col md:flex-row items-center pt-8')

fs.writeFileSync(filePath, content, 'utf8')
console.log('Footer updated successfully.')
