import React, { useRef } from 'react'
import styled from 'styled-components'
import ImageReveal from '../ImageReveal'
import YFactor from '../YFactor'
import media from '../../media'

const Container = styled.div``

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Item = styled(YFactor)`
  width: 100%;

  > div {
    max-width: 900px;
    margin: 0 auto;
  }

  ${media.phone`
    max-width: 100%;
  `}

  &:nth-child(odd) {
    padding-left: 15vw;

    ${media.phone`
    padding-left: 5vw;
    `}
  }

  &:nth-child(even) {
    padding-right: 15vw;

    ${media.phone`
    padding-right: 5vw;
    `}
  }
`

const MediaGrid = ({ images }) => {
  return (
    <Container>
      <Wrapper>
        {images.map((item, i) => (
          <Item size={0.5} key={i}>
            <ImageReveal image={item} />
          </Item>
        ))}
      </Wrapper>
    </Container>
  )
}

export default MediaGrid
