import React, { useRef } from 'react'
import { ICaseTextSection } from '../../types'
import styled, { css } from 'styled-components'
import MediaElementReveal from '../MediaElementReveal'
import { gutter } from '../../vars'
import media from '../../media'
import Grid from '../Grid'
import useScrollDisplay from '../../hooks/useScrollDisplay'

const leftPosCss = css`
  grid-column-end: span 5;
  grid-column-start: 1;
  grid-row-start: 1;
`
const rightPosCss = css`
  grid-column-end: span 5;
  grid-column-start: 8;
  grid-row-start: 1;
`

const transitionCss = css`
  opacity: ${p => (p.show ? 1 : 0)};
  transition: opacity 0.5s ease-in;
`

const StyledMediaElementReveal = styled(MediaElementReveal)`
  ${p => p.type === 'left' && rightPosCss}
  ${p => p.type === 'right' && leftPosCss}
`

const LargeGrid = styled(Grid)``

const Wrapper = styled.div`
  display: flex;
  overflow: hidden;
  justify-content: space-between;

  grid-gap: ${gutter * 2}px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);

  ${media.desktop`
    flex-direction: column;
    display:block;
  `}
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${transitionCss};

  ${p => p.type === 'right' && rightPosCss}
  ${p => p.type === 'left' && leftPosCss}


  ${media.tablet`
    width: 100%;
    order:1;
    margin:0;
    transition-delay:0;
`}
`
const Body = styled.div`
  ol,
  ul {
    padding-left: 1em;
    margin-bottom: 1em;
  }
`
const Title = styled.h3``

const TextSection = ({
  title,
  body,
  media,
  type = 'center',
}: ICaseTextSection) => {
  const wrapperEl = useRef<HTMLElement>()
  const bodyStr = body && body.childMarkdownRemark.html
  const show = useScrollDisplay(wrapperEl)

  return (
    <LargeGrid>
      <Wrapper ref={wrapperEl} type={type}>
        <Content show={show} type={type}>
          {title && <Title>{title}</Title>}
          {bodyStr && (
            <Body dangerouslySetInnerHTML={{ __html: bodyStr }}></Body>
          )}
        </Content>
        {media && (
          <StyledMediaElementReveal show={show} type={type} media={media} />
        )}
      </Wrapper>
    </LargeGrid>
  )
}

export default TextSection
