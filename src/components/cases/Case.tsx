import React, { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { gutter, smoothTransition } from '../../vars'
import { useSetting } from '../../contexts/SettingsContext'
import media, { sizes } from '../../media'
import CaseLink from './CaseLink'
import { ICase } from '../../types'
import SmoothCase from '../../utils/scroll/SmoothCase'
import useSmooth from '../../hooks/useSmooth'
import smooth from '../../utils//scroll/smooth-scroll'
import { $caseBorder } from '../../utils/dom-selectors'

const ComeIn = keyframes`
  0% {
    transform: translateX(-120%)
  }
  40% {
    transform: translateX(0%)

  }
  100% {
    transform: translateX(120%)

  }
`

const ReadMore = styled.div`
  position: absolute;
  z-index: 40;
  left: ${gutter * 5}px;
  bottom: ${gutter * 5}px;
  color: white;
  padding-top: 5px;
  transform: translateY(5px);
  opacity: 0;
  font-size: 0.9rem;
  will-change: transform, opacity;
  transition: transform ${smoothTransition}, opacity ${smoothTransition};
  overflow: hidden;
  padding-bottom: 2px;

  &:after {
    content: '';
    width: 100%;
    height: 1px;
    background: white;
    position: absolute;
    z-index: 2;
    left: 0;
    bottom: 0;
    animation: ${ComeIn} 2s ease infinite;
    animation-play-state: paused;

    ${media.tablet`
    animation-play-state:running;
    `}
  }

  ${media.tablet`
    transform: translate(-50%,0px);
    left:50%;
    opacity: 1;
    display: inline-block;
    
  `}
`

const CaseTitle = styled.h1`
  color: rgba(216, 216, 216, 0.73);
  pointer-events: none;
  position: absolute;
  right: ${-gutter * 4}px;
  max-width: 750px;
  font-size: 6rem;
  bottom: -${gutter * 2}px;
  z-index: 55;
  text-align: right;
  will-change: transform, color;
  transform: translateY(var(--translate-y-title));
  overflow: hidden;
  padding: 5px 15px;
  transition: color 0.5s ease;

  ${media.desktop`
    height: ${-gutter * 2}px;
  `}

  @media (max-width: 1370px) {
    right: ${gutter * 1}px;
  }

  ${media.phone`
    left: 0%;
    padding: 0 ${gutter}px;
    transform: translateY( var(--translate-y-title));
    text-align: center;
    font-size: 3rem;
    bottom: 40%;
    right: auto;
    color: white;
    width: 100%;
  `}
`

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
  position: relative;
`

const StyledCaseLink = styled(CaseLink)`
  &:hover ${ReadMore} {
    opacity: 1;
    transform: translateY(0px);

    &::after {
      animation-play-state: running;
    }

    ${media.tablet`
    transform: translate(-50%, 0);
    
    `}
  }

  @media (min-width: ${sizes.tablet}px) {
    &:hover ~ ${CaseTitle} {
      color: rgba(255, 255, 255, 0.83);
    }
  }
`

const Border = styled.div`
  position: absolute;
  background: ${p => p.theme.backgroundColor};
  transition: ${p => p.theme.transition};
  z-index: 51;
  will-change: transform;
`
const bSizeLarge = '120px'
const bSizeDesk = '100px'
const bSizeTablet = '80px'
const bSizeMob = '35px'
const bOffset = '-0px'

const BorderVertical = styled(Border)`
  height: 100%;
  width: ${bSizeLarge};
  transform: scaleX(var(--border-size));

  ${media.desktop`
    width: ${bSizeDesk};
  `}

  ${media.tablet`
    width: ${bSizeTablet};
  `}

  ${media.phone`
    width: ${bSizeMob};
  `}
`

const BorderHorizontal = styled(Border)`
  width: 100%;
  height: ${bSizeLarge};
  transform: scaleY(var(--border-size));

  ${media.desktop`
    height: ${bSizeDesk};
  `}

  ${media.tablet`
    height: ${bSizeTablet};
  `}

  ${media.phone`
    height: ${bSizeMob};
  `}
`

const BorderLeft = styled(BorderVertical)`
  left: ${bOffset};
  top: ${bOffset};
  transform-origin: left center;
`

const BorderRight = styled(BorderVertical)`
  bottom: ${bOffset};
  right: ${bOffset};
  transform-origin: right center;
`

const BorderTop = styled(BorderHorizontal)`
  top: ${bOffset};
  left: ${bOffset};
  transform-origin: center top;
`

const BorderBottom = styled(BorderHorizontal)`
  right: ${bOffset};
  bottom: ${bOffset};
  transform-origin: center bottom;
`

type Props = {
  record: ICase
}

const Case = ({ record }: Props) => {
  const t = useSetting()
  const elem = useRef<HTMLElement>()
  const titleEl = useRef<HTMLElement>()
  const containerElem = useRef<HTMLElement>()
  const caseSmooth = useSmooth(
    () =>
      new SmoothCase(elem.current, {
        title: titleEl.current,
      })
  )

  const fadeOut = async () => {
    smooth.removeAllExcept(caseSmooth)
    caseSmooth && (await caseSmooth.fadeOutTitle())
  }

  return (
    <Wrapper ref={elem}>
      <StyledCaseLink
        preRouteChange={fadeOut}
        ref={containerElem}
        record={record}
      >
        <ReadMore>{t('case.viewcase')}</ReadMore>
      </StyledCaseLink>

      <CaseTitle ref={titleEl}>
        <span data-letters={record.name}>{record.name}</span>
      </CaseTitle>
      <BorderLeft {...$caseBorder.attr} />
      <BorderRight {...$caseBorder.attr} />
      <BorderTop {...$caseBorder.attr} />
      <BorderBottom {...$caseBorder.attr} />
    </Wrapper>
  )
}

export default Case
