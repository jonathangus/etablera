import React from 'react'
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
const BigCol = styled(Col)`
  width: 65%;
`

const First = styled.div`
  align-self: flex-end;
  width: 100%;
`

const Second = styled.div`
  width: 50%;
  align-self: center;
  margin-top: 10vh;

  ${media.phone`
  margin-top: 5vh;
  width: 80%;
  `}
`

const Third = styled.div`
  width: 60%;
  margin-top: 10vh;

  ${media.phone`
    width: 80%;
    align-self: flex-start;
  `}
`

const ColTwo = ({ items, getElement }) => (
  <Container>
    <Col>
      <Third>{getElement(items[2])}</Third>
    </Col>
    <BigCol>
      <First>{getElement(items[0])}</First>
      <Second>{getElement(items[1])}</Second>
    </BigCol>
  </Container>
)

export default ColTwo
