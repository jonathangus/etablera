import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { gutter } from '../vars'
import debounce from 'lodash/debounce'
import media from '../media'

const items = ['Kommunkation', 'Hemsidor', 'Filmer', 'Foto']

const Wrapper = styled.div`
  overflow: hidden;
  margin-bottom: 20vh;
  padding-left: 10vw;
`
const Container = styled.div`
  display: flex;
  text-transform: uppercase;
  color: ${p => p.theme.scrollLooper};
  transition: ${p => p.theme.transition};
  white-space: nowrap;
  will-change: transform;
  transition: transform 0.2s linear;
`

const Dot = styled.div`
  margin: 0 ${gutter * 4}px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  transition: ${p => p.theme.transition};
  background: ${p => p.theme.scrollLooper};
  ${media.tablet`
    width: 20px;
    height: 20px;
    margin: 0 ${gutter * 2}px;
  `}
  ${media.phone`
  width: 12px;
  height: 12px;
  margin: 0 ${gutter * 1}px;
  `}
`

const Item = styled.div`
  display: flex;
  align-items: center;
`
const Title = styled.h1`
  font-size: 7rem;
  letter-spacing: 1.5px;
  ${media.tablet`
    font-size: 5rem;
  `}
  ${media.phone`
    font-size: 3rem;
  `}
`

const ScrollLooper = () => {
  const elem = useRef()
  const wrapperElem = useRef()

  const trackScroll = () => {
    const vh = window.innerHeight || 0
    const threshold = 0.1
    const offsetTop = threshold * vh * 0.25
    const offsetBottom = threshold * vh * 0.25
    const bounds = elem.current.getBoundingClientRect()
    const percentage =
      1 -
      Math.max(
        0,
        Math.min(
          1,
          (bounds.bottom - offsetTop) /
            (vh + bounds.height - offsetBottom - offsetTop)
        )
      )

    const elemWidth = bounds.width
    const minusOffset = (window.innerWidth / 100) * 15
    const childsWidth = Array.from(
      elem.current.getElementsByClassName('looper-item')
    ).reduce((a, b) => a + b.clientWidth, 0)
    const final = percentage * (childsWidth - elemWidth + minusOffset)

    elem.current.style.transform = `translateX(-${final}px)`
  }

  useEffect(() => {
    window.addEventListener('scroll', trackScroll)
  })

  return (
    <Wrapper ref={wrapperElem}>
      <Container ref={elem}>
        {items.map((item, i) => (
          <Item className="looper-item" key={i}>
            <Title>{item}</Title>
            {i !== items.length - 1 && <Dot />}
          </Item>
        ))}
      </Container>
    </Wrapper>
  )
}

export default ScrollLooper
