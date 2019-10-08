import React, { useRef } from 'react'
import styled, { css } from 'styled-components'
import { useSetting } from '../contexts/SettingsContext'
import media from '../media'
import { gutter, titleFont, niceCubic } from '../vars'
import Grid from './Grid'
import YFactor from './YFactor'
import HalfTextSplit from './HalfTextSplit'
import MenuItems from './MenuItems'
import Cta from './Cta'
import Heart from './Heart'

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
   margin-top: ${gutter * 4}px;
  `}
`
const OtherLink = styled.a`
  margin-right: ${gutter * 2}px;
  letter-spacing: 1px;
  color: ${p => p.theme.grayText};
  text-transform: uppercase;

  path {
    fill: ${p => p.theme.color};
  }

  svg {
    transition: transform 0.45s ${niceCubic};
    width: 32px;
    height: auto;
  }

  &:hover svg {
    transform: scale(1.25);
  }

  &:last-child {
    margin-right: 0;
  }
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

const OpenSourceTitle = styled.h3`
  display: flex;
  align-items: center;

  svg {
    margin-right: ${gutter / 2}px;
    width: 32px;
    height: auto;
  }
`
const OpenSourceText = styled.div``
const OpenSourceLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  margin-right: 0;

  svg {
    margin-right: ${gutter / 2}px;
  }

  path {
    fill: ${p => p.theme.color};
  }
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
const githubIcon = (
  <svg
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.5663 0.263794C5.95235 0.263794 0.589844 5.6263 0.589844 12.2417C0.589844 17.5337 4.02146 22.0226 8.78103 23.6072C9.38029 23.7168 9.59868 23.3469 9.59868 23.0293C9.59868 22.7454 9.58838 21.9918 9.5825 20.9925C6.25088 21.716 5.54794 19.3866 5.54794 19.3866C5.00308 18.0028 4.21779 17.6344 4.21779 17.6344C3.13029 16.8917 4.30014 16.9065 4.30014 16.9065C5.50235 16.991 6.1347 18.141 6.1347 18.141C7.20308 19.9712 8.93838 19.4425 9.62073 19.1359C9.72956 18.3623 10.0384 17.8344 10.381 17.5351C7.72147 17.2329 4.92514 16.205 4.92514 11.6153C4.92514 10.3079 5.39205 9.2388 6.15823 8.4013C6.0347 8.09836 5.62367 6.88071 6.27514 5.23144C6.27514 5.23144 7.28103 4.90938 9.56926 6.45939C10.5244 6.19321 11.5494 6.06086 12.5678 6.05645C13.5847 6.06086 14.6097 6.19321 15.5663 6.45939C17.8531 4.90938 18.8568 5.23144 18.8568 5.23144C19.5104 6.88071 19.0994 8.09836 18.9759 8.4013C19.7435 9.2388 20.2075 10.3079 20.2075 11.6153C20.2075 16.2167 17.4068 17.2292 14.7384 17.5256C15.1685 17.8954 15.5516 18.6263 15.5516 19.744C15.5516 21.3447 15.5369 22.6366 15.5369 23.0293C15.5369 23.3498 15.7524 23.7226 16.3604 23.6057C21.1163 22.0182 24.545 17.5322 24.545 12.2417C24.545 5.6263 19.1818 0.263794 12.5663 0.263794Z"
      fill="white"
    />
  </svg>
)

const otherLinks = [
  {
    href: 'https://www.instagram.com/etablera.co/',
    title: 'Instagram',
    icon: (
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.5898 2.163C15.7938 2.163 16.1738 2.175 17.4398 2.233C20.6918 2.381 22.2108 3.924 22.3588 7.152C22.4168 8.417 22.4278 8.797 22.4278 12.001C22.4278 15.206 22.4158 15.585 22.3588 16.85C22.2098 20.075 20.6948 21.621 17.4398 21.769C16.1738 21.827 15.7958 21.839 12.5898 21.839C9.38584 21.839 9.00584 21.827 7.74084 21.769C4.48084 21.62 2.96984 20.07 2.82184 16.849C2.76384 15.584 2.75184 15.205 2.75184 12C2.75184 8.796 2.76484 8.417 2.82184 7.151C2.97084 3.924 4.48584 2.38 7.74084 2.232C9.00684 2.175 9.38584 2.163 12.5898 2.163ZM12.5898 0C9.33084 0 8.92284 0.014 7.64284 0.072C3.28484 0.272 0.862844 2.69 0.662844 7.052C0.603844 8.333 0.589844 8.741 0.589844 12C0.589844 15.259 0.603844 15.668 0.661844 16.948C0.861844 21.306 3.27984 23.728 7.64184 23.928C8.92284 23.986 9.33084 24 12.5898 24C15.8488 24 16.2578 23.986 17.5378 23.928C21.8918 23.728 24.3198 21.31 24.5168 16.948C24.5758 15.668 24.5898 15.259 24.5898 12C24.5898 8.741 24.5758 8.333 24.5178 7.053C24.3218 2.699 21.9008 0.273 17.5388 0.073C16.2578 0.014 15.8488 0 12.5898 0V0ZM12.5898 5.838C9.18684 5.838 6.42784 8.597 6.42784 12C6.42784 15.403 9.18684 18.163 12.5898 18.163C15.9928 18.163 18.7518 15.404 18.7518 12C18.7518 8.597 15.9928 5.838 12.5898 5.838ZM12.5898 16C10.3808 16 8.58984 14.21 8.58984 12C8.58984 9.791 10.3808 8 12.5898 8C14.7988 8 16.5898 9.791 16.5898 12C16.5898 14.21 14.7988 16 12.5898 16ZM18.9958 4.155C18.1998 4.155 17.5548 4.8 17.5548 5.595C17.5548 6.39 18.1998 7.035 18.9958 7.035C19.7908 7.035 20.4348 6.39 20.4348 5.595C20.4348 4.8 19.7908 4.155 18.9958 4.155Z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    href: 'http://flickr.com/eriknson',
    title: 'Flickr',
    icon: (
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0)">
          <path
            d="M17.5898 5C15.6288 5 13.8588 5.809 12.5878 7.108C11.3178 5.809 9.54984 5 7.58984 5C3.72384 5 0.589844 8.134 0.589844 12C0.589844 15.866 3.72384 19 7.58984 19C9.54984 19 11.3178 18.191 12.5878 16.892C13.8588 18.191 15.6288 19 17.5898 19C21.4558 19 24.5898 15.866 24.5898 12C24.5898 8.134 21.4558 5 17.5898 5ZM17.5898 17C14.8328 17 12.5898 14.757 12.5898 12C12.5898 9.243 14.8328 7 17.5898 7C20.3468 7 22.5898 9.243 22.5898 12C22.5898 14.757 20.3468 17 17.5898 17Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0">
            <rect
              width="24"
              height="24"
              fill="white"
              transform="translate(0.589844)"
            />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    href: 'https://github.com/jonathangus',
    title: 'Github',
    icon: githubIcon,
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
              <OpenSourceTitle>
                <Heart /> open source
              </OpenSourceTitle>
              <OpenSourceText
                dangerouslySetInnerHTML={{ __html: t('code.text', true) }}
              ></OpenSourceText>
              <OpenSourceLink
                target="_blank"
                rel="noopener"
                href="https://github.com/jonathangus/etablera"
              >
                {githubIcon}
                <HalfTextSplit text="github.com/jonathangus/etablera"></HalfTextSplit>
              </OpenSourceLink>
            </Right>
          </Wrapper>
          <Bottom>
            <MenuItems />
            <Other>
              {otherLinks.map((l, i) => (
                <OtherLink
                  target="_blank"
                  rel="noopener"
                  title={l.icon}
                  key={i}
                  href={l.href}
                >
                  {l.icon}
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
