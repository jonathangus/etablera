import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import Image from '../Image'
import media from '../../media'
import SmoothFullImage from '../../utils/scroll/SmoothFullImage'
import useSmooth from '../../hooks/useSmooth'
import { $headerTextDiff } from '../../utils/dom-selectors'

const Container = styled.div`
  max-height: 90vh;
  overflow: hidden;

  ${media.desktop`
    height: auto;
  `}

  img {
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`

const Inner = styled.div``

const SectionImage = ({ image }) => {
  const el = useRef()

  useSmooth(() => new SmoothFullImage(el.current))

  return (
    <Container>
      <Inner ref={el}>{image && <Image image={image.fluid} />}</Inner>
    </Container>
  )
}

export default SectionImage
