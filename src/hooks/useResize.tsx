import { useEffect } from 'react'
import debounce from 'lodash/debounce'

const useResize = (fn: () => void) => {
  useEffect(() => {
    const handler = debounce(() => {
      fn()
    }, 150)

    window.addEventListener('resize', handler)

    return () => {
      window.removeEventListener('resize', handler)
    }
  })

  return null
}

export default useResize
