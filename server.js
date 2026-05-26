import express from 'express'
import multer from 'multer'
import cors from 'cors'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PUBLIC_DIR = path.join(__dirname, 'public')
const VIDEOS_JSON = path.join(PUBLIC_DIR, 'videos.json')
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'starlink2025'
const PORT = process.env.UPLOAD_PORT || 3001

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(PUBLIC_DIR))

// ─── Auth middleware ──────────────────────────────────────────────────────────
const auth = (req, res, next) => {
  const pwd = req.headers['x-admin-password'] || req.body?.password || req.query?.password
  if (pwd !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Неверный пароль' })
  }
  next()
}

// ─── Multer: save to public/ ──────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, PUBLIC_DIR),
  filename: (req, file, cb) => {
    // Keep original name OR use slot id: video1.mp4, video2.mp4 ...
    const slot = req.query.slot || req.body.slot // e.g. "video3"
    const ext = path.extname(file.originalname).toLowerCase() || '.mp4'
    cb(null, slot ? `${slot}${ext}` : file.originalname)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500 MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) cb(null, true)
    else cb(new Error('Только видео файлы'))
  },
})

// ─── Routes ───────────────────────────────────────────────────────────────────

// GET /api/videos — list
app.get('/api/videos', auth, (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(VIDEOS_JSON, 'utf-8'))
    res.json(data)
  } catch {
    res.json([])
  }
})

// POST /api/upload — upload video file
app.post('/api/upload', auth, upload.single('video'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Файл не загружен' })
  res.json({ ok: true, filename: req.file.filename })
})

// PATCH /api/videos/:id — update title or enabled
app.patch('/api/videos/:id', auth, (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(VIDEOS_JSON, 'utf-8'))
    const idx = data.findIndex((v) => v.id === Number(req.params.id))
    if (idx === -1) return res.status(404).json({ error: 'Не найдено' })
    data[idx] = { ...data[idx], ...req.body }
    fs.writeFileSync(VIDEOS_JSON, JSON.stringify(data, null, 2))
    res.json(data[idx])
  } catch (e) {
    res.status(500).json({ error: String(e) })
  }
})

// DELETE /api/videos/:id/file — remove video file and clear slot
app.delete('/api/videos/:id/file', auth, (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(VIDEOS_JSON, 'utf-8'))
    const idx = data.findIndex((v) => v.id === Number(req.params.id))
    if (idx === -1) return res.status(404).json({ error: 'Не найдено' })
    const filePath = path.join(PUBLIC_DIR, data[idx].file)
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
    data[idx].enabled = false
    fs.writeFileSync(VIDEOS_JSON, JSON.stringify(data, null, 2))
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ error: String(e) })
  }
})

app.listen(PORT, () => {
  console.log(`\n🚀 Сервер загрузки запущен: http://localhost:${PORT}`)
  console.log(`🔑 Пароль: ${ADMIN_PASSWORD}`)
  console.log(`📁 Публичная папка: ${PUBLIC_DIR}\n`)
})
