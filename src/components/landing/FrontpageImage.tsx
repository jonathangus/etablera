import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import LazyLoadImage from '../LazyLoadImage'
import { useStaticQuery, graphql } from 'gatsby'
import YFactor from '../YFactor'
import HeartPulse from './HeartPulse'
import { useSetting } from '../../contexts/SettingsContext'
import Cta from '../Cta'
import { gutter, niceCubic } from '../../vars'
import media from '../../media'
import useScrollDisplay from '../../hooks/useScrollDisplay'
import Grid from '../Grid'

const Container = styled.div`
  position: relative;

  margin-top: 30vh;

  img {
    display: block;
    width: 100%;
  }
`

const Content = styled.div<{ showBox: boolean }>`
  color: ${p => p.theme.color};
  padding: ${gutter * 6}px;
  position: absolute;
  left: ${gutter * 3}px;
  top: ${gutter * 3}px;
  z-index: 20;
  max-width: 550px;
  background: ${p => p.theme.backgroundColor};
  transform: scaleY(${p => (p.showBox ? 1 : 0)});
  transition: transform 0.65s ${niceCubic};
  transform-origin: top;

  ${media.phone`
    position:relative;
    left:0;
    top:0;
    margin: 0 ${gutter}px;
    margin-bottom: ${-gutter * 2}px;
    padding: ${gutter * 2}px;
    
  `}
`
const ContentInner = styled.div<{ showText: boolean }>`
  opacity: ${p => (p.showText ? 1 : 0)};
  transition: opacity 1s linear;
`

const Text = styled.div``

const ImageWrap = styled.div`
  position: relative;
`
const Inner = styled.div`
  pointer-events: none;
  overflow: hidden;
  max-height: 85vh;
`

const FrontpageImage = () => {
  const data = useStaticQuery(graphql`
    {
      ...footerImage
    }
  `)
  const t = useSetting()
  const elem = useRef()
  const showBox = useScrollDisplay(elem)
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    if (showBox) {
      setTimeout(() => {
        setShowText(true)
      }, 700)
    }
  }, [showBox])

  return (
    <Grid>
      <YFactor top>
        <Container ref={elem}>
          <Content showBox={showBox}>
            <ContentInner showText={showText}>
              <Text
                dangerouslySetInnerHTML={{ __html: t('aboutImage.text', true) }}
              ></Text>
              <Cta href={t.url('/about')}>{t('aboutImage.ctaText')}</Cta>
            </ContentInner>
          </Content>
          <ImageWrap>
            <HeartPulse />
            <Inner>
              <LazyLoadImage
                alt="Contact"
                image={data.footerImage.childImageSharp.fluid}
              />
            </Inner>
          </ImageWrap>
        </Container>
      </YFactor>
    </Grid>
  )
}

export default FrontpageImage
