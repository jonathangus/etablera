import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import media from '../../media'
import { useSetting } from '../../contexts/SettingsContext'
import Grid from '../Grid'
import useScheduleEffect, { SchedulePrio } from '../../hooks/useScheduleEffect'
import RotateIn from '../RotateIn'
import { Link } from 'gatsby'
import { $etableraDescription } from '../../utils/dom-selectors'

const Container = styled.div`
  position: absolute;
  bottom: 15vh;
  font-size: 1.8rem;

  ${media.phone`
    bottom: 25vh;
    font-size:1.25rem;
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

const HeroDescription = () => {
  const t = useSetting()
  const [show, setShow] = useState(false)
  const elem = useRef()

  useScheduleEffect(
    () => {
      setShow(true)
    },
    [],
    SchedulePrio.Normal
  )

  return (
    <Container {...$etableraDescription.attr} ref={elem}>
      <Grid>
        <Inner show={show}>
          <p
            dangerouslySetInnerHTML={{ __html: t('hero.description', true) }}
          ></p>
          <Link to={t.url('/about')}>{t('hero.linkText')}</Link>
        </Inner>
      </Grid>
    </Container>
  )
}

export default HeroDescription
