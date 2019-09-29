import React, { useEffect, useState, useRef } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { gutter } from '../../vars'
import media from '../../media'
import letters from './etablera-letters'
import { mainHero } from '../../utils/dom-selectors'

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
  height: 100%;
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
  /* max-width: 1000px; */
  margin: 0 auto;

  svg {
    width: 100%;
    height: 100%;

    /* width: 1000px;
    height: 174.71px; */
  }

  path,
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

const Content = styled.div`
  position: absolute;
  will-change: transform, opacity;
  top: 50%;
  left: 50%;
  width: 100%;

  transform: translate(-50%, -50%);
  /* margin-top: -3%; // To center */
`

type Props = {
  setFirstComplete: Function
}

const PageLoaderTitle = ({ setFirstComplete }: Props) => {
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
            version="1.1"
            id="Layer_1"
            x="0px"
            y="0px"
            viewBox="0 0 2000 2000"
          >
            <path
              d="M1793.4,986.1c-13.2,0-24.1,4.3-32.2,13.2c-8.2,8.7-12.3,20.9-12.3,36.3c0,15.6,4.1,28.1,12.3,36.8
	c8.2,8.7,19,13.2,32.2,13.2c12.7,0,23.3-4.3,31.5-13.2c8.4-8.9,12.5-21.2,12.5-36.6c0-15.2-4.1-27.2-12.5-36.1
	C1816.8,990.7,1806.2,986.1,1793.4,986.1z M1764.1,912.1c16.8,0,31.5,3.6,44,11.1c12.5,7.5,21.6,17.6,27.7,30.3v-38.2h84.2v241.5
	h-84.2v-38.2c-6,13-15.2,23.1-27.7,30.3c-12.5,7.5-27.2,11.1-44,11.1c-19.2,0-36.6-4.8-52.2-14.9c-15.4-9.9-27.7-24.3-36.6-43.1
	c-8.9-18.8-13.2-40.9-13.2-66.1c0-25.3,4.3-47.1,13.2-65.9s21.2-32.9,36.6-42.8C1727.5,917.1,1744.8,912.1,1764.1,912.1z
	 M1565.4,959.4c9.6-14.4,21.4-25.7,35.8-34.4c14.4-8.7,29.8-13,45.9-13v90.2h-24.8c-19,0-33.4,3.6-42.8,11.1
	c-9.6,7.5-14.4,20-14.4,38v103.9h-85.1v-241h85.4V959.4z M1361.7,1015.7c0.2-12.5-3.1-22.1-10.1-28.4c-7-6.5-15.6-9.6-26.2-9.6
	c-11.3,0-20.4,3.4-27.7,9.6c-7.2,6.5-11.3,15.9-12.3,28.4H1361.7z M1446.4,1031.3c0,6-0.7,12.5-2.2,19.7H1284
	c1.4,27.2,13.5,40.9,35.8,40.9c8.4,0,15.2-1.9,20.7-6c5.5-3.8,9.1-9.4,11.3-15.9h89.9c-3.1,16.8-10.3,32.2-21.2,45.7
	c-11.1,13.7-24.8,24.3-41.6,32c-16.6,7.7-34.9,11.5-54.8,11.5c-24.3,0-45.5-4.8-64.2-14.9c-18.5-9.9-33.2-24.3-43.5-43.1
	c-10.3-18.8-15.4-40.9-15.4-66.1c0-25.3,5.1-47.1,15.4-65.9s25-32.9,43.5-42.8c18.8-9.9,39.9-14.9,64-14.9c24.3,0,45.5,4.8,64,14.7
	c18.5,9.9,32.7,23.6,43.1,41.6C1441.3,986.6,1446.4,1007.5,1446.4,1031.3z M1167.2,838.2v319.4h-84.7V838.2H1167.2z M919.4,986.1
	c-12.7,0-23.3,4.3-31.5,13.2c-8.4,8.9-12.5,20.9-12.5,36.1c0,15.4,4.1,27.7,12.5,36.6s19,13.2,31.5,13.2c13.2,0,24.1-4.3,32.2-13.2
	c8.2-8.7,12.3-20.9,12.3-36.8c0-15.4-4.1-27.7-12.3-36.3C943.5,990.7,932.7,986.1,919.4,986.1z M946.8,912.1
	c19.2,0,36.6,4.8,52.2,14.9c15.6,10.1,27.7,24.1,36.6,42.8c8.9,18.8,13.2,40.6,13.2,65.9c0,25.3-4.3,47.4-13.2,66.1
	s-21.2,33.2-36.6,43.1c-15.4,9.9-32.9,14.9-52.2,14.9c-16.8,0-31.5-3.6-43.8-11.1c-12.3-7.5-21.6-17.6-27.4-30.3v38.2h-84.9V838.2
	h84.7v115.4c6-13,15.2-23.1,27.4-30.3C915.1,915.7,930,912.1,946.8,912.1z M615.4,986.1c-13.2,0-24.1,4.3-32.2,13.2
	c-8.2,8.7-12.3,20.9-12.3,36.3c0,15.6,4.1,28.1,12.3,36.8s19,13.2,32.2,13.2c12.7,0,23.3-4.3,31.5-13.2c8.4-8.9,12.5-21.2,12.5-36.6
	c0-15.2-4.1-27.2-12.5-36.1C638.5,990.7,627.9,986.1,615.4,986.1z M588,912.1c16.8,0,31.5,3.6,44,11.1c12.5,7.5,21.6,17.6,27.7,30.3
	v-38.2h84.2v241.5h-84.2v-38.2c-6,13-15.2,23.1-27.7,30.3c-12.5,7.5-27.2,11.1-44,11.1c-19.2,0-36.6-4.8-52.2-14.9
	c-15.4-9.9-27.7-24.3-36.6-43.1c-8.9-18.8-13.2-40.9-13.2-66.1c0-25.3,4.3-47.1,13.2-65.9c8.9-18.8,21.2-32.9,36.6-42.8
	C551.5,917.1,568.8,912.1,588,912.1z M460.8,1085.2v72.4h-34.9c-29.8,0-52.9-7.5-69.5-22.1c-16.6-14.7-25-39-25-72.9v-76.2h-31
	v-70.7h31V857h85.1v58.7h43.8v70.7h-43.8v77.9c0,7.5,1.7,12.7,5.1,15.9c3.4,3.1,8.9,4.8,16.6,4.8h22.6V1085.2z M165,920.5v50.3h98.8
	v64.2H165v55.1h111.8v67.6H80.1V852.9h196.7v67.6H165L165,920.5z"
            />
          </svg>
        </h1>
      </Inner>
    </TitleWrapper>
  )
}

export default PageLoaderTitle
