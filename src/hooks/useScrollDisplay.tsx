import React, { useState, useEffect } from 'react'
import scrollMonitor from 'scrollmonitor'
import { useUiContext } from '../contexts/UiContext'

const useScrollDisplay = (ref): boolean => {
  const [show, setShow] = useState(false)
  const { mounted } = useUiContext()

  useEffect(() => {
    const offset = -window.outerHeight / 6
    const watcher = scrollMonitor.create(ref.current, offset)

    watcher.enterViewport(() => {
      if (mounted) {
        watcher.destroy()
        requestAnimationFrame(() => {
          setShow(true)
        })
      }
    })

    return () => {
      watcher.destroy()
    }
  }, [mounted])

  return show
}

export default useScrollDisplay
