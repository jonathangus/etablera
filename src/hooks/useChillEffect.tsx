import { useEffect, EffectCallback, useRef } from 'react'
import { requestIdleCb } from '../utils'

const useChillEffect = (
  callback: EffectCallback,
  dependencies: Array<any> = []
) => {
  const mounted = useRef(false)
  let cleanup

  useEffect(() => {
    mounted.current = true
    requestIdleCb(() => {
      requestAnimationFrame(() => {
        if (mounted.current) {
          cleanup = callback()
        }
      })
    })

    return () => {
      mounted.current = false
      if (typeof cleanup === 'function') {
        cleanup()
      }
    }
  }, dependencies)
}

export default useChillEffect
