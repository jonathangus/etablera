import React, { useEffect } from 'react'
import SEO from '../components/Seo'
import BounceLogo from '../components/BounceLogo'
import styled from 'styled-components'
import { useUiContext } from '../contexts/UiContext'

const Title = styled.h1`
  font-size: 20vw;
  color: ${p => p.theme.backgroundColor};
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  line-height: 1;
`

const MissingPage = ({ pageContext }) => {
  const { showHeader, hideHeader } = useUiContext()

  useEffect(() => {
    showHeader()

    return () => {
      hideHeader()
    }
  }, [])
  return (
    <React.Fragment>
      <SEO title="404" />
      <BounceLogo />
      <Title>404</Title>
    </React.Fragment>
  )
}

export default MissingPage
