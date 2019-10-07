import React, { useRef, useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { gutter } from '../vars'
import media from '../media'
import { useSetting } from '../contexts/SettingsContext'
import { scrollToElementCenter } from '../utils/scroll'
import { $scrollTarget } from '../utils/dom-selectors'

const Container = styled.div`
  transition: opacity 0.5s ease;
  opacity: ${p => (p.show ? 1 : 0)};
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
    transform: translateY(0px) rotate(90deg);
  }


  20% {
    transform: translateY(10px) rotate(90deg);
  }
  40% {
    transform: translateY(0px) rotate(90deg);
  }

  100% {
    transform: translateY(0px) rotate(90deg);
  }
`

const Scroll = styled.svg`
  display: block;
  width: 1.5em;
  height: 1.5em;
  animation: ${ScrollAnimation} 5s infinite;
  cursor: pointer;

  path {
    fill: ${p => p.color || p.theme.color};
  }
`

const Message = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(${p => (p.show ? -50 : -60)}%);
  transition: transform 0.4s ease-in, opacity 0.4s ease-in;
  font-size: 0.5rem;
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

const ScrollIndicator = ({ color }: { color?: string }) => {
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState(false)
  const timeoutId = useRef<number>()
  const t = useSetting()
  const mounted = useRef<boolean>()
  const containerEl = useRef<HTMLElement>()

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
    setTimeout(() => {
      mounted.current && setShow(true)
    }, 1500)
  }, [])

  const scrollDown = () => {
    const sibling = $scrollTarget.resolve() as HTMLElement
    if (sibling) {
      scrollToElementCenter(sibling)
    }
  }

  return (
    <Container ref={containerEl} show={show}>
      <Scroll onClick={scrollDown} viewBox="0 0 152 63" color={color}>
        <path d="M115.737 29L92.77 6.283c-.932-.92-1.21-2.84-.617-4.281.594-1.443 1.837-1.862 2.765-.953l28.429 28.116c.574.57.925 1.557.925 2.619 0 1.06-.351 2.046-.925 2.616l-28.43 28.114c-.336.327-.707.486-1.074.486-.659 0-1.307-.509-1.69-1.437-.593-1.442-.315-3.362.617-4.284L115.299 35H3.442C2.032 35 .89 33.656.89 32c0-1.658 1.143-3 2.552-3H115.737z" />
      </Scroll>
      <Message color={color} show={message}>
        {t('scrollIndicator')}
      </Message>
    </Container>
  )
}

export default ScrollIndicator
