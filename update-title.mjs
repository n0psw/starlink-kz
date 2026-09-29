import fs from 'fs'
import path from 'path'

const indexPath = path.join('../starlink-asia/index.html')
let content = fs.readFileSync(indexPath, 'utf8')

// Replace the <title> tag content
content = content.replace(/<title>.*?<\/title>/, '<title>Starlink по всей Азии</title>')

fs.writeFileSync(indexPath, content, 'utf8')
console.log('Title updated successfully.')
