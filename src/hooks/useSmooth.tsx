import SmoothItem from '../utils/scroll/SmoothItem'
import { useState } from 'react'
import useScheduleEffect, { SchedulePrio } from './useScheduleEffect'

const useSmooth = (
  callback: () => Promise<SmoothItem | void> | SmoothItem | void,
  dependencies: Array<any> = [],
  prio: SchedulePrio = SchedulePrio.Normal
): SmoothItem => {
  const [smooth, setSmooth] = useState()

  const handler = async () => {
    const val = await callback()
    setSmooth(val)
  }

  useScheduleEffect(
    () => {
      handler()
      return smooth && smooth.destroy()
    },
    dependencies,
    prio
  )

  return smooth
}

export default useSmooth
