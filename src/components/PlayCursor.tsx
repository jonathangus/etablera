import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { createPortal } from 'react-dom'
import media from '../media'
import DefferedCallbacks from '../utils/deferred-callbacks'

const CursorBase = styled.div`
  position: fixed;
  z-index: 11000;

  ${media.phone`
    display:none;
  `}
`

const Cursor = styled(CursorBase)`
  width: 90px;
  height: 90px;
  left: -45px;
  top: -45px;
  pointer-events: none;
  transition: transform 0.1s ease;

  &:after {
    content: '';
    width: 100%;
    left: 50%;
    top: 50%;
    display: block;
    height: 100%;
    border-radius: 50%;
    border: 1px solid #fff;
    transform: scale(${p => (p.mouseDown ? 1.3 : 1)});
    transition: transform 0.5s ease;
  }
`

const CursorInner = styled(CursorBase)`
  left: -40px;
  top: -40px;
  pointer-events: none;

  svg {
    fill: white;
    width: 80px;
  }
`

const playPath =
  'M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z'
const pausePath =
  'M 12,26 16.33,26 16.33,10 12,10 z M 20.66,26 25,26 25,10 20.66,10 z'

type Props = {
  isPlaying: boolean
  parent: any
}

const PlayCursor = ({ isPlaying, parent }: Props) => {
  const cursorEl = useRef<HTMLElement>()
  const cursorInnerEl = useRef<HTMLElement>()
  const mounted = useRef(false)
  const [mouseDown, setMouseDown] = useState(false)
  const pos = useRef({})
  const portalEl = useRef(document.getElementById('extra-cursor'))
  const initPath = useRef(isPlaying ? pausePath : playPath)

  // Scale the outer circle
  useEffect(() => {
    const onMouseDown = () => {
      setMouseDown(true)
    }
    const onMouseUp = () => {
      setMouseDown(false)
    }

    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)

    return () => {
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  const onPlayChange = async (isPlaying: boolean) => {
    const anime = await DefferedCallbacks.anime()
    if (cursorInnerEl) {
      anime({
        targets: cursorInnerEl.current.querySelector('path'),
        d: isPlaying ? pausePath : playPath,
        easing: 'cubicBezier(.5, .05, .1, .3)',
        duration: 400,
      })
    }
  }

  // Animate the inner cursor
  useEffect(() => {
    onPlayChange(isPlaying)
  }, [isPlaying])

  useEffect(() => {
    mounted.current = true

    const onMouseMove = e => {
      const controls = parent.querySelector('.plyr__controls')
      if (!controls) return
      const hoveringControls = controls.contains(e.target)

      cursorEl.current.style.opacity = hoveringControls ? '0' : '1'
      cursorInnerEl.current.style.opacity = hoveringControls ? '0' : '1'

      pos.current = {
        x: e.clientX,
        y: e.clientY,
      }

      const translate = `translate(${e.clientX}px, ${e.clientY}px)`

      if (cursorEl.current) {
        cursorEl.current.style.transform = translate
      }

      if (cursorInnerEl.current) {
        cursorInnerEl.current.style.transform = translate
      }
    }

    document.addEventListener('mousemove', onMouseMove)

    return () => {
      mounted.current = false
      document.removeEventListener('mousemove', onMouseMove)
    }
  })

  return createPortal(
    <>
      <Cursor mouseDown={mouseDown} ref={cursorEl} />
      <CursorInner ref={cursorInnerEl}>
        <svg
          version="1.1"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 36 36"
        >
          <path d={initPath.current}></path>
        </svg>
      </CursorInner>
    </>,
    portalEl.current
  )
}

export default PlayCursor
