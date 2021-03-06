import React, {
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
  forwardRef,
} from 'react'
import styled, { keyframes, css } from 'styled-components'
import { gutter } from '../../vars'
import { useUiContext } from '../../contexts/UiContext'
import media from '../../media'
import EtableraDescription from '../landing/EtableraDescription'
import SmoothEtablera from '../../utils/scroll/SmoothEtablera'
import useSmooth from '../../hooks/useSmooth'
import letters from './etablera-letters'
import { mainHero } from '../../utils/dom-selectors'
import { useSetting } from '../../contexts/SettingsContext'
import PageLoaderInner from './PageLoaderInner'

// Need to generate a animation for each letter so we can animate the paths transform value
const pullInAnimations = letters.map(
  (l, i) =>
    keyframes`
    from {
        transform: scale(1) translate(${l.transform[0]}px, ${l.transform[1]}px)
    }
    
    to {
        transform: scale(0.5) translate(${l.transform[0]}px, ${l.transform[1]}px);
    }
`
)
const pullInAnimationsMobile = letters.map(
  (l, i) =>
    keyframes`
    from {
        transform: scale(1) translate(${l.transform[0]}px, ${l.transform[1]}px)
    }
    
    to {
        transform: scale(0.8) translate(${l.transform[0]}px, ${l.transform[1]}px);
    }
`
)

const stagger = 66.1157
const base = 0
const getDelay = (index: number): number => {
  let k = 0

  if (index == 8 || index === 1) {
    k = 3
  } else if (index == 7 || index === 2) {
    k = 2
  } else if (index == 6 || index === 3) {
    k = 1
  } else if (index == 5 || index === 4) {
    k = 0
  }
  return k * stagger + base
}

const Letter = styled.path`
  transform-origin: center;
  animation: ${p => (p.ready ? pullInAnimations[p.index - 1] : 'none')} 1s
    cubic-bezier(0.8, 0, 0.2, 1) forwards;
  animation-delay: ${p => getDelay(p.index)}ms;
  fill: ${p => p.theme.color};

  ${media.phone`
  animation-name: ${p =>
    p.ready ? pullInAnimationsMobile[p.index - 1] : 'none'};
  `}
`

const TitleWrapper = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 ${gutter * 2}px;
  flex: 1;
  overflow: hidden;

  ${media.phone`
    padding: 0 5px;
  `}
`

const InnerAnimation = keyframes`
    from {
        transform: translateY(100%);
        opacity:1;
    }

    to {
        opacity:1;
        transform: translateY(0%);
    }
`

const Inner = styled.div`
  position: relative;
  opacity: 0;
  transform: translateY(100%);
  animation: ${InnerAnimation} 1s cubic-bezier(0.8, 0, 0.2, 1) forwards;

  h1 {
    margin: 0;
    color: transparent;
    line-height: 0;
    font-size: 0;
  }
`

const Content = styled.div`
  position: absolute;
  will-change: transform, opacity;
  top: 50%;
  left: 50%;
  width: 100%;

  transform: translate(-50%, -50%);
  margin-top: -3%; // To center
`

type Props = {
  onDone?: Function
}

const PageLoaderTitle = ({ onDone }: Props, ref) => {
  return (
    <Content ref={ref}>
      <PageLoaderInner onDone={onDone}></PageLoaderInner>
    </Content>
  )
}

export default forwardRef(PageLoaderTitle)
