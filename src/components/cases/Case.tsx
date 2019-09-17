import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { gutter, smoothTransition } from '../../vars'
import { useSetting } from '../../contexts/SettingsContext'
import media, { sizes } from '../../media'
import CaseLink from './CaseLink'
import { ICase } from '../../types'
import { styleRef } from '../../utils'
import SmoothCase from '../../utils/scroll/SmoothCase'
import useSmooth from '../../hooks/useSmooth'
import smooth from '../../utils//scroll/smooth-scroll'

const ReadMore = styled.div`
  position: absolute;
  z-index: 40;
  left: 50%;
  bottom: ${gutter * 5}px;
  color: white;
  padding-top: 5px;
  transform: translate(-50%, 5px);
  opacity: 0;
  font-size: 0.9rem;
  will-change: transform, opacity;
  transition: transform ${smoothTransition}, opacity ${smoothTransition};

  ${media.tablet`
    transform: translate(-50%,0px);
    opacity: 1;
    border-bottom: 1px solid white;
    display: inline-block;
  `}
`

const CaseTitle = styled.h1`
  color: rgba(216, 216, 216, 0.73);
  pointer-events: none;
  position: absolute;
  right: ${-gutter * 4}px;
  max-width: 700px;
  font-size: 6rem;
  bottom: -${gutter * 2}px;
  z-index: 55;
  text-align: right;
  text-transform: uppercase;
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

const Shadow = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 52;
  box-shadow: 0 8px 80px 2px rgba(0, 0, 0, 0.45);
  opacity: 0;
  left: 0;
  top: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
  will-change: transform, opacity;
`

const StyledCaseLink = styled(CaseLink)`
  &:hover ${ReadMore} {
    opacity: 1;
    transform: translate(-50%, 0px);
  }

  &:hover ~ ${Shadow} {
    opacity: 1;
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
const bSizeLarge = '290px'
const bSizeDesk = '250px'
const bSizeMob = '45px'
const bOffset = '-0px'

const BorderVertical = styled(Border)`
  height: 100%;
  width: ${bSizeLarge};
  transform: scaleX(var(--border-size));

  ${media.desktop`
    width: ${bSizeDesk};
  `}


  ${media.tablet`
    width: 100px;
  `}

  ${media.phone`
    width: 45px;
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
    height: 100px;
  `}

  ${media.phone`
    height: 45px;
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
  const shadowEl = useRef<HTMLElement>()
  const caseSmooth = useSmooth(
    () =>
      new SmoothCase(elem.current, {
        title: titleEl.current,
        shadow: shadowEl.current,
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
      <Shadow ref={shadowEl} />

      <CaseTitle ref={titleEl}>
        <span data-letters={record.name}>{record.name}</span>
      </CaseTitle>
      <BorderLeft data-case-border />
      <BorderRight data-case-border />
      <BorderTop data-case-border />
      <BorderBottom data-case-border />
    </Wrapper>
  )
}

export default Case
