import { useEffect } from 'react'
import debounce from 'lodash/debounce'
import useScheduleEffect, { SchedulePrio } from './useScheduleEffect'

const useOnResize = (fn: () => void) => {
  useScheduleEffect(() => {
    const handler = debounce(fn, 100)

    window.addEventListener('resize', handler)

    return () => {
      window.removeEventListener('resize', handler)
    }
  }, [SchedulePrio.Low])

  return null
}

export default useOnResize
