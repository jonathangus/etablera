import { useEffect, useRef } from 'react'
import { requestIdleCb } from '../utils'

const useRequestIdleCb = (): Function => {
  const mounted = useRef(false)

  useEffect(() => {
    mounted.current = true

    return () => {
      mounted.current = false
    }
  })

  return (fn: Function) => {
    requestIdleCb(() => {
      mounted.current && fn()
    })
  }
}

export default useRequestIdleCb
