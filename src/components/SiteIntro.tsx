import React from 'react'
import { useSetting } from '../contexts/SettingsContext'
import TextContent from './TextContent'
import styled from 'styled-components'
import Grid from './Grid'

const Wrapper = styled.div``

const SiteIntro = () => {
  const t = useSetting()
  return (
    <Wrapper data-scroll-target>
      <Grid>
        <TextContent
          title={t('siteintro.title')}
          text={t('siteintro.text', true)}
        />
      </Grid>
    </Wrapper>
  )
}

export default SiteIntro
