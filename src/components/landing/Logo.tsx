import React, { useState } from 'react'
import styled from 'styled-components'
import { IGatsbyImage } from '../../types'
import LazyLoadImage from '../LazyLoadImage'

const Container = styled.div`
  will-change: opacity, transform;
  transition: opacity 0.7s ease, transform 0.5s ease;
  opacity: ${p => (p.show ? 1 : 0)};
  transform: scale(${p => (p.show ? 1 : 1.1)})
    translateY(${p => (p.show ? 0 : 5)}px);
  width: 100%;

  img {
    max-width: 70%;
    max-height: 80px;
    width: auto;
    margin: 0 auto;
    display: block;
    min-width: 80px;
  }
`

type Props = {
  logo: {
    image: IGatsbyImage
    alt: string
  }
}

const Logo = ({ logo }: Props) => {
  const [show, setShow] = useState(false)

  return (
    <Container show={show}>
      <LazyLoadImage
        image={logo.image}
        alt={logo.alt}
        onVisible={() => setShow(true)}
      />
    </Container>
  )
}

export default Logo
