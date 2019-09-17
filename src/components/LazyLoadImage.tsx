import React, { useRef, useState, useEffect } from 'react'
import Image from './Image'
import { IGatsbyImage } from '../types'
import scrollMonitor from 'scrollmonitor'
import { useUiContext } from '../contexts/UiContext'
import useScheduleEffect, { SchedulePrio } from '../hooks/useScheduleEffect'
import { unstable_next } from 'scheduler'

type Props = {
  alt?: string
  image: IGatsbyImage
  onVisible?: Function
  className?: string
}

const LazyLoadImage = ({ image, onVisible, className, alt }: Props) => {
  const elem = useRef()
  const [loaded, setLoaded] = useState(false)
  const { animateContent } = useUiContext()

  useScheduleEffect(
    () => {
      if (!animateContent) return
      if (!elem.current) return
      let watcher
      let observer

      const removeObserver = () =>
        observer && elem.current && observer.unobserve(elem.current)

      const onLoadVisible = () => {
        setLoaded(true)
        if (onVisible) {
          watcher = scrollMonitor.create(elem.current, -window.outerHeight / 6)
          watcher.enterViewport(() => {
            unstable_next(onVisible)
            watcher.destroy()
          })
        }
      }

      const handleIntersect = ([entry]) => {
        if (entry.isIntersecting) {
          onLoadVisible()
          removeObserver()
        }
      }

      const offsetLoading = window.outerHeight * 1.5
      observer = new IntersectionObserver(handleIntersect, {
        rootMargin: `0px 0px ${offsetLoading}px 0px`,
      })
      observer.observe(elem.current)

      return () => {
        removeObserver()
        watcher && watcher.destroy()
      }
    },
    [animateContent],
    SchedulePrio.Normal
  )

  return (
    <Image
      className={className}
      alt={alt}
      ref={elem}
      show={loaded}
      image={image}
    />
  )
}

export default LazyLoadImage
