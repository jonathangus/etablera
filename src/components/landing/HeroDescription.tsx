import React, { useState } from 'react'
import styled from 'styled-components'
import { gutter, titleFont } from '../../vars'
import media from '../../media'
import { etableraDescription } from '../../utils/dom-selectors'
import { useUiContext } from '../../contexts/UiContext'
import { useSetting } from '../../contexts/SettingsContext'
import Grid from '../Grid'
import useScheduleEffect from '../../hooks/useScheduleEffect'
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

  useScheduleEffect(() => {
    setTimeout(() => {
      setShow(true)
    }, 300)
  }, [])

  return (
    <Container {...etableraDescription.attr}>
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
