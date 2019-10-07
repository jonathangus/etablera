import React, { useEffect } from 'react'
import SEO from '../components/Seo'
import Grid from '../components/Grid'
import styled from 'styled-components'
import { useSetting } from '../contexts/SettingsContext'
import { useUiContext } from '../contexts/UiContext'

const Container = styled.div`
  padding: 20vh 0;

  h1 {
    margin-bottom: 1em;
  }
`

const PrivacyPage = () => {
  const t = useSetting()
  const { showHeader, hideHeader } = useUiContext()

  useEffect(() => {
    showHeader()

    return () => {
      hideHeader()
    }
  }, [])
  return (
    <React.Fragment>
      <SEO title="Privacy Policy" />
      <Container>
        <Grid dangerouslySetInnerHTML={{ __html: t('privacypolicy', true) }} />
      </Container>
    </React.Fragment>
  )
}

export default PrivacyPage
