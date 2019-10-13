import React, { useEffect, useMemo, useRef } from 'react'
import styled from 'styled-components'
import { ICase } from '../../../types'
import CaseLink from '../CaseLink'
import { gutter, titleFont } from '../../../vars'
import Slideshow from './Slideshow'
import useShowContent from '../../../hooks/useShowContent'
import SwipeIndicator from './SwipeIndicator'
import media from '../../../media'

const ratio = 0.562

const Container = styled.div`
  position: relative;
  margin: 0;
  width: 70vw;
  height: calc(70vw / ${ratio});
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  ${media.smallPhone`
  width: 60vw;
  height: calc(60vw / ${ratio});
  `}
`
const ImageContainer = styled.div`
  height: 100%;
`

const SvgHidden = styled.svg`
  display: none;
`
const Item = styled.div`
  cursor: pointer;
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  opacity: 0;
`

const Nav = styled.div`
  position: fixed;
  z-index: 5000;
  fill: ${p => p.theme.color};
  display: block;
  cursor: pointer;
  width: 5em;
  height: 5em;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  opacity: 0;
  transition: opacity 0.4s ease, transform 0.4s ease;

  &.show {
    opacity: 1;
  }

  svg,
  polygon  {
    fill: ${p => p.theme.color};
  }
  svg {
    width: 1.5em;
    height: 1.5em;
  }
`
const Next = styled(Nav)`
  bottom: ${-gutter * 3}px;
  right: ${-gutter * 3}px;
  transform: scale(0.5) rotate(45deg);

  &.show {
    transform: scale(1) rotate(45deg);
  }

  &.out {
    transform: scale(1) rotate(45deg) translate(15px, 0px);
    opacity: 0;
  }
`

const Prev = styled(Nav)`
  top: ${-gutter * 3}px;
  left: ${-gutter * 3}px;
  transform: scale(0.5) rotate(-135deg);

  &.show {
    transform: scale(1) rotate(-135deg);
  }

  &.out {
    transform: scale(1) rotate(-135deg) translate(15px, 0px);
    opacity: 0;
  }
`

const StyledCaseLink = styled(CaseLink)`
  height: 100%;
`

const ContentTitle = styled.h2`
  overflow: hidden;
  padding: 5px;

  span {
    position: relative;
    display: inline-block;
    transform: translateX(-100%) translateY(-100%);
    transform-origin: bottom;
  }
`

const Content = styled.div`
  position: absolute;
  bottom: ${gutter * 4}px;
  z-index: 50;
  left: -${gutter}px;
  overflow: hidden;
  color: #fff;
`

const ContentBg = styled.div`
  background: #000;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  z-index: -1;
  left: 0;
  transform: translateX(0%) translateY(-100%);

  transform-origin: bottom;
`

type Props = { nodes: ICase[] }

const MobileAllCases = ({ nodes }: Props) => {
  const containerEl = useRef()
  const slideshow = useMemo(() => new Slideshow(), [])

  useShowContent(() => {
    slideshow.display()
  })

  useEffect(() => {
    slideshow.init(containerEl.current)

    return () => {
      slideshow.destroy()
    }
  }, [])

  return (
    <Container ref={containerEl}>
      <SvgHidden hidden>
        <symbol id="icon-navarrow" viewBox="0 0 408 408">
          <title>navarrow</title>
          <polygon
            fillRule="nonzero"
            points="204 0 168.3 35.7 311.1 178.5 0 178.5 0 229.5 311.1 229.5 168.3 372.3 204 408 408 204"
          ></polygon>
        </symbol>
      </SvgHidden>
      <ImageContainer>
        {nodes.map((node, i) => (
          <Item data-case-slide data-case-name={node.name} key={node.id + i}>
            <StyledCaseLink
              record={node}
              withScrollCenter={false}
              preRouteChange={() => slideshow.cleanup()}
            />
          </Item>
        ))}
        <Content>
          <ContentTitle>
            <span data-title></span>
          </ContentTitle>
          <ContentBg data-content-bg />
        </Content>
      </ImageContainer>

      <Prev data-nav onClick={() => slideshow.previous()}>
        <svg>
          <use xlinkHref="#icon-navarrow"></use>
        </svg>
      </Prev>
      <Next data-nav onClick={() => slideshow.next()}>
        <svg>
          <use xlinkHref="#icon-navarrow"></use>
        </svg>
      </Next>
      <SwipeIndicator />
    </Container>
  )
}

export default MobileAllCases
