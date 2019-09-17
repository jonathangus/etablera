import React from 'react'
import styled from 'styled-components'
import { gutter, semi, titleFont } from '../vars'
import { useSetting } from '../contexts/SettingsContext'
import { Link } from 'gatsby'
import media from '../media'
import { useUiContext } from '../contexts/UiContext'

const Label = styled.div`
  position: absolute;
  bottom: -100%;
  right: 0;
  width: 700px;
  text-align: right;
  max-width: 80vw;
  transform: translateY(0%) rotateX(90deg);
  pointer-events: none;
  transform-style: preserve-3d;
  transition: transform 0.4s ease-in, opacity 0.4s ease-in;
  transform-origin: bottom;
  font-size: 0.7rem;

  ${media.phone`
    display:none;
  `}
`

const Container = styled.div`
  position: relative;
  margin-right: ${gutter * 2}px;
  z-index: 3300;

  &:hover ${Label} {
    transform: translateY(0%) rotateX(0deg);
    opacity: 1;
  }
`

const Text = styled(Link)`
  font-weight: ${semi};
  font-family: ${titleFont};
  color: ${p => p.theme.color};
  text-decoration: none;
  transition: ${p => p.theme.transition};
`

const LanguageSelect = () => {
  const t = useSetting()
  const title = t.isSwedish ? 'en' : 'sv'
  const label = t('languageselect')
  const { headerShown } = useUiContext()

  if (!headerShown) return null

  return (
    <Container>
      <Label>{label}</Label>
      <Text to={t.translate()}>{title}</Text>
    </Container>
  )
}

export default LanguageSelect
