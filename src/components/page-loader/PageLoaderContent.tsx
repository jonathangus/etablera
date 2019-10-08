import React, { useEffect, useState, useRef, useMemo } from 'react'
import { useUiContext } from '../../contexts/UiContext'
import SmoothEtablera from '../../utils/scroll/SmoothEtablera'
import useSmooth from '../../hooks/useSmooth'
import { $mainHero } from '../../utils/dom-selectors'
import { useSetting } from '../../contexts/SettingsContext'
import TitleCanvas from './TitleCanvas'
import PageLoaderTitle from './PageLoaderTitle'
import useScheduleEffect from '../../hooks/useScheduleEffect'
import PageLoaderLayout from './PageLoaderLayout'

type Props = {
  isFrontpage: boolean
  firstComplete: boolean
  setFirstComplete: Function
}

const isDesktop = () => window.innerWidth > 700
const PageLoaderContent = ({
  isFrontpage,
  firstComplete,
  setFirstComplete,
}: Props) => {
  const {
    pageTransitionActive,
    animateContent,
    setEtableraSmooth,
  } = useUiContext()
  const titleRef = useRef()

  const etableraSmooth = useSmooth(() => {
    if (isFrontpage && !pageTransitionActive && animateContent) {
      return new SmoothEtablera($mainHero.resolve(), titleRef.current, false)
    }
  }, [isFrontpage, pageTransitionActive, animateContent])

  useEffect(() => {
    setEtableraSmooth(etableraSmooth)
  }, [Boolean(etableraSmooth)])

  const TitleNode = useMemo(
    () => (
      <PageLoaderTitle
        firstComplete={firstComplete}
        setFirstComplete={setFirstComplete}
      />
    ),
    [firstComplete]
  )

  return <PageLoaderLayout ref={titleRef}>{TitleNode}</PageLoaderLayout>
}

export default PageLoaderContent
