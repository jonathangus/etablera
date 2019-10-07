import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useSetting } from '../../contexts/SettingsContext'
import Grid from '../Grid'
import media from '../../media'
import { useUiContext } from '../../contexts/UiContext'

const Container = styled.div`
  padding-top: 25vh;
  text-align: center;
  h1 {
    ${media.phone` hyphens: auto;`}
  }
`

const AboutHeader = () => {
  const t = useSetting()

  const { showHeader, hideHeader, animateContent } = useUiContext()

  useEffect(() => {
    animateContent && showHeader()

    return () => {
      hideHeader()
    }
  }, [animateContent])

  return (
    <Container>
      <Grid>
        <h1>{t('about.title')}</h1>
      </Grid>
    </Container>
  )
}

export default AboutHeader
