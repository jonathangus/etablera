import { useEffect, EffectCallback, useRef } from 'react'
import {
  unstable_scheduleCallback,
  unstable_NormalPriority,
  unstable_LowPriority,
  unstable_ImmediatePriority,
  unstable_IdlePriority,
  unstable_next,
  unstable_UserBlockingPriority,
} from 'scheduler'

export enum SchedulePrio {
  Low = unstable_LowPriority,
  Immediate = unstable_ImmediatePriority,
  Normal = unstable_NormalPriority,
  Idle = unstable_IdlePriority,
  UserBlocking = unstable_UserBlockingPriority,
}

const useScheduleEffect = (
  callback: EffectCallback,
  dependencies: Array<any> = [],
  prio?: SchedulePrio
) => {
  const mounted = useRef(false)
  let cleanup

  useEffect(() => {
    mounted.current = true

    const fn = () => {
      if (mounted.current) {
        cleanup = callback()
      }
    }

    // If prio is given, use that else schedule it for next effect
    prio ? unstable_scheduleCallback(prio, fn) : unstable_next(fn)

    return () => {
      mounted.current = false
      if (typeof cleanup === 'function') {
        cleanup()
      }
    }
  }, dependencies)
}

export default useScheduleEffect
