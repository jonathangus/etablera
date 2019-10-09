import React, { useMemo } from 'react'
import styled, { keyframes } from 'styled-components'
import InstaLinks from './InstaLinks'
import HeroDescription from './HeroDescription'
import { useUiContext } from '../../contexts/UiContext'
import ScrollIndicator from '../ScrollIndicator'
import { $mainHero } from '../../utils/dom-selectors'
import { gutter, titleFont, semi } from '../../vars'
import media from '../../media'
import VerticalEmailLink from './VerticalEmailLink'
import TitleCanvas from '../page-loader/TitleCanvas'
import { useThemeContext } from '../../contexts/ThemeContext'

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
  const {
    frontpageLoaded,
    showTitleCanvas,
    etableraSmooth,
    animateContent,
  } = useUiContext()
  const { selected } = useThemeContext()

  const TitleCanvasNode = useMemo(() => <TitleCanvas />, [
    etableraSmooth,
    selected,
  ])

  return (
    <Container>
      <div {...$mainHero.attr} />
      {showTitleCanvas && TitleCanvasNode}
      <Sidebar>
        <InstaLinks />
      </Sidebar>
      <RightSidebar>
        <VerticalEmailLink />
      </RightSidebar>
      {frontpageLoaded && <ScrollIndicator align="top" />}
      {frontpageLoaded && animateContent && <HeroDescription />}
    </Container>
  )
}

export default MainHero
