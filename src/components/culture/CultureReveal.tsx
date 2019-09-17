import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import useScrollDisplay from '../../hooks/useScrollDisplay'
import { useUiContext } from '../../contexts/UiContext'

const Container = styled.div`
  height: 100%;
  opacity: ${p => (p.show ? 1 : 0)};
  transform: scale(${p => (p.show ? 1 : 0.8)})
    translateY(${p => (p.show ? 0 : -20)}%) rotate(${p => (p.show ? 0 : -5)}deg);
  transition: all 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  // height: 0px;
  padding-top: 100%;
  position: relative;

  > div {
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }

  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`

const CultureReveal = ({ children }) => {
  const containerRef = useRef()
  const show = useScrollDisplay(containerRef)
  const { animateContent } = useUiContext()

  return (
    <Container show={show && animateContent} ref={containerRef}>
      {children}
    </Container>
  )
}

export default CultureReveal
