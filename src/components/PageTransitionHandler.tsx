import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import styled from 'styled-components'
import { transitionPage } from '../utils/dom-selectors'
import { minimumTimeout } from '../utils'
import { useUiContext } from '../contexts/UiContext'
import { updateSmooth } from '../utils/scroll/smooth-scroll'
import headerTextDifference from '../utils/header-text-difference'

export const transitionOptions = {
  START_TRANSITION_DATE: 'startTransitionDate',
  END_TRANSITION_DATE: 'endTransitionDate',
  DURATION: 240,
}

const Container = styled.div<{ transitionActive: boolean }>`
  transition: opacity ${transitionOptions.DURATION}ms ease-in;

  &.${transitionPage.activeClass} {
    opacity: 0;
  }
`

const PageTransitionHandler = ({ children, pathname }) => {
  const [inner, updateInner] = useState(children)
  const lastPathname = useRef<string>()
  const { setPageTransitionActive } = useUiContext()

  const changePage = () => {
    setPageTransitionActive(true)
    const transitionDate = window[transitionOptions.START_TRANSITION_DATE]

    if (transitionDate) {
      transitionPage.resolve().classList.add(transitionPage.activeClass)
      minimumTimeout(transitionDate, () => updateInner(children))
    } else {
      updateInner(children)
    }
  }

  useLayoutEffect(() => {
    setPageTransitionActive(false)
    updateSmooth()
    if (lastPathname.current) {
      headerTextDifference.onRouteChange()
    }
  }, [inner])

  useEffect(() => {
    if (lastPathname.current) {
      changePage()
    }

    lastPathname.current = pathname
  }, [pathname])

  return <Container {...transitionPage.attr}>{inner}</Container>
}

export default PageTransitionHandler
