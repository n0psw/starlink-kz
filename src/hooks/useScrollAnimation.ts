import { useEffect, useRef, useState } from 'react'

export const useScrollAnimation = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el) // Stop observing immediately after revealing
        }
      },
      { threshold }
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
    }
  }, [threshold])

  return { ref, isVisible }
}

