import React, { useEffect, useState, useRef } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { useUiContext } from '../../contexts/UiContext'
import { styleRef } from '../../utils'
import { updateSmooth } from '../../utils/scroll/smooth-scroll'
import { unstable_next } from 'scheduler'
import useScheduleEffect from '../../hooks/useScheduleEffect'
import PageLoaderContent from './PageLoaderContent'

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
  // Transform y animation
  const [firstComplete, setFirstComplete] = useState()
  // Scale down animation
  const [secondComplete, setSecondComplete] = useState(false)
  const [leaveAnimation, setAnimationState] = useState<ContainerAnimation>()

  const containerEl = useRef<HTMLElement>()

  const {
    mounted,
    setMounted,
    showHeader,
    setFrontpageLoaded,
    frontpageLoaded,
    animateContent,
  } = useUiContext()

  const completeLoader = () => {
    if (isFrontpage) {
      unstable_next(() => {
        setFrontpageLoaded()
        showHeader()
      })
    }
  }

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setMounted()
      setFirstComplete(true)
      setSecondComplete(true)
    }
  }, [])

  useScheduleEffect(() => {
    if (mounted) {
      completeLoader()
      setAnimationState('none')
    }
  }, [isFrontpage])

  // We only want to animate out the page loader on child pages
  useEffect(() => {
    if (animateContent && !isFrontpage) {
      setAnimationState('translate')
    } else if (animateContent) {
      setAnimationState('none')
    }
  }, [animateContent])

  useScheduleEffect(() => {
    if (firstComplete) {
      const newHeight = `${
        containerEl.current.getBoundingClientRect().height
      }px`
      styleRef(containerEl).height(newHeight)

      setTimeout(() => {
        setSecondComplete(true)
      }, 1000)
    }
  }, [firstComplete])

  useScheduleEffect(() => {
    if (secondComplete) {
      completeLoader()
      setMounted()
    }
  }, [secondComplete])

  useEffect(() => {
    unstable_next(updateSmooth)
  }, [frontpageLoaded, isFrontpage])

  return (
    <Container
      isFrontpage={isFrontpage}
      leaveAnimation={leaveAnimation}
      ref={containerEl}
    >
      <PageLoaderContent
        firstComplete={firstComplete}
        setFirstComplete={setFirstComplete}
        isFrontpage={isFrontpage}
      />
    </Container>
  )
}

export default PageLoader
