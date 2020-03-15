import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useLayoutEffect,
} from 'react'
import styled, { keyframes, css } from 'styled-components'
import { gutter } from '../../vars'
import media from '../../media'
import SmoothEtablera from '../../utils/scroll/SmoothEtablera'
import useSmooth from '../../hooks/useSmooth'
import letters from './etablera-letters'
import { useSetting } from '../../contexts/SettingsContext'

const getToTransform = l =>
  `scale(0.5) translate(${l.transform[0]}px, ${l.transform[1]}px)`
const getToTransformMob = l =>
  `scale(0.8) translate(${l.transform[0]}px, ${l.transform[1]}px)`
// Need to generate a animation for each letter so we can animate the paths transform value
const pullInAnimations = letters.map(
  (l, i) =>
    keyframes`
    from {
        transform: scale(1) translate(${l.transform[0]}px, ${l.transform[1]}px)
    }
    
    to {
        transform: ${getToTransform(l)};
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
      transform: ${getToTransformMob(l)};
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

const letterNoAnimation = css`
  animation: none;
  transform: ${p => getToTransform(letters[0])};

  ${media.phone`
  transform: ${getToTransformMob(letters[0])};

  `}
`

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

  ${p => !p.withAnimation && letterNoAnimation}
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

const innerNoAnimation = css`
  opacity: 1;
  transform: translateY(0%);
  animation: none;
`

const Inner = styled.div`
  position: relative;
  opacity: 0;
  transform: translateY(100%);
  animation: ${InnerAnimation} 1s cubic-bezier(0.8, 0, 0.2, 1) forwards;

  ${p => !p.withAnimation && innerNoAnimation}

  h1 {
    margin: 0;
    color: transparent;
    line-height: 0;
    font-size: 0;
  }
`

type Props = {
  onDone: Function
}

const onAnimationEnd = (el, cb) => {
  const onAnimationComplete = () => {
    cb()
    el.removeEventListener('animationend', onAnimationComplete)
  }
  el.addEventListener('animationend', onAnimationComplete)
}

const PageLoaderInner = ({ onDone }: Props) => {
  const letterRefs = useRef<HTMLElement[]>([])
  const innerEl = useRef<HTMLElement>()
  const withAnimation = Boolean(onDone)
  const [firstAnimationDone, setFirstAnimationDone] = useState(!withAnimation)

  useLayoutEffect(() => {
    if (!withAnimation) return
    // Detect if the initial css animation is done before the javascript is being triggered
    const style = window.getComputedStyle(innerEl.current)
    const values = style.transform.replace(')', '').split(',')
    const translateYValue = parseInt(values[values.length - 1])

    // Transition is complete
    if (translateYValue == 0) {
      setFirstAnimationDone(true)
    } else {
      onAnimationEnd(innerEl.current, () => setFirstAnimationDone(true))
    }
  }, [])

  useLayoutEffect(() => {
    if (withAnimation && firstAnimationDone) {
      const lastLetter = letterRefs.current[letterRefs.current.length - 1]
      onAnimationEnd(lastLetter, onDone)
    }
  }, [firstAnimationDone])

  return (
    <TitleWrapper>
      <Inner ref={innerEl} withAnimation={withAnimation}>
        <h1>
          Etablera
          <svg
            id="logo1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256.44 44.82"
          >
            {letters.map((l, i) => (
              <Letter
                ref={el => (letterRefs.current[i] = el)}
                d={l.d}
                ready={firstAnimationDone}
                key={i}
                transform={`translate(${l.transform[0]} ${l.transform[1]})`}
                index={i + 1}
                withAnimation={withAnimation}
              />
            ))}
          </svg>
        </h1>
      </Inner>
    </TitleWrapper>
  )
}

export default PageLoaderInner
