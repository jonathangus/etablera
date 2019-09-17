import React, {
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
  RefForwardingComponent,
} from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import CaseImage from './CaseImage'
import CaseVideo from './CaseVideo'
import {
  animateToCase,
  CASE_ANIMATION_DURATION,
  CASE_ANIMATION_CONTAINER_ID,
  resetContainerStyle,
  classStates,
} from '../../animation/page-animation'
import { ICase } from '../../types'
import useScheduleEffect, { SchedulePrio } from '../../hooks/useScheduleEffect'
import { $mediaImage } from '../../utils/dom-selectors'

const CaseMediaGlobalStyle = createGlobalStyle`
  .${classStates.ANIMATION_VIDEO} {
    position: relative !important;

    .${$mediaImage.class} {
      opacity: 0;
    }
  }
`

const Container = styled.div<{ detailPage: boolean }>`
  height: 100%;
  overflow: hidden;
  transition: transform ${CASE_ANIMATION_DURATION}ms
    cubic-bezier(0.2, 0.6, 0.2, 1);
  display: block;
  transform-origin: top left;

  .${$mediaImage.mediaImageClass} {
    opacity: ${p => (p.showImage ? 1 : 0)};
  }

  &.fullscreen {
    z-index: 1010;
  }
`

const Inner = styled.div`
  height: 100%;
  width: 100%;
`

type Props = {
  item: ICase
  id?: string
  detailPage?: boolean
}

export interface ICaseMediaHandler {
  zoom(withScrollCenter: boolean): Promise<any>
}

const CaseMedia: RefForwardingComponent<ICaseMediaHandler, Props> = (
  { item, id, detailPage = false }: Props,
  ref
) => {
  const [showImage, setShowImage] = useState(true)
  const containerRef = useRef()
  const innerRef = useRef()
  const onPlay = () => {
    setShowImage(false)
  }

  useScheduleEffect(
    () => {
      const container = document.getElementById(CASE_ANIMATION_CONTAINER_ID)
      const onChange = () => {
        window.removeEventListener('resize', onChange)
        resetContainerStyle(container)
      }

      if (container) {
        window.addEventListener('resize', onChange)
      }

      return () => {
        container && window.removeEventListener('resize', onChange)
      }
    },
    [],
    SchedulePrio.Low
  )

  useImperativeHandle(ref, () => ({
    zoom: (withScrollCenter: boolean) =>
      animateToCase(containerRef.current, withScrollCenter),
  }))

  return (
    <>
      <CaseMediaGlobalStyle />
      <Container
        showImage={showImage}
        ref={containerRef}
        detailPage={detailPage}
        id={id}
      >
        <Inner ref={innerRef}>
          <CaseImage image={item.mainImage} />
          <CaseVideo onPlay={onPlay} item={item} />
        </Inner>
      </Container>
    </>
  )
}

export default forwardRef(CaseMedia)
