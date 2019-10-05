import React, { useLayoutEffect } from 'react'
import styled from 'styled-components'
import { useUiContext } from '../../contexts/UiContext'

const Title = styled.h1`
  position: fixed;
  top: 50%;
  left: 0;
  width: 100%;
  transform: scale(1.3) translateY(-50%);
  text-align: center;
  z-index: -1;
`

const CultureHeader = () => {
  const { showHeader, hideHeader } = useUiContext()

  useLayoutEffect(() => {
    showHeader()

    return () => {
      hideHeader()
    }
  }, [])

  return null
}

export default CultureHeader
