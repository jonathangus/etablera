import React, { useContext } from 'react'
import HeroText from './HeroText'
import styled, { keyframes } from 'styled-components'
import { gutter, titleFont, semi } from '../../vars'
import media from '../../media'
import InstagramName from './InstagramName'
import HalfTextSplit from '../HalfTextSplit'
import { HeroContext } from './hero-context'

import { useUiContext } from '../../contexts/UiContext'
import { useSetting } from '../../contexts/SettingsContext'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const InstaLinks = () => {
  const { frontpageLoaded, animateContent } = useUiContext()
  const t = useSetting()
  return (
    <Container>
      <InstagramName show={frontpageLoaded} name="Erik" insta="eriks" />
      <InstagramName show={frontpageLoaded} name="Oscar" insta="oscarmorke" />
      <InstagramName show={frontpageLoaded} name="Jonathan" insta="jontgus" />
    </Container>
  )
}

export default InstaLinks
