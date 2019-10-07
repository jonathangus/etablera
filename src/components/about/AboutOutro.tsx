import React from 'react'
import styled from 'styled-components'
import { useSetting } from '../../contexts/SettingsContext'
import Grid from '../Grid'
import YFactor from '../YFactor'
import Cta from '../Cta'
import Image from '../Image'
import { useStaticQuery, graphql } from 'gatsby'
import LazyLoadImage from '../LazyLoadImage'

const Container = styled(YFactor)`
  text-align: center;
`

const AboutOutro = () => {
  const t = useSetting()
  const data = useStaticQuery(graphql`
    {
      ...aboutImage
    }
  `)

  return (
    <Container top>
      <Grid>
        <h3>{t('about.outroText')}</h3>
        <Cta>
          <a href="mailto:hej@etablera.co">hej@etablera.co</a>
        </Cta>
        <YFactor top>
          <LazyLoadImage
            alt="About"
            image={data.aboutImage.childImageSharp.fluid}
          />
        </YFactor>
      </Grid>
    </Container>
  )
}

export default AboutOutro
