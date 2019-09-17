import React, { useRef, useMemo, memo } from 'react'
import styled, { css } from 'styled-components'
import { gutter, titleFont } from '../vars'
import OverflowAnimation from './OverflowAnimation'
import useScrollDisplay from '../hooks/useScrollDisplay'
import media from '../media'

const Container = styled.div`
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
  font-size: 1rem;

  ${media.phone`
    text-align:left;
  `}
`

const baseCss = css`
  transform: scale(${p => (p.show ? 1 : 0.7)})
    translateY(${p => (p.show ? 0 : -30)}%) rotate(${p => (p.show ? 0 : -5)}deg);
  transition: all 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  opacity: ${p => (p.show ? 1 : 0)};
`

const Title = styled.h2`
  margin-bottom: ${gutter * 3}px;
  ${baseCss};
  ${media.phone`
  margin-bottom: ${gutter * 2}px;

  `}
`

const Body = styled.div`
  ${baseCss};
  transition-delay: 150ms;

  a {
    font-family: ${titleFont};
    font-weight: bold;
    color: ${p => p.theme.color};
  }
`

type Props = {
  title?: string
  className?: string
  text?: string
}

export const TextContent = ({ title, text, className }: Props) => {
  const elem = useRef()
  const show = useScrollDisplay(elem)
  return (
    <Container className={className} ref={elem}>
      {title && <Title show={show}>{title}</Title>}
      {text && (
        <Body
          delay={400}
          show={show}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      )}
    </Container>
  )
}

export default memo(TextContent)
