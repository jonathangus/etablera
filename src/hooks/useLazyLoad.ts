import { useEffect } from 'react'
import get from 'lodash/get'

const useLazyLoad = (elem, handler, settings = {}) => {
  useEffect(() => {
    if (!elem.current) return
    if (!handler) return

    let observer

    const handleIntersect = ([entry]) => {
      if (entry.isIntersecting) {
        handler()
        observer && elem.current && observer.unobserve(elem.current)
      }
    }

    observer = new IntersectionObserver(handleIntersect, {
      rootMargin: `${get(settings, 'offset', 0)}% 0px`, // 50px into viewport before loading so you can see it kick in
      // threshold: 0.01,
    })
    observer.observe(elem.current)

    return () => {
      observer && elem.current && observer.unobserve(elem.current)
    }
  }, [])

  return null
}

export default useLazyLoad
