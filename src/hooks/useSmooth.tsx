import SmoothItem from '../utils/scroll/SmoothItem'
import { useState, useRef, useEffect } from 'react'
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
    },
    dependencies,
    prio
  )

  useEffect(() => {
    return () => {
      smooth && smooth.destroy()
    }
  }, [Boolean(smooth)])

  return smooth
}

export default useSmooth
