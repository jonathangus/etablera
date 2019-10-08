import React from 'react'
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
const BigCol = styled(Col)`
  width: 65%;
`

const First = styled.div`
  align-self: flex-end;
  width: 100%;

  ${media.phone`
    min-height: auto;
  `}

  video {
    height: 100%;
    object-fit: cover;
  }
`

const Second = styled.div`
  width: 50%;

  ${media.phone`
  width: 80%;
  align-self: flex-end;
  `}
`

const ColThree = ({ items, getElement }) => (
  <Container>
    <BigCol>
      <First>
        {items[0] && <CultureReveal image={items[0].image}></CultureReveal>}
      </First>
    </BigCol>
    <Col>
      <Second>
        {items[1] && <CultureReveal image={items[1].image}></CultureReveal>}
      </Second>
    </Col>
  </Container>
)

export default ColThree
