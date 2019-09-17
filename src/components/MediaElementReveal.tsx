import React, { memo, useRef, useState, useEffect } from 'react'
import { IMediaElement } from '../types'
import styled from 'styled-components'
import LazyLoadImage from './LazyLoadImage'
import { easeInCubic, gutter } from '../vars'
import media from '../media'
import Video from './Video'
import get from 'lodash/get'

const Container = styled.div`
  position: relative;
  max-width: 800px;
  display: flex;
  justify-content: flex-end;

  ${media.tablet`
    max-width: 100%;
  `}

  video {
    max-height: 600px;
  }
`

const StyledImage = styled(LazyLoadImage)`
  transition: opacity 0.3s linear, transform 1s ${easeInCubic};
  transform: scale(${p => (p.ready ? 1 : 1.3)});
  will-change: transform;
  opacity: ${p => (p.ready ? 1 : 0)};
  transition-delay: 1s;
`

const Background = styled.div`
  position: absolute;
  pointer-events: none;
  transition: opacity 1s linear;
  z-index: 2;
  height: 100%;
  opacity: ${p => (p.show ? 1 : 0)};
  right: -${gutter * 4}px;
  bottom: -${gutter * 4}px;
  left: ${gutter * 4}px;
  z-index: -1;

  ${media.phone`
    right: -${gutter * 1}px;
    bottom: -${gutter * 1}px;
    left: ${gutter * 1}px;
  `}
`

const Content = styled.div`
  width: 100%;
`

type Props = {
  media: IMediaElement
  className?: string
}

const MediaElementReveal = ({ media, className }: Props) => {
  const elemRef = useRef()
  const [show, setShow] = useState(true)
  const isVideo = get(media, 'file.contentType') === 'video/mp4'
  const image = get(media, 'localFile.childImageSharp.fluid')

  const onVisible = () => {
    setShow(true)
  }

  return (
    <Container className={className} ref={elemRef}>
      <Background show={show} />
      {isVideo && <Video src={media.file.url} />}
      <Content>
        {image && !isVideo && (
          <StyledImage onVisible={onVisible} ready={show} image={image} />
        )}
      </Content>
    </Container>
  )
}

export default memo(MediaElementReveal)
