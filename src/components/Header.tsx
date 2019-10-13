import React, { useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import ThemeToggle from './ThemeToggle'
import { logo } from '../svg'
import { Link } from 'gatsby'
import { gutter, headerMobileMargin } from '../vars'
import MenuItems from './MenuItems'
import { useUiContext } from '../contexts/UiContext'
import LanguageSelect from './LanguageSelect'
import throttle from 'lodash/throttle'
import useScheduleEffect, { SchedulePrio } from '../hooks/useScheduleEffect'
import Grid from './Grid'
import headerTextDifference from '../utils/header-text-difference'
import { useSetting } from '../contexts/SettingsContext'
import media from '../media'
import isMobile from 'ismobilejs'

const lightTextStyle = css`
  --half-text-split-color: white;

  color: white;
  svg,
  path {
    fill: white;
  }

  a  {
    color: white;
  }
`
const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  padding: ${gutter * 2}px 0;
  z-index: 4425;
  will-change: transform;
  transition: transform ease-in-out 0.45s;

  ${p => p.isLightText && lightTextStyle}
`

const StyledGrid = styled(Grid)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: none;
`

const Logo = styled.div`
  transition: opacity 0.8s linear;
  opacity: ${p => (p.isVisible ? 1 : 0)};
  pointer-events: ${p => (p.isVisible ? 'all' : 'none')};

  a {
    display: block;
  }

  svg {
    fill: ${p => p.theme.color};
    transition: fill 0.3s ease;
    width: 100px;
  }
`
const Right = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`
const Divider = styled.div`
  background: ${p => p.theme.color};
  height: 16px;
  width: 1px;
  margin: 0 ${gutter * 2}px;
  opacity: 0.5;

  ${media.phone`
  margin: 0 ${headerMobileMargin}px;

  `}
`

type Props = {
  currentPath: string
}

const Header = ({ currentPath }: Props) => {
  const isFrontpage = currentPath === '/'
  const isCasePage = currentPath === '/cases'
  const { headerShown, mounted } = useUiContext()
  const [isLightText, setLightText] = useState(false)
  const lastScrollTop = useRef(0)
  const resetScrollValue = useRef(0)
  const [show, setShow] = useState(true)
  const t = useSetting()
  const [key, setKey] = useState(currentPath)

  useEffect(() => {
    setKey(`${Math.random}`)
  }, [currentPath, headerShown, show, mounted])

  const onScroll = throttle(() => {
    let st = window.pageYOffset || document.documentElement.scrollTop
    if (isMobile(window.navigator.userAgent).any) return

    if (st < lastScrollTop.current) {
      setShow(true)
      resetScrollValue.current = st + 50
    } else if (st > resetScrollValue.current) {
      !isCasePage && setShow(false)
    }

    lastScrollTop.current = st <= 0 ? 0 : st
  }, 100)

  useEffect(() => {
    headerTextDifference.onRouteChange()
    headerTextDifference.onChange = isLight => {
      setLightText(isLight)
    }
  }, [])

  useScheduleEffect(
    () => {
      setShow(true)
      window.addEventListener('scroll', onScroll)

      return () => {
        window.removeEventListener('scroll', onScroll)
      }
    },
    [currentPath, headerShown],
    SchedulePrio.Low
  )

  const shouldShow = Boolean(mounted && headerShown && show)
  return (
    <Container
      key={key}
      style={{ transform: `translateY(${shouldShow ? 0 : -80}%)` }}
      isLightText={isLightText}
    >
      <StyledGrid>
        <Logo isVisible={!isFrontpage}>
          <Link title="Etablera" to={t.url('/')}>
            {logo}
          </Link>
        </Logo>
        <Right>
          <MenuItems />
          <Divider />
          <LanguageSelect />
          <ThemeToggle />
        </Right>
      </StyledGrid>
    </Container>
  )
}

export default Header
