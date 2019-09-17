import React, { memo } from 'react'
import styled from 'styled-components'
import { IGatsbyImage } from '../../types'
import LazyLoadImage from '../LazyLoadImage'
import { $mediaImage } from '../../utils/dom-selectors'

const Wrapper = styled.div`
  height: 100%;
  position: absolute;
  left: 0;
  width: 100%;
  z-index: 1;
  transition: opacity 0.3s ease;
  z-index: 10;

  img {
    height: 100%;
  }

  picture {
    height: 100%;
    display: block;

    img {
      object-fit: cover;
      height: 100%;
      object-position: center;
    }
  }
`

type Props = {
  image: IGatsbyImage
}

const CaseImage = ({ image }: Props) => {
  return (
    <Wrapper {...$mediaImage.attr} className={$mediaImage.mediaImageClass}>
      <LazyLoadImage alt={image.title} image={image} />
    </Wrapper>
  )
}

export default memo(CaseImage)
