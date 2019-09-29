import React, { useEffect, useState, useRef } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { gutter } from '../../vars'
import { useUiContext } from '../../contexts/UiContext'
import media from '../../media'
import SmoothEtablera from '../../utils/scroll/SmoothEtablera'
import useSmooth from '../../hooks/useSmooth'
import { mainHero } from '../../utils/dom-selectors'
import { useSetting } from '../../contexts/SettingsContext'
import TitleCanvas from './TitleCanvas'
import PageLoaderTitle from './PageLoaderTitle'

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
  const innerEl = useRef<HTMLElement>()
  const contentRef = useRef<HTMLElement>()
  const mainHeroRef = useRef<HTMLElement>(mainHero.resolve())
  const { pageTransitionActive, animateContent } = useUiContext()
  const t = useSetting()

  useSmooth(() => {
    if (isFrontpage && !pageTransitionActive) {
      return new SmoothEtablera(mainHero.resolve(), contentRef.current)
    }
  }, [t.currentLanguage, isFrontpage, pageTransitionActive])

  return (
    <Container>
      <Inner ref={contentRef}>
        <Item>
          <PageLoaderTitle
            firstComplete={firstComplete}
            setFirstComplete={setFirstComplete}
          />
        </Item>
        <Item>{animateContent && <TitleCanvas />}</Item>
      </Inner>
    </Container>
  )
}

export default PageLoaderContent
