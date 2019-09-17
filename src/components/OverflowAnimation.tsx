import React, { useRef, useEffect, useState, useLayoutEffect } from 'react'
import styled, { css, keyframes } from 'styled-components'
import useElementEventEffect from '../hooks/useElementEventEffect'
import media from '../media'
import DefferedCallbacks from '../utils/deferred-callbacks'

const LetterAnimation = keyframes`
    from {
        transform:translateY(100%)
    }
    to {
        transform: translateY(0%)
    }
`

const LetterAnimationOpacity = keyframes`
    from {
        opacity: 0;
        transform:translateY(100%)
    }
    to {
        opacity: 1;
        transform: translateY(0%)
    }
`

const Container = styled.div`
  opacity: ${p => (p.animate ? 1 : 0)};

  .word-wrap {
    overflow: hidden;
    display: inline-block;
    line-height: 1;
    margin-bottom: -0.3em;
  }

  .word {
    position: relative;
    will-change: transform;
    display: inline-block;
    transform: translateY(100%);
    z-index: 2;
    line-height: 1.3;
    opacity: 0;

    ${p => p.animate && showAnim};
  }
`

const showAnim = css`
  animation-timing-function: ease;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-name: ${p =>
    p.withOpacity ? LetterAnimationOpacity : LetterAnimation};
  animation-duration: 600ms;
  animation-delay: calc(120ms * var(--line-index));

  ${media.phone`
    animation-delay: calc(30ms * var(--line-index));
  `}
`

type Props = {
  className?: string
  content: string
  as?: string
  show?: boolean
  stagger?: number
  delay?: number
  duration?: number
  withOpacity?: boolean
  onStart?: () => void
}

const OverflowAnimation = ({
  content,
  as = 'div',
  show = true,
  withOpacity = true,
  onStart,
  delay,
}: Props) => {
  const elemRef = useRef()
  const [animate, setAnimation] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const fixWords = async () => {
    const Splitting = await DefferedCallbacks.Splitting()

    setLoaded(true)

    const [result] = Splitting({ target: elemRef.current, by: 'lines' })
    result.lines.forEach((words: Array<any>, index: number) => {
      words.forEach(word => {
        var wrapper = document.createElement('span')
        wrapper.className = 'word-wrap'
        word.parentNode.insertBefore(wrapper, word)
        wrapper.appendChild(word)
      })
    })
  }

  useEffect(() => {
    fixWords()
  }, [])

  useLayoutEffect(() => {
    setTimeout(() => {
      setAnimation(show)
    }, delay)
  }, [show])

  useElementEventEffect('animationstart', elemRef, () => {
    onStart && onStart()
  })

  return (
    <Container
      as={as}
      ref={elemRef}
      animate={animate && loaded}
      withOpacity={withOpacity}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

export default OverflowAnimation
