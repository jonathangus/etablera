import { createPortal } from 'react-dom'
import React, { useEffect, useState, useRef, useMemo } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { gutter } from '../../vars'
import { useUiContext } from '../../contexts/UiContext'
import media from '../../media'
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

const Container = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;

  ${media.phone`
    width: 100%;
  `}
`

const Inner = styled.div`
  height: 0px;
  position: relative;
  padding-top: 100%;
`

const Item = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
`

const PageLoaderContent = ({
  isFrontpage,
  firstComplete,
  setFirstComplete,
}: Props) => {
  const contentRef = useRef<HTMLElement>()
  const { pageTransitionActive, animateContent } = useUiContext()
  const t = useSetting()
  const [showCanvas, setShowCanvas] = useState(false)

  useScheduleEffect(() => {
    if (isFrontpage && animateContent) {
      setShowCanvas(true)
    }
  }, [t.currentLanguage, isFrontpage, pageTransitionActive, animateContent])

  const etableraSmooth = useSmooth(() => {
    if (isFrontpage && !pageTransitionActive && animateContent) {
      return new SmoothEtablera($mainHero.resolve(), $mainHero.resolve())
    }
  }, [t.currentLanguage, isFrontpage, pageTransitionActive, animateContent])

  const TitleNode = useMemo(
    () => (
      <PageLoaderTitle
        canvasVisible={showCanvas}
        firstComplete={firstComplete}
        setFirstComplete={setFirstComplete}
      />
    ),
    [firstComplete]
  )

  const CanvasNode = useMemo(() => <TitleCanvas smooth={etableraSmooth} />, [
    showCanvas,
  ])

  console.log({ showCanvas })

  return (
    <>
      <PageLoaderLayout>{TitleNode}</PageLoaderLayout>
      {showCanvas && <TitleCanvas smooth={etableraSmooth} />}
    </>
  )
}

export default PageLoaderContent
