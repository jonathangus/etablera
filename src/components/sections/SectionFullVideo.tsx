import React, { useEffect, useRef, memo, useState } from 'react'
import styled from 'styled-components'
import { ISectionFullVideo } from '../../types'
import PlayCursor from '../PlayCursor'
import media from '../../media'
import useScrollDisplay from '../../hooks/useScrollDisplay'
import useScheduleEffect, { SchedulePrio } from '../../hooks/useScheduleEffect'
import DefferedCallbacks from '../../utils/deferred-callbacks'

const Container = styled.div`
  position: relative;
  opacity: ${p => (p.show ? 1 : 0)};
  will-change: opacity;
  transition: opacity 0.65s ease;

  .plyr {
    height: calc(100% * 0.5625);
    max-height: 80vh;
  }

  &:hover {
    cursor: none;
  }

  .plyr__control--overlaid {
    display: none !important;

    ${media.phone`
      display: block !important;
    `}
  }

  iframe {
    width: 100%;
  }
`

const SectionFullVideo = ({ vimeoId, poster }: ISectionFullVideo) => {
  const elem = useRef()
  const show = useScrollDisplay(elem)
  const containerEl = useRef()
  const [showCursor, setShowCursor] = useState(false)
  const [isPlaying, setPlaying] = useState(false)
  const player = useRef<any>()

  const onEnter = () => setShowCursor(true)
  const onLeave = () => setShowCursor(false)

  const initializePlayer = async () => {
    const Plyr = await DefferedCallbacks.Plyr()

    if (elem.current) {
      const options = {
        hideControls: false,
        fullscreen: { enabled: true, fallback: true, iosNative: true },
      }
      player.current = new Plyr(elem.current, options)

      if (poster) {
        player.current.poster = poster.fluid.src
      }

      player.current.toggleControls(false)

      player.current.on('play', () => {
        player.current.toggleControls(true)
        setPlaying(true)
      })

      player.current.on('pause', () => {
        player.current.toggleControls(false)
        setPlaying(false)
      })
    }
  }

  useScheduleEffect(
    () => {
      initializePlayer()
      return () => player.current && player.current.destroy()
    },
    [],
    SchedulePrio.Idle
  )

  return (
    <Container
      show={show}
      onMouseEnter={onEnter}
      ref={containerEl}
      onMouseLeave={onLeave}
    >
      <div className="aplyr__video-embed" ref={elem}>
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?loop=false&amp;byline=false&amp;portrait=false&amp;title=false&amp;speed=true&amp;transparent=0&amp;gesture=media`}
          allowFullScreen
          allow="autoplay"
        />
      </div>
      {showCursor && (
        <PlayCursor parent={containerEl.current} isPlaying={isPlaying} />
      )}
    </Container>
  )
}

export default memo(SectionFullVideo)
