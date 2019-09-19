import React, { useRef } from 'react'
import styled from 'styled-components'
import LazyLoadImage from '../LazyLoadImage'
import { useStaticQuery, graphql } from 'gatsby'
import useSmooth from '../../hooks/useSmooth'
import YFactor from '../YFactor'
import DefferedCallbacks from '../../utils/deferred-callbacks'
import HeartPulse from './HeartPulse'

const Container = styled.div`
  position: relative;
  max-width: 2600px;
  margin: 0 auto;

  margin-top: 30vh;

  img {
    display: block;
    width: 100%;
  }
`

const ImageWrap = styled.div`
  position: relative;
`
const Inner = styled.div`
  pointer-events: none;
  overflow: hidden;
  max-height: 95vh;
`

const WaveContainer = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: hidden;
  z-index: 30;
`
const Wave = styled.svg`
  position: absolute;
  z-index: 100;
  width: 110%;
  left: -5%;
  fill: ${p => p.theme.backgroundColor};
  top: -3px;
`
const SecondWave = styled(Wave)`
  top: auto;
  bottom: -3px;
`

const AboutImage = () => {
  const data = useStaticQuery(graphql`
    {
      ...footerImage
    }
  `)

  const el = useRef()

  useSmooth(async () => {
    const SmoothFullImage = await DefferedCallbacks.SmoothFullImage()
    return new SmoothFullImage(el.current, 1.05)
  })

  return (
    <YFactor top>
      <Container>
        <ImageWrap>
          <HeartPulse />
          <WaveContainer>
            {' '}
            <Wave xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,53.3C1120,53,1280,75,1360,85.3L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
            </Wave>
            <SecondWave
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
            >
              <path d="M0,256L80,250.7C160,245,320,235,480,240C640,245,800,267,960,266.7C1120,267,1280,245,1360,234.7L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
            </SecondWave>
          </WaveContainer>

          <Inner ref={el}>
            <LazyLoadImage
              alt="Contact"
              image={data.footerImage.childImageSharp.fluid}
            />
          </Inner>
        </ImageWrap>
      </Container>
    </YFactor>
  )
}

export default AboutImage
