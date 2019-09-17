import React, { useEffect } from 'react'
import styled from 'styled-components'
import media from '../../../media'

const Container = styled.div`
  margin-bottom: 100px;
  position: relative;
  display: flex;
  justify-content: space-between;

  ${media.phone`
    margin-bottom: 5vh;
  `}
`

const Col = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: 1000px;
`

const First = styled.div`
  padding-left: 5vw;
  width: 80%;

  ${media.phone`
    padding-left: 0;
    width:100%;
  `}
`
const Second = styled.div`
  width: 50%;

  ${media.phone`
    width: 80%;
  `}
`

const Third = styled.div`
  width: 60%;
  margin-top: 10vh;
  margin-left: auto;

  ${media.phone`
  margin-top: 5vh;
  width: 80%;
  `}
`
const ColOne = ({ items, getElement }) => {
  return (
    <Container>
      <Col>
        <First>{getElement(items[0])}</First>
        <Third>{getElement(items[2])}</Third>
      </Col>
      <Col>
        <Second>{getElement(items[1])}</Second>
      </Col>
    </Container>
  )
}

export default ColOne
