import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useUiContext } from '../../contexts/UiContext'
import LazyLoadImage from '../LazyLoadImage'
import { IGatsbyImage } from '../../types'
import RotateIn from '../RotateIn'

const Container = styled(RotateIn)`
  height: 100%;

  // height: 0px;
  padding-top: 100%;
  position: relative;
  transition-delay: 0.2s;

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

const Image = styled(LazyLoadImage)`
  max-height: 100%;
  object-fit: cover;
`

type Props = {
  image: IGatsbyImage
}
const CultureReveal = ({ image }: Props) => {
  const [show, setShow] = useState()
  const { animateContent } = useUiContext()

  return (
    <Container show={show && animateContent}>
      <Image image={image} onVisible={() => setShow(true)} />
    </Container>
  )
}

export default CultureReveal
