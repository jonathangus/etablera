import React, { useEffect, useState, memo } from 'react'
import { useUiContext } from '../../../contexts/UiContext'
import DesktopAllCases from './DesktopAllCases'
import MobileAllCases from './MobileAllCases'
import useResize from '../../../hooks/useResize'
import { ICase } from '../../../types'

const mobileBreakpoint = 750

type Props = {
  cases: Array<ICase>
}

const AllCases = ({ cases }: Props) => {
  const [desktopView, setDesktopView] = useState()

  useResize(() => {
    setDesktopView(window.innerWidth > mobileBreakpoint)
  })

  useEffect(() => {
    setDesktopView(window.innerWidth > mobileBreakpoint)
  }, [])

  if (typeof desktopView === 'undefined') return null

  return desktopView ? (
    <DesktopAllCases nodes={cases} />
  ) : (
    <MobileAllCases nodes={cases} />
  )
}

export default memo(AllCases)
