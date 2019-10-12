import React, { useMemo, useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import TitleCanvas from '../page-loader/TitleCanvas'
import { useThemeContext } from '../../contexts/ThemeContext'
import SmoothEtablera from '../../utils/scroll/SmoothEtablera'
import useSmooth from '../../hooks/useSmooth'
import useResize from '../../hooks/useResize'
import { useUiContext } from '../../contexts/UiContext'
import PageLoaderLayout from '../page-loader/PageLoaderLayout'
import PageLoaderTitle from '../page-loader/PageLoaderTitle'
import { sizes } from '../../media'

const Container = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
`
const MainHeroTitle = () => {
  const {
    frontpageLoaded,
    showTitleCanvas,
    animateContent,
    setEtableraSmooth,
  } = useUiContext()
  const containerEl = useRef()
  const [canvasActive, setCanvasActive] = useState(false)

  const { selected } = useThemeContext()
  const titleRef = useRef()
  const [isDesktop, setIsDesktop] = useState<boolean>()

  const calcIsDesktop = () => {
    // setIsDesktop(false)
    // console.log(window.innerWidth > sizes.phone, media.phone, window.innerWidth)
    setIsDesktop(window.innerWidth > sizes.phone)
  }
  useEffect(() => {
    calcIsDesktop()
  }, [])
  useResize(calcIsDesktop)

  const etableraSmooth = useSmooth(() => {
    if (animateContent) {
      return new SmoothEtablera(
        containerEl.current,
        titleRef.current,
        !isDesktop
      )
    }
  }, [animateContent])

  useEffect(() => {
    etableraSmooth && etableraSmooth.isDesktop(isDesktop)
  }, [isDesktop])

  useEffect(() => {
    setEtableraSmooth(etableraSmooth)
  }, [Boolean(etableraSmooth)])

  console.log({ isDesktop })

  return (
    <PageLoaderLayout ref={containerEl}>
      {!canvasActive && <PageLoaderTitle ref={titleRef} disableTransition />}
      {isDesktop && <TitleCanvas setCanvasActive={setCanvasActive} />}
    </PageLoaderLayout>
  )
}

export default MainHeroTitle
