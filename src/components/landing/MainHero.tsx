import React from 'react'
import styled, { keyframes } from 'styled-components'
import HeroLeftSide from './HeroLeftSide'
import EtableraDescription from './EtableraDescription'
import { useUiContext } from '../../contexts/UiContext'
import ScrollIndicator from '../ScrollIndicator'
import { $mainHero } from '../../utils/dom-selectors'

const Container = styled.header`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  pointer-events: all;
  position: relative;
`

const MainHero = () => {
  const { frontpageLoaded } = useUiContext()
  return (
    <Container>
      <div {...$mainHero.attr} />
      <HeroLeftSide />
      {frontpageLoaded && <ScrollIndicator />}
    </Container>
  )
}

export default MainHero
