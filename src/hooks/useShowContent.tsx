import { EffectCallback, useRef, useEffect } from 'react'
import { useUiContext } from '../contexts/UiContext'

const useShowContent = (callback: EffectCallback) => {
  const mounted = useRef(false)
  const { animateContent } = useUiContext()

  useEffect(() => {
    mounted.current = true
    requestAnimationFrame(() => {
      mounted.current && animateContent && callback()
    })

    return () => {
      mounted.current = false
    }
  }, [animateContent])
}

export default useShowContent
