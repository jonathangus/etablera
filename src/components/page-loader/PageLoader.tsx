import React, { useEffect, useState, useRef } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { useUiContext } from '../../contexts/UiContext'
import { updateSmooth } from '../../utils/scroll/smooth-scroll'
import { unstable_next, unstable_scheduleCallback } from 'scheduler'
import useScheduleEffect, { SchedulePrio } from '../../hooks/useScheduleEffect'
import PageLoaderContent from './PageLoaderContent'
import media from '../../media'
import debounce from 'lodash/debounce'
import useResize from '../../hooks/useResize'
import { $pageLoaderHeight } from '../../utils/dom-selectors'
import PageLoaderTitle from './PageLoaderTitle'

const AnimateOut = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1
  }

  100% {
    transform: translateY(-100%)
  }
`

const animateOutScreen = css`
  animation: ${AnimateOut} 0.6s cubic-bezier(0.7, 0, 0.3, 1) forwards;
`

type ContainerAnimation = 'translate' | 'none'

const Container = styled.div<{
  isFrontpage: boolean
  leaveAnimation: ContainerAnimation
}>`
  position: fixed;
  z-index: 3000;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: ${p => p.theme.backgroundColor};
  pointer-events: none; 
  will-change: transform;
  overflow: hidden;

  ${p => p.leaveAnimation === 'translate' && animateOutScreen}

   ${p =>
     p.leaveAnimation === 'none' &&
     `
      animation: none;
      transform: translateY(-100%)
   `}

  ${p =>
    p.isFrontpage &&
    `
        animation: none;
        background: none;
        transform: none;
    `};
`

type Props = {
  isFrontpage: boolean
}

const PageLoader = ({ isFrontpage }: Props) => {
  const { setPageLoaderAnimationDone, mounted, setMounted } = useUiContext()
  const containerEl = useRef<HTMLElement>()
  const [leaveAnimation, setAnimationState] = useState<ContainerAnimation>()

  const onDone = () => {
    setMounted()
    setAnimationState(isFrontpage ? 'none' : 'translate')
  }

  return (
    <Container ref={containerEl} leaveAnimation={leaveAnimation}>
      <PageLoaderTitle onDone={onDone} />
    </Container>
  )
}

export default PageLoader
