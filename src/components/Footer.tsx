import React, { useRef } from 'react'
import styled, { css } from 'styled-components'
import { useSetting } from '../contexts/SettingsContext'
import media from '../media'
import { gutter, titleFont } from '../vars'
import Grid from './Grid'
import YFactor from './YFactor'
import HalfTextSplit from './HalfTextSplit'
import MenuItems from './MenuItems'
import Cta from './Cta'

const Container = styled.footer`
  position: relative;
  overflow: hidden;
  padding-bottom: 20vh;
`
const paddingHandler = css`
  padding: ${gutter * 4}px;
  ${media.tablet`
    padding: ${gutter * 2}px;
  `}

  ${media.phone`
    padding: ${gutter * 2}px 0;
  `}
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
const Title = styled.h2`
  font-size: 2.4rem;
`

const Email = styled(Link)``
const Tel = styled(Link)``
const Main = styled.div`
  margin-top: ${gutter * 2}px;
`
const Other = styled.div`
  ${media.phone`
   margin-top: ${gutter * 2}px;
  `}
`
const OtherLink = styled.a`
  margin-right: ${gutter * 2}px;
  letter-spacing: 1px;
  color: ${p => p.theme.grayText};
  text-transform: uppercase;
`
const Wrapper = styled.div`
  display: flex;

  ${media.desktop`
    display:block;
  `}
`
const Left = styled.div`
  flex: 1.5;
  ${paddingHandler};
`
const Right = styled.div`
  flex: 1;
  ${paddingHandler};
  position: relative;
  border-left: 1px solid ${p => p.theme.grayText};

  ${media.desktop`
  border-left:none;
  border-top: 1px solid ${p => p.theme.grayText};

  `}
`

const OpenSourceTitle = styled.h3``
const OpenSourceText = styled.div``
const OpenSourceLink = styled(Link)`
  display: inline-block;
  font-size: 1rem;
`
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${paddingHandler};

  ${media.phone`
   display:block;
  `}
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

const Footer = () => {
  const t = useSetting()

  return (
    <YFactor top>
      <Container>
        <Grid>
          <Wrapper>
            <Left>
              <Title>{t('footer.title')}</Title>

              <Info>
                <Main>
                  <Email href="mailto:hej@etablera.co">
                    <HalfTextSplit text="hej@etablera.co"></HalfTextSplit>
                  </Email>
                  <Tel href="tel:+46738046047">
                    <HalfTextSplit text="073 804 60 47"></HalfTextSplit>
                  </Tel>
                </Main>
              </Info>
            </Left>
            <Right>
              <OpenSourceTitle>{'<3'} open source</OpenSourceTitle>
              <OpenSourceText
                dangerouslySetInnerHTML={{ __html: t('code.text', true) }}
              ></OpenSourceText>
              <OpenSourceLink
                target="_blank"
                rel="noopener"
                href="https://github.com/jonathangus/etablera"
              >
                <HalfTextSplit text="github.com/jonathangus/etablera"></HalfTextSplit>
              </OpenSourceLink>
            </Right>
          </Wrapper>
          <Bottom>
            <MenuItems />
            <Other>
              {otherLinks.map((l, i) => (
                <OtherLink target="_blank" rel="noopener" key={i} href={l.href}>
                  {l.title}
                </OtherLink>
              ))}
            </Other>
          </Bottom>
        </Grid>
      </Container>
    </YFactor>
  )
}

export default Footer
