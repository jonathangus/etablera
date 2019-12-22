import React, { useEffect, useState, useRef, memo, forwardRef } from 'react'
import styled, { keyframes, css } from 'styled-components'
import paths from './etablera-paths'
import media from '../../media'

// There is happending some strange stuff here. Caution is advised
const pullInAnimation = keyframes`
from {
    transform: scale(1.4);
}

to {
    transform: scale(1);
}
`

const translateMagicOffset = '25%'

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

const TitleWrapper = styled.div`
  height: 100%;
`

const InnerAnimation = keyframes`
    from {
        transform: translateY(${translateMagicOffset});
        opacity:1;
    }

    to {
        opacity:1;
        transform: translateY(0%);
    }
`

const Inner = styled.div`
  position: relative;
  margin: 0 auto;

  svg {
    width: 100%;
    height: 100%;
  }

  path,
  polygon,
  svg {
    fill: ${p => p.theme.color};
    stroke: ${p => p.theme.color};
  }

  h1 {
    margin: 0;
    color: transparent;
    line-height: 0;
    font-size: 0;
  }
`

const InnerFade = keyframes`
    from {
        opacity:0;
    }

    to {
        opacity:1;
    }
`

const Line = styled.div``
const Word = styled.g<{ disableTransition: boolean }>`
  opacity: 0;
  transform: translateY(${translateMagicOffset});
  animation: ${InnerAnimation} 1s cubic-bezier(0.8, 0, 0.2, 1) forwards;

  ${media.phone`
    animation: ${InnerFade} 1s cubic-bezier(0.8, 0, 0.2, 1) forwards;
    transform: none;
  `}

  ${p =>
    p.disableTransition &&
    `
    opacity:1 !important;
    transform: none !important;
    animation: none !important;
  `}
`

const Letter = styled.g<{ disableTransition: boolean }>`
  transform: scale(1.4);
  transform-origin: center;
  animation: ${p => (p.ready ? pullInAnimation : 'none')} 1s
    cubic-bezier(0.8, 0, 0.2, 1) forwards;
  animation-delay: ${p => getDelay(p.index + 1)}ms;
  fill: ${p => p.theme.color};

  ${p =>
    p.disableTransition &&
    `
    animation: none;
    transform: none;
  `}
`

type Props = {
  setFirstComplete?: Function
  firstComplete?: boolean
  disableTransition?: boolean
}

const PageLoaderTitle = (
  { setFirstComplete = () => {}, firstComplete, disableTransition }: Props,
  ref
) => {
  const innerEl = useRef<HTMLElement>()

  // First step of the animation
  useEffect(() => {
    if (disableTransition) return

    // Detect if the initial css animation is done before the javascript is being triggered
    const style = window.getComputedStyle(innerEl.current)
    const values = style.transform.replace(')', '').split(',')
    const translateYValue = parseInt(values[values.length - 1])
    const opacityValue = parseFloat(style.opacity)

    // Transition is complete
    if (translateYValue == 0 && opacityValue === 1) {
      setFirstComplete(true)
    } else {
      const onAnimationComplete = () => {
        setFirstComplete(true)
        innerEl.current.removeEventListener('animationend', onAnimationComplete)
      }
      innerEl.current.addEventListener('animationend', onAnimationComplete)
    }
  }, [])

  const node = (
    <TitleWrapper ref={ref}>
      <Inner>
        <h1>
          Etablera
          <svg
            width="2000px"
            height="2000px"
            viewBox="0 0 2000 2000"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <g id="Page-1" stroke="none" fill="none" fillRule="evenodd">
              <defs>
                <rect
                  id="rect"
                  fill="#000000"
                  x="0"
                  y="744"
                  width="2722.51309"
                  height="460"
                ></rect>
                <clipPath id="clip">
                  <use xlinkHref="#rect" />
                </clipPath>
              </defs>
              <g clipPath="url(#clip)">
                <Word
                  id="Etablera"
                  disableTransition={disableTransition}
                  ref={innerEl}
                >
                  {paths.desktop.letters.map((l, i) => (
                    <Letter
                      ready={firstComplete}
                      disableTransition={disableTransition}
                      index={i}
                      key={i}
                    >
                      {l}
                    </Letter>
                  ))}

                  <Line
                    ready={firstComplete}
                    id="Line"
                    transform="translate(267.000000, 1121.000000)"
                    stroke="#FFFFFF"
                    stroke-linecap="square"
                    strokeWidth="2"
                  >
                    <path d="M1,0 L0.5,24.6212121"></path>
                    <path d="M1,24 L1465,24" id="Line-2"></path>
                    <path
                      d="M1465.5,24.6290323 L1465.5,2.37096774"
                      id="Line-3"
                    ></path>
                  </Line>
                </Word>
              </g>
            </g>
          </svg>
        </h1>
      </Inner>
    </TitleWrapper>
  )

  return node
}

export default memo(forwardRef(PageLoaderTitle))
