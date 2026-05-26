import { useState, useRef } from 'react'
import { Upload, Trash2, Eye, EyeOff, CheckCircle, AlertCircle, Lock, LogOut, Film, RefreshCw } from 'lucide-react'

const API = 'http://localhost:3001'

interface VideoConfig {
  id: number
  file: string
  poster?: string
  title: string
  titleKk?: string
  titleEn?: string
  enabled: boolean
}

// ─── Login Screen ──────────────────────────────────────────────────────────────
const Login = ({ onLogin }: { onLogin: (pwd: string) => void }) => {
  const [pwd, setPwd] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const r = await fetch(`${API}/api/videos`, {
        headers: { 'x-admin-password': pwd },
      })
      if (r.ok) {
        onLogin(pwd)
      } else {
        setError('Неверный пароль')
      }
    } catch {
      setError('Сервер недоступен. Убедитесь что запущен: npm run server')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm border border-slate-100">
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-full bg-slate-900 flex items-center justify-center">
            <Lock className="w-7 h-7 text-white" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center text-slate-900 mb-1">Управление видео</h1>
        <p className="text-slate-500 text-sm text-center mb-6">Space X KZ — Admin</p>

        <form onSubmit={submit} className="space-y-4">
          <input
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            placeholder="Пароль"
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent"
            autoFocus
          />
          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading || !pwd}
            className="w-full bg-slate-900 text-white rounded-xl py-3 font-semibold hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  )
}

// ─── Toast ────────────────────────────────────────────────────────────────────
const Toast = ({ msg, type }: { msg: string; type: 'ok' | 'err' }) => (
  <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium transition-all ${type === 'ok' ? 'bg-green-600' : 'bg-red-500'}`}>
    {type === 'ok' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
    {msg}
  </div>
)

// ─── Video Slot Card ───────────────────────────────────────────────────────────
const VideoSlot = ({
  video,
  password,
  onRefresh,
  onToast,
}: {
  video: VideoConfig
  password: string
  onRefresh: () => void
  onToast: (msg: string, type: 'ok' | 'err') => void
}) => {
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [editTitle, setEditTitle] = useState(video.title)
  const [savingTitle, setSavingTitle] = useState(false)
  const [progress, setProgress] = useState(0)

  const headers = { 'x-admin-password': password }

  const upload = async (file: File) => {
    setUploading(true)
    setProgress(0)
    try {
      const form = new FormData()
      form.append('video', file)
      form.append('slot', `video${video.id}`)
      form.append('password', password)

      // XHR for progress
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('POST', `${API}/api/upload`)
        xhr.setRequestHeader('x-admin-password', password)
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100))
        }
        xhr.onload = () => {
          if (xhr.status === 200) resolve()
          else reject(new Error(xhr.responseText))
        }
        xhr.onerror = () => reject(new Error('Ошибка сети'))
        xhr.send(form)
      })

      // Enable slot in JSON
      await fetch(`${API}/api/videos/${video.id}`, {
        method: 'PATCH',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: true, file: `video${video.id}.mp4` }),
      })

      onToast(`Видео ${video.id} загружено`, 'ok')
      onRefresh()
    } catch (e) {
      onToast('Ошибка загрузки: ' + String(e), 'err')
    }
    setUploading(false)
    setProgress(0)
  }

  const deleteVideo = async () => {
    if (!confirm(`Удалить видео ${video.id}?`)) return
    setDeleting(true)
    try {
      await fetch(`${API}/api/videos/${video.id}/file`, { method: 'DELETE', headers })
      onToast(`Видео ${video.id} удалено`, 'ok')
      onRefresh()
    } catch {
      onToast('Ошибка удаления', 'err')
    }
    setDeleting(false)
  }

  const toggleEnabled = async () => {
    await fetch(`${API}/api/videos/${video.id}`, {
      method: 'PATCH',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ enabled: !video.enabled }),
    })
    onRefresh()
  }

  const saveTitle = async () => {
    if (editTitle === video.title) return
    setSavingTitle(true)
    await fetch(`${API}/api/videos/${video.id}`, {
      method: 'PATCH',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editTitle }),
    })
    onToast('Название сохранено', 'ok')
    setSavingTitle(false)
    onRefresh()
  }

  return (
    <div className={`bg-white rounded-2xl border p-5 flex flex-col gap-4 transition-all ${video.enabled ? 'border-slate-200' : 'border-dashed border-slate-300 opacity-70'}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {video.id}
          </div>
          <span className="text-sm font-semibold text-slate-700 truncate">
            {video.file}
          </span>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${video.enabled ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
          {video.enabled ? 'Активен' : 'Скрыт'}
        </span>
      </div>

      {/* Preview */}
      {video.enabled && (
        <video
          className="w-full aspect-video rounded-xl bg-slate-100 object-cover"
          src={`/${video.file}`}
          muted
          playsInline
          loop
          autoPlay
        />
      )}

      {!video.enabled && (
        <div className="w-full aspect-video rounded-xl bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 text-slate-400">
          <Film className="w-8 h-8" />
          <span className="text-xs">Нет видео</span>
        </div>
      )}

      {/* Upload progress */}
      {uploading && (
        <div className="space-y-1">
          <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-sky-500 transition-all duration-200 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-slate-500">{progress}% загружено...</span>
        </div>
      )}

      {/* Title edit */}
      <div className="flex gap-2">
        <input
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onBlur={saveTitle}
          className="flex-1 text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-sky-400 text-slate-800"
          placeholder="Название видео"
        />
        {savingTitle && <span className="text-xs text-slate-400 self-center">...</span>}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {/* Upload */}
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="flex-1 flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-xl py-2.5 transition-colors disabled:opacity-50"
        >
          <Upload className="w-4 h-4" />
          {uploading ? 'Загрузка...' : 'Загрузить'}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="video/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) upload(file)
            e.target.value = ''
          }}
        />

        {/* Toggle */}
        <button
          onClick={toggleEnabled}
          title={video.enabled ? 'Скрыть' : 'Показать'}
          className="w-10 flex items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-slate-500"
        >
          {video.enabled ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>

        {/* Delete */}
        {video.enabled && (
          <button
            onClick={deleteVideo}
            disabled={deleting}
            title="Удалить файл"
            className="w-10 flex items-center justify-center rounded-xl border border-red-100 hover:bg-red-50 transition-colors text-red-400 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}

// ─── Admin Page ───────────────────────────────────────────────────────────────
const AdminPage = () => {
  const [password, setPassword] = useState('')
  const [videos, setVideos] = useState<VideoConfig[]>([])
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'ok' | 'err' } | null>(null)

  const showToast = (msg: string, type: 'ok' | 'err') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3500)
  }

  const loadVideos = async (pwd: string) => {
    setLoading(true)
    try {
      const r = await fetch(`${API}/api/videos`, {
        headers: { 'x-admin-password': pwd },
      })
      const data = await r.json()
      setVideos(data)
    } catch {
      showToast('Ошибка загрузки списка', 'err')
    }
    setLoading(false)
  }

  const handleLogin = (pwd: string) => {
    setPassword(pwd)
    loadVideos(pwd)
  }

  if (!password) return <Login onLogin={handleLogin} />

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-slate-900">Управление видео</h1>
            <p className="text-xs text-slate-400">Space X KZ — Реальные кейсы</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => loadVideos(password)}
              className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Обновить
            </button>
            <button
              onClick={() => setPassword('')}
              className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-500 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Выйти
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Guide */}
        <div className="bg-sky-50 border border-sky-100 rounded-2xl p-5 mb-8 text-sm text-sky-800">
          <strong className="block mb-1">Как пользоваться:</strong>
          <ol className="list-decimal list-inside space-y-1 text-sky-700">
            <li>Нажмите <b>Загрузить</b> на нужном слоте и выберите видео с компьютера</li>
            <li>Отредактируйте <b>название</b> видео — кликните и напишите</li>
            <li>Используйте <b>👁</b> чтобы скрыть или показать слот на сайте</li>
            <li>Нажмите <b>🗑</b> чтобы удалить видео файл</li>
          </ol>
        </div>

        {loading ? (
          <div className="text-center py-16 text-slate-400">Загрузка...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {videos.map((v) => (
              <VideoSlot
                key={v.id}
                video={v}
                password={password}
                onRefresh={() => loadVideos(password)}
                onToast={showToast}
              />
            ))}
          </div>
        )}

        {/* Site link */}
        <div className="mt-8 text-center">
          <a
            href="/"
            target="_blank"
            className="text-sm text-sky-500 hover:text-sky-700 transition-colors"
          >
            ↗ Открыть сайт
          </a>
        </div>
      </main>

      {toast && <Toast msg={toast.msg} type={toast.type} />}
    </div>
  )
}

export default AdminPage
