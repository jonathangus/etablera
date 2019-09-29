import React, { useEffect, useState, useRef } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { gutter } from '../../vars'
import media from '../../media'
import paths from './etablera-paths'
import { mainHero } from '../../utils/dom-selectors'

// Need to generate a animation for each letter so we can animate the paths transform value
const pullInAnimation = keyframes`
from {
    transform: scale(1.4);
}

to {
    transform: scale(1);
}
`

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
        transform: translateY(300px);
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
    fill: white;
  }

  h1 {
    margin: 0;
    color: transparent;
    line-height: 0;
    font-size: 0;
  }
`
const Word = styled.g`
  opacity: 0;
  transform: translateY(50%);
  animation: ${InnerAnimation} 1s cubic-bezier(0.8, 0, 0.2, 1) forwards;
`

const Letter = styled.g`
  transform: scale(1.4);
  transform-origin: center;
  animation: ${p => (p.ready ? pullInAnimation : 'none')} 1s
    cubic-bezier(0.8, 0, 0.2, 1) forwards;
  animation-delay: ${p => getDelay(p.index)}ms;
  fill: ${p => p.theme.color};
`

type Props = {
  setFirstComplete: Function
  firstComplete: boolean
}

const PageLoaderTitle = ({ setFirstComplete, firstComplete }: Props) => {
  const innerEl = useRef<HTMLElement>()
  const contentRef = useRef<HTMLElement>()
  const mainHeroRef = useRef<HTMLElement>(mainHero.resolve())

  // First step of the animation
  useEffect(() => {
    mainHeroRef.current = mainHero.resolve()
    // Detect if the initial css animation is done before the javascript is being triggered
    const style = window.getComputedStyle(innerEl.current)
    const values = style.transform.replace(')', '').split(',')
    const translateYValue = parseInt(values[values.length - 1])

    // Transition is complete
    if (translateYValue == 0) {
      setFirstComplete(true)
    } else {
      const onAnimationComplete = () => {
        setFirstComplete(true)
        innerEl.current.removeEventListener('animationend', onAnimationComplete)
      }
      innerEl.current.addEventListener('animationend', onAnimationComplete)
    }
  }, [])

  return (
    <TitleWrapper id="page-title">
      <Inner ref={innerEl}>
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
            <g
              id="Page-1"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
            >
              <Word id="Etablera">
                {paths.desktop.letters.map((l, i) => (
                  <Letter ready={firstComplete} key={i}>
                    {l}
                  </Letter>
                ))}
                {/* <g
                  id="Line"
                  transform="translate(267.000000, 1121.000000)"
                  stroke="#FFFFFF"
                  stroke-linecap="square"
                  stroke-width="2"
                >
                  <path d="M1,0 L0.5,24.6212121" fill="#D8D8D8"></path>
                  <path d="M1,24 L1465,24" id="Line-2"></path>
                  <path
                    d="M1465.5,24.6290323 L1465.5,2.37096774"
                    id="Line-3"
                  ></path>
                </g> */}
              </Word>
              <rect
                id="Overflow"
                fill="#000000"
                x="0"
                y="1295"
                width="2000"
                height="1500"
              ></rect>
            </g>
          </svg>
        </h1>
      </Inner>
    </TitleWrapper>
  )
}

export default PageLoaderTitle
