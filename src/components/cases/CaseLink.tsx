import React, { useState, useEffect, useRef, forwardRef } from 'react'
import styled from 'styled-components'
import { useSetting } from '../../contexts/SettingsContext'
import media from '../../media'
import {
  CASE_ANIMATION_DURATION,
  cleanUpCaseAnimation,
} from '../../animation/page-animation'
import CaseMedia, { ICaseMediaHandler } from './CaseMedia'
import { slugify } from '../../utils/url'
import { Link as GatsbyLink, navigate } from 'gatsby'
import { useUiContext } from '../../contexts/UiContext'
import { ICase } from '../../types'

export const Link = styled(GatsbyLink)`
  display: block;
`

const Container = styled(GatsbyLink)`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  height: calc(1110px * 0.5625);
  transition: transform ${CASE_ANIMATION_DURATION}ms
    cubic-bezier(0.2, 0.6, 0.2, 1);
  display: block;
  will-change: transform;

  &.fullscreen {
    z-index: 1010;
    transform-origin: top left;
  }

  ${media.tablet`
    height: 100vh;
`}
`

type DomRef = {
  current: any
}

type Props = {
  record: ICase
  className?: string
  withScrollCenter?: boolean
  children?: JSX.Element
  preRouteChange?: () => Promise<void>
}

const CaseLink = (
  {
    record,
    className,
    children,
    preRouteChange,
    withScrollCenter = true,
  }: Props,
  ref
) => {
  const mediaElement = useRef<ICaseMediaHandler>()
  const t = useSetting()
  const { hideHeader } = useUiContext()
  const href = t.url(`/${slugify(record.name)}/`)
  const animationInProgress = useRef(false)

  const goToCase = async () => {
    if (animationInProgress.current) return

    animationInProgress.current = true
    hideHeader()

    try {
      if (preRouteChange) {
        await preRouteChange()
      }
      await mediaElement.current.zoom(withScrollCenter)
    } catch (e) {
      cleanUpCaseAnimation(true)
    } finally {
      navigate(href)
    }
  }

  return (
    <Container
      to={href}
      title={record.name}
      className={className}
      ref={ref}
      onClick={e => {
        e.preventDefault()
        return goToCase()
      }}
    >
      {children}
      <CaseMedia ref={mediaElement} item={record} />
    </Container>
  )
}

export default forwardRef(CaseLink)
