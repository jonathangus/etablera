import React, { useRef } from 'react'
import styled from 'styled-components'
import { useSetting } from '../contexts/SettingsContext'
import media from '../media'
import { gutter, titleFont } from '../vars'
import Grid from './Grid'
import YFactor from './YFactor'
import HalfTextSplit from './HalfTextSplit'

const Container = styled.footer`
  position: relative;
  overflow: hidden;
  padding-bottom: 20vh;
`
const Body = styled.div`
  max-width: 700px;
`
const Info = styled.div`
  a {
    color: ${p => p.theme.color};
    text-decoration: none;
  }
  ${media.phone`
    margin-top: ${gutter * 4}px;
  `}
`

const Link = styled.a`
  font-family: ${titleFont};
  font-weight: bold;
  font-size: 1.2rem;
  margin-right: ${gutter * 4}px;
  display: inline-block;

  ${media.phone`
  margin-right: ${gutter * 2}px;

  `}
`

const Email = styled(Link)``
const Tel = styled(Link)``
const Main = styled.div`
  margin-top: ${gutter * 4}px;
  margin-bottom: ${gutter * 2}px;
`
const Other = styled.div``
const OtherLink = styled.a`
  margin-right: ${gutter * 2}px;
  letter-spacing: 1px;
  color: ${p => p.theme.grayText};
  text-transform: uppercase;
`

const otherLinks = [
  {
    href: 'https://www.instagram.com/etablera.co/',
    title: 'Instagram',
  },
  {
    href: 'http://flickr.com/eriknson',
    title: 'Flickr',
  },
  {
    href: 'https://github.com/jonathangus',
    title: 'Github',
  },
]

const AboutImage = () => {
  const t = useSetting()

  return (
    <YFactor top>
      <Container>
        <Grid>
          <h2>{t('footer.title')}</h2>
          <Body
            dangerouslySetInnerHTML={{ __html: t('footer.text', true) }}
          ></Body>
          <Info>
            <Main>
              <Email href="mailto:hej@etablera.co">
                <HalfTextSplit text="hej@etablera.co"></HalfTextSplit>
              </Email>
              <Tel href="tel:+46738046047">
                <HalfTextSplit text="073 804 60 47"></HalfTextSplit>
              </Tel>
            </Main>

            <Other>
              {otherLinks.map((l, i) => (
                <OtherLink target="_blank" rel="noopener" key={i} href={l.href}>
                  {l.title}
                </OtherLink>
              ))}
            </Other>
          </Info>
        </Grid>
      </Container>
    </YFactor>
  )
}

export default AboutImage
