import React, { useContext } from 'react'
import styled, { keyframes } from 'styled-components'
import HalfTextSplit from '../HalfTextSplit'
import { useUiContext } from '../../contexts/UiContext'
import { useSetting } from '../../contexts/SettingsContext'

const Mail = styled.a`
  transform: translateX(${p => (p.show ? 9 : 40)}px) rotate(-90deg);
  display: block;
  text-decoration: none;
  opacity: ${p => (p.show ? 1 : 0)};
  transition: opacity 1s ease, transform 0.4s ease;
  transform-origin: top;
`

const VerticalEmailLink = () => {
  const { frontpageLoaded } = useUiContext()
  const t = useSetting()
  return (
    <Mail show={frontpageLoaded} href="mailto:hej@etablera.co">
      <HalfTextSplit text={t('mail.hello')} />
    </Mail>
  )
}

export default VerticalEmailLink
