import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { IGatsbyImage } from '../types'
import LazyLoadImage from './LazyLoadImage'
import { easeInCubic } from '../vars'

const Container = styled.div`
  height: 100%;
  position: relative;
  overflow: hidden;
`

const StyledImage = styled(LazyLoadImage)`
  transition: transform 1s ${easeInCubic};
  transform: scale(${p => (p.show ? 1 : 1.3)});
  will-change: transform;
`

const Overlay = styled.div`
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  pointer-events: none;
  background: ${p => p.theme.backgroundColor};
  transition: transform 1s ${easeInCubic};
  transform: scaleY(${p => (p.show ? 0 : 1)});
  transform-origin: top;
  will-change: transform;
  z-index: 2;
`

type Props = {
  image: IGatsbyImage
  bgColor?: string
}

const ImageReveal = ({ image }: Props) => {
  const [show, setShow] = useState(false)
  const elem = useRef()

  return (
    <Container ref={elem}>
      <Overlay show={show} />
      <StyledImage
        show={show}
        image={image}
        onVisible={() => {
          elem.current && setShow(true)
        }}
      />
    </Container>
  )
}

export default ImageReveal
