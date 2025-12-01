import { useState, useEffect } from 'react'

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop
      const winHeightPx =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight
      const scrolled = (scrollPx / winHeightPx) * 100
      setScrollProgress(scrolled)
    }

    window.addEventListener('scroll', updateScrollProgress)
    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])

  return (
    <div className="absolute bottom-0 left-0 right-0 h-1 z-[60] pointer-events-none">
      <div
        className="h-full bg-accent transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  )
}

export default ScrollProgress

