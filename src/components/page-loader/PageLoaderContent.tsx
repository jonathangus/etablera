import React, { useEffect, useState, useRef } from 'react'
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
import TitleCanvas from './TitleCanvas'
import PageLoaderTitle from './PageLoaderTitle'

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

// const Inner = styled.div`
//   position: relative;
//   opacity: 0;
//   transform: translateY(100%);
//   animation: ${InnerAnimation} 1s cubic-bezier(0.8, 0, 0.2, 1) forwards;
//   max-width: 1000px;
//   margin: 0 auto;

//   height: 0;
//   padding-top: 17.471%;

//   svg {
//     width: 100%;
//     height: 100%;
//     position: absolute;
//     left: 0;
//     top: 0;
//     width: 100%;
//     height: 100%;

//     /* width: 1000px;
//     height: 174.71px; */
//   }

//   h1 {
//     margin: 0;
//     color: transparent;
//     line-height: 0;
//     font-size: 0;
//   }
// `

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
  isFrontpage: boolean
  firstComplete: boolean
  setFirstComplete: Function
}

const Container = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 90%;

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
          <PageLoaderTitle setFirstComplete={setFirstComplete} />
        </Item>
        <Item>{animateContent && <TitleCanvas />}</Item>
      </Inner>
    </Container>
  )

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
    <>
      <Content ref={contentRef}>
        <TitleWrapper id="page-title">
          <Inner ref={innerEl}>
            <h1>
              Etablera
              <svg
                width="1600px"
                height="1200px"
                version="1.1"
                id="Layer_1"
                x="0px"
                y="0px"
                viewBox="0 0 1600 1200"
              >
                <g>
                  <g>
                    <path
                      id="SVGID_1_"
                      d="M1251.2,586.3c-7.2,0-13,2.4-17.4,7.1c-4.5,4.7-6.7,11.3-6.7,19.6c0,8.5,2.2,15.2,6.7,19.9
				c4.5,4.7,10.3,7.1,17.4,7.1c6.9,0,12.6-2.4,17.1-7.2c4.5-4.8,6.8-11.4,6.8-19.8c0-8.2-2.3-14.7-6.8-19.5
				C1263.8,588.7,1258.1,586.3,1251.2,586.3z M1235.3,546.3c9.1,0,17.1,2,23.8,5.9c6.7,4,11.7,9.4,15,16.4v-20.7h45.5v130.5h-45.5
				v-20.7c-3.3,7-8.2,12.5-15,16.4c-6.7,4-14.7,5.9-23.8,5.9c-10.4,0-19.8-2.6-28.1-8c-8.4-5.4-14.9-13.1-19.8-23.2
				c-4.8-10.1-7.2-22-7.2-35.7s2.4-25.5,7.2-35.6c4.8-10.1,11.4-17.8,19.8-23.1C1215.6,548.9,1225,546.3,1235.3,546.3z
				 M1128.1,571.9c5.2-7.7,11.6-13.9,19.4-18.6s16.1-7,24.8-7V595h-13.3c-10.3,0-18,2-23.2,5.9c-5.2,4-7.7,10.8-7.7,20.5v56.2h-46
				V547.4h46.1V571.9z M1018,602.3c0.1-6.8-1.6-11.9-5.4-15.4s-8.4-5.2-14.1-5.2c-6.1,0-11.1,1.8-14.9,5.2s-6,8.6-6.7,15.4H1018z
				 M1063.7,610.7c0,3.3-0.4,6.8-1.2,10.7H976c0.8,14.7,7.2,22.1,19.4,22.1c4.5,0,8.2-1.1,11.2-3.3c3-2.1,5-5,6-8.6h48.5
				c-1.7,9.1-5.5,17.4-11.5,24.7c-5.9,7.4-13.4,13.2-22.4,17.3s-18.9,6.3-29.7,6.3c-13.1,0-24.6-2.6-34.6-8
				c-10-5.4-17.9-13.1-23.5-23.2c-5.6-10.1-8.4-22-8.4-35.7s2.8-25.5,8.4-35.6c5.6-10.1,13.5-17.8,23.5-23.1c10.1-5.4,21.6-8,34.6-8
				c13.1,0,24.6,2.6,34.6,7.9c9.9,5.3,17.7,12.8,23.2,22.5C1061,586.5,1063.7,597.8,1063.7,610.7z M912.9,506.3v172.6h-45.7V506.3
				H912.9z M779,586.3c-6.9,0-12.6,2.4-17.1,7.2c-4.5,4.8-6.8,11.3-6.8,19.5c0,8.4,2.3,15,6.8,19.8s10.2,7.2,17.1,7.2
				c7.2,0,13-2.4,17.4-7.1c4.5-4.7,6.7-11.3,6.7-19.9c0-8.4-2.2-14.9-6.7-19.6C792,588.7,786.2,586.3,779,586.3z M793.8,546.3
				c10.4,0,19.8,2.6,28.1,8c8.4,5.4,14.9,13,19.8,23.1c4.8,10.1,7.2,21.9,7.2,35.6c0,13.7-2.4,25.6-7.2,35.7
				c-4.8,10.1-11.4,17.9-19.8,23.2c-8.4,5.4-17.8,8-28.1,8c-9.1,0-17.1-2-23.7-5.9c-6.7-4-11.6-9.4-14.9-16.4v20.7h-45.8v-172h45.7
				v62.3c3.3-7,8.2-12.5,14.9-16.4C776.7,548.2,784.7,546.3,793.8,546.3z M614.7,586.3c-7.2,0-13,2.4-17.4,7.1
				c-4.5,4.7-6.7,11.3-6.7,19.6c0,8.5,2.2,15.2,6.7,19.9c4.5,4.7,10.3,7.1,17.4,7.1c6.9,0,12.6-2.4,17.1-7.2
				c4.5-4.8,6.8-11.4,6.8-19.8c0-8.2-2.3-14.7-6.8-19.5C627.3,588.7,621.6,586.3,614.7,586.3z M599.9,546.3c9.1,0,17.1,2,23.8,5.9
				c6.7,4,11.7,9.4,15,16.4v-20.7h45.5v130.5h-45.5v-20.7c-3.3,7-8.2,12.5-15,16.4c-6.7,4-14.7,5.9-23.8,5.9
				c-10.4,0-19.8-2.6-28.1-8c-8.4-5.4-14.9-13.1-19.8-23.2c-4.8-10.1-7.2-22-7.2-35.7s2.4-25.5,7.2-35.6
				c4.8-10.1,11.4-17.8,19.8-23.1C580.2,548.9,589.6,546.3,599.9,546.3z M531.2,639.7v39.1h-18.9c-16.1,0-28.6-4-37.6-11.9
				c-9-7.9-13.5-21-13.5-39.4v-41.2h-16.8v-38.2h16.8v-31.7h46v31.7h23.6v38.2h-23.6v42.1c0,4,0.9,6.9,2.7,8.6
				c1.8,1.7,4.8,2.6,9,2.6L531.2,639.7L531.2,639.7z M371.4,550.8V578h53.4v34.6h-53.4v29.8h60.4v36.5H325.5V514.3h106.3v36.5
				L371.4,550.8L371.4,550.8z"
                    />

                    <rect
                      x="322.7"
                      y="503.5"
                      class="st0"
                      width="999.7"
                      height="179.2"
                    />
                  </g>
                </g>
              </svg>
            </h1>
          </Inner>
        </TitleWrapper>
        {/* {isFrontpage && <EtableraDescription />} */}
      </Content>
      <TitleCanvas />
    </>
  )
}

export default PageLoaderContent
