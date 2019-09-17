import { useEffect } from 'react'

const useElementEventEffect = (event: string, ref, fn: () => void) => {
  if (!ref) {
    throw new Error('Missing ref')
  }

  useEffect(() => {
    const handler = () => {
      ref.current && ref.current.removeEventListener(event, handler)
      fn()
    }

    ref.current && ref.current.addEventListener(event, handler)

    return () => {
      ref.current && ref.current.removeEventListener(event, handler)
    }
  })

  return null
}

export default useElementEventEffect
