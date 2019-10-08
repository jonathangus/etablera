import React, { useRef, useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { gutter } from '../vars'
import media from '../media'
import { useSetting } from '../contexts/SettingsContext'
import { scrollToElementCenter, scrollToElement } from '../utils/scroll'
import { $scrollTarget } from '../utils/dom-selectors'
import DefferedCallbacks from '../utils/deferred-callbacks'

const Container = styled.div`
  position: absolute;
  right: ${gutter * 2}px;
  bottom: ${gutter * 4}px;
  z-index: 20;

  ${media.phone`
    bottom: 128px;
    right: ${gutter}px;
  `}
`

const ScrollAnimation = keyframes`
  0% {
    transform: translateY(0px) ;
  }


  20% {
    transform: translateY(10px) ;
  }
  40% {
    transform: translateY(0px) ;
  }

  100% {
    transform: translateY(0px) ;
  }
`

const Scroll = styled.svg`
  display: block;
  height: 53px;
  animation: ${ScrollAnimation} 5s infinite;
  cursor: pointer;

  path {
    stroke: ${p => p.color || p.theme.color};
    transition: stroke 0.3s ease;
  }

  ${media.phone`
  height: 33px;

  `}
`

const Message = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(${p => (p.show ? -50 : -60)}%);
  transition: transform 0.4s ease-in, opacity 0.4s ease-in;
  font-size: 0.8rem;
  opacity: ${p => (p.show ? 1 : 0)};
  pointer-events: none;
  width: 500px;
  text-align: right;
  padding-right: 40px;
  color: ${p => p.color || p.theme.color};

  ${media.phone`
    display:none;
  `}
`

type Props = {
  color?: string
  align?: 'top' | 'center'
}

const ScrollIndicator = ({ color, align = 'center' }: Props) => {
  const [message, setMessage] = useState(false)
  const timeoutId = useRef<number>()
  const t = useSetting()
  const mounted = useRef<boolean>()
  const containerEl = useRef<HTMLElement>()
  const pathEl = useRef<SVGPathElement>()

  const showArrow = async () => {
    const anime = await DefferedCallbacks.anime()

    anime({
      targets: pathEl.current,
      strokeDashoffset: {
        value: [anime.setDashoffset, 0],
        duration: 900,
        delay: 1500,
        direction: 'alternate',
        easing: 'linear',
      },
    })
  }

  const onScroll = () => {
    setMessage(false)
    window.removeEventListener('scroll', onScroll)
    clearTimeout(timeoutId.current)
  }

  useEffect(() => {
    mounted.current = true

    timeoutId.current = window.setTimeout(() => {
      mounted.current && setMessage(true)
    }, 4500)

    window.addEventListener('scroll', onScroll)

    return () => {
      mounted.current = false
      clearTimeout(timeoutId.current)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    showArrow()
  }, [])

  const scrollDown = () => {
    const sibling = $scrollTarget.resolve() as HTMLElement
    if (sibling) {
      if (align === 'center') {
        scrollToElementCenter(sibling)
      } else if (align === 'top') {
        scrollToElement(sibling)
      }
    }
  }

  return (
    <Container ref={containerEl}>
      <Scroll
        onClick={scrollDown}
        width="19"
        height="55"
        viewBox="0 0 19 55"
        color={color}
      >
        <path
          ref={pathEl}
          d="M9.56944 0.526062L9.56944 54.0942M9.56944 54.0942L18.5725 45.0912M9.56944 54.0942L0.566408 45.0912"
          stroke="white"
          strokeDasharray="82px"
        />
      </Scroll>
      <Message color={color} show={message}>
        {t('scrollIndicator')}
      </Message>
    </Container>
  )
}

export default ScrollIndicator
