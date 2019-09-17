import React, { useContext } from 'react'
import HeroText from './HeroText'
import styled, { keyframes } from 'styled-components'
import { gutter, titleFont, semi } from '../../vars'
import InstagramName from './InstagramName'
import HalfTextSplit from '../HalfTextSplit'
import { HeroContext } from './hero-context'
import media from '../../media'
import { useUiContext } from '../../contexts/UiContext'
import { useSetting } from '../../contexts/SettingsContext'

const Container = styled.header`
  bottom: 0;
  left: 0;
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: ${gutter * 3}px ${gutter * 1}px;
  justify-content: center;
  font-family: ${titleFont};
  font-weight: ${semi};

  ${media.phone`
    display:none;
    `}
`

const Mail = styled.a`
  transform: translateY(${p => (p.show ? 100 : -0)}%) rotate(-90deg);
  display: block;
  text-decoration: none;
  opacity: ${p => (p.show ? 1 : 0)};
  transition: opacity 1s ease, transform 0.4s ease;
`

const Insta = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10vh;
  align-items: flex-start;
`

const HeroLeftSide = () => {
  const { frontpageLoaded } = useUiContext()
  const t = useSetting()
  return (
    <Container>
      <Insta>
        <InstagramName show={frontpageLoaded} name="Erik" insta="eriks" />
        <InstagramName show={frontpageLoaded} name="Oscar" insta="oscarmorke" />
        <InstagramName show={frontpageLoaded} name="Jonathan" insta="jontgus" />
      </Insta>

      <Mail show={frontpageLoaded} href="mailto:hej@etablera.co">
        <HalfTextSplit text={t('mail.hello')} />
      </Mail>
    </Container>
  )
}

export default HeroLeftSide
