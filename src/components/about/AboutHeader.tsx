import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useSetting } from '../../contexts/SettingsContext'
import Grid from '../Grid'
import media from '../../media'
import YFactor from '../YFactor'

const Container = styled.div`
  padding-top: 20vh;
  text-align: center;

  h1 {
    ${media.phone` 
        font-size: 3rem;
        `}
  }
`

const Text = styled(YFactor)`
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10vh;
  font-size: 1.4rem;
  text-align: left;
`

const AboutHeader = () => {
  const t = useSetting()

  return (
    <Container>
      <Grid>
        <h1>{t('about.title')}</h1>
        <Text
          dangerouslySetInnerHTML={{ __html: t('about.intro', true) }}
        ></Text>
      </Grid>
    </Container>
  )
}

export default AboutHeader
