import React, { useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import { CASE_INDICATOR_ID } from '../../animation/page-animation'

const Rotate = keyframes`
     100% {
    transform: rotate(360deg);
  }
`
const Dash = keyframes`
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
`

const Loader = styled.div`
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 2000;
  display: none;

  &.show {
    display: block;
  }

  svg {
    animation: ${Rotate} 2s linear infinite;
    z-index: 2;
    width: 25px;
    height: 25px;

    circle {
      stroke: white;
      stroke-linecap: round;
      animation: ${Dash} 1.5s ease-in-out infinite;
    }
  }
`

const TransitionIndicator = () => {
  return (
    <Loader id={CASE_INDICATOR_ID}>
      <svg viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
      </svg>
    </Loader>
  )
}

export default TransitionIndicator
