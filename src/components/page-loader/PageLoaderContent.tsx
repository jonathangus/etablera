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

  max-width: 1000px;
  margin: 0 auto;

  svg {
    width: 1000px;
    height: 174.71px;
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
  isFrontpage: boolean
  firstComplete: boolean
  setFirstComplete: Function
}

const PageLoaderContent = ({
  isFrontpage,
  firstComplete,
  setFirstComplete,
}: Props) => {
  const innerEl = useRef<HTMLElement>()
  const contentRef = useRef<HTMLElement>()
  const mainHeroRef = useRef<HTMLElement>(mainHero.resolve())
  const { pageTransitionActive } = useUiContext()
  const t = useSetting()

  useSmooth(() => {
    if (isFrontpage && !pageTransitionActive) {
      return new SmoothEtablera(mainHero.resolve(), contentRef.current)
    }
  }, [t.currentLanguage, isFrontpage, pageTransitionActive])

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
                width="258px"
                height="45px"
                viewBox="0 0 258 45"
                version="1.1"
                preserveAspectRatio="none"
              >
                <g
                  id="Page-1"
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
                  <g id="svg-dos" fill="#FFFFFF" fill-rule="nonzero">
                    <polygon
                      id="Path"
                      points="12.82 11.34 12.82 18.34 26.56 18.34 26.56 27.28 12.82 27.28 12.82 34.96 28.36 34.96 28.36 44.38 0.96 44.38 0.96 1.92 28.36 1.92 28.36 11.34"
                    ></polygon>
                    <path
                      d="M53.8,34.32 L53.8,44.4 L48.96,44.4 C44.84,44.4 41.62,43.38 39.3,41.34 C36.98,39.3 35.82,35.92 35.82,31.2 L35.82,20.58 L31.5,20.58 L31.5,10.74 L35.82,10.74 L35.82,2.58 L47.64,2.58 L47.64,10.74 L53.7,10.74 L53.7,20.58 L47.64,20.58 L47.64,31.44 C47.5622782,32.2426611 47.8109745,33.0428144 48.33,33.66 C48.9892743,34.1633219 49.8143329,34.3990529 50.64,34.32 L53.8,34.32 Z"
                      id="Path"
                    ></path>
                    <path
                      d="M77.83,11.85 C79.5277475,12.8241791 80.8802753,14.3025234 81.7,16.08 L81.7,10.74 L93.46,10.74 L93.46,44.4 L81.7,44.4 L81.7,39.06 C80.8802753,40.8374766 79.5277475,42.3158209 77.83,43.29 C75.9552444,44.3446665 73.830393,44.873288 71.68,44.82 C69.1100853,44.8514935 66.5868751,44.1320658 64.42,42.75 C62.1809546,41.2791436 60.4109264,39.1967575 59.32,36.75 C56.8402317,30.8707851 56.8402317,24.2392149 59.32,18.36 C60.4109264,15.9132425 62.1809546,13.8308564 64.42,12.36 C66.5868751,10.9779342 69.1100853,10.2585065 71.68,10.29 C73.8331739,10.2458439 75.9582045,10.7848761 77.83,11.85 Z M71.11,22.47 C69.9043796,23.8744657 69.2912849,25.6922377 69.4,27.54 C69.2849954,29.4068119 69.8979092,31.2455533 71.11,32.67 C72.2653526,33.8975644 73.895501,34.5649406 75.58,34.5 C77.2403396,34.5428852 78.8378593,33.8644864 79.96,32.64 C81.1810599,31.2309082 81.8051853,29.4015754 81.7,27.54 C81.7883979,25.7110341 81.1647525,23.9189496 79.96,22.54 C78.8378593,21.3155136 77.2403396,20.6371148 75.58,20.68 C73.9016898,20.6047503 72.2724965,21.2571565 71.11,22.47 L71.11,22.47 Z"
                      id="Shape"
                    ></path>
                    <path
                      d="M128.96,12.39 C131.199045,13.8608564 132.969074,15.9432425 134.06,18.39 C136.539768,24.2692149 136.539768,30.9007851 134.06,36.78 C132.969074,39.2267575 131.199045,41.3091436 128.96,42.78 C126.793125,44.1620658 124.269915,44.8814935 121.7,44.85 C119.558841,44.9058658 117.442968,44.3768976 115.58,43.32 C113.895071,42.3389218 112.55403,40.8616819 111.74,39.09 L111.74,44.43 L99.96,44.43 L99.96,0.03 L111.76,0.03 L111.76,16.11 C112.57403,14.3383181 113.915071,12.8610782 115.6,11.88 C117.462968,10.8231024 119.578841,10.2941342 121.72,10.35 C124.280106,10.3134478 126.795587,11.0222296 128.96,12.39 Z M113.42,22.5 C112.215248,23.8789496 111.591602,25.6710341 111.68,27.5 C111.574815,29.3615754 112.19894,31.1909082 113.42,32.6 C114.542141,33.8244864 116.13966,34.5028852 117.8,34.46 C119.484499,34.5249406 121.114647,33.8575644 122.27,32.63 C123.465068,31.2127487 124.070068,29.3905874 123.96,27.54 C124.068715,25.6922377 123.45562,23.8744657 122.25,22.47 C121.094647,21.2424356 119.464499,20.5750594 117.78,20.64 C116.133498,20.6087237 114.55287,21.2861356 113.44,22.5 L113.42,22.5 Z"
                      id="Shape"
                    ></path>
                    <polygon
                      id="Path"
                      points="152.5 0 152.5 44.4 140.68 44.4 140.68 0"
                    ></polygon>
                    <path
                      d="M191.08,29.7 L168.82,29.7 C169.02,33.5 170.686667,35.4 173.82,35.4 C174.845715,35.4399226 175.856579,35.1450872 176.7,34.56 C177.451291,34.0129723 177.999933,33.232212 178.26,32.34 L190.74,32.34 C190.308529,34.6819458 189.297826,36.8786778 187.8,38.73 C186.255264,40.6492105 184.282614,42.1800691 182.04,43.2 C179.650462,44.2950717 177.04836,44.8482744 174.42,44.82 C171.323993,44.8824524 168.261382,44.1709367 165.51,42.75 C162.961909,41.3856723 160.874328,39.2980913 159.51,36.75 C156.629797,30.9583184 156.629797,24.1516816 159.51,18.36 C160.890324,15.8033182 162.999711,13.7148172 165.57,12.36 C171.172834,9.61947397 177.727166,9.61947397 183.33,12.36 C185.856209,13.6713738 187.942312,15.6948937 189.33,18.18 C190.791103,20.8645468 191.525357,23.8842934 191.46,26.94 C191.424433,27.8702603 191.29715,28.7947402 191.08,29.7 Z M177.96,20.88 C176.975728,19.9912174 175.685509,19.5181371 174.36,19.56 C172.968543,19.5008076 171.606596,19.9726632 170.55,20.88 C169.500162,21.9120595 168.887833,23.3085995 168.84,24.78 L179.34,24.78 C179.483881,23.3393417 178.977954,21.9095474 177.96,20.88 L177.96,20.88 Z"
                      id="Shape"
                    ></path>
                    <path
                      d="M212.96,12.24 C214.873135,11.0642727 217.074467,10.4412542 219.32,10.44 L219.32,23.04 L215.86,23.04 C213.193333,23.04 211.213333,23.55 209.92,24.57 C208.626667,25.59 207.96,27.36 207.92,29.88 L207.92,44.4 L196.12,44.4 L196.12,10.74 L207.96,10.74 L207.96,17.04 C209.240552,15.08108 210.950465,13.4395632 212.96,12.24 Z"
                      id="Path"
                    ></path>
                    <path
                      d="M241.81,11.85 C243.507748,12.8241791 244.860275,14.3025234 245.68,16.08 L245.68,10.74 L257.44,10.74 L257.44,44.4 L245.68,44.4 L245.68,39.06 C244.860275,40.8374766 243.507748,42.3158209 241.81,43.29 C239.935244,44.3446665 237.810393,44.873288 235.66,44.82 C233.090085,44.8514935 230.566875,44.1320658 228.4,42.75 C226.160955,41.2791436 224.390926,39.1967575 223.3,36.75 C220.820232,30.8707851 220.820232,24.2392149 223.3,18.36 C224.390926,15.9132425 226.160955,13.8308564 228.4,12.36 C230.566875,10.9779342 233.090085,10.2585065 235.66,10.29 C237.813174,10.2458439 239.938204,10.7848761 241.81,11.85 Z M235.09,22.47 C233.88438,23.8744657 233.271285,25.6922377 233.38,27.54 C233.264995,29.4068119 233.877909,31.2455533 235.09,32.67 C236.245353,33.8975644 237.875501,34.5649406 239.56,34.5 C241.227248,34.5487364 242.833241,33.8698395 243.96,32.64 C245.18106,31.2309082 245.805185,29.4015754 245.7,27.54 C245.788398,25.7110341 245.164752,23.9189496 243.96,22.54 C242.840557,21.2953644 241.233554,20.6014313 239.56,20.64 C237.875501,20.5750594 236.245353,21.2424356 235.09,22.47 L235.09,22.47 Z"
                      id="Shape"
                    ></path>
                  </g>
                </g>
              </svg>
              {/* <svg
                id="logo1"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 258 45"
              >
                {letters.map((l, i) => (
                  <Letter
                    d={l.d}
                    ready={firstComplete}
                    key={i}
                    transform={`translate(${l.transform[0]} ${l.transform[1]})`}
                    index={i + 1}
                  />
                ))}
              </svg> */}
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
