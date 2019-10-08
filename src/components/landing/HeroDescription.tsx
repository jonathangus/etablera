import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { gutter, titleFont } from '../../vars'
import media from '../../media'
import { etableraDescription } from '../../utils/dom-selectors'
import { useUiContext } from '../../contexts/UiContext'
import { useSetting } from '../../contexts/SettingsContext'
import Grid from '../Grid'
import useScheduleEffect, { SchedulePrio } from '../../hooks/useScheduleEffect'
import RotateIn from '../RotateIn'

const Container = styled.div`
  position: absolute;
  bottom: 15vh;
  font-size: 1.8rem;

  ${media.phone`
    bottom: 25vh;
    font-size:1.4rem;
  `}
`

const Inner = styled(RotateIn)`
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
  transition-delay: 400ms;

  p {
    margin: 0 auto;
    display: inline;
  }
  del {
    text-decoration: underline;

    ${media.phone`
      display:block;
    `}
  }
`

const EtableraDescription = () => {
  const t = useSetting()
  const [show, setShow] = useState(false)
  const { etableraSmooth } = useUiContext()
  const elem = useRef()

  useEffect(() => {
    if (etableraSmooth) etableraSmooth.appendDescription(elem.current)
  }, [Boolean(etableraSmooth)])

  useScheduleEffect(
    () => {
      setShow(true)
    },
    [],
    SchedulePrio.Normal
  )

  return (
    <Container ref={elem}>
      <Grid>
        <Inner
          show={show}
          dangerouslySetInnerHTML={{ __html: t('hero.description', true) }}
        ></Inner>
      </Grid>
    </Container>
  )
}

export default EtableraDescription
