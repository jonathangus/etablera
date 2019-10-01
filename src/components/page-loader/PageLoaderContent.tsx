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
  const { pageTransitionActive, animateContent } = useUiContext()
  const t = useSetting()
  const [showCanvas, setShowCanvas] = useState(false)
  const titleRef = useRef()

  useScheduleEffect(() => {
    setShowCanvas(isFrontpage && animateContent && isDesktop())
  }, [t.currentLanguage, isFrontpage, pageTransitionActive, animateContent])

  const etableraSmooth = useSmooth(() => {
    if (isFrontpage && !pageTransitionActive && animateContent) {
      return new SmoothEtablera(
        $mainHero.resolve(),
        titleRef.current,
        !isDesktop()
      )
    }
  }, [t.currentLanguage, isFrontpage, pageTransitionActive, animateContent])

  const TitleNode = useMemo(
    () => (
      <PageLoaderTitle
        firstComplete={firstComplete}
        setFirstComplete={setFirstComplete}
      />
    ),
    [firstComplete]
  )

  return (
    <>
      <PageLoaderLayout ref={titleRef}>{TitleNode}</PageLoaderLayout>
      {showCanvas && <TitleCanvas smooth={etableraSmooth} />}
    </>
  )
}

export default PageLoaderContent
