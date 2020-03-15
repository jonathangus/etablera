import React, { useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import InstaLinks from './InstaLinks'
import HeroDescription from './HeroDescription'
import { useUiContext } from '../../contexts/UiContext'
import ScrollIndicator from '../ScrollIndicator'
import { $mainHero, $pageLoaderHeight } from '../../utils/dom-selectors'
import { gutter, titleFont, semi } from '../../vars'
import media from '../../media'
import VerticalEmailLink from './VerticalEmailLink'
import MainHeroTitle from './MainHeroTitle'
import PageLoaderInner from '../page-loader/PageLoaderInner'
import PageLoaderTitle from '../page-loader/PageLoaderTitle'
import useSmooth from '../../hooks/useSmooth'
import SmoothEtablera from '../../utils/scroll/SmoothEtablera'

const Container = styled.header`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  pointer-events: all;
  position: relative;

  ${media.phone`
    height: var(--window-height);
  `}
`

const Sidebar = styled.div`
  bottom: 0;
  left: 0;
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;

  justify-content: center;

  padding: ${gutter * 3}px;
  font-family: ${titleFont};
  font-weight: ${semi};

  ${media.phone`
    display:none;
    `}
`

const RightSidebar = styled(Sidebar)`
  left: auto;
  right: 0;
`

const MainHero = () => {
  const { mounted } = useUiContext()

  return (
    <Container>
      {mounted && <MainHeroTitle />}
      <Sidebar>
        <InstaLinks />
      </Sidebar>
      <RightSidebar>
        <VerticalEmailLink />
      </RightSidebar>
      {mounted && <ScrollIndicator align="top" />}
      {mounted && <HeroDescription />}
    </Container>
  )
}

export default MainHero
