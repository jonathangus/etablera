import React from 'react'
import styled from 'styled-components'
import { gutter, titleFont } from '../../vars'
import media from '../../media'
import OverflowAnimation from '../OverflowAnimation'
import { etableraDescription } from '../../utils/dom-selectors'
import { useUiContext } from '../../contexts/UiContext'
import { useSetting } from '../../contexts/SettingsContext'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-transform: uppercase;
  left: 10vw;
  right: 10vw;
  position: absolute;
  top: 100%;
  align-items: center;

  ${media.phone`
    margin: ${gutter * 4}px ${gutter * 0}px 0 ${gutter * 0}px;
  `}
`

const Item = styled.div`
  display: flex;
  align-items: center;
  padding: ${gutter * 0.5}px ${gutter * 2}px;

  ${media.phone`
  padding: 4px ${gutter}px;
  `}
`

const Title = styled(OverflowAnimation)`
  font-size: 2rem;
  font-family: ${titleFont};
  font-weight: 800;
  letter-spacing: 1.5px;

  ${media.tablet`
    font-size: 2rem;
  `}

  ${media.phone`
    font-size: 1.5rem;
  `}
`

const EtableraDescription = () => {
  const { frontpageLoaded } = useUiContext()
  const t = useSetting()
  const items = t('hero.description').split(',')

  return (
    <Container {...etableraDescription.attr}>
      {items.map((item, i) => (
        <Item key={i}>
          <Title show={frontpageLoaded} delay={i * 200} content={item}></Title>
        </Item>
      ))}
    </Container>
  )
}

export default EtableraDescription
