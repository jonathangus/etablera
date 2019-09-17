import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { gutter } from '../../vars'
import DefferedCallbacks from '../../utils/deferred-callbacks'

const Container = styled.a<{ show: boolean }>`
  display: inline-block;
  color: ${p => p.theme.color};
  white-space: nowrap;
  margin-bottom: ${gutter}px;
  opacity: ${p => (p.show ? 1 : 0)};
  transition: opacity 1s ease;

  &:nth-child(2) {
    transition-delay: 0.1s;
  }
  &:nth-child(3) {
    transition-delay: 0.2s;
  }
`

const Wrapper = styled.span`
  position: relative;
  display: inline-block;
`
const Letter = styled.span<{ active: boolean }>`
  display: inline-block;
  line-height: 1em;
  transform-origin: 0 0;
  opacity: 0;
  pointer-events: ${p => (p.active ? 'all' : 'none')};
`

const LetterWrap = styled.span`
  position: absolute;
  left: 100%;
  display: none;
`

type DomRef = {
  current: HTMLElement
}

const InstagramName = ({ name, insta, show }) => {
  const firstLetter = name.substring(1, 0)
  const rest = name.substring(1, name.length)
  const currName: DomRef = useRef()
  const anim: {
    current: anime.AnimeTimelineInstance
  } = useRef()
  const wrapRef: DomRef = useRef()
  const [active, setActive] = useState(false)

  useEffect(() => {
    setActive(true)
  }, [])

  const onMouseEnter = async () => {
    wrapRef.current.style.display = 'inline-block'
    const anime = await DefferedCallbacks.anime()

    anim.current = anime.timeline().add({
      targets: currName.current.querySelectorAll('.letter'),
      rotateY: [-90, 0],
      duration: 1300,
      delay: (el, i) => 45 * i,
      opacity: 1,
    })
  }

  const onMouseLeave = () => {
    wrapRef.current.style.display = 'none'
    if (anim.current) {
      anim.current.restart()
      anim.current.pause()
    }
  }

  return (
    <Container
      target="_blank"
      rel="noopener"
      href={`https://www.instagram.com/${insta}`}
      ref={currName}
      onMouseLeave={onMouseLeave}
      title={`${name} instagram`}
      show={show}
    >
      <Wrapper>
        <span onMouseEnter={onMouseEnter}>{firstLetter}</span>
        <LetterWrap ref={wrapRef}>
          {rest.split('').map((l, i) => (
            <Letter active={active} className="letter" key={i}>
              {l}
            </Letter>
          ))}
        </LetterWrap>
      </Wrapper>
    </Container>
  )
}

export default InstagramName
