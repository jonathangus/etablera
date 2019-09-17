import React, { useContext } from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import get from 'lodash/get'
import Logo from './Logo'
import Grid from '../Grid'
import { useThemeContext } from '../../contexts/ThemeContext'
import { useSetting } from '../../contexts/SettingsContext'
import { gutter } from '../../vars'
import media, { sizes } from '../../media'
import YFactor from '../YFactor'
import TextContent from '../TextContent'

const Wrapper = styled(YFactor)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  ${media.phone`
    grid-template-columns: 1fr 1fr;
  `}
`

const Item = styled.div`
  box-sizing: border-box;

  padding: ${gutter * 4}px 0;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100%;

  &:after,
  &:before {
    content: '';
    background: ${p => p.theme.grayText};
    position: absolute;
    opacity: 0.3;
  }

  &:after {
    height: 100%;
    width: 1px;
    right: 0;
    top: 0;
  }

  &:before {
    width: 100%;
    height: 1px;
    left: 0%;
    bottom: 0;
  }

  @media (min-width: ${sizes.phone}px) {
    &:nth-child(4n) {
      &:after {
        display: none;
      }
    }

    &:nth-last-child(-n + 4) {
      &:before {
        display: none;
      }
    }
  }

  @media (max-width: ${sizes.phone}px) {
    &:nth-child(2n) {
      &:after {
        display: none;
      }
    }

    &:nth-last-child(-n + 2) {
      &:before {
        display: none;
      }
    }
  }

  opacity: 0.8;
`

const LogoWall = () => {
  const { selected } = useThemeContext()
  const t = useSetting()
  const data = useStaticQuery(graphql`
    {
      ...logos
    }
  `)
  const logos = get(data, 'allContentfulClientLogo.nodes', []).map(logo => ({
    alt: logo.name || logo.id,
    image: selected === 'dark' ? logo.light : logo.dark,
  }))

  return (
    <Grid>
      <YFactor size={0.5}>
        <TextContent title={t('logos.title')} />
      </YFactor>
      <Wrapper>
        {logos.map((l, i) => (
          <Item key={i}>
            <Logo logo={l} />
          </Item>
        ))}
      </Wrapper>
    </Grid>
  )
}

export default LogoWall
