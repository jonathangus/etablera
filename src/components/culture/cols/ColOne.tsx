import React, { useEffect } from 'react'
import styled from 'styled-components'
import media from '../../../media'
import CultureReveal from '../CultureReveal'

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
const ColOne = ({ items }) => {
  return (
    <Container>
      <Col>
        <First>
          {items[0] && <CultureReveal image={items[0].image}></CultureReveal>}
        </First>
        <Third>
          {items[2] && <CultureReveal image={items[2].image}></CultureReveal>}
        </Third>
      </Col>
      <Col>
        <Second>
          {items[1] && <CultureReveal image={items[1].image}></CultureReveal>}
        </Second>
      </Col>
    </Container>
  )
}

export default ColOne
