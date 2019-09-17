import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  background: rgba(255, 255, 255, 0.9);
  width: 25px;
  height: 25px;
  border-radius: 100%;
  box-shadow: 0 0 0 7px rgba(255, 255, 255, 0.2),
    0 0 0 14px rgba(255, 255, 255, 0.1);
  position: absolute;
  z-index: 999999;
  display: none;
`

const SwipeIndicator = () => {
  return <Container></Container>
}

export default SwipeIndicator
