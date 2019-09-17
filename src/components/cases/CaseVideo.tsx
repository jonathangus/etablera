import React, { useState, useRef, memo } from 'react'
import styled from 'styled-components'
import { getVideoSrcFromCase } from '../../utils'
import useResize from '../../hooks/useResize'
import useScheduleEffect, { SchedulePrio } from '../../hooks/useScheduleEffect'

const Video = styled.video`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  object-fit: cover;
  object-position: center;
  z-index: 5;
`

const videoCache = {}

const CaseVideo = ({ item, onPlay }) => {
  const videoRef = useRef<HTMLMediaElement>()
  const vidSrc = getVideoSrcFromCase(item)
  const [src, setSrc] = useState(videoCache[vidSrc])
  const observer = useRef<IntersectionObserver>()

  // Priotize fetching other resources then these large video files.
  useScheduleEffect(
    () => {
      const videoSrc = getVideoSrcFromCase(item)
      videoCache[videoSrc] = videoSrc
      setSrc(videoSrc)
    },
    [],
    SchedulePrio.Idle
  )

  const setListener = () => {
    observer.current = new IntersectionObserver(entries => {
      const isVisible = entries.some(entry => entry.intersectionRatio > 0)
      if (isVisible) {
        videoRef.current.play().catch(() => {})
      } else {
        videoRef.current.pause()
      }
    })
    observer.current.observe(videoRef.current)
  }

  useScheduleEffect(() => {
    if (src) {
      setListener()
    }

    return () => {
      observer.current && observer.current.unobserve(videoRef.current)
    }
  }, [src])

  useResize(() => {
    const videoSrc = getVideoSrcFromCase(item)
    setSrc(videoSrc)
  })

  const onPlaying = () => {
    onPlay()
    videoRef.current.setAttribute('video-started', 'true')
  }

  const onLoadedMetadata = () => {
    videoRef.current.setAttribute('metadata-loaded', 'true')
  }

  return (
    <Video
      ref={videoRef}
      onLoadedMetadata={onLoadedMetadata}
      onPlaying={onPlaying}
      playsInline
      loop
      muted
    >
      {src && <source src={src} type="video/mp4" />}
    </Video>
  )
}

export default memo(CaseVideo)
