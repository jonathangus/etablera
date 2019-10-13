import React, { useRef, memo } from 'react'
import styled from 'styled-components'
import { ISectionFullVideo } from '../../types'
import useScrollDisplay from '../../hooks/useScrollDisplay'
import Grid from '../Grid'

const Container = styled(Grid)`
  position: relative;
  padding: 0 !important;
  opacity: ${p => (p.show ? 1 : 0)};
  will-change: opacity;
  transition: opacity 0.65s ease;
  max-width: 1400px;
  margin: 0 auto;
`

const IFrameWrapper = styled.div`
  position: relative;
  overflow: hidden;
  padding-top: 56.25%;
  iframe {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    border: 0;
  }
`

const SectionFullVideo = ({ vimeoId, poster }: ISectionFullVideo) => {
  const containerEl = useRef()
  const show = useScrollDisplay(containerEl)

  return (
    <Container show={show} ref={containerEl}>
      <IFrameWrapper>
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?loop=false&amp;byline=false&amp;portrait=false&amp;title=false&amp;speed=true&amp;transparent=0&amp;gesture=media`}
          allowFullScreen
          allow="autoplay"
        />
      </IFrameWrapper>
    </Container>
  )
}

export default memo(SectionFullVideo)
