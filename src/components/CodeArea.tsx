import React, { useRef } from 'react'
import styled from 'styled-components'
import { gutter } from '../vars'
import Grid from './Grid'
import { useSetting } from '../contexts/SettingsContext'
import get from 'lodash/get'
import media, { sizes } from '../media'
import LazyLoadImage from './LazyLoadImage'
import isMobile from 'ismobilejs'
import { useStaticQuery, graphql } from 'gatsby'
import useScheduleEffect, { SchedulePrio } from '../hooks/useScheduleEffect'
import DefferedCallbacks from '../utils/deferred-callbacks'

const Container = styled.div`
  padding: 30px 0;
  max-width: 900px;
  margin: 0 auto;
`

const Inner = styled.div`
  box-shadow: 0 5px 30px -6px rgba(0, 0, 0, 0.25);
  background: white;
  border-radius: 0.5rem;
  overflow: hidden;
  color: #000;
  display: flex;
  font-size: 0.8rem;
  min-height: 200px;
  height: 230px;
  align-items: center;

  ${media.phone`
    flex-direction: column;
    font-size: 1rem;
    height: auto;
`}
`

const Left = styled.div`
  width: 50%;
  flex: 1;
  background: #663399;
  height: 100%;
  position: relative;
  clip-path: polygon(0 0, 100% 0%, 85% 100%, 0% 100%);
  height: 100%;

  ${media.phone`
    height: 140px;
    width: 100%;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 95%);
  `}
`

const Right = styled.div`
  flex: 1;
  padding: ${gutter * 4}px;

  ${media.phone`
  padding: ${gutter * 2}px;
  `}
`

const ImgWrap = styled.div`
  transform: rotate(0deg);
  margin-left: -7.5%;
  height: 100%;
  background-color: rgba(60, 54, 107, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;

  ${media.phone`
    margin-left: 0%;
  `}

  svg {
    fill: white;
    height: 50px;
    margin: 0 10px;
    opacity: 1;
  }

  img {
    top: 50%;
    left: 55%;
    width: 100%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }
`

const Arrow = styled.svg`
  transform: scale(0);
  transition: transform ease 0.4s;
  position: absolute;
  right: ${gutter}px;
  margin: 0;
`

const GitHub = styled.svg`
  margin-right: 7px;
  margin-top: -1px;
`

const Link = styled.a`
  font-weight: bold;
  position: relative;
  letter-spacing: 0.5px;
  text-decoration: none;
  display: inline-flex;
  background: #181717;
  color: white;
  align-items: center;
  padding: 7px ${gutter}px;
  border-radius: 3px;
  line-height: 1;
  justify-content: center;
  transition: padding ease 0.4s;

  ${media.phone`
    font-size: 0.75rem;
  `}

  @media (min-width: ${sizes.phone}px) {
    &:hover {
      ${Arrow} {
        transform: scale(1);
      }
      padding-right: 36px;
    }
  }

  svg {
    width: 18px;
    fill: white;
  }
`
const Bg = styled(LazyLoadImage)`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;

  img {
    object-position: center;
    object-fit: cover;
    height: 100%;
  }
`

const Title = styled.h3`
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: ${gutter / 2}px;
`

const CodeArea = () => {
  const t = useSetting()
  const containerEl: any = useRef()

  const data = useStaticQuery(graphql`
    {
      ...codeScreen
    }
  `)

  const initTilt = async () => {
    const VanillaTilt = await DefferedCallbacks.VanillaTilt()
    if (VanillaTilt) {
      VanillaTilt.init(containerEl.current, {
        max: 4,
      })
    }
  }

  useScheduleEffect(
    () => {
      if (!isMobile(window.navigator.userAgent).any) {
        initTilt()
      }

      return () => {
        const destroy = get(
          containerEl,
          'current.vanillaTilt.destroy',
          () => {}
        )
        try {
          destroy()
        } catch (e) {}
      }
    },
    [],
    SchedulePrio.Low
  )

  return (
    <Container>
      <Grid>
        <Inner ref={containerEl}>
          <Left>
            <Bg
              image={get(data, 'codeScreen.childImageSharp.fluid')}
              alt="Open Source"
            />
            <ImgWrap>
              <svg
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <title>Gatsby icon</title>
                <path d="M12.001.007C5.326.007.007 5.326.007 12S5.326 23.995 12 23.995s11.994-5.319 11.994-11.994S18.676.007 12.001.007zM2.614 12.105l9.283 9.283c-5.111 0-9.283-4.172-9.283-9.283zm11.473 9.074L2.823 9.915C3.76 5.743 7.516 2.614 12 2.614a9.476 9.476 0 0 1 7.614 3.86L18.259 7.62a7.657 7.657 0 0 0-6.362-3.337A7.555 7.555 0 0 0 4.7 9.393l9.804 9.805c2.4-.835 4.276-2.92 4.798-5.424h-4.068v-1.773h6.154c0 4.485-3.129 8.24-7.301 9.178z" />
              </svg>
              <svg
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <title>Netlify icon</title>
                <path d="M16.934 8.519a1.044 1.044 0 0 1 .303.23l2.349-1.045-2.192-2.171-.491 2.954zM12.06 6.546a1.305 1.305 0 0 1 .209.574l3.497 1.482a1.044 1.044 0 0 1 .355-.177l.574-3.55-2.13-2.234-2.505 3.852v.053zm11.933 5.491l-3.748-3.748-2.548 1.044 6.264 2.662s.053.042.032.042zm-.627.606l-6.013-2.569a1.044 1.044 0 0 1-.7.407l-.647 3.957a1.044 1.044 0 0 1 .303.731l3.633.762 3.33-3.31v-.062zM15.4 9.25L12.132 7.86a1.2 1.2 0 0 1-1.044.543h-.199L8.185 12.58l7.225-3.132v.01a.887.887 0 0 1 0-.167.052.052 0 0 0-.01-.041zm3.967 7.308l-3.195-.658a1.096 1.096 0 0 1-.46.344l-.761 4.72 4.437-4.396s-.01.02-.021.02zm-4.469-.324a1.044 1.044 0 0 1-.616-.71l-5.95-1.222-.084.136 5.398 7.81.323-.324.919-5.67s.031.022.01.011zm-6.441-2.652l5.878 1.211a1.044 1.044 0 0 1 .824-.522l.637-3.894-.135-.115-7.308 3.132a1.817 1.817 0 0 1 .104.188zm-2.464.981l-.125-.125-2.537 1.044 1.232 1.222 1.399-2.172zm1.67.397a1.368 1.368 0 0 1-.563.125 1.389 1.389 0 0 1-.45-.073l-1.544 2.245 6.765 6.702 1.19-1.18zm-.95-2.641a1.702 1.702 0 0 1 .314 0 1.378 1.378 0 0 1 .344 0l2.735-4.25a1.19 1.19 0 0 1-.334-.824 1.242 1.242 0 0 1 0-.271l-3.32-1.535-2.672 2.6zm.303-7.402l3.237 1.378a1.242 1.242 0 0 1 .835-.282 1.357 1.357 0 0 1 .397.063l2.526-3.947L11.923.041 7.016 4.854s-.01.052 0 .063zm-1.21 8.164a1.566 1.566 0 0 1 .24-.334L3.278 8.613 0 11.797l5.804 1.284zm-.262.7L.533 12.735l2.203 2.235 2.777-1.18z" />
              </svg>
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>TypeScript icon</title>
                <path d="M0 12v12h24V0H0zm19.341-.956c.61.152 1.074.423 1.501.865.221.236.549.666.575.77.008.03-1.036.73-1.668 1.123-.023.015-.115-.084-.217-.236-.31-.45-.633-.644-1.128-.678-.728-.05-1.196.331-1.192.967a.88.88 0 0 0 .102.45c.16.331.458.53 1.39.933 1.719.74 2.454 1.227 2.911 1.92.51.773.625 2.008.278 2.926-.38.998-1.325 1.676-2.655 1.9-.411.073-1.386.062-1.828-.018-.964-.172-1.878-.648-2.442-1.273-.221-.243-.652-.88-.625-.925.011-.016.11-.077.22-.141.108-.061.511-.294.892-.515l.69-.4.145.214c.202.308.643.731.91.872.766.404 1.817.347 2.335-.118a.883.883 0 0 0 .313-.72c0-.278-.035-.4-.18-.61-.186-.266-.567-.49-1.649-.96-1.238-.533-1.771-.864-2.259-1.39a3.165 3.165 0 0 1-.659-1.2c-.091-.339-.114-1.189-.042-1.531.255-1.197 1.158-2.03 2.461-2.278.423-.08 1.406-.05 1.821.053zm-5.634 1.002l.008.983H10.59v8.876H8.38v-8.876H5.258v-.964c0-.534.011-.98.026-.99.012-.016 1.913-.024 4.217-.02l4.195.012z" />
              </svg>
            </ImgWrap>
          </Left>
          <Right>
            <Title>❤️ Open Source</Title>
            <div
              dangerouslySetInnerHTML={{ __html: t('code.text', true) }}
            ></div>
            <Link
              href="https://github.com/jonathangus/etablera"
              rel="noopener"
              target="_blank"
            >
              <GitHub
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>GitHub icon</title>
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </GitHub>
              <span>github.com/jonathangus/etablera</span>
              <Arrow viewBox="0 0 24 24">
                <path d="M18.59 13H3a1 1 0 0 1 0-2h15.59l-5.3-5.3a1 1 0 1 1 1.42-1.4l7 7a1 1 0 0 1 0 1.4l-7 7a1 1 0 0 1-1.42-1.4l5.3-5.3z"></path>
              </Arrow>
            </Link>
          </Right>
        </Inner>
      </Grid>
    </Container>
  )
}

export default CodeArea
